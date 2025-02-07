---
title: "Kids Mode"
description: "Easily enable Kids Mode to comply with Apple and Google policies. No IDFA, GAID, or ad data collected."
metadataTitle: "Kids Mode  | Adapty Docs"
---
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

If your application is intended for kids, you must follow the policies of [Apple](https://developer.apple.com/app-store/kids-apps/) and [Google](https://support.google.com/googleplay/android-developer/answer/9893335). If you're using the Adapty SDK, a few simple steps will help you configure it to meet these policies and pass app store reviews. The exact steps vary by platform, but none will take more than 10 minutes.

### What’s required?

You need to configure the Adapty SDK to **disable the collection of**:

- [IDFA (Identifier for Advertisers)](https://en.wikipedia.org/wiki/Identifier_for_Advertisers)
- [Android Advertising ID (AAID/GAID)](https://support.google.com/googleplay/android-developer/answer/6048248)
- Any other advertising-related data

## Kids Mode for iOS

To enable Kids Mode in the Adapty SDK using CocoaPods:
1. Add the following to the end of your **Podfile** or merge :

    ```ruby showLineNumbers title="Podfile"
    post_install do |installer|
      installer.pods_project.targets.each do |target|
        if target.name == 'Adapty'
          target.build_configurations.each do |config|
            config.build_settings['OTHER_SWIFT_FLAGS'] ||= ['$(inherited)']
            config.build_settings['OTHER_SWIFT_FLAGS'] << '-DADAPTY_KIDS_MODE'
          end
        end
      end
    end
    ```
2. Run the following command to apply the changes:

   ```sh showLineNumbers title="Shell"
   pod install
   ```

## Kids Mode for Android

To comply with policies, you need to disable the collection of the Android Advertising ID when initializing the Adapty SDK:

<Tabs>

<TabItem value="Kotlin" label="Kotlin" default>

```kotlin showLineNumbers
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(true) // set to `true`
      // highlight-end
          .build()
    )  
}
```

</TabItem>
<TabItem value="Java" label="Java" default>

```java showLineNumbers
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(false) // set to `true`
      // highlight-end
          .build()
    );
}
```

</TabItem> 

</Tabs>

<!---

 ## Kids Mode in Flutter

In order to comply with policies, disable the collection of user's IDFA (for iOS) and GAID (for Android) when configuring the Adapty SDK as follows: 

```dart showLineNumbers title="Dart"
try {
    await Adapty().activate(
        configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
      // highlight-start
          ..withIdfaCollectionDisabled(false),
      // highlight-end
    );
} catch (e) {
    // handle the error
}
```

## Kids Mode for React Native

In order to comply with policies, disable the collection of user's IDFA (for iOS) and GAID (for Android) when configuring the Adapty SDK as follows: 

<Tabs>

<TabItem value="RN" label="React Native (TS)" default> 

In order to comply with policies, disable the collection of user's IDFA (for iOS) and GAID (for Android) when configuring the Adapty SDK as follows: 

```typescript showLineNumbers
adapty.activate('PUBLIC_SDK_KEY', {
  observerMode: false,
  customerUserId: 'YOUR_USER_ID',
  logLevel: 'error',
  __debugDeferActivation: false,
  ipAddressCollectionDisabled: false,
  ios: {
    idfaCollectionDisabled: false,
  },
});
```

</TabItem> 

<TabItem value="JavaScript" label="React Native (JS)" default>

In order to comply with policies, disable the collection of user's IDFA (for iOS) and GAID (for Android) when configuring the Adapty SDK as follows: 

```javascript showLineNumbers
import { IosStorekit2Usage, LogLevel } from 'react-native-adapty';

adapty.activate('PUBLIC_SDK_KEY', {
  observerMode: false,
  customerUserId: 'YOUR_USER_ID',
  logLevel: LogLevel.ERROR,
  __debugDeferActivation: false,
  ipAddressCollectionDisabled: false,
  ios: {
    idfaCollectionDisabled: false,
  },
});
```

</TabItem> 

</Tabs>

--->

## Kids Mode for Flutter, React Native, and Unity

Support for Kids Mode in **Flutter, React Native, and Unity** is coming soon!
