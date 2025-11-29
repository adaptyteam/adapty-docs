---
title: "Get started with Apple Ads Manager"
description: "Import your historical data from Apple Ads and start getting real-time updates on the dashboard"
metadataTitle: "Apple Ads Manager | Adapty Docs"
keywords: ['apple ads manager', 'asa']
---
import ZoomImage from '@site/src/components/ZoomImage';

[Apple Ads Manager](adapty-ads-manager.md) is your optimization and analytics platform for Apple Ads.

In this guide, you will learn how to start working with Apple Ads Manager in two steps:

1. Install the Adapty SDK and let it track your purchase data.
2. Connect Apple Ads Manager to your Apple Ads account to import your historical data and start tracking real-time updates.

## 1. Install the Adapty SDK

To connect your revenue data with the campaign performance, let Adapty keep track of your purchases:

1. Install the Adapty SDK for your platform in the app code. Basically, at this stage you only need to add the SDK to your project and activate it:
    - [iOS](sdk-installation-ios.md)
    - [Android](sdk-installation-android.md)
    - [Flutter](sdk-installation-flutter.md)
    - [React Native](sdk-installation-reactnative.md)
    - [Unity](sdk-installation-unity.md)
    - [Kotlin Multiplatform](sdk-installation-kotlin-multiplatform.md)
    - [Capacitor (Beta)](sdk-installation-capacitor.md)
2. The next step depends on whether you already have in-app purchases implemented:
    - If you don't have in-app purchases implemented yet, complete the steps from the [quickstart guide](quickstart.md) to delegate handling purchases to Adapty. 
    - If you already have in-app purchases implemented without Adapty and don't plan to migrate to Adapty, [enable the observer mode](observer-vs-full-mode.md), so Adapty can access the transaction data.

## 2. Connect Apple Ads

:::important
You need to have the **Account Admin** role in Apple Ads to connect Apple Ads to Adapty.
:::

Now, you need to connect your Apple Ads Manager account to your Apple Ads account:

1. On the Adapty dashboard, switch to Apple Ads Manager on the top left.

<ZoomImage id="apple-ads.webp" width="500px" />

2. Click **Continue with Apple**.

<ZoomImage id="continue-with-apple.webp" width="700px" />

3. Sign in to your Apple account.
4. Select which access you want to give to Apple Ads Manager:
- **Read and Write**: Provide access to all campaign groups. 
- **Limited access**: Choose specific campaign groups and assign the **Read & Write** role to grant access only to those groups.

<ZoomImage id="apple-ads-access.webp" width="700px" />

5. Click **Grant access**.

<ZoomImage id="grant-access.webp" width="300px" />

After that, Adapty will start syncing your historical data from Apple Ads. You can already start exploring Adapty Ads Manager, but it will take some time until all the historical data is imported.

## What's next

After you've successfully synced your transaction data, proceed with learning how to:
- [Manage your campaigns, ad groups, and keywords](ads-manager.md)
- [Set up automation rules to adjust bids based on the campaign performance](ads-manager-automations.md)