# Feedback Example

Annotated example of a complete product-manager review output.

---

## Persona Usage Analysis

**Developer perspective:**
A developer comes here to configure Small Business Program rates after being approved by Apple. They need to:
1. Understand why this affects Adapty (not just Apple)
2. Know which settings to change in Adapty Dashboard
3. Verify it's working correctly

**Current structure works well for:** Step 2 (configuration instructions are clear)

**Current structure fails for:**
- Step 1: Value/impact buried — developer might skip this thinking it's only about Apple enrollment
- Step 3: No verification step — developer can't confirm they configured it correctly

**PM perspective:**
A PM comes here because finance asked why revenue numbers changed after joining the program. They need to:
1. Understand how Small Business Program affects Adapty analytics
2. Verify their app is configured correctly
3. Know what data was affected historically

**Current structure fails for:** All three needs. Article assumes PM knows they need to configure this. Doesn't explain analytics impact clearly.

---

## Critical Product Issues

**Lines 16–22: Out-of-scope content confuses purpose**

Current: [Long section explaining how to enroll in Apple's Small Business Program]

Problem: This article is about configuring Adapty after you've enrolled with Apple, not about enrolling with Apple itself. Including Apple's enrollment process makes readers think this doc is about applying to the program, when it's actually about telling Adapty you're enrolled.

Fix needed: Focus on Adapty configuration. Add brief "Already enrolled?" check at the top with link to Apple's site for those who haven't enrolled yet.

---

**Line 28: Unclear terminology not used elsewhere**

Current: "...assigned to each individual app based on the developer's representation of multiple apps..."

Validation:
- Searched "developer's representation" across all docs: 0 matches
- Checked `app-settings.mdx`: uses "each app in your account"
- Checked multi-app documentation: uses "separate configuration per app"

Problem: This introduces terminology that doesn't exist elsewhere in Adapty docs. The concept (per-app configuration) is described consistently elsewhere with clearer language.

Fix needed: Use consistent terminology: "each app in your account" or "per-app configuration"

---

## Important Improvements

**Missing: Impact explanation for each persona**

Current article explains WHAT to configure but not WHY it matters to each persona:
- Developers: integrations will receive wrong proceeds data
- PMs: analytics charts will show incorrect revenue
- Finance: reports will be wrong for commission calculations

Recommendation: Add impact section early that explains consequences per role.

---

**Structure issue: Warning about historical data appears twice**

Lines 30–32 and 51–52 repeat the same critical warning about past dates. Suggests:
1. Content was copy-pasted during editing (maintenance issue)
2. Warning importance isn't signaled clearly enough

Recommendation: Single prominent callout placed before configuration steps.

---

## Example of Concept Validation

**Line 45: Claims access levels are tied to subscription groups**

Current: "Access levels correspond to your App Store subscription groups"

Validation performed:
- Read `access-level.mdx`: states "Access levels are independent of store configuration"
- Read `ios-checking-subscription-status.mdx`: shows checking access levels separate from store products
- Grep "subscription group" + "access level": 3 docs explicitly state they're separate concepts

Finding: This contradicts established documentation. Access levels are Adapty's feature entitlement system, separate from App Store subscription groups.

Evidence: `access-level.mdx` line 23 states: "Access levels define what features users can access in your app. They are not the same as App Store subscription groups or Google Play subscription groups."
