# Transcribe a Recording

Replaces a draft script with what was actually narrated. **The recording is the authority.** The draft
was a plan; the delivered take is the fact.

## Steps

1. **Back up the draft** — `cp script.md /tmp/<n>-preVO-backup.md`. Drafts hold reviewer-negotiated
   wording that may be worth recovering.

2. **Duration:**
   ```bash
   ffprobe -v error -show_entries format=duration -of csv=p=0 <file>.mov
   ```

3. **Audio:**
   ```bash
   ffmpeg -y -i <file>.mov -ar 16000 -ac 1 -c:a pcm_s16le /tmp/vo.wav
   ```

4. **Transcript with timestamps:**
   ```bash
   whisper-cli -m ~/.cache/whisper-cpp/models/ggml-large-v3.bin \
     -f /tmp/vo.wav -l en --output-srt --output-file /tmp/vo
   ```
   About 90 seconds for a 3-minute video on large-v3.

5. **Correct, don't edit.** See the line below.

6. **Re-section** into `## Intro` / `## Part N: Title` / `## Outro`. Part titles may change to match
   what the narration actually covers — the delivered video often reorders or merges planned Parts.

7. **Carry the `> [VISUAL]` cues across** from the draft, adjusted to what is on screen. Recorded
   scripts keep their cues; 19, 20, and 21 all do. Recover them from the backup:
   ```bash
   grep -n "VISUAL" /tmp/<n>-preVO-backup.md
   ```

8. **Set line 1** to `Total runtime: M:SS (as recorded)`.

## What you may correct

**Only errors of transcription**, never of delivery:

| Fix | Leave alone |
|---|---|
| "Adaptee" → **Adapty** | A clumsy sentence |
| A misheard UI label | Word order |
| Obvious homophones | A repeated word, if he said it |
| Missing sentence punctuation | The sign-off's exact wording |

The transcript is a record. Improving the prose makes the file describe a video that doesn't exist.

## What changes downstream

A finished transcript usually invalidates the description's timestamps, and sometimes its "What you'll
learn" bullets — the delivered video may drop a planned beat entirely. Re-check `description.md`
against the new script before calling the job done.

Flag substantive divergences to the user rather than silently reconciling them. On 22, the delivered
take dropped the identify-the-user warning and never said `insufficient_balance` — both worth knowing,
neither worth "fixing".
