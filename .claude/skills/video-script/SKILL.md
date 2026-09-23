---
name: "video-script"
description: Use when writing, editing, transcribing, or describing Adapty tutorial video scripts — drafting a new script, generating recording steps, writing a YouTube description, or replacing a draft with the as-recorded transcript.
---

# Video Script — Write, Record, Transcribe

The Adapty tutorial video series lives in `$VIDEOS/N-topic/`. 24 videos.

Each video shows a state change: a before the camera can see, then an after. Pick the scenario before
writing narration — `references/scenarios.md`.

The narration voice is derived in `references/tone.md` from the four as-recorded scripts.

`references/regression-checklist.md` lists the four regressions: a scenario that doesn't show its
value, tone drift in either direction, on-screen action the viewer can't interpret, and a long intro
over a static screen.

## Files and ownership

| File | Owner | Carries |
|---|---|---|
| `script.md` | writer, then the recording | Narration plus `> [VISUAL]` cues. Line 1 declares its state — see State markers. |
| `recording-steps.md` | writer | Shot list for the person at the keyboard. Real values, no placeholders. Video 13 onward. |
| `description.md` | writer | YouTube description. Fixed section order, verbatim community block. |
| the `.mov` | Google Drive | Authoritative once it exists. The script is updated to match the video, never the reverse. |

## State markers — read line 1 before touching anything

Line 1 of `script.md` decides what you may change. Read it first, every time.

| Line 1 | State | What you may do |
|---|---|---|
| `Total estimated runtime: ~Xm` | Draft, not yet recorded | Rewrite freely — it is a plan |
| `Total runtime: M:SS (as recorded)` | Transcribed from the video | **Do not rewrite the narration** |
| `Final runtime: XmYYs (as recorded, …)` | Same, older phrasing | Same |
| no runtime line | Legacy, pre-convention | Ask before restructuring |

**A recorded script is a record.** Rewriting it desynchronizes it from a video that will not be
re-cut, and the original wording is then gone. If the narration is wrong, report it and let the user
decide.

## Modes

Detect the mode from the request; if ambiguous, ask. Do not infer "draft" from rough-reading
narration — check line 1.

| Mode | Trigger | Load before starting |
|---|---|---|
| **Draft** | New video, no recording | `scenarios.md`, then `tone.md` — then `structure.md`, `pacing.md`, `terminology.md`, `speakability.md` |
| **Transcribe** | A `.mov` exists; replace the draft | `transcribe.md`, then `structure.md` |
| **Edit** | Change an existing file | `regression-checklist.md`, plus the file's own guide |
| **Recording steps** | Shot list for a script | `recording-steps.md` — organized by shot, not by Part; includes when to *offer* the flow-generator skill. Add `mock-data.md` when the shoot needs faked data |
| **Description** | YouTube copy for a recorded video | `description.md` |

Load the listed references before starting, not partway through.

## After any edit

Run `references/regression-checklist.md` over the **whole file**, not the passage you touched.

## Never

- Never demonstrate a scenario whose before state the camera can't see.
- Never open with a long intro over a static screen. Concepts go inside the Parts.
- Never let a run of on-screen actions pass with nothing said against it.
- Never write reference prose — *allows you to*, *is used for*, panel-by-panel enumeration.
- Never place a `> [VISUAL]` cue after the line it pairs with. It sits before the line, and pairs with
  the line immediately below.
- Never assume a prior video. Each is a cold open.
- Never bold a UI label from memory. Verify it in the builder source.
- Never describe the customer's app in words they wouldn't use for it themselves.
- Never mention a deprecated surface in a new script. Cut it.
- Never assert what an app does without reading its source.
- Never write up a code change as a task for the operator when you can make it yourself.
- Never hand-type fabricated metrics. Derive them, then check the arithmetic on a paused frame.
- Never rewrite the narration of an as-recorded script.
- Never overwrite a script without copying the old one to `/tmp/` first.
- Never invoke the flow-generator skill without asking. It writes to live dashboard flows: offer it,
  explain what it does, wait for an answer.

Formatting is not on this list: heading style, timestamps, and whether a transcript keeps its
`[VISUAL]` cues are preferences. A cue that is present must sit before its line.

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
| `recording-steps.md` | Writing or editing a shot list. Shot-shaped structure, cut markers, what not to write |
| `mock-data.md` | Faking data for a shoot — when it's allowed, and how the numbers have to hold up |
| `description.md` | Writing a YouTube description or picking chapters |
| `regression-checklist.md` | After every edit. The four real failures |
| `archive.md` | What each video teaches and which ones to learn from |

## The archive — resolve its path first

The script catalogue lives outside this repo (scripts and review comments are internal and not
committed), so its location is per-machine. Resolve `$VIDEOS` before reading anything: it is the
`path:` under `## video-scripts` in `.claude/context-mill/sources.local.md`.

```bash
VIDEOS=$(awk '/^## video-scripts/{f=1} f&&/^path:/{print $2;exit}' .claude/context-mill/sources.local.md)
VIDEOS="${VIDEOS/#\~/$HOME}"
```

That file is gitignored and exists only on machines holding the catalogue. **If it is missing or has no
`video-scripts` entry, stop and ask for the path** — never guess, and never assume the catalogue is in
the repo.

Inside: one folder per video (`$VIDEOS/N-topic/`) with `script.md`, plus `recording-steps.md` and
`description.md` where they exist. `$VIDEOS/transcription-backlog.md` tracks published videos whose
script is still a pre-recording draft. `$VIDEOS/recording-harness/` holds the data-mocking setup that
`mock-data.md` governs.

Read `references/archive.md` before opening any folder.
