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
2. [Create a paywall and add the products to it](create-paywall). 
3. [Create a placement and add paywalls to it](create-placement). Placement is the location where the paywall will be shown.
</details>

To download the JSON file with the fallback paywalls:

1. Open the **[Paywalls and Products](https://app.adapty.io/products)** section from the Adapty main menu, then select the **Products** tab or just the **[Placements](https://app.adapty.io/placements)** section in the Adapty main menu.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/9c63367-placements.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>



2. In the **Products** or **Placements** window, click the **Fallbacks** button. 
3. Select the platform for the fallbacks - **iOS** or **Android**.
4. In the **Download iOS/Android Fallback** window, select the SDK version you use for your app and click the **Download** button.

As a result, you will get a JSON file. Place it alongside your app on the user's device. Use the path to it as the `fileURL` parameter of the `Adapty.setFallbackPaywalls` method, following the instructions below.

## Use fallback paywalls in your mobile app code

To use fallback paywalls, call the `.setFallbackPaywalls` method. Pass the exact payload you copied from the Adapty Dashboard as described above. Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

Here's an example of retrieving fallback paywall data from locally stored JSON files named `android_fallback.json` and `ios_fallback.json`.

```swift title="Swift"
if let url = Bundle.main.url(forResource: "fallback_paywalls", withExtension: "json") {
     Adapty.setFallbackPaywalls(fileURL: url)
}
```
```kotlin title="Kotlin"
val fallbackUri: Uri = //get Uri for the file with fallback paywalls
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
```java title="Java"
Uri fallbackUri = //get Uri for the file with fallback paywalls
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
```javascript title="Flutter"
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
```csharp title="Unity"
Adapty.SetFallbackPaywalls("<FALLBACK_PAYWALL_DATA>", (error) => {
    if(error != null) {
        // handle error
    }
});
```
```typescript title="React Native (TS)"
//after v2.11
const fallbackLocation = {
  ios: {
    fileName: 'ios_fallback.json'
  },
  android: {
    //if the file is located in 'android/app/src/main/assets/'
    relativeAssetPath: 'android_fallback.json'
  }
}
await adapty.setFallbackPaywalls(fallbackLocation);


//Legacy (before v2.11)
const fallbackPaywalls = Platform.select({
  ios: require('./ios_fallback.json'),
  android: require('./android_fallback.json'),
});
// React Native automatically parses JSON, but we do not need that
const fallbackString = JSON.stringify(fallbackPaywalls);

await adapty.setFallbackPaywalls(fallbackString);
```

Parameters:

| Parameter | Platform | Presence | Description |
|---------|--------|--------|-----------|
| **fileURL** | native iOS | required | Path to the file with fallback paywalls you downloaded in the Adapty Dashboard [as described above](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). |
| **fallbackUri** | native Android | required | The [Uri](https://developer.android.com/reference/android/net/Uri) for the file with fallback paywalls |
| **paywallsLocation** | React Native | required | <p>The object represents the location of the file resource.</p><p></p><p>**For Android**:</p><p></p><p>1. Place the fallback file in a directory on the native layer. There are 2 correct directories to put the file: `android/app/src/main/assets/` or `android/app/src/main/res/raw/`.Please keep in mind that the `res/raw` folder has a special file naming convention (start with a letter, no capital letters, no special characters except for the underscore, and no spaces in the names).</p><p></p><p>2.a. For `android/app/src/main/assets/`: Pass the file path relatively to the `assets` directory,  for example:</p><p></p><p>- `{ relativeAssetPath: 'android_fallback.json' }` if you placed the file to the  root of `assets` itself</p><p>- `{ relativeAssetPath: '<additional_folder>/android_fallback.json' }` if you placed it in a child folder of `assets`</p><p></p><p>2.b. For `android/app/src/main/res/raw/`: Pass `{ rawResName: 'android_fallback' }`. Type the file name without the file extension.3. Pass the result of step 2 to the `android` property of `FallbackPaywallsLocation`.**For iOS**:</p><p></p><p>1. In XCode, use the menu **File** -> **Add Files to "YourProjectName"**.</p><p></p><p>2. Pass `{ fileName: 'ios_fallback.json' }` to the `ios` property of `FallbackPaywallsLocation`.</p> |