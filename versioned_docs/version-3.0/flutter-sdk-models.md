---
title: "Flutter SDK Models"
description: "Understand Adapty's SDK models to optimize in-app purchase handling."
metadataTitle: "Understanding SDK Models | Flutter SDK | Adapty Docs"
displayed_sidebar: sdkflutter
---

## Interfaces

### AdaptyOnboarding

Information about an [onboarding](onboardings.md).

| Name              | Type                                                                | Description                                            |
|-------------------|---------------------------------------------------------------------|--------------------------------------------------------|
| id                | string                                                              | An identifier of an onboarding, configured in Adapty Dashboard |
| placement         | [AdaptyPlacement](#adaptyplacement)                                 | A placement, configured in Adapty Dashboard |
| hasViewConfiguration | boolean                                                           | If true, it is possible to fetch the view object and use it with AdaptyUI library |
| name              | string                                                              | Name of the onboarding flow                            |
| remoteConfig      | [AdaptyRemoteConfig](#adaptyremoteconfig) (optional)                | A remote config configured in Adapty Dashboard for this onboarding |
| variationId       | string                                                              | An identifier of a variation, used to attribute purchases to this onboarding |

### AdaptyPaywallProduct

An information about a [product.](https://swift.adapty.io/documentation/adapty/adaptypaywallproduct)

| Name                                     | Type                                                                                                                    | Description                                                                                                                                                                       |
|:-----------------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| vendorProductId                          | string                                                                                                                  | Unique identifier of a product from App Store Connect or Google Play Console                                                                                                      |
| adaptyProductId                          | string                                                                                                                  | Unique identifier of the product in Adapty                                                                                                                                        |
| paywallVariationId                       | string                                                                                                                  | Same as variationId property of the parent AdaptyPaywall                                                                                                                          |
| paywallABTestName                        | string                                                                                                                  | Same as abTestName property of the parent AdaptyPaywall                                                                                                                          |
| paywallName                              | string                                                                                                                  | Same as name property of the parent AdaptyPaywall                                                                                                                                 |
| paywallProductIndex                      | number                                                                                                                  | The index of the product in the paywall                                                                                                                                           |
| localizedDescription                     | string                                                                                                                  | A description of the product                                                                                                                                                     |
| localizedTitle                           | string                                                                                                                  | The name of the product                                                                                                                                                          |
| price                                    | [AdaptyPrice](#adaptyprice) (optional)                                                                                  | The cost of the product in the local currency                                                                                                                                    |
| subscription                             | [AdaptyProductSubscription](#adaptyproductsubscription) (optional)                                                      | Detailed information about subscription (intro, offers, etc.)                                                                                                                     |
| ios                                      | object (optional)                                                                                                       | iOS-specific properties                                                                                                                                                          |
| ios.isFamilyShareable                    | boolean                                                                                                                 | Boolean value that indicates whether the product is available for family sharing in App Store Connect. Will be false for iOS version below 14.0 and macOS version below 11.0. iOS Only. |
| ios.regionCode                           | string (optional)                                                                                                       | The region code of the locale used to format the price of the product. ISO 3166 ALPHA-2 (US, DE). iOS Only.                                                                      |

### AdaptyPrice

| Name              | Type             | Description                                                                                                                      |
| :---------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| amount            | number           | Price as number                                                                                                                    |
| currencyCode      | string (optional) | The currency code of the locale used to format the price of the product. The ISO 4217 (USD, EUR)                                                          |
| currencySymbol    | string (optional) | The currency symbol of the locale used to format the price of the product. ($, €)                                                        |
| localizedString   | string (optional) | A price's language is determined by the preferred language set on the device. On Android, the formatted price from Google Play as is                                                                               |

### AdaptyProductSubscription

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| subscriptionPeriod            | [AdaptyProductSubscriptionPeriod](#adaptyproductsubscriptionperiod)                                                                   | The period details for products that are subscriptions. Will be null for iOS version below 11.2 and macOS version below 10.14.4.                                                                                                                              |
| localizedSubscriptionPeriod   | string (optional)                                                                                                       | The period's language is determined by the preferred language set on the device                                                                                                         |
| offer                         | [AdaptySubscriptionOffer](#adaptysubscriptionoffer) (optional)                                                          | A subscription offer if available for the auto-renewable subscription                                                                                                                   |
| ios                           | object (optional)                                                                                                       | iOS-specific properties                                                                                                                                                          |
| ios.groupIdentifier           | string (optional)                                                                                                       | An identifier of the subscription group to which the subscription belongs. Will be null for iOS version below 12.0 and macOS version below 10.14. iOS Only.                                                                                    |
| android                       | object (optional)                                                                                                       | Android-specific properties                                                                                                                                                      |
| android.basePlanId            | string                                                                                                                  | The identifier of the base plan. Android Only.                                                                                                                                    |
| android.renewalType           | string (optional)                                                                                                       | The renewal type. Possible values: 'prepaid', 'autorenewable'. Android Only.                                                                                                       |

### AdaptyProductSubscriptionPeriod

| Name          | Type             | Description                                                                                                                      |
| :------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| numberOfUnits | number           | A number of period units                                                                                                         |
| unit          | ProductPeriod    | A unit of time that a subscription period is specified in. The possible values are: `day`, `week`, `month`, `year` |

### AdaptySubscriptionOffer

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| identifier                    | string                                                                                                                  | Unique identifier of a discount offer for a product                                                                                                                              |
| phases                        | array of [AdaptySubscriptionPhase](#adaptysubscriptionphase)                                                            | A list of discount phases available for this offer                                                                                                                               |

### AdaptySubscriptionPhase

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| localizedNumberOfPeriods     | string (optional)                                                                                                       | A formatted number of periods of a discount for a user's locale                                                                                                                   |
| localizedSubscriptionPeriod   | string (optional)                                                                                                       | A formatted subscription period of a discount for a user's locale                                                                                                                 |
| numberOfPeriods               | number                                                                                                                  | A number of periods this product discount is available                                                                                                                           |
| price                         | [AdaptyPrice](#adaptyprice)                                                                                             | Discount price of a product in a local currency                                                                                                                                   |
| subscriptionPeriod            | [AdaptyProductSubscriptionPeriod](#adaptyproductsubscriptionperiod)                                                                   | An information about period for a product discount                                                                                                                                |
| paymentMode                   | OfferType                                                                                                               | A payment mode for this product discount. Possible values: `free_trial`, `pay_as_you_go`, `pay_up_front`                                                                         |

### AdaptyPaywall

An information about a [paywall.](https://swift.adapty.io/documentation/adapty/adaptypaywall)

| Name               | Type                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| placement          | [AdaptyPlacement](#adaptyplacement)                      | A placement, configured in Adapty Dashboard                                                                                                                                                                                                                                                                                                                                                                                                             |
| hasViewConfiguration | boolean               | If true, it is possible to fetch the view object and use it with AdaptyUI library                                                                                                                                                                                                                                                                                                                                                                                                                      |
| name               | string                | A paywall name                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| remoteConfig       | [AdaptyRemoteConfig](#adaptyremoteconfig) (optional)     | A remote config configured in Adapty Dashboard for this paywall                                                                                                                                                                                                                                                                                                                                                                                  |
| variationId        | string                | An identifier of a variation, used to attribute purchases to this paywall                                                                                                                                                                                                                                                                                                                                                                             |
| instanceIdentity   | string                | Unique identifier of the paywall configuration                                                                                                                                                                                                                                                                                                                                                                                                         |

### AdaptyPlacement

| Name          | Type             | Description                                                                                                                      |
| :------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| abTestName    | string           | Parent A/B test name                                                                                                              |
| audienceName  | string           | A name of an audience to which the paywall belongs                                                                             |
| id            | string           | ID of a placement configured in Adapty Dashboard                                                                     |
| revision      | number           | Current revision (version) of a paywall. Every change within a paywall creates a new revision                               |
| isTrackingPurchases | boolean (optional) | Whether the placement is tracking purchases                                                                                      |
| audienceVersionId | string | Version ID of the audience                                                                                                      |

### AdaptyRemoteConfig

| Name          | Type             | Description                                                                                                                      |
| :------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| lang          | string           | Identifier of a paywall locale                                                                                                |
| data          | object           | A custom dictionary configured in Adapty Dashboard for this paywall                                                             |
| dataString    | string           | A custom JSON string configured in Adapty Dashboard for this paywall                                                |

### AdaptyProfile

An information about a [user's](https://swift.adapty.io/documentation/adapty/adaptyprofile) subscription status and purchase history.

| Name             | Type                                                                                      | Description                                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| profileId        | string                                                                                    | An identifier of the user in Adapty                                                                                                              |
| customerUserId   | string (optional)                                                                         | An identifier of the user in your system                                                                                                         |
| customAttributes | object                                                                                    | Previously set user custom attributes with the updateProfile method                                                                           |
| accessLevels     | object\<string, [AdaptyProfile.AccessLevel](#adaptyprofileaccesslevel)>                   | The keys are access level identifiers configured by you in Adapty Dashboard. The values are AccessLevel objects. Can be null if the customer has no access levels  |
| subscriptions    | object\<string, [AdaptyProfile.Subscription](#adaptyprofilesubscription)>                 | The keys are product ids from App Store Connect. The values are Subscription objects. Can be null if the customer has no subscriptions        |
| nonSubscriptions | object\<string, array of [AdaptyProfile.NonSubscription](#adaptyprofilenonsubscription)>  | The keys are product ids from App Store Connect. The values are arrays of NonSubscription objects. Can be null if the customer has no purchases |

### AdaptyProfile.AccessLevel

Information about the [user's access level.](https://swift.adapty.io/documentation/adapty/adaptyprofile/accesslevel)

| Name | Type | Description |
|----|----|-----------|
| id | string | Unique identifier of the access level configured by you in Adapty Dashboard |
| isActive | boolean | Whether the access level is active. Generally, you have to check just this property to determine if the user has access to premium features |
| vendorProductId | string | The identifier of the product in the App Store Connect that unlocked this access level |
| store | string | The store of the purchase that unlocked this access level. The possible values are: app_store, play_store, adapty |
| activatedAt | DateTime | The time when the access level was activated |
| renewedAt | DateTime (optional) | The time when the access level was renewed |
| expiresAt | DateTime (optional) | The time when the access level will expire (could be in the past and could be null for lifetime access) |
| isLifetime | boolean | Whether the access level is active for a lifetime (no expiration date). If set to true you shouldn't check expires_at, or you could just check isActive |
| activeIntroductoryOfferType | string (optional) | The type of active introductory offer. Possible values are: free_trial, pay_as_you_go, pay_up_front. If the value is not null, it means that the offer was applied during the current subscription period |
| activePromotionalOfferType | string (optional) | The type of active promotional offer. Possible values are: free_trial, pay_as_you_go, pay_up_front. If the value is not null, it means that the offer was applied during the current subscription period |
| activePromotionalOfferId | string (optional) | An identifier of active promotional offer |
| offerId | string (optional) | Offer identifier |
| willRenew | boolean | Whether the auto-renewable subscription is set to renew |
| isInGracePeriod | boolean | Whether the auto-renewable subscription is in the grace period |
| unsubscribedAt | DateTime (optional) | The time when the auto-renewable subscription was cancelled. Subscription can still be active, it just means that auto-renewal turned off. Will be set to null if the user reactivates the subscription |
| billingIssueDetectedAt | DateTime (optional) | The time when billing issue was detected. Subscription can still be active. Will be set to null if the charge will be made |
| startsAt | DateTime (optional) | The time when this access level has started (could be in the future) |
| cancellationReason | string (optional) | The reason why the subscription was cancelled. Possible values are: voluntarily_cancelled, billing_error, refund, price_increase, product_was_not_available, unknown |
| isRefund | boolean | Whether the purchase was refunded |

### AdaptyProfile.Subscription

Information about the [user's subscription.](https://swift.adapty.io/documentation/adapty/adaptyprofile/subscription)

| Name | Type | Description |
|----|----|-----------|
| store | string | The store of the purchase. The possible values are: app_store, play_store, adapty |
| vendorProductId | string | The identifier of the product in the App Store Connect |
| vendorTransactionId | string | Transaction id from the App Store |
| vendorOriginalTransactionId | string | Original transaction id from the App Store. For auto-renewable subscription, this will be the id of the first transaction in the subscription |
| isActive | boolean | Whether the subscription is active |
| isLifetime | boolean | Whether the subscription is active for a lifetime (no expiration date). If set to true you shouldn't check expires_at, or you could just check isActive |
| activatedAt | DateTime | The time when the subscription was activated |
| renewedAt | DateTime (optional) | The time when the subscription was renewed |
| expiresAt | DateTime (optional) | The time when the subscription will expire (could be in the past and could be null for lifetime access) |
| startsAt | DateTime (optional) | The time when the subscription has started (could be in the future) |
| unsubscribedAt | DateTime (optional) | The time when the auto-renewable subscription was cancelled. Subscription can still be active, it just means that auto-renewal turned off. Will be set to null if a user reactivates the subscription |
| billingIssueDetectedAt | DateTime (optional) | The time when billing issue was detected (Apple was not able to charge the card). Subscription can still be active. Will be set to null if the charge will be made |
| isInGracePeriod | boolean | Whether the auto-renewable subscription is in the grace period |
| isSandbox | boolean | Whether the product was purchased in the sandbox environment |
| isRefund | boolean | Whether the purchase was refunded |
| willRenew | boolean | Whether the auto-renewable subscription is set to renew |
| activeIntroductoryOfferType | string (optional) | The type of active introductory offer. Possible values are: free_trial, pay_as_you_go, pay_up_front. If the value is not null, it means that the offer was applied during the current subscription period |
| activePromotionalOfferType | string (optional) | The type of active promotional offer. Possible values are: free_trial, pay_as_you_go, pay_up_front. If the value is not null, it means that the offer was applied during the current subscription period |
| activePromotionalOfferId | string (optional) | An identifier of active promotional offer |
| offerId | string (optional) | Offer identifier |
| cancellationReason | string (optional) | The reason why the subscription was cancelled. Possible values are: voluntarily_cancelled, billing_error, refund, price_increase, product_was_not_available, unknown |

### AdaptyProfile.NonSubscription

Information about the user's non-subscription purchases.

| Name | Type | Description |
|----|----|-----------|
| purchaseId | string | The identifier of the purchase in Adapty. You can use it to ensure that you've already processed this purchase (for example tracking one time products) |
| store | string | The store of the purchase. The possible values are: app_store, play_store, adapty |
| vendorProductId | string | The identifier of the product in the App Store Connect |
| vendorTransactionId | string (optional) | Transaction id from the App Store |
| purchasedAt | DateTime | The time when the product was purchased |
| isSandbox | boolean | Whether the product was purchased in the sandbox environment |
| isRefund | boolean | Whether the purchase was refunded |
| isConsumable | boolean | Whether the product should only be processed once. If true, the purchase will be returned by Adapty API one time only |

### AdaptyAndroidSubscriptionUpdateParameters

Parameters to change one subscription to another.

| Name                  | Type   | Description                                                  |
| :-------------------- | :----- | :----------------------------------------------------------- |
| oldSubVendorProductId | string | The product id for current subscription to change |
| replacementMode       | [AdaptyAndroidSubscriptionUpdateReplacementMode](#adaptyandroidsubscriptionupdatereplacementmode) | The proration mode for subscription update |

### Enums

#### ProductPeriod
- `day` - Day period
- `week` - Week period  
- `month` - Month period
- `year` - Year period

#### OfferType
- `free_trial` - Free trial
- `pay_as_you_go` - Pay as you go
- `pay_up_front` - Pay up front

#### AdaptyAndroidSubscriptionUpdateReplacementMode
- `immediate_with_time_proration` - Immediate with time proration
- `immediate_and_charge_prorated_price` - Immediate and charge prorated price
- `immediate_without_proration` - Immediate without proration
- `deferred` - Deferred
- `immediate_and_charge_full_price` - Immediate and charge full price 