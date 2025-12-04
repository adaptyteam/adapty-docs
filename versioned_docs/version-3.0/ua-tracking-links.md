---
title: "Tracking links in Adapty User Acquisition"
description: "Track your campaigns and measure their success anywhere."
metadataTitle: "Tracking links in Adapty User Acquisition | Adapty Docs"
keywords: ['adapty ua', 'user acquisition', 'tracking link']
---
import ZoomImage from '@site/src/components/ZoomImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tracking links let you measure where your users come from and connect installs to ad campaigns.
When someone clicks your ad, Adapty records the click and later matches it with the install event sent by the SDK. This way, you can see which channels, campaigns, ad sets, and ads drive the most revenue on your [Analytics page](ua-analytics.md).

You can create two types of tracking links:

- **One link** — a universal link that automatically detects the user’s platform, records the click, and redirects them to the App Store or Google Play.

- **Store-specific links** — platform-targeted links that both record the click and automatically redirect users to the App Store or Google Play. You can also append deferred deep link parameters to them.

## Create tracking links

To create a tracking link:

1. In the Adapty UA dashboard, go to **Tracking links** from the sidebar menu. There, click **Create link**.

<ZoomImage id="new-tracking-link.webp" width="700px" />

2. Select your app from the list and click **Next**.

<ZoomImage id="ua-choose-app.webp" width="700px" />

3. Fill in the link parameters to match it with the campaign and ad you want to track. All the parameters are required.

| Parameter         | Description                                                                                   |
|-------------------|-----------------------------------------------------------------------------------------------|
| **Name**          | The internal tracking link name.                                                              |
| **Channel**       | The source of traffic, such as Meta, Reddit, or TikTok. Used to group campaigns in analytics. |
| **Campaign ID**   | The unique identifier of the campaign in your ad platform.                                    |
| **Campaign name** | The readable name of the campaign.                                                            |
| **Ad set ID**     | The unique identifier of the ad set (ad group) in your ad platform.                           |
| **Ad set name**   | The name of the ad set.                                                                       |
| **Ad ID**         | The unique identifier of the individual ad creative.                                          |
| **Ad name**       | The name of the ad creative or variation.                                                     |

4. By default, you are creating a One Link. It automatically detects the user’s platform and redirects them to the App Store or Google Play after tracking the click.

If you prefer to use separate redirect URLs for each platform, deselect the **One Link** checkbox and provide platform-specific store links manually.

<ZoomImage id="one-link.webp" width="700px" />

5. Click **Create**.
6. Open your tracking link page and copy the **Click link** from one of the sections:
   - **One link** – use this link to track clicks and automatically redirect users to the correct store.
   - **iOS link** or **Android link** — optional platform-specific versions if you want separate links for each store.

:::tip
You can also set additional link parameters to [work with deferred data](ua-deferred-data). For example, you can implement deferred deep linking.
:::

<ZoomImage id="click-link.webp" width="700px" />

7. Go to your ad platform and paste the link to your ad as an ad destination URL.

Now, app installations will be matched with the ads and campaigns they are coming from, so you can measure the campaign effectiveness on the **Analytics** page.
