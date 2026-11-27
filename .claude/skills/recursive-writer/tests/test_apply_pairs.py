"""apply_pairs.py: a pair whose "new" already stands where its "old" is counts as applied, and is never inserted twice.

Run: python3 tests/test_apply_pairs.py   (writes only to a temp folder; snapshots go there too)
"""
import json, os, subprocess, sys, tempfile, unittest

TOOLS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "lib", "tools")


class ApplyPairs(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp()
        self.env = {k: v for k, v in os.environ.items() if k != "CLAUDE_CODE_SESSION_ID"}  # no load gate
        self.env["RR_SESSIONS_DIR"] = os.path.join(self.tmp, "sessions")  # snapshots go to a temp folder
        self.env["RW_TICKET"] = "test-apply-pairs"

    def file(self, name, text):
        path = os.path.join(self.tmp, name)
        open(path, "w").write(text)
        return path

    def run_pairs(self, pairs, *flags):
        pf = os.path.join(self.tmp, "pairs.json")
        json.dump(pairs, open(pf, "w"))
        return subprocess.run([sys.executable, os.path.join(TOOLS, "apply_pairs.py"), pf, *flags],
                              capture_output=True, text=True, env=self.env, cwd=self.tmp)

    def twice(self, text, old, new):
        """Apply a pair, then apply it again. Returns (first run, second run, the file afterwards)."""
        f = self.file("a.mdx", text)
        pair = [{"file": f, "old": old, "new": new}]
        r1, r2 = self.run_pairs(pair), self.run_pairs(pair)
        return r1, r2, open(f).read()

    # the bug: an append, prepend or wrap still finds its old text after the apply
    def test_append_applies_once(self):
        r1, r2, t = self.twice("| Swift | 6.2 |\n| Kotlin | 2.0 |\n", "| Swift | 6.2 |", "| Swift | 6.2 |\n| Android | 35 |")
        self.assertEqual(r1.returncode, 0, r1.stdout + r1.stderr)
        self.assertEqual(r2.returncode, 0, r2.stdout + r2.stderr)
        self.assertIn("already applied", r2.stdout)
        self.assertEqual(t.count("| Android | 35 |"), 1)

    def test_prepend_applies_once(self):
        r1, r2, t = self.twice("Intro.\nBody text.\n", "Body text.", "Note first. Body text.")
        self.assertIn("already applied", r2.stdout)
        self.assertEqual(t.count("Note first."), 1)

    def test_wrap_applies_once(self):
        r1, r2, t = self.twice("Click Save to finish.\n", "Save", "**Save**")
        self.assertIn("already applied", r2.stdout)
        self.assertEqual(t, "Click **Save** to finish.\n")

    def test_new_holding_old_twice(self):
        r1, r2, t = self.twice("one foo here\n", "foo", "foo and foo")
        self.assertIn("already applied", r2.stdout)
        self.assertEqual(t, "one foo and foo here\n")

    # what must not change
    def test_ordinary_pair_then_rerun_fails_as_before(self):
        r1, r2, t = self.twice("Old wording here.\n", "Old wording", "New wording")
        self.assertEqual(t, "New wording here.\n")
        self.assertEqual(r2.returncode, 1)
        self.assertIn("'old' occurs 0 times", r2.stdout)

    def test_unapplied_append_still_applies(self):
        f = self.file("a.mdx", "A line.\n")
        r = self.run_pairs([{"file": f, "old": "A line.", "new": "A line. More."}])
        self.assertEqual(r.returncode, 0, r.stdout)
        self.assertNotIn("already applied", r.stdout)
        self.assertEqual(open(f).read(), "A line. More.\n")

    def test_new_elsewhere_does_not_hide_a_free_old(self):
        # "Swift 6" already stands once; a second, bare "Swift" is still to be changed
        f = self.file("a.mdx", "Swift 6 is new.\nSwift is a language.\n")
        r = self.run_pairs([{"file": f, "old": "Swift", "new": "Swift 6"}])
        self.assertEqual(r.returncode, 0, r.stdout)
        self.assertEqual(open(f).read(), "Swift 6 is new.\nSwift 6 is a language.\n")

    def test_two_free_olds_still_refused(self):
        f = self.file("a.mdx", "Save here. Save there.\n")
        r = self.run_pairs([{"file": f, "old": "Save", "new": "Save it"}])
        self.assertEqual(r.returncode, 1)
        self.assertIn("'old' occurs 2 times", r.stdout)
        self.assertEqual(open(f).read(), "Save here. Save there.\n")

    def test_mixed_pairs_in_one_file(self):
        f = self.file("a.mdx", "Alpha. Beta.\n")
        pairs = [{"file": f, "old": "Alpha.", "new": "Alpha. One."}, {"file": f, "old": "Beta.", "new": "Gamma."}]
        self.assertEqual(self.run_pairs(pairs).returncode, 0)
        open(f, "w").write("Alpha. One. Delta.\n")  # the second pair's text moved on; only the first is rerun
        r = self.run_pairs(pairs[:1])
        self.assertIn("already applied", r.stdout)
        self.assertIn("applied 0 pairs in 1 files, 1 already applied", r.stdout)
        self.assertEqual(open(f).read(), "Alpha. One. Delta.\n")

    def test_stat_counts_no_change_for_an_applied_pair(self):
        f = self.file("a.mdx", "| Swift | 6.2 |\n| Android | 35 |\n")
        r = self.run_pairs([{"file": f, "old": "| Swift | 6.2 |", "new": "| Swift | 6.2 |\n| Android | 35 |"}], "--stat")
        self.assertEqual(r.returncode, 0, r.stdout)
        self.assertIn("+0 -0", r.stdout)

    def test_already_applied_saves_no_snapshot(self):
        f = self.file("a.mdx", "Keep this. Added.\n")
        r = self.run_pairs([{"file": f, "old": "Keep this.", "new": "Keep this. Added."}])
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertNotIn("snapshots:", r.stdout)
        self.assertEqual(open(f).read(), "Keep this. Added.\n")

if __name__ == "__main__":
    unittest.main(verbosity=1)
