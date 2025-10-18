---
title: "Custom S3"
description: "Export user acquisition data to your custom S3-compatible storage for advanced analytics and reporting."
metadataTitle: "Custom S3 Exports & Data Management | Adapty Docs"
keywords: ['adapty ua', 'user acquisition', 'custom s3', 'storage']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty UA's integration with custom S3-compatible storage allows you to store user acquisition campaign data securely in your own S3-compatible storage solution. You will be able to save your campaign performance data, attribution data, and user acquisition events to your custom S3 bucket as .csv files.  
To set up this integration, you will need to follow a few simple steps in your S3-compatible storage console and Adapty UA dashboard.

:::note
Schedule

Adapty UA sends your data every **24h** at 4:00 UTC.

Each file will contain data for the events created for the entire previous calendar day in UTC. For example, the data exported automatically at 4:00 UTC on March 8th will contain all the events created on March 7th from 00:00:00 to 23:59:59 in UTC.
:::

## How to set up Custom S3 integration

To start receiving data, you'll need the following credentials:

1. Access key ID
2. Secret access key
3. S3 bucket name
4. Folder name inside the S3 bucket
5. S3 endpoint URL (for custom S3-compatible storage)

:::note
Nested directories

You can specify nested directories in the S3 bucket name field, e.g. adapty-ua-events/com.sample-app
:::

### Step 1. Configure integration in Adapty UA

