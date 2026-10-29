"""The side-effect check (lib/tools/knockon.py), used by apply_pairs.py --lint."""
import os, sys, tempfile

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib", "tools"))
import knockon

failures = 0


def check(name, got, want):
    global failures
    if got == want:
        print(f"ok   {name}")
    else:
        failures += 1
        print(f"FAIL {name}: got {got!r}, want {want!r}")


with tempfile.TemporaryDirectory() as root:
    docs = os.path.join(root, "src", "content", "docs", "v3")
    os.makedirs(docs)
    a = os.path.join(docs, "article-a.mdx")
    b = os.path.join(docs, "article-b.mdx")
    open(a, "w").write("## Old name\n\nText. See [below](#old-name).\n")
    open(b, "w").write("Read [the section](article-a#old-name) first.\n")

    rename = {"file": a, "old": "## Old name", "new": "## New name"}
    got = knockon.anchors([rename], root)
    check("renamed heading: two links found", len(got) == 1 and "2 links" in got[0], True)

    keep = {"file": a, "old": "## Old name", "new": "## Old name\n\nMore."}
    check("heading kept: no flag", knockon.anchors([keep], root), [])

    explicit = {"file": a, "old": "## Old name \\{#old-name\\}", "new": "## New name \\{#old-name\\}"}
    check("explicit anchor kept: no flag", knockon.anchors([explicit], root), [])

    sentence = "To find changes that may explain a rise or fall in a metric:"
    text = f"## A\n\n{sentence}\n\n## B\n\n{sentence}\n"
    dup = {"file": a, "old": "x", "new": f"## B\n\n{sentence}"}
    got = knockon.duplicates([dup], {a: text})
    check("duplicated sentence flagged", len(got) == 1 and "2 times" in got[0], True)
    check("short repeats ignored", knockon.duplicates([{"file": a, "old": "", "new": "Click Save."}],
                                                      {a: "Click Save.\n\nClick Save.\n"}), [])

    lab = {"file": a, "old": "Open **Change history**.", "new": "Open **Change History**."}
    got = knockon.labels([lab], {a: "Open **Change History**.\n\nThe **Change history** tab.\n"})
    check("renamed label still elsewhere", len(got) == 1 and "1 times" in got[0], True)
    cut = {"file": a, "old": "Open **Change history**.", "new": "Open it."}
    check("label cut, not renamed: no flag", knockon.labels([cut], {a: "The **Change history** tab.\n"}), [])

print("all passed" if failures == 0 else f"{failures} failed")
sys.exit(1 if failures else 0)
