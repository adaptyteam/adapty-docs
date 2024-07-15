---
title: "iOS – Install AdaptyUI SDK"
description: ""
metadataTitle: ""
---

Begin configuring the Adapty paywall builder by installing the AdaptyUI SDK. Note that the AdaptyUI SDK is necessary only if you intend to use the paywalls created with the Paywall Builder.

You can easily install the AdaptyUI SDK via CocoaPods or Swift Package Manager.

### Install via CocoaPods

Add Adapty to your `Podfile`:

```shell Podfile
pod 'AdaptyUI', '~> 2.1.5'
```

And then run:

```sh
pod install
```

This creates an `.xcworkspace` file for your app. Use this file for all future development of your application.

### Install via Swift Package Manager

1. In Xcode go to _File_ > _Swift Packages_ > _Add Package Dependency..._
2. Enter the repository URL `https://github.com/adaptyteam/AdaptyUI-iOS.git`
3. Choose the version, and click **Next**. Xcode will add the package dependency to your project, and you can import it.

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version | AdaptyUI SDK version |
| :----------------- | :------------------- |
| 2.7.x, 2.8.x       | 2.0.x                |
| 2.9.x - 2.10.0     | 2.1.2                |
| 2.10.1             | 2.1.3                |
| 2.10.3 or later    | 2.1.5                |