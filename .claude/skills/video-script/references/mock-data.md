# Mock Data

A dev app has no traffic. Any video that shows results — revenue, conversion, a test that ran for three
weeks, a profile with a history — needs numbers that do not exist on the account being recorded.
Faking them for the shoot is cheaper than generating real traffic, and it makes the recording
repeatable: the same screen, take after take, with no waiting on a backend.

It is also how wrong numbers reach a public video, so the rules below are not optional.

## Where the working setup lives

There is a harness on this machine, in `$VIDEOS/recording-harness/`. It carries the mechanics — how to
run it, how to switch each piece on and off, how to restore everything afterwards — and it is written
to be handed to someone else. Read it before building anything new; most of what a shoot needs already
exists there.

Keep its internals out of scripts and shot lists. A shot list says *start the server with mocking on*
and points at the harness. It does not explain how the mocking works.

## Before you mock anything

**Check the product can show it at all.** Mocking supplies values for a surface that exists. It cannot
create a column, a chart, or a screen. Confirm the thing you intend to fill is on screen first, with
whatever empty state it has.

**Never demonstrate something the product cannot do.** If a section of the script needs a surface that
does not exist for the case being demonstrated, cut the section. Video 24 had a part on predicted
metrics until it turned out flow tests render no prediction column. The part came out, on the
instruction "I don't want to advertise a feature that's not there."

**Prefer real state wherever it is cheap.** Anything you can genuinely create in a few minutes —
a placement, a flow, a paywall, a draft test — should be real. Fake only what time or traffic would
otherwise have to produce.

## Split the shoot where the fiction starts

Record everything that can be honest with nothing faked: the building, the configuring, the empty
result. Then restart with the fixture on and record the payoff.

The cut between the two takes is where the elapsed time passes. Mixing them in one continuous take puts
contradictions on screen — a test created a minute ago showing three weeks of revenue, a list that was
empty ten seconds before.

**This applies when the fiction is elapsed time.** Weeks of traffic cannot accumulate during a take, so
the cut is doing real work. When the fiction is a single state change — a field gaining a value, access
appearing — the next section is the better tool, and a split there is a cut you didn't need.

## Change the data mid-take instead of restarting

A video that shows a before and an after does not need two fixture states and a restart between them.
A restart is a shot break, and every break is a cut the edit has to hide. Make the fixture change in
response to something the operator does on camera, and the whole sequence is one take.

Video 24 split its A/B video in two for exactly this reason. The profiles video did not: opening the
anonymous profile arms the identification, and the next trip back to the list is when it lands. On
screen that is a person signing in while you happen to be looking at their profile, and the list
catching up — which is what the product does.

Four rules make it survive a shoot:

**Trigger on something the video already contains.** A hidden hotkey works and looks like nothing; a
page the narration was going to visit anyway looks like cause and effect. Prefer the second.

**Arm on the narrowest possible action.** The profiles fixture arms only on opening *that one profile*,
so the operator can visit the list as often as they like beforehand and nothing moves. A trigger as
broad as "any profile view" would have fired two Parts early.

**Delay the landing.** A background refetch arriving while the operator is still holding the before
frame will change it under them. A couple of seconds between arming and landing is enough.

**Keep the state in module scope, and say so.** A server restart and a page reload both reset it, so
every take starts from the same place — and an accidental reload mid-take is recoverable rather than
confusing. Write the one action that arms it into the shot list: it is the only way to spoil the take,
and the operator cannot see it coming.

Keep an environment variable that pins each state anyway. Rehearsing the second half without playing
through the first is worth the three lines.

**When the states are mutually exclusive, this does not apply.** Three settings where only one can be
active — sharing paid access, say — cannot become a sequence. That is N takes of one frame with a flag
between them, and it is the exception rather than the shape to reach for.

## Guidelines for the numbers

**Derive every field from a few inputs, in code.** For an A/B result that was unique users, a completion
rate, a trial rate, a trial-to-paid rate, and a price; everything else — revenue, per-user averages,
conversion rates, the confidence interval, the win probability — computed from those. A hand-typed
number is an unchecked number.

**Use the same formula for every row.** The defect that reached video 24: the losing variant's
per-user figures had been written against the *winning* variant's user count. Each row looked plausible
alone, and the margin between them read 12.4% when their own revenue and counts supported 10.4%.

**Read what the column means before filling it.** Field names lie. One field in that fixture fed a
column whose tooltip describes a completion rate, and it had been filled with a subscriber rate — 6.7%,
sitting beside two columns whose ratio was 83%. The product's own tooltip text is the specification.

**Copy what the product does, not what the test suite does.** A fixture has to behave like production,
not just return the shape the screen needs. The profiles fixture first searched with a case-insensitive
substring match, lifted from the repo's own test handlers; production looks up exactly one profile by
exact value, and a shot list had already been written around a filtered list that only the fixture
could produce. Test doubles describe what the frontend needs in order to render — they are not a
specification. Before building a beat on an interaction — search, filter, sort, pagination, one result
versus many — read the backend.

**Assume someone divides two columns on a paused frame.** For every visible pair, check that the third
column is what its header claims. That is how the video 24 fixture was caught, after the recording.

**Derive the statistics too.** A win probability follows from the gap and the spread. It cannot be
picked independently of the interval printed in the same row — 87% beside intervals implying 96% is a
contradiction anyone with a statistics background will see.

**Totals are weighted, never averaged.** A rate on a total row is the combined rate: sum the numerators
and the denominators. Averaging the rows' rates is correct only when their denominators match, which is
exactly when nobody would notice the error.

**Watch for identities that read as fake**, even when each number is plausible on its own:

- one count being exactly the sum of two others
- two money columns equal to the cent, when they are different deductions
- a perfectly symmetric confidence interval
- every variant sharing a price, a denominator, or a rate to three decimals

**Make the winner win by a realistic margin.** A result that is too clean reads as fabricated. Ten or
twelve percent with a derived probability is credible; three times the revenue is not.

## Timestamps

Either fake them or hide them. Never leave a real one on screen next to faked numbers — "Started
today" above three weeks of revenue is worse than no caption at all. Whichever you choose, it has to
hold for every take in the video, including the honest ones recorded before the fixture was switched on.

## Dressing a new app

An account created for a shoot announces itself: setup checklists, install banners, empty-state
prompts, version notices, a tag saying the SDK was never connected. Hide them, then **sweep the
corners** — walk every page the shot visits and look again. They reappear in places nobody predicted,
and each one tells the viewer the app in the video has no users.

Deprecated surfaces count here too. If a tab or a menu item is on its way out, hide it rather than let
the video advertise it (`scenarios.md`).

## Fabricated history has to be possible, not just consistent

Every number in the profiles fixture agreed with every other number, and the cast was still impossible:
one person held two overlapping paid subscriptions, took a second introductory offer the stores would
not have granted, and carried an email on a profile with no customer user ID. Walk the cast as a story,
oldest event to newest, and ask whether one person could have lived it.

**Nothing may exist because of an event the video has not shown yet.** That same fixture had a profile
created by a logout — which requires an identified session, which the video was about to demonstrate
three Parts later. Anything on screen at minute two that descends from minute six is a profile from the
future. Check each artifact against the first moment it appears.

## Check the frame, not the fixture

A fixture can be internally consistent and still render something wrong. When the take is done, pause
it, read the row, and do the arithmetic against what is actually on screen.

## After the shoot

Restore everything, and keep none of it in a commit. The harness README carries the steps. A mocked
dashboard left running will mislead whoever opens it next.
