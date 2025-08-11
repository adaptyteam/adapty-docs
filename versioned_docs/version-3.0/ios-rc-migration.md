---
title: "Migrate from RevenueCat to Adapty iOS SDK"
description: "Quickstart guide to migrating from RevenueCat to Adapty."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
---

import MigrationExample from '@site/src/components/SideBySide'

When migrating from RevenueCat to Adapty, you need to replace several SDK methods on the app side. Let's look at the most common functions and how to replace them with Adapty SDK and learn about their differences.

## Install SDK

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

try await AdaptyUI.activate()
`
}}
/>

## Work with users

### Identify users

#### On SDK activation

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

### Log users out

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

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code:
`Purchases.shared.attribution.setEmail("email@email.com")
Purchases.shared.attribution.setPhoneNumber("+18888888888")
Purchases.shared.attribution.setDisplayName("John Appleseed")

Purchases.shared.attribution.setPushToken(<APNS_PUSH_TOKEN>)
Purchases.shared.attribution.setPushTokenString("<ANPNS_PUSH_TOKEN>")`
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

<MigrationExample
beforeTitle="RevenueCat SDK"
before={{
language: "swift",
code: `Purchases.shared.attribution.setAdjustID("<ADJUST_ID>")
Purchases.shared.attribution.setAppsflyerID("<APPSFLYER_ID>")
Purchases.shared.attribution.setFBAnonymousID("<FB_ANONYMOUS_ID>")
Purchases.shared.attribution.setOnesignalID("<ONESIGNAL_ID>")
Purchases.shared.attribution.setOnesignalUserID("<ONESIGNAL_USER_ID>")
Purchases.shared.attribution.setMixpanelDistinctID("MIXPANEL_ID>")
Purchases.shared.attribution.setFirebaseAppInstanceID("FIREBASE_ID>")
Purchases.shared.attribution.setTenjinAnalyticsInstallationID("TENJIN_ID>")
Purchases.shared.attribution.setPostHogUserID("POSTHOG_USER_ID>")

Purchases.shared.attribution.setMparticleID("<MPARTICLE_ID>")
Purchases.shared.attribution.setAirshipChannelID("<AIRSHIP_CHANNEL_ID>")
Purchases.shared.attribution.setCleverTapID("<CLEVER_TAP_ID>")
Purchases.shared.attribution.setKochavaDeviceID("<KOCHAVA_DEVICE_ID>")

Purchases.shared.attribution.setMediaSource("MEDIA_SOURCE>")
Purchases.shared.attribution.setCampaign("CAMPAIGN>")
Purchases.shared.attribution.setAdGroup("ADGROUP>")
Purchases.shared.attribution.setAd("AD>")
Purchases.shared.attribution.setKeyword("KEYWORD>")
Purchases.shared.attribution.setCreative("CREATIVE>"`
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

### Get entitlements

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

### Get paywalls and products

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

RevenueCat doesn't have fallback paywalls but, if you use your own solution for handling them, you can replace it with the Adapty fallbacks:

```swift
let products = try await Purchases.shared.products(["product.id.1"])
let result = try await Purchases.shared.purchase(product: products[0])
```

### Accept web payments

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