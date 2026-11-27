"""Units of an MDX file, and the unit-by-unit diff that sync.py and ledger.py share.

A unit is a heading, a block between blank lines, a list item, or a table row. The frontmatter and
code fences hold no units, and a table's separator row isn't one. Each unit knows its first line
(1-based) and its heading path: the headings above it, with a heading's own title last.

diff(old, new) pairs the units of two versions of a file and returns one Entry per unit that
changed, was removed, was added, or moved, with the sentences removed and added. A sentence that
only moved to another unit of the same file counts as neither. trace(old, new) pairs them the same
way and says where each old unit went, so a unit's done mark can follow it (ledger.py).
"""
import difflib, hashlib, re
from dataclasses import dataclass, field

FENCE = re.compile(r"^\s*(`{3,}|~{3,})")
HEADING = re.compile(r"^ {0,3}(#{1,6})(?:[ \t]+(.*?))?[ \t]*$")
ANCHOR = re.compile(r"\s*\{#[^}]*\}\s*$")          # remark-heading-id: "## Title {#anchor}"
CLOSING_HASHES = re.compile(r"[ \t]+#+$")
ITEM = re.compile(r"^\s*(?:[-*+]|\d+[.)])[ \t]+")
ROW = re.compile(r"^\s*\|")
SENTENCE_END = re.compile(r'[.!?]+["”’)\]*_`]*(?=\s+["“‘(\[*_`<]*[A-Z0-9])')
PAIR_RATIO = 0.4    # word similarity for pairing units inside a changed run
REWORD_RATIO = 0.5  # word similarity for pairing a removed sentence with an added one


@dataclass
class Unit:
    kind: str                 # heading, block, item, or row
    start: int                # first line, 1-based
    lines: list
    path: tuple = ()
    level: int = 0            # headings only

    @property
    def text(self):
        return "\n".join(self.lines)

    @property
    def end(self):
        return self.start + len(self.lines) - 1


@dataclass
class Entry:
    kind: str                 # changed, removed, added, or moved
    old: Unit = None          # the unit in the old version (the snapshot)
    new: Unit = None          # the unit in the new version (the live file, or the shipped text)
    removed: list = field(default_factory=list)
    added: list = field(default_factory=list)
    group: int = 0            # entries from one run of changed units share a group

    @property
    def line(self):
        return (self.new or self.old).start

    @property
    def path(self):
        return (self.new or self.old).path


def title(raw):
    """A heading's text without its closing hashes and its {#anchor}."""
    return ANCHOR.sub("", CLOSING_HASHES.sub("", (raw or "").strip())).strip()


def body_start(lines):
    """Index of the first line after the frontmatter (0 without one)."""
    if lines and lines[0].strip() == "---":
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                return i + 1
    return 0


def _separator(line):
    s = line.strip()
    return "-" in s and set(s) <= set("|-: \t")


def parse(text):
    """The units of an MDX text, in order."""
    lines = text.split("\n")
    out, cur, heads, fence = [], None, [], None

    def close():
        if cur is not None:
            out.append(cur)
        return None

    for i in range(body_start(lines), len(lines)):
        line = lines[i]
        if fence:
            if re.match(r"^\s*" + re.escape(fence[0]) + "{" + str(len(fence)) + r",}\s*$", line):
                fence = None
            continue
        m = FENCE.match(line)
        if m:
            cur, fence = close(), m.group(1)
            continue
        if not line.strip():
            cur = close()
            continue
        h = HEADING.match(line)
        if h:
            cur = close()
            level = len(h.group(1))
            heads = [x for x in heads if x[0] < level] + [(level, title(h.group(2)))]
            out.append(Unit("heading", i + 1, [line], tuple(t for _, t in heads), level))
            continue
        path = tuple(t for _, t in heads)
        if ROW.match(line):
            cur = close()
            if not _separator(line):
                out.append(Unit("row", i + 1, [line], path))
            continue
        if ITEM.match(line):
            cur = close()
            cur = Unit("item", i + 1, [line], path)
            continue
        if cur is None:
            cur = Unit("block", i + 1, [line], path)
        else:
            cur.lines.append(line)
    close()
    return out


