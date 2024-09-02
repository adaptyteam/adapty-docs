---
title: "iOS – Install Adapty SDK"
description: ""
metadataTitle: ""
---

You can install Adapty SDK via CocoaPods, or Swift Package Manager.

:::note
Read Checklist before releasing your app

Be sure to carefully read [Release Checklist](release-checklist) when releasing your app. It's critical to make things right from the first attempt!
:::

Make sure to **set Swift 5.0+ for Adapty pod in case your app is using the older version**.

### Install via CocoaPods

Add Adapty to your `Podfile`:

```shell title="Podfile"
pod 'Adapty', '~> 2.11.3'
```

And then run:

```sh title="Shell"
pod install
```

This creates a `.xcworkspace` file for your app. Use this file for all future development of your application.

### Install via Swift Package Manager

1. In Xcode go to _File_ > _Swift Packages_ > _Add Package Dependency..._
2. Enter the repository URL `https://github.com/adaptyteam/AdaptySDK-iOS.git`
3. Choose the version, and click Next. Xcode will add the package dependency to your project, and you can import it.