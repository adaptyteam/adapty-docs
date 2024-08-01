---
title: "Google Play Store credentials"
description: ""
metadataTitle: ""
---

For Adapty Android SDK to work, you need to configure several parameters.


<img
  src={require('./img/f6d76ec-app-settings_android.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>







| Field                           | Description                                                                                                                                                                                   |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Package name**                | The Package name is the unique identifier of your app in the Google Play Store. This is required for the basic functionality of Adapty, such as subscription processing.                      |
| **Service account key file**    | [Keys](create-service-account) to enable secure authentication and validation of purchases.                                                                                               |
| **Google Play RTDN topic name** | URL that is used to enable [server2server notifications](enable-real-time-developer-notifications-rtdn) from the Play Store to monitor and respond to users' subscription status changes. |