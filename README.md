# Tutorial &amp; lab swap board

Every semester I end up wanting to swap a tutorial or lab slot with someone
else in the class, and there's no ANU system for it — just ad hoc posts in a
group chat that get buried. This is the slice I wish existed: post the slot
you have and what you'd swap it for, anyone else claims it, and it's done.

## What good looks like here

The two things that actually matter: a posted swap has to survive a reload
(it's really in the database, not just on the page you posted it from), and
a claim has to be exclusive — once someone claims a swap, nobody else can
claim it too. Both are enforced: `spec/swaps.test.ts` drives the running app
over HTTP and checks a posted swap persists and a claim persists, and
`claimSwap` in `src/lib/db.ts` only updates a row that's still unclaimed
(`WHERE claimed_by IS NULL`), so two people claiming the same swap at the
same moment can't both win.

What's a judgement call, not a check: posting picks a course, tutorial and
timeslot from a catalog (`src/lib/catalog.ts`) instead of free text, so two
swaps for "the same slot" are actually comparable — but the catalog is dummy
data, not the real ANU timetable, and wiring that up is future scope, not this
crit's. I kept it to one open list rather than building accounts or letting a
poster retract a swap — the smallest thing that's genuinely wired end to end
(create, claim, persist, broadcast live to every open tab) beats a bigger
half-built one. `CLAUDE.md` has the working rules this was built under.
