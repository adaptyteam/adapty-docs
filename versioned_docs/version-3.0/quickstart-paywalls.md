---
title: "Add paywall to sell products"
description: "Create and design paywalls in Adapty, then add them to placements to show specific audiences targeted storefronts."
metadataTitle: "Add paywall to sell products | Adapty Docs"
---

import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


:::info
To proceed with this guide, make sure you’ve completed the [store integration](integrate-payments.md) and created at least one product as described in the previous [guide on adding products](quickstart-products.md).
:::

In Adapty, **paywalls are the only way to deliver products through your app**. This way you can easily track how different product sets perform across user groups and manage how products are visually presented.

To get the most out of Adapty, in this guide we'll create a paywall to sell the product you've added on the previous step.

How it works:
- **Paywall**: A paywall is a container for one or more products. It can contain a visual paywall created in the paywall builder, product information, or JSON configuration for use in your code. Learn more about [paywalls](paywalls.md).
- **Placement**: A placement is a specific point in your app where you show a paywall, onboarding flow, or A/B test. Placements let you target specific [audiences](audience.md) with your paywall. Learn more about [placements](placements.md).

:::note
Even if you don’t design a paywall with Adapty, you still need to proceed with this guide and create one. This way, you can place your products into it and track monetization analytics.
:::

## 1. Build paywall

Creating a paywall takes just a few clicks:

1. Go to [**Paywalls**](https://app.adapty.io/paywalls) in the Adapty main menu.
2. Click **Create paywall**.
3. Enter a **Paywall name**. It's an internal identifier in the Adapty Dashboard.
4. Click **Add product** and pick the products to display on the paywall.
5. Click **Create as a draft**.

<Zoom>
  <img src={require('./img/quickstart-paywall.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Design paywall

The easiest way to design a paywall is to create one with the Adapty no-code builder, which requires no design or coding skills. You can choose from a wide array of professionally designed templates or build a fully custom paywall tailored to your app.

:::note
If you don't want to use the paywall builder, you can implement paywalls manually using [remote config](customize-paywall-with-remote-config.md) with custom JSON payloads. Learn more about <InlineTooltip tooltip="implementing paywalls manually">Follow the guide for your platform: [iOS](ios-implement-paywalls-manually.md), [Android](android-implement-paywalls-manually.md), [React Native](react-native-implement-paywalls-manually.md), [Flutter](flutter-implement-paywalls-manually.md), [Unity](unity-implement-paywalls-manually.md).</InlineTooltip>.
:::

:::tip
If your app is published on the App Store, you can create a unique, high-converting paywall tailored to your app in just seconds. Use the AI generator in the **Builder & Generator** tab.
:::

<Zoom>
  <img src={require('./img/design-paywall-templates.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Let's design your first paywall. You can craft engaging paywalls with ease:

1. Open **Builder & Generator** on the paywall page.
2. Click **Build no-code paywall**.
3. Choose a template and confirm your choice.
4. Add and customize elements as needed.
5. Click **Save**.

To learn more, go to the detailed article on [Paywall builder](adapty-paywall-builder.md#paywall-elements).


## 2. Add paywall to placement

Now you need to create a <InlineTooltip tooltip="placement">A placement is a specific point in your app where you show a paywall, onboarding flow, or A/B test. Placements let you target specific [audiences](audience.md) with your paywall. Learn more about [placements](placements.md).</InlineTooltip> with the paywall you just created. 

Let's start with the most essential one - the onboarding placement. Later, you can add more [meaningful placements](choose-meaningful-placements.md) throughout the user journey.

1. Go to [**Placements**](https://app.adapty.io/placements/paywalls) in the Adapty main menu.
2. Click **Create placement**.
3. Enter a **Placement name** (e.g., `main` or `onboarding`). It's an internal identifier in the Adapty Dashboard.
4. Enter a **Placement ID**. You’ll use this ID in the Adapty SDK to load the placement’s paywall.
5. Click **Run Paywall** and choose the paywall you want to show.
6. Click **Save & publish**.

In your app code you hardcode only the placement IDs. Everything else is configured in the Adapty Dashboard and can be changed anytime without an app update.

:::tip
Adapty gives you flexibility to show different paywalls to various user groups and analyze performance. Learn more about [audiences](audience.md) and [A/B tests](ab-tests.md).
:::


<Zoom>
  <img src={require('./img/add-placement.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


## Next steps

After linking your paywall to a placement in Adapty, the next step is to display it on a device. Let’s move on to [integrating the Adapty SDK](quickstart-sdk.md) into your app.