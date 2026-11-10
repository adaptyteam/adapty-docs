# 07 Terms

**Applies when:** always.
**Requires:** every term is the one the reader knows or will see on screen, with one meaning.
**Evidence:** per term, its source (UI string, vendor docs, existing docs, or code when the reader
writes code). Grep the frontend before bolding a label. Current product terms:
reference/product-terms.md.

- UI labels verbatim. A casing difference isn't a finding: fix it silently.
- No coined names ("levels"): if the UI has no label, describe the thing. A term found only in the
  session folder (the frame, the facts, the reader questions, the outlines) is a coined name too.
- Metric names take sentence case.
- A UI tab or section name marks a location, not a category: name the things in it.
- Familiar reader words beat backend words, jargon, and UI copy that reads poorly.
- No collisions: qualify a term that shadows another product's or another Adapty product's term. One
  term, one meaning per article; two things never share a name. One concept, one name: a synonym reads
  as a second thing. For a part of iOS, Android, or a store, take the name the vendor uses; for
  anything else, the UI's name, else the one the related articles use.
