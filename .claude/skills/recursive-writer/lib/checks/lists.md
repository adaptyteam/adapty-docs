# Lists

**Applies when:** a comma enumeration; a list; a table; a paragraph over 30 words; a section with three or more paragraphs (lists and tables don't count).
**Triggers:** ([^,.\n]+,\s+){2,}[^,.\n]*\b(and|or)\b|^[ \t]*(?:[-*]|\d+\.)[ \t]|^\|.*\||^(?![ \t]*(?:[-*>|#<]|\d+\.|:::|```|import ))\S(?:[^\n]*?\s){30}|^(?![ \t]*(?:[-*>|#<]|\d+\.|:::|```|import ))\S[^\n]*\n(?:(?!#{1,6}\s)[^\n]*\n)*?(?![ \t]*(?:[-*>|#<]|\d+\.|:::|```|import ))\S[^\n]*\n(?:(?!#{1,6}\s)[^\n]*\n)*?(?![ \t]*(?:[-*>|#<]|\d+\.|:::|```|import ))\S
**Requires:** a list wherever the items benefit from their own line, or a sentence or two each. Lists
read better than long sentences in sequence.
**Evidence:** the items, and the verdict: list or inline.

- Inline only for two items, or for a set that is incidental to the sentence's point ("on iOS, Android,
  and web"). Items the sentence exists to name go in a list, however short: length is no exemption.
- A list gets a lead-in that names what the items are; words every item repeats move to the lead-in.
  The lead-in is the simplest plain statement or condition; it never chains an instruction into the
  list. Nothing goes between a lead-in and its list: an image or a callout goes after the list.
- Form ladder: paragraph → list → two-tier list → table. Climb a rung when the text crosses its threshold:
  - Paragraph → list: three or more parallel items (options, conditions, requirements, facts of one
    kind), whether in consecutive sentences or paragraphs, or in a comma run; or sentences the reader
    scans for one item. A chain of reasoning, where each sentence needs the one before, stays a
    paragraph; a sequence of actions is a numbered procedure (`06`).
  - List → two-tier list: the items fall into groups the reader picks between (by platform, by case),
    or an item carries two or more points of its own. Never deeper than two tiers.
  - List → table: every item answers the same two or more questions (the same sub-labels under each
    parent, or bold-label items that each state the same kinds of fact). One row per item, one column
    per question. A complex single-tier list qualifies too.
  - Climb down when a rung adds nothing: a table with one data column is a list; a two-item list with
    nothing to compare is a sentence; table cells that need more than a sentence go back to a list.

