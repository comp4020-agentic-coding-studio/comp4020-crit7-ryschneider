# Crit 7 reflection

**What was the breakthrough that moved the work forward?**

The brief asked for something "wired end to end," and my first instinct was to
read that as a checklist item — a form that posts, a page that reloads with
the new row still there. Copying the starter's guestbook would have satisfied
that literally. The actual breakthrough was noticing that a swap board has a
second, more interesting wire in it: claiming. The moment two people can act on
the same row, "wired end to end" quietly means "wired so it can't be wired
twice," and that's not something you get for free by copying a create-and-list
pattern. Once I saw the claim as its own state transition rather than a second
form, the guard fell out naturally: an update that only succeeds while
`claimed_by` is still null. What made it a breakthrough rather than just a
detail was checking it by actually trying to break it — posting a swap,
claiming it, then immediately claiming it again as someone else — instead of
trusting that the `WHERE` clause was correct because it read correctly.

**What did this work change about who I want to be as a software developer?**

I want to be someone who asks what a feature's real correctness condition is
before asking what its happy path looks like. The happy path for this board
was going to pass every test I could write in the first ten minutes; the
double-claim guard wasn't something a spec line told me to build, it was
something the shape of the data implied once I actually thought about two
users touching it at once. I also want to keep the habit this crit reinforced:
when a piece of logic exists specifically to prevent a bad outcome, prove it
by trying to cause the bad outcome, not by re-reading the code that's supposed
to stop it.
