"""Growth flag for apply_pairs.py --lint: a unit that a pair makes longer by whole sentences.

A unit is a block between blank lines, or one list item; frontmatter-free text, code fences skipped.
When a pair keeps the same number of units but a unit gains sentences, the fix appended instead of
reshaping (rw-edit, step 3c). A pair that changes the number of units (a split, a new list) is a
reshape and isn't flagged.
"""
import re

_ITEM = re.compile(r"^\s*(?:[-*]|\d+\.)\s")
_SENTENCE_END = re.compile(r"(?<=[.!?])\s+(?=[A-Z*\[`\"(])")


def units(text):
    out, buf, fence = [], [], False
    for line in text.split("\n"):
        if line.strip().startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        if not line.strip():
            if buf:
                out.append(" ".join(buf))
                buf = []
            continue
        if _ITEM.match(line) and buf:
            out.append(" ".join(buf))
            buf = []
        buf.append(line.strip())
    if buf:
        out.append(" ".join(buf))
    return out


def sentences(unit):
    return len([s for s in _SENTENCE_END.split(unit) if s.strip()])


def flags(pairs, label=lambda f: f):
    """One line per unit that grew by whole sentences, for each pair in `pairs`."""
    lines = []
    for p in pairs:
        old, new = units(p.get("old", "")), units(p.get("new", ""))
        if len(old) != len(new):
            continue
        for a, b in zip(old, new):
            n, m = sentences(a), sentences(b)
            if m > n:
                lines.append(f"{label(p['file'])}: unit grew from {n} to {m} sentences. Reshape it "
                             f"(a list, a split, a tip) instead of appending (rw-edit, step 3c).")
    return lines
