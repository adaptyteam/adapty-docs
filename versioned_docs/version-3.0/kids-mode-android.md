---
title: "Kids Mode in Android SDK"
description: "Easily enable Kids Mode to comply with Google policies. No GAID or ad data collected in Android SDK."
metadataTitle: "Kids Mode in Android SDK | Adapty Docs"
---

If your Android application is intended for kids, you must follow the policies of [Google](https://support.google.com/googleplay/android-developer/answer/9893335). If you're using the Adapty SDK, a few simple steps will help you configure it to meet these policies and pass app store reviews.

## What's required?

You need to configure the Adapty SDK to disable the collection of:

- [Android Advertising ID (AAID/GAID)](https://support.google.com/googleplay/android-developer/answer/6048248)
- [IP address](https://www.ftc.gov/system/files/ftc_gov/pdf/p235402_coppa_application.pdf)

In addition, we recommend using customer user ID carefully. User ID in format `<FirstName.LastName>` will be definitely treated as gathering personal data as well as using email. For Kids Mode, a best practice is to use randomized or anonymized identifiers (e.g., hashed IDs or device-generated UUIDs) to ensure compliance.

## Enabling Kids Mode

### Updates in the Adapty Dashboard

In the Adapty Dashboard, you need to disable the IP address collection. To do this, go to [App settings](https://app.adapty.io/settings/general) and click **Disable IP address collection** under **Collect users' IP address**.

### Updates in your mobile app code

To comply with policies, you need to disable the collection of the Android Advertising ID (AAID/GAID) and IP address when initializing the Adapty SDK:

**Kotlin:**

```kotlin showLineNumbers
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(true) // set to `true`
          .withIpAddressCollectionDisabled(true) // set to `true`
      // highlight-end
          .build()
    )  
}
```

**Java:**

```java showLineNumbers
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(true) // set to `true`
          .withIpAddressCollectionDisabled(true) // set to `true`
      // highlight-end
          .build()
    );
}
``` 