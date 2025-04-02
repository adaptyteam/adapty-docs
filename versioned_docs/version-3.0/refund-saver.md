---
title: "Refund Saver"
description: "Use Adapty Refund Saver to minimize refunds and maximize revenue."
metadataTitle: "Using Adapty Refund Saver to Reduce Refunds | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; 

The Refund Saver helps Adapty users efficiently manage refund requests from Apple’s App Store using automation. By streamlining this process, it reduces revenue loss and saves time. With real-time notifications and actionable insights, this tool ensures you address refund requests effectively while staying compliant with Apple’s guidelines.

<Zoom>
  <img src={require('./img/refunds-chart.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '500px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## What is the Refund Saver?

When users request refunds on the App Store, Apple evaluates consumption data related to the in-app purchase to decide whether to approve or deny the request. For example, if a user buys a subscription, uses it heavily for most of the subscription period, and then requests a refund, Apple is likely to approve it unless you provide usage data to show the subscription was actively consumed. Apple [encourages developers](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information) to share this data to ensure refund decisions are fair.

Adapty’s Refund Saver automates this process while remaining fully compliant with App Store [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information).

Here’s how it works:

- When a user initiates a refund request, the App Store sends a notification asking for transaction and usage details.
- If you ignore or delay the response, Apple is likely to approve the refund by default.
- Adapty automatically processes these notifications, providing Apple with the necessary data.

This automation reduces the chance of unnecessary refunds while saving you time and protecting your revenue.

:::info

With Refund Saver, you can save up to 40% of the revenue from refund requests.

:::

## Requirements to use Refund Saver

To use this feature, ensure you’ve met the following prerequisites:

1. **Update your Privacy Policy in App Store Connect:**
   Your app’s Privacy Policy must disclose the collection and use of consumption data. This ensures users understand your app’s privacy practices before downloading it. Refer to [Apple’s App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/) for guidance
2. **Obtain user consent for data sharing in your app**:
   Apple insists that you must obtain valid consent from the user before sharing their personal data with Apple. As the developer, you’re responsible for obtaining this consent since you’ll be sharing user data with Apple. See Apple’s [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information#3921151) for more details.
3. **Enable Server Notifications V2:**
   Ensure that Server Notifications V2 are activated in your Apple Developer account and properly configured in Adapty, as V1 notifications are not supported. If they aren’t activated yet, follow the steps in the [Enable App Store server notifications](enable-app-store-server-notifications) guide

## How to enable Refund Saver in Adapty

1. Open the [Refund Saver](https://app.adapty.io/refund-saver) section in the Adapty Dashboard.

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

2. Click **Turn on Refund Saver** to activate the feature.

## Obtain user consent

How you collect user consent for data sharing is up to you, but Apple requires valid user consent before sharing any personal data with them. Apple recommends using an **opt-in approach**, which involves in-app prompts that explain how data will be used and require explicit user action to provide consent. If a user ignores or denies the prompt, they are not considered to have consented. For more details, refer to Apple’s [guidelines](https://developer.apple.com/documentation/appstoreserverapi/send_consumption_information#3921151).

If explicit consent isn’t practical for your app, you can consider an **opt-out approach**. This involves including a data-sharing clause in your Terms of Service, explaining that users agree to data sharing by accepting the terms. Be sure to clearly outline how users can revoke their consent. 

Below is an example clause for the opt-out approach, including the types of data you might share. This is only a sample to guide you in crafting your own text. You are responsible for ensuring your final version complies with all applicable laws and Apple’s requirements.

*"If we receive a refund request for an in-app purchase, we may provide Apple with information about the user's in-app purchase activity. This could include details such as time since app installation, total app usage time, an anonymous account identifier, whether the in-app purchase was fully consumed, whether it included a trial period, the total amount spent, and the total amount refunded."*

Use the snippet below to update the user’s consent status in Adapty SDK:

<Tabs groupId="current-os" queryString> 

<TabItem value="swift" label="iOS (3.4.1+)" default> 

 ```swift showLineNumbers 
do {
  try await Adapty.updateCollectingRefundDataConsent(<CONSENT_VALUE>)
} catch {
  // handle the error
}
 ```

</TabItem> 

<TabItem value="flutter" label="Flutter (3.4.0+)" default> 

```javascript showLineNumbers 
try {
  await Adapty().updateCollectingRefundDataConsent(<CONSENT_VALUE>);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle the error
}
```

</TabItem> 

<TabItem value="rn" label="React Native (3.4.0+)" default> 

```typescript showLineNumbers 
try {
    await adapty.updateCollectingRefundDataConsent(<CONSENT_VALUE>);
} catch (error) {
    // handle the `AdaptyError`
}   
```

</TabItem>

</Tabs>

Depending on your chosen approach, set the **Default consent policy** option in the **Edit refund preferences** menu:

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



## Set a default refund preference

Apple allows developers to specify a preferential outcome for each refund request when responding to it. The purpose of this setting is to find the right balance between declining and accepting refund requests so that only fair refunds are provided. Note that this setting is only used to influence an outcome, but ultimately the decision is still up to Apple.

Adapty supports setting this preference, but we will use the same value for every refund request.

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

2. In the **Edit refund preference** window, choose your **Default refund request preference** option:

   | Option                                       | Description                                                  |
   | -------------------------------------------- | ------------------------------------------------------------ |
   | Always decline                               | (default) This is the default option and usually yields the best results for minimizing refunds. |
   | Decline first refund request, grant all next | For every transaction Refund Saver encounters, it will initially ask Apple to decline the refund. However, if the same transaction appears again, Refund Saver will always recommend granting the refund. This approach helps minimize user frustration from unfair refund declines — users can simply request the refund again and will likely receive it. |
   | Grant first refund request, decline all next | Suggests that Apple approve the first request from a user but decline all subsequent ones from the same user. |
   | Always refund                                | Suggests that Apple approve every refund request.            |
   | No preference                                | Do not provide any recommendations to Apple. In this case, Apple will determine the refund outcome based on its internal policies and user history, without any influence from your settings. This option provides the most neutral approach. |
   
   

## Set an individual refund preference with the SDK

You can set the refund preference in your app code individually for every installation depending on some user's actions. Use the snippet below to set the preference:

<Tabs groupId="current-os" queryString> 

<TabItem value="swift" label="iOS (3.4.1+)" default>   

```swift showLineNumbers code  
do {
  try await Adapty.updateRefundPreference(<PREFERENCE_VALUE>)
} catch {
  // handle the error
}
```
</TabItem>
<TabItem value="flutter" label="Flutter (3.4.0+)" default> 

```javascript showLineNumbers code  
try {
  await Adapty().updateRefundPreference(<PREFERENCE_VALUE>);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle the error
}
```
</TabItem> 
<TabItem value="rn" label="React Native (3.4.0+)" default>

```typescript showLineNumbers
try {
    await adapty.updateRefundPreference(<PREFERENCE_VALUE>);
} catch (error) {
    // handle the `AdaptyError`
}
```
</TabItem>
</Tabs>

<!---

## Set an individual refund preference with API

--->

## Manually adjust individual refund preferences

Even with a default refund behavior set, you may want to manually adjust specific requests. Here's how:

1. Enable the **Delay automated response for manual processing** toggle in the **Edit Refund Saver preferences** window. This gives you 11 hours to manually process the request before it is sent. 11 hours is the maximum delay allowed by Apple.
2. Manually adjust the refund preference for specific requests as needed. 

If you don’t make any changes within 11 hours, the request will be sent using your default preference.

## Limitations

- **Apple’s App Store only:** Refund Saver is only available for refund requests made to Apple’s App Store. Google Play doesn’t offer consumption data analysis for refunds. Refund decisions on Google Play are based solely on Google’s policies and the information provided by the user.
- **Requires Server Notifications V2:** Refund Saver is not compatible with App Store Server Notifications V1. If you’re currently using V1 in Adapty, you need to switch to V2, see the [Sending App Store server notifications to Adapty](enable-app-store-server-notifications) guide for details. Switching to V2 will also improve your analytics in Adapty by providing more accurate and comprehensive data.
- **Not for consumables:** Refund Saver does not apply to consumable products.





