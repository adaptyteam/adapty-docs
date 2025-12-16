---
title: "User Acquisition (Adapty UA)"
description: "Eliminate the need of MMPs and calculate the whole app economy in one place."
metadataTitle: "Using Adapty User Acquisition | Adapty Docs"
keywords: ['adapty ua', 'user acquisition']
---
import CustomDocCardList from '@site/src/components/CustomDocCardList';
import ZoomImage from '@site/src/components/ZoomImage';

<CustomDocCardList ids={['user-acquisition', 'ua-analytics', 'ua-integrations', 'ua-tracking-links', 'ua-deferred-data']} />

Adapty User Acquisition (Adapty UA) connects your ad spend with subscription revenue (in-app and web purchases) to give you complete user acquisition analytics. This helps you:

- Calculate ROAS (return on ad spend) across all your channels
- See your entire app economy in one place
- Get accurate attribution data for better decisions

:::tip
Want to learn more about the way Adapty User Acquisition might be useful to you? [Book a call](https://calendly.com/tnurutdinov-adapty/30min) with us.
:::

## Why Adapty UA?

Measuring user acquisition performance is challenging. Data is often scattered across platforms, attribution becomes difficult due to privacy changes, and building custom solutions takes significant time.

Adapty UA provides built-in attribution and unified analytics. You can focus on growing your app instead of managing data systems.

## How it works

Adapty User Acquisition attributes app installs and subscription revenue to ad campaigns by combining data from ad platforms, tracking links, and your app.

At a high level:
- Ad platforms provide campaign structure and ad spend
- Tracking links generated in Adapty UA carry campaign context
- The Adapty SDK sends install and revenue events from your app

<ZoomImage id="ua-flow.png" width="500px" />

The attribution flow works as follows:

1. **A tracking link is generated in Adapty UA and added to an ad campaign.** The link contains campaign parameters such as the platform, campaign, ad set, and creative. 

2. **A user clicks the ad and installs the app from the app store.** The user is redirected via the tracking link and installs the app from the App Store or Google Play.

3. **The app sends an install event to Adapty.** On first launch, the Adapty SDK sends an install event. Adapty extracts the campaign parameters associated with this install.

4. **The install is attributed to a campaign.** Using the campaign parameters from the tracking link, Adapty associates the install with the campaign that generated it.

5. **Ad spend and revenue are connected.** Adapty pulls ad spend data from supported ad platforms (currently – Meta Ads and TikTok for Business) and links subscription and purchase events to the attributed installs.

As a result, Adapty provides campaign-level metrics such as installs, revenue, LTV, and ROAS in a single dashboard.

:::tip
Tracking links can also include custom parameters, allowing your app to handle [deferred deep links](ua-deferred-data.md) and react to campaign data when processing the install event.
:::