def key(u):
    """What counts as the unit's content: whitespace, list markers, numbering, cell padding, and
    heading anchors don't."""
    t = u.text
    if u.kind == "heading":
        return "#" * u.level + " " + u.path[-1]
    if u.kind == "row":
        return "|".join(" ".join(c.split()) for c in t.strip().strip("|").split("|"))
    if u.kind == "item":
        t = ITEM.sub("- ", t, count=1)
    return " ".join(t.split())


def split_sentences(s):
    s = " ".join(s.split())
    out, start = [], 0
    for m in SENTENCE_END.finditer(s):
        out.append(s[start:m.end()].strip())
        start = m.end()
    out.append(s[start:].strip())
    return [x for x in out if x]


def sentences(u):
    if u is None:
        return []
    if u.kind == "heading":
        return [u.path[-1]] if u.path and u.path[-1] else []
    if u.kind == "row":
        return [s for c in u.text.strip().strip("|").split("|") for s in split_sentences(c)]
    t = ITEM.sub("", u.text, count=1) if u.kind == "item" else u.text
    return split_sentences(t)


def ratio(a, b):
    return difflib.SequenceMatcher(None, a.split(), b.split(), autojunk=False).ratio()


def align(olds, news):
    """Pair the units of one changed run, keeping their order: [(old or None, new or None)]."""
    if len(olds) == 1 and len(news) == 1:
        return [(olds[0], news[0])]
    m, n = len(olds), len(news)
    sim = [[ratio(key(o), key(x)) for x in news] for o in olds]
    best = [[0.0] * (n + 1) for _ in range(m + 1)]
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            b = max(best[i + 1][j], best[i][j + 1])
            if sim[i][j] >= PAIR_RATIO:
                b = max(b, sim[i][j] + best[i + 1][j + 1])
            best[i][j] = b
    out, i, j = [], 0, 0
    while i < m and j < n:
        if sim[i][j] >= PAIR_RATIO and abs(best[i][j] - (sim[i][j] + best[i + 1][j + 1])) < 1e-9:
            out.append((olds[i], news[j]))
            i, j = i + 1, j + 1
        elif abs(best[i][j] - best[i + 1][j]) < 1e-9:
            out.append((olds[i], None))
            i += 1
        else:
            out.append((None, news[j]))
            j += 1
    return out + [(o, None) for o in olds[i:]] + [(None, x) for x in news[j:]]


def diff(old_text, new_text):
    """One Entry per unit that differs between the two texts, in file order."""
    a, b = parse(old_text), parse(new_text)
    sm = difflib.SequenceMatcher(None, [key(u) for u in a], [key(u) for u in b], autojunk=False)
    pairs = []
    for g, (tag, i1, i2, j1, j2) in enumerate(sm.get_opcodes()):
        if tag != "equal":
            pairs += [(g, o, n) for o, n in align(a[i1:i2], b[j1:j2])
                      if not (o and n and key(o) == key(n))]
    # A unit removed in one place and added unchanged in another moved: one entry, at its new place.
    added_at = {}
    for idx, (g, o, n) in enumerate(pairs):
        if o is None:
            added_at.setdefault(key(n), []).append(idx)
    moved_to, moved_from = {}, set()
    for idx, (g, o, n) in enumerate(pairs):
        if n is None and added_at.get(key(o)):
            moved_to[added_at[key(o)].pop(0)] = o
            moved_from.add(idx)
    old_all = {s for u in a for s in sentences(u)}
    new_all = {s for u in b for s in sentences(u)}
    entries = []
    for idx, (g, o, n) in enumerate(pairs):
        if idx in moved_from:
            continue
        if idx in moved_to:
            entries.append(Entry("moved", moved_to[idx], n, [], [], g))
            continue
        removed = [s for s in sentences(o) if s not in new_all]  # gone from the file, not just moved
        added = [s for s in sentences(n) if s not in old_all]
        kind = "changed" if o and n else ("removed" if o else "added")
        entries.append(Entry(kind, o, n, removed, added, g))
    return entries


