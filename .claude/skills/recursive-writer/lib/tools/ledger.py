"""The ticket's ledger: the done marks, and the close-out after the PR merges.

  python3 ledger.py done <file> [--section "<heading text>"]
  python3 ledger.py done --from-pairs <pairs.json>
  python3 ledger.py file-done <file>
  python3 ledger.py status <file>
  python3 ledger.py close [--base <ref>] [--base-dir <dir>]

Everything lives in the session folder (paths.sessions_dir(): <repo>/_temp/<ticket ID>/, or
RR_SESSIONS_DIR). Run it from the docs repo root. A mark in ledger.md holds a unit (units.py: a
heading, a block between blank lines, a list item, or a table row), a section, or the whole article:
its text, the date, a hash, and its source (next-item or file-done; a mark by hand has none).

- done <file> [--section]: a mark by hand. Syncs the file first (sync.py), then records the current
  text of the section (from its heading to the next heading of the same or a higher level) or of the
  whole article. Marking the same span again replaces its mark. A section name is a heading's text,
  or a path such as "Parent > Heading" when the text alone matches several headings.
- done --from-pairs <pairs.json>: the mark when the writer moves on to the next item. Syncs each file
  in the pairs, then marks the unit (or units) each applied pair changed, as the text reads now
  (source: next-item). It finds the unit by the pair's "new" text. When the writer changed that text
  by hand first, it follows the unit through hand-edits.md (or takes the unit at its last logged
  line), and notes "edited by hand before the mark". A pair whose "new" text is in neither the file
  nor the log isn't applied: it gets no mark. A new mark replaces the file's earlier mark of the
  same unit.
- file-done <file>: when the work moves on to the next file, or the writer says the file is done.
  Syncs the file, refreshes every mark in it to the live text ("refreshed at file done" when the text
  changed), and records or refreshes the article mark (source: file-done).
- Each done command gives a file without a snapshot one, so sync follows its marks from then on.
- status: lists the file's marks, and whether the live text still matches each one.
- follow(), called by sync.py: a hand edit inside a marked span updates the mark to the writer's text
  and notes "updated by hand"; a marked section or unit the writer removed is noted "removed by hand".
- close: for each file in applied/index.json, compares the shipped text with the last snapshot, unit
  by unit, and writes close-out.md: each changed unit (the skill's version and the shipped version),
  then the strike-list candidates, one line each. The shipped text is `git show <ref>:<path>` (default
  ref origin/main; an origin/<branch> ref is fetched first, `git fetch origin <branch>`), or
  <base-dir>/<path>. It proposes; it never edits the strike list.
"""
import argparse, datetime, json, os, re, subprocess, sys
from dataclasses import dataclass, field

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import paths, sync, units  # noqa: E402

HEADER = ("# Done marks\n\n"
          "Units, sections, and articles marked done. Their text is approved (lib/checks/11-approved.md):\n"
          "never reword it unless the writer asks or a fact in it is wrong. A unit gets its mark when the\n"
          "writer moves on to the next item (source: next-item), the article when the work moves on to the\n"
          "next file (source: file-done); a mark without a source is one the writer asked for. Sync keeps\n"
          "each mark current with the writer's hand edits (\"updated by hand\"), and file-done refreshes\n"
          "every mark of its file to the live text.\n")
ENTRY = re.compile(r'^## (?P<path>.+?): (?:section "(?P<section>.*)"|the whole article'
                   r'|unit at line (?P<line>\d+) in "(?P<where>.*)")\s*$')
OPEN = re.compile(r"^(`{3,})text\s*$")
FIELD = re.compile(r"^- (Marked done|Source|Hash|Updated by hand|Refreshed at file done|Removed by hand|Note): (.*)$")
HASH = 12  # hex digits of sha256 kept in ledger.md
NEXT_ITEM, FILE_DONE = "next-item", "file-done"
BY_HAND = "edited by hand before the mark"


