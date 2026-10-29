# 09 Tone and weight

**Applies when:** can, may, might; an intensity word or a promised outcome; a warning, limit, failure, or callout.
**Triggers:** \b(can|cannot|may|might|must|guarantee\w*|instantly|immediately|fail\w*|errors?|discard\w*|lose|loses|lost|delet\w*|overwrit\w*|irreversibl\w*|permanent\w*|restrict\w*|warning|careful|don't|do not)\b|^\s*:::|<Callout
**Requires:** every word is exactly as strong as the facts behind it, and a warning's weight matches
the stakes.
**Evidence:** each modal (can, may, might), intensity word, and promised outcome, with what backs it;
for a warning or limit, its case (below) and the reader's action.

- Hedge to the evidence: no stacked hedges; don't soften a sourced claim or firm guidance.
- Don't overpromise outcomes; no unsupported claims about the reader's product.
- No emotional, coercive, or loaded words. Tie importance to something the reader can observe ("a
  major update"), never to feelings ("a version that matters to you").
- Don't deny a claim nobody made, or frame a feature as a lifted restriction that was never stated.

Weight by case:
1. Normal or default behavior, or a normal limit, in Adapty or the reader's app and setup: state it
   plainly, as design, never as a defect. No warning.
2. A choice that's hard to undo: at the decision point, say what it determines and that it can't be
   changed later. Short, dry, and hard to miss (first sentence of the step, bold, or a callout).
3. A silent failure: name it in setup only if readers would otherwise assume it's handled.
- Every warning gives the consequence and an action the reader can take. A callout's type follows how
  stuck an affected reader gets, not how many readers it affects: what a reader can't proceed without
  is `:::important`, even for a few readers; supplementary information is `:::note`.
