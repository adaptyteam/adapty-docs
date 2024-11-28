---
title: "Auto-managed refunds: Simplify handling refund requests"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Auto-managed refunds feature helps Adapty users efficiently manage refund requests from Apple’s App Store using automation. By streamlining this process, it reduces revenue loss and saves time. With real-time notifications and actionable insights, this tool ensures you address refund requests effectively while staying compliant with Apple’s guidelines.

:::info

Auto-managed refunds are available on paid plans: Pro, Pro+, or Enterprise.

:::

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
   Activate Server Notifications V2 in your Apple Developer account and set them up in Adapty. Follow the instructions in the [Enable App Store server notifications](https://chatgpt.com/c/enable-app-store-server-notifications) guide. Note: Server Notifications V1 won’t work.
2. **Update your Privacy Policy:**
   Make sure your app’s Privacy Policy discloses the collection and use of consumption data before enabling this feature. Refer to [Apple’s App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/) for guidance.
3. **Obtain user consent for data sharing:**
   Apple requires you to get explicit consent from users before sharing their consumption data. You are responsible for collecting this consent. See Apple’s [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information#3921151) for more details.

## Key benefits of Auto-managed refunds

Using Adapty’s Auto-managed refunds provides several advantages:

- **Revenue protection:** Prevents unnecessary refunds, protecting your monthly recurring revenue (MRR). With Auto-managed refunds, you can save up to 60% of the revenue from refund requests.
- **Automation:** Automatically handles refund requests, reducing manual intervention and human errors.
- **Time-saving:** Frees up your team to focus on core tasks instead of refund management.
- **Fraud prevention:** Helps identify and prevent refund abuse, ensuring only legitimate refund requests are processed.

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

## Update your Privacy Policy and obtain user consent

- You can gather user consent in two ways:
  1. **Opt-in approach:**
     - Use in-app consent prompts that explain how data will be used and require explicit user action to provide consent.
     - If a user ignores or denies the prompt, they will not be considered to have consented.
  2. **Opt-out approach:**
     - Include a data-sharing clause in your Terms of Service, stating that users agree to data sharing by accepting the terms.
     - Clearly outline how users can revoke consent (opt-out).

Example...

## Limitations

The Auto-managed refunds feature only works for refund requests made to Apple’s App Store. Google Play does not support consumption data analysis for refund requests. Refund decisions on Google Play are based solely on Google’s policies and the information provided by the user

