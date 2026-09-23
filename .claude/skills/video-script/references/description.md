# description.md

## Template

```
<One paragraph. What the video shows, and what the viewer walks away able to do.>

What you'll learn:

- <capability>
- <capability>

Timestamps:

MM:SS Chapter
MM:SS Chapter

Watch next:

- <Video title>: https://youtu.be/<id>

Docs:

- <Article title>: https://adapty.io/docs/<slug>

🙋 Need help?
Join the Adapty Community on X — get tips, answers, and support from fellow developers:

https://x.com/i/communities/1904473118204203394

Or post questions and get help on our support forum: https://adapty.featurebase.app/
```

Section order is fixed. Of 21 descriptions: all have Docs and the community block, 18 have "What
you'll learn", 17 have Timestamps, 4 have "Watch next".

## Sections

**Opening paragraph** — one paragraph, no heading.

**What you'll learn** — 3–5 bullets, each a capability gained. Keep the opener consistent within a
file: all "How to…", or all imperative. Don't mix.

**Watch next** — optional. Include when related videos are published and you have real URLs. Omit
rather than guess an ID.

**Docs** — every URL must resolve. The slug is the MDX filename, whatever the folder.

**Community block** — verbatim, emoji included.

## Chapter selection

**Not every Part earns a chapter.** Chapters are navigation, not a table of contents.

- **Exclude Intro and Outro.** No existing description chapters them.
- **Exclude short transitional beats.** A 20–30 second segment that only pays off the Part before it
  is not somewhere a viewer navigates to.
- **Include a Part when someone might arrive for that alone** — a distinct task, concept, or surface.
- Four or five suits a 3–4 minute video; existing ones run 3–4.

Take times from the SRT, at the **first narration line** of the Part — not the heading, not the visual
cue before it.

## Verify the slugs

```bash
grep -oE "adapty\.io/docs/[a-z0-9-]+" description.md | sed 's|.*/||' \
  | while read s; do [ -n "$(find ~/Work/adapty-docs/src/content/docs -name "$s.mdx")" ] \
  || echo "MISSING: $s"; done
```
