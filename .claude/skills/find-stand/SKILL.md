---
name: find-stand
description: Use when the user wants the staging ("review") URL for an in-progress feature on the Adapty Dashboard. Accepts a Jira ticket, GitLab MR URL, branch name, or feature description (frontend or backend). Resolves the frontend MR's latest "Deploy to review" job and returns the `review-<suffix>.review.adpinfra.dev` URL.
---

# Find stand (staging server URL)

## Overview

Adapty Dashboard previews live at `https://<suffix>.review.adpinfra.dev`. The `<suffix>` comes from the **frontend** MR's latest `Deploy to review` GitLab CI job — specifically the line `NAME: dashboard-interface-<suffix>` in the job log.

Goal: from any starting point the user gives (feature name, Jira key, BE or FE MR URL, branch name), resolve that suffix and hand back a clickable URL — with zero manual log-copying.

## Inputs (anything goes)

The user may give any of:

- A **GitLab MR URL** — frontend (`adapty-dashboard-interface`) or backend (`adapty-dashboard-api`).
- A **branch name** — `feat/adp-xxxx-...` or similar.
- A **Jira ticket** — URL like `https://adaptyio.atlassian.net/browse/ADP-XXXX`, or just the key (`ADP-XXXX`).
- A **feature name / description** — free-text.

The skill normalizes input to: "which frontend MR do I need?" Backend-only inputs require finding the corresponding FE MR.

### If no input is given — ask first (plain prose), don't open a form

**Never silently infer the target from ambient context.** Docs branches (like `ADP-XXXX`) track *documentation* tickets — the engineering ticket with the stand is almost always a different ID. Silent inference will send the user to the wrong stand.

But the current branch *can* be a useful starting hint — if the user opts in explicitly.

When `/find-stand` is invoked with no argument:

1. **Ask in plain prose first.** One sentence, no `AskUserQuestion` form. Example:

   > "What feature do you want the stand for? Give me a Jira key/URL, GitLab MR URL, branch name, or just describe the feature."

   `AskUserQuestion` is wrong here because the user wants to *type input*, not pick between options. A constrained form makes the user feel they can't just say what they want.

2. **Wait for the user's response.** Do not pre-search, do not load tools, do not look at the current branch.

3. **Only if the user signals they don't have an input** (says "I don't know," "no idea," "find it yourself," etc.) — *then* offer the docs-branch fallback as a single follow-up suggestion, in prose:

   > "OK — want me to try the current branch (`ADP-XXXX`) as a hint? I'd fetch that docs ticket, walk its issue links to find the engineering ticket, and search MRs from there."

   Wait for a yes/no. Only proceed with the branch-hint path on explicit confirmation. *Only offer this fallback* if the current branch matches a Jira-key pattern (e.g. `ADP-\d+`); skip it otherwise.

**Branch-hint path mechanics** (when chosen): read the docs ticket from Jira → walk its `issuelinks` for "is documented by" / "relates to" relationships → find the engineering ticket → search FE MRs for that engineering key. If the docs ticket has no linked engineering ticket, or multiple ambiguous links, stop and ask the user to disambiguate. Don't guess which link is "the" engineering ticket.

## Repos

There are two GitLab repos under `adapty/`:

| Repo | Hosts | Job NAME prefix |
|------|-------|-----------------|
| `adapty-dashboard-interface` | Frontend | `dashboard-interface-` |
| `adapty-dashboard-api` | Backend | `dashboard-api-` (not used for the URL) |

**The URL suffix is always taken from the frontend MR**, regardless of which MR the user provided. Strip the `dashboard-interface-` prefix from the FE job's `NAME:` line — the remainder is the suffix.

Use plain paths as project IDs: `adapty/adapty-dashboard-interface` and `adapty/adapty-dashboard-api`.

## Workflow

### Step 0 — Pre-flight: verify GitLab MCP, Jira MCP, and GitLab token

Three dependencies must be live before any work starts. Check all three up front — skipping leads to doing 80% of the lookup and dead-ending halfway. Run all three checks in parallel.