@dataclass
class Mark:
    path: str                       # repo-relative, as in applied/index.json
    section: str = None             # a section mark: the section's name
    line: int = None                # a unit mark: the unit's first line
    where: str = ""                 # a unit mark: its heading path
    marked: str = ""
    source: str = None              # next-item or file-done; None: marked by hand
    hash: str = ""
    updated: list = field(default_factory=list)
    refreshed: list = field(default_factory=list)
    removed: str = None
    notes: list = field(default_factory=list)
    text: str = None
    extra: list = field(default_factory=list)  # any other lines, kept as they are

    @property
    def kind(self):
        return "unit" if self.line is not None else ("article" if self.section is None else "section")

    @property
    def label(self):
        if self.kind == "unit":
            return f'unit at line {self.line} in "{self.where}"'
        return "the whole article" if self.section is None else f'section "{self.section}"'


def today():
    return datetime.date.today().isoformat()


def short_hash(text):
    return units.digest(text)[:HASH]


def ledger_file(d):
    return os.path.join(d, "ledger.md")


def need_folder():
    d = sync.folder()
    if not d:
        sys.exit("ledger.py: no session folder (run it from the docs repo, or set RR_SESSIONS_DIR)")
    return d


def ensure_snapshot(file, d, where, source):
    """Give a file without a snapshot one, so sync follows its marks from then on."""
    if not os.path.isfile(os.path.join(sync.store(d), where[1])):
        sync.save_snapshot(file, None, d, source=source, where=where)


def read_marks(p):
    """(the text before the first mark, [Mark]) from ledger.md; (None, []) when it doesn't exist."""
    try:
        lines = sync.read(p).split("\n")
    except OSError:
        return None, []
    pre, marks, cur, i = [], [], None, 0
    while i < len(lines):
        line = lines[i]
        m = ENTRY.match(line)
        o = OPEN.match(line)
        if m:
            cur = Mark(m.group("path"), m.group("section"))
            if m.group("line"):
                cur.line, cur.where = int(m.group("line")), m.group("where")
            marks.append(cur)
        elif cur is None:
            pre.append(line)
        elif o and cur.text is None:
            body, i = [], i + 1
            while i < len(lines) and lines[i] != o.group(1):
                body.append(lines[i])
                i += 1
            cur.text = "\n".join(body)
        elif FIELD.match(line):
            k, v = FIELD.match(line).groups()
            v = v.strip()
            if k == "Marked done":
                cur.marked = v
            elif k == "Source":
                cur.source = v
            elif k == "Hash":
                cur.hash = v.removeprefix("sha256:")
            elif k == "Updated by hand":
                cur.updated = [x.strip() for x in v.split(",") if x.strip()]
            elif k == "Refreshed at file done":
                cur.refreshed = [x.strip() for x in v.split(",") if x.strip()]
            elif k == "Note":
                cur.notes.append(v)
            else:
                cur.removed = v
        elif line.strip():
            cur.extra.append(line)
        i += 1
    pre = "\n".join(pre).strip("\n")
    return (pre + "\n" if pre else None), marks


def write_marks(p, pre, marks):
    out = [(pre or HEADER).rstrip("\n") + "\n"]
    for mk in marks:
        lines = [f"## {mk.path}: {mk.label}", "", f"- Marked done: {mk.marked}"]
        if mk.source:
            lines.append(f"- Source: {mk.source}")
        lines.append(f"- Hash: sha256:{mk.hash}")
        if mk.updated:
            lines.append("- Updated by hand: " + ", ".join(mk.updated))
        if mk.refreshed:
            lines.append("- Refreshed at file done: " + ", ".join(mk.refreshed))
        if mk.removed:
            lines.append(f"- Removed by hand: {mk.removed}")
        lines += [f"- Note: {n}" for n in mk.notes]
        lines += mk.extra
        if mk.text is not None and not mk.removed:
            f = units.fence(mk.text)
            lines += ["", f + "text", mk.text, f]
        out.append("\n".join(lines) + "\n")
    sync.write(p, "\n".join(out))


