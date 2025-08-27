---
title: "Migrate from RevenueCat to Adapty iOS SDK"
description: "Quickstart guide to migrating from RevenueCat to Adapty."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
---

import MigrationExample from '@site/src/components/SideBySide'

When migrating from RevenueCat to Adapty, you need to replace several SDK methods on the app side. Let's look at the most common functions and how to replace them with Adapty SDK and learn about their differences.

## Install SDK

Set up the log level and activate the SDK. 

Unlike RevenueCat's synchronous configuration, Adapty uses `async/await` for activation, so you'll need to handle potential [network errors](troubleshooting-test-purchases.md) during initialization.

:::important
If you're using or going to use paywalls created in the [Adapty paywall builder](adapty-paywall-builder.md), you also need to activate the AdaptyUI module responsible for rendering paywalls.
:::

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: 
`Purchases.logLevel = .verbose

Purchases.configure(
    with: .init(withAPIKey: <API_KEY>)
)`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `Adapty.logLevel = .verbose

try await Adapty.activate(
    with: .builder(withAPIKey: <API_KEY>)
    .build()
)

// If you're using the paywall builder, activate the AdaptyUI module
try await AdaptyUI.activate()
`
}}
/>

:::note
See more [parameters](sdk-installation-ios) that can be configured on the SDK activation.
:::

## Work with users

### Identify users

#### On SDK activation

In Adapty, `customerUserId` is equivalent to `appUserId` in RevenueCat. If you know it on the SDK activation, you can set it right away, so anonymous users are not created.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code:
`Purchases.logLevel = .verbose

Purchases.configure(
    with: .init(withAPIKey: <API_KEY>)
        .with(appUserID: <USER_ID>)
)`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `Adapty.logLevel = .verbose

try await Adapty.activate(
    with: .builder(withAPIKey: <API_KEY>)
        .with(customerUserId: <USER_ID>)
        .build()
)

try await AdaptyUI.activate()
`
}}
/>

#### After SDK activation

If you are setting the user ID after the SDK activation, in Adapty, you use the `identify` method for it.

Unlike RevenueCat's `logIn()` which returns customer info and creation status, Adapty's `identify()` is simpler and doesn't return additional data.

Note the important difference:
- In RevenueCat, your users always have one main ID.
- In Adapty, users **always** have profile IDs set by Adapty and **may** have customer user IDs set by you. Read [more](ios-quickstart-identify.md).

:::warning
**Critical Migration Note:** Unlike RevenueCat which merges profiles when users log in, Adapty doesn't merge profiles. This means if a user logs in with a different ID, their previous profile data won't be automatically transferred. Plan your user migration strategy accordingly.
:::

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code:
`let userId = "<USER_ID>"

let (customerInfo, created) = try await Purchases.shared.logIn(userId)`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `let userId = "<USER_ID>"

try await Adapty.identify(userId)`
}}
/>

:::warning
Resubmitting of significant user data

In some cases, such as when a user logs into their account again, Adapty's servers already have information about that user. In these scenarios, the Adapty SDK will automatically switch to work with the new user. If you passed any data to the anonymous user, such as custom attributes or attributions from third-party networks, you should resubmit that data for the identified user.

It's also important to note that you should re-request all paywalls and products after identifying the user, as the new user's data may be different.
:::

### Log users out

In Adapty, just like RevenueCat, logging users out creates new anonymous users.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `let customerInfo = try await Purchases.shared.logOut()`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `try await Adapty.logout()`
}}
/>

### Update user attributes

Set user profile information and custom attributes. RevenueCat uses individual `attribution.set*()` methods while Adapty uses a builder pattern with `AdaptyProfileParameters.Builder()` and `updateProfile(params:)`.

Unlike RevenueCat's separate method calls, Adapty batches all attributes into a single request. Adapty also supports additional fields like gender, birthday, and custom attributes with type validation.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code:
`Purchases.shared.attribution.setEmail("email@email.com")
Purchases.shared.attribution.setPhoneNumber("+18888888888")
Purchases.shared.attribution.setDisplayName("John Appleseed")`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `let builder = AdaptyProfileParameters.Builder()
    .with(email: "email@email.com")
    .with(phoneNumber: "+18888888888")
    .with(firstName: "John")
    .with(lastName: "Appleseed")
    .with(gender: .other)
    .with(birthday: Date())
    .with(customAttribute: "stringValue", forKey: "stringKey")
    .with(customAttribute: 1.0, forKey: "doubleKey")

try await Adapty.updateProfile(params: builder.build())`
}}
/>

