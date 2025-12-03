---
title: "Integrate Meta Ads with Adapty UA"
metadataTitle: "Using Adapty User Acquisition | Adapty Docs"
keywords: ['adapty ua', 'user acquisition']
---
import ZoomImage from '@site/src/components/ZoomImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';

Adapty UA’s Meta integration lets you track and optimize campaign performance across Facebook, Instagram, Messenger, and Audience Network.

:::tip
See our [guide on setting up ads in Meta Ads Manager](meta-create-campaign.md).
:::

## Step 1. Connect your Facebook account

:::important
Ensure your Facebook account has access to campaigns and pixels you need.
:::

1. Go to **Integrations > Meta** from the left sidebar and click **Continue with Facebook**.

<ZoomImage id="ua-connect-meta.webp" width="700px" />

2. Sign in using your Facebook account and click **Continue**.

<ZoomImage id="ua-fb-sign.webp" width="500px" />

3. Review the requested permissions and click **Save**.

After that, all your companies will be added to Adapty UA. You can proceed with adding campaigns.

## Step 2. Add campaigns

To add a Meta campaign to Adapty User Acquisition and track how your Meta ads work in Adapty:

1. Switch to the **Web campaigns** tab and click **Create campaign**. Select the app and click **Save**.

<ZoomImage id="ua-new-campaign.webp" width="500px" />

2. In the **General** tab, paste your App Store and/or Google Play application URLs.

<ZoomImage id="ua-url.webp" width="900px" />

3. Copy the **Click link** field value. Then, in Meta Ads Manager, open your ad and paste this link. This will allow Adapty to connect installs and purchases to ads in Meta.

<ZoomImage id="ua-lnk.webp" width="900px" />

4. To send the conversion events back to Meta, you can also associate your pixels from Meta with campaigns in Adapty UA. To do that, select one of your existing pixels in the **Pixel** dropdown.

:::tip
You can also set additional link parameters to [work with deferred data](ua-deferred-data). For example, you can implement deferred deep linking.
:::

## Step 3. Map events

To send conversion events back to Meta for campaign optimization, you need to configure event mapping in the **Events names** section. This allows Adapty to automatically send subscription events to your Meta pixel when users perform actions in your app.

In the **Events names** section, toggle on the events you want to track in Meta Ads Manager. For each enabled event, select the corresponding Meta event from the dropdown or set a custom one. By default, Adapty maps Adapty events to Meta's standard events.

Click **Save** to apply your event mapping configuration.

<ZoomImage id="ua-meta-events.webp" width="900px" />

## Additional configuration

### Additional parameters

The **Additional parameter** field allows you to add custom data points for analysis outside Adapty. This is useful when you need to pass specific campaign or user data to external analytics tools or attribution partners.

In the **Additional parameter** field, enter any custom data you want to include with your attribution tracking. The additional parameter will be included in all attribution data sent to Meta and can be used for advanced campaign analysis and optimization.

For example, if you're running multiple variations of the same campaign, you could add `variant=A` or `variant=B` to distinguish between different creative approaches.

:::important
Additional parameters change the **Click link** you paste in Meta Ads Manager. If you have already copied this link there and added a custom parameter late, ensure you copy and paste an updated click link that contains the custom parameter.
:::

<br/>

<ZoomImage id="ua-custom-tiktok.webp" width="900px" />


### Attribution settings

Attribution settings control how Adapty matches user actions to your Meta Ads campaigns. These settings determine the time windows for both deterministic and probabilistic attribution matching.

To configure attribution settings, go to the **Attribution Settings** tab in your campaign configuration. Here you'll find two main settings to adjust:

- **Deterministic matching window**: This uses exact device identifiers (like IDFA on iOS or Advertising ID on Android) to match users to campaigns with high precision. Set this to 168 hours (7 days) for maximum attribution accuracy - this is the default and recommended value. When a user clicks your Meta ad and installs your app within this window, Adapty can definitively attribute the install to that specific ad click using device identifiers.

- **Probabilistic matching window**: This uses statistical modeling and device fingerprinting to match users when deterministic matching isn't possible. Set this to 6 hours for most campaigns - this is the default and works well for most use cases. For campaigns with high click volumes, you can reduce this to 1-2 hours. For users who can't be matched deterministically (due to privacy settings or other factors), Adapty uses probabilistic matching within this shorter window.

Click **Save** to apply your attribution settings.

<ZoomImage id="ua-meta-attribution-settings.webp" width="900px" />

