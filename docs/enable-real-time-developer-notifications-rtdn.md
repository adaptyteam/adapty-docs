---
title: "Enable Real-time developer notifications (RTDN) in Google Play Console"
description: "Stay informed about critical events and maintain data accuracy by enabling Real-time Developer Notifications (RTDN) in the Google Play Console for Adapty. Learn how to set up RTDN to receive instant updates about refunds and other important events from the Play Store"
metadataTitle: "Google Play Console: Enabling Real-time Developer Notifications (RTDN) for Adapty"
---

Setting up real-time developer notifications (RTDN) is crucial for ensuring data accuracy as it enables you to receive updates instantly from the Play Store, including information on refunds and other events.

1. Open the [**App settings**](https://app.adapty.io/settings/android-sdk) from the Adapty top menu.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/26f79d5-App_settings_top_menu.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




2. Copy the contents of the **Enable Pub/Sub API** field next to the **Google Play RTDN topic name** title.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/a72ff2d-copy_topic.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




:::note
If the contents of the **Enable Pub/Sub API** field have a wrong format (correct format starts with `projects/...`), make sure you've enabled all developers APIs and granted all required permissions to the service account.
:::

3. Open the [Google Play Console](https://play.google.com/console/), choose your app, and scroll down the left menu to find **Monetize** -> **Monetization setup**.
4. In the **Google Play Billing** section, select the **Enable real-time notifications** check-box.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/e55ba0e-paste_topic_name.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





5. Paste the contents of the **Enable Pub/Sub API** field you've copied in the Adapty **App Settings** into the **Topic name** field.
6. Click the **Save changes** button in the Google Play Console.