# 04 Consequences

**Applies when:** if, when, unless; a case, option, state, or limit (can't, doesn't allow, isn't available, not supported, may); an instruction (a numbered step, a "To X," sentence, an imperative).
**Triggers:** \b(if|when|unless|whether|may|might)\b|\b(can['’]t|cannot|doesn['’]t allow|don['’]t allow|(?:isn|aren)['’]t (?:available|supported)|not supported)\b|^\s*\d+\.\s|(^|[.!?:]\s+)To [a-z]+[^,.\n]*,|(^|[.!?]\s+|^\s*([-*]|\d+\.)\s+)(click|select|open|enter|type|add|create|delete|go to|turn on|turn off|connect|use)\b
**Requires:** every case, option, condition, and instruction says what happens as a result: what users
see, what the reader must do, or what Adapty does next.
**Evidence:** per case, the outcome in a few words. None: add it, or cut the case.

- Name the mechanism when the reader needs it.
- A sentence about a state or a limit ends with the action it calls for. A default comes with what
  changes it, in the same sentence or the next: the default as a fact, then the change as the
  reader's action. Never "by default" without its exception.
- Options say what users will see. Instructions say what they're for.
- Steps, prescriptive sections, and section openers state what the reader gains ("Do X so that Y"),
  not the penalty for skipping them or a failure scenario. A consequence stated in a step or list item becomes the action that avoids it; check
  that the action is safe (publishing an unfinished draft only to keep it isn't). A real warning (data
  loss, an action that's hard to undo) still states the consequence: see 09.
