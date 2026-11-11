# Multi-role review

A review by eight independent reviewers in four roles, merged into one final review. Use it for a new
article or a large change. A one-pass review finds wording and structure problems; this one also finds
what the text gets wrong about how the product behaves, because one role checks every behavior claim
against the code.

## When

- **After writing: run it by default.** When editor's draft is a new article, or adds or rewrites a
  section or more, run the review on the draft without asking, and apply the merged review's fixes
  yourself (see "After writing" below).
- **In review mode: offer it** for a new article, a full-article review, or a diff that changes more
  than one section. Ask first: it runs eight agents and takes several minutes. In the same question,
  ask whether the user suspects a specific problem.
- **Hints.** A hint ("check the global vs per-flow resolvers") makes every reviewer dig into that
  area, and they notice other problems less often. Pass one only when the user gives it, in the task
  or in answer to the question above. Never invent one.
- Otherwise, run the normal one-pass review.

## Sources for the code reviewers

Before you start the reviewers, find the code that has the feature, and pass the paths and refs to
the developer roles. The default branch often doesn't have it yet.
- The local clones next to the docs repo: the SDK repo for each platform the text covers
  (`AdaptySDK-iOS`, `AdaptySDK-Android`, and the cross-platform SDKs), the builder frontend
  (`adapty-dashboard-interface`), the transformer that turns builder config into SDK config
  (`unified-builder-transformer`), and the backend (`adapty-dashboard-api`).
- For each one, find the branch that contains the feature (`git grep` its main symbol across
  `git branch -r`), and check how fresh the clone is (`.git/FETCH_HEAD`). Name the ref in the brief.
- Reviewers read code with `git show`, `git grep`, and `git log` on those refs. They never check out,
  fetch, commit, or switch branches.

## The reviewers

Start all eight in one message, so they run in parallel. Two per role, each with the same brief and
no access to the others' output.

| Role | Brief |
|---|---|
| Mobile developer | An experienced mobile developer reviewing the snippets and development strategies. Loves simplicity, clean code, and clean, straightforward solutions. |
| Adapty developer | Dives into the transformer, frontend, backend, and SDK code to understand how it all works and whether the docs are accurate. Checks every claim the text makes about what the product, the SDK, or the UI does. |
| Editor | Reviews with this skill: the Review Workflow, without the interactive flow. |
| Product manager | Reviews with the `product-manager` skill, without user interaction. |

Every brief also gives:
- The articles to review, with their paths, and the code sources above.
- The hint, word for word, if the user gave one.
- Read-only rules: edit nothing except the output file; no git commands on the docs repo, no GitHub.
- The output: findings with the article and line, what's wrong, the evidence (file and line in the
  code where it applies), and the fix.

## The merge

One agent gets all eight reports and the articles, and writes the final review:
1. **Reconcile each pair** as if the two reviewers had discussed their findings. Keep what they agree
   on. Settle a disagreement on the evidence: the merge agent may read the code they cite. Drop
   findings that don't hold up. Two partial findings about the same mechanism can add up to one full
   finding.
2. **Merge across roles** into one review: **Major**, then **Minor**, most important first. Each
   finding has the article and line, what's wrong, the evidence, and the fix. Merge duplicates.
   Problems outside the docs (an unmerged branch, a bug in the code) go in their own section at the
   end, as information for the user.

## After the merge

- **In review mode:** present the merged review to the user, not the eight reports. Then continue with
  the Review Workflow's report and fix steps.
- **After writing:** apply every fix in the merged review to the draft, then run the Self-Review on
  the changed text. The draft is done only after this round of review and fixes. Present the final
  text alone: no list of findings, no account of what changed. Tell the user only what needs them: a
  fact nobody could settle from the code, or a problem outside the docs.
