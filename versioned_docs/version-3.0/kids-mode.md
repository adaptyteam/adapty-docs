---
title: "Kids Mode"
description: "Easily enable Kids Mode to comply with Apple and Google policies. No IDFA, GAID, or ad data collected."
metadataTitle: "Kids Mode  | Adapty Docs"
---
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

If your application is intended for kids, you must follow the policies of [Apple](https://developer.apple.com/app-store/kids-apps/) and [Google](https://support.google.com/googleplay/android-developer/answer/9893335). If you're using the Adapty SDK, a few simple steps will help you configure it to meet these policies and pass app store reviews. The exact steps vary by platform, but none will take more than 10 minutes.

## What’s required?

You need to configure the Adapty SDK to **disable the collection of**:

- [IDFA (Identifier for Advertisers)](https://en.wikipedia.org/wiki/Identifier_for_Advertisers)
- [Android Advertising ID (AAID/GAID)](https://support.google.com/googleplay/android-developer/answer/6048248)
- Any other advertising-related data

## Kids Mode activation

<Tabs groupId="Id"> 

<TabItem value="Swift" label="iOS" default> 

To enable Kids Mode in the Adapty SDK using CocoaPods:

1. Add the whole code block to the end of your **Podfile** if you do not have post_install section in it or merge highlighted lines into it if you have:

   ```ruby showLineNumbers title="Podfile"
   post_install do |installer|
     installer.pods_project.targets.each do |target|
       // highlight-start
       if target.name == 'Adapty'
         target.build_configurations.each do |config|
           config.build_settings['OTHER_SWIFT_FLAGS'] ||= ['$(inherited)']
           config.build_settings['OTHER_SWIFT_FLAGS'] << '-DADAPTY_KIDS_MODE'
         end
       end
       // highlight-end
     end
   end
   ```

2. Run the following command to apply the changes:

   ```sh showLineNumbers title="Shell"
   pod install 
   ```

</TabItem> 

<TabItem value="kotlin" label="Android (Kotlin)" default> 

To comply with policies, you need to disable the collection of the Android Advertising ID when initializing the Adapty SDK: 
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

<TabItem value="java" label="Android (Java)" default> 
To comply with policies, you need to disable the collection of the Android Advertising ID when initializing the Adapty SDK: 
```java showLineNumbers
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(true) // set to `true`
      // highlight-end
          .build()
    );
}
```
</TabItem> 
<TabItem value="Flutter" label="Flutter" default> 
In order to comply with policies, disable the collection of user's IDFA (for iOS) and GAID/AAID (for Android) when configuring the Adapty SDK as follows: 

```dart showLineNumbers title="Dart"
try {
    await Adapty().activate(
        configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
      // highlight-start
          ..withGoogleAdvertisingIdCollectionDisabled(true), // set to `true`
          ..withAppleIdfaCollectionDisabled(true), // set to `true`
      // highlight-end
    );
} catch (e) {
    // handle the error
}
```
</TabItem>  </Tabs>

Support for Kids Mode in React Native and Unity is coming soon!
