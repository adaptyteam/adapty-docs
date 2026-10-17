# 10 Banned words and constructions

**Applies when:** always.
**Requires:** no banned word or construction. The linters hold the full list and suggest each
replacement: `tools/lint-text.sh` for text in the chat, Loop step 0 for a file. Their hits are
candidates for this check. Personal rules go in `tools/extra-rules.mjs`, never in the shared linter;
changes to either need the user's approval.
**Evidence:** each hit and its replacement.

No linter settles the following, so check them yourself:

- Avoidable gerunds; a table cell that starts with a gerund.
- "only" anywhere but right before the verb.
