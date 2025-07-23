---
title: "Design paywalls with new Paywall Builder"
description: "Master Adapty's Paywall Builder to create high-converting in-app subscription offers."
metadataTitle: "Using Adapty Paywall Builder | Adapty Docs"
keywords: ['paywall', 'paywall builder']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

We're excited to introduce our **New Paywall Builder**, compatible with Adapty SDK v3.0 and later! 

This advanced no-code tool makes creating custom paywalls more intuitive and powerful than ever. You can craft beautiful, engaging paywalls with ease—no technical or design expertise required!

## Key Features of the New Paywall Builder

- **Expanded Template Selection**: Choose from a wide array of professionally designed templates to kickstart your paywall creation. These templates offer various styles and layouts to meet different needs and preferences.
- **Enhanced Flexibility**: Enjoy greater flexibility with the ability to use design layers and new elements like carousels, cards, product lists, and footers. These enhancements give you the creative freedom to build any type of paywall you envision.
- **Revamped Existing Elements**: Existing elements have been significantly improved, offering more options and capabilities to bring your paywall ideas to life.

:::warning
This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Design paywalls with legacy Paywall Builder](adapty-paywall-builder-legacy).
:::

## Structure of a paywall

In the new Adapty Paywall Builder, a paywall is composed of the following:

- [**Layout**](https://docs.adapty.io/v3.0/docs/paywall-layout-and-products): This is the foundational layer of the paywall, setting the background color and defining how products are displayed and top buttons positioned.
- [**Hero Image**](paywall-head-picture): The main picture of the paywall.
- **Main Area**: Here, you can place various elements like a product block, carousels, images, cards, texts, buttons, and lists.
- **Footer**: Similar to the main area, but it's a container that always sticks to the bottom of the paywall on top of the main area. You can add as many elements as needed, and they will be arranged from top to bottom inside the footer in the same order shown in the left pane.
- [**Elements**](adapty-paywall-builder#paywall-elements): The building blocks placed in the main area or footer to create your paywall. They are stacked in the order they appear in the left pane, from top to bottom. You can nest elements within each other, combine them into cards, or display them in a carousel.

## How to start designing a paywall with new Paywall Builder

:::warning
The new Paywall Builder is available for iOS and Android only and requires Adapty SDK v3.0 or later. Please make sure you've [upgraded to Adapty SDK v3.0 or later](migration-to-adapty-sdk-v3) for your new paywalls to function properly!
:::

To use the Adapty Paywall Builder:

1. Open the [**Paywalls**](https://app.adapty.io/paywalls) section in the Adapty main menu.

2. Open an existing paywall or [create a new one](create-paywall.md).

3. Go to the **Builder & Generator** tab.

4. Add products to the paywall if you haven't yet. Otherwise, click **Build no-code paywall**.

5. Select a template and click **Choose**. 

6. Click **Choose** to confirm your choice.

7. [Add](#paywall-elements) and [customize](#customization-options) paywall elements.

:::important
For the paywall to be displayed, you must switch on the **Show on device** toggle in the Paywall Builder.
:::

<Zoom>
  <img src={require('./img/design-paywall.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## How to migrate your paywalls

Currently, two versions of the Paywall Builder work in parallel in Adapty:

- **New version**: Located in the **Builder & Generator** tab of the Paywall functionality in the Adapty Dashboard. This is the most recent and flexible version that provides many design features to build your perfect paywalls.

:::note  
Paywalls designed with this version require Adapty SDK v3.0 or later.
:::

- **Legacy version**: Located in the **Legacy Builder** tab of the Paywall functionality in the Adapty Dashboard. This version is outdated and should only be used to support app versions with installed SDK below v.3.х.х. We don't recommend using it for new paywalls as it will be deprecated soon.

The migration of a paywall from the legacy Paywall Builder to the new one means that a new version of your paywall will be created in the **Builder & Generator** tab. 

This version can be edited with the new Paywall Builder and will be displayed in apps with installed Adapty SDK v3.0 or later. See [Migration guide to Adapty SDK v.3.x](migration-to-adapty-sdk-v3) and [Migration guide to Adapty SDK v.3.3.x](migration-to-330) for detailed reference on upgrading to Adapty SDK.

The existing version of your paywall will stay in the Legacy Builder tab. You can continue adjusting it with the legacy Paywall Builder and it will be displayed in apps with installed Adapty SDK version 2.x or earlier.

You will have paywalls in both Paywall Builder formats in parallel and separately until you need them. Changes made to the paywall configuration for one version will not affect the configuration built for another one.

To migrate a paywall to the new Paywall Builder:

1. Open the paywall you want to migrate.
2. Open the **Builder & Generator** tab.
3. Click **Migrate paywall**.
   
<Zoom>
   <img src={require('./img/migrate-paywall.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
</Zoom>

4. After the migration is done, review the result and make sure the paywall looks as it should. If not, correct it.
5. Click the **Save** button. 
6. If there are any issues, they will be highlighted in red and you will see them immediately. Fix them and save the paywall again.

<Zoom>
  <img src={require('./img/migration-issues.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

You can migrate your paywalls one by one so you can review and fix them if necessary.

## Paywall elements

The elements you add to your paywall appear in the left pane of the Paywall window. Their order in this pane reflects their order on the paywall.

**Paywall elements** in Adapty are categorized as simple or compound:

- **Simple Elements**: These are individual items that cannot contain other elements. Examples include text, images, and buttons.

<Zoom>
  <img src={require('./img/simple-elements.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

- **Compound Elements**: These can contain other elements or have their own structure. Examples include:
  - [Product lists](paywall-product-block) with products
  - [Carousels](paywall-carousel) with child elements
  - [Cards](paywall-card) with child elements
  - Lists with list items
  - Link blocks with links inside

<Zoom>
  <img src={require('./img/compound-elements.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

**Enhancements** you can add include:

1. [Predefined tag variables for product info](paywall-builder-tag-variables)
2. [Custom tags](custom-tags-in-paywall-builder)
3. [Custom fonts](using-custom-fonts-in-paywall-builder)
4. [Localization](add-paywall-locale-in-adapty-paywall-builder)

Once configured, you can [add paywalls to placements](add-audience-paywall-ab-test) to display them in your mobile app. For more details on displaying paywalls, see the platform-specific articles:
- [iOS](ios-quickstart-paywalls.md)
- [Android](android-quickstart-paywalls.md)
- [Flutter](flutter-quickstart-paywalls.md)
- [React Native](react-native-quickstart-paywalls.md)
- [Unity](unity-quickstart-paywalls.md)

## Customization Options

You can set up each element flexibly:

- **Style** tab: Adjust the element's size, appearance, background color or image, frame, and transparency. Additional options like page control and slideshow settings are available for certain elements, such as carousels.
- **Layout** tab: Set the element's position and its child elements' positions using offset (moving an element without changing its size or the parent's size) or padding (moving the element with possible resizing of the parent to fit the child's size and position).
- **Contents** tab: Configure the content of compound elements.

## We Value Your Feedback

Your feedback is invaluable to us. If you encounter any issues or have suggestions for improvements, please reach out to us. We're here to support you and enhance your experience with the new Paywall Builder.

📧 **Contact Us**: [Adapty Support](mailto:support@adapty.io)

Enjoy building with the new Paywall Builder, and take your monetization strategy to the next level with our enhanced tools and features!
