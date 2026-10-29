"""Smoke test for tools/route.py. Run: python3 tests/test_route.py"""
import os, subprocess, sys

D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROUTE = os.path.join(D, "lib", "tools", "route.py")


def route(text, *flags):
    r = subprocess.run([sys.executable, ROUTE, "-", *flags], input=text, capture_output=True, text=True)
    return r.returncode, r.stdout.splitlines()


def ids(text, *flags):
    code, out = route(text, *flags)
    assert code == 0, f"exit {code}: {out}"
    return set(out[1].split())


fails = 0


def case(name, got, want=(), not_want=()):
    global fails
    missing = [w for w in want if w not in got]
    extra = [n for n in not_want if n in got]
    if missing or extra:
        fails += 1
        print(f"FAIL {name}: missing {missing}, unexpected {extra}; got {sorted(got)}")
    else:
        print(f"ok   {name}")


bullet = ("- **Tag creation**: You can't type a custom tag into a text element. Create the tag in the "
          "**Variables** panel, then select it from the **Add variable** dropdown.")
# A limit followed by its action is what 04 governs (its scope: a limit, an instruction).
case("bullet", ids(bullet), want=["06-instructions", "09-tone", "05-claims", "lists", "04-consequences"],
     not_want=["headings", "change-justification"])
case("limit then action", ids("The preview doesn't allow you to mock the SDK version. To test that branch, use live app builds."), want=["04-consequences"])
case("possible case", ids("The next screen may belong to another route."), want=["04-consequences"])
case("imperative", ids("Connect the screens in the route with Navigate to Screen."), want=["04-consequences"])
case("condition", ids("If the user closes the flow, the app opens a paywall."), want=["04-consequences"])
case("heading", ids("## Add a custom tag to a text element"), want=["headings", "L4-article"])
case("possessive", ids("Open the flow's settings."), want=["05-claims"])
case("to-x", ids("To show the copy to users, add it to a placement."), want=["06-instructions"])
case("enumeration", ids("Use letters, digits, underscores, and dashes."), want=["lists"])
case("definition (definitions is always on)", ids("A custom tag is a custom variable."), want=[])
case("plain", ids("Users see the dash."), not_want=["04-consequences", "06-instructions", "lists", "headings"])
case("--change", ids("Users see the dash.", "--change"),
     want=["change-justification", "preserve-substance", "L3-section"])
case("--opener", ids("Users see the dash.", "--opener"),
     want=["misconception", "L3-section", "L4-article"])
case("--draft", ids("Users see the dash.", "--draft"), want=["spec-vs-behavior"])
case("section heading loads L3", ids("### Update translations\n\nSome text."), want=["L3-section"])
case("three paragraphs load L3", ids("One.\n\nTwo.\n\nThree."), want=["L3-section"])
case("one paragraph skips L3", ids("One sentence. Another."), not_want=["L3-section"])
case("warning verbs load 09", ids("Cancel discards every unsaved change."), want=["09-tone"])
case("bullet list loads lists", ids("- **A**: one.\n- **B**: two."), want=["lists"])
w31 = " ".join(["word"] * 31) + "."
w25 = " ".join(["word"] * 25) + "."
case("lists: paragraph over 30 words", ids(w31), want=["lists"])
case("lists: paragraph of 25 words doesn't load it", ids(w25), not_want=["lists"])
case("lists: two short paragraphs don't load it", ids("One.\n\nTwo."), not_want=["lists"])
case("lists: a heading ends the section", ids("One.\n\nTwo.\n\n## Next\n\nThree."), not_want=["lists"])
case("lists: a table row", ids("| Metric | Cohort |"), want=["lists"])
case("lists: three short paragraphs in one section", ids("One.\n\nTwo.\n\nThree."), want=["lists"])
case("L3: a long stretch without headings or blank lines", ids(("- item with some words in it\n") * 70), want=["L3-section"])
case("L3: a short text doesn't load it", ids("Users see the dash."), not_want=["L3-section"])
case("section opener loads misconception", ids("#### Regional varieties\n\nText."),
     want=["misconception"])
code, out = route("text", "--bogus")
case("unknown flag fails", {"failed"} if code != 0 else set(), want=["failed"])
code, out = route("If a flow", )
case("summary line", {"has-summary"} if out and out[0].startswith("Routed:") else set(), want=["has-summary"])

print("PASS" if fails == 0 else f"{fails} FAILED")
sys.exit(1 if fails else 0)
