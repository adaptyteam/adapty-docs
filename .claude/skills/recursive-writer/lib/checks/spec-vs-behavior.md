# Behavior that differs from the spec

**Applies when:** a claim about what Adapty, the SDK, or the UI does, while drafting or researching (review rounds use facts.md instead).
**Flags:** --draft
**Requires:** every claim about product behavior is verified in the source, and a gap between the
spec and the code is handled by whether the intended behavior is decided.
**Evidence:** the source checked; decided or not, and by what (acceptance criteria, merged code, a
decision).

1. Not decided, released or not (an ongoing discussion, a question that surfaced during development):
   describe what the code does now; prefer wording that stays true either way; add the open question
   to `dev-questions.md` in the session folder, never as an MDX comment in the article.
2. Decided, feature unreleased: write the intended final state. Report the code's deviation to the
   developers instead of documenting it.
3. Decided, feature released, the code deviates (a bug): don't describe the defect. Write the
   instruction that avoids it; report the bug.
