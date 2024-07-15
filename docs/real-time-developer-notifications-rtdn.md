---
title: "Google Real-time developer notifications (RTDN)"
description: ""
metadataTitle: ""
---

[Real-time developer notifications RTDN](https://developer.android.com/google/play/billing/rtdn-reference) allow receiving updates the moment they occur in the Play Store, tracking refunds, and more. You must set them up for data accuracy.

:::warning
Make sure that [Cloud Pub/Sub API is enabled](https://console.cloud.google.com/marketplace/product/google/pubsub.googleapis.com) and your

[Service Account Key File](service-account-key-file) has **Pub/Sub Admin** permissions.
:::


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/1b3f76f-CleanShot_2023-08-30_at_15.22.462x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





After uploading a Service Account Key File to Adapty, we will automatically create all needed resources in your Google Cloud Project, and the topic name will appear in the **Google Play RTDN topic name** field on [Android SDK settings page](https://app.adapty.io/settings/android-sdk).


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/71f31a9-CleanShot_2023-08-25_at_12.46.002x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





Copy and paste its value into the **Topic name** field found at App Dashboard -> **Monetization setup** page of Google Play Console, click **Send test notification** to make sure everything works, and save the changes.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/ac930fa-CleanShot_2023-08-25_at_12.47.442x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





Go back to [Android SDK settings page](https://app.adapty.io/settings/android-sdk) and refresh it. The status next to Google Play RTDN topic name should be changed to **Active**. If it hasn't changed, make sure you clicked **Send test notification** and indicated the right topic name.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/42125d1-001773-September-22-wchLGy0F.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





## Raw events forwarding

Sometimes, you might still want to receive raw S2S events from Google. To continue receiving them while using Adapty, just add your endpoint to the **URL for forwarding raw Google events** field, and we'll send raw events as-is from Google.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/e388892-001774-September-22-GhkjOFbT.png" 
    style={{ width: '7px', border: '1px solid grey' }}
  />
</div>