def trace(old_text, new_text):
    """Where each unit of old_text went in new_text, paired as diff() pairs them: {old start line:
    (new Unit or None, how)}. how is "same" (its key is unchanged), "moved" (unchanged, elsewhere),
    "changed", "rewritten" (removed, with an added unit of the same run in its place: a rewrite too
    large to pair), or "removed"."""
    a, b = parse(old_text), parse(new_text)
    sm = difflib.SequenceMatcher(None, [key(u) for u in a], [key(u) for u in b], autojunk=False)
    out, removed, added = {}, [], []
    for g, (tag, i1, i2, j1, j2) in enumerate(sm.get_opcodes()):
        if tag == "equal":
            for k in range(i2 - i1):
                out[a[i1 + k].start] = (b[j1 + k], "same")
            continue
        for o, n in align(a[i1:i2], b[j1:j2]):
            if o and n:
                out[o.start] = (n, "same" if key(o) == key(n) else "changed")
            elif o:
                removed.append((g, o))
            else:
                added.append((g, n))
    for g, o in removed:  # removed in one place and added unchanged in another: moved, as in diff()
        hit = next((x for x in added if key(x[1]) == key(o)), None)
        if hit:
            added.remove(hit)
            out[o.start] = (hit[1], "moved")
    for g, o in removed:
        if o.start in out:
            continue
        run = [x for x in added if x[0] == g]
        if run:
            best = max(run, key=lambda x: ratio(key(o), key(x[1])))
            added.remove(best)
            out[o.start] = (best[1], "rewritten")
        else:
            out[o.start] = (None, "removed")
    return out


def unit_key(text):
    """The key of the one unit `text` holds (a mark's text, a logged version), else its words."""
    us = parse(text)
    return key(us[0]) if len(us) == 1 else " ".join(text.split())


def nearest_by_key(us, k, line):
    """The unit of `us` whose key is `k`, nearest to `line`; None when no unit has that key."""
    hits = [u for u in us if key(u) == k]
    return min(hits, key=lambda u: (abs(u.start - line), u.start)) if hits else None


def overlapping(us, start, end):
    """The units of `us` that share a line with start..end."""
    return [u for u in us if u.start <= end and u.end >= start]


def at_line(us, line):
    """The unit that holds `line`, else the first unit after it, else the last one."""
    for u in us:
        if u.start <= line <= u.end:
            return u
    after = [u for u in us if u.start > line]
    return after[0] if after else (us[-1] if us else None)


def headings(text):
    return [u for u in parse(text) if u.kind == "heading"]


def span_at(text, line):
    """(start, end) of the section whose heading is on `line`: up to the next heading of the same or a
    higher level, trailing blank lines dropped."""
    lines = text.split("\n")
    hs = headings(text)
    level = next(h.level for h in hs if h.start == line)
    nxt = [h.start for h in hs if h.start > line and h.level <= level]
    end = nxt[0] - 1 if nxt else len(lines)
    while end > line and not lines[end - 1].strip():
        end -= 1
    return line, end


def find_heading(text, name):
    """The heading a section name points at: its title, or a path such as "Parent > Title".
    Raises LookupError when none matches and ValueError (with the matches) when several do."""
    want = [p.strip() for p in name.split(" > ")]
    hs = headings(text)

    def hits(fold):
        f = (lambda s: s.casefold()) if fold else (lambda s: s)
        return [h for h in hs if len(h.path) >= len(want)
                and [f(x) for x in h.path[-len(want):]] == [f(x) for x in want]]

    found = hits(False) or hits(True)
    if not found:
        raise LookupError(name)
    if len(found) > 1:
        raise ValueError(found)
    return found[0]


def unique_name(text, h):
    """The shortest heading path that finds `h` alone: its title when that's unique."""
    for k in range(1, len(h.path) + 1):
        name = " > ".join(h.path[-k:])
        try:
            if find_heading(text, name).start == h.start:
                return name
        except (LookupError, ValueError):
            continue
    return " > ".join(h.path)


def section_text(text, start, end):
    return "\n".join(text.split("\n")[start - 1:end])