def locate(text, mk, fuzzy=False, us=None):
    """The unit a unit mark stands for in `text`: the unit with the mark's text, nearest to the mark's
    line. With fuzzy, when no unit has that text: the most similar unit (word similarity of
    units.PAIR_RATIO or more), the nearest one on a tie. None when there's none."""
    us = units.parse(text) if us is None else us
    k = units.unit_key(mk.text or "")
    u = units.nearest_by_key(us, k, mk.line)
    if u or not fuzzy:
        return u
    scored = [(units.ratio(k, units.key(x)), -abs(x.start - mk.line), x) for x in us]
    scored = [s for s in scored if s[0] >= units.PAIR_RATIO]
    return max(scored, key=lambda s: (s[0], s[1]))[2] if scored else None


def span(text, mk):
    """(start, end) lines of the mark's span in `text`, or None when it isn't there. A unit mark is
    found by its text only."""
    if mk.kind == "unit":
        u = locate(text, mk)
        return (u.start, u.end) if u else None
    if mk.kind == "article":
        return 1, len(text.rstrip("\n").split("\n"))
    try:
        return units.span_at(text, units.find_heading(text, mk.section).start)
    except (LookupError, ValueError):
        return None


def span_text(text, mk, s):
    return text.rstrip("\n") if mk.kind == "article" else units.section_text(text, *s)


def follow_unit(mk, old, moves, day):
    """Follow a unit mark through one sync (old: the snapshot; moves: units.trace(old, live)).
    Returns 1 when the mark changed."""
    u = locate(old, mk)
    if u is None:  # the snapshot no longer holds the marked text (the skill changed it): file-done refreshes it
        return 0
    n, how = moves.get(u.start, (None, "removed"))
    if n is None:
        mk.removed = day
        if day not in mk.updated:
            mk.updated.append(day)
        return 1
    before = (mk.line, mk.where, mk.text)
    mk.line, mk.where = n.start, units.where(n.path)
    if n.text != mk.text:
        mk.text, mk.hash = n.text, short_hash(n.text)
    if how in ("changed", "rewritten") and day not in mk.updated:
        mk.updated.append(day)
    return int((mk.line, mk.where, mk.text) != before)


def follow(d, rel, old, new, entries, day):
    """Update the marks of `rel` that the hand edits in `entries` (old: the snapshot, new: the live
    text) fall in. Returns the number of marks updated."""
    p = ledger_file(d)
    pre, marks = read_marks(p)
    changed, moves = 0, None
    for mk in marks:
        if mk.path != rel or mk.removed:
            continue
        if mk.kind == "unit":
            moves = units.trace(old, new) if moves is None else moves
            changed += follow_unit(mk, old, moves, day)
            continue
        before, after = span(old, mk), span(new, mk)
        if after is None and before is not None:  # the heading changed: follow it to its new text
            he = next((e for e in entries if e.old and e.old.start == before[0]), None)
            renamed = he.new if he and he.new and he.new.kind == "heading" else None
            if he and renamed is None:  # a rewrite too large to pair: an added heading in the same run
                renamed = next((e.new for e in entries if e.group == he.group and e.old is None and e.new
                                and e.new.kind == "heading" and e.new.level == he.old.level), None)
            if renamed:
                after = units.span_at(new, renamed.start)
                mk.section = units.unique_name(new, renamed)
        inside = mk.kind == "article" or any(
            (e.old and before and before[0] <= e.old.start <= before[1])
            or (e.new and after and after[0] <= e.new.start <= after[1]) for e in entries)
        if not inside:
            continue
        if after is None:
            mk.removed = day
        else:
            mk.text = span_text(new, mk, after)
            mk.hash = short_hash(mk.text)
        if day not in mk.updated:
            mk.updated.append(day)
        changed += 1
    if changed:
        write_marks(p, pre, marks)
    return changed


