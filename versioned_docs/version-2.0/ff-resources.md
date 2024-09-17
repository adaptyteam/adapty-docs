---
title: "Adapty Resources"
description: ""
metadataTitle: ""
---
## Custom Actions

Below are Adapty methods delivered to FlutterFlow with Adapty plugin. They can be used as custom actions in FlutterFlow.

| Custom Action | Description | Action Arguments | Adapty Data Types - Action Output Variable |
|---|----|--------|----|
| activate | Initializes the Adapty SDK | None ||
| <p id="getPaywall">getPaywall</p> | Retrieves a paywall. It does not return paywall products. Use the `getPaywallProducts` action to get the actual products | <ul><li>[Placement_ID](placements)</li><li>[Locale](localizations-and-locale-codes)</li></ul> | [AdaptyPaywall](ff-resources#adaptypaywall) |
| <p id="getPaywallProducts">getPaywallProducts</p> | Returns a list of actual paywall products | [AdaptyPaywall](ff-resources#adaptypaywall) | |
| <p id="getProductsIntroductoryOfferEligibility">getProductsIntroductoryOfferEligibility</p> | Checks if the user qualifies for an introductory iOS subscription offer | [AdaptyPaywallProduct](product) | [AdaptyEligibilityEnum](ff-resources#adaptyeligibilityenum) |
| <p id="getProfile">getProfile</p> |  <p>Retrieves the current app user's profile. This allows you to set access levels and other parameters</p><p>If it fails (e.g., due to no internet), cached data will be returned. Adapty regularly updates the profile cache to ensure the information stays as current as possible</p>  | None| [AdaptyProfile](https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/AdaptyProfile-class.html) |
| identify | Identifies the user using your system's `customerUserId` | customerUserId | None |
| logShowPaywall | Logs when a specific paywall is shown to the user | [AdaptyPaywall](ff-resources#adaptypaywall)  | None |
| logout | Logs the current user out of your app | None | None|
| <p id="makePurchase">makePurchase</p> | Completes a purchase and unlocks content. If a paywall has a promotional offer, Adapty automatically applies it at checkout| <ul><li> **product**: an AdaptyPaywallProduct object retrieved from the paywall.</li><li> **subscriptionUpdateParams**: an `AdaptySubscriptionUpdateParameters` object used to upgrade or downgrade a subscription (use for Android).</li><li>**isOfferPersonalized**: Specifies whether the offer is personalized to the buyer (use for Android).</li></ul> | [AdaptyProfile](https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/AdaptyProfile-class.html)  |
| presentCodeRedemptionSheet | Displays a sheet that allows users to redeem codes (iOS only) | None | None |
| restorePurchases | Restores any purchases the user has made | None | [AdaptyProfile](https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/AdaptyProfile-class.html)  |

## Data Types

Adapty data types (collections of data values) delivered to FlutterFlow with Adapty plugin.

### AdaptyAccessLevel

Information about the user's [access level](access-level).

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| activatedAt | DateTime | The time when this access level was activated |
| activeIntroductoryOfferType | String | The type of an active introductory offer. If not `null, it means an offer was applied during this subscription period |
| activePromotionalOfferId | String | The ID of an active promotional offer (use for iOS) |
| activePromotionalOfferType | String | The type of an active promotional offer (use for iOS). If not null, it means an offer was applied during this subscription period |
| billingIssueDetectedAt | DateTime | The time when a billing issue was detected. The subscription can still be active. Set to null if payment is successfully processed |
| cancellationReason | String | The reason why the subscription was canceled |
| expiresAt | DateTime | The access level expiration time (could be in the past or null for lifetime access) |
| id | String | Text |
| isActive | Boolean | True if this access level is active. Generally, you can check this property to determine if a user has an access to premium features |
| isInGracePeriod | Boolean | True if this auto-renewable subscription is in the [grace period](https://developer.apple.com/help/app-store-connect/manage-subscriptions/enable-billing-grace-period-for-auto-renewable-subscriptions) |
| isLifetime | Boolean | True if this access level is active for a lifetime (no expiration date) |
| isRefund | Boolean | True if this purchase was refunded |
| offerId | String | The ID of an active promotional offer (use for Android)  |
| renewedAt | DateTime | The time when the access level was last renewed |
| startsAt | DateTime | The start time of this access level (could be in the future) |
| store | String | The store where the purchase was made |
| unsubscribedAt | DateTime | The time when auto-renewal was turned off for the subscription. The subscription can still be active. Null if the user reactivated the subscription |
| vendorProductId | String | The product ID from the store that unlocked this access level |
| willRenew | Boolean | True if this auto-renewable subscription is set to renew |

### AdaptyAccessLevelIdentifiers

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| accessLevelIdentifier | String | The ID of the access level |
| accessLevel | Data (AdaptyAccessLevel) | Contains the associated [`AdaptyAccessLevel`](ff-resources#adaptyaccesslevel) |


### AdaptyCustomDoubleAttribute

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| key | String | The ID of the custom double attribute |
| value | Double | Value of the custom double attribute |


### AdaptyCustomStringAttribute

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| key | String | The ID of the custom string attribute |
| value | String | Value of the custom string attribute |


### AdaptyError

CContains details about an error. For a complete list of error codes, refer to [Flutter, React Native, Unity - Handle errors](error-handling-on-flutter-react-native-unity).

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| errorMessage | String | A human-readable description of the error |
| errorCode | Integer | Numeric code identifying the error |

### AdaptyGetIntroEligibilitiesResult

Contains the result of the [`getProductsIntroductoryOfferEligibility`](ff-resources#getProductsIntroductoryOfferEligibility) custom action.

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| value | List < Data (AdaptyProductIntroEligibility) > | List of the user's eligibility for promotional offers |
| error | Data (AdaptyError) | Contains details about the error via [`AdaptyError`](ff-resources#adaptyerror) |

### AdaptyGetPaywallResult

Contains the result of the [`getPaywall`](ff-resources#getPaywall) custom action.

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| value | Data (AdaptyPaywall) | Contains a list of `[AdaptyPaywall`](ff-resources#adaptypaywall) objects |
| error | Data (AdaptyError) | Contains error information via [`AdaptyError`](ff-resources#adaptyerror) |

### AdaptyGetProductsResult

Contains the result of the [`getPaywallProducts`](ff-resources#getPaywallProducts) custom action.

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| value | List < Data (AdaptyPaywallProduct) > | Contains a list of `AdaptyPaywallProduct` |
| error | Data (AdaptyError) | Contains error information via [`AdaptyError`](ff-resources#adaptyerror)  |

### AdaptyGetProfileResult

Contains the result of the [`getProfile`](ff-resources#getProfile) custom action.

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| value | Data (AdaptyProfile) | Contains the user profile as an `AdaptyProfile` |
| error | Data (AdaptyError) | Contains error information via [`AdaptyError`](ff-resources#adaptyerror)  |

### AdaptyMakePurchaseResult

Contains the result of the [`makePurchase`](ff-resources#makePurchase) custom action. 

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| value | Data (AdaptyProfile) | CContains the user's profile as an `AdaptyProfile` |
| error | Data (AdaptyError) | Contains error information via [`AdaptyError`](ff-resources#adaptyerror)  |


### AdaptyNonSubscription

Information about non-subscription purchases. These can be one-time (consumable) products, unlocks (like new map unlock in the game), etc.

| Field name                | Type | Description |
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

| Field name                | Type | Description |
|--------------------------|----------|-------------|
| abTestName | String | The name of the parent A/B test |
| hasViewConfiguration | Boolean | Indicates if there is a view configuration for the paywall |
| locale | String | The locale ID of the paywall |
| name | String | Paywall name |
| placementId | String | The ID of the parent placement |
| remoteConfigString | String | A custom dictionary from Adapty Dashboard associated with this paywall |
| revision | Integer | The current revision/version of the paywall. Every change generates a new revision |
| variationId | String | The variation ID used to attribute purchases to this paywall |
| vendorProductIds | String | Array of product IDs related to the paywall |

### AdaptyPaywallProduct

Information about [product](product).

| Field name           | Type                             | Description                                                  |
| -------------------- | -------------------------------- | ------------------------------------------------------------ |
| vendorProductId      | String                           | The ID of a product from an app store                        |
| localizedDescription | String                           | A description of the product in the user's language          |
| localizedTitle       | String                           | The name of the product in the user's language               |
| regionCode           | String                           | The region code of the locale used to format the price of the product (use for iOS) |
| isFamilyShareable    | Boolean                          | A Boolean value that indicates whether the product is available for family sharing in App Store Connect. Will be always FALSE for iOS version below 14.0 and macOS version below 11.0 (use for iOS) |
| paywallVariationId   | String                           | The ID of a variation, used to attribute purchases to this paywall |
| paywallABTestName    | String                           | Parent A/B test name                                         |
| paywallName          | String                           | Parent paywall name                                          |
| price                | Data (AdaptyPrice)               | The price of the product                                     |
| subscriptionDetails  | Data (AdaptySubscriptionDetails) | Information on subscription                                  |

### AdaptyPrice

Information about price

| Field name      | Type   | Description                         |
| --------------- | ------ | ----------------------------------- |
| amount          | Double | The number equivalent of the price  |
| currencyCode    | String | The code of the price currency      |
| currencySymbol  | String | The code of the price currency      |
| localizedString | String | The currency in the user's language |

### AdaptyProductIntroEligibility

Defines if the user qualifies for an introductory offer for an iOS subscription.

| Field name      | Type                                                        | Description                                                  |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| vendorProductId | String                                                      | The ID of a product from an app store                        |
| eligibility     | [AdaptyEligibilityEnum](ff-resources#adaptyeligibilityenum) | Definition if the user qualifies for an introductory offer for an iOS subscription |

### AdaptyProductNonsubscriptions



| Field name       | Type                                                        | Description                                                  |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| product_id       | String                                                      | The ID of the products from an app store                     |
| nonsubscriptions | [AdaptyNonSubscription](ff-resources#adaptynonsubscription) | Information about non-subscription purchases. These can be one-time (consumable) products, unlocks (like new map unlock in the game), etc. |

### AdaptyProductSubscriptions



| Field name   | Type                                                  | Description                              |
| ------------ | ----------------------------------------------------- | ---------------------------------------- |
| product_id   | String                                                | The ID of the product from an app store  |
| subscription | [AdaptySubscription](ff-resources#adaptysubscription) | Information about subscription purchases |

### AdaptyProfile

Information on the user's profile

| Field name       | Type                                                         | Description                                                  |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| accessLevels     | List < Data ([AdaptyAccessLevelIdentifiers](ff-resources#adaptyaccesslevelidentifiers)) > | List of all access levels the belong to the user             |
| profileId        | String                                                       | The ID of the user profile                                   |
| customerUserId   | String                                                       | The ID of the user in the vendor's system                    |
| subscriptions    | List < Data (MapKeySubscriptions) >                          | The list of all subscriptions purchased by the user          |
| nonSubscriptions | List < Data (MapKeyNonSubscriptions) >                       | The list of all non0subscription products purchased by the user |

### AdaptyProfileParameters

Information on the user.

| Field name                    | Type                                                         | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| firstName                     | String                                                       | The first name of the user                                   |
| lastName                      | String                                                       | The last name of the user                                    |
| gender                        | [AdaptyGenderEnum](ff-resources#AdaptyGenderEnum)            | The gender of the user                                       |
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
| analyticsDisabled             | Boolean                                                      | Definition if the external[analytics is opted out for the user](analytics-integration#disabling-external-analytics-for-a-specific-customer) |
| customStringAttributes        | List < Data ([AdaptyCustomStringAttribute](ff-resources#adaptycustomstringattribute)) > | List of custom string attributes of the user                 |
| customDoubleAttributes        | List < Data ([AdaptyCustomDoubleAttribute](ff-resources#adaptycustomdoubleattribute)) > | List of custom double attributes of the user                 |

### AdaptySubscription

Information on subscription

| Field name                  | Type     | Description                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| activatedAt                 | DateTime | The time when this subscription was activated                |
| activeIntroductoryOfferType | String   | The type of an active introductory offer. If not `null, it means an offer was applied during this subscription period |
| activePromotionalOfferId    | String   | The ID of an active promotional offer (use for iOS)          |
| activePromotionalOfferType  | String   | The type of an active promotional offer (use for iOS). If not null, it means an offer was applied during this subscription period |
| cancellationReason          | String   | The reason why the subscription was canceled                 |
| expiresAt                   | DateTime | The subscription expiration time                             |
| renewedAt                   | DateTime | The time when the subscription was last renewed              |
| unsubscribedAt              | DateTime | The time when auto-renewal was turned off for the subscription. The subscription can still be active. Null if the user reactivated the subscription |
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



| Field name                          | Type                                                        | Description                                                  |
| ----------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| androidBasePlanId                   | String                                                      |                                                              |
| androidIntroductoryOfferEligibility | [AdaptyEligibilityEnum](ff-resources#adaptyeligibilityenum) | Definition if the user qualifies for an introductory offer for an iOS subscription |
| androidOfferId                      | String                                                      | The ID of an active promotional offer (use for Android)      |
| androidOfferTags                    | List < String >                                             |                                                              |
| introductoryOffer                   | List < Data (AdaptySubscriptionPhase) >                     | The ID of an introductory offer (use for iOS)                |
| localizedSubscriptionPeriod         | String                                                      | The period of the subscription in the user's language        |
| promotionalOffer                    | Data (AdaptySubscriptionPhase)                              | The ID of a promotional offer (use for iOS)                  |
| promotionalOfferEligibility         | Boolean                                                     | Definition if the user qualifies for an promotional offer for an iOS subscription |
| promotionalOfferId                  | String                                                      |                                                              |
| renewalType                         | [AdaptyRenewalTypeEnum](ff-resources#adaptyrenewaltypeenum) |                                                              |
| subscriptionGroupIdentifier         | String                                                      |                                                              |
| subscriptionPeriod                  | Data (AdaptySubscriptionPeriod)                             | The period of the subscription                               |



## Enums

Adapty enums (variables that are sets of predefined constants) delivered to FlutterFlow with the Adapty plugin.

### AdaptyEligibilityEnum

Defines if the user qualifies for an introductory offer for an iOS subscription.

| Field name                | Description |
|--------------------------|-------------|
| eligible | The user is eligible for an intro offer, it is safe to reflect this info in your UI | 
| ineligible | The user is not eligible to get any offer, you shouldn't present it in your UI |
| notApplicable | This product is not configured to have an offer |

### AdaptyGenderEnum

Defines user's gender.

| Field name | Description                                  |
| ---------- | -------------------------------------------- |
| none       | The gender is not set                        |
| female     | User's gender is female                      |
| male       | User's gender is male                        |
| Other      | The user has defined their gender as "other" |

### AdaptyPaymentModeEnum

Defines the payment model.

| Field name | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| payAsYouGo | A pricing model where customers are billed based on their actual usage or consumption of a product/service, rather than paying for a fixed fee upfront |
| payUpFront | A pricing model where customers are billed before they received the product/service. |
| freeTrial  | User is on a free trial period                               |
| unknown    | Pricing model is not defined                                 |

### AdaptyPeriodUnitEnum

Defines the units in which the periods are measured.

| Field name |             |
| ---------- | ----------- |
| day        | In days     |
| week       | In weeks    |
| month      | In months   |
| year       | In years    |
| unknown    | Not defined |

### AdaptyRenewalTypeEnum

Defines id the subscription is auto-renewable or not.

| Field name    | Description                                         |
| ------------- | --------------------------------------------------- |
| prepaid       | The subscription is prepaid and not auto-renewable. |
| autorenewable | The subscription is auto-renewable                  |