def digest(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def where(path):
    return " > ".join(path) if path else "top of the file"


def fence(text):
    """A backtick fence longer than any fence inside `text`."""
    runs = [len(m.group(1)) for m in re.finditer(r"^\s*(`{3,})", text, re.M)]
    return "`" * max([3] + [r + 1 for r in runs])


def block(label, text):
    f = fence(text)
    return f"{label}:\n\n{f}text\n{text}\n{f}\n"


def render(e, file, day, new_label, level=2):
    """One entry as markdown: a header with the date (when given), the file and line, and the heading
    path, then the skill's version, the other version (`new_label`), and the sentences removed and
    added."""
    lines = []
    if e.kind == "removed":
        head = f"removed (line {e.old.start} of the skill's version)"
    elif e.kind == "moved":
        head = f"moved from line {e.old.start} ({where(e.old.path)})"
    else:
        head = e.kind
    date = f"{day} · " if day else ""
    lines.append(f"{'#' * level} {date}{file}:{e.line} · {where(e.path)} · {head}\n")
    lines.append(block("Skill's version", e.old.text) if e.old else "Skill's version: none\n")
    if e.kind == "moved":
        lines.append(f"{new_label}: the same text, at line {e.new.start}\n")
    else:
        lines.append(block(new_label, e.new.text) if e.new else f"{new_label}: removed\n")
    for name, items in (("Removed", e.removed), ("Added", e.added)):
        lines.append(f"{name}:\n" + "".join(f"- {s}\n" for s in items) if items else f"{name}: none\n")
    return "\n".join(lines)


def _short(s, n=120):
    s = " ".join(s.split())
    return s if len(s) <= n else s[:n - 1] + "…"


def _span(words, lo, hi, context=2):
    return " ".join(words[max(0, lo - context):min(len(words), hi + context)])


NOUN = {"block": "paragraph", "item": "list item", "row": "table row", "heading": "heading"}


def _count(kinds):
    parts = [f"{kinds.count(k)} {NOUN[k]}{'s' if kinds.count(k) > 1 else ''}" for k in NOUN if k in kinds]
    return parts[0] if len(parts) == 1 else ", ".join(parts[:-1]) + " and " + parts[-1]


def _reworded(r, a):
    """How sentence r became sentence a: one changed span with its context, or the two sentences."""
    rw, aw = r.split(), a.split()
    ops = [op for op in difflib.SequenceMatcher(None, rw, aw, autojunk=False).get_opcodes() if op[0] != "equal"]
    if len(ops) == 1:
        _, i1, i2, j1, j2 = ops[0]
        return f'the writer changed "{_short(_span(rw, i1, i2))}" to "{_short(_span(aw, j1, j2))}"'
    return f'the writer reworded "{_short(r)}" as "{_short(a)}"'


def _sentence_changes(e):
    removed, added = list(e.removed), list(e.added)
    if len(removed) == 1 and len(added) == 1:  # the unit's one changed sentence was reworded
        return [_reworded(removed[0], added[0])]
    out = []
    for r in list(removed):
        best = max(added, key=lambda x: ratio(r, x), default=None)
        if best is not None and ratio(r, best) >= REWORD_RATIO:
            removed.remove(r)
            added.remove(best)
            out.append(_reworded(r, best))
    out += [f'the writer cut "{_short(r)}"' for r in removed]
    out += [f'the writer added "{_short(x)}"' for x in added]
    return out or ["the writer rearranged this unit"]


def candidates(entries, file):
    """Strike-list candidates: one line per change, naming what the writer changed."""
    kinds = {}
    for e in entries:
        olds, news = kinds.setdefault(e.group, ([], []))
        if e.kind != "moved":
            olds += [e.old.kind] if e.old else []
            news += [e.new.kind] if e.new else []
    out, seen = [], set()
    for e in entries:
        loc = f"{file}:{e.line} ({where(e.path)})"
        olds, news = kinds[e.group]
        if e.group not in seen and olds and news and set(olds) != set(news):
            out.append(f"- {loc}: the writer turned {_count(olds)} into {_count(news)}")
        seen.add(e.group)
        if e.kind == "moved":
            lines = [f'the writer moved "{_short(e.new.text, 60)}" from line {e.old.start} ({where(e.old.path)})']
        elif e.kind == "removed":
            lines = [f'the writer cut "{_short(e.old.text)}"']
        elif e.kind == "added":
            lines = [f'the writer added "{_short(e.new.text)}"']
        elif e.old.kind == "heading" and e.new.kind == "heading":
            lines = [f'the writer retitled "{e.old.path[-1]}" as "{e.new.path[-1]}"']
        else:
            lines = _sentence_changes(e)
        out += [f"- {loc}: {l}" for l in lines]
    return out
