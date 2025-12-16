---
title: "Integrate TikTok for Business with Adapty UA"
metadataTitle: "Using Adapty User Acquisition | Adapty Docs"
keywords: ['adapty ua', 'user acquisition']
---
import ZoomImage from '@site/src/components/ZoomImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';

Adapty UA’s TikTok for Business integration lets you track and optimize campaign performance in TikTok.

:::tip
See our [guide on setting up ads in TikTok for Business](tiktok-create-campaign.md).
:::

## Step 1. Connect your TikTok account

1. Go to **Integrations > TikTok Ads** from the left sidebar and click **Continue with TikTok**.

<ZoomImage id="ua-connect-tiktok.webp" width="700px" />

2. Sign in using your TikTok account and click **Continue**.

3. Review the requested permissions and click **Save**.

<ZoomImage id="ua-tiktok-sign.webp" width="500px" />

After that, all your ad accounts will be added to Adapty UA. You can proceed with adding campaigns.

## Step 2. Add campaigns

To add a TikTok for Business campaign to Adapty User Acquisition and track how your TikTok ads work in Adapty:

1. Switch to the **Web campaigns** tab and click **Create campaign**. Select the app and click **Save**.

<ZoomImage id="ua-new-campaign-tiktok.webp" width="500px" />

2. In the **General** tab, expand the **iOS** and/or **Android** section and paste App Store and/or Google Play application URLs.

<ZoomImage id="ua-url.gif" width="900px" />

3. Copy the **Click link** field value. Then, in TikTok Ads Manager, when creating your ad, paste this value in the **Tracking URL** field under the **Advanced Settings** section. This will allow Adapty to connect installs and purchases to ads in TikTok.

<ZoomImage id="ua-tiktok-lnk.webp" width="900px" />

4. (Optional) To send the conversion events back to TikTok, you can also associate your pixels from TikTok with campaigns in Adapty UA. To do that, select one of your existing pixels in the **Pixel** dropdown.

:::tip
You can also set additional link parameters to [work with deferred data](ua-deferred-data). For example, you can implement deferred deep linking.
:::

## Step 3. Map events

To send conversion events back to TikTok for campaign optimization, you need to configure event mapping in the **Events names** section. This allows Adapty to automatically send subscription events to your TikTok pixel when users perform actions in your app.

In the **Events names** section, toggle on the events you want to track in TikTok Ads Manager. For each enabled event, select the corresponding TikTok event from the dropdown or set a custom one. By default, Adapty maps Adapty events to TikTok's standard events.

Click **Save** to apply your event mapping configuration.

<ZoomImage id="ua-meta-events.webp" width="900px" />

## Additional configuration

### Additional parameters

The **Additional parameter** field allows you to add custom data points for analysis outside Adapty. This is useful when you need to pass specific campaign or user data to external analytics tools or attribution partners.

In the **Additional parameter** field, enter any custom data you want to include with your attribution tracking. The additional parameter will be included in all attribution data sent to TikTok and can be used for advanced campaign analysis and optimization.

For example, if you're running multiple variations of the same campaign, you could add `variant=A` or `variant=B` to distinguish between different creative approaches.

:::important
Additional parameters change the **Click link** you paste in TikTok Ads Manager. If you have already copied this link there and added a custom parameter later, ensure you copy and paste an updated click link that contains the custom parameter.
:::

<br/>

<ZoomImage id="ua-custom.webp" width="900px" />


### Attribution settings

Attribution settings control how Adapty matches user actions to your TikTok Ads campaigns. These settings determine the time windows for both deterministic and probabilistic attribution matching.

To configure attribution settings, go to the **Attribution Settings** tab in your campaign configuration. Here you'll find two main settings to adjust:

- **Deterministic matching window**: This uses exact device identifiers (like IDFA on iOS or Advertising ID on Android) to match users to campaigns with high precision. Set this to 168 hours (7 days) for maximum attribution accuracy - this is the default and recommended value. When a user clicks your TikTok ad and installs your app within this window, Adapty can definitively attribute the install to that specific ad click using device identifiers.

- **Probabilistic matching window**: This uses statistical modeling and device fingerprinting to match users when deterministic matching isn't possible. Set this to 6 hours for most campaigns - this is the default and works well for most use cases. For campaigns with high click volumes, you can reduce this to 1-2 hours. For users who can't be matched deterministically (due to privacy settings or other factors), Adapty uses probabilistic matching within this shorter window.

Click **Save** to apply your attribution settings.

<ZoomImage id="ua-meta-attribution-settings.webp" width="900px" />
