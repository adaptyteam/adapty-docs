---
title: "Google Cloud Storage"
description: "Integrate Google Cloud Storage with Adapty UA for secure user acquisition data storage."
metadataTitle: "Google Cloud Storage Integration | Adapty Docs"
keywords: ['adapty ua', 'user acquisition', 'google cloud', 'gcs']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty UA's integration with Google Cloud Storage allows you to store user acquisition campaign data securely in one central location. You will be able to save your campaign performance data, attribution data, and user acquisition events to your Google Cloud Storage bucket as .csv files.  
To set up this integration, you will need to follow a few simple steps in the Google Cloud Console and Adapty UA Dashboard.

:::note
Schedule

Adapty UA sends your data to Google Cloud Storage every 24h at 4:00 UTC.

Each file will contain data for the events created for the entire previous calendar day in UTC. For example, the data exported automatically at 4:00 UTC on March 8th will contain all the events created on March 7th from 00:00:00 to 23:59:59 in UTC.
:::

## How to set up Google Cloud storage integration

### Step 1. Configure integration in Adapty UA

1. Go to [**Integrations** -> **Google Cloud Storage**](https://app.adapty.io/ua/integrations/google-cloud-storage)
2. Turn on the toggle from off to on
3. Fill out the required fields to build a connection between Google Cloud Storage and Adapty UA profiles 

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

In the Adapty UA Dashboard, the following fields are needed to set up the connection:

| Field                                           | Description                                                                                                                                                                                                                                                                                        |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Google Cloud Client ID**                      | A unique identifier assigned to your Google Cloud project when you create a new client in the Google Cloud Console. Find this ID in the downloaded private [JSON key file](ua-google-cloud-storage#create-google-cloud-storage-credentials)  under the `client_id` field. |
| **Google Cloud Project ID**                     | A user-assigned identifier for your Google Cloud project. Find this ID in the downloaded private JSON key file under the `project_id` field.                                                                                                                                                       |
| **Google Cloud Service Account Private Key ID** | A unique identifier assigned to your private key when you create a new service account in the Google Cloud Console.  Find this ID in the downloaded private JSON key file under the `private_key_id` field.                                                                                        |
| **Google Cloud Bucket Name**                    | The name of the bucket in Google Cloud Storage where you want to store your data. It should be unique within the Google Cloud Storage environment and should not contain any spaces.                                                                                                               |
| **Email**                                      | The email address associated with your service account in Google Cloud Console. It is used to grant access to resources in your project.                                                                                                                                                           |
| **Folder inside the bucket**                   | The name of the folder inside the bucket where you want to store your data. It should be unique within the bucket and can be used to organize your data. This field is optional to fill.                                                                                                           |

### Step 2. Create Google Cloud Storage credentials

This guide will help you create the necessary credentials in your Google Cloud Platform Console.

In order for Adapty UA to upload raw data reports to your designated bucket, the service account's key is required, as well as write access to the corresponding bucket. By providing the service account's key and granting write access to the bucket, you allow Adapty UA to securely and efficiently transfer the raw data reports from its platform to your storage environment.

:::warning
Please note that we only support Service Account HMAC key authorization, means it's essential to ensure that your Service Account HMAC key has the "Storage Object Viewer", "Storage Legacy Bucket Writer" and "Storage Object Creator" roles added to it to enable proper access to Google Cloud Storage.
:::

#### 2.1. Create Service Account

1. Go to the [IAM](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts) section of your Google Cloud account and choose the relevant project or create a new one 

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

2. Next, create a new service account for the Adapty UA by clicking on the "+ CREATE SERVICE ACCOUNT" button

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

3. Fill out the fields in the first step, as access will be granted at a later stage. In order to read more details about this page read the documentation [here](https://cloud.google.com/iam/docs/service-accounts-create)

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

4. To create and download a [private JSON key](https://cloud.google.com/iam/docs/keys-create-delete), navigate to the KEYS section and click on the "ADD KEY" button

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

5. In the DETAILS section, locate the Email value linked to the recently created service account and make a copy of it. This information will be necessary for the upcoming steps to authorize the account and allow it to write to the bucket

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

#### 2.2. Configure Bucket Permissions

6. Go to the Google Cloud Storage's[ Buckets](https://console.cloud.google.com/storage/browser) page and either select an existing bucket or create a new one to store the User Acquisition Data reports from Adapty UA
7. Navigate to the PERMISSIONS section and select the option to [GRANT ACCESS](https://support.google.com/cloudidentity/answer/9178892?hl=en)

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

8. In the PERMISSIONS section, input the Email of the service account obtained in the fifth step mentioned earlier, then choose the Storage Object Creator role
9. Finally, click on SAVE to apply the changes

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

10. Remember to keep the name of the bucket for future reference

11. After passing these steps have successfully completed the necessary setup steps in the Google Cloud Console! The final step involves entering the bucket's name, accessing the JSON file containing the downloaded private key, and extracting the required field values for use in Adapty UA

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

In addition to the automatic event data export to Google Cloud Storage, Adapty UA also provides a manual file export functionality. With this feature, you can select a specific time interval for the user acquisition data and export it to your GCS bucket manually. This allows you to have greater control over the data you export and when you export it.

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

In Google Cloud Storage integration, Adapty UA provides table to store historical data for user acquisition events, campaign performance metrics, and attribution data. The table contains information about campaign performance, user attribution, and conversion events, among other data points. Essentially, these tables log all user acquisition data generated by campaigns for a given time period.

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Here is the table structure for the user acquisition events:

| Column | Description |
|------|-----------|
| **profile_id** | Adapty user ID. |
| **event_type** | Lowercased event name. Refer to the [Events](events) section to learn event types. |
| **event_datetime** | ISO 8601 date. |
| **campaign_id** | Unique identifier for the user acquisition campaign. |
| **campaign_name** | Name of the user acquisition campaign. |
| **adset_id** | Unique identifier for the ad set within the campaign. |
| **adset_name** | Name of the ad set within the campaign. |
| **ad_id** | Unique identifier for the individual ad. |
| **ad_name** | Name of the individual ad. |
| **platform** | Platform where the campaign is running (e.g., Meta, TikTok, Google Ads). |
| **attribution_source** | Attribution source (e.g., Meta, TikTok, AppsFlyer, Adjust). |
| **attribution_network_user_id** | ID assigned to the user by attribution source. |
| **attribution_status** | Can be organic, non_organic or unknown. |
| **attribution_channel** | Marketing channel name. |
| **attribution_campaign** | Marketing campaign name. |
| **attribution_ad_group** | Attribution ad group. |
| **attribution_ad_set** | Attribution ad set. |
| **attribution_creative** | Attribution creative keyword. |
| **click_datetime** | ISO 8601 date when the user clicked the ad. |
| **install_datetime** | ISO 8601 date when the user installed the app. |
| **conversion_datetime** | ISO 8601 date when the conversion event occurred. |
| **conversion_type** | Type of conversion (e.g., subscription_started, subscription_renewed, non_subscription_purchase). |
| **conversion_value_usd** | Value of the conversion in USD. |
| **conversion_value_local** | Value of the conversion in local currency. |
| **currency** | The 3-letter currency code (ISO-4217) of the transaction. |
| **country** | Country where the user is located. |
| **device_type** | Type of device (iOS, Android). |
| **os_version** | Operating system version. |
| **app_version** | Version of the app when the event occurred. |
| **user_agent** | Device browser user-agent. |
| **ip_address** | Device IP (can be IPv4 or IPv6, with IPv4 preferred when available). |
| **idfa** | [advertisingIdentifier](https://developer.apple.com/documentation/adsupport/asidentifiermanager/advertisingidentifier) on iOS devices |
| **idfv** | [identifierForVendor](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) on iOS devices |
| **advertising_id** | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device |
| **android_id** | On Android 8.0 (API level 26) and higher versions of the platform, a 64-bit number (expressed as a hexadecimal string), unique to each combination of app-signing key, user, and device. For more details, see [Android developer documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| **android_app_set_id** | An [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - unique, per-device, per developer-account user-resettable ID for non-monetizing advertising use cases. |
| **device** | The end-user-visible device model name. |
| **custom_parameters** | JSON of custom parameters passed with the campaign. |

Here is the table structure for the campaign performance metrics:

| Column                | Description                                                                                                  |
| :-------------------- | :----------------------------------------------------------------------------------------------------------- |
| **campaign_id**       | Unique identifier for the user acquisition campaign.                                                                                              |
| **campaign_name**     | Name of the user acquisition campaign.                                                                        |
| **adset_id**          | Unique identifier for the ad set within the campaign.                                                         |
| **adset_name**        | Name of the ad set within the campaign.                                                                       |
| **ad_id**             | Unique identifier for the individual ad.                                                                      |
| **ad_name**           | Name of the individual ad.                                                                                    |
| **platform**          | Platform where the campaign is running (e.g., Meta, TikTok, Google Ads).                                     |
| **date**              | Date for which the metrics are reported.                                                                      |
| **impressions**       | Number of times the ad was displayed.                                                                         |
| **clicks**            | Number of times the ad was clicked.                                                                           |
| **installs**          | Number of app installations attributed to the campaign.                                                       |
| **conversions**       | Number of conversion events attributed to the campaign.                                                       |
| **spend_usd**         | Amount spent on the campaign in USD.                                                                          |
| **spend_local**       | Amount spent on the campaign in local currency.                                                               |
| **cpi_usd**           | Cost per install in USD.                                                                                      |
| **cpc_usd**           | Cost per click in USD.                                                                                        |
| **cpm_usd**           | Cost per thousand impressions in USD.                                                                         |
| **ctr**               | Click-through rate (clicks/impressions).                                                                      |
| **icr**               | Install conversion rate (installs/clicks).                                                                    |
| **ipm**               | Installs per thousand impressions.                                                                            |
| **ltv_usd**           | Lifetime value of users acquired through the campaign in USD.                                                 |

## Events and tags

You can manage what data is communicated by the integration. The integration offers the following configuration options:

| Setting                            | Description                                                  |
| :--------------------------------- | :----------------------------------------------------------- |
| **Exclude Historical Events**      | Opt to exclude events that occurred before the user acquisition campaign was set up. This prevents duplication of events and ensures accurate reporting. |
| **Include events without profile** | Opt to include user acquisition events that are not linked to a user profile in Adapty. These may include events from campaigns that cannot be immediately associated with a specific user. |
| **Send User Attributes**           | If you wish to send user-specific attributes, like language preferences, select this option. Enabling this allows the inclusion of additional information beyond the default campaign data. |

<!-- <Zoom>
  <img src={require('./img/google-cloud-ua-settings.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom> -->

Below the integration settings, there are groups of user acquisition events you can export, send, and store in Google Cloud Storage from Adapty UA. Simply turn on the ones you need. Check the full list of the events offered by Adapty UA [here](ua-events).

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
