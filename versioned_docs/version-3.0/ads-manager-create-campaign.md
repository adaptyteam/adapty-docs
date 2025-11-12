---
title: "Manage campaigns in Apple Ads Manager"
description: "Create and edit Apple Ads campaigns in Apple Ads Manager."
metadataTitle: "Manage campaigns Apple Ads Manager | Adapty Docs"
keywords: ['apple ads', 'asa']
---
import ZoomImage from '@site/src/components/ZoomImage';

Apple Ads Manager has a two-side integration with Apple Ads, so you can both get near real-time campaign updates from it and make changes to your campaigns right from the Apple Ads Manager dashboard.

In addition to [exploring comprehensive campaign metrics](adapty-ads-manager-analytics.md), you can manage all the campaign settings:
- Create campaigns
- Edit existing campaigns
- Launch & pause campaigns

## What is campaign

A campaign focuses on a single app and runs ads in one placement on the App Store. Each campaign includes a daily budget and [ad groups](ads-manager-create-ad-group.md) that focus on a specific strategy for promoting your app. A campaign will continue to spend based on its budget settings.

:::important
Note that a campaign can’t run on its own; ad groups are the level where you set bids, audience, and keywords. Without an ad group, a campaign has no targeting or bidding and won’t serve. Create the campaign, then [add at least one ad group](ads-manager-create-ad-group.md) to activate it.
:::

## Create campaigns

To create a new Apple Ads campaign:

1. Go to **Ads Manager** from the sidebar menu. On any tab, click **+** above the table and select **Create campaign**.

<ZoomImage id="create-campaign.webp" width="900px" />

2. Select an app you want to launch the campaign for.
3. Select a campaign group for the campaign. 
4. Configure the campaign settings:
   - **Campaign name**: The label you assign to identify and search for your campaign in the dashboard.
   - **Ad placement**: The specific App Store surface where your ads appear
     - **Search tab**: Promotes your app at the top of the suggested apps list when users visit the Search tab in the App Store.
     - **Search results**: Promotes your app at the top of results when users search for relevant apps in the App Store.
     - **Product pages**: Shows your ad at the top of the **You might also like** list for users who have scrolled down relevant product pages.
   - **Countries or regions**: The geographic locations where your campaign is eligible to serve and spend budget. Note that you won't be able to change it later.
   - **Daily budget**: The maximum amount your campaign can spend per day before pausing delivery.
   - **Ad scheduling**: The ad start date and time. Optionally, you can also set the end date and time.
     <ZoomImage id="campaign-group.webp" width="700px" />

5. Click **Create**.
6. Proceed with [creating an ad group](ads-manager-create-ad-group.md) to make the campaign active.

## Edit campaigns

To edit any created campaign:

1. Go to **Ads Manager > Campaigns** and click the campaign name.
   <ZoomImage id="click-campaign.webp" width="700px" />
2. On the campaign page, click **Edit campaign** and adjust its settings. Note that you can edit only name, countries, and daily budget. If you want to change the ad placement or scheduling, create a new campaign instead.
   <ZoomImage id="edit-campaign.webp" width="700px" />
3. Click **Save changes**.

:::note
Edits to a campaign made directly in Apple Ads sync automatically to Apple Ads Manager, but may take time to show in Apple Ads Manager.
:::

## Launch & pause campaigns

To launch or pause any campaign from Apple Ads Manager:

1. Go to **Ads Manager > Campaigns**.
2. Switch the toggle on or off next to the campaign name in the **Status** column.

    <ZoomImage id="launch-pause.webp" width="700px" />


