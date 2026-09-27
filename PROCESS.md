# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

A tutorial/lab swap board: post the slot you have and what you'd swap it for,
someone else claims it, and the board updates live in every open tab. Full
stack — Astro, Drizzle, SQLite — deployed to Fly. `README.md` has the fuller
account of what good looks like here.

## How I got here

Carried the harness forward from last week's assignment repo
([`e1e1aa4`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-ryschneider/commit/e1e1aa4)):
kept the rules that generalize (commit at the grain of a decision, cite
commits as they land, platform constraints beat literal requests), dropped
what was specific to that assignment's static-site content model, and
reworded the stack-specific ones (the dev-server-lies-about-status-codes note,
the hash-diff-isn't-a-visual-check note) for a server-rendered app on Fly
instead of a GitHub Pages site.

Picked the swap board from a shortlist (room booking, a tutorial waitlist, a
course-selection shortlist, a deliverable tracker) as the one with the most
real relational bite for a single day's build.

Built it as the same shape as the starter's guestbook — create, persist,
reload, live SSE broadcast — plus one more state transition: claiming. The
actual design decision was making a claim exclusive: `claimSwap` only updates
a row where `claimed_by` is still null, so two people claiming the same swap
in the same instant can't both win. I didn't just read the code and trust it —
I posted a swap, claimed it as one name, then immediately attempted a second
claim as a different name against the same id. The second attempt still
redirected 303, but the board kept showing the first claim, which is what
actually proves the guard holds rather than just type-checks.

[`9eacf18`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-ryschneider/commit/9eacf18)
is the whole feature: schema and migration, the two API routes (create,
claim), the board UI with live updates, and `spec/swaps.test.ts` (replacing
`spec/guestbook.test.ts`), asserting the brief's two checkable lines — a
posted swap persists across a reload, and a claim persists too.

`pnpm check` is green: typecheck, build, and the full spec suite, including
the shipped invariants and the new spec tests.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
