---
title: "Google Cloud Storage"
description: "Integrate Google Cloud Storage with Adapty for secure data storage."
metadataTitle: "Google Cloud Storage Integration | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty's integration with Google Cloud Storage allows you to store event and paywall visit data securely in one central location.  You will be able to save your [subscription events](events) to your Google Cloud Storage bucket as .csv files.  
To set up this integration, you will need to follow a few simple steps in the Google Cloud Console and Adapty Dashboard.

:::note
Schedule

Adapty sends your data to Google Cloud Storage every 24h at 4:00 UTC.

Each file will contain data for the events created for the entire previous calendar day in UTC. For example, the data exported automatically at 4:00 UTC on March 8th will contain all the events created on March 7th from 00:00:00 to 23:59:59 in UTC.
:::

## How to set up Google Cloud storage integration

To integrate Google Cloud Storage go to [**Integrations** -> **Google Cloud Storage**](https://app.adapty.io/integrations/google-cloud-storage), turn on a toggle from off to on, and fill out fields.

First of all set credentials to build a connection between Google Cloud Storage and Adapty profiles. 


<Zoom>
  <img src={require('./img/eea5f4e-CleanShot_2023-03-17_at_14.20.312x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





In the Adapty Dashboard, the following fields are needed to set up the connection:

| Field                                           | Description                                                                                                                                                                                                                                                                                        |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Google Cloud Client ID**                      | A unique identifier assigned to your Google Cloud project when you create a new client in the Google Cloud Console. Find this ID in the downloaded private [JSON key file](google-cloud-storage#create-google-cloud-storage-credentials)  under the `client_id` field. |
| **Google Cloud Project ID**                     | A user-assigned identifier for your Google Cloud project. Find this ID in the downloaded private JSON key file under the `project_id` field.                                                                                                                                                       |
| **Google Cloud Service Account Private Key ID** | A unique identifier assigned to your private key when you create a new service account in the Google Cloud Console.  Find this ID in the downloaded private JSON key file under the `private_key_id` field.                                                                                        |
| **Google Cloud Bucket Name**                    | The name of the bucket in Google Cloud Storage where you want to store your data. It should be unique within the Google Cloud Storage environment and should not contain any spaces.                                                                                                               |
| **Email**                                      | The email address associated with your service account in Google Cloud Console. It is used to grant access to resources in your project.                                                                                                                                                           |
| **Folder inside the bucket**                   | The name of the folder inside the bucket where you want to store your data. It should be unique within the bucket and can be used to organize your data. This field is optional to fill.                                                                                                           |

## Create Google Cloud Storage credentials

This guide will help you create the necessary credentials in your Google Cloud Platform Console.

In order for Adapty to upload raw data reports to your designated bucket, the service account's key is required, as well as write access to the corresponding bucket. By providing the service account's key and granting write access to the bucket, you allow Adapty to securely and efficiently transfer the raw data reports from its platform to your storage environment.

:::warning
Please note that we only support Service Account HMAC key authorization, means it's essential to ensure that your Service Account HMAC key has the "Storage Object Viewer", "Storage Legacy Bucket Writer" and "Storage Object Creator" roles added to it to enable proper access to Google Cloud Storage.
:::

1. For the first step, you need to go to the [IAM](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts) section of your Google Cloud account and choose the relevant project or create a new one. 


<Zoom>
  <img src={require('./img/30a81ef-CleanShot_2023-03-17_at_15.22.142x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Next, create a new service account for the Adapty by clicking on the "+ CREATE SERVICE ACCOUNT" button.

   

<Zoom>
  <img src={require('./img/98f8ebf-CleanShot_2023-03-17_at_15.40.062x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Fill out the fields in the first step, as access will be granted at a later stage. In order to read more details about this page read the documentation [here](https://cloud.google.com/iam/docs/service-accounts-create).

   

<Zoom>
  <img src={require('./img/2190c50-CleanShot_2023-03-17_at_15.48.552x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. To create and download a [private JSON key](https://cloud.google.com/iam/docs/keys-create-delete), navigate to the KEYS section and click on the "ADD KEY" button.

   

<Zoom>
  <img src={require('./img/8a45468-CleanShot_2023-03-17_at_15.58.092x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




5. In the DETAILS section, locate the Email value linked to the recently created service account and make a copy of it. This information will be necessary for the upcoming steps to authorize the account and allow it to write to the bucket.

   

<Zoom>
  <img src={require('./img/6ccd0f0-CleanShot_2023-03-17_at_16.03.162x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




6. To proceed go to the Google Cloud Storage's[ Buckets](https://console.cloud.google.com/storage/browser) page and either select an existing bucket or create a new one to store the Event or Visuts Data reports from Adapty.  Then navigate to the PERMISSIONS section and select the option to [GRANT ACCESS](https://support.google.com/cloudidentity/answer/9178892?hl=en).

   

<Zoom>
  <img src={require('./img/3cdd937-CleanShot_2023-03-17_at_16.14.232x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




7. In the PERMISSIONS section, input the Email of the service account obtained in the fifth step mentioned earlier, then choose the Storage Object Creator role. Finally, click on SAVE to apply the changes.

   

<Zoom>
  <img src={require('./img/62801f4-CleanShot_2023-03-17_at_16.17.312x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




      Remember to keep the name of the bucket for future reference.

8. After passing these steps have successfully completed the necessary setup steps in the Google Cloud Console! The final step involves entering the bucket's name, accessing the JSON file containing the downloaded private key, and extracting the required field values for use in Adapty.

   

<Zoom>
  <img src={require('./img/c967e16-CleanShot_2023-03-17_at_16.23.332x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




## Manual data export

In addition to the automatic event data export to Google Cloud Storage, Adapty also provides a manual file export functionality. With this feature, you can select a specific time interval for the event data and export it to your GCS bucket manually. This allows you to have greater control over the data you export and when you export it.

The specified date range will be used to export the events created from Date A 00:00:00 UTC up to Date B 23:59:59 UTC. 


<Zoom>
  <img src={require('./img/e347308-CleanShot_2023-03-17_at_17.39.452x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Table structure

In Google Cloud Storage integration, Adapty provides table to store historical data for transaction events and paywall visits. The table contains information about the user profile, revenue and proceeds, and the origin store, among other data points. Essentially, these tables log all transactions generated by an app for a given time period.

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Here is the table structure for the events:

| Column | Description |
|------|-----------|
| **profile_id** | Adapty user ID. |
| **event_type** | Lowercased event name. Refer to the [Events](events) section to learn event types. |
| **event_datetime** | ISO 8601 date. |
| **transaction_id** | A unique identifier for a transaction such as a purchase or renewal. |
| **original_transaction_id** | The transaction identifier of the original purchase. |
| **subscription_expires_at** | The Expiration date of subscription. Usually in the future. |
| **environment** | Could be Sandbox or Production. |
| **revenue_usd** | Revenue in USD. Can be empty. |
| **proceeds_usd** | Proceeds in USD. Can be empty. |
| **net_revenue_usd** | Net revenue (income after taxes) in USD. Can be empty. |
| **tax_amount_usd** | Amount of money deducted for taxes in USD. Can be empty. |
| **revenue_local** | Revenue in local currency. Can be empty. |
| **proceeds_local** | Proceeds in local currency. Can be empty. |
| **net_revenue_local** | Net revenue (income after taxes) in local currency. Can be empty. |
| **tax_amount_local** | Amount of money deducted for taxes in local currency. Can be empty. |
| **customer_user_id** | Developer user ID. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. |
| **store** | Could be _app_store_ or _play_store_. |
| **product_id** | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **base_plan_id** | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973)  in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price)  in Stripe. |
| **developer_id** | Developer (SDK) ID of the paywall where the transaction originated. |
| **ab_test_name** | Name of the A/B test where the transaction originated. |
| **ab_test_revision** | Revision of the A/B test where the transaction originated. |
| **paywall_name** | Name of the paywall where the transaction originated. |
| **paywall_revision** | Revision of the paywall where the transaction originated. |
| **profile_country** | Profile Country determined by Adapty, based on IP. |
| **install_date** | ISO 8601 date when the installation happened. |
| **idfv** | [identifierForVendor](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) on iOS devices |
| **idfa** | [advertisingIdentifier](https://developer.apple.com/documentation/adsupport/asidentifiermanager/advertisingidentifier) on iOS devices |
| **advertising_id** | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device |
| **ip_address** | Device IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes |
| **cancellation_reason** | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be:</p><p>**iOS & Android**_voluntarily_cancelled_, _billing_error_, _refund_</p><p>**iOS**  _price_increase_, _product_was_not_available_, _unknown_, _upgraded_</p><p> **Android**  _new_subscription_replace_, _cancelled_by_developer_</p> |
| **android_app_set_id** | An [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - unique, per-device, per developer-account user-resettable ID for non-monetizing advertising use cases. |
| **android_id** | On Android 8.0 (API level 26) and higher versions of the platform, a 64-bit number (expressed as a hexadecimal string), unique to each combination of app-signing key, user, and device. For more details, see [Android developer documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| **device** | The end-user-visible device model name. |
| **currency** | The 3-letter currency code (ISO-4217) of the transaction. |
| **store_country** | Profile Country determined by Apple/Google store. |
| **attribution_source** | Attribution source. |
| **attribution_network_user_id** | ID assigned to the user by attribution source. |
| **attribution_status** | Can be organic, non_organic or unknown. |
| **attribution_channel** | Marketing channel name. |
| **attribution_campaign** | Marketing campaign name. |
| **attribution_ad_group** | Attribution ad group. |
| **attribution_ad_set** | Attribution ad set. |
| **attribution_creative** | Attribution creative keyword. |
| **attributes** | JSON of [custom user attributes](setting-user-attributes#custom-user-attributes). This will include any custom attributes you’ve set up to send from your mobile app. To send it, enable the **Send User Attributes** option in the [Integrations -> Webhooks](https://app.adapty.io/integrations/customwebhook) page. |


Here is the table structure for the paywall visits:

| Column                | Description                                                                                                  |
| :-------------------- | :----------------------------------------------------------------------------------------------------------- |
| **profile_id**        | Adapty user ID.                                                                                              |
| **customer_user_id**  | Developer user ID. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. |
| **profile_country**   | Profile Country determined by Apple/Google store.                                                            |
| **install_date**      | ISO 8601 date when the installation happened.                                                                |
| **store**             | Could be _app_store_ or _play_store_.                                                                        |
| **paywall_showed_at** | The date when the paywall has been displayed to the customer.                                                |
| **developer_id**      | Developer (SDK) ID of the paywall where the transaction originated.                                          |
| **ab_test_name**      | Name of the A/B test where the transaction originated.                                                       |
| **ab_test_revision**  | Revision of the A/B test where the transaction originated.                                                   |
| **paywall_name**      | Name of the paywall where the transaction originated.                                                        |
| **paywall_revision**  | Revision of the paywall where the transaction originated.                                                    |

## Events and tags

You can manage what data is communicated by the integration. The integration offers the following configuration options:

| Setting                            | Description                                                  |
| :--------------------------------- | :----------------------------------------------------------- |
| **Exclude Historical Events**      | Opt to exclude events that occurred before the user installed the app with Adapty SDK. This prevents duplication of events and ensures accurate reporting. For instance, if a user activated a monthly subscription on January 10th and updated the app with Adapty SDK on March 6th, Adapty will omit events before March 6th and retain subsequent events. |
| **Include events without profile** | Opt to include transactions that are not linked to a user profile in Adapty. These may include purchases made before Adapty SDK was installed or transactions received from store server notifications that cannot be immediately associated with a specific user. |
| **Send User Attributes**           | If you wish to send user-specific attributes, like language preferences, and your OneSignal plan supports more than 10 tags, select this option. Enabling this allows the inclusion of additional information beyond the default 10 tags. Note that exceeding tag limits may result in errors. |

<Zoom>
  <img src={require('./img/google-cloud-settings.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Below the integration settings, there are three groups of events you can export, send, and store in Amazon S3 from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).


<Zoom>
  <img src={require('./img/f0685a4-CleanShot_2023-08-17_at_14.49.282x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

