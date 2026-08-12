# Context mill — scope rules

What earns a doc, what doesn't, and at what depth. These hold **across the whole
corpus**, so a zone brief's `What we document, what we don't` section carries only
its *delta* from this file — never a restatement of it. A rule copied into 28
briefs is 28 places that will disagree with each other later.

This file is about **scope**. Writing style — sentence length, banned words, list
formatting, heading parallelism — belongs to the `editor` skill, not here.

## What does not earn a doc

- **Setup steps most users never perform.** When a step is auto-provisioned for
  the majority (because they arrived through an integration path that does it for
  them), it gets one acknowledgement sentence and a link, not a procedure. Writing
  the full steps makes every reader pay for a minority's path.
- **Obvious UI affordances.** An inline checklist, a status badge, a tooltip, a
  disabled button with a hint — the reader sees these in the browser. Document
  what the interface *cannot* convey: what a setting silently affects, what order
  things must happen in, what a number actually counts.
- **Internal plumbing that happens to appear in an MR.** A merge request contains
  everything the change touched, most of which no customer can observe. The test
  is whether a reader can act on it or is affected by it — not whether it changed.
- **A per-platform equivalent nobody asked for.** Not every topic needs an article
  on all seven platforms. An empty cell in a family matrix is not a gap; see the
  matrix note in `SKILL.md`.

## Depth and duplication

- **Aim for no duplication, via snippets and links — but be rational about it.**
  Reusable snippets in `src/components/reusable/` are the right tool for content
  that must stay identical. They are also frequently `Callout` components, and a
  stack of callouts uglifies an article. Prefer a link when the content is merely
  *related*; reserve a reusable for content that would be a defect if it drifted.
- **A cross-link to a related feature is a `:::tip` placed right before the first
  `##` heading**, not a sentence tacked onto the end of some section.
- **Don't add `keywords` to frontmatter** unless explicitly asked. They feed doc
  search, and speculative terms pollute it.

## Claims that need evidence before they are written

- **Per-platform applicability.** "Platform X uses the same toolchain, so this
  applies there too" is not evidence. Require a filed case or a demonstrable
  default-configuration exposure before extending a caveat to another platform.
- **Field composition** — which integrations or payloads carry a given field —
  must be read out of backend code, never inferred from how a neighbouring doc
  describes a similar field.
- **Absence.** "This is not documented anywhere" cannot be established from inside
  one zone; the answer is often in a neighbouring zone under a framing nobody
  searched for. State the grep that established the absence, and prefer
  "documented only as X, not for Y" — mislocated is far more common than missing.

## Naming that is settled

- It is the **Server-side API**. Never "Server API".
- Only the YAML specs under `src/api-reference/specs/` are maintained API
  references. `server-side-api-objects.mdx`, `web-api-objects.mdx` and `Offer.md`
  are not — never edit them to describe a field change.
- Bare "here" as link text is an accepted convention in this corpus. Don't flag it.
