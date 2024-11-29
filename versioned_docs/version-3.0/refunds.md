---
title: "Auto-managed refunds"
description: "Simplify refund management with Adapty’s Auto-managed refunds feature. Automate App Store refund requests, save up to 60% of revenue, and stay compliant with Apple’s guidelines."
metadataTitle: "Auto-Managed Refunds for App Store: Save Time and Protect Revenue"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Auto-managed refunds feature helps Adapty users efficiently manage refund requests from Apple’s App Store using automation. By streamlining this process, it reduces revenue loss and saves time. With real-time notifications and actionable insights, this tool ensures you address refund requests effectively while staying compliant with Apple’s guidelines.

<Zoom>
  <img src={require('./img/refunds-chart.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## What is Auto-managed refunds?

When users request refunds on the App Store, Apple evaluates consumption data related to the in-app purchase to decide whether to approve or deny the request. For example, if a user buys a subscription, uses it heavily for most of the subscription period, and then requests a refund, Apple is likely to approve it unless you provide usage data to show the subscription was actively consumed. Apple [encourages developers](https://developer.apple.com/documentation/storekit/in-app_purchase/original_api_for_in-app_purchase/handling_refund_notifications) to share this data to ensure refund decisions are fair.

Adapty’s Auto-managed refunds feature automates this process while remaining fully compliant with App Store [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information).

Here’s how it works:

- When a user initiates a refund request, the App Store sends a notification asking for transaction and usage details.
- If you ignore or delay the response, Apple is likely to approve the refund by default.
- Adapty automatically processes these notifications, providing Apple with the necessary data.

This automation reduces the chance of unnecessary refunds while saving you time and protecting your revenue.

:::info

With Auto-managed refunds, you can save up to 60% of the revenue from refund requests.

:::

## Requirements to use Auto-managed refunds

To use this feature, ensure you’ve met the following prerequisites:

1. **Enable Server Notifications V2:**
   Activate Server Notifications V2 in your Apple Developer account and set them up in Adapty. Follow the instructions in the [Enable App Store server notifications](app-store-server-notifications#sending-app-store-server-notifications-to-adapty) guide.
2. **Obtain user consent for data sharing**:
   Apple insists that you must obtain valid consent from the user before sharing their personal data with Apple. You, the developer, are solely responsible for obtaining valid consent because you’re sharing with Apple the data that you collected from the user. See Apple’s [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information#3921151) for more details.

## How to enable Auto-managed refunds in Adapty

1. Open the [**Auto-managed refunds**](https://app.adapty.io/refunds) section in the Adapty Dashboard.

<Zoom>
  <img src={require('./img/refund-off.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Click **Turn on auto-managed refunds** to activate the feature.

## Obtain user consent

How you collect user consent for data sharing is up to you, but Apple requires valid user consent before sharing any personal data with them. Apple recommends using an **opt-in approach**, which involves in-app prompts that explain how data will be used and require explicit user action to provide consent. If a user ignores or denies the prompt, they are not considered to have consented. For more details, refer to Apple’s [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information#3921151).

If explicit consent isn’t practical for your app, you can consider an **opt-out approach**. This involves including a data-sharing clause in your Terms of Service, explaining that users agree to data sharing by accepting the terms. Be sure to clearly outline how users can revoke their consent. For more details, see [Apple’s App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/).

Below is an example clause for the opt-out approach, including the types of data you might share. This is only a sample to guide you in crafting your own text. You are responsible for ensuring your final version complies with all applicable laws and Apple’s requirements.

*"If we receive a refund request for an in-app purchase, we may provide Apple with information about the user's in-app purchase activity. This could include details such as time since app installation, total app usage time, an anonymous account identifier, whether the in-app purchase was fully consumed, whether it included a trial period, the total amount spent, and the total amount refunded."*

## Limitations

- **Apple’s App Store only:** Auto-managed refunds are only available for refund requests made to Apple’s App Store. Google Play doesn’t offer consumption data analysis for refunds. Refund decisions on Google Play are based solely on Google’s policies and the information provided by the user.
- **Requires Server Notifications V2:** Auto-managed refunds are not compatible with App Store Server Notifications V1. If you’re currently using V1 in Adapty, you need to switch to V2, see the [Sending App Store server notifications to Adapty](app-store-server-notifications#sending-app-store-server-notifications-to-adapty) guide for details. Switching to V2 will also improve your analytics in Adapty by providing more accurate and comprehensive data.
- **Not for consumables:** Auto-managed refunds do not apply to consumable products.





