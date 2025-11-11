---
title: "Manage ad groups in Apple Ads Manager"
description: "Create and edit Apple Ads ad groups in Apple Ads Manager."
metadataTitle: "Manage ad groups Apple Ads Manager | Adapty Docs"
keywords: ['apple ads', 'asa']
---
import ZoomImage from '@site/src/components/ZoomImage';

Apple Ads Manager has a two-side integration with Apple Ads, so you can both get near real-time campaign updates from it and make changes to your ad groups right from the Apple Ads Manager dashboard.

In addition to [exploring comprehensive campaign metrics](adapty-ads-manager-analytics.md), you can manage all the ad group settings:
- Create ad groups
- Edit existing ad groups
- Launch & pause ad groups

## What is ad group

An ad group belongs to a [campaign](ads-manager-create-campaign.md) and is where you configure the targeting and bidding strategy for your ads. Each ad group includes bid settings, audience targeting, and [keywords](ads-manager-manage-keywords.md) that determine when and to whom your ads are shown. Ad groups allow you to organize your advertising strategy within a campaign and test different targeting approaches.

:::important
Note that a campaign can't run without ad groups; ad groups are the level where you set bids, audience, and keywords. Without an ad group, a campaign has no targeting or bidding and won't serve. Create the campaign first, then [add at least one ad group](ads-manager-create-ad-group.md) to activate it.
:::

## Create ad groups

To create a new Apple Ads ad group:

1. Go to **Ads Manager** from the sidebar menu. On any tab, click **+** above the table, then select **Create ad group**.

<ZoomImage id="create-ad-group.webp" width="900px" />

2. Select the app you want to add the ad group to.
3. Select the campaign you want to add the ad group to.
4. Configure the ad group settings:
   - **Ad group name**: The label you assign to identify and search for your ad group in the dashboard.
   - **Default max CPT bid**: The maximum amount you're willing to pay for a tap on your ad. This bid applies to all keywords in the ad group unless you set individual keyword bids.
   - **CPA cap (limits impressions)** (Optional): This setting specifies the amount you're willing to spend for a tap-through conversion and will set a bid ceiling for all keywords in your ad group.

     Bid ceiling is calculated by multiplying CPA cap you provide by your tap-though conversion rate: `CPA Cap x CR (Tap-Through)`. If the keyword max CPT bid is lower than the result of the above equation, it'll be applied instead.

     For example, if your CPA cap is $5 and your tap-through conversion rate is 65%, the max bid applied for all keywords in the ad group would be $3.25. If the max CPT is set at $4, the max bid applied would still be $3.25.

   - **Search Match**: Toggle to automatically match your ad to relevant searches beyond your specified keywords. When enabled, Apple Ads may show your ad for searches related to your keywords.
   <ZoomImage id="new-ad-group.webp" width="700px" />
   - **Audience**: The targeting criteria that determines which users see your ads.
     - **All eligible users**: Shows your ads to all users eligible for your campaign.
     - **Specific audiences**: Target specific user segments by configuring:
       - **Devices**: Target iPad, iPhone, or both.
       - **Customer type**: Target all users, new users, or returning users.
       - **Gender**: Target by gender or all users.
       - **Age range**: Target specific age ranges or all users.
   - **Ad scheduling**: Optional. Set when your ads start running:
     - **Start date and time**: When your ad group should begin serving ads.
     - **End date**: Optional. When your ad group should stop serving ads.
   <ZoomImage id="ad-group-audience.webp" width="700px" />
5. Click **Create**.
6. Now, if your campaign placement type is Search results, you can [add keywords](ads-manager-manage-keywords.md) to start serving ads. Otherwise, you are all set!

## Edit ad groups

To edit any created ad group:

1. Go to **Ads Manager > Ad groups** and click the ad group name, or navigate to a campaign page and click the ad group name.
   <ZoomImage id="click-ad-group.webp" width="700px" />
2. On the ad group page, click **Edit ad group** and adjust its settings. You can edit all the settings, except for the app and campaign.
   <ZoomImage id="edit-ad-group.webp" width="700px" />
3. Click **Save changes**.

:::note
Edits to an ad group made directly in Apple Ads sync automatically to Apple Ads Manager, but may take time to show in Apple Ads Manager.
:::

## Launch & pause ad groups

To launch or pause any ad group from Apple Ads Manager:

1. Go to **Ads Manager > Ad groups**, or navigate to a campaign page to see its ad groups.
2. Switch the toggle on or off next to the ad group name in the **Status** column.

<ZoomImage id="toggle-ad-group.webp" width="700px" />
