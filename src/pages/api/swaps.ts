import type { APIRoute } from "astro";
import { addSwap } from "../../lib/db";
import { bus } from "../../lib/events";

// A plain HTML form POSTs here, the swap request goes into SQLite, and the
// new row is broadcast to every open SSE connection. The 303 redirect makes
// the form work with no client-side JavaScript at all — the submitting tab
// re-renders from the database; every *other* tab hears about it over the
// stream.
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const have = String(form.get("have") ?? "").trim();
  const want = String(form.get("want") ?? "").trim();
  if (name && have && want) {
    bus.emit("swap", addSwap(name.slice(0, 100), have.slice(0, 200), want.slice(0, 200)));
  }
  return redirect("/", 303);
};
