---
title: "Set up integration with Google Cloud Storage"
description: ""
metadataTitle: "Step-by-Step Guide to Setting Up Google Cloud Storage Integration with Adapty"
---

Adapty [Google Cloud Storage integration](google-cloud-storage) consists of the following steps:

1. You [create a Google Cloud Storage service account](google-cloud-setup#create-google-cloud-storage-service-account) in the AWS dashboard.
2. You [grant access to Google Cloud Storage bucket](google-cloud-setup#grant-access-to-google-cloud-storage-bucket) in the AWS dashboard.
3. [You configure the integration](google-cloud-setup#set-up-google-cloud-storage-integration-in-the-adapty-dashboard) in the Adapty Dashboard. Within this step, you can optionally [map Adapty events with your event names](google-cloud-setup#choose-events-to-send-and-map-event-names).

## Create Google Cloud Storage service account

This guide will help you create the necessary credentials in your Google Cloud Console.

In order for Adapty to upload raw data reports to your designated bucket, the service account's key is required, as well as write access to the corresponding bucket. By providing the service account's key and granting write access to the bucket, you allow Adapty to securely and efficiently transfer the raw data reports from its platform to your storage environment.

:::warning
Please note that we only support Service Account HMAC key authorization, means it's essential to ensure that your Service Account HMAC key has the "Storage Object Viewer", "Storage Legacy Bucket Writer" and "Storage Object Creator" roles added to it to enable proper access to Google Cloud Storage.
:::

1. Open [**IAM & Admin** - > **Service accounts**](https://console.cloud.google.com/iam-admin/serviceaccounts) section of the Google Cloud Console. Choose the relevant project or create a new one. You can create the same project you used for the initial configuration of Adapty with Google Play Store or another one, it does not matter.


<img
  src={require('./img/764db95-google_cloud_create_service_account.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





2. Click the **Create service account** button.


<img
  src={require('./img/fb865ad-google_cloud_service_account_details.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





3. In **Service account details** sub-section of the **Create service account** window, enter the **Service Account Name** you want. We recommend including "Adapty" in the name to indicate the purpose of this account. The **Service account ID** will be created automatically.

4. Copy the service account email address and save it for future usage. You will need to enter it when you grant access to the Google Cloud Storage bucket and when configure the Google Cloud Storage integration in the Adapty Dashboard.

5. Click the **Done** button. 

6. After the **Create service account** window closes and the new service account shows up in the **Service accounts** list, click the ellipsis button in the **Actions** column next to it, then select the **Manage keys** action.

   
<img
  src={require('./img/c3c03cb-google_cloud_manage_keys.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




7. In the opened window named after your project, click the **Add key** button, and in the opened drop-down list, select the **Create new key** option. 

   
<img
  src={require('./img/59991da-google_cloud_create_new_key.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




8. In the **Create private key for Your_project_name** window, click the **Create **button. This action will save your private key on your computer as a JSON file. 

   
<img
  src={require('./img/c91dea6-google_cloud_create_private_key.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




9. The file created will be needed during the [initial integration of Adapty with Google Play](google-play-store-connection-configuration) step. You can use the name of the file provided in the opened **Private key saved to your computer** window to locate it if needed.

   
<img
  src={require('./img/bdb056f-google_cloud_private_key_saved.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




## Grant access to Google Cloud Storage bucket

1. Open [**Cloud Storage** - > **Buckets**](https://console.cloud.google.com/storage/browser) section of the Google Cloud Console. Choose an existing bucket or create a new one to store the events and paywall visits from Adapty.
2. Open the **Permissions** tab.

   
<img
  src={require('./img/ee1e453-google_cloud_grant_access.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>



3. Click the **Grant access** button. 
4. In the **Grant access** pane, enter the email of the service account obtained in step 4 of the [Create Google Cloud Storage credentials](google-cloud-storage#create-google-cloud-storage-credentials) section into the **New principals** field. 

   
<img
  src={require('./img/ecea397-google_cloud_grant_access_details.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




   5. In the **Select role** list, choose the **Storage Legacy Bucket owner** role. 

      
<img
  src={require('./img/d3c6643-google_cloud_role.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>



   6. Click the **Save** button to apply the changes.

## Set up Google Cloud Storage integration in the Adapty Dashboard

In Adapty, you can set up independent exports of subscription events and paywall views. You can save them to a different or the same Google Cloud Storage bucket. If the same bucket is used, use the same data in the **Events** and **Paywall visits** tabs below.

To set up the Google Cloud Storage integration in the Adapty Dashboard:

1. Open  [**Integrations** -> **Google Cloud Storage**](https://app.adapty.io/integrations/google-cloud-storage) in your Adapty Dashboard. 

   1. Open the **Events** tab to set up exporting of Adapty subscription events 
   2. Open the **Paywall visits** tab to set up exporting Adapty paywall views.

   > 📘 Please note that to export views of custom paywalls, i.e. paywalls designed without Paywall Builder, make sure you [track paywall views](present-remote-config-paywalls#track-paywall-view-events) in your mobile app code.

<!----->

3. Turn on the **Export subscription events to Google Cloud Storage** toggle to initiate the integration.

   
<img
  src={require('./img/9d9707e-google_cloud_adapty_creds.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




4. Fill out the integration credentials. You can take them from the JSON file in step 8 of the [Create Google Cloud Storage service account](google-cloud-setup#create-google-cloud-storage-service-account) section above.

   
<img
  src={require('./img/c967e16-CleanShot_2023-03-17_at_16.23.332x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




   | Field | Description |
|-----|-----------|
| **Google Cloud Project ID** | A user-assigned identifier for your Google Cloud project. Find this ID in the downloaded private JSON key file under the `project_id` field. |
| **Google Cloud Bucket Name** | The name of the bucket in Google Cloud Storage where you want to store your data. That is the bucket you granted access to in the [Grant access to Google Cloud Storage bucket](google-cloud-setup#create-google-cloud-storage-service-account) section above. |
| **Email ** | <p>The email address associated with your service account in Google Cloud Console.  Find it in the downloaded private JSON key file under the `client_email` field.</p><p>It is used to grant access to resources in your project.</p> |
| **Google Cloud Service Account Private Key ID** | <p>The text block private key you created for your service account in the Google Cloud Console.  Find the block in the downloaded private JSON key file under the `private_key` field.</p><p>If the field contains the newline character sequence (`/n`)  in your block, replace them with a line break!</p> |
| **Google Cloud Service Account Private Key ID** | A unique identifier assigned to your private key when you create a new service account in the Google Cloud Console.  Find it in the downloaded private JSON key file under the `private_key_id` field. |
| **Folder inside the bucket ** | The name of the folder inside the bucket where you want to store your data. It should be unique within the bucket and can be used to organize your data. This field is optional to fill. |

5. Choose the events you want to receive and [map their names](google-cloud-setup#choose-events-to-send-and-map-event-names).

6. Additional fields and options are not obligatory; use them as needed. 

7. Remember to click the **Save** button to confirm the changes.

## Choose events to send and map event names

Below the credentials, there are three groups of events you can export, send, and store in Google Cloud Storage from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).


<img
  src={require('./img/f0685a4-CleanShot_2023-08-17_at_14.49.282x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>


