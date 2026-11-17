# L4 Article

**Applies when:** a heading; an added, moved, or cut sentence or paragraph; a whole draft; the frame check says the text may not belong in the article.
**Triggers:** ^#{2,6}\s
**Flags:** --opener
**Requires:** the content belongs in this article, at this weight, in the order of the reader's path.
**Evidence:** the article promise it serves (from the frame), or the article it belongs in instead.

- Cut or move: a niche case in the intro (unless the article is about that niche and the case shows
  its purpose best); content for another audience (a section only for migrating readers goes to the
  migration article, with a one-line pointer here); a full list where a mention and a link do.
- One owner article per topic; others link. A fact about a general mechanism belongs to its owner
  article even when a feature task surfaced it; the feature article keeps what is specific to the
  feature, and links. A move takes the copy out of the source in the same change. Within the docs, one
  owner per fact: elsewhere, a short mention and a link. Repeat a rule briefly where readers act on it
  only when a wrong assumption there is easy (who is eligible, what a number includes).
- Sibling count: 5 or fewer task sections at one level is fine; 6-7, group them where they share a goal;
  8 or more, restructure to 3-5, by grouping or by splitting the article. Pure reference pages (one
  section per symptom, metric, or question) are exempt.
- Cover what the reader needs and the draft lacks (every store and platform the reader can be on, in
  parallel; routes to one result follow `06`: one route, the easiest): this check adds as well as cuts.
- Order: what it covers, decisions with the information they need, the task (a pointer to the next
  article comes after this article's first step), what happens after, then, if any, upkeep,
  limitations, troubleshooting. Limitations hold only what the product can't do in any case, in one
  section at the end, each with its cause (name the third party when the limit is theirs), unless the
  limit changes a step. Behavior that only may or sometimes happens is a troubleshooting symptom with
  its fix, or nothing. Troubleshooting holds only problems readers are known to hit. Expected behavior
  and requirements go into the steps, and an unreleased feature has neither. Within a section: who it
  applies to, why, what to do, then how.
  Reference for what the reader sees on screen comes in the screen's order, before the tasks that use
  it; how it works goes after the task. Rare cleanup goes last. A section never splits one task: a
  tool a later step needs is introduced inside that step, or before the whole task.
- Each section is one kind: a task, reference to one screen object, or limitations. One level can mix
  kinds; a reference section never takes a task heading. The options of one
  control (one menu, one dialog) form one list under one goal, not one section each, unless they serve
  different moments of the reader's path. For the same kind of element (a column header, a
  reference-list opener), mirror the closest sibling's form.
- Diverging reader paths split structurally (separate article, tabs, a heading over the fork), never
  in prose ("skip this section"). An opt-out based on the reader's current plans ("skip if you only
  run X") goes: prescribe the setup that works in every case.
- Structure evidence: per H2, what the reader does or learns there and how it follows the previous H2.
- Article opener and frontmatter description: first who it's for (app, platform, version, case), then
  what they get from the Adapty side, in plain words, never a failure scenario; a redirect for other readers before running
  setups. Evidence: who it's for and what they get, quoted from the opener.
