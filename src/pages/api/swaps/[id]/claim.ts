import type { APIRoute } from "astro";
import { claimSwap } from "../../../../lib/db";
import { bus } from "../../../../lib/events";

// Claims an open swap: sets claimed_by if (and only if) nobody's claimed it
// yet (see the WHERE guard in claimSwap), broadcasts the updated row so
// every open tab sees the claim without a reload, and redirects back —
// same no-JS-required shape as posting a new swap.
export const POST: APIRoute = async ({ params, request, redirect }) => {
  const id = Number(params.id);
  const form = await request.formData();
  const claimedBy = String(form.get("claimedBy") ?? "").trim();
  if (Number.isInteger(id) && claimedBy) {
    const swap = claimSwap(id, claimedBy.slice(0, 100));
    if (swap) bus.emit("swap", swap);
  }
  return redirect("/", 303);
};
