# Judgment rules

What may be decided alone, and what escalates. "Escalate" resolves per execution mode: in
`interactive`, ask the user synchronously; in `assisted-async`, post the question to the Slack thread
without blocking; in `unattended`, do not ask — record an assumption instead (see below).

| Decision | Rule |
|---|---|
| Target code branch | Exactly one candidate matches the version from `mill:refs` → decide. Several candidates → take the most recent matching `ref_pattern` and record an assumption. **Zero candidates → stop**, questions only. |
| Is a migration guide needed | Decide alone by the criteria in SKILL.md's "Migration guides"; record which criterion fired. |
| Which zone the change lands in | Decide alone from `zones.json`. If it spans zones and one has only a stub brief → escalate. |
| Is a code change user-facing | Decide alone using the zone's "What we document, what we don't". If that section is a stub → not decidable unattended (the brief-depth gate). |
| Naming a new article | Decide alone from the canon already stated in the brief. If the brief states no canon → escalate rather than invent one. |
| Creating a new article | Only when the rollout canon already established it on an earlier platform — i.e. the sibling exists. Otherwise escalate: a new article changes navigation and SEO surface. |
| Renaming or deleting an article | **Never**, in any mode, without an explicit request. |
| Editing a sidebar JSON | Only to add a doc id in the position mirroring the source platform's sibling. Never reorder, never restructure. |
| Code diff contradicts the canon | **Never resolved silently** — always surfaced as an explicit discrepancy. |
| Another platform's docs | Never touched (scope guard — see the platform release-branch rule in `platforms.md`). |

**Assumption ledger.** Every decision taken without asking is recorded — in the rollout file's "Open
questions for the SDK team" during interactive/assisted-async work, or in the PR body's "Questions
and assumptions" for an automated run. If the assumption reveals context the mill should already have
had, also append it to the touched zone's "Gaps and misses".

**Stop rule.** More than three accumulated assumptions in one rollout run → stop making doc changes
and raise the open questions instead of guessing further. A change built on many guesses is not
reviewable in one pass.
