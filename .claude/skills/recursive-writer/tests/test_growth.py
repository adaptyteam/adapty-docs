"""The growth flag (lib/tools/growth.py), used by apply_pairs.py --lint."""
import os, sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib", "tools"))
import growth

failures = 0


def check(name, got, want):
    global failures
    if got == want:
        print(f"ok   {name}")
    else:
        failures += 1
        print(f"FAIL {name}: got {got!r}, want {want!r}")


pair = lambda old, new: {"file": "a.mdx", "old": old, "new": new}

check("appended sentence flags",
      len(growth.flags([pair("First point. Second point.", "First point. Second point. Third point.")])), 1)
check("reworded, same count, no flag",
      growth.flags([pair("First point. Second point.", "First claim. Second claim.")]), [])
check("split into a list, no flag (unit count changed)",
      growth.flags([pair("Options: a, b, and c.", "Options:\n\n- a\n- b\n- c")]), [])
check("shorter, no flag", growth.flags([pair("One. Two. Three.", "One. Two.")]), [])
check("list item grows", len(growth.flags([pair("- Item one.\n- Item two.", "- Item one. More on it.\n- Item two.")])), 1)
check("code fences ignored", growth.flags([pair("Text.\n\n```\na. b. c.\n```", "Text.\n\n```\na. b. c. d. e.\n```")]), [])
check("units counted", growth.units("A.\n\n- b\n- c\n\nD."), ["A.", "- b", "- c", "D."])
check("sentences counted", growth.sentences("One. Two? Three! four."), 3)

print("all passed" if failures == 0 else f"{failures} failed")
sys.exit(1 if failures else 0)