1. Go to [**Integrations** -> **Custom S3**](https://app.adapty.io/ua/integrations/custom-s3)
2. Turn on the toggle from off to on
3. Fill out the required fields to build a connection between your custom S3 storage and Adapty UA profiles 

<!-- <Zoom>
  <img src={require('./img/custom-s3-ua-setup.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom> -->

In the Adapty UA Dashboard, the following fields are needed to set up the connection:

| Field                        | Description                                                  |
| :--------------------------- | :----------------------------------------------------------- |
| **Access Key ID**            | A unique identifier that is used to authenticate a user or application's access to your S3-compatible storage service.  Find this ID in your storage provider's console. |
| **Secret Access Key**        | A private key that is used in conjunction with the Access Key ID to authenticate a user or application's access to your S3-compatible storage service. Find this Key in your storage provider's console. |
| **S3 Bucket Name**           | A globally unique name that identifies a specific S3 bucket within your storage environment. S3 buckets are a simple storage service that allows users to store and retrieve data objects, such as files and images, in the cloud. |
| **Folder Inside the Bucket** | The name of the folder that you want to have inside the selected S3 bucket. Please note that S3 simulates folders using object key prefixes, which are essentially folder names. |
| **S3 Endpoint URL**          | The endpoint URL for your S3-compatible storage service. This should be provided by your storage provider (e.g., MinIO, DigitalOcean Spaces, Wasabi, etc.). |

## Supported S3-compatible storage providers

Adapty UA supports integration with various S3-compatible storage providers, including:

- **MinIO** - Open source object storage
- **DigitalOcean Spaces** - Object storage service
- **Wasabi** - Cloud storage service
- **Backblaze B2** - Cloud storage service
- **Cloudflare R2** - Object storage service
- **Any S3-compatible API** - Custom or enterprise storage solutions

## Manual data export

In addition to the automatic event data export to your custom S3 storage, Adapty UA also provides a manual file export functionality. With this feature, you can select a specific time interval for the user acquisition data and export it to your S3 bucket manually. This allows you to have greater control over the data you export and when you export it. 

The specified date range will be used to export the events created from Date A 00:00:00 UTC up to Date B 23:59:59 UTC.

<!-- <Zoom>
  <img src={require('./img/custom-s3-ua-export.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom> -->

## Table structure

In Custom S3 integration, Adapty UA provides tables to store historical data for user acquisition events, campaign performance metrics, and attribution data. The tables contain information about campaign performance, user attribution, and conversion events, among other data points. Essentially, these tables log all user acquisition data generated by campaigns for a given time period.

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Here is the table structure for the user acquisition events:

| Column                          | Description                                                                                                                                                                                                                                                                                                                            |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **profile_id**                  | Adapty user ID.                                                                                                                                                                                                                                                                                                                        |
| **event_type**                  | Lower cased event name. Refer to the [Events](events) section to learn event types.                                                                                                                                                                                                                                                    |
| **event_datetime**              | ISO 8601 date.                                                                                                                                                                                                                                                                                                                         |
| **campaign_id**                 | Unique identifier for the user acquisition campaign.                                                                                                                                                                                                                                                                                   |
| **campaign_name**               | Name of the user acquisition campaign.                                                                                                                                                                                                                                                                                                 |
| **adset_id**                    | Unique identifier for the ad set within the campaign.                                                                                                                                                                                                                                                                                  |
| **adset_name**                  | Name of the ad set within the campaign.                                                                                                                                                                                                                                                                                                |
| **ad_id**                       | Unique identifier for the individual ad.                                                                                                                                                                                                                                                                                               |
| **ad_name**                     | Name of the individual ad.                                                                                                                                                                                                                                                                                                             |
| **platform**                    | Platform where the campaign is running (e.g., Meta, TikTok, Google Ads).                                                                                                                                                                                                                                                               |
| **attribution_source**          | Attribution source (e.g., Meta, TikTok, AppsFlyer, Adjust).                                                                                                                                                                                                                                                                            |
| **attribution_network_user_id** | ID assigned to the user by attribution source.                                                                                                                                                                                                                                                                                         |
| **attribution_status**          | Can be organic, non_organic or unknown.                                                                                                                                                                                                                                                                                                |
| **attribution_channel**         | Marketing channel name.                                                                                                                                                                                                                                                                                                                |
| **attribution_campaign**        | Marketing campaign name.                                                                                                                                                                                                                                                                                                               |
| **attribution_ad_group**        | Attribution ad group.                                                                                                                                                                                                                                                                                                                  |
| **attribution_ad_set**          | Attribution ad set.                                                                                                                                                                                                                                                                                                                    |
| **attribution_creative**        | Attribution creative keyword.                                                                                                                                                                                                                                                                                                          |
| **click_datetime**              | ISO 8601 date when the user clicked the ad.                                                                                                                                                                                                                                                                                            |
| **install_datetime**            | ISO 8601 date when the user installed the app.                                                                                                                                                                                                                                                                                         |
| **conversion_datetime**         | ISO 8601 date when the conversion event occurred.                                                                                                                                                                                                                                                                                      |
| **conversion_type**             | Type of conversion (e.g., subscription_started, subscription_renewed, non_subscription_purchase).                                                                                                                                                                                                                                       |
| **conversion_value_usd**        | Value of the conversion in USD.                                                                                                                                                                                                                                                                                                        |
| **conversion_value_local**      | Value of the conversion in local currency.                                                                                                                                                                                                                                                                                             |
| **currency**                    | The 3-letter currency code (ISO-4217) of the transaction.                                                                                                                                                                                                                                                                              |
| **country**                     | Country where the user is located.                                                                                                                                                                                                                                                                                                     |
| **device_type**                 | Type of device (iOS, Android).                                                                                                                                                                                                                                                                                                         |
| **os_version**                  | Operating system version.                                                                                                                                                                                                                                                                                                              |
| **app_version**                 | Version of the app when the event occurred.                                                                                                                                                                                                                                                                                            |
| **user_agent**                  | Device browser user-agent.                                                                                                                                                                                                                                                                                                             |
| **ip_address**                  | Device IP (can be IPv4 or IPv6, with IPv4 preferred when available).                                                                                                                                                                                                                                                                   |
| **idfa**                        | [advertisingIdentifier](https://developer.apple.com/documentation/adsupport/asidentifiermanager/advertisingidentifier) on iOS devices                                                                                                                                                                                                  |
| **idfv**                        | [identifierForVendor](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) on iOS devices                                                                                                                                                                                                             |
| **advertising_id**              | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device                                                                                                                                                                                           |
| **android_id**                  | On Android 8.0 (API level 26) and higher versions of the platform, a 64-bit number (expressed as a hexadecimal string), unique to each combination of app-signing key, user, and device. For more details, see [Android developer documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| **android_app_set_id**          | An [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - unique, per-device, per developer-account user-resettable ID for non-monetizing advertising use cases.                                                                                                         |
| **device**                      | The end-user-visible device model name.                                                                                                                                                                                                                                                                                                |
| **custom_parameters**           | JSON of custom parameters passed with the campaign.                                                                                                                                                                                                                                                                                    |

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
  <img src={require('./img/custom-s3-ua-settings.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom> -->

Below the integration settings, there are groups of user acquisition events you can export, send, and store in your custom S3 storage from Adapty UA. Simply turn on the ones you need.

<!-- <Zoom>
  <img src={require('./img/custom-s3-ua-events.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom> -->
