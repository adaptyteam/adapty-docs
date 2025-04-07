---
title: "Installation of Adapty SDK"
description: "Install Adapty SDKs for iOS, Android, and cross-platform apps."
metadataTitle: "Installing Adapty SDKs | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

<img src = "https://camo.githubusercontent.com/e58b312c50330077d2570b9431cc838b7d4849b3c826913bd1d85f32e43e40f6/68747470733a2f2f6164617074792d706f7274616c2d6d656469612d70726f64756374696f6e2e73332e616d617a6f6e6177732e636f6d2f6769746875622f6164617074792d736368656d612e706e67" style={{ width: "100%" }}/>

Adapty's SDK provides a complete set of tools for integrating the Adapty platform into your mobile app. To download the SDK, use one of the following links:

- [iOS](https://github.com/adaptyteam/AdaptySDK-iOS)
- [Android](https://github.com/adaptyteam/AdaptySDK-Android)
- [Flutter](https://github.com/adaptyteam/AdaptySDK-Flutter)
- [React Native](https://github.com/adaptyteam/AdaptySDK-React-Native)
- [Unity](https://github.com/adaptyteam/AdaptySDK-Unity)

To download the latest version of the SDK:
1. Click the **\<\> Code** button on the repository page, copy the URL to your clipboard, and run `git clone <copied_url>` in your terminal. If you are developing an iOS app and using Xcode, you don’t need to download the SDK from GitHub.
2. Alternatively, navigate to the **Releases** section (located in the right panel on GitHub), select the release you need, and download the `.zip` or `.tar.gz` archive.

:::info
If you’re using an older version of Adapty SDK and want to upgrade to version 3.x, we recommend following our [Migration guide to Adapty SDK v.3.x or later](migration-to-adapty-sdk-v3).
:::

## What's Included in Adapty's SDKs

All Adapty SDKs include the following components:

- **Core SDK: Adapty**  
  This is the main SDK required for the proper functioning of Adapty within your app.

- **Optional SDK: AdaptyUI**  
  This SDK is necessary if you use the Adapty Paywall Builder—a user-friendly, no-code tool for creating cross-platform paywalls. These paywalls are designed using a visual constructor directly in the Adapty dashboard, run natively on the device, and require minimal effort to create high-performing designs.

- **Adapty Demo Apps**  
  These demo apps are designed to demonstrate how to work with paywalls in Adapty. With minimal functionality, they serve as both a tutorial and a practical example. This section includes apps that utilize paywalls created with the Paywall Builder.

## Installation and Configuration

Follow the instructions provided in the respective repositories to install and configure the SDK for your platform.

- [iOS](sdk-installation-ios)
- [Android](sdk-installation-android)
- [Flutter](sdk-installation-flutter)
- [React Native](sdk-installation-reactnative) 
- [Unity](sdk-installation-unity)

<SampleApp />
