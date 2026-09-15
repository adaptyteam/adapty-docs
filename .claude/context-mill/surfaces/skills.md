# Surface — the shipped Adapty skills

The seven skills shipped from `sdk-integration-skill`: adapty-integration, ads-manager,
flow-audit, flow-generator, migrate-placements, onboarding-teardown, paywall-teardown.

This file answers one question: **does this docs change also change a shipped skill?** It is
corpus-wide, like `scope.md`. A zone brief's `Ripple rules` carries only its delta from this
file — which file in which skill, for that zone's classes — never a restatement of it.

Out of scope here: the `adapty-cli` skills, `adapty-agents`, and the `adapty-cursor*` guide
family. Each could be added as one more surface file; none is today.

## The rule that does most of the work

**Content churn in a cited article is not a ripple.** A skill fetches its docs URLs at
runtime, so changed wording, a corrected claim, a new example, a screenshot, an SEO pass, a
locale, a sidebar move — all absorbed by design. What breaks a skill is a **structural**
change (a rename, a deletion, a moved symbol), and that is already caught by the skills
repo's `lint-links.mjs` and `lint-symbols.mjs` plus a daily cron that files a `skill-drift` issue.

Do not trim this as obvious. The skills cite several hundred articles between them — run
`npm run mill:skills` for the current set — so well over half of all docs commits touch one.
Citation is the base rate, not a signal. On most tasks the correct output of this whole file
is one line saying *no*.

**Ask whether the skill restates the fact, not whether the article changed.** A cited
article's content is absorbed at runtime — but a fact the skill has *copied into its own
prose* is a second copy, and copies drift silently. Grep the skills for the claim before
calling a change quiet.

Both directions, because the subject line of a change will not tell you which one you are in:

- Dropping a sentence about which Google Play Billing Library version Adapty defaults to reads
  like pure copy-editing. Several `adapty-integration` platform references restate that
  version, so it is an SDK-surface ripple.
- Removing a warning from the App Store server-notifications article touches a page many skill
  files link to. The removed claim appears in none of them, so it is quiet.

## Classes that do ripple

A class narrows **where to look**; it is not the verdict. Having found the class, check whether a skill speaks to the changed fact at all — often none does, and then the answer is still no.


| Class | What it looks like |
|---|---|
| SDK surface | A new, renamed or removed API; a new platform; a changed default; **a version-pin move** |
| CLI surface | A new command, flag, metric, or refusal message |
| Flow Builder capability | A new element, variable, action, or behaviour |
| Product rename | A rename of a term a skill must get right to work — a CLI flag, an API name, a UI control the agent tells the user to click. Not docs prose adopting new vocabulary |
| Article created or removed | The only class where the *absence* of a citation is the signal |

### Version pins have no automation at all

Inside the SDK-surface class, name version pins separately rather than leaving them implied.
`lint-symbols.mjs` verifies that a symbol exists in our docs; it never checks a version against an
SDK, and the `sdk-integration-skill` entry in `sources.md` says so itself. A pin is the one
place where neither the lints nor the cron can help, so a version move is always worth a line.

## Which skill — derived, never listed

Do not keep a list of which skill handles which class here. It would need editing every time a
skill is added, and a hand-maintained list of someone else's repository goes stale silently.
Resolve it at question time, from two things that are current as a by-product of ordinary work:

1. **The skills repo's own inventory** — the per-skill paragraph in its `CLAUDE.md` and each
   `SKILL.md` description. Every skill either names the surface it drives or names none.
   Naming none is a real answer: the two teardowns drive no Adapty surface and cite no
   articles, so nothing routes to them.
2. **`skill-citations.json`** (`npm run mill:skills`), for the finer question of which file.

## When to add a class

Per **surface**, not per skill. A new skill almost always drives a surface already listed —
the CLI, Flow Builder, the SDK — or none at all. Add a class only when a skill drives an
Adapty surface no class names, such as the Server-side API, webhooks, or Adapty Mail. This is
a trigger condition, not a claim that the list is complete.

## Naming trap when writing this into a brief

The dangling-id check scans backticked tokens in `Reader jobs`, `Ripple rules` and
`Ticket language`, and treats any lowercase hyphenated token free of dots, slashes, capitals
and underscores as an article id. So in those three sections a bare `flow-generator` is
reported dangling, a bare `ads-manager` silently means the **zone**, and `flow-generator-skill`
means the docs article about the skill. Write a path
(`flow-generator/references/flow-schema.md`) or the source id `sdk-integration-skill`.

This catches more than skill names — **any** backticked token of that shape is read as an article
id, tool and script names included. `lint-symbols` is reported dangling; `lint-symbols.mjs` is
both precise and invisible to the scanner. When a token has a real filename, write the filename.
