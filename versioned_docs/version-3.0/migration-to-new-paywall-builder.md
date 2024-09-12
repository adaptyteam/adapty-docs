---
title: "Migration to new Paywall Builder"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

We’re thrilled to introduce our [**New Paywall Builder**](adapty-paywall-builder) ! This advanced no-code tool is designed to make creating custom paywalls more intuitive and powerful than ever before, allowing you to craft beautiful, engaging paywalls with ease. No technical or design expertise required!

## Key Features of the New Paywall Builder

- **Expanded Template Selection**: Choose from a vast array of professionally designed templates to kickstart your paywall creation. These templates offer various styles and layouts to suit different needs and preferences.
- **Enhanced Flexibility**: Enjoy greater flexibility with the ability to use design layers and new elements such as carousels, cards, product list, and footer. These enhancements give you the creative freedom to build any type of paywall you envision.
- **Revamped Existing Elements**: Existing elements have been significantly improved, providing more options and capabilities to bring your paywall ideas to life.

## Parallel Paywall Builder Versions

Adapty offers two versions of the Paywall Builder simultaneously:

- **Beta Version of the New Paywall Builder**: Located under the **Builder** tab of the paywall in the Adapty Dashboard, this version is the most recent and versatile. Paywalls created here require Adapty SDK v3.0 or later.
- **Legacy Paywall Builder**: Found under the **Legacy Builder** tab, this outdated version should only be used to support older app versions with SDKs below v3.x.x. We recommend avoiding it for new paywalls as it will be deprecated soon.

## Migrating Paywalls to the New Builder

Migrating a paywall from the legacy builder to the new builder will create a new version of your paywall in the **Builder** tab. This version can be edited using the new Paywall Builder and will display in apps with Adapty SDK v3.0 or later. The legacy version remains in the **Legacy Builder** tab and supports apps with SDK 2.x or earlier.

You’ll maintain paywalls in both formats separately, with changes in one format not affecting the other.

## Steps to Migrate a Paywall

1. Open the paywall you want to migrate.
2. Open the **Builder** tab.

   
<Zoom>
  <img src={require('./img/3f4d4c2-PB_migrate_paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



3. Click the **Migrate paywall** button.
4. After the migration is done, review the result, make sure the paywall looks as it should. If not, correct it.
5. Click the **Save** button. 
6. If there are some issues, they will be highlighted red and you will see them at once. Fix them and save the paywall again.

   
<Zoom>
  <img src={require('./img/78f63f0-PB_hughlighted_issues.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




You can migrate your paywalls one at a time to review and fix them as needed.

:::info
Please note that paywalls created in the new Paywall Builder will only appear in app versions with Adapty SDK v3.0 or later.
:::

## We Value Your Feedback

Your feedback is invaluable to us. If you encounter any issues or have suggestions for improvements, please reach out to us. We’re here to support you and enhance your experience with the new Paywall Builder.

📧 **Contact Us**: [Adapty Support](mailto:support@adapty.io)

Enjoy building with the new Paywall Builder, and take your monetization strategy to the next level with our enhanced tools and features!