**Check A — GitLab MCP is connected.** Call `mcp__claude_ai_GitLab_Adapty__get_mcp_server_version`. If the tool isn't loaded or returns an error, stop. Tell the user: "GitLab MCP isn't connected. Connect it in Claude settings, then re-run." Don't fall through to alternate paths — the rest of the workflow depends on MCP tools for MR search and pipeline lookup.

**Check B — Atlassian (Jira) MCP is connected.** Call `mcp__claude_ai_Atlassian__atlassianUserInfo`. A profile back means the MCP is live. Do **not** use `getAccessibleAtlassianResources` as the probe: for this account it returns `[]` even when auth is fine, so an empty list proves nothing. No cloud ID lookup is needed — every Atlassian call in this skill takes the site hostname `adaptyio.atlassian.net` as `cloudId`. If `atlassianUserInfo` errors, stop and tell the user: "Atlassian MCP isn't connected. Connect it in Claude settings, then re-run."

The Atlassian MCP is technically only required if MR search fails (MR-first), but checking it now avoids the alternative: getting halfway through and then failing at the fallback step. The check is one cheap call.

**Check C — GitLab PAT is present and has FE-project access.**

```bash
if [ -z "$GITLAB_TOKEN" ]; then
  echo "GITLAB_TOKEN missing"; exit 1
fi
curl -sSf -o /dev/null -w "%{http_code}\n" \
  -H "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.adapty.io/api/v4/projects/adapty%2Fadapty-dashboard-interface"
```

Outcomes:

- **`200`** → token works, this check passes.
- **`GITLAB_TOKEN` empty / not set** → stop and direct the user to "GitLab token setup" below.
- **`401` / `403` / `404`** → token is invalid or scope is too narrow. Stop and direct the user to "GitLab token setup". Don't fall through to manual paste — token setup is a 60-second fix and the right next step.

**Only proceed past Step 0 when all three checks pass in the current session.** If any check fails, surface the specific failure and stop — don't do partial work that won't finish.

### Step 1 — Find the FE merge request (MR-first)

**Default to GitLab MR search before touching Jira.** MR titles at Adapty include the Jira key (`feat(ADP-XXXX): ...`), so a single search on the right keyword finds the MR directly. Jira is the fallback when MR search comes up empty.

Branch on input type:

| Input | First action |
|-------|--------------|
| **FE MR URL** | Done — extract project + IID from URL. |
| **BE MR URL** | `get_merge_request` on the BE repo, read its `description` for an `ADP-XXXX` Jira key, then search FE MRs for that key. |
| **Branch name** | `search` scope=`merge_requests` in `adapty/adapty-dashboard-interface` for the branch name (or the Jira key inside it). |
| **Jira key (e.g. `ADP-XXXX`)** | `search` scope=`merge_requests` with `project_id: "adapty/adapty-dashboard-interface"` for the key string — it appears in MR titles. Without `project_id` the search returns nothing. |
| **Feature description** | `search` scope=`merge_requests` in `adapty/adapty-dashboard-interface` for the most distinctive keyword (e.g. "template library"). |

Use `state=opened` and `sort=desc` (default) to bias toward active MRs.

**Only fall back to Jira when** the FE MR search returns nothing with recent activity. See "Jira fallback" below for the safe call sequence.

#### Handling multiple candidate MRs

MR search often returns more than one match — a feature MR plus follow-up patches, a stale draft, or related work that mentions the same keyword. Apply these rules in order:

1. **Drop closed and merged.** Filter to `state="opened"`. A closed MR has no live stand.
2. **Drop stale ones.** Drop any MR whose `updated_at` is older than ~14 days. A stand on a stale branch is almost certainly dead or wrong.
3. **If exactly one remains** → use it and tell the user briefly which one ("Using `feat(ADP-XXXX): ...` — !N, updated 2 days ago").
4. **If two or more remain** → present them via `AskUserQuestion`. For each candidate, show: MR `iid`, title, author, `updated_at`, and source branch. Wait for the user to pick. Never guess.
5. **If zero remain** → widen back to step 1's full list (including closed/merged) and surface those as a final question: "Nothing recent matches. Here are older MRs — is any of these what you wanted?" If still nothing, fall through to the Jira lookup.

