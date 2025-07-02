---
title: "Enable Real-time developer notifications (RTDN) in Google Play Console"
description: "Stay informed about critical events and maintain data accuracy by enabling Real-time Developer Notifications (RTDN) in the Google Play Console for Adapty. Learn how to set up RTDN to receive instant updates about refunds and other important events from the Play Store"
metadataTitle: "Google Play Console: Enabling Real-time Developer Notifications (RTDN) for Adapty"

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

<p> </p>

:::note
If the contents of the **Enable Pub/Sub API** field have a wrong format (the correct format starts with `projects/...`), refer to the [Fixing incorrect format in Enable Pub/Sub API field](enable-real-time-developer-notifications-rtdn#fixing-incorrect-format-in-enable-pubsub-api-field) section for help.

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

## Fixing incorrect format in Enable Pub/Sub API field

If the contents of the **Enable Pub/Sub API** field are in the wrong format (the correct format starts with `projects/...`), follow these steps to troubleshoot and resolve the issue:

### 1. Verify API Enablement and Permissions

Carefully ensure that all required APIs are enabled, and permissions are correctly granted to the service account. Even if you've already completed these steps, it’s important to go through them again to make sure no sub-step was missed. Repeat the steps in the following sections:

1. [Enable Developer APIs in Google Play Console](enabling-of-devepoler-api)
2. [Create service account in the Google Cloud Console](create-service-account)
3. [Grant permissions to service account in the Google Play Console](grant-permissions-to-service-account)
4. [Generate service account key file in the Google Play Console](create-service-account-key-file)
5. [Configure Google Play Store integration](google-play-store-connection-configuration)

### 2. Adjust Domain Policies

Change the **Domain restricted contacts** and **Domain restricted sharing** policies:

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and select the project where you created the service account to manage your app.
2. In the **Quick Access** section, choose **IAM & Admin**. 

   <Zoom>
     <img src={require('./img/google-cloud-IAM-and-Admin.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. In the left pane, choose **Organization Policies**. 
4. Find the **Domain restricted contacts** policy.

   <Zoom>
     <img src={require('./img/google-cloud-policy-action.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom> 

5. Click the ellipsis button in the **Actions** column and choose **Edit policy**.
6. In the policy editing window:
   1. Under **Policy source**, select the **Override parent's policy** radio-button.
   2. Under **Policy enforcement**, select the **Replace** radio button.
   3. Under **Rules**, click the **ADD A RULE** button.

      <Zoom>
        <img src={require('./img/google-cloud-edit-policy.webp').default}
        style={{
          border: '1px solid #727272', /* border width and color */
          width: '700px', /* image width */
          display: 'block', /* for alignment */
          margin: '0 auto' /* center alignment */
        }}
      />
      </Zoom>

   4. Under **New rule** -> **Policy values**, choose **Allow All**.

      <Zoom>
        <img src={require('./img/google-cloud-allow-all-policy.webp').default}
        style={{
          border: '1px solid #727272', /* border width and color */
          width: '700px', /* image width */
          display: 'block', /* for alignment */
          margin: '0 auto' /* center alignment */
        }}
      />
      </Zoom>

   5. Click **SET POLICY**.
7. Repeat steps 4-6 for the **Domain restricted sharing** policy.

Finally, recreate the contents of the **Enable Pub/Sub API** field next to the **Google Play RTDN topic name** title. The field will now have the correct format.

Make sure to switch the **Policy source** back to **Inherit parent's policy** for the updated policies once you've successfully enabled Real-time Developer Notifications (RTDN).

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

---
**What's next**

Set up the Adapty SDK for:

- [Android](sdk-installation-android)
- [Flutter](sdk-installation-flutter)
- [React Native](sdk-installation-reactnative)
- [Kotlin Multiplatform](sdk-installation-kotlin-multiplatform.md)
- [Unity](sdk-installation-unity)