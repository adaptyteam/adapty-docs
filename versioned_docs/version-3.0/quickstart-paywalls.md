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
To proceed with this quickstart, make sure you’ve completed the [store integration](integrate-payments.md) and created at least one product as described in the previous [quickstart on adding products](quickstart-products.md).
:::

Adapty gives you the flexibility for selling products by using paywalls. In this quickstart guide we'll create a paywall to sell the product you've added on the previous step.

How it works:
- **Paywall**: A paywall is a container for one or more products. It can contain a visual paywall created in the paywall builder, product information, or JSON configuration for use in your code. Learn more about [paywalls](paywalls.md).
- **Placement**: A placement is a specific point in your app where you show a paywall, onboarding flow, or A/B test. Placements let you target specific [audiences](audience.md) with your paywall. Learn more about [placements](placements.md).

:::note
If you don't want to design a paywall with Adapty, you still need to create one to put your products into.
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

The easiest way to design a paywall is to create one with the Adapty no-code builder, which requires no design or coding skills.

:::note
If you don't want to use the paywall builder, you can [design paywalls with remote config](customize-paywall-with-remote-config.md) to tailor your paywalls precisely with custom JSON payloads. Learn more about <InlineTooltip tooltip="implementing paywalls manually">Follow the guide for your platform: [iOS](ios-implement-paywalls-manually.md), [Android](android-implement-paywalls-manually.md), [React Native](react-native-implement-paywalls-manually.md), [Flutter](flutter-implement-paywalls-manually.md), [Unity](unity-implement-paywalls-manually.md).</InlineTooltip>.
:::

:::tip
If your app is published on the App Store, you can create a unique, high-converting paywall tailored to your app in just seconds. Use the AI generator in the **Builder & Generator** tab.
:::

Let's design your first paywall. You can craft engaging paywalls with ease:

1. Open **Builder & Generator** on the paywall page.
2. Click **Build no-code paywall**.
3. Choose a template and confirm your choice.
4. Add and customize elements as needed.
5. Click **Save**.

To learn more, go to the detailed article on [Paywall builder](adapty-paywall-builder.md#paywall-elements).


## 2. Add paywall to placement

Now you need to create a <InlineTooltip tooltip="placement">A placement is a specific point in your app where you show a paywall, onboarding flow, or A/B test. Placements let you target specific [audiences](audience.md) with your paywall. Learn more about [placements](placements.md).</InlineTooltip> with the paywall you just created:
1. Go to [**Paywalls**](https://app.adapty.io/placements/paywalls) in the Adapty main menu.
2. Click **Create placement**.
3. Enter a **Placement name**. It's an internal identifier in the Adapty Dashboard.
4. Enter a **Placement ID**. You’ll use this ID in the Adapty SDK to load the placement’s paywall.
5. Click **Run Paywall** and choose the paywall you want to show.
6. Click **Save & publish**.

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