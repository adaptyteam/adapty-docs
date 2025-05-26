---
title: "Apple family sharing"
description: "Enable Apple Family Sharing in Adapty to support shared subscriptions."
metadataTitle: "Apple Family Sharing with Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Apple's  family sharing enables the distribution of in-app purchases among family members, offering users of group-oriented apps, such as video streaming services and kids' apps, a convenient way to split subscriptions without having to share their Apple ID. By allowing up to five family members to utilize a subscription, [Family sharing](https://developer.apple.com/documentation/storekit/in-app_purchase/original_api_for_in-app_purchase/supporting_family_sharing_in_your_app) can potentially improve customer engagement and retention for your app.

In this guide, we will provide instructions on how to opt-in subscriptions to Family Sharing and explain how Adapty manages purchases that are shared within a family.

To get started with enabling Family Sharing for a particular product, head over to [App Store Connect](https://appstoreconnect.apple.com/). Family Sharing is turned off by default for both new and existing in-app purchases, so it is necessary to enable it individually for each in-app purchase. You can easily do this by accessing your **app's page,** navigating to the corresponding in-app purchase page, and selecting the **Turn On** option in the Family Sharing section. 

Keep in mind that once you enable Family Sharing for a product, **it cannot be turned off again**, as this would disrupt the user experience for those who have already shared the subscription with their family members.  
Also, please consider that, only non-consumables and subscriptions can be shared.


<Zoom>
  <img src={require('./img/6db165a-CleanShot_2023-03-28_at_17.15.342x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





On the displayed modal simply click on the **Confirm** button to finalize the setup process. After doing so, the Family Sharing section should update to display the message, "This subscription can be shared by everyone in a family group." This confirms that the subscription is now enabled for Family Sharing and can be shared among up to five family members.

Adapty makes it easy to support Family Sharing without any additional effort required. You just need to simply [configure your products](app-store-products) from the App Store, and once you **enable** it from App Store Connect **Family Sharing** will be automatically available in **Adapty**, that will be received as an event on the webhook.

:::note
Please note that Family Sharing is not supported in the sandbox environment.
:::

One thing you can consider is that when a user purchases a subscription and shares it with their family members, there is a **delay of up to one hour** before it becomes available to them. Apple designed this delay to give the user time to change their mind and undo the sharing if they want to. However, if the subscription is renewed, there is no delay in making it available to the family members.

When a user purchases a Family Shareable in-app product, the transaction will appear in their receipt as usual, but with the addition of a new field called `in_app_ownership_type` with the value `PURCHASED.` Furthermore, a new transaction will be created for all family members, which will have a different `web_order_line_item_id` and `original_transaction_id` compared to the original purchase, as well as an `in_app_ownership_type` field with the value `FAMILY_SHARED.`

To ensure accurate revenue calculation, on the Adapty side, only transactions with an `in_app_ownership_type` value of `PURCHASED` are considered. This means that we don't take into account `FAMILY_SHARED` values in analytics and do not send events based on them.

To identify the other family members on Adapty, you can find them in the event details. First, locate the original family purchase transaction. Then, examine the event details for that transaction, specifically looking for the same product, purchase date, and expiration date. By analyzing the event details, you can identify other family membership transactions associated with the original purchase.