def done(file, section=None):
    d = need_folder()
    if not os.path.isfile(file):
        sys.exit(f"ledger.py: no such file: {file}")
    line = sync.sync_file(file, d)[1]
    if line:
        print(line)
    where = sync.rel_path(file)
    rel = where[1]
    ensure_snapshot(file, d, where, "done")
    text = sync.read(file)
    mk = Mark(rel)
    if section is not None:
        try:
            h = units.find_heading(text, section)
        except LookupError:
            names = "; ".join(f"{h.start}: {h.path[-1]}" for h in units.headings(text))
            sys.exit(f'ledger.py: no heading "{section}" in {rel}. Headings: {names}')
        except ValueError as e:
            found = e.args[0]
            lines = ", ".join(str(h.start) for h in found)
            hint = (f'pass a path, such as "{" > ".join(found[0].path)}"' if len({h.path for h in found}) > 1
                    else "they share one heading path, so mark the whole article instead")
            sys.exit(f'ledger.py: several headings match "{section}" in {rel} (lines {lines}); {hint}')
        mk.section = units.unique_name(text, h)
    s = span(text, mk)
    mk.text = span_text(text, mk, s)
    mk.marked, mk.hash = today(), short_hash(mk.text)
    p = ledger_file(d)
    pre, marks = read_marks(p)
    same = [i for i, m in enumerate(marks) if m.path == rel and m.kind == mk.kind and m.section == mk.section]
    if same:
        marks[same[0]] = mk
    else:
        marks.append(mk)
    write_marks(p, pre, marks)
    print(f"Marked done: {rel}, {mk.label} (lines {s[0]}-{s[1]}, sha256:{mk.hash}), in {p}")


def norm(s):
    return " ".join(s.split())


def outside(text, s, other):
    """The offsets of `s` in `text`, leaving out those inside an occurrence of `other`."""
    def find_all(x):
        out, i = [], text.find(x) if x else -1
        while i >= 0:
            out.append(i)
            i = text.find(x, i + 1)
        return out
    spans = [(a, a + len(other)) for a in find_all(other)] if other else []
    return [b for b in find_all(s) if not any(a <= b and b + len(s) <= e for a, e in spans)]


def covering(us, text, b, s):
    """The units of `us` (parsed from `text`) that hold text[b:b + len(s)]."""
    lead = len(s) - len(s.lstrip("\n"))
    body = s.strip("\n")
    if not body:
        return []
    first = text.count("\n", 0, b + lead) + 1
    return units.overlapping(us, first, first + body.count("\n"))


def edited(u, log):
    """True when a hand edit in `log` made the unit u what it is now."""
    return any(e.kind == "changed" and e.writer is not None and units.unit_key(e.writer) == units.key(u)
               for e in log)


def through_log(us, piece, log):
    """Follow the unit whose skill's version held `piece` through the writer's hand edits (`log`,
    oldest first). Returns (False, None) when no logged skill's version holds it, (True, None) when
    the writer removed the unit, and (True, the live unit) otherwise: the unit with the writer's
    latest version, or the unit at its last logged line."""
    want = norm(piece)
    i = next((j for j in range(len(log) - 1, -1, -1) if log[j].skill and want in norm(log[j].skill)), None)
    if i is None:
        return False, None
    while True:
        e = log[i]
        if e.writer is None:  # removed; a rewrite too large to pair logs the new text as the next entry
            nxt = log[i + 1] if i + 1 < len(log) else None
            if not (nxt and nxt.kind == "added" and nxt.day == e.day and nxt.writer):
                return True, None
            i, e = i + 1, nxt
        k = units.unit_key(e.writer)
        u = units.nearest_by_key(us, k, e.line)
        if u:
            return True, u
        j = next((j for j in range(i + 1, len(log)) if log[j].skill and units.unit_key(log[j].skill) == k), None)
        if j is None:  # the trail ends: the nearest unit at that position
            return True, units.at_line(us, e.line)
        i = j


def changed_units(live, us, old, new, log):
    """The live units one pair changed, each with True when the writer edited it by hand first; and,
    when there are none, why."""
    if old == new:
        return [], "it changes nothing"
    if not new.strip():
        return [], "it only deletes text, so no unit is left to mark"
    news = outside(live, new, old)
    if news and not outside(live, old, new):
        if len(news) > 1:
            return [], f"its new text occurs {len(news)} times; mark the section by hand instead"
        b = news[0]
        before = live[:b] + old + live[b + len(new):]  # the text as it was before the pair
        hits = [e.new for e in units.diff(before, live) if e.new is not None]
        if not hits:
            return [], "it changes no unit (only code, frontmatter, whitespace, or list markers)"
        return [(u, edited(u, log)) for u in hits], None
    # The new text isn't in the file: if the pair was applied, the writer changed it by hand since.
    pieces = [e.new.text for e in units.diff(old, new) if e.new is not None] or [u.text for u in units.parse(new)]
    hits, logged = [], False
    for pc in pieces:
        in_log, u = through_log(us, pc, log)
        if in_log:
            logged = True
            if u:
                hits.append((u, True))
            continue
        offs = outside(live, pc, old)  # a part the writer left alone
        if len(offs) == 1:
            hits += [(x, False) for x in covering(us, live, offs[0], pc)]
    if not logged:
        return [], "not applied: its new text is in neither the file nor hand-edits.md"
    return (hits, None) if hits else ([], "the writer removed it by hand before the mark")


