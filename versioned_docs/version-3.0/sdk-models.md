---
title: "iOS SDK Models"
description: "Understand Adapty’s SDK models to optimize in-app purchase handling."
metadataTitle: "Understanding SDK Models | Adapty Docs"
---

import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

:::danger
This page has been deprecated. For SDK models, go to [this reference](https://swift.adapty.io/documentation/adapty).
:::

## Interfaces

### AdaptyOnboarding

Information about an [onboarding](onboardings.md).

| Name              | Type                                                                | Description                                            |
|-------------------|---------------------------------------------------------------------|--------------------------------------------------------|
| placement         | [AdaptyPlacement](#adaptyplacement)                                 | Placement information for the onboarding               |
| instanceIdentity  | string                                                              | Unique identifier of the onboarding configuration      |
| variationId       | string                                                              | An identifier of a variation, used to attribute events to this onboarding |
| name              | string                                                              | Name of the onboarding flow                            |
| remoteConfig      | [AdaptyRemoteConfig](#adaptyremoteconfig) (optional)                | Optional custom metadata for the onboarding            |
| hasViewConfiguration | bool                                                              | Whether the onboarding has view configuration available |
| viewConfiguration | [AdaptyOnboarding.ViewConfiguration](#adaptyonboardingviewconfiguration) | Visual configuration settings                          |

### AdaptyOnboardingScreen

| Name     | Type                     | Description                        |
|---------|--------------------------|------------------------------------|
| id      | String                   | Unique identifier for the screen   |
| order   | Int                      | Position of the screen in the flow |
| content | AdaptyOnboardingContent  | Content to display on the screen   |
| actions | [AdaptyOnboardingAction] | Available actions for this screen  |

### AdaptyOnboarding.ViewConfiguration

| Name               | Type               | Description                            |
|--------------------|--------------------|----------------------------------------|
| responseLocale     | AdaptyLocale       | The locale of the response             |
| url                | URL                | Configuration URL for the onboarding   |

### AdaptyPaywallProduct

An information about a [product.](https://swift.adapty.io/documentation/adapty/adaptypaywallproduct)

| Name                                     | Type                                                                                                                    | Description                                                                                                                                                                       |
|:-----------------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| adaptyProductId                          | string                                                                                                                  | Unique identifier of the product in Adapty                                                                                                                                        |
| vendorProductId                          | string                                                                                                                  | Unique identifier of a product from App Store Connect or Google Play Console                                                                                                      |
| paywallProductIndex                      | int                                                                                                                     | Index of the product within the paywall                                                                                                                                           |
| variationId                              | string                                                                                                                  | Same as `variationId` property of the parent AdaptyPaywall                                                                                                                        |
| paywallABTestName                        | string                                                                                                                  | Same as `abTestName` property of the parent AdaptyPaywall                                                                                                                         |
| paywallName                              | string                                                                                                                  | Same as `name` property of the parent AdaptyPaywall                                                                                                                               |
| subscriptionOffer                        | [`AdaptySubscriptionOffer`](sdk-models#adaptysubscriptionoffer) (optional)                                                | The active subscription offer for this product (introductory, promotional, or win-back)                                                                                           |
| webPaywallBaseUrl                        | URL (optional)                                                                                                          | Base URL for web paywall functionality                                                                                                                                            |
| currencyCode                             | string (optional)                                                                                                       | The currency code of the locale used to format the price of the product.                                                                                                          |
| currencySymbol                           | string (optional)                                                                                                       | The currency symbol of the locale used to format the price of the product.                                                                                                        |
| isFamilyShareable                        | bool                                                                                                                    | A Boolean value that indicates whether the product is available for family sharing in App Store Connect. (Will be false for iOS version below 14.0 and macOS version below 11.0). |
| localizedDescription                     | string                                                                                                                  | A description of the product.                                                                                                                                                     |
| localizedPrice                           | string (optional)                                                                                                       | The price's language is determined by the preferred language set on the device.                                                                                                   |
| localizedSubscriptionPeriod              | string (optional)                                                                                                       | The period's language is determined by the preferred language set on the device.                                                                                                  |
| localizedTitle                           | string                                                                                                                  | The name of the product.                                                                                                                                                          |
| price                                    | number                                                                                                                  | The cost of the product in the local currency.                                                                                                                                    |
| regionCode                               | string (optional)                                                                                                       | The region code of the locale used to format the price of the product.                                                                                                            |
| subscriptionGroupIdentifier              | string (optional)                                                                                                       | The identifier of the subscription group to which the subscription belongs. (Will be nil for iOS version below 12.0 and macOS version below 10.14).                               |
| subscriptionPeriod                       | [`AdaptyProductSubscriptionPeriod`](sdk-models#adaptyproductsubscriptionperiod) (optional)                              | The period details for products that are subscriptions. (Will be nil for iOS version below 11.2 and macOS version below 10.14.4).                                                 |

### AdaptySubscriptionOffer

An information about a [subscription offer.](https://swift.adapty.io/documentation/adapty/adaptysubscriptionoffer)

| Name | Type | Description |
|----|----|-----------|
| identifier | string (optional) | Unique identifier of a discount offer for a product |
| offerType | enum | Type of offer. Possible values are `introductory`, `promotional`, `winBack` |
| subscriptionPeriod | [`AdaptyProductSubscriptionPeriod`](sdk-models#adaptyproductsubscriptionperiod) | Period details for the offer |
| numberOfPeriods | number | The number of periods this product discount is available |
| paymentMode | enum | The payment mode for this product discount. Possible values are `payAsYouGo`, `payUpFront`, `freeTrial`, `unknown` |
| localizedSubscriptionPeriod | string (optional) | A formatted subscription period of a discount for a user's locale |
| localizedNumberOfPeriods | string (optional) | A formatted number of periods of a discount for a user's locale |
| price | number | The discount price in the local currency |
| currencyCode | string (optional) | The currency code of the locale used to format the price of the product |
| localizedPrice | string (optional) | A formatted price of a discount for a user's locale |

### AdaptySubscriptionOffer.OfferType

Enum representing the type of subscription offer.

| Value | Description |
|-------|-------------|
| `introductory` | Introductory offer (first-time user discount) |
| `promotional` | Promotional offer (targeted discount) |
| `winBack` | Win-back offer (re-engagement discount) |

### AdaptySubscriptionOffer.PaymentMode

Enum representing the payment mode for subscription offers.

| Value | Description |
|-------|-------------|
| `payAsYouGo` | Pay as you go (recurring payments) |
| `payUpFront` | Pay up front (one-time payment for multiple periods) |
| `freeTrial` | Free trial (no payment required) |
| `unknown` | Unknown payment mode |

### AdaptyProductSubscriptionPeriod

| Name          | Type             | Description                                                                                                                      |
| :------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| unit          | AdaptyPeriodUnit | A unit of time that a subscription period is specified in. The possible values are: `day`, `week`, `month`, `year` and `unknown` |
| numberOfUnits | number           | A number of period units                                                                                                         |

### AdaptyProductSubscriptionPeriod.Unit

Enum representing the unit of time for subscription periods.

| Value | Description |
|-------|-------------|
| `day` | Daily subscription period |
| `week` | Weekly subscription period |
| `month` | Monthly subscription period |
| `year` | Yearly subscription period |
| `unknown` | Unknown period unit |

### AdaptyPaywall.ViewConfiguration

| Name               | Type               | Description                            |
|--------------------|--------------------|----------------------------------------|
| responseLocale     | AdaptyLocale       | The locale of the response             |
| url                | URL                | Configuration URL for the paywall      |

### AdaptyProductIdentifier

(_Flutter only_)  
A structured representation of a product identifier in the Flutter SDK, providing more information than simple string identifiers.

| Name             | Type   | Description                                                                                    |
| :--------------- | :----- | :--------------------------------------------------------------------------------------------- |
| vendorProductId  | string | The vendor product ID from the store (App Store Connect or Google Play Console).              |


### AdaptyPaywall

An information about a [paywall.](https://swift.adapty.io/documentation/adapty/adaptypaywall)

| Name               | Type                  | Description                                                                                                                                                                                                  |
|--------------------|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| placement          | [AdaptyPlacement](#adaptyplacement)                                 | Placement information for the paywall                                                                                                                                                                                                                                                                                                                                                                                                                |
| instanceIdentity   | string                | An identifier of a paywall, configured in Adapty Dashboard                                                                                                                                                                                                                                                                                                                                                                                            |
| variationId        | string                | An identifier of a variation, used to attribute purchases to this paywall                                                                                                                                    |
| name               | string                | Paywall name                                                                                                                                                                                                 |
| remoteConfig       | [AdaptyRemoteConfig](#adaptyremoteconfig) (optional)                | A custom configuration configured in Adapty Dashboard for this paywall                                                                                                                                       |
| hasViewConfiguration | bool                 | Whether the paywall has view configuration available                                                                                                                                                         |
| viewConfiguration  | [AdaptyPaywall.ViewConfiguration](#adaptypaywallviewconfiguration) (optional) | View configuration for the paywall                                                                                                                                                                           |
| vendorProductIds   | array of strings      | Array of related products ids                                                                                                                                                                                |
| webPaywallBaseUrl  | URL (optional)        | For more information, see the [guide on how to implement a web paywall in your app](ios-web-paywall.md). |


### AdaptyProfile

An information about a [user's](https://swift.adapty.io/documentation/adapty/adaptyprofile) subscription status and purchase history.

| Name             | Type                                                                                      | Description                                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| profileId        | string                                                                                    | An identifier of a user in Adapty                                                                                                              |
| customerUserId   | string (Optional)                                                                         | An identifier of a user in your system                                                                                                         |
| customAttributes | dictionary                                                                                | Previously set user custom attributes with `.updateProfile()` method                                                                           |
| accessLevels     | dictionary\<string, [`AccessLevel`](sdk-models#adaptyprofileaccesslevel)>             | The keys are access level identifiers configured by you in Adapty Dashboard. The values are  Can be null if the customer has no access levels  |
| subscriptions    | dictionary\<string, [`Subscription `](sdk-models#adaptyprofilesubscription)>          | The keys are product ids from a store. The values are information about subscriptions. Can be null if the customer has no subscriptions        |
| nonSubscriptions | dictionary\<string, \[[`NonSubscription `](sdk-models#adaptyprofilenonsubscription)]> | The keys are product ids from the store. The values are arrays of information about consumables. Can be null if the customer has no purchases. |

### AdaptyProfile.AccessLevel

Information about the [user's access level.](https://swift.adapty.io/documentation/adapty/adaptyprofile/accesslevel)

| Name | Type | Description |
|----|----|-----------|
| id | string | Unique identifier of the access level configured by you in Adapty Dashboard |
| isActive | boolean | True if this access level is active. Generally, you can check this property to determine wether a user has an access to premium features |
| vendorProductId | string | An identifier of a product in a store that unlocked this access level |
| store | string | A store of the purchase that unlocked this access level. Possible values are `'app_store' | 'play_store' | 'adapty'` |
| activatedAt | Date | Time when this access level was activated. |
| startsAt | Date (optional) | Time when this access level has started (could be in the future). |
| renewedAt | Date (optional) | Time when the access level was renewed. |
| expiresAt | Date (optional) | Time when the access level will expire (could be in the past and could be null for lifetime access). |
| isLifetime | boolean | True if this access level is active for a lifetime (no expiration date) |
| willRenew | boolean | True if this auto-renewable subscription is set to renew |
| isInGracePeriod | boolean | True if this auto-renewable subscription is in the [grace period](https://help.apple.com/app-store-connect/#/dev58bda3212) |
| unsubscribedAt | Date (optional) | Time when the auto-renewable subscription was cancelled. Subscription can still be active, it just means that auto-renewal turned off. Will be set to null if the user reactivates the subscription. |
| billingIssueDetectedAt | Date (optional) | Time when billing issue was detected. Subscription can still be active. Would be set to null if a charge is made. |
| cancellationReason | string (Optional) | A reason why a subscription was cancelled. Possible values are `'voluntarily_cancelled' | 'billing_error' |  'refund' |  'price_increase' |  'product_was_not_available' |  'unknown'` |
| isRefund | boolean | True if this purchase was refunded |
| activeIntroductoryOfferType | string (Optional) | A type of an active introductory offer. If the value is not null, it means that the offer was applied during the current subscription period. Possible values: `'free_trial' | 'pay_as_you_go' | 'pay_up_front'` |
| activePromotionalOfferType | string (Optional) | A type of an active promotional offer. If the value is not null, it means that the offer was applied during the current subscription period. Possible values `'free_trial' | 'pay_as_you_go' | 'pay_up_front'` |
| activePromotionalOfferId | string (Optional) | An id of active promotional offer |
| offerId | string (Optional) | An id of active offer |
| startsAt | Date (optional) | Time when this access level has started (could be in the future) |


### AdaptyProfile.Subscription

Information about the [user's subscription.](https://swift.adapty.io/documentation/adapty/adaptyprofile/subscription)

| Name | Type | Description |
|----|----|-----------|
| store | string | A store of the purchase that unlocked this subscription. Possible values are `'app_store' | 'play_store' | 'adapty'` |
| vendorProductId | string | An identifier of a product in a store that unlocked this subscription |
| vendorTransactionId | string | A transaction id of a purchase in a store that unlocked this subscription |
| vendorOriginalTransactionId | string | An original transaction id of the purchase in a store that unlocked this subscription. For auto-renewable subscription, this will be an id of the first transaction in this subscription |
| isActive | boolean | True if the subscription is active |
| isLifetime | boolean | True if the subscription is active for a lifetime (no expiration date) |
| activatedAt | Date | Time when the subscription was activated. |
| renewedAt | Date (optional) | Time when the subscription was renewed. |
| expiresAt | Date (optional) | Time when the subscription will expire (could be in the past and could be null for a lifetime access). |
| startsAt | Date (optional) | Time when the subscription has started (could be in the future). |
| unsubscribedAt | Date (optional) | Time when the auto-renewable subscription was cancelled. Subscription can still be active, it means that auto-renewal is turned off. Would be null if a user reactivates the subscription |
| billingIssueDetectedAt | Date (optional) | Time when a billing issue was detected. Subscription can still be active |
| willRenew | boolean | True if the auto-renewable subscription is set to renew |
| isInGracePeriod | boolean | Whether the auto-renewable subscription is in a [grace period](https://help.apple.com/app-store-connect/#/dev58bda3212) |
| cancellationReason | string (Optional) | A reason why the subscription was cancelled. Possible values: `'voluntarily_cancelled' | 'billing_error' |  'refund' |  'price_increase' |  'product_was_not_available' |  'upgraded' |  'unknown'` |
| isRefund | bool | True if the purchase was refunded |
| activeIntroductoryOfferType | string (Optional) | A type of an active introductory offer. If the value is not null, it means that the offer was applied during the current subscription period. Possible values: `'free_trial' | 'pay_as_you_go' | 'pay_up_front'` |
| activePromotionalOfferType | string (Optional) | A type of an active promotional offer. If the value is not null, it means that the offer was applied during the current subscription period. Possible values: `'free_trial' | 'pay_as_you_go' | 'pay_up_front'` |
| activePromotionalOfferId | string (Optional) | An id of an active promotional offer |
| offerId | string (Optional) | An id of active offer |
| isSandbox | bool | True if the product was purchased in a sandbox environment |


### AdaptyProfile.NonSubscription

Information about the user's non-subscription purchases.

| Name | Type | Description |
|----|----|-----------|
| purchaseId | string | An identifier of the purchase in Adapty. You can use it to ensure that you've already processed this purchase (for example tracking one time products) |
| vendorProductId | string | An identifier of the product in a store |
| vendorTransactionId | string (optional) | Transaction ID in a store |
| store | string | A store of the purchase. Possible values are `'app_store' | 'play_store' | 'adapty'` |
| purchasedAt | Date | Date when the product was purchased |
| isRefund | boolean | True if the purchase was refunded |
| isConsumable | boolean | True if the product is consumable (should only be processed once) |
| isSandbox | boolean | True if the product was purchased in a sandbox environment |


### AdaptySubscriptionUpdateParameters

(_Android only_)  
Parameters to change one subscription to another.

| Name                  | Type   | Description                                                  |
| :-------------------- | :----- | :----------------------------------------------------------- |
| oldSubVendorProductId | string | The identifier of the current subscription in Play Market that needs to be replaced. |
| ReplacementMode       | enum   | Enum that corresponds to [`BillingFlowParams.ProrationMode`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode) values. |


### AdaptyPlacement

Information about a placement configuration.

| Name               | Type               | Description                            |
|--------------------|--------------------|----------------------------------------|
| id                 | string             | Unique identifier of the placement     |
| audienceName       | string             | Name of the audience for this placement |
| revision           | number             | Current revision (version) of the placement |
| abTestName         | string             | Parent A/B test name                   |


### AdaptyRemoteConfig

Information about remote configuration for a placement.

| Name               | Type               | Description                            |
|--------------------|--------------------|----------------------------------------|
| locale             | string             | The locale identifier                  |
| jsonString         | string             | A custom JSON string configured in Adapty Dashboard |
| dictionary         | [String: Any]?     | A custom dictionary configured in Adapty Dashboard (same as `jsonString`) |