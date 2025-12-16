---
title: "Get started with Adapty User Acquisition"
description: "Connect with Adapty User Acquisition to blend ad spending and subscription revenue and see the whole app economy in one place."
metadataTitle: "Connecting with Adapty User Acquisition | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZoomImage from '@site/src/components/ZoomImage';

User Acquisition helps you connect ad spend with subscription revenue, giving you a complete view of your app's economy in one place. 

This is a one-way integration — to see your revenue data in User Acquisition, you must first enable the integration in the Adapty dashboard. You don't need to pass any API keys, tokens, or identifiers. Just update and configure the Adapty SDK.

:::warning
User Acquisition is only available with:
- iOS, Android, and Flutter Adapty SDK version 3.9.0 or higher.
- React Native Adapty SDK version 3.10.0 or higher.
- Unity SDK version 3.12.0 or higher.
:::

## Before you start

To connect your revenue data with the campaign performance, let Adapty keep track of your purchases:

- If you **already have in-app purchases implemented with Adapty**, you don't need to do anything else at this stage.
- If you **don't have in-app purchases implemented yet and want to use Adapty**, complete the steps from the [quickstart guide](quickstart.md) to delegate handling purchases to Adapty.
- If you **already have in-app purchases implemented without Adapty** and don't plan to migrate to Adapty, install the Adapty SDK for your platform in the observer mode. At this stage you only need to add the SDK to your project, activate it with the observer mode enabled, and report transactions:
    - [iOS](implement-observer-mode.md)
    - [Android](implement-observer-mode-android.md)
    - [Flutter](implement-observer-mode-flutter.md)
    - [React Native](implement-observer-mode-react-native.md)
    - [Unity](implement-observer-mode-unity.md)
    - [Kotlin Multiplatform](implement-observer-mode-kmp.md)
    - [Capacitor (Beta)](implement-observer-mode-capacitor.md)

This way:
- When users install your app, the Adapty SDK gets the installation details from the link parameters, so Adapty UA can get the campaign details
- The Adapty SDK knows about all revenue-related events inside the app and can attribute them to web campaigns.

## Step 1. Enable the User Acquisition integration

