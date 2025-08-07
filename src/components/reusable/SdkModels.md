## Interfaces

### AdaptyOnboarding

Information about an [onboarding](onboardings.md).

| Name              | Type                                                                | Description                                            |
|-------------------|---------------------------------------------------------------------|--------------------------------------------------------|
| placement         | [AdaptyPlacement](#adaptyplacement)                                 | A placement, configured in Adapty Dashboard |
| hasViewConfiguration | boolean                                                           | If true, it is possible to fetch the view object and use it with AdaptyUI library |
| name              | string                                                              | Name of the onboarding flow                            |
| remoteConfig      | [AdaptyRemoteConfig](#adaptyremoteconfig) (optional)                | A remote config configured in Adapty Dashboard for this onboarding |
| variationId       | string                                                              | An identifier of a variation, used to attribute purchases to this onboarding |
| id                | string                                                              | An identifier of an onboarding, configured in Adapty Dashboard |
| version           | number (optional)                                                   | Version of the onboarding configuration |
| payloadData       | string (optional)                                                   | Additional payload data |
| onboardingBuilder | [AdaptyOnboardingBuilder](#adaptyonboardingbuilder) (optional)      | Builder configuration for the onboarding |

### AdaptyOnboardingBuilder

| Name | Type | Description |
|----|----|-----------|
| url | string | URL for the onboarding builder |
| lang | string | Language for the onboarding builder |

### AdaptyPaywallProduct

An information about a [product.](https://swift.adapty.io/documentation/adapty/adaptypaywallproduct)

| Name                                     | Type                                                                                                                    | Description                                                                                                                                                                       |
|:-----------------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| localizedDescription                     | string                                                                                                                  | A description of the product                                                                                                                                                     |
| regionCode                               | string (optional)                                                                                                       | The region code of the locale used to format the price of the product. ISO 3166 ALPHA-2 (US, DE)                                                                                |
| localizedTitle                           | string                                                                                                                  | The name of the product                                                                                                                                                          |
| paywallABTestName                        | string                                                                                                                  | Same as abTestName property of the parent AdaptyPaywall                                                                                                                          |
| paywallName                              | string                                                                                                                  | Same as name property of the parent AdaptyPaywall                                                                                                                                 |
| price                                    | [AdaptyPrice](#adaptyprice) (optional)                                                                                  | The cost of the product in the local currency                                                                                                                                    |
| adaptyId                                 | string                                                                                                                  | Unique identifier of the product in Adapty                                                                                                                                        |
| variationId                              | string                                                                                                                  | Same as variationId property of the parent AdaptyPaywall                                                                                                                          |
| vendorProductId                          | string                                                                                                                  | Unique identifier of a product from App Store Connect or Google Play Console                                                                                                      |
| paywallProductIndex                      | number                                                                                                                  | The index of the product in the paywall                                                                                                                                           |
| webPurchaseUrl                           | string (optional)                                                                                                       | URL for web purchase functionality                                                                                                                                                |
| payloadData                              | string (optional)                                                                                                       | Additional payload data                                                                                                                                                           |
| subscription                             | [AdaptySubscriptionDetails](#adaptysubscriptiondetails) (optional)                                                      | Detailed information about subscription (intro, offers, etc.)                                                                                                                     |
| ios                                      | object (optional)                                                                                                       | iOS-specific properties                                                                                                                                                          |
| ios.isFamilyShareable                    | boolean                                                                                                                 | Boolean value that indicates whether the product is available for family sharing in App Store Connect. Will be false for iOS version below 14.0 and macOS version below 11.0. iOS Only. |

### AdaptyPrice

| Name              | Type             | Description                                                                                                                      |
| :---------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| amount            | number           | Price as number                                                                                                                    |
| currencyCode      | string (optional) | The currency code of the locale used to format the price of the product. The ISO 4217 (USD, EUR)                                                          |
| currencySymbol    | string (optional) | The currency symbol of the locale used to format the price of the product. ($, €)                                                        |
| localizedString   | string (optional) | A price's language is determined by the preferred language set on the device. On Android, the formatted price from Google Play as is                                                                               |

### AdaptySubscriptionDetails

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| subscriptionPeriod            | [AdaptySubscriptionPeriod](#adaptysubscriptionperiod)                                                                   | The period details for products that are subscriptions. Will be null for iOS version below 11.2 and macOS version below 10.14.4.                                                                                                                              |
| localizedSubscriptionPeriod   | string (optional)                                                                                                       | The period's language is determined by the preferred language set on the device                                                                                                         |
| offer                         | [AdaptySubscriptionOffer](#adaptysubscriptionoffer) (optional)                                                          | A subscription offer if available for the auto-renewable subscription                                                                                                                   |
| ios                           | object (optional)                                                                                                       | iOS-specific properties                                                                                                                                                          |
| ios.subscriptionGroupIdentifier | string (optional)                                                                                                     | An identifier of the subscription group to which the subscription belongs. Will be null for iOS version below 12.0 and macOS version below 10.14. iOS Only.                                                                                    |
| android                       | object (optional)                                                                                                       | Android-specific properties                                                                                                                                                      |
| android.basePlanId            | string                                                                                                                  | The identifier of the base plan. Android Only.                                                                                                                                    |
| android.renewalType           | string (optional)                                                                                                       | The renewal type. Possible values: 'prepaid', 'autorenewable'. Android Only.                                                                                                       |

### AdaptySubscriptionPeriod

| Name          | Type             | Description                                                                                                                      |
| :------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| numberOfUnits | number           | A number of period units                                                                                                         |
| unit          | ProductPeriod    | A unit of time that a subscription period is specified in. The possible values are: `day`, `week`, `month`, `year` |

### AdaptySubscriptionOffer

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| identifier                    | [AdaptySubscriptionOfferId](#adaptysubscriptionofferid)                                                                 | Unique identifier of a discount offer for a product                                                                                                                              |
| phases                        | array of [AdaptyDiscountPhase](#adaptydiscountphase)                                                                   | A list of discount phases available for this offer                                                                                                                               |
| android                       | object (optional)                                                                                                       | Android-specific properties                                                                                                                                                      |
| android.offerTags             | array of strings (optional)                                                                                             | Tags defined in Google Play console for current offer. Android Only.                                                                                                              |

### AdaptySubscriptionOfferId

| Name | Type | Description |
|----|----|-----------|
| id | string (optional) | Identifier for promotional or win_back offers |
| type | string | Type of offer. Possible values: `introductory`, `promotional`, `win_back` |

### AdaptyDiscountPhase

| Name                          | Type                                                                                                                    | Description                                                                                                                                                                       |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| localizedNumberOfPeriods     | string (optional)                                                                                                       | A formatted number of periods of a discount for a user's locale                                                                                                                   |
| localizedSubscriptionPeriod   | string (optional)                                                                                                       | A formatted subscription period of a discount for a user's locale                                                                                                                 |
| numberOfPeriods               | number                                                                                                                  | A number of periods this product discount is available                                                                                                                           |
| price                         | [AdaptyPrice](#adaptyprice)                                                                                             | Discount price of a product in a local currency                                                                                                                                   |
| subscriptionPeriod            | [AdaptySubscriptionPeriod](#adaptysubscriptionperiod)                                                                   | An information about period for a product discount                                                                                                                                |
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
| products           | array of [ProductReference](#productreference)          | Array of initial products info                                                                                                                                                                                                                                                                                                                                                                                                                         |
| id                 | string                | An identifier of a paywall, configured in Adapty Dashboard                                                                                                                                                                                                                                                                                                                                                                                            |
| version            | number (optional)      | Version of the paywall configuration                                                                                                                                                                                                                                                                                                                                                                                                                   |
| webPurchaseUrl     | string (optional)      | URL for web purchase functionality                                                                                                                                                                                                                                                                                                                                                                                                                     |
| payloadData        | string (optional)      | Additional payload data                                                                                                                                                                                                                                                                                                                                                                                                                                |
| paywallBuilder     | [AdaptyPaywallBuilder](#adaptypaywallbuilder) (optional) | Builder configuration for the paywall                                                                                                                                                                                                                                                                                                                                                                                                                  |

### AdaptyPaywallBuilder

| Name | Type | Description |
|----|----|-----------|
| id | string | ID for the paywall builder |
| lang | string | Language for the paywall builder |

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
| accessLevels     | object\<string, [AdaptyAccessLevel](#adaptyprofileaccesslevel)> (optional)                | Object that maps access level identifiers (configured by you in Adapty Dashboard) to the corresponding access level details. The value can be null if the user does not have any access levels  |
| customAttributes | object (optional)                                                                         | Object representing custom attributes set for the user using the updateProfile method                                                                           |
| customerUserId   | string (optional)                                                                         | The identifier for a user in your system                                                                                                         |
| nonSubscriptions | object\<string, [AdaptyNonSubscription](#adaptyprofilenonsubscription)[]> (optional)      | Object that maps product ids from the store to an array of information about the user's non-subscription purchases. The value can be null if the user does not have any purchases |
| profileId        | string                                                                                    | The identifier for a user in Adapty                                                                                                              |
| subscriptions    | object\<string, [AdaptySubscription](#adaptyprofilesubscription)> (optional)              | Object that maps product ids from a store to information about the user's subscriptions. The value can be null if the user does not have any subscriptions        |

### AdaptyProfile.AccessLevel

Information about the [user's access level.](https://swift.adapty.io/documentation/adapty/adaptyprofile/accesslevel)

| Name | Type | Description |
|----|----|-----------|
| activatedAt | Date | The date and time when the access level was activated |
| activeIntroductoryOfferType | OfferType (optional) | Type of active introductory offer, if any |
| activePromotionalOfferId | string (optional) | Identifier of the active promotional offer, if any |
| activePromotionalOfferType | OfferType (optional) | Type of the active promotional offer, if any |
| billingIssueDetectedAt | Date (optional) | The date and time when a billing issue was detected |
| cancellationReason | CancellationReason (optional) | The reason for the cancellation of the subscription |
| expiresAt | Date (optional) | The expiration date of the access level, if applicable |
| id | string | Unique identifier of the access level configured by you in Adapty Dashboard |
| isActive | boolean | Flag indicating whether the access level is currently active |
| isInGracePeriod | boolean | Flag indicating whether this auto-renewable subscription is in the grace period |
| isLifetime | boolean | Flag indicating whether this access level is active for a lifetime |
| isRefund | boolean | Flag indicating whether this purchase was refunded |
| renewedAt | Date (optional) | The date and time when the access level was renewed |
| startsAt | Date (optional) | The start date of this access level |
| store | VendorStore | The store where the purchase that unlocked this access level was made |
| unsubscribedAt | Date (optional) | The date and time when the auto-renewable subscription was cancelled |
| vendorProductId | string | The identifier of the product in the store that unlocked this access level |
| willRenew | boolean | Flag indicating whether this auto-renewable subscription is set to renew |
| android | object (optional) | Android-specific properties |
| android.offerId | string (optional) | An identifier of a discount offer in Google Play that unlocked this access level. Android Only. |

### AdaptyProfile.Subscription

Information about the [user's subscription.](https://swift.adapty.io/documentation/adapty/adaptyprofile/subscription)

| Name | Type | Description |
|----|----|-----------|
| activatedAt | Date | The date and time when the subscription was activated |
| activeIntroductoryOfferType | OfferType (optional) | Type of active introductory offer, if any |
| activePromotionalOfferId | string (optional) | Identifier of the active promotional offer, if any |
| activePromotionalOfferType | OfferType (optional) | Type of the active promotional offer, if any |
| billingIssueDetectedAt | Date (optional) | The date and time when a billing issue was detected |
| cancellationReason | CancellationReason (optional) | The reason for the cancellation of the subscription |
| expiresAt | Date (optional) | The expiration date of the subscription, if applicable |
| isActive | boolean | Flag indicating whether the subscription is currently active |
| isInGracePeriod | boolean | Flag indicating whether the subscription is in the grace period |
| isLifetime | boolean | Flag indicating whether the subscription is set for a lifetime |
| isRefund | boolean | Flag indicating whether the subscription was refunded |
| isSandbox | boolean | Flag indicating whether the subscription was purchased in a sandbox environment |
| renewedAt | Date (optional) | The date and time when the subscription was renewed |
| startsAt | Date (optional) | The date and time when the subscription starts |
| store | VendorStore | The store where the subscription was made |
| unsubscribedAt | Date (optional) | The date and time when the subscription was cancelled |
| vendorProductId | string | The identifier of the product in the store that was subscribed to |
| vendorTransactionId | string | The identifier of the product in the store that was subscribed to |
| vendorOriginalTransactionId | string | An original transaction id of the purchase in a store that unlocked this subscription. For auto-renewable subscription, this will be an id of the first transaction in this subscription |
| willRenew | boolean | Flag indicating whether the subscription is set to auto-renew |

### AdaptyProfile.NonSubscription

Information about the user's non-subscription purchases.

| Name | Type | Description |
|----|----|-----------|
| isConsumable | boolean | Flag indicating whether the product is consumable |
| isRefund | boolean | Flag indicating whether the purchase was refunded |
| isSandbox | boolean | Flag indicating whether the product was purchased in a sandbox environment |
| purchasedAt | Date | The date and time when the purchase was made |
| vendorProductId | string | The identifier of the product in the store that was purchased |
| vendorTransactionId | string (optional) | The identifier of the product in the store that was purchased |
| store | VendorStore | The store where the purchase was made |
| purchaseId | string | An identifier of the purchase in Adapty. You can use it to ensure that you've already processed this purchase (for example tracking one time products) |

### ProductReference

| Name | Type | Description |
|----|----|-----------|
| vendorId | string | Vendor ID of the product |
| adaptyId | string | Adapty ID of the product |
| ios | object (optional) | iOS-specific properties |
| ios.promotionalOfferId | string (optional) | Promotional offer ID. iOS Only. |
| ios.winBackOfferId | string (optional) | Win back offer ID. iOS Only. |
| android | object (optional) | Android-specific properties |
| android.basePlanId | string (optional) | Base plan ID. Android Only. |
| android.offerId | string (optional) | Offer ID. Android Only. |

### Enums

#### VendorStore
- `app_store` - Apple App Store
- `play_store` - Google Play Store  
- `adapty` - Adapty

#### OfferType
- `free_trial` - Free trial offer
- `pay_as_you_go` - Pay as you go offer
- `pay_up_front` - Pay up front offer

#### CancellationReason
- `voluntarily_cancelled` - User voluntarily cancelled
- `billing_error` - Billing error occurred
- `refund` - Purchase was refunded
- `price_increase` - Price was increased
- `product_was_not_available` - Product was not available
- `unknown` - Unknown reason

#### ProductPeriod
- `day` - Day period
- `week` - Week period
- `month` - Month period
- `year` - Year period 