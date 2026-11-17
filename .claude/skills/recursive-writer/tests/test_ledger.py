"""ledger.py and its callers after the approval ledger went away: an apply, with --approved or
without, logs no ledger entry; load.sh prints no ledger; the CLI answers. The done marks, sync, and
the close-out are in tests/test_sync.py. Run: python3 tests/test_ledger.py
"""
import json, os, subprocess, sys, tempfile, unittest

HERE = os.path.dirname(os.path.abspath(__file__))
TOOLS = os.path.join(HERE, "..", "lib", "tools")
APPLY = os.path.join(TOOLS, "apply_pairs.py")
LOAD = os.path.join(TOOLS, "load.py")
LEDGER = os.path.join(TOOLS, "ledger.py")


class LedgerTest(unittest.TestCase):
    def setUp(self):
        self.tmp = os.path.realpath(tempfile.mkdtemp())
        self.sess = os.path.join(self.tmp, "sessions")
        self.env = {k: v for k, v in os.environ.items() if k not in ("CLAUDE_CODE_SESSION_ID", "RW_TICKET")}
        self.env.update(RR_SESSIONS_DIR=self.sess, PYTHONDONTWRITEBYTECODE="1")
        d = os.path.join(self.tmp, "repo", "src", "content", "docs", "guides")  # not a git repo
        os.makedirs(d)
        self.mdx = os.path.join(d, "flow-version-history.mdx")
        with open(self.mdx, "w") as fh:
            fh.write("To see an earlier version, click its row.\n\nOther text.\n")

    def run_py(self, *args):
        r = subprocess.run([sys.executable, *args], capture_output=True, text=True, env=self.env)
        return r.returncode, r.stdout + r.stderr

    def apply(self, old, new, *flags):
        pairs = os.path.join(self.tmp, "p.json")
        with open(pairs, "w") as fh:
            json.dump([{"file": self.mdx, "old": old, "new": new}], fh)
        return self.run_py(APPLY, pairs, *flags)

    def test_apply_approved_logs_no_ledger(self):
        code, out = self.apply("To see an earlier version", "To preview a version", "--approved")
        self.assertEqual(code, 0, out)
        self.assertNotIn("ledger", out)
        with open(self.mdx) as fh:
            self.assertIn("To preview a version", fh.read())
        self.assertEqual(os.listdir(self.sess), ["applied"])  # the snapshot is all an apply leaves
        outside = os.path.join(self.sess, "applied", self.mdx.lstrip(os.sep))  # no repo: the absolute path
        self.assertTrue(os.path.isfile(outside), outside)

    def test_apply_without_approved_logs_nothing(self):
        code, out = self.apply("Other text.", "Other words.")
        self.assertEqual(code, 0, out)
        self.assertFalse(os.path.exists(os.path.join(self.sess, "ledger.md")))
        self.assertFalse(os.path.exists(os.path.join(self.sess, "hand-edits.md")))

    def test_load_prints_no_ledger(self):
        self.apply("Other text.", "Other words.", "--approved")
        code, out = self.run_py(LOAD, "--text", self.mdx)
        self.assertEqual(code, 0, out)
        self.assertNotIn("===== approved ledger", out)

    def test_status_without_marks(self):
        code, out = self.run_py(LEDGER, "status", self.mdx)
        self.assertEqual(code, 0, out)
        self.assertIn("No done marks for", out)

    def test_usage(self):
        code, out = self.run_py(LEDGER)
        self.assertNotEqual(code, 0)
        self.assertIn("usage: ledger.py", out)


if __name__ == "__main__":
    unittest.main()
