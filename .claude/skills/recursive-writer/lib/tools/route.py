"""Route wording to checks, from each file's **Triggers:** regex and **Flags:** line.

Usage: python3 tools/route.py <file|-> [--change] [--opener] [--draft]
Prints two lines: a "Routed:" summary that names what fired, then the routed ids (file stems).
Regexes are case-insensitive and multiline. load.py imports route() and summary().
"""
import glob, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from paths import LIB as D  # noqa: E402

FLAGS = {"--change", "--opener", "--draft"}


def short(stem):
    return stem.split("-")[0] if re.match(r"^(\d\d|L\d)-", stem) else stem


def route(text, flags):
    """Return [(stem, reason)] for every check the text or a flag triggers."""
    out = []
    for f in sorted(glob.glob(f"{D}/checks/*.md") + glob.glob(f"{D}/reference/*.md")):
        src = open(f).read()
        stem = os.path.basename(f)[:-3]
        reason = None
        t = re.search(r"^\*\*Triggers:\*\* (.+)$", src, re.M)
        if t:
            m = re.search(t.group(1).strip(), text, re.I | re.M)
            if m:
                hit = " ".join(m.group(0).split())
                if len(hit) < 4:  # a list marker or a short word: show the start of its line instead
                    hit = " ".join(text[m.start():].split("\n")[0].split())
                reason = '"' + hit[:30] + '"'
        fl = re.search(r"^\*\*Flags:\*\* (.+)$", src, re.M)
        if not reason and fl:
            hit = [x for x in fl.group(1).split() if x in flags]
            if hit:
                reason = hit[0]
        if reason:
            out.append((stem, reason))
    return out


def summary(routed):
    return "Routed: " + (", ".join(f"{short(s)} ({r})" for s, r in routed)
                         if routed else "nothing beyond the always-on checks")


if __name__ == "__main__":
    args = sys.argv[1:]
    flags = [a for a in args if a.startswith("--")]
    paths = [a for a in args if not a.startswith("--")]
    bad = [f for f in flags if f not in FLAGS]
    if bad or len(paths) != 1:
        sys.exit(f"route.py: usage: route.py <file|-> [{' '.join(sorted(FLAGS))}]" +
                 (f"; unknown flag {' '.join(bad)}" if bad else ""))
    text = sys.stdin.read() if paths[0] == "-" else open(paths[0]).read()
    routed = route(text, flags)
    print(summary(routed))
    print(" ".join(s for s, _ in routed))
