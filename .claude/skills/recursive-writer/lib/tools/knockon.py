"""Side-effect check for apply_pairs.py --lint: what a set of pairs leaves behind in the docs.

The early mapping is rw-edit, step 1; this is the safety net after drafting. Three mechanical checks:
- a sentence of six or more words that now appears more than once in a file, where a pair wrote it;
- a heading a pair renames or removes, while other docs still link to its old anchor;
- a bold label a pair replaces, while its old form still appears in the same file.
"""
import os
import re

_SENT = re.compile(r"(?<=[.!?])\s+(?=[A-Z*\[`\"(])")
_SKIP = ("import ", "<", "|", "#", "---", ":::")


def _norm(s):
    return re.sub(r"\s+", " ", s).strip()


def sentences(text):
    out, fence = [], False
    for line in text.split("\n"):
        s = line.strip()
        if s.startswith("```"):
            fence = not fence
            continue
        if fence or not s or s.startswith(_SKIP):
            continue
        s = re.sub(r"^(?:[-*]|\d+\.)\s+", "", s)
        for part in _SENT.split(s):
            part = _norm(part)
            if len(part.split()) >= 6:
                out.append(part)
    return out


def duplicates(pairs, texts, label=lambda f: f):
    lines = []
    for f, text in texts.items():
        written = set()
        for p in pairs:
            if p["file"] == f:
                written.update(sentences(p["new"]))
        counts = {}
        for s in sentences(text):
            counts[s] = counts.get(s, 0) + 1
        for s in sorted(written):
            if counts.get(s, 0) > 1:
                lines.append(f'{label(f)}: this sentence now appears {counts[s]} times: "{s[:90]}"')
    return lines


def slug(heading):
    m = re.search(r"\\?\{#([^}\\]+)\\?\}", heading)
    if m:
        return m.group(1)
    h = re.sub(r"^#+\s*", "", heading).strip().lower()
    h = re.sub(r"[^\w\s-]", "", h)
    return re.sub(r"\s", "-", h)


def _headings(text):
    return [line for line in text.split("\n") if re.match(r"^#{2,6}\s", line)]


def _page(path):
    return os.path.splitext(os.path.basename(path))[0]


def anchors(pairs, root, label=lambda f: f):
    """Links to the old anchor of each heading a pair renames or removes."""
    docs = os.path.join(root, "src", "content", "docs")
    if not os.path.isdir(docs):
        return []
    lines = []
    for p in pairs:
        kept = {slug(h) for h in _headings(p["new"])}
        for h in _headings(p["old"]):
            old = slug(h)
            if old in kept:
                continue
            page, own = _page(p["file"]), os.path.abspath(p["file"])
            hits = []
            for d, _, files in os.walk(docs):
                for name in files:
                    if not name.endswith((".md", ".mdx")):
                        continue
                    path = os.path.join(d, name)
                    for n, line in enumerate(open(path, encoding="utf-8", errors="replace"), 1):
                        same = os.path.abspath(path) == own and f"(#{old})" in line
                        if f"{page}#{old})" in line or same:
                            hits.append(f"{os.path.relpath(path, root)}:{n}")
            if hits:
                lines.append(f"{label(p['file'])}: heading \"{h.strip()}\" changed; {len(hits)} links still "
                             f"point to #{old}: " + ", ".join(hits[:8]) + (" …" if len(hits) > 8 else ""))
    return lines


def labels(pairs, texts, label=lambda f: f):
    """Bold labels a pair replaced that still appear, in their old form, elsewhere in the file."""
    lines = []
    for p in pairs:
        old = set(re.findall(r"\*\*([^*\n]+)\*\*", p["old"]))
        new = set(re.findall(r"\*\*([^*\n]+)\*\*", p["new"]))
        if not new:
            continue  # nothing replaced it: a cut, not a rename
        for lab in sorted(old - new):
            n = texts[p["file"]].count(f"**{lab}**")
            if n:
                lines.append(f"{label(p['file'])}: **{lab}** was replaced here but still appears {n} times "
                             f"in the file: rename those too, or keep both on purpose.")
    return lines


def flags(pairs, texts, root, label=lambda f: f):
    return duplicates(pairs, texts, label) + anchors(pairs, root, label) + labels(pairs, texts, label)
