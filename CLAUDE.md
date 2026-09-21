# Your harness

Rules for whichever agent works in this repo, kept because each one traces
back to something that actually went wrong (or would have gone wrong
unnoticed) on an earlier deliverable.

## Platform constraints beat literal requests

If a requested value conflicts with a schema, database, or route constraint,
say so explicitly and substitute the closest compliant value (same intent)
rather than silently complying with the literal request or silently
overriding it without saying anything.

## Know the real gate

`pnpm check` (typecheck + build + `vitest run spec`) is the gate this repo is
actually held to.

## A hash diff is not a visual check

`check-evidence` doesn't check whether a changed image actually looks right —
only that it changed. That's a floor, not a review. Render generated output
to something viewable and actually look at it before calling the work done;
don't trust a passing check alone.

## The dev server lies about status codes

Astro's dev 404 page can respond `HTTP 200`. A bare
`curl -o /dev/null -w '%{http_code}'` can report success on a page that's
actually the 404 template. Verify real routes and read the rendered content
(a screenshot, not just a status code) before trusting that a page works.

## Commit at the grain of a decision, not a file

Each commit is one decision that stands on its own. Push after each one
passes `pnpm check` green, so a broken later step never blocks evidence of
the working ones.

## Cite commits as they land, not in advance

Write `PROCESS.md`'s commit links after the commit exists, never as
placeholders to fill in later — a citation that doesn't resolve is worse than
no citation, and `pnpm check:evidence` checks that every one does.

## A correction to a pattern is a harness change, not a one-off fix

When feedback targets a pattern across the work ("make it all succinct")
rather than one instance, fix both the work and this file: add or sharpen a
rule here so the next pass doesn't reintroduce the pattern. A correction that
only changes files, and not the harness, gets relearned the hard way next
session.
