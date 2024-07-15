---
title: "React Native — Install AdaptyUI SDK"
description: ""
metadataTitle: ""
---

Begin configuring the Adapty paywall builder by installing the AdaptyUI SDK. Note that the AdaptyUI SDK is necessary only if you intend to use the paywalls created with the Paywall Builder.

### Requirements

You currently need to have a `react-native-adapty` of version 2.4.7 or higher to use UI SDK.

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version | AdaptyUI version |
| :----------------- | :--------------- |
| 2.7.0 – 2.9.2      | 2.0.0 - 2.0.1    |
| 2.9.3 - 2.9.8      | 2.1.0            |
| 2.10.0             | 2.1.1            |
| 2.10.1 or later    | 2.1.2            |

### Installation

1. Add the dependency to your project

```shell yarn
yarn add @adapty/react-native-ui
```
```shell pnpm
pnpm add @adapty/react-native-ui
```
```shell npm
npm add @adapty/react-native-ui
```

2. (iOS target) Install pods provided by new dependency

```shell
pod install --project-directory=ios/
```

3. (iOS target) Minimal supported iOS version is 13.0, if you see an error during pod installation, find this line in your `ios/Podfile` and update the minimal target. Then you should be able to perform `pod install` successfully

```diff Podfile
-platform :ios, min_ios_version_supported
+platform :ios, 13.0
```