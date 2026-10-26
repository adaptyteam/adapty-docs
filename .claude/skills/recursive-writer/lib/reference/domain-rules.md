# Domain rules

**Applies when:** a deprecated feature; pricing or plans; release notes or whats-new; a code sample; MDX comments, commit messages, or PR text; a feature's availability or rollout; account roles; a third-party integration.
**Triggers:** ^\s*```|\{/\*|\b(deprecated|legacy|old Paywall Builder|pricing|plans?|release notes|what's new|beta|early access|feature flags?|flag-gated|limited availability|coming soon|rollout|rolling out|roles?|admins?|integrat\w*)\b
- **Deprecated features**: don't teach, sell, or link a deprecated path. Say "isn't recommended"
  firmly, scoped to new items; mention the legacy sense in one line; reassure that existing items keep
  working.
- **Pricing**: never mention Adapty's plans, tiers, quotas, prices, or plan-dependent features; never
  link Adapty's pricing page.
- **Public repo**: no internal Slack, Jira keys, customer names, or closed-source details in docs, MDX
  comments, commits, or PR text.
- **Scope**: edit release notes and whats-new only as their own task. Code samples are the developers'
  call: never add, drop, or merge them on the writer's authority.
- **Rollout state**: document a flag-gated or early-access feature as available. Never mention its
  flag, gating, beta, or limited availability. Research rollout only to decide whether and when to
  document the feature.
- **Account roles**: a task article assumes the reader has the role the task needs. No role
  prerequisites, role tables, or "only admins can" sentences, and no developer questions about role
  access. The article about roles owns their definitions.
- **Integrations**: present a third-party tool by what only it does (external channels, its own
  reports). Don't suggest it for what Adapty already does (in-app targeting, paywall A/B tests,
  subscription analytics).
