---
title: "Kids Mode"
description: "Easily enable Kids Mode to comply with Apple and Google policies. No IDFA, GAID, or ad data collected."
metadataTitle: "Kids Mode  | Adapty Docs"
---
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

If your application is intended for kids, you must follow the policies of [Apple](https://developer.apple.com/app-store/kids-apps/) and [Google](https://support.google.com/googleplay/android-developer/answer/9893335). If you're using the Adapty SDK, a few simple steps will help you configure it to meet these policies and pass app store reviews. The exact steps vary by platform, but none will take more than 10 minutes.

What needs to be done: Configure the Adapty SDK to prevent the collection of [IDFA](https://en.wikipedia.org/wiki/Identifier_for_Advertisers),  [Android Advertising ID (AAID)](https://support.google.com/googleplay/android-developer/answer/6048248) also known as GAID, and other advertising attributes.

<Tabs groupId="kids-mode"> 

<TabItem value="Swift" label="Swift" default> 

Text 

</TabItem> 

<TabItem value="Kotlin" label="Kotlin" default>

In order to comply with policies, disable the collection of user GAID when configuring the Adapty SDK as follows: 

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

In order to comply with policies, disable the collection of user GAID when configuring the Adapty SDK as follows: 

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

<TabItem value="Flutter" label="Flutter" default> 

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

</TabItem> 

<TabItem value="Unity" label="Unity" default> 

In order to comply with policies, disable the collection of user's IDFA (for iOS) and GAID (for Android) when configuring the Adapty SDK as follows: 

</TabItem>

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

