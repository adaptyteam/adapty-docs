---
title: "Apple App Store server notifications"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Apple offers server-to-server notifications, so you can instantly be notified about subscription events.

Adapty helps you with that. The only thing you need to do is to set the URL for App Store Server Notifications inside your App Store Connect to Adapty status URL.

:::note
Subscription status URL is per app

This URL is specific to each of your apps. So if you have multiple apps, you need to set different URLs.
:::

## Sending App Store server notifications to Adapty

1. Copy URL for App Store Server Notifications in Adapty Dashboard [**App Settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk)


<Zoom>
  <img src={require('./img/010401b-CleanShot_2023-08-25_at_11.50.592x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Sign in to your App Store Connect account, choose the app, and go to the **App Information** page in section **General**. Use the **URL from Adapty** for both **Production** and **Sandbox** notifications, and save the changes. 


<Zoom>
  <img src={require('./img/9638538-CleanShot_2023-08-25_at_11.47.322x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Adapty supports both **Version 1** and **Version 2** Notifications. You can choose whichever version best suits your needs. To learn more about the differences between the two versions, please refer to this [link](https://developer.apple.com/documentation/appstoreservernotifications/app_store_server_notifications_changelog). You can also check out [our tutorial ](https://adapty.io/blog/storekit-2-api-tutorial/)to learn details about the version.


<Zoom>
  <img src={require('./img/dd65995-CleanShot_2023-03-24_at_11.19.532x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Please note that to use **Version 2** Notifications, it is necessary to configure the In-App Purchase API details as described in [the documentation.](in-app-purchase-api-storekit-2) This step is essential for ensuring that Version 2 Notifications work correctly.

## Raw events forwarding

Sometimes, you might still want to receive raw S2S events from Apple. To continue receiving them while using Adapty, just add your endpoint to the **URL for forwarding raw Apple events** field, and we'll send raw events as-is from Apple.


<Zoom>
  <img src={require('./img/e9f4bba-CleanShot_2021-03-16_at_19.30.272x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