### Step 2 — Get the latest pipeline

`get_merge_request_pipelines` for the FE MR. The first entry is the latest. Note its `id` and `status`.

### Step 3 — Find the `Deploy to review` job

`get_pipeline_jobs` on the pipeline. Find the entry where `name == "Deploy to review"` (case-sensitive, stage is `review`). Note its `id`, `status`, and `web_url`.

- `status == "success"` — proceed.
- `status == "running" | "pending"` — tell the user the deploy is in progress; the URL might 404 for another minute or two.
- `status == "manual" | "failed" | "canceled"` — the review stand isn't live for this commit. Report and stop.

### Step 4 — Fetch the trace and extract `NAME:`

```bash
curl -sSf -o /tmp/find-stand-trace.txt \
  -H "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.adapty.io/api/v4/projects/adapty%2Fadapty-dashboard-interface/jobs/<job_id>/trace"
grep -a -m1 '^NAME:' /tmp/find-stand-trace.txt
```

The output is one line: `NAME: dashboard-interface-<suffix>`. Strip the prefix — the remainder is the suffix.

**Important pitfalls baked into the snippet:**

- **`-o <file>`, not pipe.** Cloudflare in front of `gitlab.adapty.io` truncates the streamed response to ~2 KB when stdout is a pipe (`curl | grep`). Writing to a file is the only pattern that returns the full 12 KB trace. Reproduced consistently with HTTP/1.1, HTTP/2, and `--compressed`. Do not pipe.
- **`grep -a`** because the trace contains terminal escape sequences that can make grep treat it as binary.

If `$GITLAB_TOKEN` is unset, or the curl returns 401/404, fall through to manual paste:

> "Open this and paste back the `NAME:` line:  
> https://gitlab.adapty.io/adapty/adapty-dashboard-interface/-/jobs/<job_id>/raw"

Don't loop or retry token setup mid-task. If a session hits an auth failure, complete the lookup via paste and (optionally, at the end) suggest the user verify their token still has the right scope.

### Step 5 — Construct the URL

```
https://<suffix>.review.adpinfra.dev/<path>
```

Default `<path>` is empty (the root). Common paths: `/registration`, `/login`, `/dashboard`. Only append a path if the user asked for one in their request.

### Step 6 — Report back

Output:

- FE MR: title + link.
- Pipeline ID + status.
- `Deploy to review` job status.
- The clickable URL.

Keep it short — three or four lines.

## Jira fallback

Use Jira only when the FE MR search returns nothing. This workspace's Atlassian MCP exposes only the Teamwork Graph tools, `atlassianUserInfo`, and a resource listing that returns `[]`. There is no `searchJiraIssuesUsingJql` and no `getJiraIssue`, so the fallback needs a Jira key or URL to start from — it cannot search Jira by feature description.

### Read an issue by key or URL

```
getTeamworkGraphObject({
  cloudId: "adaptyio.atlassian.net",
  objects: ["https://adaptyio.atlassian.net/browse/ADP-XXXX"],
})
```

Returns summary, description, status, assignee, and reporter in one call (verified 2026-09-08 on ADP-7740). Pass the hostname as `cloudId`; the UUID form is `cbfbff78-d084-45f9-aae2-5fb2120c99a6` if a tool ever insists on one.

### Find linked tickets and MRs

```
getTeamworkGraphContext({
  cloudId: "adaptyio.atlassian.net",
  objectType: "JiraWorkItem",
  objectIdentifier: "ADP-XXXX",
  detailLevel: "full",
})
```

Lists related work items, users, and linked pull requests. For an epic, the child stories are where the MRs hang: read the epic, then search FE MRs for each child key.

### Use Jira only to reach an MR

The goal of the Jira detour is to get back to a GitLab MR. Once you have a Jira key, return to Step 1 and search FE MRs for that key **with `project_id: "adapty/adapty-dashboard-interface"`** — an unscoped `search` for a Jira key returns nothing even when the MR exists (observed 2026-09-08 on ADP-6712's children).

## GitLab token setup (one-time)

The trace endpoint is auth-gated. You need a Personal Access Token in `$GITLAB_TOKEN` to fetch it directly. Set this up once and the skill runs end-to-end with no manual steps.

**Scope:** at Adapty's GitLab, `read_api` *alone* is not enough — observed 404 on the FE project for a `read_api`-only token. Use the broader **`api`** scope (or check every scope GitLab offers you when creating the token; that's what works in practice).

