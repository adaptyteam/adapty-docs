---
title: "Google Cloud Storage"
description: "Integrate Google Cloud Storage with Adapty UA for secure user acquisition data storage."
metadataTitle: "Google Cloud Storage Integration | Adapty Docs"
keywords: ['adapty ua', 'user acquisition', 'google cloud', 'gcs']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ZoomImage from '@site/src/components/ZoomImage';

Adapty UA's integration with Google Cloud Storage allows you to store user acquisition campaign data securely in one central location. You will be able to save your campaign performance data, attribution data, and user acquisition events to your Google Cloud Storage bucket as .csv files.  
To set up this integration, you will need to follow a few simple steps in the Google Cloud Console and Adapty UA Dashboard.

:::note
Schedule

Adapty UA sends your data to Google Cloud Storage every 24h at 4:00 UTC.

Each file will contain data for the events created for the entire previous calendar day in UTC. For example, the data exported automatically at 4:00 UTC on March 8th will contain all the events created on March 7th from 00:00:00 to 23:59:59 in UTC.
:::

## How to set up Google Cloud storage integration

### Step 1. Create Google Cloud Storage credentials

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

11. After passing these steps have successfully completed the necessary setup steps in the Google Cloud Console! The final step involves entering the bucket's name and downloading the JSON file for use in Adapty UA

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

### Step 2. Configure integration in Adapty UA

1. Go to [**Integrations** -> **Google Cloud Storage**](https://app.adapty.io/ua/integrations/google-cloud-storage)
2. Turn on the **Export install events to Google Cloud Storage** toggle
3. Fill out the required fields to build a connection between Google Cloud Storage and Adapty UA:

| Field                                     | Description                                                                                                                                                                                                 |
|:------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Google Cloud service account key file** | The downloaded private [JSON key file](ua-google-cloud-storage#create-google-cloud-storage-credentials).                                                                       |
| **Google Cloud bucket name**              | The name of the bucket in Google Cloud Storage where you want to store your data. It should be unique within the Google Cloud Storage environment and should not contain any spaces.                        |
| **Folder inside the bucket**              | The name of the folder inside the bucket where you want to store your data. It should be unique within the bucket and can be used to organize your data. This field is optional to fill.                    |

<ZoomImage id="ua-google-cloud.webp" width="700px" />

## Manual data export

In addition to the automatic event data export to Google Cloud Storage, Adapty UA also provides a manual file export functionality. With this feature, you can select a specific date for the user acquisition data and export it to your GCS bucket manually. This allows you to have greater control over the data you export and when you export it.
