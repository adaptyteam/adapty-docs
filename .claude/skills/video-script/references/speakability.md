# Speakability

You are writing for a mouth, not an eye. A line that reads well can still make the jaw and lips do
gymnastics, and you find out mid-take.

**The only real test: read it aloud at delivery pace.** Stumble twice on the same line and it needs
rephrasing — not because the words are wrong, but because they will cost takes. Everything below
predicts the stumble before you reach the microphone.

## Think in postures, not sounds

Speech is the mouth moving between **articulatory postures** — where the lips, jaw and tongue sit.
Difficulty comes from two things, and neither is how many of a sound you use:

- **Travel** — consecutive sounds demanding postures far apart, so the mouth sprints between them
- **Hold** — one posture sustained past the point it stays comfortable, which is what makes a face
  muscle ache mid-take

The three postures that matter in English:

| Posture | Sounds | Feels like |
|---|---|---|
| **Rounded** — lips pushed forward | `oo`, `ow`, `or`, `w`, `sh`, `ch`, `j`, `r` | a pout |
| **Spread** — lips pulled wide | `ee`, `i`, `e`, and `s` alongside them | a grin |
| **Interdental** — tongue between the teeth | `th` in *think*, *both*, *path* | tongue out |

## Density is not the enemy

Measured across the recorded scripts, sibilant and *th* rates are near-identical, and the densest
sentence in the series was delivered without trouble:

> You can restore the user's existing purchases, change the user's selected product, and initiate a
> new purchase.  *(20-interaction-basics — highest sibilant load in the corpus)*

Don't count sounds. Don't sand lines smooth for their own sake.

## What actually costs takes

**1. Same consonant across a word boundary.** The mouth must double the sound or insert a pause; at
pace it does neither and the words smear.

> metric**s s**o · user**s s**ee · previou**s s**creen · thi**s sh**ape

**Near postures cost too, but they are not mechanically detectable.** The tongue or lips travel a
short awkward distance between these pairs:

| Boundary | Travel | Example |
|---|---|---|
| stop `t`/`d` → `th` | ridge, full closure, then between the teeth | yoursel**f — and th**at |
| `s`/`z` → `sh`/`ch`/`j` | flat tongue to domed | thi**s sh**ape |
| `p`/`b` → `m` | lips reclose immediately | to**p m**enu |

**Don't flag these automatically.** Stop-into-*th* alone occurs about 85 times across the recorded
scripts — *"tab. The"*, *"app. The"*, *"and the"* — all delivered without trouble. It becomes a problem
only when something else lands on top of it: a dash or a breath immediately before, a long sentence
already in progress, or a stressed word straight after.

The case that prompted this rule had all three:

> A paywall entity is the products behind a UI you built yoursel**f — and that** needs a paywall
> placement.

Pause, breath, `d`→`th`, and it arrives 20 words into the sentence. Splitting it fixed everything at
once. **Read aloud is the only instrument that catches this class.**

**This crosses sentence boundaries.** A full stop is a short pause, not a reset — the last word of one
sentence runs into the first of the next, and it is worse there because a breath lands at the same
time. Real cases from the corpus:

> ...no layout for i**t. Th**at leaves the one in the dashboard.
> ...the paywall entit**y. Y**ou name a placement.
> ...templates from scratc**h. St**art by setting up the styles.

The same applies between two narration paragraphs, and across a `> [VISUAL]` cue — a cue is a shot
change, not a pause in the voiceover.

**2. Stressed *th* in content words, close together.** This is the interdental posture: the tongue
leaves the teeth and comes back. Twice is nothing; twice in six words is a workout.

> **Both paths** end the same way · **Three** different **things** · the **monthly** subscription
> grants a **thousand** tokens · a width and a height, each with **three** modes

**The *th* in *the*, *that*, *this*, *them*, *there* is cheap** — unstressed, reduced, barely
interdental at all. Counting those produces nothing but noise. Only content words cost.

