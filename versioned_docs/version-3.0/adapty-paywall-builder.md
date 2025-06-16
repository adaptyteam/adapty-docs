---
title: "Design paywalls with new Paywall Builder"
description: "Master Adapty's Paywall Builder to create high-converting in-app subscription offers."
metadataTitle: "Using Adapty Paywall Builder | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

We're excited to introduce our **New Paywall Builder**, compatible with Adapty SDK v3.0 and later! This advanced no-code tool makes creating custom paywalls more intuitive and powerful than ever, allowing you to craft beautiful, engaging paywalls with ease—no technical or design expertise required!

## Key features of the New Paywall Builder


- The builder itself is way more flexible now. You can layer different design elements and work with new components like carousels, card layouts, product grids, and custom footers. Basically, if you can think it up, you can probably build it.

- We also improved all the existing tools. They're more powerful and give you better control over the details, so you're not fighting with the interface to get things looking right.

- For apps published on the App Store, quickly create a unique, high-converting paywall tailored to your app using the built-in AI generator.
:::warning
This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Design paywalls with legacy Paywall Builder](adapty-paywall-builder-legacy).
:::

## Structure of a paywall

In the new Adapty Paywall Builder, a paywall is composed of the following:

- [**Layout**](https://docs.adapty.io/v3.0/docs/paywall-layout-and-products): This is the foundational layer of the paywall, setting the background color and defining how products are displayed and top buttons positioned.
- [**Hero Image**](paywall-head-picture): The main picture of the paywall.
- **Main Area**: Here, you can place various elements like a product block, carousels, images, cards, texts, buttons, and lists.
- **Footer**: Similar to the main area but it's a container that's always sticking to the bottom of the paywall on top of the main area. You can add as many elements as needed, and they will be arranged from top to bottom inside a footer in the same order shown in the left pane.
- [**Elements**](adapty-paywall-builder#paywall-elements): The building blocks placed in the main area or footer to create your paywall. They are stacked in the order they appear in the left pane, from top to bottom. You can nest elements within each other, combine them into cards, or display them in a carousel.

## How to start designing a paywall with new Paywall Builder

:::warning
The new Paywall Builder is available for iOS and Android only and requires Adapty SDK v3.0 or later. Please make sure you've [upgraded to Adapty SDK v3.0 or later](migration-to-adapty-sdk-v3) for your new paywalls to function properly!
:::

To use the Adapty Paywall Builder:

1. Open the [**Products and Paywalls**](https://app.adapty.io/paywalls) section in the Adapty main menu and click the **Paywall** tab to open it.

2. Click the **Builder** tab to open it.

3. Depending on whether you've added the products to the paywall in the **General** tab or not, Adapty will offer you to add products or build your paywall with the new Paywall Builder. We continue with the case when products are already added. Click the **Build no-code paywall** button to start designing your paywall.

4. In the **Choose a template** window, you’ll find a variety of professionally designed paywall templates, along with a [built-in AI generator](https://docs.adapty.io/docs/paywall-builder-templates#generate-paywalls-with-ai) to help you create one that best fits your needs. We have both templates that require a couple of minor adjustments like your logo to launch as well as well as templates with a minimal design that give full scope for your creativity. Choose the template that fits your design the most, or use the AI generator to create one automatically. 

   

<Zoom>
  <img src={require('./img/paywall-templates.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


6. By leveraging the Adapty Paywall Builder, you can create persuasive paywalls that seamlessly align with your app's branding and purpose based on the selected template.

:::important
For the paywall to be displayed, you must switch on the **Show on device** toggle in the Paywall Builder.
:::

## How to migrate your paywalls

Currently, in Adapty two versions of the Paywall Builder work in parallel:

- The new version is located in the **Builder** tab of the Paywall functionality in the Adapty Dashboard. That is the most recent and flexible version that provides you with many design features to build your perfect paywalls.  
  The paywalls designed with this Paywall Builder version require Adapty SDK v3.0 or later.
- The legacy version is located in the **Legacy Builder** tab of the Paywall functionality in the Adapty Dashboard. This version is outdated and should be used only to support app versions with installed SDK below v.3.х.х. We do not recommend using it for new paywalls as it will be deprecated soon.

The migration of a paywall from the legacy Paywall Builder to the new one means that a new version of your paywall will be created in the **Builder** tab of the paywall. This version can be edited with the new Paywall Builder and will be displayed in the apps with installed Adapty SDK v3.0 or later. See [Migration guide to Adapty SDK v.3.x](migration-to-adapty-sdk-v3) and [Migration guide to Adapty SDK v.3.3.x](migration-to-330) for detailed reference for upgrading to Adapty SDK.

The existing version of your paywall will stay in the Legacy Builder tab, you will be able to continue adjusting it with the legacy Paywall Builder and it will be displayed in the apps with the installed Adapty SDK version 2.x or earlier.

Therefore, you will have paywalls in both Paywall Builder formats in parallel and separately until you need them. Changes made with the paywall configuration made for one version will not affect the configuration build for another one.

To migrate a paywall to the new Paywall Builder:

1. Open the paywall you want to migrate.
2. Open the **Builder** tab.

   

<Zoom>
  <img src={require('./img/3f4d4c2-PB_migrate_paywall.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



3. Click the **Migrate paywall** button.
4. After the migration is done, review the result and make sure the paywall looks as it should. If not, correct it.
5. Click the **Save** button. 
6. If there are some issues, they will be highlighted in red and you will see them at once. Fix them and save the paywall again.

   

<Zoom>
  <img src={require('./img/78f63f0-PB_hughlighted_issues.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




You can migrate your paywalls one by one so that you could review and fix them if necessary.

## Paywall elements

The elements you add to your paywall appear in the left pane of the Paywall window. Their order in this pane reflects their order on the paywall.

**Paywall elements** in Adapty are categorized as simple or compound:

- **Simple Elements**: These are individual items that cannot contain other elements. Examples include text, images, and buttons.


<Zoom>
  <img src={require('./img/210c8e2-simple_elements.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





- **Compound Elements**: These can contain other elements or have their own structure. Examples include:
  - [Product lists](paywall-product-block) with  products
  - [Carousels](paywall-carousel) with child elements
  - [Cards](paywall-card) with child elements
  - Lists with its list items
  - Link blocks with links inside


<Zoom>
  <img src={require('./img/8a23be4-compound_elements.webp').default}
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

Once configured, you can  [add paywalls to placements](add-audience-paywall-ab-test) to display them in your mobile app. For more details on displaying paywalls, see [Display Paywall Builder paywalls](display-pb-paywalls).

## Customization Options

You can set up each element flexibly:

- **Style** tab: Adjust the element's size, appearance, background color or image, frame, and transparency. Additional options like page control and slideshow settings are available for certain elements, such as carousels.
- **Layout** tab: Set the element's position and its child elements' positions using offset (moving an element without changing its size or the parent's size) or padding (moving the element with possible resizing of the parent to fit the child's size and position).
- **Contents** tab: Configure the content of compound elements.

:::tip
You can additionally customize a hero image or video using a [custom asset resolver](get-pb-paywalls#customize-assets). For example, you can show a personalized image or video after the user's [onboarding](onboardings.md) or show a local preview image while a main remote image is loading.
:::

## We Value Your Feedback

Your feedback is invaluable to us. If you encounter any issues or have suggestions for improvements, please reach out to us. We're here to support you and enhance your experience with the new Paywall Builder.

📧 **Contact Us**: [Adapty Support](mailto:support@adapty.io)

Enjoy building with the new Paywall Builder, and take your monetization strategy to the next level with our enhanced tools and features!