**Create the token:**

1. Visit https://gitlab.adapty.io/-/user_settings/personal_access_tokens.
2. Name it (e.g. `claude-find-stand`), set expiry (1 year is fine), select scope **`api`**.
3. Copy the token immediately — GitLab shows it once.

**Persist to `~/.zshenv`** (not `.zshrc`). `.zshenv` is sourced by *all* zsh invocations including non-interactive shells spawned by tools like Claude Code; `.zshrc` is interactive-only. From a terminal where you've just exported the token:

```bash
echo "export GITLAB_TOKEN='$GITLAB_TOKEN'" >> ~/.zshenv
```

**Verify:**

```bash
curl -sSf -o /dev/null -w "HTTP %{http_code}\n" \
  -H "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.adapty.io/api/v4/projects/adapty%2Fadapty-dashboard-interface"
```

Should print `HTTP 200`. If it prints `404`, the token's scope doesn't cover the FE project — recreate with broader scope. If it prints `401`, the token isn't reaching the API — check `${#GITLAB_TOKEN}` is non-zero in the same shell.

## Why some parts can't be skipped (context for future-you)

We investigated several "is there a faster path" angles and ruled them out. Don't re-investigate:

- **GitLab MCP** has rich MR/pipeline tools (`get_merge_request`, `get_pipeline_jobs`, `get_merge_request_pipelines`, `search`) but **no `get_job_trace` and no artifact-download tool**. The trace and the `.env.gz` artifact on `Set up review environment` are both inaccessible via MCP — that's why we use REST + PAT for Step 4.
- **`get_pipeline_jobs` and `get_merge_request` do not include `environment.slug`, `external_url`, or `deployments[]`.** No way to skip the trace fetch.
- **The slug is generated by Werf**, not GitLab's standard environment-slug algorithm. Confirmed: hashing several `review/<branch>` candidates via GitLab's base36 SHA256 doesn't produce the observed deploy suffix. **The suffix is not derivable from the branch name alone** — the trace fetch is necessary.
- **`/jobs/<id>/raw`** is a web-UI route gated by session cookie. PAT headers don't authenticate it; only browser sessions do. Stick with the API endpoint (`/api/v4/.../jobs/<id>/trace`).
- **Curl piping**: see Step 4. `curl | grep` truncates due to a Cloudflare edge behavior; always `-o <file>` then grep.

## Common mistakes

- **Going to Jira first.** MR titles include the Jira key; search the FE repo by feature name or key and you almost always find it in one call.
- **Treating an empty `getAccessibleAtlassianResources` as "Jira is down".** It returns `[]` here regardless. Probe with `atlassianUserInfo`, pass `adaptyio.atlassian.net` as `cloudId`.
- **Searching merge requests without `project_id`.** An unscoped GitLab search for a Jira key finds nothing; scope it to the FE repo.
- **Using the backend MR's pipeline.** The URL host is served from the FE deployment. A BE NAME (`dashboard-api-…`) won't match the `review.adpinfra.dev` review host.
- **Picking an older pipeline.** Review stands are overwritten on every push — always use the latest pipeline.
- **Returning a URL without checking job status.** If `Deploy to review` is failed/manual, say so.
- **Inferring the target from `cwd` or the current branch.** Docs branches name docs tickets, not engineering tickets. Ask if no input is given.
- **Inventing a URL path.** Default to root (no trailing `/<path>`). Only add a page path if the user asked for one.

## Red flags — STOP and ask

- FE MR search returns multiple candidates with similar recency.
- `Deploy to review` is missing, failed, manual, or canceled.
- The `NAME:` line is absent from a successful trace (deploy script change).
- No FE MR exists for the input (e.g., BE-only ticket).
- Token verification fails (revoked, expired, wrong scope).
