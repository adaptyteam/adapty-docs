# Pacing

## The number

Measured across the recorded scripts:

| Video | Words | Runtime | Words/min | Screen |
|---|---|---|---|---|
| 19-first-screen | 405 | 4:27 | 91 | building two screens |
| 21-variables-dynamic-text | 364 | 3:29 | 104 | editing in the canvas |
| 22-virtual-currencies | 394 | 3:21 | 118 | dashboard, device, API |
| 20-interaction-basics | 462 | 3:50 | 120 | wiring one element |
| 24-ab-tests | 445 | 3:29 | 128 | a form and a results table |

**This is a residual, not a budget.** Delivery rate is roughly constant; what varies is silence.
Runtime is set by how long the on-screen work takes at a watchable speed, and the narration fills what
is left — so the more there is to do on screen, the lower the number goes. A build video lands near 90,
a dashboard sequence near 130.

Two consequences. **Estimate an action-heavy video from its shot list**, not from a word count.
And **cutting words will not shorten it** when the footage is what sets the length.

As a rough check on a talk-heavy video, a 3-minute one is about 330 words. Count with:

```bash
grep -v "^>" script.md | grep -v "^#" | grep -v "^Total\|^Final" | wc -w
```

It counts markdown punctuation, so it drifts a few words high. Close enough for a rough check.

**Count with the command, not by eye.** `> [VISUAL]` cues are not narration. Counting them inflated a
1,026-word script to 1,352, which turned a nine-minute video into an argument for splitting it in
three.

## Intros run short — 15 to 18 seconds

An intro is voiceover over a static frame. Nothing is happening, so anything longer drags. Land the
hook and a one-line teaser, then move.

Video 14's intro was cut to ~8 seconds in review. Err short.

## Outros may run long

The outro plays over the flow running in preview, so the voiceover has something to watch. Don't trim it to match the intro.

## The general principle

Match voiceover length to whether the screen is doing anything. Voiceover over a static frame drags;
over a live demo it does not.
