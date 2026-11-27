#!/bin/bash
# Lints proposed wording with the shared rules and the user's own: bash lint-text.sh <file|->
# Run from the docs repo root (or with CLAUDE_PROJECT_DIR set). Each hit is a candidate for check 10.
D="$(cd "$(dirname "$0")" && pwd)"
repo="${CLAUDE_PROJECT_DIR:-$PWD}"
[ -f "$repo/scripts/lint-prose.mjs" ] || { echo "lint-text: no scripts/lint-prose.mjs in $repo; run from the docs repo root" >&2; exit 1; }
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
f="$tmp/proposal.mdx"
if [ "${1:--}" = "-" ]; then cat > "$f"; else cat "$1" > "$f"; fi
cd "$repo" || exit 1
out="$(node scripts/lint-prose.mjs --full "$f"; node "$D/lint-personal.mjs" --full "$f")"
# Known false positives of the shared rules, dropped by the context of the line they hit:
# "next to" a named, visible thing (the flow name, a bold label) and "earlier" meaning older ("an earlier version").
out="$(printf '%s\n' "$out" | python3 -c '
import re, sys
lines = open(sys.argv[1]).read().split("\n")
allow = {"next to": re.compile(r"next to (the flow name|its name|the \*\*|\*\*)", re.I),
         "earlier": re.compile(r"earlier (version|versions|state|states)\b", re.I)}
for hit in sys.stdin.read().split("\n"):
    m = re.match(r"^\s*(\d+)\s+(.+?)\s{2,}", hit)
    if m and m.group(2).lower() in allow:
        n = int(m.group(1))
        if 0 < n <= len(lines) and allow[m.group(2).lower()].search(lines[n - 1]):
            continue
    print(hit)
' "$f")"
if [ -n "$(printf '%s' "$out" | tr -d '[:space:]')" ]; then
  printf '%s\n' "$out" | grep -v 'proposal\.mdx$' | grep -v 'judgment required, not a gate'
else
  echo "lint-text: no hits"
fi
