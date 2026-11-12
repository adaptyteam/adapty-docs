# Handling review comments

How to address a reviewer's comments on a docs PR, written from how the lead writer's reviews were
handled across 34 PRs. The usual failure was not a wrong edit: it was a right edit in one place only.
A comment names the first instance of a problem, not the only one.

Use this file whenever you address review comments, with or without `review-assistant` walking them.

## 1. Read the comment

- **Language.** Most comments are in Russian, often quoting English doc text. The quote (`> …`) is the
  target; the Russian is the instruction. Translate the instruction, keep the original next to it.
- **Short comments carry broad meaning.**

  | Comment | Means |
  |---|---|
  | "same here", "and here too" | The previous thread's point applies here, and to every other instance |
  | "why?", "why is this here?" | Remove it, or justify it in a reply. On a file or section, it often means the PR went out of scope |
  | "I think not", "isn't it?", "not true" | A factual objection: verify against the source, then state the correct fact |
  | "fix it everywhere", "let's always…", "in new docs…", "for all integration docs…" | A standing rule: sweep the whole PR, and record the rule (section 5) |
  | "maybe…", "I'd remove…", "how about…" | A request, not a musing |

- **An example is one option.** When the reviewer says the text can be done differently, the example
  shows the goal; another wording that meets it is fine.
- **A question expects the article to answer it.** "What happens if a locale isn't approved?" means the
  reader will ask the same thing. Answer it in the text, and in the reply.
- **A ```suggestion block** is the reviewer's text for that line. Run it through editor's rules
  before applying it, and keep its meaning. When the suggestion breaks a rule the same reviewer stated
  (a product name, a framing rule), the rule wins: apply the intent and say so in the reply.
- **A retraction in the same thread** ("ah, got it, fine") closes it: no action.
- **Outdated threads** still count. Find the current text by the quoted line or the end of the diff
  hunk. If the text is gone, the outcome is "already covered" — say where it went.

## 2. Find every instance

Before editing, search for the problem by its words, not only by the rule it breaks:
1. Take two or three distinctive words from the quoted text (or the claim the comment objects to), and
   `git grep` them across `src/content/docs` and `src/components/reusable/`.
2. Open every reusable snippet the article renders (each `<SnippetName />` tag is a file in
   `src/components/reusable/`). A snippet also renders on every page that uses it.
3. Read the same article on the other platforms, and every other file the PR changes.
4. Include headings, link text, image alt text, and the frontmatter `title` and `description`: a
   rename that skips the heading is the usual miss.

Fix all of them in the same round, and list them in the outcome. A fix limited to the quoted line, with the same text left in a
snippet or on six other platform pages, is the most common way a comment comes back.

## 3. Fix it the way the comment asks

- **"Move" means move, and so does "only in X".** "Describe silent failures only in troubleshooting"
  means troubleshooting keeps the fact: if it isn't there yet, add the entry there in the same round,
  then remove it from the original place. Don't delete it unless the comment says to remove it.
- **"Shorten" means shorten**, not remove the section.
- **A factual objection gets a source**, not a deletion. Verify the claim in the code (the sources in
  `references/multi-review.md`), then write the correct fact. If the code supports the original text,
  keep it and reply with the evidence: file and line.
- **"Why is this here?"** on content outside the PR's task: take it out of the PR (sidebars, keywords,
  skills, settings, other articles, stray files), or reply with the reason it belongs.
- **A comment about unrelated files** covers every file of that kind, not only the ones named. List
  every file in the PR diff and match it to the task: an article, sidebar, asset, or sample the PR's
  articles use belongs; a copy of a spec, a skill or settings file, or an article the task doesn't
  cover goes, with a reply that says which. Before removing a file, look for what links to it.
- **Multi-part comments** get split into their parts. Each part gets its own outcome. The skipped part
  of a long comment is the second most common way a comment comes back.

## 4. Record an outcome for every comment

Each comment, and each part of a multi-part comment, ends with one outcome:
- **Applied**, with the files changed (all instances from section 2).
- **Applied differently**, with a one-line reason.
- **Not applied**, with the reason and the evidence.
- **Answered**, for a question: where the answer is in the text now.

Draft a reply for every outcome except a plain "Applied". Never post replies or resolve threads: the
user does that after pushing. Before reporting the round done, re-read every comment against the
outcomes: no comment and no part of one without an outcome.

## 5. Turn repeats into rules

A rule the reviewer states, or a point that has come back from an earlier PR, goes into the rules, not
only into the text:
- If editor already has the rule (see "Standing rules" below), the text broke an existing rule: fix
  every instance, and note which rule in the reply.
- If editor doesn't have it, propose the rule change to the user in the same round: the area of
  `SKILL.md` (or `product-terms.md` for a name), and the wording. Add it after the user agrees.
- A single comment about one sentence is not a rule. A reviewer's comments can also contradict each
  other over time; only a stated or repeated rule becomes one.

## 6. Before you request a review

Run the standing rules over the whole diff before the PR goes to the reviewer. Each of them came
back in several PRs after it was first stated.

## Standing rules

The rules the lead writer has stated in more than one PR, with where editor carries them. Most broke
again after they were first stated.

| Rule | Where in editor |
|---|---|
| Frame positively: what the reader can do, not risk, "poor UX", or what's broken | Area 12, "Lead a feature section…" and "No risk framing" |
| Limitations go last, in one place, not repeated across articles | Area 12, "Limitations last" |
| Don't document the obvious, what the UI shows, code internals, or steps nobody takes | Area 7 and CLAUDE.md |
| Troubleshooting and warnings stay minimal: a silent failure goes in troubleshooting; a warning only for what every reader must read, otherwise a note | Area 12, "Keep warnings rare" |
| Link instead of repeating | Area 10, "Single source of truth" |
| Exact product and source names | Area 11, `product-terms.md` |
| No future or roadmap statements | Area 10, banned words |
| Leave out niche and off-topic content | Area 12, "Leave out niche cases" |
| Important first; text before images; SDK v4 before v3, and v3 only while v4 is in beta | Area 12, order rules |
| An integration article doesn't sell features Adapty already has | Area 12, "Integration articles" |
| No keywords, no new untested code snippets | Area 8 and the Writing Workflow |
| No SDK method names in conceptual text | Area 12, "Method names" |
| What's New entries only on an explicit monthly request | Section 3, "Why is this here?" |
