"""Sync, the snapshots, the done marks, and the close-out (lib/tools/sync.py, units.py, ledger.py).
The done marks: by hand (`done`), when the writer moves on to the next item (`done --from-pairs`),
and at file done (`file-done`). The edit hooks are in tests/test_hooks.py.

Run: python3 tests/test_sync.py
Every case works in a fresh temp `git init` repo (HEAD pointed at a branch name: no commit, no
checkout) with RR_SESSIONS_DIR in a temp folder, and without CLAUDE_CODE_SESSION_ID, so no load-gate
stamp and no real session folder is touched.
"""
import datetime, hashlib, json, os, subprocess, sys, tempfile, unittest

D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(D, "lib", "tools")
LOAD = os.path.join(D, "lib", "load.sh")
APPLY = os.path.join(TOOLS, "apply_pairs.py")
SYNC = os.path.join(TOOLS, "sync.py")
LEDGER = os.path.join(TOOLS, "ledger.py")
REL = "src/content/docs/guides/change-history.mdx"
TODAY = datetime.date.today().isoformat()

ARTICLE = """---
title: "Change history"
description: "Track the changes to your setup."
---

The Change History page tracks the changes to your setup. It covers the last 6 months.

## Filters

- **Entity**: the object type.
- **Date**: the date range.

| Control | What it does |
|---|---|
| Search | Finds an entry by name. |

## Entry details

Each entry shows who made the change. It also shows the source of the change.

```bash
# a comment, not a heading
echo hi
```

### Revert

You can't undo a change in Change History.

## Limits

Apple doesn't report the usernames of other tools.
"""


def read(p):
    with open(p, encoding="utf-8") as fh:
        return fh.read()


def write(p, text):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as fh:
        fh.write(text)


def line_of(text, s):
    return next(i for i, l in enumerate(text.split("\n"), 1) if s in l)


