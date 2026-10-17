#!/bin/bash
# The skill's loader. Two tiers: the manager's SKILL.md once per session (--session); the checks before every reply (--text).
# Usage: bash load.sh --session
#        bash load.sh --loop                  (lib/loop.md, the review loop)
#        bash load.sh --text <file[:start-end]|-> [--change] [--opener] [--draft] [--strike "<pattern>"]
#        bash load.sh 05 07 product-terms     (routing by hand: loop.md, routes.md, always-on, named)
#        bash load.sh all                     (loop.md and every check and reference file; round 1)
# Details: tools/load.py. Tests: ../tests/test_load.py, ../tests/test_route.py.
exec python3 "$(cd "$(dirname "$0")" && pwd)/tools/load.py" "$@"
