---
title: "Add paywall to enable purchases"
description: "Create and design paywalls in Adapty, then add them to placements to show specific audiences targeted storefronts."
metadataTitle: "Add paywall to enable purchases | Adapty Docs"
---

import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


:::info
To proceed with this quickstart, make sure you’ve completed the [store integration](integrate-payments.md) and created at least one product as described in the previous [quickstart on adding products](quickstart-products.md).
:::

The easiest way to enable in-app purchases with Adapty is to create a paywall in the builder. You only need to design it in the no-code builder, and Adapty will automatically handle all purchase-related logic.

To show a particular paywall to a specific audience, attach it to a placement.

How it works:
- **Paywall**: A paywall is a container for one or more products. It can contain a visual paywall created in the paywall builder, product information, or JSON configuration for use in your code. Learn more about [paywalls](paywalls.md).
- **Placement**: A placement is a rule for showing a paywall, onboarding, or A/B test at a certain point to a certain user group. One placement can contain several paywalls, so you can decide which users see which paywall. Learn more about [placements](placements.md).



:::note
You can also [design paywalls with remote config](customize-paywall-with-remote-config.md) to tailor your paywalls precisely with custom JSON payloads. Learn more about <InlineTooltip tooltip="implementing paywalls manually">Follow the guide for your platform: [iOS](ios-implement-paywalls-manually.md), [Android](android-implement-paywalls-manually.md), [React Native](react-native-implement-paywalls-manually.md), [Flutter](flutter-implement-paywalls-manually.md), [Unity](unity-implement-paywalls-manually.md).</InlineTooltip>.
:::

In this quickstart, let's create a paywall and add it to a placement in just a couple of minutes.

## 1. Build paywall

Creating a paywall takes just a few clicks:

1. Go to [**Paywalls**](https://app.adapty.io/paywalls) in the Adapty main menu.
2. Click **Create paywall**.
3. Enter a **Paywall name**. It's an internal identifier in the Adapty Dashboard.
4. Click **Add product** and pick the products to display on the paywall.
5. Click **Create as a draft**.

Stay on the page. You still need to design how the paywall looks.

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

You have two options: the no-code Paywall builder or Remote config.

In this quickstart, we'll use the easier Paywall builder:

1. Open **Builder & Generator** on the paywall page.
2. Click **Build no-code paywall**.
3. Choose a template and confirm your choice.
4. Add and customize elements as needed.
5. Click **Save**.

From here, you can:
- Add a [Hero image](paywall-head-picture.md) or [Hero video](paywall-video.md).
- Set up your [product list](paywall-product-block.md).
- Edit texts, and more. Learn details in the [Paywall builder article](adapty-paywall-builder.md#paywall-elements).

:::tip
If your app is published on the App Store, you can create a unique, high-converting paywall tailored to your app in just seconds. Use the AI generator in the **Builder & Generator** tab.
:::

<Zoom>
  <img src={require('./img/design-quickstart.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## 2. Enable purchases

To allow Adapty to automatically handle all purchase-related logic, you need to set up products and purchase flow for the paywall. You can do this in the Paywall builder from the previous step:

#### Manage products

In the left builder pane, go to **Footer > Products** to manage products or add new ones. 

Here you can select a product and edit its price in the text fields. Learn how [tag variables](paywall-builder-tag-variables.md) help you describe product info and support multiple locales.

<Zoom>
  <img src={require('./img/paywall-price.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

#### Purchase flow

For users to make a purchase, they'll need a purchase button. The [purchase button eliminates any purchase handling in code](paywall-buttons.md#purchase-buttons).

1. Go to **Layout settings > Purchase flow** and select the purchase logic:
- **Products as list + purchase button**: One product must be selected from the list, then the user taps the purchase button.
- **Products as purchase buttons**: Each product on the paywall is a separate purchase button. The user will purchase immediately by tapping the desired product.

<Zoom>
  <img src={require('./img/purchase-flow.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. If you selected the **Products as list + purchase button**, go to **Add element > Purchase Button** to add a button.

#### Paywall closure

You can set up paywall closure using a **Close button**. Go to **Layout settings**, enable **Top button** and set its action to **Close**.

<Zoom>
  <img src={require('./img/top-button.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## 3. Add paywall to placement

Now you need to create a placement with the paywall you just created:
1. Go to [**Paywalls**](https://app.adapty.io/placements/paywalls) in the Adapty main menu.
2. Click **Create placement**.
3. Enter a **Placement name**. It's an internal identifier in the Adapty Dashboard.
4. Enter a **Placement ID**. You’ll use this ID in the Adapty SDK to load the placement’s paywall.
5. Click **Run Paywall** and choose the paywall you want to show.
6. Click **Save & publish**.

:::tip
If you want to show different paywalls to various user groups and analyze performance, learn more about [audiences](audience.md) and [A/B tests](ab-tests.md).
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

After the paywall is linked to a placement, proceed to [integrate the Adapty SDK](quickstart-sdk.md) in your app.