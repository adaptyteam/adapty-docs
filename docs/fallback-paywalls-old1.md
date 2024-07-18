---
title: "Prepare fallback paywalls"
description: ""
metadataTitle: ""
---

A paywall is an in-app storefront where customers can see and purchase products within your mobile app. Typically, paywalls are fetched from the server when a customer accesses them. However, Adapty allows you to have fallback paywalls for situations when a user opens the app without a connection to the Adapty backend (e.g., no internet connection or in the rare case of backend unavailability) and there's no cache on the device.

Adapty generates fallbacks as a JSON file in the necessary format, reflecting English versions of the paywalls you've configured in the Adapty Dashboard. Simply download the file - one per app store, place it alongside your app on the user's device, and pass its contents to the .setFallbackPaywalls method, following the instructions outlined below.

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



2. In the **Products** or **Placements** window, click the **Fallbacks** button. In both cases, you will get the same file. Copy its contents and use as the `paywallsData` parameter for the `fallback_paywalls` method below.

## Use fallback paywalls in your mobile app code

To use fallback paywalls, call the `.setFallbackPaywalls` method. Pass the exact payload you copied from the Adapty Dashboard as described above. Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

Here's an example of retrieving fallback paywall data from a locally stored JSON file named `fallback_paywalls`.

```swift title="Swift"
if let urlPath = Bundle.main.url(forResource: "fallback_paywalls", withExtension: "json"),
   let paywallsData = try? Data(contentsOf: urlPath) {
     Adapty.setFallbackPaywalls(paywallsData)
}
```
```kotlin title="Kotlin"
val paywalls: String = //get paywalls JSON from where you stored it

Adapty.setFallbackPaywalls(paywalls)
```
```java title="Java"
String paywalls = //get paywalls JSON from where you stored it

Adapty.setFallbackPaywalls(paywalls);
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
const fallbackPaywalls = require('./fallback_paywalls.json');
// React Native automatically parses JSON, but we do not need that
const fallbackString = JSON.stringify(fallbackPaywalls);

await adapty.setFallbackPaywalls(fallbackString);
```

Request parameters:

| Parameter        | Presence | Description                                                                                                                                                                                                                                         |
| :--------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **paywallsData** | required | A JSON representation of your paywalls and products list in the exact format of the `data` section of the JSON file [you downloaded it in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) |