## Set up integrations

Set up third-party analytics and attribution. RevenueCat uses specific methods like `setAdjustID()` and `setAppsflyerID()`, while Adapty uses a unified `setIntegrationIdentifier(key:value:)` method with predefined keys like `"adjust_device_id"` and `"appsflyer_id"`.

Unlike RevenueCat's individual method calls, Adapty batches integration identifiers into a single request for better performance. You can also set multiple integrations at once using `setIntegrationIdentifiers([key: value])`.

:::note
The following integrations are not yet supported in Adapty:
- mParticle
- AirShip
- CleverTap
- Kochava
:::

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `Purchases.shared.attribution.setAdjustID("<ADJUST_ID>")
Purchases.shared.attribution.setAppsflyerID("<APPSFLYER_ID>")
Purchases.shared.attribution.setFBAnonymousID("<FB_ANONYMOUS_ID>")
Purchases.shared.attribution.setOnesignalID("<ONESIGNAL_ID>")
Purchases.shared.attribution.setOnesignalUserID("<ONESIGNAL_USER_ID>")
Purchases.shared.attribution.setMixpanelDistinctID("<MIXPANEL_ID>")
Purchases.shared.attribution.setFirebaseAppInstanceID("<FIREBASE_ID>")
Purchases.shared.attribution.setTenjinAnalyticsInstallationID("<TENJIN_ID>")
Purchases.shared.attribution.setPostHogUserID("<POSTHOG_USER_ID>")`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `try await Adapty.setIntegrationIdentifier(key: "adjust_device_id", value: "<ADJUST_ID>")
try await Adapty.setIntegrationIdentifier(key: "appsflyer_id", value: "<APPSFLYER_ID>")
try await Adapty.setIntegrationIdentifier(key: "facebook_anonymous_id", value: "<FB_ANONYMOUS_ID>")
try await Adapty.setIntegrationIdentifier(key: "one_signal_subscription_id", value: "<ONESIGNAL_ID>")
try await Adapty.setIntegrationIdentifier(key: "mixpanel_user_id", value: "MIXPANEL_ID>")
try await Adapty.setIntegrationIdentifier(key: "firebase_app_instance_id", value: "FIREBASE_ID>")
try await Adapty.setIntegrationIdentifier(key: "tenjin_analytics_installation_id", value: "TENJIN_ID>")
try await Adapty.setIntegrationIdentifier(key: "posthog_distinct_user_id", value: "POSTHOG_USER_ID>")
`
}}
/>

## Manage entitlements

Check subscription status and listen for changes.

### Get entitlements

RevenueCat uses `customerInfo.entitlements` while Adapty uses `profile.accessLevels`.

Unlike RevenueCat's `EntitlementInfo` which contains detailed subscription data, Adapty's `AccessLevel` focuses on access status and provides a simpler interface for checking premium features.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `let customerInfo = try await Purchases.shared.customerInfo()

if customerInfo.entitlements["<ENTITLEMENT_ID>"]?.isActive == true {
// user has access to premium features
}`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `let profile = try await Adapty.getProfile()

if profile.accessLevels["<ENTITLEMENT_ID>"]?.isActive == true {
// user has access to premium features
}`
}}
/>

### Listen for entitlement updates

For delegates, RevenueCat uses `purchases(_:receivedUpdated:)` while Adapty uses `didLoadLatestProfile(_:)`.

Note that Adapty's delegate method is marked as `nonisolated`, meaning it can be called from any thread, unlike RevenueCat's main-thread delegate pattern.

RevenueCat also provides a modern Swift Concurrency API with `customerInfoStream` for async iteration, while Adapty only supports the delegate pattern.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `Purchases.shared.delegate = self

func purchases(_ purchases: Purchases, receivedUpdated customerInfo: CustomerInfo) {
// handle any changes to subscription state
}`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `Adapty.delegate = self

nonisolated func didLoadLatestProfile(_ profile: AdaptyProfile) {
// handle any changes to subscription state
}`
}}
/>

## Restore purchases

