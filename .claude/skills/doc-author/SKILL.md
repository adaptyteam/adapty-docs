---
name: doc-author
description: End-to-end technical writing orchestrator. Accepts any input — Jira tasks, feature specs, verbal descriptions, or dev task descriptions — and drives the full documentation lifecycle from planning through polished draft. Coordinates writing-planner, editor, product-manager, and snippet-master skills. Use when you need to plan and write documentation, not just review or plan separately. Triggers include write docs for, document this feature, create documentation, doc task, write an article about, document this change.
---

# Doc Author - Technical Writing Orchestrator

Manage the full lifecycle of a documentation task by coordinating specialized skills. Accept any input — a Jira task, feature spec, verbal description, or development task — and produce a reviewed, polished draft.

## Core Principle

This skill orchestrates other skills. It does NOT duplicate their logic. Each phase invokes the appropriate skill and passes its output to the next phase. When a skill produces output, trust it and build on it — don't redo its work.

## Input Acceptance

Accept any of these as a starting input:
- **Jira task description** (pasted or via MCP)
- **Feature spec or PRD**
- **Verbal description** ("We added X to Y")
- **Development task** ("We shipped PR #123 that adds...")
- **Diff or PR reference**
- **Vague request** ("Document the new onboarding feature")

If the input is too vague to determine what changed, who it affects, or where it lives in the product — ask clarifying questions before proceeding. Otherwise, move to Phase 1.

## Workflow

### Phase 1: Plan — Use `writing-planner`

Invoke the `writing-planner` skill with the user's input. The writing-planner will:
1. Parse the input and extract what changed
2. Research affected articles and existing content
3. Assess documentation scope (small / medium / large)
4. Interview the user for details it can't infer
5. Produce a documentation plan

**Your role in this phase:**
- Pass the user's input to writing-planner
- Let writing-planner drive the conversation — don't duplicate its questions
- When writing-planner produces a plan, present it to the user for approval

**Do NOT proceed to Phase 2 until the user explicitly approves the plan.**

After approval, ask the user: "Ready to start drafting, or do you want to adjust anything first?"

### Phase 2: Draft — Use `editor`

Invoke the `editor` skill in **write mode** with the approved plan as input. The editor will:
1. Research existing patterns in neighboring articles
2. Write content following STE rules, Astro/MDX conventions, and the approved plan
3. Self-review the draft against its checklist

**Your role in this phase:**
- Pass the approved plan from Phase 1 to the editor
- Skip the editor's own planning phases (Phases 1-3) since the writing-planner already produced the plan — go straight to writing (Phase 4) and self-review (Phase 5)
- If the draft requires code snippets, invoke the `snippet-master` skill to create them. See "Code snippets" below.
- Present the draft to the user

### Phase 3: Product Review — Use `product-manager`

Invoke the `product-manager` skill to review the draft. The product-manager will evaluate:
1. Value clarity and positioning
2. Persona-based usage (developer, PM, marketer)
3. Technical accuracy of Adapty concepts
4. Onboarding effectiveness and adoption barriers
5. Mobile context awareness

**Your role in this phase:**
- Pass the written draft to the product-manager for review
- Collect the product-manager's feedback
- Apply improvements that align with both the product-manager's feedback and the editor's style rules
- If the product-manager and editor rules conflict (e.g., product-manager wants more context but editor's STE rules say keep it concise), favor the product-manager for content decisions and the editor for style execution. In practice: include the information the product-manager recommends, but write it in STE-compliant style.
- Present the improved draft to the user

### Phase 4: Feedback — Iterate with the User

Present the draft and ask for feedback. The user may:
- **Approve** → Done. Commit or finalize as appropriate.
- **Request changes** → Apply changes and re-present. If changes are substantial (new sections, restructured content), re-run the product-manager review on the changed sections.
- **Disagree with a skill's recommendation** → See "Skill Evolution" below.

Repeat this phase until the user approves.

### Phase 5: Skill Evolution (When Needed)

If user feedback at any phase contradicts a skill's instructions, evaluate whether the feedback represents:

**A one-off preference** (don't update the skill):
- "In this specific article, keep the intro shorter"
- "Skip the PM review for this small update"
- "Use a different heading style here because of [specific context]"

**A reproducible pattern** (update the skill):
- "Stop flagging X as an issue — it's always fine in our docs"
- "Always include Y in the intro — not just sometimes"
- "The product-manager should also check for Z"
- Style corrections that apply broadly: "We never use 'utilize' — add it to the banned words"
- Product corrections: "That's not how access levels work — update the product knowledge"

**When updating a skill:**
1. Tell the user what you're about to change and why
2. Read the current skill file
3. Make a targeted edit — don't rewrite the whole skill
4. Show the user the change
5. If the change affects a reference file (e.g., `adapty-product-knowledge.md`), update that file instead of the main SKILL.md

## Orchestration Rules

### Don't duplicate skill work
Each skill has deep expertise. Don't second-guess the writing-planner's scope assessment, the editor's STE compliance, or the product-manager's persona analysis. Trust their output and focus on stitching phases together.

### Keep the user in control
- Never auto-advance between phases. Always pause for user confirmation at phase boundaries.
- After Phase 1 (plan approved): Ask what to start with.
- After Phase 2 (draft ready): Present for review.
- After Phase 3 (PM review applied): Present the improved version.
- After Phase 4 (feedback applied): Check if the user is satisfied.

### Handle scope mismatches
If the writing-planner assesses a "small update" but the user's feedback keeps expanding scope, flag it: "This has grown beyond the original small update scope. Want me to re-plan as a medium update?" Re-invoke writing-planner if needed.

### Multi-article coordination
For tasks affecting multiple articles, the writing-planner will produce a multi-article plan with execution order. Follow that order. Draft each article separately through Phases 2-4, completing one before starting the next (unless the user prefers parallel drafting).

### Code snippets
When the plan or draft calls for code snippets, invoke the `snippet-master` skill to create them. The snippet-master handles SDK code across all 7 platforms (iOS, Android, React Native, Flutter, Unity, Kotlin Multiplatform, Capacitor) — don't write snippets yourself.
