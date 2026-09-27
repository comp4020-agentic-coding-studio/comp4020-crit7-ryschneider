import { beforeAll, describe, expect, inject, it } from "vitest";

// Drives the running app over HTTP to prove the week's two contract lines
// hold: a posted swap persists across a reload, and claiming it persists too
// ("the core flow persists across a reload — create something, and it's
// still there", and "wired end to end" — the claim is the second half of
// the flow, not just the create).
const baseUrl = inject("baseUrl");

describe("swap board", () => {
  let have: string;
  let want: string;

  beforeAll(() => {
    const probe = process.hrtime.bigint();
    have = `spec-have-${probe}`;
    want = `spec-want-${probe}`;
  });

  // Astro checks form POSTs carry a same-origin Origin header (CSRF
  // protection); browsers send it automatically, a bare fetch doesn't.
  const post = (path: string, body: URLSearchParams) =>
    fetch(new URL(path, baseUrl), {
      method: "POST",
      headers: { origin: baseUrl },
      body,
      redirect: "manual",
    });

  it("accepts a new swap and redirects back to the board", async () => {
    const res = await post(
      "/api/swaps",
      new URLSearchParams({ name: "spec-poster", have, want }),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/");
  });

  it("persists the swap: a fresh page load includes it, open", async () => {
    const res = await fetch(baseUrl);
    const html = await res.text();
    expect(html).toContain(have);
    expect(html).toContain(want);
  });

  it("broadcasts new swaps over the SSE stream", async () => {
    const probe = process.hrtime.bigint();
    const liveHave = `live-have-${probe}`;
    const liveWant = `live-want-${probe}`;

    // subscribe first, then post, then read until the event arrives
    const stream = await fetch(new URL("/api/events", baseUrl));
    expect(stream.headers.get("content-type")).toContain("text/event-stream");
    const reader = stream.body?.getReader();
    if (!reader) throw new Error("no response body");

    await post(
      "/api/swaps",
      new URLSearchParams({ name: "live-poster", have: liveHave, want: liveWant }),
    );

    const decoder = new TextDecoder();
    let received = "";
    while (!received.includes(liveHave)) {
      const { value, done } = await reader.read();
      if (done) throw new Error("stream ended before the event arrived");
      received += decoder.decode(value, { stream: true });
    }
    await reader.cancel();
    expect(received).toContain(`data: `);
    expect(received).toContain(liveHave);
  }, 10_000);

  it("claiming a swap persists: a fresh page load shows it claimed, not open", async () => {
    // find the id the board rendered our swap with, from the page HTML: the
    // <li> chunk containing our probe text carries its own data-swap-id
    const page = await fetch(baseUrl);
    const html = await page.text();
    const chunk = html.split("<li").find((piece) => piece.includes(have));
    const match = chunk?.match(/data-swap-id="(\d+)"/);
    if (!match) throw new Error("couldn't find the posted swap's id on the page");
    const id = match[1];

    const res = await post(
      `/api/swaps/${id}/claim`,
      new URLSearchParams({ claimedBy: "spec-claimer" }),
    );
    expect(res.status).toBe(303);

    const after = await fetch(baseUrl);
    const afterHtml = await after.text();
    expect(afterHtml).toContain("claimed by spec-claimer");
  });
});