class SyncTest(unittest.TestCase):
    def setUp(self):
        self.tmp = os.path.realpath(tempfile.mkdtemp())
        self.repo = os.path.join(self.tmp, "repo")
        subprocess.run(["git", "init", "-q", self.repo], check=True)
        subprocess.run(["git", "-C", self.repo, "symbolic-ref", "HEAD", "refs/heads/main"], check=True)
        self.art = os.path.join(self.repo, REL)
        write(self.art, ARTICLE)
        self.sess = os.path.join(self.tmp, "session")
        self.env = {k: v for k, v in os.environ.items()
                    if k not in ("CLAUDE_CODE_SESSION_ID", "RR_SESSIONS_DIR", "RW_TICKET")}
        self.env.update(RR_SESSIONS_DIR=self.sess, PYTHONDONTWRITEBYTECODE="1")
        self.snap = os.path.join(self.sess, "applied", REL)
        self.edits = os.path.join(self.sess, "hand-edits.md")
        self.ledger = os.path.join(self.sess, "ledger.md")

    def run_tool(self, *cmd, env=None):
        r = subprocess.run(list(cmd), capture_output=True, text=True, cwd=self.repo, env=env or self.env)
        return r.returncode, r.stdout, r.stderr

    def apply(self, old, new, *flags, env=None):
        pairs = os.path.join(self.tmp, "pairs.json")
        with open(pairs, "w") as fh:
            json.dump([{"file": self.art, "old": old, "new": new}], fh)
        return self.run_tool(sys.executable, APPLY, pairs, *flags, env=env)

    def hand_edit(self, old, new):
        text = read(self.art)
        self.assertEqual(text.count(old), 1, old)
        write(self.art, text.replace(old, new))

    def first_apply(self):
        code, out, err = self.apply("It covers the last 6 months.", "The history covers the last 6 months.")
        self.assertEqual(code, 0, out + err)

    def marks(self):
        return read(self.ledger) if os.path.exists(self.ledger) else ""

    def entry(self, label):
        """One mark's entry in ledger.md, from its header to the next mark's header."""
        led = self.marks()
        start = led.index(f"## {REL}: {label}")
        nxt = led.find(f"\n## {REL}: ", start + 1)
        return led[start:nxt] if nxt >= 0 else led[start:]

    def next_item(self, pairs=None):
        """ledger.py done --from-pairs, for the pairs of first_apply() by default."""
        return self.run_tool(sys.executable, LEDGER, "done", "--from-pairs", pairs or os.path.join(self.tmp, "pairs.json"))

    # 1. Every apply that writes saves the post-apply text, with --approved or without.
    def test_apply_saves_snapshot(self):
        self.first_apply()
        live = read(self.art)
        self.assertEqual(read(self.snap), live)
        index = json.loads(read(os.path.join(self.sess, "applied", "index.json")))
        self.assertIn(REL, index)
        self.assertEqual(index[REL]["sha256"], hashlib.sha256(live.encode()).hexdigest())
        self.assertTrue(index[REL]["time"].startswith(TODAY))
        code, out, err = self.apply("the object type.", "the type of object.", "--approved")
        self.assertEqual(code, 0, out + err)
        self.assertEqual(read(self.snap), read(self.art))
        self.assertNotIn("ledger", out + err)
        self.assertFalse(os.path.exists(self.ledger))
        self.assertFalse(os.path.exists(self.edits))
        self.assertEqual(os.listdir(self.sess), ["applied"])

    def test_dry_run_and_stat_save_nothing(self):
        for flag in ("--dry-run", "--stat"):
            code, out, err = self.apply("the object type.", "the type of object.", flag)
            self.assertEqual(code, 0, out + err)
        self.assertFalse(os.path.exists(self.sess))

    # 2. One hand edit: both versions and the removed sentence. Code and frontmatter aren't units.
    def test_hand_edit_logged(self):
        self.first_apply()
        self.hand_edit("Each entry shows who made the change. It also shows the source of the change.",
                       "Each entry shows who made the change.")
        self.hand_edit("# a comment, not a heading", "# another comment")
        self.hand_edit('description: "Track the changes to your setup."', 'description: "Track changes."')
        code, out, err = self.run_tool(sys.executable, SYNC, self.art)
        self.assertEqual((code, out.strip()), (0, f"Hand edits since the last apply: 1 unit in {REL}"), err)
        log = read(self.edits)
        line = line_of(read(self.art), "Each entry shows who made the change.")
        self.assertIn(f"## {TODAY} · {REL}:{line} · Entry details · changed", log)
        self.assertIn("Skill's version:\n\n```text\nEach entry shows who made the change. It also shows the "
                      "source of the change.\n```", log)
        self.assertIn("Writer's version:\n\n```text\nEach entry shows who made the change.\n```", log)
        self.assertIn("Removed:\n- It also shows the source of the change.\n", log)
        self.assertIn("Added: none", log)
        self.assertNotIn("another comment", log)
        self.assertNotIn("Track changes", log)
        self.assertEqual(read(self.snap), read(self.art))

    # 3. A second sync logs nothing new.
    def test_no_duplicate_logging(self):
        self.first_apply()
        self.hand_edit("You can't undo a change in Change History.", "You can't undo a change with one click.")
        self.run_tool(sys.executable, SYNC, self.art)
        before = read(self.edits)
        code, out, err = self.run_tool(sys.executable, SYNC, self.art)
        self.assertEqual((code, out), (0, ""), err)
        self.assertEqual(read(self.edits), before)
        self.assertEqual(before.count(f"## {TODAY} · {REL}:"), 1)

    def test_load_prints_the_summary_first(self):
        self.first_apply()
        self.hand_edit("the date range.", "the range of dates.")
        a = line_of(read(self.art), "## Filters")
        code, out, err = self.run_tool("bash", LOAD, "--text", f"{self.art}:{a}-{a + 3}", "--change")
        self.assertEqual(code, 0, err)
        lines = out.split("\n")
        self.assertEqual(lines[0], f"Hand edits since the last apply: 1 unit in {REL}")
        self.assertTrue(lines[1].startswith("Live: "), out[:300])
        self.assertNotIn("===== approved ledger", out)
        code, out, err = self.run_tool("bash", LOAD, "--text", f"{self.art}:{a}-{a + 3}", "--change")
        self.assertTrue(out.startswith("Live: "), out[:300])

    def test_apply_syncs_before_it_replaces_the_snapshot(self):
        self.first_apply()
        self.hand_edit("Apple doesn't report the usernames of other tools.", "Apple doesn't report usernames.")
        code, out, err = self.apply("the object type.", "the type of object.")
        self.assertEqual(code, 0, out + err)
        self.assertIn(f"Hand edits since the last apply: 1 unit in {REL}", out)
        self.assertIn("Writer's version:\n\n```text\nApple doesn't report usernames.\n```", read(self.edits))
        self.assertEqual(read(self.snap), read(self.art))

    def test_moved_unit_is_one_entry(self):
        self.first_apply()
        para = "Apple doesn't report the usernames of other tools.\n"
        self.hand_edit("\n## Limits\n\n" + para, "\n## Limits\n")
        self.hand_edit("## Entry details\n\n", "## Entry details\n\n" + para + "\n")
        code, out, err = self.run_tool(sys.executable, SYNC, self.art)
        self.assertIn("1 unit in", out, err)
        log = read(self.edits)
        self.assertIn("· Entry details · moved from line", log)
        self.assertIn("Removed: none", log)

    # 4. Done marks: a section runs to the next heading of the same or a higher level; an article is all of it.
    def test_done_marks_section_and_article(self):
        self.first_apply()
        code, out, err = self.run_tool(sys.executable, LEDGER, "done", self.art, "--section", "Entry details")
        self.assertEqual(code, 0, out + err)
        text = read(self.art)
        start, nxt = line_of(text, "## Entry details"), line_of(text, "## Limits")
        section = "\n".join(text.split("\n")[start - 1:nxt - 2])
        self.assertIn("### Revert", section)
        led = self.marks()
        self.assertIn(f'## {REL}: section "Entry details"', led)
        self.assertIn(f"- Marked done: {TODAY}", led)
        self.assertIn("- Hash: sha256:" + hashlib.sha256(section.encode()).hexdigest()[:12], led)
        self.assertIn("````text\n" + section + "\n````", led)
        self.assertNotIn("Apple doesn't report", led)
        code, out, err = self.run_tool(sys.executable, LEDGER, "done", self.art)
        self.assertEqual(code, 0, out + err)
        led = self.marks()
        self.assertIn(f"## {REL}: the whole article", led)
        self.assertIn("Apple doesn't report the usernames of other tools.", led)
        code, out, err = self.run_tool(sys.executable, LEDGER, "status", self.art)
        self.assertIn('- section "Entry details": marked ' + TODAY, out, err)
        self.assertIn("- the whole article: marked " + TODAY, out)
        self.assertEqual(out.count("the live text matches"), 2, out)
        self.run_tool(sys.executable, LEDGER, "done", self.art, "--section", "Entry details")
        self.assertEqual(self.marks().count(f'## {REL}: section "Entry details"'), 1)

    def test_done_on_an_unknown_heading_fails(self):
        code, out, err = self.run_tool(sys.executable, LEDGER, "done", self.art, "--section", "Nope")
        self.assertNotEqual(code, 0)
        self.assertIn('no heading "Nope"', err)
        self.assertEqual(self.marks(), "")

    # 5. A hand edit inside a marked span updates the mark; a mark outside it stays as it was.
    def test_hand_edit_inside_a_mark_updates_it(self):
        self.first_apply()
        self.run_tool(sys.executable, LEDGER, "done", self.art, "--section", "Entry details")
        self.run_tool(sys.executable, LEDGER, "done", self.art, "--section", "Limits")
        limits_before = self.marks().split(f'## {REL}: section "Limits"')[1]
        self.hand_edit("Each entry shows who made the change. It also shows the source of the change.",
                       "Each entry names the person who made the change.")
        code, out, err = self.run_tool("bash", LOAD, "--text", self.art)
        self.assertTrue(out.startswith(f"Hand edits since the last apply: 1 unit in {REL}"), out[:200] + err)
        led = self.marks()
        details, limits = led.split(f'## {REL}: section "Limits"')
        self.assertIn(f"- Updated by hand: {TODAY}", details)
        self.assertIn("Each entry names the person who made the change.", details)
        self.assertNotIn("It also shows the source", details)
        self.assertEqual(limits, limits_before)
        code, out, err = self.run_tool(sys.executable, LEDGER, "status", self.art)
        self.assertIn(f'- section "Entry details": marked {TODAY}; updated by hand {TODAY}', out, err)
        self.assertEqual(out.count("the live text matches"), 2, out)

    def test_mark_follows_a_renamed_heading(self):
        self.first_apply()
        self.run_tool(sys.executable, LEDGER, "done", self.art, "--section", "Entry details")
        self.hand_edit("## Entry details", "## What each entry shows")
        self.run_tool(sys.executable, SYNC, self.art)
        led = self.marks()
        self.assertIn(f'## {REL}: section "What each entry shows"', led)
        self.assertIn("````text\n## What each entry shows\n", led)

    # 6. The close-out against a folder of shipped files; it never touches the strike list.
    def test_close_out_with_base_dir(self):
        self.first_apply()
        strike = os.path.join(self.sess, "strike-list.md")
        write(strike, "# Strike list\n- No X as Y\n")
        shipped = read(self.art).replace("- **Date**: the date range.", "- **Date**: the range of dates.")
        shipped = shipped.replace(" It also shows the source of the change.", "")
        base = os.path.join(self.tmp, "base")
        write(os.path.join(base, REL), shipped)
        code, out, err = self.run_tool(sys.executable, LEDGER, "close", "--base-dir", base)
        self.assertEqual(code, 0, out + err)
        self.assertIn("close-out: 2 changed units in 1 of 1 files", out)
        report = read(os.path.join(self.sess, "close-out.md"))
        self.assertIn(f"## {REL}", report)
        self.assertIn("Skill's version:\n\n```text\n- **Date**: the date range.\n```", report)
        self.assertIn("Shipped version:\n\n```text\n- **Date**: the range of dates.\n```", report)
        cands = report.split("## Strike-list candidates")[1]
        self.assertIn('the writer changed "**Date**: the date range." to "**Date**: the range of dates."', cands)
        self.assertIn('the writer cut "It also shows the source of the change."', cands)
        self.assertEqual(read(strike), "# Strike list\n- No X as Y\n")

    def test_close_out_with_a_git_tree(self):
        self.first_apply()
        shipped = read(self.art).replace("the date range.", "the range of dates.")
        tmpfile = os.path.join(self.tmp, "shipped.mdx")
        write(tmpfile, shipped)
        git = ["git", "-C", self.repo]
        blob = subprocess.run(git + ["hash-object", "-w", tmpfile], capture_output=True, text=True).stdout.strip()
        subprocess.run(git + ["update-index", "--add", "--cacheinfo", f"100644,{blob},{REL}"], check=True)
        tree = subprocess.run(git + ["write-tree"], capture_output=True, text=True).stdout.strip()
        subprocess.run(git + ["read-tree", "--empty"], check=True)
        code, out, err = self.run_tool(sys.executable, LEDGER, "close", "--base", tree)
        self.assertEqual(code, 0, out + err)
        self.assertIn('the writer changed "**Date**: the date range." to "**Date**: the range of dates."',
                      read(os.path.join(self.sess, "close-out.md")))

    def test_close_fetches_origin_main_first(self):
        self.first_apply()
        code, out, err = self.run_tool(sys.executable, LEDGER, "close")
        self.assertNotEqual(code, 0)
        self.assertIn("git fetch origin main failed", err)
        self.assertFalse(os.path.exists(os.path.join(self.sess, "close-out.md")))

    def test_files_land_in_the_repo_session_folder(self):
        env = {k: v for k, v in self.env.items() if k != "RR_SESSIONS_DIR"}
        code, out, err = self.apply("It covers the last 6 months.", "The history covers the last 6 months.", env=env)
        self.assertEqual(code, 0, out + err)
        folder = os.path.join(self.repo, "_temp", f"edits-{TODAY}")
        self.assertEqual(read(os.path.join(folder, "applied", REL)), read(self.art))
        self.hand_edit("the date range.", "the range of dates.")
        code, out, err = self.run_tool(sys.executable, SYNC, self.art, env=env)
        self.assertIn("1 unit in", out, err)
        self.assertIn("the range of dates.", read(os.path.join(folder, "hand-edits.md")))
        self.assertFalse(os.path.exists(self.sess))

    # 7. Next-item marks: the units an applied pair changed, as they read when the writer moves on.
    PARA = "The Change History page tracks the changes to your setup. The history covers the last 6 months."

    def test_next_item_mark_from_a_pairs_file(self):
        self.first_apply()
        code, out, err = self.next_item()
        self.assertEqual(code, 0, out + err)
        label = f'unit at line {line_of(read(self.art), self.PARA)} in "top of the file"'
        self.assertIn(f"Marked done (next item): {REL}, {label}", out)
        self.assertNotIn("edited by hand", out + self.marks())
        self.assertEqual(self.entry(label),
                         f"## {REL}: {label}\n\n- Marked done: {TODAY}\n- Source: next-item\n- Hash: sha256:"
                         + hashlib.sha256(self.PARA.encode()).hexdigest()[:12] + f"\n\n```text\n{self.PARA}\n```\n")
        self.assertEqual(self.marks().count(f"## {REL}: "), 1)  # only the unit the pair changed
        code, out, err = self.run_tool(sys.executable, LEDGER, "status", self.art)
        self.assertIn(f"- {label}: marked {TODAY}; source next-item; sha256:", out, err)
        self.assertIn("the live text matches", out)
        self.next_item()  # the same item again replaces its mark
        self.assertEqual(self.marks().count(f"## {REL}: "), 1)

    def test_no_mark_without_an_applied_pair(self):
        pairs = os.path.join(self.tmp, "proposed.json")
        with open(pairs, "w") as fh:
            json.dump([{"file": self.art, "old": "the object type.", "new": "the type of object."}], fh)
        code, out, err = self.next_item(pairs)
        self.assertEqual(code, 0, out + err)
        self.assertIn(f"No mark for pair 0 in {REL}: not applied", out)
        self.assertIn(f"No marks from {pairs}.", out)
        self.assertEqual(self.marks(), "")
        # A new text that occurs twice after the apply can't name its unit: no mark either.
        code, out, err = self.apply("the object type.", "the date range.")
        self.assertEqual(code, 0, out + err)
        code, out, err = self.next_item()
        self.assertIn(f"No mark for pair 0 in {REL}: its new text occurs 2 times", out, err)
        self.assertEqual(self.marks(), "")

    def test_next_item_mark_after_a_hand_edit_records_the_writers_version(self):
        self.first_apply()
        self.hand_edit("The history covers the last 6 months.", "The history goes back 6 months.")
        code, out, err = self.next_item()
        self.assertEqual(code, 0, out + err)
        self.assertTrue(out.startswith(f"Hand edits since the last apply: 1 unit in {REL}\n"), out)  # synced first
        self.assertIn("; edited by hand before the mark", out)
        writers = "The Change History page tracks the changes to your setup. The history goes back 6 months."
        mark = self.entry(f'unit at line {line_of(read(self.art), writers)} in "top of the file"')
        self.assertIn(f"```text\n{writers}\n```", mark)
        self.assertIn("- Note: edited by hand before the mark", mark)
        self.assertNotIn("covers the last 6 months", self.marks())
        self.assertIn(f"Writer's version:\n\n```text\n{writers}\n```", read(self.edits))

    def test_next_item_mark_follows_the_hand_edit_log(self):
        self.first_apply()
        self.hand_edit("The history covers the last 6 months.", "The history goes back 6 months.")
        self.run_tool("bash", LOAD, "--text", self.art)  # an earlier sync (the next item's load) logs it
        self.hand_edit("The history goes back 6 months.", "It goes back half a year.")
        self.run_tool(sys.executable, SYNC, self.art)
        code, out, err = self.next_item()
        self.assertEqual(code, 0, out + err)
        self.assertNotIn("Hand edits since", out)  # nothing left to sync: the log holds both edits
        self.assertIn("; edited by hand before the mark", out)
        self.assertIn("```text\nThe Change History page tracks the changes to your setup. It goes back half a year.\n```",
                      self.marks())

    # 8. File done: every mark of the file at the live text, and the article mark.
    def test_file_done_refreshes_unit_marks_and_adds_the_article_mark(self):
        self.first_apply()
        self.next_item()
        self.hand_edit("The history covers the last 6 months.", "It goes back 6 months.")  # after the mark
        code, out, err = self.run_tool(sys.executable, LEDGER, "file-done", self.art)
        self.assertEqual(code, 0, out + err)
        self.assertTrue(out.startswith(f"Hand edits since the last apply: 1 unit in {REL}\n"), out)
        self.assertIn(f"File done: {REL}. The whole article: recorded", out)
        self.assertIn("Other marks refreshed to the live text: 1 of 1", out)
        live = read(self.art)
        unit = self.entry(f'unit at line {line_of(live, "It goes back 6 months.")} in "top of the file"')
        self.assertIn("```text\nThe Change History page tracks the changes to your setup. It goes back 6 months.\n```", unit)
        self.assertIn(f"- Updated by hand: {TODAY}", unit)
        article = self.entry("the whole article")
        self.assertIn("- Source: file-done", article)
        self.assertIn("````text\n" + live.rstrip("\n") + "\n````", article)
        code, out, err = self.run_tool(sys.executable, LEDGER, "status", self.art)
        self.assertEqual(out.count("the live text matches"), 2, out)
        # An apply after the marks: file-done brings both to the live text and keeps one article mark.
        code, out, err = self.apply("It goes back 6 months.", "It goes back six months.")
        self.assertEqual(code, 0, out + err)
        code, out, err = self.run_tool(sys.executable, LEDGER, "status", self.art)
        self.assertEqual(out.count("the live text differs"), 2, out)
        code, out, err = self.run_tool(sys.executable, LEDGER, "file-done", self.art)
        self.assertIn("The whole article: refreshed", out, err)
        self.assertIn("Other marks refreshed to the live text: 1 of 1", out)
        led = self.marks()
        self.assertEqual(led.count(f"## {REL}: the whole article"), 1)
        self.assertIn(f"- Refreshed at file done: {TODAY}", self.entry("the whole article"))
        unit = led.split(f"## {REL}: the whole article")[0]
        self.assertIn("It goes back six months.", unit)
        self.assertIn(f"- Refreshed at file done: {TODAY}", unit)
        code, out, err = self.run_tool(sys.executable, LEDGER, "status", self.art)
        self.assertEqual(out.count("the live text matches"), 2, out)

    def test_manual_marks_unchanged(self):
        self.first_apply()
        code, out, err = self.run_tool(sys.executable, LEDGER, "done", self.art, "--section", "Limits")
        self.assertEqual(code, 0, out + err)
        text = read(self.art)
        a, b = line_of(text, "## Limits"), line_of(text, "Apple doesn't report")
        section = "## Limits\n\nApple doesn't report the usernames of other tools."
        h = hashlib.sha256(section.encode()).hexdigest()[:12]
        self.assertEqual(out.strip(), f'Marked done: {REL}, section "Limits" (lines {a}-{b}, sha256:{h}), in {self.ledger}')
        manual = self.entry('section "Limits"')
        self.assertEqual(manual, f'## {REL}: section "Limits"\n\n- Marked done: {TODAY}\n- Hash: sha256:{h}\n\n'
                                 f"```text\n{section}\n```\n")
        self.next_item()  # a next-item mark elsewhere in the file
        self.assertIn("- Source: next-item", self.marks())
        self.assertEqual(self.entry('section "Limits"'), manual)
        self.run_tool(sys.executable, LEDGER, "file-done", self.art)
        self.assertIn("- Source: file-done", self.marks())
        self.assertEqual(self.entry('section "Limits"'), manual)
        code, out, err = self.run_tool(sys.executable, LEDGER, "status", self.art)
        self.assertIn(f'- section "Limits": marked {TODAY}; sha256:{h}; lines {a}-{b}, the live text matches', out, err)


if __name__ == "__main__":
    unittest.main()
