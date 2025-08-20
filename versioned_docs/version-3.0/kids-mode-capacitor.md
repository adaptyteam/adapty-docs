---
title: "Kids Mode in Capacitor SDK"
description: "Easily enable Kids Mode to comply with Apple and Google policies. No IDFA, GAID, or ad data collected in Capacitor SDK."
metadataTitle: "Kids Mode in Capacitor SDK | Adapty Docs"
---

If your Capacitor application is intended for kids, you must follow the policies of [Apple](https://developer.apple.com/app-store/kids-apps/) and [Google](https://support.google.com/googleplay/android-developer/answer/9893335). If you're using the Adapty SDK, a few simple steps will help you configure it to meet these policies and pass app store reviews.

## What's required?

You need to configure the Adapty SDK to disable the collection of:

- [IDFA (Identifier for Advertisers)](https://en.wikipedia.org/wiki/Identifier_for_Advertisers) (iOS)
- [Android Advertising ID (AAID/GAID)](https://support.google.com/googleplay/android-developer/answer/6048248) (Android)
- [IP address](https://www.ftc.gov/system/files/ftc_gov/pdf/p235402_coppa_application.pdf)

In addition, we recommend using customer user ID carefully. User ID in format `<FirstName.LastName>` will be definitely treated as gathering personal data as well as using email. For Kids Mode, a best practice is to use randomized or anonymized identifiers (e.g., hashed IDs or device-generated UUIDs) to ensure compliance.

## Enabling Kids Mode

### Updates in the Adapty Dashboard

In the Adapty Dashboard, you need to disable the IP address collection. To do this, go to [App settings](https://app.adapty.io/settings/general) and click **Disable IP address collection** under **Collect users' IP address**.

### Updates in your mobile app code

In order to comply with policies, disable the collection of the user's IDFA, GAID, and IP address:

```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

try {
  await adapty.activate({
    apiKey: 'YOUR_PUBLIC_SDK_KEY',
    params: {
      // Disable IP address collection
      ipAddressCollectionDisabled: true,
      
      // Disable IDFA collection on iOS
      ios: {
        idfaCollectionDisabled: true
      },
      
      // Disable Google Advertising ID collection on Android
      android: {
        adIdCollectionDisabled: true
      }
    }
  });
  console.log('Adapty activated with Kids Mode enabled');
} catch (error) {
  console.error('Failed to activate Adapty with Kids Mode:', error);
}
```

### Platform-specific configurations

#### iOS: Enable Kids Mode using CocoaPods

If you're using CocoaPods for iOS, you can also enable Kids Mode at the native level:

1. Update your Podfile:

   - If you **don't** have a `post_install` section, add the entire code block below.
   - If you **do** have a `post_install` section, merge the highlighted lines into it.

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

#### Android: Enable Kids Mode using Gradle

For Android, you can also enable Kids Mode at the native level by adding the following to your app's `build.gradle`:

```groovy showLineNumbers title="android/app/build.gradle"
android {
    defaultConfig {
        // ... existing config ...
        
        // Enable Kids Mode
        buildConfigField "boolean", "ADAPTY_KIDS_MODE", "true"
    }
}
```

## Next steps

Once you've enabled Kids Mode, make sure to:

1. Test your app thoroughly to ensure all functionality works correctly
2. Review your app's privacy policy to reflect the disabled data collection
3. Submit your app for review with clear documentation about Kids Mode compliance

For more information about platform-specific requirements:
- [Kids Mode in iOS SDK](kids-mode) for additional iOS configuration details
- [Kids Mode in Android SDK](kids-mode-android) for additional Android configuration details 
