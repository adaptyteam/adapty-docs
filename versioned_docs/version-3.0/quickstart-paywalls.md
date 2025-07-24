---
title: "Set up paywalls"
description: "Create and design paywalls in Adapty, then add them to placements to show specific audiences targeted storefronts."
metadataTitle: "Integrate with stores or web payments and set up products | Adapty Docs"
---

import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


:::info
To proceed with this quickstart, you need to have at least one product created. Ensure you've created one in the previous [quickstart on adding products](quickstart-products.md).
:::



With Adapty, you can handle purchases with paywalls in just a few clicks. To show a particular paywall to a specific audience, attach it to a placement.

Here are more details:
- **Paywall**: An in-app storefront where customers browse and buy. A paywall automates purchase handling and rendering. Learn more about [paywalls](paywalls.md).
- **Placement**: A point in the user journey where a paywall appears. A placement lets you show paywalls to the right audience and analyze their performance. Learn more about [placements](placements.md).

Let's create a paywall and add it to a placement, just in a couple of minutes.

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

In this quickstart, we'll use the easier Paywall builder.

1. Open **Builder & Generator** on the paywall page.
2. Click **Build no-code paywall**.
3. Choose a template and confirm your choice.
4. Add and customize elements as needed. Learn more about the [Paywall builder](adapty-paywall-builder.md#paywall-elements).
5. Click **Save**.

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

That’s enough to continue the Adapty onboarding, but you may also find these tips useful:

- **Managing products**: Go to **Footer > Products** from the left builder pane.
  - **Product price**: Select a product and edit its price in the text fields. Learn how [tag variables](paywall-builder-tag-variables.md) help you describe product info and support multiple locales.

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

- **Purchase button**: Go to **Add element > Purchase Button**. The [purchase button eliminates any purchase handling in code](paywall-buttons.md#purchase-buttons).

<Zoom>
  <img src={require('./img/purchase-button.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

- **Close button**: In **Layout settings**, enable **Top button** and set its action to **Close**.

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

:::note
You can [design paywalls with remote config](customize-paywall-with-remote-config.md) to tailor your paywalls precisely with custom JSON payloads.
:::

## 2. Add paywall to placement

Now you need to create a placement with the paywall you've just added:
1. Go to [**Paywalls**](https://app.adapty.io/placements/paywalls) in the Adapty main menu.
2. Click **Create placement**.
3. Enter a **Placement name**. It's an internal identifier in the Adapty Dashboard.
4. Enter a **Placement ID**. You’ll use this ID in the Adapty SDK to load the placement’s paywall.
5. Click **Run Paywall** and choose the paywall you want to show.
6. Click **Save & publish**.

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