To start sending revenue events to Adapty UA:
1. Go to [Integrations > Adapty](https://app.adapty.io/integrations/user-acquisition) in the Adapty Dashboard.
2. Turn on the toggle.

Once your events begin firing, you’ll see the following details for each event:
- Event name
- Status
- Environment
- Date time

<Zoom>
  <img src={require('./img/toggle-ua.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Supported events

By default, Adapty sends three groups of events to User Acquisition:
- Trials
- Subscriptions
- Issues

You can check the full list of supported events [here](events.md).

<Zoom>
  <img src={require('./img/events-ua.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 2. Connect your ad platform and add tracking links

Adapty uses tracking links to connect app installs with campaign data.
You must use a tracking link as the destination URL in every ad campaign you want to measure in Adapty UA.

If you run ads on multiple platforms, set up tracking links for each platform separately.

There are two ways Adapty works with ad platforms:

- **Native integrations (Meta Ads, TikTok Ads).** Adapty connects directly to the ad platform. Tracking links are generated automatically, and campaign parameters are filled dynamically based on where the link is used. You can use the same link across different campaigns, ad sets, or creatives, and Adapty will automatically receive the correct campaign data and ad spend.

- **Tracking links only (all other ad platforms).** Adapty does not connect to the ad platform. Tracking links are created manually, and all campaign parameters must be defined explicitly when creating the link. Ad spend data is not available for these platforms.

<Tabs>
<TabItem value="meta" label="Meta Ads" default>
To create a tracking link for Meta Ads:
1. Go to [Integrations > Meta](https://app.adapty.io/ua/integrations/facebook/accounts) in the Adapty UA Dashboard and click **Continue with Facebook**.

<ZoomImage id="ua-connect-meta.webp" width="700px" />
2. Sign in using your Facebook account and click **Continue**.

<ZoomImage id="ua-fb-sign.webp" width="500px" />

3. Review the requested permissions and click **Save**.
4. Switch to the **Web campaigns** tab and click **Create campaign**. Select the app and click **Save**.

<ZoomImage id="ua-new-campaign.webp" width="500px" />

5. In the **General** tab, paste your App Store and/or Google Play application URLs.

<ZoomImage id="ua-url.webp" width="900px" />

6. Copy the **Click link** field value for **one link** or for platform-specific link. Then, in Meta Ads Manager, open your ad and paste this link as a destination URL.

:::important
In the **Website URL** field, paste `https://api-ua.adapty.io/api/v1/attribution/click`. Paste the rest of the link to the **URL parameters** field in the **Tracking** section. It will help your Meta ad to get approved. See more [recommendations on setting up your ads in Meta Ads Manager](meta-create-campaign.md).
:::

7. Now, when you launch your ad in Meta Ads, its data will become available for analysis in the Adapty UA dashboard.
</TabItem>
<TabItem value="tiktok" label="TikTok for Business">
To create a tracking link for TikTok for Business:
1. Go to [Integrations > TikTok Ads](https://app.adapty.io/ua/integrations/tiktok/accounts) in the Adapty UA Dashboard and click **Continue with TikTok**.
   <ZoomImage id="ua-connect-tiktok.webp" width="700px" />
2. Sign in using your TikTok account and click **Continue**.

3. Review the requested permissions and click **Save**.

    <ZoomImage id="ua-tiktok-sign.webp" width="500px" />
4. Switch to the **Web campaigns** tab and click **Create campaign**. Select the app and click **Save**.

    <ZoomImage id="ua-new-campaign-tiktok.webp" width="500px" />

5. In the **General** tab, paste your App Store and/or Google Play application URLs.

    <ZoomImage id="ua-url.webp" width="900px" />

6. Copy the **Click link** field value for **one link** or for platform-specific link. Then, in TikTok Ads Manager, when creating your ad, paste this value in the **Tracking URL** field under the **Advanced Settings** section. This will allow Adapty to connect installs and purchases to ads in TikTok. See the [guide on setting up your campaign in TikTok Ads](tiktok-create-campaign.md).

    <ZoomImage id="ua-tiktok-lnk.webp" width="900px" />
7. Now, when you launch your ad in TikTok for Business, its data will become available for analysis in the Adapty UA dashboard.

</TabItem>
<TabItem value="others" label="Other ad platforms">
To create a tracking link for other ad platforms:

1. In the Adapty UA dashboard, go to **Tracking links** from the sidebar menu. There, click **Create link**.

    <ZoomImage id="new-tracking-link.webp" width="700px" />

2. Select your app from the list and click **Next**.

    <ZoomImage id="ua-choose-app.webp" width="700px" />

3. Fill in the link parameters to match it with the campaign and ad you want to track.
4. By default, you are creating a One Link. It automatically detects the user’s platform and redirects them to the App Store or Google Play after tracking the click.

    If you prefer to use separate redirect URLs for each platform, deselect the **One Link** checkbox and provide platform-specific store links manually.

    <ZoomImage id="one-link.webp" width="700px" />

5. Click **Create**.
6. Open your tracking link page and copy the **Click link** from one of the sections:
    - **One link** – use this link to track clicks and automatically redirect users to the correct store.
    - **iOS link** or **Android link** — optional platform-specific versions if you want separate links for each store.
7. Go to your ad platform and paste the link to your ad as an ad destination URL.

</TabItem>
</Tabs>

## Step 3. Launch your web-to-app campaign and view results

Once your campaign is live and users start installing your app, Adapty begins attributing installs and revenue to your campaigns.

In the [Adapty UA analytics dashboard](ua-analytics.md), you will see campaign-level metrics such as:
- Installs and conversions
- Subscription and purchase revenue
- Performance breakdown by ad platform, campaign, ad set, and creative

Metrics appear as soon as install and revenue events are received from your app. Ad spend data is available for platforms with native integrations.

## Learn more

Continue with in-depth documentation on Adapty User Acquisition analytics and practical guides for running campaigns on major ad platforms:

- [**Analytics in Adapty UA**](ua-analytics.md): See how to use the analytics dashboard effectively.
- [**Metrics in Adapty UA**](ua-metrics.md): Explore the metrics available for user acquisition analysis.
- [**Integrations**](ua-integrations.md): Review the ad platforms and integrations supported by Adapty UA.
- [**Launching ads in Meta Ads Manager**](meta-create-campaign.md): Understand how to set up and launch campaigns in Meta Ads Manager.
- [**Launching ads in TikTok for Business**](tiktok-create-campaign.md): Understand how to set up and launch campaigns in TikTok for Business.
