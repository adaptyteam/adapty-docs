---
title: "Advanced transaction management in iOS SDK"
description: "Finish transactions manually in your iOS app with Adapty SDK."
metadataTitle: "Advanced transaction management | iOS SDK | Adapty Docs"
displayed_sidebar: sdkios
---
import ZoomImage from '@site/src/components/ZoomImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
Advanced transaction management is supported in the Adapty iOS SDK starting from version 3.12.
:::

Advanced transaction management in Adapty gives you more control over how transactions are handled, verified, and finished.

Advanced transaction management introduces three optional features that work together:

| Feature                                                     | Purpose |
|-------------------------------------------------------------|----------|
| [`appAccountToken`](#assign-appaccounttoken)                | Links Apple transactions to your internal user ID |
| [`jwsTransaction`](#access-the-jws-representation)          | Provides Apple’s signed transaction payload for validation |
| [Manual finishing](#control-transaction-finishing-behavior) | Lets you finish transactions only after your backend confirms success |

Together, these tools let you build robust custom validation flows while Adapty continues syncing transactions with its backend.

:::important
Most apps don’t need this.
By default, Adapty automatically validates and finishes StoreKit transactions.  
Use this guide only if you run your own backend validation or want to fully control the purchase lifecycle.
:::

## Assign `appAccountToken`

[`appAccountToken`](https://developer.apple.com/documentation/storekit/product/purchaseoption/appaccounttoken(_:)) is a **UUID** that lets you link App Store transactions to your internal user identity.  
StoreKit associates this token with every transaction, so your backend can match App Store data to your users.

Use a stable UUID generated per user and reuse it for the same account across devices.
This ensures that purchases and App Store notifications stay correctly linked.

You can set the token in two ways – during the SDK activation or when identifying the user.

:::important
You must always pass `appAccountToken` together with `customerUserId`.
If you pass only the token, it will not be included in the transaction.
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
// During configuration:
let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "PUBLIC_SDK_KEY")
        .with(customerUserId: "YOUR_USER_ID", withAppAccountToken: UUID())

do {
  try await Adapty.activate(with: configurationBuilder.build())
} catch {
  // handle the error
}

// Or when identifying a user:
do {
    try await Adapty.identify("YOUR_USER_ID", withAppAccountToken: UUID())
} catch {
    // handle the error
}
```
</TabItem>

<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
// During configuration:
let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "PUBLIC_SDK_KEY")
        .with(customerUserId: "YOUR_USER_ID", withAppAccountToken: <APP_ACCOUNT_TOKEN>)

Adapty.activate(with: configurationBuilder.build()) { error in
  // handle the error
}

// Or when identifying a user:
Adapty.identify("YOUR_USER_ID", withAppAccountToken: <APP_ACCOUNT_TOKEN>) { error in
    if let error {
        // handle the error
    }
}
```
</TabItem>
</Tabs>

## Access the JWS representation 

When you make a purchase, the result includes Apple’s transaction in [JWS Compact Serialization format](https://developer.apple.com/documentation/storekit/verificationresult/jwsrepresentation-21vgo).
You can forward this value to your backend for independent validation or logging.

```swift
let result = try await Adapty.makePurchase(product: paywallProduct)
let jwsRepresentation = result.jwsTransaction
```

## Control transaction finishing behavior

<ZoomImage id="transaction-management.png" width="700px" />

By default, Adapty automatically finishes StoreKit transactions after validation.
If you need to delay finishing until your backend confirms success, set the finishing behavior to manual.

In this mode:
- Adapty still validates purchases and syncs them with its backend.
- Transactions remain unfinished until you explicitly call `finish()`.

```swift
var configBuilder = AdaptyConfiguration
    .builder(withAPIKey: "YOUR_API_KEY")
    .with(transactionFinishBehavior: .manual)

try await Adapty.activate(with: configBuilder.build())   
```

When using manual transaction finishing, you need to implement the `onUnfinishedTransaction` delegate method to handle unfinished transactions:

```swift showLineNumbers title="Swift"
extension YourApp: AdaptyDelegate {
    func onUnfinishedTransaction(_ transaction: AdaptyUnfinishedTransaction) async {
        // Perform your custom validation logic here
        
        // When ready, finish the transaction
        await transaction.finish()
    }
}
```

To get all current unfinished transactions, use the `getUnfinishedTransactions()` method:

```swift
let unfinishedTransactions = try await Adapty.getUnfinishedTransactions()
```
