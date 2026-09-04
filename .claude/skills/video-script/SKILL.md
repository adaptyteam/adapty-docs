---
name: "video-script"
description: Use when writing, editing, transcribing, or describing Adapty tutorial video scripts — drafting a new script, generating recording steps, writing a YouTube description, or replacing a draft with the as-recorded transcript.
---

# Video Script — Write, Record, Transcribe

The Adapty tutorial video series lives in `$VIDEOS/N-topic/`. Twenty-three videos, four eras of
convention, and a set of rules that each cost a round of reviewer feedback to learn.

**The before/after is the product.** These videos work by showing a real state change on a simple,
replicable, relatable problem. Scenario selection comes before writing — `references/scenarios.md`.

**The voice is specific and hard to fake.** It is derived in `references/tone.md` from the delivered
narration of the recorded videos. A draft written to it survives the microphone; reference prose does not.

**Non-regression means four things**, none of them cosmetic: a scenario that shows its value, a voice
that is neither documentarian nor chatty, narration that keeps pace with the screen, and an intro that
doesn't strand the viewer. `references/regression-checklist.md` is the whole list.

## Files and ownership

| File | Owner | Carries |
|---|---|---|
| `script.md` | writer, then the recording | Narration plus `> [VISUAL]` cues. Line 1 declares its state — see State markers. |
| `recording-steps.md` | writer | Shot list for the person at the keyboard. Real values, no placeholders. Video 13 onward. |
| `description.md` | writer | YouTube description. Fixed section order, verbatim community block. |
| the `.mov` | Google Drive | The authority once it exists. A recorded script describes it; it never corrects it. |

## State markers — read line 1 before touching anything

Line 1 of `script.md` decides what you may change. Read it first, every time.

| Line 1 | State | What you may do |
|---|---|---|
| `Total estimated runtime: ~Xm` | Draft, not yet recorded | Rewrite freely — it is a plan |
| `Total runtime: M:SS (as recorded)` | Transcribed from the video | **Do not rewrite the narration** |
| `Final runtime: XmYYs (as recorded, …)` | Same, older phrasing | Same |
| no runtime line | Legacy, pre-convention | Ask before restructuring |

**A recorded script is a record, not a draft.** Improving its wording desynchronizes it from a
published video that nobody is going to re-cut. If the narration is wrong, the *video* is wrong — say
so and let the user decide. This is the one rule that cannot be recovered from once broken, because the
original wording is gone.

## Modes

Detect from the request; if ambiguous, ask. Never infer "draft" from the fact that a script reads
roughly — check line 1.

| Mode | Trigger | Load before starting |
|---|---|---|
| **Draft** | New video, no recording | `scenarios.md`, then `tone.md` — then `structure.md`, `pacing.md`, `terminology.md`, `speakability.md` |
| **Transcribe** | A `.mov` exists; replace the draft | `transcribe.md`, then `structure.md` |
| **Edit** | Change an existing file | `regression-checklist.md`, plus the file's own guide |
| **Recording steps** | Shot list for a script | `recording-steps.md` — includes when to *offer* the flow-generator skill |
| **Description** | YouTube copy for a recorded video | `description.md` |

Load on the **task**, not on what you notice partway through. You cannot know a rule applies until you
have read the file that names it, so "load if relevant" resolves to "never load".

## After any edit

Run `references/regression-checklist.md` over the **whole file**, not the passage you touched.

## Never

- Never demonstrate a scenario whose before state the camera can't see.
- Never open with a long intro over a static screen. Concepts go inside the Parts.
- Never let a run of on-screen actions pass with nothing said against it.
- Never write reference prose — *allows you to*, *is used for*, panel-by-panel enumeration.
- Never place a `> [VISUAL]` cue after the line it pairs with. It always sits **before**, so the reader
  knows what is on screen as the line is read. Off-by-one pairing is the same defect.
- Never assume a prior video. Each is a cold open.
- Never bold a UI label from memory. Verify it in the builder source.
- Never rewrite the narration of an as-recorded script.
- Never overwrite a script without copying the old one to `/tmp/` first.
- Never invoke the flow-generator skill without asking. It writes to live dashboard flows — offer,
  explain, wait.

Formatting is not on this list. Heading style, timestamps, and whether a transcript keeps its
`[VISUAL]` cues at all are preferences — but a cue that *is* present must sit before its line. See
`references/regression-checklist.md`.

## Commands

```bash
# duration
ffprobe -v error -show_entries format=duration -of csv=p=0 <file>.mov

# audio for transcription
ffmpeg -y -i <file>.mov -ar 16000 -ac 1 -c:a pcm_s16le /tmp/vo.wav

# transcript with timestamps (~90s for a 3-minute video)
whisper-cli -m ~/.cache/whisper-cpp/models/ggml-large-v3.bin \
  -f /tmp/vo.wav -l en --output-srt --output-file /tmp/vo
```

Note `zsh` has `noclobber` set here: `> file` on an existing path fails. Use `>| file`.

## References

| File | Read when |
|---|---|
| `scenarios.md` | Choosing what to demonstrate — read before drafting anything |
| `tone.md` | Writing any narration. The delivered-voice conventions, with quotes |
| `speakability.md` | Before handing a script to the microphone — what costs takes |
| `voice.md` | Framing rules — real vs staged problems, cold opens, meta-transitions |
| `structure.md` | File-shape conventions — headings, cues, sign-off. Preferences, not rules |
| `pacing.md` | Budgeting length; writing an intro or outro |
| `terminology.md` | Any product name, UI label, or brand term |
| `transcribe.md` | Turning a recording into a script |
| `recording-steps.md` | Writing or editing a shot list |
| `description.md` | Writing a YouTube description or picking chapters |
| `regression-checklist.md` | After every edit. The four real failures |
| `archive.md` | What each video teaches and which ones to learn from |

## The archive — resolve its path first

The script catalogue lives **outside this repo**, because the scripts and their review comments are
internal and are not committed. Its location is per-machine.

**Resolve `$VIDEOS` before reading anything:** take the `path:` under `## video-scripts` in
`.claude/context-mill/sources.local.md`.

```bash
VIDEOS=$(awk '/^## video-scripts/{f=1;next} f&&/^path:/{print $2;exit}' \
  .claude/context-mill/sources.local.md)
VIDEOS="${VIDEOS/#\~/$HOME}"
```

That file is gitignored and present only on machines that hold the catalogue. **If it is missing or has
no `video-scripts` entry, stop and ask for the path** — never guess, and never assume the catalogue is
in the repo.

Inside it: one folder per video (`$VIDEOS/N-topic/`), each with `script.md`, and where they exist
`recording-steps.md` and `description.md`. Plus `$VIDEOS/transcription-backlog.md`, which tracks which
scripts still hold a pre-recording draft while a published video exists.

`references/archive.md` is the guide to the catalogue — which videos are worth learning from, what
each teaches, and every video's state. Read it before opening any folder.
