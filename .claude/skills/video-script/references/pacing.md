# Pacing

## The number

**~110 words of voiceover per minute of finished video.** Below speech rate, because the screen
carries silent stretches.

Measured across the recorded scripts:

| Video | Words | Runtime | Words/min |
|---|---|---|---|
| 19-first-screen | 405 | 4:27 | 91 |
| 20-interaction-basics | 462 | 3:50 | 120 |
| 21-variables-dynamic-text | 364 | 3:29 | 104 |
| 22-virtual-currencies | 394 | 3:21 | 118 |

A 3-minute video is about 330 words. Count with:

```bash
grep -v "^>" script.md | grep -v "^#" | grep -v "^Total\|^Final" | wc -w
```

It counts markdown punctuation, so it drifts a few words high. Close enough for budgeting.

## Intros run short — 15 to 18 seconds

An intro is voiceover over a static frame. Nothing is happening, so anything longer drags. Land the
hook and a one-line teaser, then move.

Video 14's intro was cut to ~8 seconds in review. Err short.

## Outros may run long

The outro plays over the flow running in preview, so the voiceover has something to watch. Don't trim it to match the intro.

## The general principle

Match voiceover length to whether the screen is doing anything. Talking-head time over a static frame
is the boring part; over a live demo it isn't.
