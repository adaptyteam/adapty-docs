# 07 Terms

**Applies when:** always.
**Requires:** every term is the one the reader knows or will see on screen, with one meaning.
**Evidence:** per term, its source (UI string, code, vendor docs, existing docs). Grep the frontend
before bolding a label. Current product terms: reference/product-terms.md.

- UI labels verbatim. A casing difference isn't a finding: fix it silently.
- No coined names ("levels"): if the UI has no label, describe the thing.
- Metric names take sentence case.
- A UI tab or section name marks a location, not a category: name the things in it.
- Familiar reader words beat backend words, jargon, and UI copy that reads poorly.
- No collisions: qualify a term that shadows another product's or another Adapty product's term. One
  term, one meaning per article; two things never share a name. One concept, one name: a synonym reads
  as a second thing. Take the UI's name, else the one the related articles use.