def stands_for(live, us, m, u):
    """True when the unit mark m stands for the live unit u."""
    x = locate(live, m, fuzzy=True, us=us)
    return x is not None and x.start == u.start


def done_from_pairs(pairs_path):
    d = need_folder()
    try:
        with open(pairs_path, encoding="utf-8") as fh:
            pairs = json.load(fh)
    except (OSError, ValueError) as e:
        sys.exit(f"ledger.py: can't read the pairs in {pairs_path}: {e}")
    if not isinstance(pairs, list) or not all(
            isinstance(x, dict) and all(isinstance(x.get(k), str) for k in ("file", "old", "new")) for x in pairs):
        sys.exit(f'ledger.py: {pairs_path} isn\'t a pairs file ([{{"file": ..., "old": ..., "new": ...}}, ...])')
    day, p = today(), ledger_file(d)
    made, skipped = [], []
    for f in dict.fromkeys(x["file"] for x in pairs):
        if not os.path.isfile(f):
            skipped.append(f"No mark for {f}: no such file")
            continue
        if not f.endswith((".md", ".mdx")):
            skipped.append(f"No mark for {f}: not an article")
            continue
        line = sync.sync_file(f, d, day)[1]
        if line:
            print(line)
        where = sync.rel_path(f)
        rel = where[1]
        live = sync.read(f)
        us = units.parse(live)
        log = sync.read_log(d, rel)
        found = {}  # unit start: (unit, edited by hand first)
        for i, x in enumerate(pairs):
            if x["file"] != f:
                continue
            hits, why = changed_units(live, us, x["old"], x["new"], log)
            if not hits:
                skipped.append(f"No mark for pair {i} in {rel}: {why}")
            for u, by_hand in hits:
                found[u.start] = (u, by_hand or (u.start in found and found[u.start][1]))
        if not found:
            continue
        ensure_snapshot(f, d, where, "done")
        pre, marks = read_marks(p)
        for u, by_hand in sorted(found.values(), key=lambda h: h[0].start):
            marks = [m for m in marks if not (m.path == rel and m.kind == "unit" and not m.removed
                                              and stands_for(live, us, m, u))]
            mk = Mark(rel, line=u.start, where=units.where(u.path), marked=day, source=NEXT_ITEM,
                      notes=[BY_HAND] if by_hand else [])
            mk.text, mk.hash = u.text, short_hash(u.text)
            marks.append(mk)
            made.append(mk)
        write_marks(p, pre, marks)
    for mk in made:
        print(f"Marked done (next item): {mk.path}, {mk.label} (sha256:{mk.hash})"
              + (f"; {BY_HAND}" if mk.notes else ""))
    for s in skipped:
        print(s)
    print(f"Next-item marks: {len(made)}, in {p}" if made else f"No marks from {pairs_path}.")


