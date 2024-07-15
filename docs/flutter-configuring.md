---
title: "Flutter – Configure Adapty SDK"
description: ""
metadataTitle: ""
---

#### iOS

Create `Adapty-Info.plist` and add it to you project. Add the flag `AdaptyPublicSdkKey` in this file with the value of your Public SDK key.

```xml Adapty-Info.plist
<dict>
    <key>AdaptyPublicSdkKey</key>
    <string>PUBLIC_SDK_KEY</string>
</dict>
```

##### StoreKit 2 Usage

Also you can add `AdaptyStoreKit2Usage` key. This value controls StoreKit 1 and 2 API utilisation. Read more in the [Displaying Paywalls & Products](https://docs.adapty.io/docs/displaying-products#adapty-sdk-version-250-and-higher) section.

```xml Adapty-Info.plist
<dict>
    <key>AdaptyStoreKit2Usage</key>
    <string>intro_eligibility_check</string>
</dict>
```

#### Android

1. Add the flag `AdaptyPublicSdkKey` into the app’s `AndroidManifest.xml` \(Android) file with the value of your Public SDK key. 

```xml AndroidManifest.xml
<application ...>
       ...
       <meta-data
              android:name="AdaptyPublicSdkKey"
              android:value="PUBLIC_SDK_KEY" />
</application>
```



:::note
Public SDK key can be found in your app settings in the [Adapty Dashboard](https://app.adapty.io/settings/general) `App settings` > `General`.
:::

2. In your application, add:

```javascript Flutter
import 'package:adapty_flutter/adapty_flutter.dart';
```

3. Activate Adapty SDK with the following code:

```javascript Flutter
try {
	Adapty().activate();
} on AdaptyError catch (adaptyError) {}
} catch (e) {}
```

:::warning
Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.
:::

:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

### Logging system

Adapty logs errors and other important information to help you understand what is going on. There are three levels available:

1. error: only errors will be logged
2. warn: messages from the SDK that do not cause critical errors, but are worth paying attention to
3. info: various information messages, such as those that log the lifecycle of various modules
4. verbose: any additional information that may be useful during debugging, such as function calls, API queries, etc.

You can set `logLevel` in your app before configuring Adapty.

```javascript Flutter
try {
	await Adapty().setLogLevel(AdaptyLogLevel.verbose);
} on AdaptyError catch (adaptyError) {
} catch (e) {}
```