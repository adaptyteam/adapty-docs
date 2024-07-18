---
title: "Prepare fallback paywalls"
description: ""
metadataTitle: ""
---

A paywall is an in-app storefront where customers can see and purchase products within your mobile app. Typically, paywalls are fetched from the server when a customer accesses them. However, Adapty allows you to have fallback paywalls for situations when a user opens the app without a connection to the Adapty backend (e.g., no internet connection or in the rare case of backend unavailability) and there's no cache on the device.

Adapty generates fallbacks as a JSON file in the necessary format, reflecting English versions of the paywalls you've configured in the Adapty Dashboard. Simply download the file - one per app store and Adapty SDK version, place it alongside your app on the user's device, and pass it to the `.setFallbackPaywalls` method, following the instructions outlined below.

## Download fallback paywalls as a file in the Adapty Dashboard

To integrate fallback paywalls into your mobile app code, start with downloading them from the Adapty Dashboard. The downloaded JSON file will contain one paywall for each placement, specifically the paywall designated for the `All users` audience in the Adapty Dashboard.

<details>
   <summary>Before you can download a paywall fallback (Click to Expand)</summary>

   1. [Create products](create-product) you want to sell
2. [Create paywall and add the products to it](create-paywall). Paywalls are in-app stores in your mobile apps.
3. [Create placement and add paywalls to it](create-placement). Placement is the location where the paywall will be shown.
</details>

To download the JSON file with the fallback paywalls:

1. Open the **[Paywalls and Products](https://app.adapty.io/products)** section from the Adapty main menu, then select the **Products** tab or just the **[Placements](https://app.adapty.io/placements)** section in the Adapty main menu.

   
<img
  src={require('./img/9c63367-placements.png').default}
/>



2. In the **Products** or **Placements** window, click the **Fallbacks** button. 
3. Select the platform for the fallbacks - **iOS** or **Android**.
4. In the **Download iOS/Android Fallback** window, select the SDK version you use for your app and click the **Download** button.

As a result, you will get a JSON file. Place it alongside your app on the user's device. Use the path to it as the `fileURL` parameter of the `Adapty.setFallbackPaywalls` method, following the instructions below.

## Use fallback paywalls in your mobile app code

To use fallback paywalls, call the `.setFallbackPaywalls` method. Pass the exact payload you copied from the Adapty Dashboard as described above. Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

Here's an example of retrieving fallback paywall data from a locally stored JSON file named `fallback_paywalls`.

```swift title="title="if let url = Bundle.main.url(forResource: "fallback_paywalls", withExtension: "json") {""
     Adapty.setFallbackPaywalls(fileURL: url)
}
```
```kotlin title="title="val fallbackUri: Uri = //get Uri for the file with fallback paywalls""
// for example, if you put the 'fallback_android' file to res/raw directory,
// you can obtain the Uri as follows:
//
// val fallbackUri = Uri.Builder()
//    .scheme(ContentResolver.SCHEME_ANDROID_RESOURCE)
//    .authority(yourAuthority) //usually your applicationId
//    .appendPath("${R.raw.fallback_android}")
//    .build()

Adapty.setFallbackPaywalls(fallbackUri, callback)
```
```java title="title="Uri fallbackUri = //get Uri for the file with fallback paywalls""
// for example, if you put the 'fallback_android' file to res/raw directory,
// you can obtain the Uri as follows:
//
// Uri fallbackUri = new Uri.Builder()
//    .scheme(ContentResolver.SCHEME_ANDROID_RESOURCE)
//    .authority(yourAuthority) //usually your applicationId
//    .appendPath(String.valueOf(R.raw.fallback_android))
//    .build();

Adapty.setFallbackPaywalls(fallbackUri, callback);
```
```javascript title="title="Flutter""
import 'dart:async' show Future;
import 'dart:io' show Platform;
import 'package:flutter/services.dart' show rootBundle;

final filePath = Platform.isIOS ? 'assets/fallback_ios.json' : 'assets/fallback_android.json';
final jsonString = await rootBundle.loadString(filePath);

try {
  await adapty.setFallbackPaywalls(jsonString);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp title="title="Unity""
Adapty.SetFallbackPaywalls("<FALLBACK_PAYWALL_DATA>", (error) => {
    if(error != null) {
        // handle error
    }
});
```
```typescript title="title="React Native (TS)""
const fallbackPaywalls = require('./fallback_paywalls.json');
// React Native automatically parses JSON, but we do not need that
const fallbackString = JSON.stringify(fallbackPaywalls);

await adapty.setFallbackPaywalls(fallbackString);
```

Parameters:

| Parameter       | Platform | Presence | Description                                                                                                                                                                              |
| :-------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **fileURL**     | iOS      | required | Path to the file with fallback paywalls you downloaded in the Adapty Dashboard [as described above](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). |
| **fallbackUri** | Android  | required | The [Uri](https://developer.android.com/reference/android/net/Uri) for the file with fallback paywalls                                                                                   |