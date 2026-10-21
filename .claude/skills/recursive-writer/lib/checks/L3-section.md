# L3 Section

**Applies when:** an added, moved, or cut sentence or paragraph; a section with three or more paragraphs; a section over about 300 words; the frame check says the text may not belong in its section.
**Triggers:** ^#{2,6}\s|\S[^\n]*\n[ \t]*\n[\s\S]*?\S[^\n]*\n[ \t]*\n[\s\S]*?\S|(?:(?!\n#{1,6}\s)[\s\S]){1800}
**Flags:** --change --opener
**Requires:** the text advances the section heading's promise, placed where the reader acts on it.
**Evidence:** the section promise it serves.

- A fact goes where the reader acts on it or forms the expectation: a requirement inside the step that
  needs it; prevention in setup, not troubleshooting. A callout the reader needs before the body (a
  main-article link, orientation, a prerequisite, a warning) goes directly under the heading; one that
  applies only after the body goes after it.
- Prerequisites name what the reader must have or have done, in checkable terms; none repeats what
  the article sets up. What the reader likely has already is a requirement, with its creation as a
  short fallback. A state that exists before setup (a default-on setting, an existing connection) is a
  one-line prerequisite, with where to check it, not a step.
- Information for several subsections goes at the top of the section.
- Section ladder: a section over about 300 words, with three or more paragraphs, or with more than
  five units (paragraphs, lists, tables, procedures), gets checked for a better organization (group
  under a shared point, a list, merge, reorder) or subsections. Split it when its units fall into two
  or more groups the reader could look for separately (a task, a case or platform, a phase); each group
  becomes a subsection whose heading names what the reader does or learns there. An H3 shows in the
  table of contents and an H4 doesn't, so the section's lead links each H4. Climb down: a subsection
  with one short unit merges back, unless the reader may look for it on its own or it doesn't fit the
  rest of the section. A section with a single subsection needs text of its own before it, text that
  no subsection covers; otherwise merge them. Groups for different readers or paths go up a level
  instead: a separate section or article (L4). Evidence: the word and unit count, what links each
  paragraph to the promise, the groups found, and the verdict. Cost 6.
- Budget, for a section you write or review, or when a fix adds words to it: list the facts the reader
  acts on, and count the section's words. Text that carries none of those facts goes: mechanism the
  reader never sees, repetition, a restatement of what the UI shows. Count the options of one choice as one fact.
  Evidence: the fact list, the word count before and after, and the words per fact. Over about 12
  words per fact, cut until it fits; a rewrite that's still over budget fails. Cost 6.
