---
title: "Fallback paywalls"
description: "Use fallback paywalls to ensure seamless user experience in Adapty."
metadataTitle: "Using Fallback Paywalls in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

A paywall is an in-app storefront where customers can see and purchase products within your mobile app. Typically, paywalls are fetched from the server when a customer accesses them. However, Adapty allows you to have fallback paywalls for situations when a user opens the app without a connection to the Adapty backend (e.g., no internet connection or in the rare case of backend unavailability) and there's no cache on the device.

Adapty generates fallbacks as a JSON file in the necessary format, reflecting English versions of the paywalls you've configured in the Adapty Dashboard. To let your users see your fallback paywall:

1. Download the file from the Adapty Dashboard - one per app store and Adapty SDK version - as described below.
2. Process the file in the mobile app code:
   1. **For iOS, Android, and React Native:** Place it alongside your app on the user's device, and pass it to the `.setFallbackPaywalls` method. See detailed instructions for [iOS](ios-use-fallback-paywalls), [Android](android-use-fallback-paywalls), and [React Native](react-native-use-fallback-paywalls).
   2. **For Flutter and Unity:** Pass the contents of the file (the JSON string itself) to the `.setFallbackPaywalls` method. See detailed instructions for [Flutter](flutter-use-fallback-paywalls) and [Unity](unity-use-fallback-paywalls).


## Download fallback paywalls as a file in the Adapty Dashboard

To integrate fallback paywalls into your mobile app code, start by downloading them from the Adapty Dashboard. The downloaded JSON file will contain one paywall for each placement, specifically the paywall designated for the `All users` audience in the Adapty Dashboard.

<details>
   <summary>Before you can download a paywall fallback (Click to Expand)</summary>

   1. [Create products](create-product) you want to sell
2. [Create a paywall and add the products to it](create-paywall). 
3. [Create placement and add paywalls to it](create-placement). Placement is the location where the paywall will be shown.
</details>

To download the JSON file with the fallback paywalls:

1. Open the **[Paywalls and Products](https://app.adapty.io/products)** section from the Adapty main menu, then select the **Products** tab or just the **[Placements](https://app.adapty.io/placements)** section in the Adapty main menu.

   

<Zoom>
  <img src={require('./img/9c63367-placements.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. In the **Products** or **Placements** window, click the **Fallbacks** button. 
3. Select the platform for the fallbacks - **iOS** or **Android**.
4. In the **Download iOS/Android Fallback** window, select the SDK version you use for your app and click the **Download** button.

As a result, you will get a JSON file.