def file_done(file):
    d = need_folder()
    if not os.path.isfile(file):
        sys.exit(f"ledger.py: no such file: {file}")
    day, p = today(), ledger_file(d)
    before = [m.text for m in read_marks(p)[1]]  # sync's follow() keeps the marks in this order
    line = sync.sync_file(file, d, day)[1]
    if line:
        print(line)
    where = sync.rel_path(file)
    rel = where[1]
    ensure_snapshot(file, d, where, FILE_DONE)
    text = sync.read(file)
    us = units.parse(text)
    pre, marks = read_marks(p)
    keep, at, article, refreshed, missing, merged = [], {}, None, set(), [], 0
    for i, mk in enumerate(marks):
        if mk.path == rel and not mk.removed and i < len(before) and before[i] != mk.text:
            refreshed.add(id(mk))  # a hand edit the sync above followed
        if mk.path == rel and not mk.removed:
            if mk.kind == "article" and article is not None:  # one article mark per file
                merged += 1
                continue
            now = None
            if mk.kind == "unit":
                u = locate(text, mk, fuzzy=True, us=us)
                if u and u.start in at:  # two marks for one unit: the newer one stays
                    merged += 1
                    if mk.marked < keep[at[u.start]].marked:
                        continue
                    keep[at[u.start]] = None
                if u:
                    at[u.start] = len(keep)
                    mk.line, mk.where, now = u.start, units.where(u.path), u.text
            else:
                s = span(text, mk)
                now = span_text(text, mk, s) if s else None
                if mk.kind == "article":
                    article, mk.source = mk, FILE_DONE
            if now is None:
                missing.append(mk.label)
            elif now != mk.text:
                mk.text, mk.hash = now, short_hash(now)
                if day not in mk.refreshed:
                    mk.refreshed.append(day)
                refreshed.add(id(mk))
        keep.append(mk)
    keep = [m for m in keep if m is not None]
    recorded = article is None
    if recorded:
        article = Mark(rel, marked=day, source=FILE_DONE)
        article.text = text.rstrip("\n")
        article.hash = short_hash(article.text)
        keep.append(article)
    write_marks(p, pre, keep)
    others = [m for m in keep if m.path == rel and not m.removed and m is not article]
    n = sum(1 for m in others if id(m) in refreshed)
    print(f"File done: {rel}. The whole article: {'recorded' if recorded else 'refreshed'} "
          f"(sha256:{article.hash}). Other marks refreshed to the live text: {n} of {len(others)}. In {p}")
    for lab in missing:
        print(f"Not in the live file: {rel}, {lab}; the mark stays as it was")
    if merged:
        print(f"Merged {merged} duplicate mark{'s' if merged > 1 else ''} into the newer one")


def status(file):
    d = need_folder()
    rel = sync.rel_path(file)[1]
    p = ledger_file(d)
    mine = [m for m in read_marks(p)[1] if m.path == rel]
    if not mine:
        print(f"No done marks for {rel}.")
        return
    text = sync.read(file) if os.path.isfile(file) else None
    print(f"Done marks for {rel} ({p}):")
    for mk in mine:
        parts = [f"marked {mk.marked}"]
        if mk.source:
            parts.append(f"source {mk.source}")
        parts += mk.notes
        if mk.updated:
            parts.append("updated by hand " + ", ".join(mk.updated))
        if mk.refreshed:
            parts.append("refreshed at file done " + ", ".join(mk.refreshed))
        if mk.removed:
            parts.append(f"removed by hand {mk.removed}")
        parts.append(f"sha256:{mk.hash}")
        if not mk.removed and text is not None:
            s = span(text, mk)
            if s is None and mk.kind == "unit":
                u = locate(text, mk, fuzzy=True)
                s = (u.start, u.end) if u else None
            if s is None:
                parts.append("not in the live file")
            else:
                same = short_hash(span_text(text, mk, s)) == mk.hash
                parts.append(f"lines {s[0]}-{s[1]}, " + ("the live text matches" if same else "the live text differs"))
        print(f"- {mk.label}: " + "; ".join(parts))


def git(repo, *args, timeout=120):
    try:
        return subprocess.run(["git", "-C", repo, *args], capture_output=True, encoding="utf-8",
                              errors="replace", timeout=timeout)
    except (OSError, subprocess.SubprocessError) as e:
        return subprocess.CompletedProcess(args, 1, "", str(e))


