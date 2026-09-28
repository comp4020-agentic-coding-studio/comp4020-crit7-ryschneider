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

After shipping, I went back and replaced the have/want free-text fields with a
cascading course → tutorial → timeslot picker
([`e28eb60`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-ryschneider/commit/e28eb60)),
backed by a dummy catalog spanning five subjects (COMP, ENGN, ARTV, EMSC,
HIST), plus a restyle and dropping the top-left brand link. The backend
contract didn't change — the picker still ends in a single `<select>` whose
option values are the same composed text `have`/`want` always were, so
`spec/swaps.test.ts` needed no changes — but I didn't just trust that from
reading the code: I drove the built server with a real headless Chrome,
filled the cascade, watched the tutorial and timeslot dropdowns actually
populate from the selected course, submitted, and confirmed the posted swap
still showed the composed text after reload.

Looking at that redesign again, it had two bugs of the same shape: the
tutorial dropdown's option labels repeated the day/time the timeslot dropdown
already showed, and the have/want sides let you pick a different course and
tutorial for each, when a real swap never crosses those — you're enrolled in
one specific section and want a different dated session of it, not a
different course
([`3a75cd8`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-ryschneider/commit/3a75cd8)).
Fixed both: one shared course+tutorial picker feeding two timeslot selects
(have/want), tutorial options now show just the name, and picking a timeslot
on one side disables it on the other so the same dated session can't be
offered and requested at once. Re-verified the same way — built server, real
headless Chrome — confirming the tutorial dropdown now shows plain names, both
timeslot dropdowns populate from the one selected tutorial, the mutual
exclusion actually disables the taken option, and the posted card still reads
correctly after reload.

Feedback afterwards asked for two more changes, each its own commit rather
than folded together even though both touch `index.astro`.

First, requiring a uni ID (`u` followed by 7 digits, e.g. `u7509543`) instead
of a free-text name everywhere a name is entered — the posting form, every
claim form, both server-rendered and the one `renderSwap` builds for live SSE
updates
([`4576813`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-ryschneider/commit/4576813)).
Validation is client-side (an `<input pattern>`, spelled out as
`[uU]\d{7}` since the attribute takes no regex flags) and server-side
(`normalizeUniId`, lower-casing and rejecting anything that doesn't match).
Checked with a real headless Chrome: typing `bob` into the field fails
`checkValidity()`, typing `u7509543` passes, and the full post → claim flow
round-trips a uni ID through the database and back out correctly.

Second, restricting a swap to two sessions of the same tutorial in the same
week, since a tutorial can meet on more than one weekday (e.g. Mon/Wed/Thu)
and a real swap never crosses a week boundary
([`94e2598`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit7-ryschneider/commit/94e2598)).
The catalog's `Tutorial` now holds a list of weekday `sessions` rather than a
single day/time, and a new `Week 1`–`12` selector (real date ranges off a
semester start date) sits between the tutorial and timeslot pickers; picking
a week dates that tutorial's sessions into it, and only then do the have/want
selects populate. Verified the same way as the earlier picker work — built
server, headless Chrome — driving the cascade through course → tutorial →
week and confirming the have/want options showed the right dated weekdays
(e.g. `Mon, 3 Aug` / `Wed, 5 Aug` for week 3), that the composed text posted
and persisted correctly, and that claiming still worked end to end.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
