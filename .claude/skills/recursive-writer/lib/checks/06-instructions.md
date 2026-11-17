# 06 Instructions

**Applies when:** an instruction: an imperative, a "To X," sentence, a numbered step, a UI path.
**Triggers:** ^\s*\d+\.\s|(^|[.!?:]\s+)To [a-z]+[^,.\n]*,|(^|[.!?]\s+|^\s*([-*]|\d+\.)\s+)(click|select|open|enter|type|add|create|delete|go to|turn on|turn off)\b|\*\*[^*\n]+\*\*\s*>\s*\*\*
**Requires:** every instruction says what to act on and how, with the exact verb, in the reader's
order.
**Evidence:** per instruction, the control, its type noun, the preposition, and each location marked
obvious, chain, or hard to find. For a UI path: where the reader is at that point, and whether the
control is visible from there.

- Order: goal, location, action in one sentence when the location is one short, obvious place. A chain
  (a page plus a section), a hard-to-find control, or a structure that needs explaining gets its own
  sentence first ("Go to **Settings** > **Project**. In the **Double opt-in** section, turn off the
  switch."). One location per sentence.
- A bold UI label comes with a noun for fields, dropdowns, checkboxes, toggles, and panels ("the
  **Name** field"); a code identifier too. After "click", a button needs no noun ("click **Create
  variable**").
- One action per step; trivially related actions fold. A concept lives in the one step that owns it.
  Steps that run once and steps that run per item form separate procedures, and the second opens with
  "For each <item>:"; never "repeat for each" after the last step.
- Steps start where the reader is. Several similar items: say how to identify the right one.
- Routes to one result: when one route is easier or less error-prone, steer the reader to it. It's the
  steps; the other route comes after them as a fallback, titled by the situation that leads there. Never
  "you can also". When the routes are equally easy, a neutral list, each with when to use it. Either
  way, name a route's drawback only if it causes errors.
- No UI narration: don't say a dialog opens or name it once the reader is in it; don't narrate
  pointing: name the control and where it is, by the region that holds it (the header, the sidebar),
  never by a screen position (a corner).
- A UI path only when the reader would otherwise be lost; never one to a panel with several entry
  points. Skip it when the article already covers the thing; when the previous section left the
  reader on that page AND the two are directly related and read in sequence (readers land from search:
  if one could arrive here alone, give the location); or when the control is right in front of them (a
  section of the screen contains the clickable element: name the section, not the final target).
- A generic UI action the reader can carry out alone (duplicate, delete, rename): no steps. Keep only
  what the UI doesn't show (what the action copies or clears, what to do first, who it affects), and
  link to the article that owns the action.