**3. `/θs/` and `/sθ/` clusters.** Genuinely hard, and they appear in ordinary words: **paths**,
**lengths**, **months**, **sixths**, **texts**. Prefer "every month" over "months", "how long" over
"lengths", where either works.

**4. Held rounding or held spread.** A run where every word wants the same extreme lip posture keeps
the muscle clenched:

> Today I'll **sh**ow **you** how to build an interactive **fou**r-screen **flow** from scratch.

Breaking the run with one neutral word usually fixes it. This is the pattern hardest to detect by
eye — reading aloud is the only reliable check.

**5. Plosive runs at phrase starts.** `p` and `b` pop into a close mic; a phrase opening with several
is worse. *Products page pop-up.*

## Ear ambiguity

The listener has no spelling and cannot scroll back.

- **Homophones** land wrong: *their/there*, *its/it's* are invisible in speech.
- **Identifiers don't survive.** `insufficient_balance` was written into a draft of video 22 and came
  out as "the request will yield an error". Say the meaning; let the docs carry the symbol.
- **Numbers and IDs** need deciding before the take: "chef pro test nine nine nine", or just "the
  monthly product"? Usually the latter.

## Breath

Sentences run about 10 words in the recorded scripts — roughly one comfortable breath. A 20-word
sentence needs a breath somewhere: punctuate where you would take one, or split it, which `tone.md`
wants anyway.

## Rephrase, don't delete

Speakability is a reason to say something differently, never a reason to say less. If a line resists
every rephrasing, it is usually carrying two ideas; split it and both halves get easier.

## Detector

Finds candidates for identical-consonant collisions, seams, stressed *th*, `/θs/` clusters and
over-long sentences.

**It is a coarse net, and it is deliberately quiet.** It does not flag stop-into-*th*, held postures,
or lip travel, because at useful precision those produce more false alarms than findings. Treat every
hit as a prompt to read that line aloud — and read the lines it doesn't flag too.

```python
import re

path = "script.md"
FUNC = {"the","that","this","these","those","them","their","there","they",
        "then","than","with","that's","there's","they're","other","another"}

sents = []
for raw in open(path, encoding="utf-8"):
    l = raw.strip()
    if not l or l.startswith((">", "#", "Total", "Final")): continue
    for s in re.split(r'(?<=[.!?])\s+', re.sub(r'[*`]', '', l)):
        w = re.findall(r"[a-z']+", s.lower())
        if w: sents.append((s, w))

# only the rare classes — stop->th is far too common in delivered narration to flag
NEAR = [({"s","z"}, {"sh","ch","j"}), ({"p","b"}, {"m"})]

def collide(a, b):
    if not a or not b: return False
    if a[-1] == b[0] and a[-1] not in "aeiou": return True
    end, start = a[-1], b[:2]
    for left, right in NEAR:
        if end in left and (start in right or start[:1] in right): return True
    return False

for s, w in sents:
    flags = []
    coll = [f"{a}|{b}" for a, b in zip(w, w[1:]) if collide(a, b)]
    if coll: flags.append("collide: " + ", ".join(coll))
    th = [x for x in w if "th" in x and x not in FUNC]
    if len(th) >= 2: flags.append("stressed th: " + ", ".join(th))
    cl = [x for x in w if re.search(r'ths|sth|xts', x)]
    if cl: flags.append("cluster: " + ", ".join(cl))
    if len(w) > 20: flags.append(f"{len(w)} words")
    if flags and len(w) >= 5:
        print(f"  [{'; '.join(flags)}]\n    {s}")

for (s1, w1), (s2, w2) in zip(sents, sents[1:]):
    if collide(w1[-1], w2[0]):
        print(f"  [seam: {w1[-1]}|{w2[0]}]\n    ...{' '.join(w1[-3:])} / {' '.join(w2[:3])}...")
```