Restore purchases from the App Store. Both SDKs use similar methods: RevenueCat's `restorePurchases()` returns `customerInfo` while Adapty's returns `profile` with access levels.

Unlike RevenueCat which may force users to enter their App Store password, Adapty's restore process is more seamless and doesn't require user authentication.

Both SDKs automatically sync transactions in the background, but manual restore is still needed in certain scenarios. RevenueCat syncs on app launch and purchase completion, while Adapty syncs transactions once per profile and automatically updates profile data every 60 seconds. See [Listen for entitlement updates](#listen-for-entitlement-updates) for how to receive these updates.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `let customerInfo = try await Purchases.shared.restorePurchases()

// check customerInfo for active entitlements`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `let profile = try await Adapty.restorePurchases()

// check profile for active access levels`
}}
/>

## Display paywalls and products

Display paywalls and products. For UI paywalls, RevenueCat uses `presentPaywallIfNeeded()` while Adapty uses the `.paywall()` modifier.

### Get paywalls and products

In RevenueCat, you get offerings and then get the current offering for a placement ID.

In Adapty, you first request a [paywall](paywalls.md) and then call for products with [`Adapty.getPaywallProducts`](fetch-paywalls-and-products#fetch-products).

:::important
**Key differences:**
- RevenueCat prewarms offerings at startup, so you can access them immediately. In Adapty, you need to explicitly request paywalls when you need them
- RevenueCat packages are accessible by type (`.lifetime`, `.annual`, etc.), so you can use `offering.lifetime`. In Adapty, products are just an array, so you'll need to iterate through them or find by ID
- RevenueCat allows requesting products without paywalls, so you can call `Purchases.shared.products()`. In Adapty, you must [create a paywall and placement](quickstart-paywalls.md) first, then request products through that system
- RevenueCat placements are optional (for targeting), so you can access `offerings.current`. In Adapty, placements are required, so you must specify a placement ID
:::

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `let offerings = try await Purchases.shared.offerings()

guard let offering = offerings.currentOffering(forPlacement: "<PLACEMENT_ID>") else {
return
}

let packages = offering.availablePackages

// present offering (paywall) and packages (products)`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `let paywall = try await Adapty.getPaywall(placementId: "<PLACEMENT_ID>")
let products = try await Adapty.getPaywallProducts(paywall: paywall)

// present paywall and products`
}}
/>

### Display paywalls created in the paywall builder

:::important
If you are using the [paywall builder](adapty-paywall-builder.md), don't forget to [initialize the AdaptyUI module](#install-sdk).
:::

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `import RevenueCatUI
import SwiftUI

struct RCPaywallParentView: View {
    var body: some View {
        EmptyView()
            .presentPaywallIfNeeded(
                requiredEntitlementIdentifier: RCConstants.entitlementIdentifier,
                purchaseCompleted: { customerInfo in },
                restoreCompleted: { customerInfo in },
                restoreFailure: { error in },
        )
    }
}`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `import AdaptyUI
import SwiftUI

struct ADPaywallParentView: View {
@State var isPresented = false
@State var config: AdaptyUI.PaywallConfiguration

    var body: some View {
        EmptyView()
            .paywall(
                isPresented: $isPresented,
                paywallConfiguration: config,
                didFailPurchase: { product, error in },
                didFinishRestore: { profile in },
                didFailRestore: { error in },
                didFailRendering: { error in }
            )
    }
}`
}}
/>

### Use fallback paywalls

RevenueCat doesn't have fallback paywalls but, if you use your own solution for handling them, you can replace it with the Adapty fallbacks.

```swift
let products = try await Purchases.shared.products(["product.id.1"])
let result = try await Purchases.shared.purchase(product: products[0])
```

### Accept web payments

Both SDKs support web payments, but Adapty provides more flexibility by allowing you to create web paywall URLs for either the entire paywall or individual products.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `// assuming at this point we already have a package / product
let url = package.webCheckoutUrl`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `// assuming at this point we already have a package / product
let url = try await Adapty.createWebPaywallUrl(for: paywall)

// or

let url = try await Adapty.createWebPaywallUrl(for: product)`
}}
/>

## Handle purchases

Handle purchases and offers. RevenueCat's `purchase(product:)` returns a tuple with `userCancelled` boolean, while Adapty's `makePurchase(product:)` returns an enum with `.userCancelled`, `.pending`, and `.success` cases.

