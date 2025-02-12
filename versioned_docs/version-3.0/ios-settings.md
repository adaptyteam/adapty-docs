---
title: "Apple App Store credentials"
description: "Configuring iOS Settings in Adapty | Adapty Docs"
metadataTitle: "Configure iOS settings in Adapty for seamless subscription management."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

To configure the App Store credentials and ensure optimal functionality of the Adapty iOS SDK, navigate to the [iOS SDK](https://app.adapty.io/settings/ios-sdk) tab within the App Settings page of the Adapty Dashboard. Then, configure the following parameters:


<Zoom>
  <img src={require('./img/3d4087e-CleanShot_2023-06-26_at_13.27.042x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





| Field | Description |
|-----|-----------|
| **Bundle ID** | Your [app bundle ID](app-store-connection-configuration#step-1-provide-bundle-id). |
| **In-app purchase API (StoreKit 2)** | [Keys](app-store-connection-configuration#step-2-provide-issuer-id-and-key-id) to enable secure authentication and validation of in-app purchase transaction history requests. |
| **App Store Server Notifications** | URL that is used to enable [server2server notifications](enable-app-store-server-notifications) from the App Store to monitor and respond to users' subscription status changes |
| **App Store Promotional Offers** | Subscription keys for creating [Promotional offers](generate-in-app-purchase-key) in Adapty for specific products. |
| **App Store Connect shared secret (LEGACY)** | <p>**Legacy key for Adapty SDK prior to v.2.9.0**</p><p></p><p>[A key](app-store-connection-configuration#step-4-enter-app-store-shared-secret) for receipts validation and preventing fraud in your app.</p> |