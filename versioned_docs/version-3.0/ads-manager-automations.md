---
title: "Automations in Apple Ads Manager"
description: "Adjust bids automatically based on your campaign performance"
metadataTitle: "Apple Ads Manager | Adapty Docs"
keywords: ['Apple ads manager', 'asa']
---
import ZoomImage from '@site/src/components/ZoomImage';

Automation rules in Apple Ads Manager help you to automatically optimize your bids based on real-time performance data. Set your conditions once, and let the system handle bid adjustments for you—whether it's scaling profitable keywords, cutting losses on underperformers, or boosting visibility for promising keywords.

With automation rules, you can respond to performance changes instantly without manual intervention. Define rules based on metrics like spend, conversions, ROAS, impressions, and CPA, then schedule them to run at your preferred frequency. 

## Create rules

You can create automation rules either from templates or manually from scratch. 

### From templates

Adapty provides ready-to-use templates that cover common optimization scenarios. To create a rule from a template:

1. Go to **Automations** from the sidebar menu. Click **Templates**.
   <ZoomImage id="asa-rule-templates.webp" width="700px" />
2. Choose from the available templates and click **Next**.
   <ZoomImage id="asa-choose-template.webp" width="700px" />
3. Review and customize the pre-filled settings:
   - **Rule name**: Automatically populated with the template name and current date (e.g., "Boost Low-Visibility Keywords - [2025-11-12]")
   - **Apply to**: Select campaign groups, apps, campaigns, or ad groups where the rule should apply
   - **Conditions**: If needed, modify pre-configured conditions from the template 
   - **Action**: If needed, modify the pre-set bid increase rate 
   - **Schedule**: Set how often the rule should run
     <ZoomImage id="asa-templated-rule.webp" width="700px" />
4. Click **Save** to activate the rule.

### Manually

To create a custom rule from scratch:

1. Go to **Automations** from the sidebar menu and click **Create rule**.
   <ZoomImage id="asa-create-rule.webp" width="700px" />
2. Enter a descriptive **Rule name** to identify the rule's purpose.
3. In the **Apply to** section, select campaign groups, apps, campaigns, or ad groups where the rule should apply.
   <ZoomImage id="asa-rule-apply-to.gif" width="700px" />
4. Click **Add condition** to add criteria and select a [metric](adapty-ads-manager-metrics.md) from the list.
   <ZoomImage id="asa-conditions.webp" width="700px" />
5. Set the time period (e.g., Previous 3 days, Previous 7 days), choose the comparison operator, and enter the threshold value that would trigger the rule.

   <ZoomImage id="asa-condition.webp" width="700px" />
6. If needed, add more conditions with the **And** or **Or** operator. Click **Add condition** and select an operator on the left.
   <ZoomImage id="combine-conditions.gif" width="700px" />
7. Define the **Action**:
   - Choose the action type: **Increase by**, **Decrease by**, or **Set to**.
   - Select whether you want to adjust the bid by absolute or relative value by switching between **$** and **%**.
   - Optionally, toggle and enter **Upper bid limit** to set a maximum bid cap
   <ZoomImage id="asa-action.gif" width="700px" />

6. Set the **Schedule**:
   - Choose frequency: **Every day**, **Every 2 days**, **Every week**, etc.
   - Select the time (all times are shown in UTC)
   <ZoomImage id="asa-schedule.webp" width="700px" />

7. Click **Save** to create the rule.

## Explore logs

The **Logs** tab provides a complete history of all rule executions, helping you track performance and troubleshoot issues.

To view logs, go to **Automations** from the sidebar menu and switch to the **Logs** tab. Here, you can:
- Review the table with the following information:
   - **Rule name**: The name of the automation rule
   - **Created at**: Date and time when the rule ran
   - **Description**: Summary of the action taken, conditions applied, and targets (e.g., "Decrease bid by 25%, IF Spend (previous 3 days) > $20 AND Installs (previous 3 days) is 0, Applied to: Keywords in 3 campaigns")
   - **Status**: Execution status (Success, Ran with errors, Failed)

- Export detailed information about the rule execution as CSV by clicking the download icon next to it
- Filter the table entries by the rule name

Review logs regularly to ensure your rules are working as expected and to identify any errors that need attention.

If you don't see the latest updates, click **Refresh table** to force-pull them.

<ZoomImage id="asa-logs.webp" width="700px" />

## Launch & pause rules

To launch or pause a rule, toggle the switch next to it on or off in the **Status** column in the rule list.

This allows you to temporarily disable rules during specific campaign periods or while making adjustments without deleting the rule configuration.

<ZoomImage id="asa-rule-status.webp" width="700px" />

## Run rules right away

While rules run automatically on their schedule, you can manually trigger them immediately:

1. Click the three dots next to the rule.
2. Select **Run rule right now**.

The rule will execute immediately, applying the configured action to all matching keywords or campaigns. This is useful when you want to test a rule or respond quickly to performance changes.

<ZoomImage id="asa-run-rule-right-now.webp" width="700px" />

## Duplicate rules

Save time when creating similar rules by duplicating existing ones:

1. Click the three dots next to the rule.
2. Select **Duplicate**.
3. Edit the duplicated rule to adjust any settings as needed and click **Save**.

<ZoomImage id="asa-duplicate.webp" width="700px" />

## Delete rules

To remove a rule you no longer need:

1. Click the three dots next to the rule.
2. Select **Delete** and confirm deletion.

Note that deleting a rule is permanent. If you think you might need the rule later, consider pausing it instead.

<ZoomImage id="asa-delete.webp" width="700px" />
