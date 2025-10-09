---
title: "Adapty FlutterFlow plugin actions and data types"
description: "Access Adapty's feature flag resources to streamline subscription-based features."
metadataTitle: "Feature Flag Resources | Adapty Docs"
rank: 40
---
## Custom Actions

Below are Adapty methods delivered to FlutterFlow with Adapty plugin. They can be used as custom actions in FlutterFlow.

| Custom Action | Description | Action Arguments | Adapty Data Types - Action Output Variable |
|---|----|--------|----|
| activate | Initializes the Adapty SDK | None ||
| <p id="getPaywall">getPaywall</p> | Retrieves a paywall. It does not return paywall products. Use the `getPaywallProducts` action to get the actual products | <ul><li>[Placement_ID](placements)</li><li>[Locale](localizations-and-locale-codes)</li></ul> | [AdaptyGetPaywallResult](ff-resources#adaptygetpaywallresult)|
| <p id="getPaywallProducts">getPaywallProducts</p> | Returns a list of actual paywall products | [AdaptyPaywall](ff-resources#adaptypaywall) | [AdaptyGetProductsResult](ff-resources#adaptygetproductsresult) |
| <p id="getproductsintroductoryoffereligibility">getProductsIntroductoryOfferEligibility</p> | Checks if the user qualifies for an introductory iOS subscription offer | [AdaptyPaywallProduct](product) | [AdaptyGetIntroEligibilitiesResult](ff-resources#adaptygetintroeligibilitiesresult) |
| <p id="makePurchase">makePurchase</p> | Completes a purchase and unlocks content. If a paywall has a promotional offer, Adapty automatically applies it at checkout| <ul><li> **product**: an AdaptyPaywallProduct object retrieved from the paywall.</li><li> **subscriptionUpdateParams**: an [`AdaptySubscriptionUpdateParameters`](ff-resources#adaptysubscriptionupdateparameters) object used to upgrade or downgrade a subscription (use for Android).</li><li>**isOfferPersonalized**: Specifies whether the offer is personalized to the buyer (use for Android).</li></ul> | [AdaptyMakePurchaseResult](ff-resources#adaptymakepurchaseresult) |
| <p id="getprofile">getProfile</p> |  <p>Retrieves the current app user's profile. This allows you to set access levels and other parameters</p><p>If it fails (e.g., due to no internet), cached data will be returned. Adapty regularly updates the profile cache to ensure the information stays as current as possible</p>  | None| [AdaptyGetProfileResult](ff-resources#adaptygetprofileresult) |
| updateProfile | Changes optional attributes of the current user profile such as email, phone number, etc. You can later use attributes to create user [segments](segments) or just view them in CRM | The ID and any parameters that need to be updated for the [AdaptyProfile](ff-resources#adaptyprofile) | [AdaptyError](ff-resources#adaptyerror) (Optional) |
| restorePurchases | Restores any purchases the user has made | None | [AdaptyGetProfileResult](ff-resources#adaptygetprofileresult) |
| logShowPaywall | Logs when a specific paywall is shown to the user | [AdaptyPaywall](ff-resources#adaptypaywall)  | [AdaptyError](ff-resources#adaptyerror) (Optional) |
| identify | Identifies the user using your system's `customerUserId` | customerUserId | [AdaptyError](ff-resources#adaptyerror) (Optional) |
| logout | Logs the current user out of your app | None | [AdaptyError](ff-resources#adaptyerror) (Optional)|
| presentCodeRedemptionSheet | Displays a sheet that allows users to redeem codes (iOS only) | None | None |



## Data Types

Adapty data types (collections of data values) delivered to FlutterFlow with Adapty plugin.

### AdaptyAccessLevel

Information about the user's [access level](access-level).

| Field Name                | Type | Description |
|--------------------------|----------|-------------|
| activatedAt | DateTime | The time when this access level was activated |
| activeIntroductoryOfferType | String | The type of an active introductory offer. If set, it means an offer was applied during this subscription period |
| activePromotionalOfferId | String | The ID of an active promotional offer (purchased from iOS) |
| activePromotionalOfferType | String | The type of an active promotional offer (purchased from iOS). If set, it means an offer was applied during this subscription period |
| billingIssueDetectedAt | DateTime | The time when a billing issue was detected. The subscription can still be active. Set to null if payment is successfully processed |
| cancellationReason | String | The reason why the subscription was canceled |
| expiresAt | DateTime | The access level expiration time (could be in the past or not set for lifetime access) |
| id | String | The identifier of the access level |
| isActive | Boolean | True if this access level is active. Generally, you can check this property to determine if a user has an access to premium features |
| isInGracePeriod | Boolean | True if this auto-renewable subscription is in the [grace period](https://developer.apple.com/help/app-store-connect/manage-subscriptions/enable-billing-grace-period-for-auto-renewable-subscriptions) |
| isLifetime | Boolean | True if this access level is active for a lifetime (no expiration date) |
| isRefund | Boolean | True if this purchase was refunded |
| offerId | String | The ID of an active promotional offer (purchased from Android)  |
| renewedAt | DateTime | The time when the access level was last renewed |
| startsAt | DateTime | The start time of this access level (could be in the future) |
| store | String | The store where the purchase was made |
| unsubscribedAt | DateTime | The time when auto-renewal was turned off for the subscription. The subscription can still be active. If not set, the user reactivated the subscription |
| vendorProductId | String | The product ID from the store that unlocked this access level |
| willRenew | Boolean | True if this auto-renewable subscription is set to renew |

### AdaptyAccessLevelIdentifiers

This struct is intended to replace key-value pair for `Map<String, AdaptyAccessLevel` [AdaptyAccessLevel](ff-resources#adaptyaccesslevel).

| Field Name | Type | Description |
|------------|------|-------------|
| accessLevelIdentifier | String | The ID of the access level |
| accessLevel | Data ([AdaptyAccessLevel](ff-resources#adaptyaccesslevel)) | The associated [AdaptyAccessLevel](ff-resources#adaptyaccesslevel) |

### AdaptyCustomDoubleAttribute

Information on custom double attributes defined for the [user](ff-resources#adaptyprofile).

| Field Name | Type | Description |
|------------|------|-------------|
| key | String | The ID of the custom double attribute |
| value | Double | The value of the custom double attribute |

### AdaptyCustomStringAttribute

Information on custom string attributes defined for the [user](ff-resources#adaptyprofile).

| Field Name | Type | Description |
|------------|------|-------------|
| key | String | The ID of the custom string attribute |
| value | String | The value of the custom string attribute |


### AdaptyError

Contains details about an error. For a complete list of error codes, refer to [Flutter, React Native, Unity - Handle errors](error-handling-on-flutter-react-native-unity).

| Field Name                | Type | Description |
|--------------------------|----------|-------------|
| errorMessage | String | A human-readable description of the error |
| errorCode | Integer | Numeric code identifying the error |

### AdaptyGetIntroEligibilitiesResult

Contains the result of the `getProductsIntroductoryOfferEligibility` custom action.

| Field Name                | Type | Description |
|--------------------------|----------|-------------|
| value | List < Data ([AdaptyProductIntroEligibility](ff-resources#adaptyproductintroeligibility)) > | List of the user's eligibility for promotional offers |
| error | Data ([AdaptyError](ff-resources#adaptyerror)) | Contains details about the error via [`AdaptyError`](ff-resources#adaptyerror) |

### AdaptyGetPaywallResult

Contains the result of the `getPaywall` custom action.

| Field Name                | Type | Description |
|--------------------------|----------|-------------|
| value | Data ([AdaptyPaywall](ff-resources#adaptypaywall)) | Contains a list of [AdaptyPaywall](ff-resources#adaptypaywall) objects |
| error | Data ([AdaptyError](ff-resources#adaptyerror)) | Contains error information via [AdaptyError](ff-resources#adaptyerror) |

### AdaptyGetProductsResult

Contains the result of the `getPaywallProducts` custom action.

| Field Name                | Type | Description |
|--------------------------|----------|-------------|
| value | List < Data ([AdaptyPaywallProduct](product)) > | Contains a list of [AdaptyPaywallProducts](product) |
| error | Data ([AdaptyError](ff-resources#adaptyerror)) | Contains error information via [AdaptyError](ff-resources#adaptyerror)  |

### AdaptyGetProfileResult

Contains the result of the `getProfile` custom action.

| Field Name                | Type | Description |
|--------------------------|----------|-------------|
| value | Data ([AdaptyProfile](ff-resources#adaptyprofile)) | Contains the user profile as an [AdaptyProfile](ff-resources#adaptyprofile) |
| error | Data (AdaptyError) | Contains error information via [AdaptyError](ff-resources#adaptyerror)  |

### AdaptyMakePurchaseResult

Contains the result of the `makePurchase` custom action. 

| Field Name                | Type | Description |
|--------------------------|----------|-------------|
| value | Data ([AdaptyProfile](ff-resources#adaptyprofile)) | Contains the user's profile as an [AdaptyProfile](ff-resources#adaptyprofile) |
| error | Data ([AdaptyError](ff-resources#adaptyerror)) | Contains error information via [AdaptyError](ff-resources#adaptyerror)  |


### AdaptyNonSubscription

Information about non-subscription purchases. These can be one-time (consumable) products, unlocks (like new map unlock in the game), etc.

| Field Name                | Type | Description |
|--------------------------|----------|-------------|
| isConsumable | Boolean | Indicates whether the product is consumable |
| isOneTime | Boolean | Indicates if the product is a one-time purchase (e.g., if true, the purchase is processed only once) |
| isRefund | Boolean | Indicates if the product has been refunded |
| isSandbox | Boolean | Indicates if the product was purchased in a sandbox environment |
| purchasedAt | DateTime | 	The time when the product was purchased |
| purchaseId | String | The ID of the purchase in Adapty. Can be used for tracking one-time products |
| store | String | The store where the product was purchased (e.g., App Store, Google Play) |
| vendorProductId | String | ID of the product in vendor's system |
| vendorTransactionId | String | Transaction ID in the vendor's system |


### AdaptyPaywall

Information about a [paywall](paywalls).

| Field Name           | Type | Description |
|----------------------|----------|-------------|
| abTestName           | String | The name of the parent A/B test |
| hasViewConfiguration | Boolean | Indicates if there is a view configuration for the paywall |
| locale               | String | The locale ID of the paywall |
| name                 | String | Paywall name |
| placement.id         | String | The ID of the parent placement |
| remoteConfigString   | String | A custom dictionary from Adapty Dashboard associated with this paywall |
| placement.revision   | Integer | The current revision/version of the paywall. Every change generates a new revision |
| variationId          | String | The variation ID used to attribute purchases to this paywall |
| vendorProductIds     | String | Array of product IDs related to the paywall |

### AdaptyPaywallProduct

Information about [product](product).

| Field Name           | Type                                                         | Description                                                  |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| vendorProductId      | String                                                       | The ID of a product from an app store                        |
| localizedDescription | String                                                       | A description of the product in the user's language          |
| localizedTitle       | String                                                       | The name of the product in the user's language               |
| regionCode           | String                                                       | The region code of the locale used to format the price of the product (use for iOS) |
| isFamilyShareable    | Boolean                                                      | A Boolean value that indicates whether the product is available for family sharing in App Store Connect. Will be always FALSE for iOS version below 14.0 and macOS version below 11.0 (use for iOS) |
| paywallVariationId   | String                                                       | The ID of a variation, used to attribute purchases to this paywall |
| paywallABTestName    | String                                                       | Parent A/B test name                                         |
| paywallName          | String                                                       | Parent paywall name                                          |
| price                | Data ([AdaptyPriceData](#adaptyprice)                        | The price of the product                                     |
| subscriptionDetails  | Data ([AdaptySubscriptionDetails](#adaptysubscriptiondetails)) | Information on subscription                                  |

### AdaptyPrice

Information about product price.

| Field Name      | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| amount          | Double | The numeric value of the price             |
| currencyCode    | String | The code of the price currency             |
| currencySymbol  | String | The symbol used for the currency           |
| localizedString | String | The price displayed in the user's language |

### AdaptyProductIntroEligibility

Defines if the user qualifies for an introductory offer for an iOS subscription.

| Field Name      | Type                                                        | Description                                                  |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| vendorProductId | String                                                      | The ID of a product from an app store                        |
| eligibility     | [AdaptyEligibilityEnum](ff-resources#adaptyeligibilityenum) | Definition if the user qualifies for an introductory offer for an iOS subscription |

### AdaptyProductNonsubscriptions

Details of the active non-subscription tied to this product.

| Field Name       | Type                                                        | Description                                                  |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| productId       | String                                                      | The ID of the product from an app store                     |
| nonsubscriptions | [AdaptyNonSubscription](ff-resources#adaptynonsubscription) | Information about non-subscription purchases. These can be one-time (consumable) products, unlocks (like new map unlock in the game), etc. |

### AdaptyProductSubscriptions

Details of the active subscription tied to this product.

| Field Name   | Type                                                  | Description                              |
| ------------ | ----------------------------------------------------- | ---------------------------------------- |
| productId   | String                                                | The ID of the product from an app store  |
| subscription | [AdaptySubscription](ff-resources#adaptysubscription) | Information about subscription purchases |

### AdaptyProfile

Information on the user's profile

| Field Name       | Type                                                         | Description                                                  |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| accessLevels     | List < Data ([AdaptyAccessLevelIdentifiers](ff-resources#adaptyaccesslevelidentifiers)) > | List of all access levels that belong to the user            |
| profileId        | String                                                       | The ID of the user profile                                   |
| customerUserId   | String                                                       | The ID of the user in the vendor's system                    |
| subscriptions    | List < Data ([MapKeySubscriptions](#mapkeysubscriptions)) >  | The list of all subscriptions purchased by the user          |
| nonSubscriptions | List < Data ([MapKeyNonSubscriptions](#mapkeynonsubscriptions)) > | The list of all non-subscription products purchased by the user |

### AdaptyProfileParameters

Information on the user.

| Field Name                    | Type                                                         | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| firstName                     | String                                                       | The first name of the user                                   |
| lastName                      | String                                                       | The last name of the user                                    |
| gender                        | [AdaptyGenderEnum](#adaptygenderenum)                        | The gender of the user                                       |
| birthday                      | String                                                       | The birthday of the user                                     |
| email                         | String                                                       | The email of the user                                        |
| phoneNumber                   | String                                                       | The phone number of the user                                 |
| facebookAnonymousId           | String                                                       | The ID of the user in [Facebook Ads integration](facebook-ads) |
| amplitudeUserId               | String                                                       | The ID of the user in [Amplitude integration](amplitude)     |
| amplitudeDeviceId             | String                                                       | The ID of the user's device in  [Amplitude integration](amplitude) |
| mixpanelUserId                | String                                                       | The ID of the user in [Mixpanel integration](mixpanel)       |
| appmetricaProfileId           | String                                                       | The ID of the user in [AppMetrica integration](appmetrica)   |
| appmetricaDeviceId            | String                                                       | The ID of the user's device in  [AppMetrica integration](appmetrica) |
| oneSignalPlayerId             | String                                                       | The ID of the user in [OneSignal integration](onesignal)     |
| pushwooshHWID                 | String                                                       | The ID of the user's device in  [Pushwoosh integration](pushwoosh) |
| firebaseAppInstanceId         | String                                                       | The ID of the user in  [Firebase integration](firebase-and-google-analytics) |
| airbridgeDeviceId             | String                                                       | The ID of the user's device in  [Airbridge integration](airbridge) |
| appTrackingTransparencyStatus | AdaptyATTStatus                                              | The status of the access to IDFA (use for iOS)               |
| analyticsDisabled             | Boolean                                                      | Definition if the external [analytics is opted out for the user](analytics-integration#disabling-external-analytics-for-a-specific-customer) |
| customStringAttributes        | List < Data ([AdaptyCustomStringAttribute](ff-resources#adaptycustomstringattribute)) > | List of custom string attributes of the user                 |
| customDoubleAttributes        | List < Data ([AdaptyCustomDoubleAttribute](ff-resources#adaptycustomdoubleattribute)) > | List of custom double attributes of the user                 |

### AdaptySubscription

Information on existing user subscription.

| Field Name                  | Type     | Description                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| activatedAt                 | DateTime | The time when this subscription was activated                |
| activeIntroductoryOfferType | String   | The type of an active introductory offer. If set, it means an offer was applied during this subscription period |
| activePromotionalOfferId    | String   | The ID of an active promotional offer (use for iOS)          |
| activePromotionalOfferType  | String   | The type of an active promotional offer (use for iOS). If set, it means an offer was applied during this subscription period |
| cancellationReason          | String   | The reason why the subscription was canceled                 |
| expiresAt                   | DateTime | The subscription expiration time                             |
| renewedAt                   | DateTime | The time when the subscription was last renewed              |
| unsubscribedAt              | DateTime | The time when auto-renewal was turned off for the subscription. The subscription can still be active. If not set, the user reactivated the subscription |
| billingIssueDetectedAt      | DateTime | The time when a billing issue was detected. The subscription can still be active. Set to null if payment is successfully processed |
| isActive                    | Boolean  | True if this subscription is active. Generally, you can check this property to determine if a user has access to premium features |
| isInGracePeriod             | Boolean  | True if this auto-renewable subscription is in the [grace period](https://developer.apple.com/help/app-store-connect/manage-subscriptions/enable-billing-grace-period-for-auto-renewable-subscriptions) |
| isLifetime                  | Boolean  | True if this subscription is active for a lifetime (no expiration date) |
| isRefund                    | Boolean  | True if this purchase was refunded                           |
| isSandbox                   | Boolean  | Indicates if the product was purchased in a sandbox environment |
| offerId                     | String   | The ID of an active promotional offer (use for Android)      |
| startsAt                    | DateTime | The start time of this access level (could be in the future) |
| store                       | String   | The store where the product was purchased (e.g., App Store, Google Play) |
| vendorOriginalTransactionId | String   | ID of the initial subscription in vendor's system            |
| vendorProductId             | String   | ID of the product in vendor's system                         |
| vendorTransactionId         | String   | Transaction ID in the vendor's system                        |
| willRenew                   | Boolean  | True if this auto-renewable subscription is set to renew     |

### AdaptySubscriptionDetails

Scheme of a Subscription object as a part of the [AdaptyPaywallProduct](product).

| Field Name                          | Type                                                         | Description                                                  |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| androidBasePlanId                   | String                                                       | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price) in Stripe. |
| androidIntroductoryOfferEligibility | [AdaptyEligibilityEnum](ff-resources#adaptyeligibilityenum)  | Definition if the user qualifies for an introductory offer for an iOS subscription |
| androidOfferId                      | String                                                       | The ID of an active promotional offer (use for Android)      |
| androidOfferTags                    | List < String >                                              | List of [custom tags](https://developers.google.com/android-publisher/api-ref/rest/v3/OfferTag) specified for base plans and subscription offers. |
| introductoryOffer                   | List < Data ([AdaptySubscriptionPhase](ff-resources#adaptysubscriptionphase)) > | The ID of an introductory offer (use for iOS)                |
| localizedSubscriptionPeriod         | String                                                       | The period of the subscription in the user's language        |
| promotionalOffer                    | Data ([AdaptySubscriptionPhase](ff-resources#adaptysubscriptionphase)) | The promotional offer details (use for iOS)                  |
| promotionalOfferEligibility         | Boolean                                                      | Definition if the user qualifies for an promotional offer for an iOS subscription |
| promotionalOfferId                  | String                                                       | The ID of the promotional offer (use for iOS)                |
| renewalType                         | [AdaptyRenewalTypeEnum](#adaptyrenewaltypeenum)              | Defines if the subscription is auto-renewable or not via [AdaptyRenewalTypeEnum](ff-resources#adaptyrenewaltypeenum) |
| subscriptionGroupIdentifier         | String                                                       | The ID of the product group the product belongs to (use for iOS) |
| subscriptionPeriod                  | Data ([AdaptySubscriptionPeriod](#adaptysubscriptionperiod)) | The duration of the subscription                             |

### AdaptySubscriptionPeriod

The duration of the subscription.

| Field Name    | Type                                          | Description                                                 |
| ------------- | --------------------------------------------- | ----------------------------------------------------------- |
| numberOfUnits | Integer                                       | Number of days/weeks/months/years the subscription lasts.   |
| unit          | [AdaptyPeriodUnitEnum](#adaptyperiodunitenum) | Measurement unit of the period: days, weeks, months, years. |

### AdaptySubscriptionPhase

Represents a subscription phase, such as a free trial or an introductory offer period.

| Field Name                  | Type                                                         | Description                                                  |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| identifier                  | String                                                       | The ID of the phase                                          |
| localizedNumberOfPeriods    | String                                                       | The length of the phase. For example, a 6-month offer would display as `6 months` in the user's language. |
| localizedSubscriptionPeriod | String                                                       | The subscription duration in the user's language, like `3 months`. |
| numberOfPeriods             | Integer                                                      | The number of subscription periods in this phase. For instance, a 6-month offer would have two 3-month periods. |
| paymentMode                 | [AdaptyPaymentModeEnum](#adaptypaymentmodeenum)              | The payment model used for this phase.                       |
| price                       | Data ([AdaptyPrice](#adaptyprice))                           | The price of this phase.                                     |
| subscriptionPeriod          | Data ([AdaptySubscriptionPeriod](#adaptysubscriptionperiod)) | The subscription period on which this phase is based.        |

### AdaptySubscriptionUpdateParameters

(*Android only*)
Parameters for replacing one subscription with another.

| Field Name | Type                                                         | Description |
| ---------- | ------------------------------------------------------------ | ---------- |
| oldSubVendorProductId | String                                                       | The ID of the current subscription in the Play Store that you want to replace. |
| replacementMode       | [AdaptySubscriptionUpdateReplacementMode](ff-resources#adaptysubscriptionupdatereplacementmode) | Enum that corresponds to [`BillingFlowParams.ProrationMode`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode) values. |

### MapKeyNonSubscriptions

Replacement for a dictionary for [AdaptyNonSubscription](ff-resources#adaptynonsubscription).

| Field Name | Type                                                         |
| ---------- | ------------------------------------------------------------ |
| key        | String                                                       |
| value      | List < Data ([AdaptyNonSubscription](ff-resources#adaptynonsubscription)) > |

### MapKeySubscriptions

Replacement for a dictionary for [AdaptySubscription](ff-resources#adaptysubscription).

| Field Name | Type                                                         |
| ---------- | ------------------------------------------------------------ |
| key        | String                                                       |
| value      | List < Data ([AdaptySubscription](ff-resources#adaptysubscription)) > |

## Enums

Adapty enums (variables that are sets of predefined constants) delivered to FlutterFlow with the Adapty plugin.

### AdaptyEligibilityEnum

Defines if the user qualifies for an introductory offer for an iOS subscription.

| Field Name                | Description |
|--------------------------|-------------|
| eligible | The user is eligible for an intro offer, it is safe to reflect this info in your UI | 
| ineligible | The user is not eligible to get any offer, you shouldn't present it in your UI |
| notApplicable | This product is not configured to have an offer |

### AdaptyGenderEnum

Defines user's gender.

| Field Name | Description                                  |
| ---------- | -------------------------------------------- |
| none       | The gender is not set                        |
| female     | User's gender is female                      |
| male       | User's gender is male                        |
| Other      | The user has defined their gender as "other" |

### AdaptyPaymentModeEnum

Defines the payment model.

| Field Name | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| payAsYouGo | A pricing model where customers are billed based on their actual usage or consumption of a product/service, rather than paying for a fixed fee upfront |
| payUpFront | A pricing model where customers are billed before they receive the product/service. |
| freeTrial  | User is on a free trial period                               |
| unknown    | Pricing model is not defined                                 |

### AdaptyPeriodUnitEnum

Defines the units in which the periods are measured.

| Field Name | Description |
| ---------- | ----------- |
| day        | In days     |
| week       | In weeks    |
| month      | In months   |
| year       | In years    |
| unknown    | Not defined |

### AdaptyRenewalTypeEnum

Defines if the subscription is auto-renewable or not.

| Field Name    | Description                                         |
| ------------- | --------------------------------------------------- |
| prepaid       | The subscription is prepaid and not auto-renewable. |
| autorenewable | The subscription is auto-renewable                  |

### AdaptySubscriptionUpdateReplacementMode

Defines the subscription update mode for Android.

| Field Name    | Description                                         |
| ------------- | --------------------------------------------------- |
| withTimeProration | (default) The new plan takes effect immediately, and the remaining time will be prorated and credited to the user. |
| chargeProratedPrice | The new plan takes effect immediately, and the billing cycle remains the same. The price for the remaining period will be charged. This option is only available for subscription upgrades. |
| withoutProration | The new plan takes effect immediately, and the new price will be charged on the next recurrence time. The billing cycle stays the same. |
| deferred | The new purchase takes effect immediately, and the new plan will take effect when the old item expires. |
| chargeFullPrice | The new plan takes effect immediately, and the billing cycle remains the same. The price for the remaining period will be charged. This option is only available for subscription upgrades. |

### App States

App state variables are specific variables that hold the current state of an application. They can be accessed and modified throughout the entire application across all pages and components. This type of variable can be useful for storing data that needs to be shared between different parts of the app, such as user preferences and authentication tokens.

| Field Name     | Data Type                                          | Persisted | Description                                                  |
| -------------- | -------------------------------------------------- | --------- | ------------------------------------------------------------ |
| currentProfile | Data ([AdaptyProfile](ff-resources#adaptyprofile)) | False     | The variable that contains the information on the current user profile. Keep it up-to-date. |

