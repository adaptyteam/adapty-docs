---
title: "SDK Models"
description: "Data models and types for Unity Adapty SDK."
metadataTitle: "SDK Models | Unity SDK | Adapty Docs"
slug: /unity-sdk-models
displayed_sidebar: sdkunity
---

## Interfaces

### AdaptyPaywallProduct

An information about a [product.](https://swift.adapty.io/documentation/adapty/adaptypaywallproduct)

| Name                                     | Type                                                                                                                    | Description                                                                                                                                                                       |
|:-----------------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| VendorProductId                          | string                                                                                                                  | Unique identifier of the product                                                                                                                                                 |
| AdaptyProductId                          | string                                                                                                                  | Unique identifier of the product in Adapty                                                                                                                                        |
| PaywallVariationId                       | string                                                                                                                  | The identifier of the variation, used to attribute purchases to the paywall                                                                                                       |
| PaywallABTestName                        | string                                                                                                                  | Parent A/B test name                                                                                                                              |
| PaywallName                              | string                                                                                                                  | Parent paywall name                                                                                                                                                              |
| LocalizedDescription                     | string                                                                                                                  | A description of the product                                                                                                                                                     |
| LocalizedTitle                           | string                                                                                                                  | The name of the product                                                                                                                                                          |
| IsFamilyShareable                        | bool                                                                                                                    | Indicates whether the product is available for family sharing in App Store Connect                                                                                               |
| RegionCode                               | string (optional)                                                                                                       | Product locale region code                                                                                                                        |
| Price                                    | [AdaptyPrice](#adaptyprice)                                                                                             | The object which represents the main price for the product                                                                                                                        |
| Subscription                             | [AdaptySubscription](#adaptysubscription) (optional)                                                                    | Detailed information about subscription (intro, offers, etc.)                                                                                                                     |

### AdaptyPrice

| Name              | Type             | Description                                                                                                                      |
| :---------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Amount            | double           | Discount price of a product in a local currency                                                                                    |
| CurrencyCode      | string (optional) | The currency code of the locale used to format the price of the product                                                          |
| CurrencySymbol    | string (optional) | The currency symbol of the locale used to format the price of the product                                                        |
| LocalizedString   | string (optional) | A formatted price of a discount for a user's locale                                                                               |

### AdaptySubscription

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GroupIdentifier               | string (optional)                                                                                                       | The identifier of the subscription group to which the subscription belongs                                                                                                        |
| Period                        | [AdaptySubscriptionPeriod](#adaptysubscriptionperiod)                                                                   | A ProductSubscriptionPeriodModel object. The period details for products that are subscriptions                                                                                  |
| LocalizedPeriod               | string (optional)                                                                                                       | Localized subscription period of the product                                                                                                                                      |
| Offer                         | [AdaptySubscriptionOffer](#adaptysubscriptionoffer)                                                                     | Subscription offer information                                                                                                                                                    |
| RenewalType                   | [AdaptySubscriptionRenewalType](#adaptysubscriptionrenewaltype)                                                         | The type of the subscription renewal                                                                                                                                               |
| BasePlanId                    | string (optional)                                                                                                       | The identifier of the base plan                                                                                                                                                    |

### AdaptySubscriptionPeriod

| Name          | Type             | Description                                                                                                                      |
| :------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Unit          | AdaptySubscriptionPeriodUnit | A unit of time that a subscription period is specified in                                                                       |
| NumberOfUnits | long             | A number of period units                                                                                                         |

### AdaptySubscriptionOffer

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Identifier                    | string                                                                                                                  | Unique identifier of a discount offer for a product                                                                                                                              |
| Type                          | [AdaptySubscriptionOfferType](#adaptysubscriptionoffertype)                                                             | Type of the subscription offer                                                                                                                                                    |
| Phases                        | array of [AdaptySubscriptionPhase](#adaptysubscriptionphase)                                                            | A list of discount phases available for this offer                                                                                                                               |
| OfferTags                     | array of strings                                                                                                        | Tags defined in Google Play console for current offer                                                                                                                            |

### AdaptySubscriptionPhase

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Price                         | [AdaptyPrice](#adaptyprice)                                                                                             | Price of the discount phase in a local currency                                                                                                                                   |
| NumberOfPeriods               | int                                                                                                                     | An integer that indicates the number of periods the product discount is available                                                                                                 |
| PaymentMode                   | [AdaptyPaymentMode](#adaptypaymentmode)                                                                                 | The payment mode for this product discount                                                                                                                                        |
| SubscriptionPeriod            | [AdaptySubscriptionPeriod](#adaptysubscriptionperiod)                                                                   | A Period object that defines the period for the product discount                                                                                                                  |
| LocalizedSubscriptionPeriod   | string (optional)                                                                                                       | The formatted subscription period of the discount for the user's localization                                                                                                     |
| LocalizedNumberOfPeriods     | string (optional)                                                                                                       | The formatted number of periods of the discount for the user's localization                                                                                                       |

### AdaptyPaywall

An information about a [paywall.](https://swift.adapty.io/documentation/adapty/adaptypaywall)

| Name               | Type                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PlacementId        | string                | The identifier of the paywall, configured in Adapty Dashboard                                                                                                                                                                                                                                                                                                                                                                                         |
| Name               | string                | Paywall name                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| AudienceName       | string                | Paywall audience name                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ABTestName         | string                | Paywall A/B test name                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| VariationId        | string                | The identifier of the variation, used to attribute purchases to the paywall                                                                                                                                                                                                                                                                                                                                                                             |
| Revision           | int                   | The current revision (version) of the paywall. Every change within the paywall creates a new revision                                                                                                                                                                                                                                                                                                                                                                                                               |
| HasViewConfiguration | bool                 | If true, it is possible to use Adapty Paywall Builder                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Locale             | string                | An identifier of a paywall locale                                                                                                                                                                                                                                                                                                                                                                                                                     |
| RemoteConfigString | string (optional)     | The custom JSON formatted data configured in Adapty Dashboard (String representation)                                                                                                                                                                                                                                                                                                                                                                                                                               |
| RemoteConfig       | object (optional)     | A custom dictionary configured in Adapty Dashboard for this paywall (same as remoteConfigString)                                                                                                                                                                                                                                                                                                                                                                                                                    |
| VendorProductIds   | array of strings      | Array of related products ids                                                                                                                                                                                                                                                                                                                                                                                                                         |

### AdaptyProfile

An information about a [user's](https://swift.adapty.io/documentation/adapty/adaptyprofile) subscription status and purchase history.

| Name             | Type                                                                                      | Description                                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| ProfileId        | string                                                                                    | An identifier of the user in Adapty                                                                                                              |
| CustomerUserId   | string (optional)                                                                         | An identifier of the user in your system                                                                                                         |
| CustomAttributes | object                                                                                    | Previously set user custom attributes with the updateProfile method                                                                           |
| AccessLevels     | object\<string, [AdaptyProfile.AccessLevel](#adaptyprofileaccesslevel)>                   | The keys are access level identifiers configured by you in Adapty Dashboard. The values are AccessLevel objects. Can be null if the customer has no access levels  |
| Subscriptions    | object\<string, [AdaptyProfile.Subscription](#adaptyprofilesubscription)>                 | The keys are product ids from App Store Connect. The values are Subscription objects. Can be null if the customer has no subscriptions        |
| NonSubscriptions | object\<string, array of [AdaptyProfile.NonSubscription](#adaptyprofilenonsubscription)>  | The keys are product ids from App Store Connect. The values are arrays of NonSubscription objects. Can be null if the customer has no purchases |

### AdaptyProfile.AccessLevel

Information about the [user's access level.](https://swift.adapty.io/documentation/adapty/adaptyprofile/accesslevel)

| Name | Type | Description |
|----|----|-----------|
| Id | string | Unique identifier of the access level configured by you in Adapty Dashboard |
| IsActive | bool | Whether the access level is active. Generally, you have to check just this property to determine if the user has access to premium features |
| VendorProductId | string | The identifier of the product in the App Store Connect that unlocked this access level |
| Store | string | The store of the purchase that unlocked this access level. The possible values are: app_store, play_store, adapty |
| ActivatedAt | DateTime | The time when the access level was activated |
| RenewedAt | DateTime (optional) | The time when the access level was renewed |
| ExpiresAt | DateTime (optional) | The time when the access level will expire (could be in the past and could be null for lifetime access) |
| IsLifetime | bool | Whether the access level is active for a lifetime (no expiration date). If set to true you shouldn't check expires_at, or you could just check isActive |
| ActiveIntroductoryOfferType | string (optional) | The type of active introductory offer. Possible values are: free_trial, pay_as_you_go, pay_up_front. If the value is not null, it means that the offer was applied during the current subscription period |
| ActivePromotionalOfferType | string (optional) | The type of active promotional offer. Possible values are: free_trial, pay_as_you_go, pay_up_front. If the value is not null, it means that the offer was applied during the current subscription period |
| ActivePromotionalOfferId | string (optional) | An identifier of active promotional offer |
| OfferId | string (optional) | Offer identifier |
| WillRenew | bool | Whether the auto-renewable subscription is set to renew |
| IsInGracePeriod | bool | Whether the auto-renewable subscription is in the grace period |
| UnsubscribedAt | DateTime (optional) | The time when the auto-renewable subscription was cancelled. Subscription can still be active, it just means that auto-renewal turned off. Will be set to null if the user reactivates the subscription |
| BillingIssueDetectedAt | DateTime (optional) | The time when billing issue was detected. Subscription can still be active. Will be set to null if the charge will be made |
| StartsAt | DateTime (optional) | The time when this access level has started (could be in the future) |
| CancellationReason | string (optional) | The reason why the subscription was cancelled. Possible values are: voluntarily_cancelled, billing_error, refund, price_increase, product_was_not_available, unknown |
| IsRefund | bool | Whether the purchase was refunded |

### AdaptyProfile.Subscription

Information about the [user's subscription.](https://swift.adapty.io/documentation/adapty/adaptyprofile/subscription)

| Name | Type | Description |
|----|----|-----------|
| Store | string | The store of the purchase. The possible values are: app_store, play_store, adapty |
| VendorProductId | string | The identifier of the product in the App Store Connect |
| VendorTransactionId | string | Transaction id from the App Store |
| VendorOriginalTransactionId | string | Original transaction id from the App Store. For auto-renewable subscription, this will be the id of the first transaction in the subscription |
| IsActive | bool | Whether the subscription is active |
| IsLifetime | bool | Whether the subscription is active for a lifetime (no expiration date). If set to true you shouldn't check expires_at, or you could just check isActive |
| ActivatedAt | DateTime | The time when the subscription was activated |
| RenewedAt | DateTime (optional) | The time when the subscription was renewed |
| ExpiresAt | DateTime (optional) | The time when the subscription will expire (could be in the past and could be null for lifetime access) |
| StartsAt | DateTime (optional) | The time when the subscription has started (could be in the future) |
| UnsubscribedAt | DateTime (optional) | The time when the auto-renewable subscription was cancelled. Subscription can still be active, it just means that auto-renewal turned off. Will be set to null if a user reactivates the subscription |
| BillingIssueDetectedAt | DateTime (optional) | The time when billing issue was detected (Apple was not able to charge the card). Subscription can still be active. Will be set to null if the charge will be made |
| IsInGracePeriod | bool | Whether the auto-renewable subscription is in the grace period |
| IsSandbox | bool | Whether the product was purchased in the sandbox environment |
| IsRefund | bool | Whether the purchase was refunded |
| WillRenew | bool | Whether the auto-renewable subscription is set to renew |
| ActiveIntroductoryOfferType | string (optional) | The type of active introductory offer. Possible values are: free_trial, pay_as_you_go, pay_up_front. If the value is not null, it means that the offer was applied during the current subscription period |
| ActivePromotionalOfferType | string (optional) | The type of active promotional offer. Possible values are: free_trial, pay_as_you_go, pay_up_front. If the value is not null, it means that the offer was applied during the current subscription period |
| ActivePromotionalOfferId | string (optional) | An identifier of active promotional offer |
| OfferId | string (optional) | Offer identifier |
| CancellationReason | string (optional) | The reason why the subscription was cancelled. Possible values are: voluntarily_cancelled, billing_error, refund, price_increase, product_was_not_available, unknown |

### AdaptyProfile.NonSubscription

Information about the user's non-subscription purchases.

| Name | Type | Description |
|----|----|-----------|
| PurchaseId | string | The identifier of the purchase in Adapty. You can use it to ensure that you've already processed this purchase (for example tracking one time products) |
| Store | string | The store of the purchase. The possible values are: app_store, play_store, adapty |
| VendorProductId | string | The identifier of the product in the App Store Connect |
| VendorTransactionId | string (optional) | Transaction id from the App Store |
| PurchasedAt | DateTime | The time when the product was purchased |
| IsSandbox | bool | Whether the product was purchased in the sandbox environment |
| IsRefund | bool | Whether the purchase was refunded |
| IsConsumable | bool | Whether the product should only be processed once. If true, the purchase will be returned by Adapty API one time only |

### AdaptySubscriptionUpdateParameters

Parameters to change one subscription to another.

| Name                  | Type   | Description                                                  |
| :-------------------- | :----- | :----------------------------------------------------------- |
| OldSubVendorProductId | string | The product id for current subscription to change |
| ReplacementMode       | [AdaptySubscriptionUpdateReplacementMode](#adaptysubscriptionupdatereplacementmode) | The proration mode for subscription update |

### Enums

#### AdaptySubscriptionPeriodUnit
- `Day` - Day period
- `Week` - Week period  
- `Month` - Month period
- `Year` - Year period

#### AdaptySubscriptionRenewalType
- `Autorenewable` - Auto-renewable subscription
- `Prepaid` - Prepaid subscription

#### AdaptySubscriptionOfferType
- `Introductory` - Introductory offer
- `Promotional` - Promotional offer
- `WinBack` - Win-back offer

#### AdaptyPaymentMode
- `FreeTrial` - Free trial
- `PayAsYouGo` - Pay as you go
- `PayUpFront` - Pay up front

#### AdaptySubscriptionUpdateReplacementMode
- `ImmediateWithTimeProration` - Immediate with time proration
- `ImmediateAndChargeProratedPrice` - Immediate and charge prorated price
- `ImmediateWithoutProration` - Immediate without proration
- `Deferred` - Deferred
- `ImmediateAndChargeFullPrice` - Immediate and charge full price 