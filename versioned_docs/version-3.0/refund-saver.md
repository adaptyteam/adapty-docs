---
title: "Refund saver"
description: "Simplify refund management with Adapty’s Auto-managed refunds feature. Automate App Store refund requests, save up to 60% of revenue, and stay compliant with Apple’s guidelines."
metadataTitle: "Auto-Managed Refunds for App Store: Save Time and Protect Revenue"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Refund saver helps Adapty users efficiently manage refund requests from Apple’s App Store using automation. By streamlining this process, it reduces revenue loss and saves time. With real-time notifications and actionable insights, this tool ensures you address refund requests effectively while staying compliant with Apple’s guidelines.

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

## What is the Refund saver?

When users request refunds on the App Store, Apple evaluates consumption data related to the in-app purchase to decide whether to approve or deny the request. For example, if a user buys a subscription, uses it heavily for most of the subscription period, and then requests a refund, Apple is likely to approve it unless you provide usage data to show the subscription was actively consumed. Apple [encourages developers](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information) to share this data to ensure refund decisions are fair.

Adapty’s Refund saver automates this process while remaining fully compliant with App Store [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information).

Here’s how it works:

- When a user initiates a refund request, the App Store sends a notification asking for transaction and usage details.
- If you ignore or delay the response, Apple is likely to approve the refund by default.
- Adapty automatically processes these notifications, providing Apple with the necessary data.

This automation reduces the chance of unnecessary refunds while saving you time and protecting your revenue.

:::info

With Refund saver, you can save up to 40% of the revenue from refund requests.

:::

## Requirements to use Refund saver

To use this feature, ensure you’ve met the following prerequisites:

1. **Update your Privacy Policy in App Store Connect:**
   Your app’s Privacy Policy must disclose the collection and use of consumption data. This ensures users understand your app’s privacy practices before downloading it. Refer to [Apple’s App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/) for guidance
2. **Obtain user consent for data sharing in your app**:
   Apple insists that you must obtain valid consent from the user before sharing their personal data with Apple. As the developer, you’re responsible for obtaining this consent since you’ll be sharing user data with Apple. See Apple’s [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information#3921151) for more details.
3. **Enable Server Notifications V2:**
   Ensure that Server Notifications V2 are activated in your Apple Developer account and properly configured in Adapty, as V1 notifications are not supported. If they aren’t activated yet, follow the steps in the [Enable App Store server notifications](app-store-server-notifications#sending-app-store-server-notifications-to-adapty) guide

## How to enable Refund saver in Adapty

1. Open the [**Refund saver**](https://app.adapty.io/refund-saver) section in the Adapty Dashboard.

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

2. Click **Turn on Refund saver** to activate the feature.

## Obtain user consent

How you collect user consent for data sharing is up to you, but Apple requires valid user consent before sharing any personal data with them. Apple recommends using an **opt-in approach**, which involves in-app prompts that explain how data will be used and require explicit user action to provide consent. If a user ignores or denies the prompt, they are not considered to have consented. For more details, refer to Apple’s [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information#3921151).

If explicit consent isn’t practical for your app, you can consider an **opt-out approach**. This involves including a data-sharing clause in your Terms of Service, explaining that users agree to data sharing by accepting the terms. Be sure to clearly outline how users can revoke their consent. 

Below is an example clause for the opt-out approach, including the types of data you might share. This is only a sample to guide you in crafting your own text. You are responsible for ensuring your final version complies with all applicable laws and Apple’s requirements.

*"If we receive a refund request for an in-app purchase, we may provide Apple with information about the user's in-app purchase activity. This could include details such as time since app installation, total app usage time, an anonymous account identifier, whether the in-app purchase was fully consumed, whether it included a trial period, the total amount spent, and the total amount refunded."*

## Refund saver preference

By default, we assume you want Apple to reject as many refunds as possible. However, you can set your preferences for how often Apple should grant refunds. Keep in mind that these are only recommendations—Apple may or may not follow them.

1. To change your preference, click **Edit refund preference**.
   <Zoom>
     <img src={require('./img/refund-saver-preference.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. In the **Edit refund preference** window, choose your preferred option:

   | Option         | Description                                                  |
   | -------------- | ------------------------------------------------------------ |
   | Always decline | This is the default option and delivers the best results for minimizing refunds. |
   | No preference  | If you feel that Apple rejects too many refunds and it's affecting user satisfaction or your app's rating, you can choose this milder option. With it, Apple grants refunds less often. |
   | Always refund  | If you want to recommend Apple approve every refund request, select this option. |

## Limitations

- **Apple’s App Store only:** Refund saver is only available for refund requests made to Apple’s App Store. Google Play doesn’t offer consumption data analysis for refunds. Refund decisions on Google Play are based solely on Google’s policies and the information provided by the user.
- **Requires Server Notifications V2:** Refund saver is not compatible with App Store Server Notifications V1. If you’re currently using V1 in Adapty, you need to switch to V2, see the [Sending App Store server notifications to Adapty](app-store-server-notifications#sending-app-store-server-notifications-to-adapty) guide for details. Switching to V2 will also improve your analytics in Adapty by providing more accurate and comprehensive data.
- **Not for consumables:** Refund saver does not apply to consumable products.





