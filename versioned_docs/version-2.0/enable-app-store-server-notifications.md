---
title: "Enable App Store server notifications"
description: "Learn how to set up App Store server notifications in Adapty to receive real-time updates on refunds and other events directly from the App Store"
metadataTitle: "How to Enable App Store Server Notifications in Adapty"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Setting up App Store server notifications is crucial for ensuring data accuracy as it enables you to receive updates instantly from the App Store, including information on refunds and other events.

1. Copy the **URL for App Store server notification** in the Adapty Dashboard. 

   
<Zoom>
  <img src={require('./img/2901185-app_server_notifications.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Open [App Store Connect](https://appstoreconnect.apple.com/apps). Select your app and proceed to **General** → **App Information** section, **App Store Server Notifications** subsection. 
3. Paste the copied **URL for App Store server notification** into the **Production Server URL** and **Sandbox Server URL** fields.

   
<Zoom>
  <img src={require('./img/86fb3d2-app_server_notifications_apple.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