def close(base="origin/main", base_dir=None):
    d = need_folder()
    index = sync.read_index(d)
    if not index:
        sys.exit(f"ledger.py close: no snapshots in {sync.store(d)}; nothing to compare")
    day, label = today(), base_dir or base
    ready = {}  # repo: None when the ref resolves there, else why it doesn't
    body, cands, units_changed, files_changed = [], [], 0, 0
    for rel in sorted(index):
        snap = os.path.join(sync.store(d), rel)
        if not os.path.isfile(snap):
            body.append(f"## {rel}\n\nNo snapshot file in applied/; skipped.\n")
            continue
        if base_dir:
            src = os.path.join(base_dir, rel)
            shipped = sync.read(src) if os.path.isfile(src) else None
        else:
            repo = index[rel].get("repo") or paths.repo_root()
            if not repo:
                body.append(f"## {rel}\n\nNot in a git repo; skipped.\n")
                continue
            if repo not in ready:
                if base.startswith("origin/"):  # fetch first, so the ref holds what shipped
                    branch = base[len("origin/"):]
                    r = git(repo, "fetch", "origin", branch)
                    if r.returncode != 0:
                        print(f"ledger.py close: git fetch origin {branch} failed in {repo}: {r.stderr.strip()}",
                              file=sys.stderr)
                ok = git(repo, "rev-parse", "--verify", "--quiet", f"{base}^{{tree}}").returncode == 0
                ready[repo] = None if ok else f"{base} doesn't exist in {repo}"
            if ready[repo]:
                sys.exit(f"ledger.py close: {ready[repo]}; nothing written")
            r = git(repo, "show", f"{base}:{rel}")
            shipped = r.stdout if r.returncode == 0 else None
        if shipped is None:
            body.append(f"## {rel}\n\nNot in {label}: not merged yet, renamed, or deleted.\n")
            continue
        entries = units.diff(sync.read(snap), shipped)
        if not entries:
            body.append(f"## {rel}\n\nThe shipped text matches the last snapshot.\n")
            continue
        units_changed, files_changed = units_changed + len(entries), files_changed + 1
        body.append(f"## {rel}\n\n" + "\n".join(units.render(e, rel, None, "Shipped version", level=3)
                                               for e in entries))
        cands += units.candidates(entries, rel)
    out = ["# Close-out", "",
           f"Written by `ledger.py close` on {day}: the shipped text ({label}) against the skill's last",
           "snapshot of each applied file (`applied/index.json`), unit by unit. It proposes strike-list",
           "candidates and never edits the strike list.", ""]
    out += body
    out += ["## Strike-list candidates", "",
            "One line per change: what the writer changed. Show them to the writer; a pattern enters",
            "`strike-list.md` only when the writer says so.", ""]
    out += cands or ["None: the shipped text matches the last snapshots."]
    p = os.path.join(d, "close-out.md")
    sync.write(p, "\n".join(out) + "\n")
    print(f"close-out: {units_changed} changed units in {files_changed} of {len(index)} files, "
          f"{len(cands)} strike-list candidates: {p}")


def main(argv):
    ap = argparse.ArgumentParser(prog="ledger.py", description="Done marks and the close-out.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("done", help="mark a section or the whole article done, or the units a pairs file changed")
    a.add_argument("file", nargs="?")
    a.add_argument("--section", help='the heading text, or a path such as "Parent > Heading"')
    a.add_argument("--from-pairs", metavar="PAIRS", help="the item's pairs file: mark the units its applied pairs changed")
    a = sub.add_parser("file-done", help="sync the file, refresh its marks, and record the article mark")
    a.add_argument("file")
    a = sub.add_parser("status", help="list the file's done marks")
    a.add_argument("file")
    a = sub.add_parser("close", help="compare the shipped text with the snapshots; write close-out.md")
    g = a.add_mutually_exclusive_group()
    g.add_argument("--base", default="origin/main", help="the git ref of the shipped text (default origin/main)")
    g.add_argument("--base-dir", help="a folder that holds the shipped files at their repo paths")
    args = ap.parse_args(argv)
    if args.cmd == "done":
        if args.from_pairs:
            if args.file or args.section:
                ap.error("done --from-pairs takes no file and no --section")
            done_from_pairs(args.from_pairs)
        elif not args.file:
            ap.error("done needs a file, or --from-pairs <pairs.json>")
        else:
            done(args.file, args.section)
    elif args.cmd == "file-done":
        file_done(args.file)
    elif args.cmd == "status":
        status(args.file)
    else:
        close(args.base, args.base_dir)


if __name__ == "__main__":
    main(sys.argv[1:])
