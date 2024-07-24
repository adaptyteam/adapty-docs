---
title: "iOS – Install SDK (Liudmila)"
description: ""
metadataTitle: ""
---

Adapty offers two essential SDKs for seamless integration into your mobile app:

- **The primary Adapty SDK**: This is a foundational, obligatory SDK required for the operation of Adapty within your app.
- **AdaptyUI SDK**: This additional SDK is essential if you plan to use the Paywall Builder. The [Paywall Builder](paywall-builder-getting-started) is a convenient, user-friendly tool designed for a no-code approach. It empowers you to effortlessly create a subscription or other virtual product purchase page, known as a [Paywall](paywalls) in Adapty. This approach ensures seamless integration of paywalls directly into your iOS or Android apps as native layout pages.  
  The Adapty Paywall Builder is crafted to streamline the setup of core conversion-driving elements of paywalls with just a few clicks in the dashboard, eliminating the need to spend time on minor design tweaks and technical configurations. It also enables you to edit your paywall's native layout on the go by making visual changes in the Adapty web interface.  

Please refer to the compatibility table below to select the appropriate pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version | AdaptyUI SDK version |
| :----------------- | :------------------- |
| 2.7.x, 2.8.x       | 2.0.x                |
| 2.9.x - 2.10.0     | 2.1.2                |
| 2.10.1             | 2.1.3                |

You can install Adapty SDK and AdaptyUI SDK via CocoaPods, or Swift Package Manager.

:::note
Read the Checklist before releasing your app

Be sure to carefully read [Release Checklist](release-checklist) when releasing your app. It's critical to make things right from the first attempt!
:::

### Install SDKs via CocoaPods

Add Adapty to your `Podfile`:

```shell title="Podfile"
pod 'Adapty', '~> 2.10.2'
pod 'AdaptyUI', '~> 2.1.3'
```

And then run:

```sh title="Shell"
pod install
```

This creates a `.xcworkspace` file for your app. Use this file for all future development of your application.

### Install SDKs via Swift Package Manager

1. In Xcode go to _File_ -> _Swift Packages_ -> _Add Package Dependency..._
2. Enter the repository URL `https://github.com/adaptyteam/AdaptySDK-iOS.git`
3. Choose the version, and click the **Add package**button. Xcode will add the package dependency to your project, and you can import it.
4. In the **Choose Package Products** window, click click the **Add package**button once again. The package will appear in the **Packages** list. 
5. Repeat steps 2-3 for AdaptyUI SDK URL: `https://github.com/adaptyteam/AdaptyUI-iOS.git`.