Unlike RevenueCat which requires manual handling of promotional and win-back offers, Adapty automatically applies eligible offers during purchase.

### Subscriptions (including Non-Renewing)

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `// assuming at this point we already have a package / product
// Calling .purchase(package:) is also possible
let result = try await Purchases.shared.purchase(product: product)

if result.userCancelled {
// user cancelled the purchase
}

let customerInfo = result.customerInfo
let transaction = result.transaction

// handle successful purchase`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `// assuming at this point we already have a product

let result = try await Adapty.makePurchase(product: product)

switch result {
case .userCancelled:
// user cancelled the purchase
case .pending:
// purchase is in a pending state
case let .success(profile, transaction):
// handle successful purchase
}`
}}
/>

### Offers

#### Introductory offers

RevenueCat requires explicit eligibility checking, while Adapty provides offer information directly on the product.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `// assuming at this point we already have a package / product

let eligibility = Purchases.shared.checkTrialOrIntroDiscountEligibility(product: product)

if eligibility == .eligible {
// show trial/introductory terms
}`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `// assuming at this point we already have a product

if let offer = product.subscriptionOffer {
// if offer exists, then user is eligible
}`
}}
/>

#### Promotional offers

RevenueCat requires manual offer retrieval and application, while Adapty automatically applies eligible promotional offers.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `// assuming at this point we already have a package

let promoOffers = await package.storeProduct.eligiblePromotionalOffers()

guard let promoOffer = promoOffers.first else { return }

try await Purchases.shared.purchase(
package: package,
promotionalOffer: promoOffer
)

// or alternatively using builder

let purchaseParams = PurchaseParams.Builder(package: package)
.with(promotionalOffer: promoOffer)
.build()

try await Purchases.shared.purchase(purchaseParams)`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `// Eligible Promo Offer is being applied automatically`
}}
/>

#### Win-back offers

RevenueCat requires manual offer retrieval and application, while Adapty automatically applies eligible win-back offers.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `// assuming at this point we already have a package

let winBackOffers = try await Purchases.shared.eligibleWinBackOffers(
forPackage: package
)

guard let winBackOffer = winBackOffers.first else { return }

let purchaseParams = PurchaseParams.Builder(package: package)
.with(winBackOffer: winBackOffer)
.build()

try await Purchases.shared.purchase(purchaseParams)
`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `// Eligible Win-back Offer is being applied automatically`
}}
/>

#### Offer codes

Both SDKs use the same method name for presenting the code redemption sheet.

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `Purchases.shared.presentCodeRedemptionSheet()`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `Adapty.presentCodeRedemptionSheet()`
}}
/>

#### Observer Mode

Configure the SDK to observe transactions without completing them. This is useful when you want to handle transaction completion in your own code.

:::important
Unlike RevenueCat which only requires `recordPurchase` for SK2 on macOS, Adapty requires `reportTransaction` for every purchase regardless of platform or StoreKit version.
:::

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `// configure the sdk
Purchases.configure(
    with: .init(withAPIKey: <API_KEY>)
        .with(purchasesAreCompletedBy: .myApp, storeKitVersion: .storeKit2)
)

// then report transactions (SK2 + macOS only)
try await Purchases.shared.recordPurchase(<PURCHASE_RESULT>)`
}}
afterTitle="Adapty SDK"
after={{
language: "swift",
code: `// configure the sdk
try await Adapty.activate(
    with: .builder(withAPIKey: <API_KEY>)
        .with(observerMode: true)
        .build()
)

// then report transactions
try await Adapty.reportTransaction(transaction, withVariationId: <YOUR_PAYWALL_VARIATION_ID>)`
}}
/>

## Current limitations

Some RevenueCat features are not yet available in Adapty:

- **Customer center** – Implement your own customer support interface if you need it
- **Show "Manage subscriptions"** – Use App Store's built-in subscription management
- **Refund requests** 
- **Web purchase redemption links**
- **APNS push tokens** - RevenueCat supports setting push tokens
- **mParticle, AirShip, CleverTap, Kochava** - These integrations are not supported
- **Virtual currencies** - RevenueCat has built-in virtual currency tracking for consumables. Build custom virtual currency tracking if needed

