---
title: "Enable Real-time developer notifications (RTDN) in Google Play Console"
description: "Enable real-time developer notifications (RTDN) for instant subscription updates."
metadataTitle: "Enable Real-Time Developer Notifications | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Setting up real-time developer notifications (RTDN) is crucial for ensuring data accuracy as it enables you to receive updates instantly from the Play Store, including information on refunds and other events.

1. Open the [**App settings**](https://app.adapty.io/settings/android-sdk) from the Adapty top menu.

   

<Zoom>
  <img src={require('./img/26f79d5-App_settings_top_menu.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


2. Copy the contents of the **Enable Pub/Sub API** field next to the **Google Play RTDN topic name** title.

   

<Zoom>
  <img src={require('./img/a72ff2d-copy_topic.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


:::note
If the contents of the **Enable Pub/Sub API** field have a wrong format (correct format starts with `projects/...`), make sure you've enabled all developers APIs and granted all required permissions to the service account.
:::

3. Open the [Google Play Console](https://play.google.com/console/), choose your app, and scroll down the left menu to find **Monetize** -> **Monetization setup**.
4. In the **Google Play Billing** section, select the **Enable real-time notifications** check-box.

<Zoom>
  <img src={require('./img/e55ba0e-paste_topic_name.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. Paste the contents of the **Enable Pub/Sub API** field you've copied in the Adapty **App Settings** into the **Topic name** field.
6. Click the **Save changes** button in the Google Play Console.

## Raw events forwarding

Sometimes, you might still want to receive raw S2S events from Google. To continue receiving them while using Adapty, just add your endpoint to the **URL for forwarding raw Google events** field, and we'll send raw events as-is from Google.


<Zoom>
  <img src={require('./img/e388892-001774-September-22-GhkjOFbT.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

**What's next**

Set up the Adapty SDK for:

- [Android](sdk-installation-android)
- [Flutter](sdk-installation-flutter)
- [React Native](sdk-installation-reactnative)
- [Unity](sdk-installation-unity)