---
title: "Afapty Resources"
description: ""
metadataTitle: ""
---
## Custom Actions


| Custom Action | Description | Action Arguments | Adapty Data Types - Action Output Variable |
|---|----|--------|----
| activate | Use this action to initialize the Adapty SDK. | None |
| getPaywall | Use this action to get the paywall. It does not return paywall products. Use the `getPaywallProducts` action to receive the actual paywall products. | [Placement_ID](placements) | |
| getPaywallProducts | Use this action to receive actual payall products list. | [AdaptyPaywall](paywalls) | |
| getProductsIntroductoryOfferEligibility | Use this action to check if the user qualifies for an introductory offer for an iOS subscription | [AdaptyPaywallProduct](product) | AdaptyEligibility <ul><li> **eligible**: The user is eligible for an intro offer, it is safe to reflect this info in your UI. </li><li> **ineligible**:	The user is not eligible to get any offer, you shouldn't present it in your UI. </li><li> **notApplicable**: This product is not configured to have an offer. </li></ul>| |
| getProfile |  <p>Get the current app user profile. Allows you to define the level of access, as well as other parameters.</p><p>The getProfile action provides the most up-to-date result as it always tries to query the API. If for some reason (e.g. no internet connection), the Adapty fails to retrieve information from the server, the data from cache will be returned. It is also important to note that the Adapty updates AdaptyProfile cache on a regular basis, in order to keep this information as up-to-date as possible.</p>  | None| AdaptyProfile|
| identify | <p>Use this action for identifying user with it’s user ID in your system.</p><p>If you don’t have a user ID on SDK activation, you can set it later at any time with .identify() action. The most common cases are after registration/authorization when the user switches from being an anonymous user to an authenticated user.</p> | customerUserId | None |
| logShowPaywall | <p>Use this action to notify Adapty SDK, that particular paywall was shown to user.</p><p> Adapty helps you to measure the performance of the paywalls. We automatically collect all the metrics related to purchases except for paywall views. This is because only you know when the paywall was shown to a customer. Whenever you show a paywall to your user, call .logShowPaywall(paywall) to log the event, and it will be accumulated in the paywall metrics.</p> | [AdaptyPaywall](paywalls)  | None |
| logout | Use this action to log out the current user from your app | None | None|
| makePurchase | <p>Use this action to complete a purchase and unlock the desired content. This action serves as the gateway for users to engage with the paywalls and proceed with their desired transactions.</p><p>If your paywall has an active promotional offer for the product a user is trying to buy, Adapty will automatically apply it at the time of purchase.</p>| <ul><li> **product**: an AdaptyPaywallProduct object retrieved from the paywall.</li><li> **subscriptionUpdateParams**: an AdaptySubscriptionUpdateParameters object used to upgrade or downgrade a subscription (use for Android).</li><li>**isOfferPersonalized**: Specifies whether the offer is personalized to the buyer (use for Android).</li></ul> | AdaptyProfile |
| presentCodeRedemptionSheet | Use this action to have StoreKit present a sheet enabling the user to redeem codes provided by your app. | Text | |
| restorePurchases | None | None | |
| updateProfile | AdaptyProfileParameters | Text | Provide parameters in the form|


## Data Types

To use Adapty parameter in FlutterFlow, create a variable and in the **Type** field, choose **Data Type**. Then in the second **Type** field, choose one of the Adapty data types below:

| Adapty Data Type| Description |
|--------------------------|------|
| AdaptyError | Information about error: <ul><li> **errorCode**: Code of the returned error. Refer to [full list of errors](error-handling-on-flutter-react-native-unity) for detailed description and ways to handle it.</li><li> **errorMessage**: Short description of the message</li></ul> |
| AdaptyGetProductResult | required |


## Enums


