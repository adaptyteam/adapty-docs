# Pass-1 shared part

For the pass-1 briefs: rw-research, rw-questions, rw-plan's `briefs/structure-pass.md`, and rw-ripple.
Each prompt starts with lib/preamble.md, then this part, then the agent's own step.

Fill in the brackets. Every agent gets the shared part and its own step.

## Shared part

- Text: [the draft or article paths; for a new article, the plan or ticket].
- Frame: [frame.md]. Facts: [facts.md]. Strike list: [path]. Session folder: [path].
- Sibling articles: [paths, marking the ones the user signed off]. Read them for scope (which article
  owns a topic, what stays out of this one) and for the kinds of sections they use for the same kind
  of feature (tasks, reference, limitations). Reuse wording only from articles the user signed off, or
  after it passes the checks. Never take a sibling's prose as a model.
- Checks: [checks-all.txt]. The level checks (`L4`, `L3`, `L2`), `headings`, `lists`, `06`, and `12`
  judge structure. `12` tries removing a unit, or folding it into a clause, before `lists` climbs a
  rung.
