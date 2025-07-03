---
title: "SDK Models"
description: "Understand Adapty's SDK models to optimize in-app purchase handling."
metadataTitle: "Understanding SDK Models | Adapty Docs"
displayed_sidebar: sdkflutter
---

## Interfaces

### AdaptyOnboarding

Information about an [onboarding](onboardings.md).

| Name              | Type                                                                | Description                                            |
|-------------------|---------------------------------------------------------------------|--------------------------------------------------------|
| id                | String                                                              | Unique identifier of the onboarding configuration      |
| name              | String                                                              | Name of the onboarding flow                            |
| screens           | [[AdaptyOnboardingScreen]](#adaptyonboardingscreen)                 | Array of screen configurations for the onboarding flow |
| viewConfiguration | [AdaptyOnboarding.ViewConfiguration](#adaptyonboardingviewconfiguration) | Visual configuration settings                          |
| metadata          | [String: Any]?                                                      | Optional custom metadata for the onboarding            |

### AdaptyOnboardingScreen

| Name     | Type                     | Description                        |
|---------|--------------------------|------------------------------------|
| id      | String                   | Unique identifier for the screen   |
| order   | Int                      | Position of the screen in the flow |
| content | AdaptyOnboardingContent  | Content to display on the screen   |
| actions | [AdaptyOnboardingAction] | Available actions for this screen  |

### AdaptyOnboardingViewConfiguration

| Name               | Type               | Description                            |
|--------------------|--------------------|----------------------------------------|
| backgroundColor    | Color              | Background color of onboarding screens |
| navigationBarStyle | NavigationBarStyle | Style configuration for navigation bar |
| transitionStyle    | TransitionStyle    | Animation style between screens        |
| isSwipeEnabled     | bool               | Whether swipe navigation is enabled    |

### AdaptyPaywallProduct

An information about a [product.](https://pub.dev/packages/adapty_flutter)

| Name                                     | Type                                                                                                                    | Description                                                                                                                                                                       |
|:-----------------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| vendorProductId                          | string                                                                                                                  | Unique identifier of a product from App Store Connect or Google Play Console                                                                                                      |
| introductoryOfferEligibility             | enum                                                                                                                    | User's eligibility for your introductory offer. Check this property before displaying info about introductory offers (i.e. free trials)                                           |
| promotionalOfferEligibility (_iOS only_) | boolean                                                                                                                 | User's eligibility for the promotional offers. Check this property before displaying info about promotional offers                                                                |
| promotionalOfferId (_iOS only_)          | string (Optional)                                                                                                       | For iOS: An identifier of a promotional offer, provided by Adapty for this specific user. No value for Android devices                                                            |
| paywallProductIndex                      | int                                                                                                                     | Parent paywall product index.                                                                                                                                                     |
| paywallABTestName                        | string                                                                                                                  | Parent A/B test name                                                                                                                                                              |
| paywallName                              | string                                                                                                                  | Parent paywall name                                                                                                                                                               |
| skProduct (_iOS only_)                   | [SKProduct](https://developer.apple.com/documentation/storekit/skproduct/) (iOS)                                        | Underlying system representation of the product                                                                                                                                   |
| skuDetails (_Android only_)              | [SkuDetails](https://developer.android.com/reference/com/android/billingclient/api/SkuDetails) assigned to this product | Underlying system representation of the product                                                                                                                                   |
| currencyCode                             | string (optional)                                                                                                       | The currency code of the locale used to format the price of the product.                                                                                                          |
| currencySymbol                           | string (optional)                                                                                                       | The currency symbol of the locale used to format the price of the product.                                                                                                        |
| discounts (_iOS only_)                   | \[[`AdaptyProductDiscount`](flutter-sdk-models#adaptyproductdiscount)]                                                  | An array of subscription offers available for the auto-renewable subscription. (Will be empty for iOS version below 12.2 and macOS version below 10.14.4).                        |
| introductoryDiscount                     | [`AdaptyProductDiscount`](flutter-sdk-models#adaptyproductdiscount) (optional)                                          | The object containing introductory price information for the product. (Will be nil for iOS version below 11.2 and macOS version below 10.14.4).                                   |
| isFamilyShareable (_iOS only_)           | bool                                                                                                                    | A Boolean value that indicates whether the product is available for family sharing in App Store Connect. (Will be false for iOS version below 14.0 and macOS version below 11.0). |
| localizedDescription                     | string                                                                                                                  | A description of the product.                                                                                                                                                     |
| localizedPrice                           | string (optional for ios)                                                                                               | The price's language is determined by the preferred language set on the device.                                                                                                   |
| localizedSubscriptionPeriod              | string (optional)                                                                                                       | The period's language is determined by the preferred language set on the device.                                                                                                  |
| localizedTitle                           | string                                                                                                                  | The name of the product.                                                                                                                                                          |
| price                                    | number                                                                                                                  | The cost of the product in the local currency.                                                                                                                                    |
| regionCode (_iOS only_)                  | string (optional)                                                                                                       | The region code of the locale used to format the price of the product.                                                                                                            |
| subscriptionGroupIdentifier (_iOS only_) | string (optional)                                                                                                       | The identifier of the subscription group to which the subscription belongs. (Will be nil for iOS version below 12.0 and macOS version below 10.14).                               |
| subscriptionPeriod                       | [`AdaptyProductSubscriptionPeriod`](flutter-sdk-models#adaptyproductsubscriptionperiod) (optional)                      | The period details for products that are subscriptions. (Will be nil for iOS version below 11.2 and macOS version below 10.14.4).                                                 |

### AdaptyProductSubscriptionPeriod

| Name          | Type             | Description                                                                                                                      |
| :------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| unit          | AdaptyPeriodUnit | A unit of time that a subscription period is specified in. The possible values are: `day`, `week`, `month`, `year` and `unknown` |
| numberOfUnits | number           | A number of period units                                                                                                         |

### AdaptyProductDiscount

An information about a [product discount.](https://pub.dev/packages/adapty_flutter)

| Name | Type | Description |
|----|----|-----------|
| identifier (_iOS only_) | string (Optional) | Unique identifier of a discount offer for a product |
| price | number | Discount price of a product in a local currency |
| numberOfPeriods | number | A number of periods this product discount is available |
| paymentMode (_iOS only_) | string | <p>For iOS: A payment mode for this product discount. Possible values are `freeTrial`, `payUpFront`, `payAsYouGo`</p><p></p><p>No value for Android devices</p> |
| localizedPrice | string (Optional) | A formatted price of a discount for a user's locale |
| localizedSubscriptionPeriod | string (Optional for iOS) | A formatted subscription period of a discount for a user's locale. |
| localizedNumberOfPeriods (_iOS only_) | string (Optional) | For iOS: A formatted number of periods of a discount for a user's locale |
| subscriptionPeriod | [`AdaptyProductSubscriptionPeriod`](flutter-sdk-models#adaptyproductsubscriptionperiod) | An information about period for a product discount |


### AdaptyPaywall

An information about a [paywall.](https://pub.dev/packages/adapty_flutter)

| Name               | Type                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                 | string                | An identifier of a paywall, configured in Adapty Dashboard                                                                                                                                                                                                                                                                                                                                                                                            |
| variationId        | string                | An identifier of a variation, used to attribute purchases to this paywall                                                                                                                                                                                                                                                                                                                                                                             |
| revision           | number                | Current revision (version) of a paywall. Every change within a paywall creates a new revision                                                                                                                                                                                                                                                                                                                                                         |
| remoteConfigString | string (optional)     | A custom JSON string configured in Adapty Dashboard for this paywall                                                                                                                                                                                                                                                                                                                                                                                  |
| remoteConfig       | dictionary (optional) | A custom dictionary configured in Adapty Dashboard for this paywall (same as `remoteConfigString`)                                                                                                                                                                                                                                                                                                                                                    |
| vendorProductIds   | array of strings      | Array of related products ids                                                                                                                                                                                                                                                                                                                                                                                                                         |
| webPaywallBaseUrl  | URL                   | The [web paywall](flutter-web-paywall.md) URL for users to make external payments.                                                                                                                                                                                                                                                                                                                                                                    |
| abTestName         | string                | Parent A/B test name                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| name               | string                | Paywall name                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| locale             | string                | <p>An identifier of a paywall locale</p><p></p><p>This parameter is expected to be a language code composed of one or more subtags separated by the "-" character. The first subtag is for the language, the second one is for the region (The support for regions will be added later).</p><p>Example: `en` means English, `en-US` represents US English.</p><p>If the parameter is omitted, the paywall will be returned in the default locale.</p> |


### AdaptyProfile

An information about a [user's](https://pub.dev/packages/adapty_flutter) subscription status and purchase history.

| Name             | Type                                                                                      | Description                                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| profileId        | string                                                                                    | An identifier of a user in Adapty                                                                                                              |
| customerUserId   | string (Optional)                                                                         | An identifier of a user in your system                                                                                                         |
| customAttributes | dictionary                                                                                | Previously set user custom attributes with `.updateProfile()` method                                                                           |
| accessLevels     | dictionary\<string, [`AccessLevel`](flutter-sdk-models#adaptyprofileaccesslevel)>     | The keys are access level identifiers configured by you in Adapty Dashboard. The values are  Can be null if the customer has no access levels  |
| subscriptions    | dictionary\<string, [`Subscription `](flutter-sdk-models#adaptyprofilesubscription)>  | The keys are product ids from a store. The values are information about subscriptions. Can be null if the customer has no subscriptions        |
| nonSubscriptions | dictionary\<string, \[[`NonSubscription `](flutter-sdk-models#adaptyprofilenonsubscription)]> | The keys are product ids from the store. The values are arrays of information about consumables. Can be null if the customer has no purchases. |

### AdaptyProfile.AccessLevel

Information about the [user's access level.](https://pub.dev/packages/adapty_flutter)

| Name | Type | Description |
|----|----|-----------|
| id | string | Unique identifier of the access level configured by you in Adapty Dashboard |
| isActive | boolean | True if this access level is active. Generally, you can check this property to determine wether a user has an access to premium features |
| vendorProductId | string | An identifier of a product in a store that unlocked this access level |
| store | string | A store of the purchase that unlocked this access level. Possible values are `'app_store' | 'play_store' | 'adapty'` |
| activatedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p> | Time when this access level was activated. |
| startsAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when this access level has started (could be in the future). |
| renewedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when the access level was renewed. |
| expiresAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when the access level will expire (could be in the past and could be null for lifetime access). |
| isLifetime | boolean | True if this access level is active for a lifetime (no expiration date) |
| willRenew | boolean | True if this auto-renewable subscription is set to renew |
| isInGracePeriod | boolean | True if this auto-renewable subscription is in the [grace period](https://help.apple.com/app-store-connect/#/dev58bda3212) |
| unsubscribedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when the auto-renewable subscription was cancelled. Subscription can still be active, it just means that auto-renewal turned off. Will be set to null if the user reactivates the subscription. |
| billingIssueDetectedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when billing issue was detected. Subscription can still be active. Would be set to null if a charge is made. |
| cancellationReason | string (Optional) | A reason why a subscription was cancelled. Possible values are `'voluntarily_cancelled' | 'billing_error' |  'refund' |  'price_increase' |  'product_was_not_available' |  'unknown'` |
| isRefund | boolean | True if this purchase was refunded |
| activeIntroductoryOfferType | string (Optional) | A type of an active introductory offer. If the value is not null, it means that the offer was applied during the current subscription period. Possible values: `'free_trial' | 'pay_as_you_go' | 'pay_up_front'` |
| activePromotionalOfferType | string (Optional) | A type of an active promotional offer. If the value is not null, it means that the offer was applied during the current subscription period. Possible values `'free_trial' | 'pay_as_you_go' | 'pay_up_front'` |
| activePromotionalOfferId | string (Optional) | An id of active promotional offer. |


### AdaptyProfile.Subscription

Information about the [user's subscription.](https://pub.dev/packages/adapty_flutter)

| Name | Type | Description |
|----|----|-----------|
| store | string | A store of the purchase that unlocked this subscription. Possible values: `'app_store' | 'play_store' | 'adapty'` |
| vendorProductId | string | An identifier of a product in a store that unlocked this subscription |
| vendorTransactionId | string | A transaction id of a purchase in a store that unlocked this subscription |
| vendorOriginalTransactionId | string | An original transaction id of the purchase in a store that unlocked this subscription. For auto-renewable subscription, this will be an id of the first transaction in this subscription |
| isActive | boolean | True if the subscription is active |
| isLifetime | boolean | True if the subscription is active for a lifetime (no expiration date) |
| activatedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p> | Time when the subscription was activated. |
| renewedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when the subscription was renewed. |
| expiresAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when the subscription will expire (could be in the past and could be null for a lifetime access). |
| startsAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when the subscription has started (could be in the future). |
| unsubscribedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when the auto-renewable subscription was cancelled. Subscription can still be active, it means that auto-renewal is turned off. Would be null if a user reactivates the subscription |
| billingIssueDetectedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p><p></p><p>(optional)</p> | Time when a billing issue was detected. Subscription can still be active |
| willRenew | boolean | True if the auto-renewable subscription is set to renew |
| isInGracePeriod | boolean | Whether the auto-renewable subscription is in a [grace period](https://help.apple.com/app-store-connect/#/dev58bda3212) |
| cancellationReason | string (Optional) | A reason why the subscription was cancelled. Possible values: `'voluntarily_cancelled' | 'billing_error' |  'refund' |  'price_increase' |  'product_was_not_available' |  'unknown'` |
| isRefund | bool | True if the purchase was refunded |
| activeIntroductoryOfferType | string (Optional) | A type of an active introductory offer. If the value is not null, it means that the offer was applied during the current subscription period. Possible values: `'free_trial' | 'pay_as_you_go' | 'pay_up_front'` |
| activePromotionalOfferType | string (Optional) | A type of an active promotional offer. If the value is not null, it means that the offer was applied during the current subscription period. Possible values: `'free_trial' | 'pay_as_you_go' | 'pay_up_front'` |
| activePromotionalOfferId | string (Optional) | An id of an active promotional offer |
| isSandbox | bool | True if the product was purchased in a sandbox environment |


### AdaptyProfile.NonSubscription

Information about the user's non-subscription purchases.

| Name | Type | Description |
|----|----|-----------|
| purchaseId | string | An identifier of the purchase in Adapty. You can use it to ensure that you've already processed this purchase (for example tracking one time products) |
| vendorProductId | string | An identifier of the product in a store |
| vendorTransactionId | string (optional) | Transaction ID in a store |
| store | string | A store of the purchase. Possible values: `'app_store' | 'play_store' | 'adapty'` |
| purchasedAt | <p>iOS: Date</p><p>Android: string (ISO 8601 datetime)</p> | Date when the product was purchased |
| isRefund | boolean | True if the purchase was refunded |
| isConsumable | boolean | True if the product is consumable |
| isSandbox | boolean | True if the product was purchased in a sandbox environment |


### AdaptySubscriptionUpdateParameters

(_Android only_)  
Parameters to change one subscription to another.

| Name                  | Type   | Description                                                  |
| :-------------------- | :----- | :----------------------------------------------------------- |
| oldSubVendorProductId | string | The identifier of the current subscription in Play Market that needs to be replaced. |
| ReplacementMode       | enum   | Enum that corresponds to [`BillingFlowParams.ProrationMode`](https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.SubscriptionUpdateParams.ReplacementMode) values. | 