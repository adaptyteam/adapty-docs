---
title: "Custom S3"
description: "Export user acquisition data to your custom S3-compatible storage for advanced analytics and reporting."
metadataTitle: "Custom S3 Exports & Data Management | Adapty Docs"
keywords: ['adapty ua', 'user acquisition', 'custom s3', 'storage']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ZoomImage from '@site/src/components/ZoomImage';

Adapty UA's integration with custom S3-compatible storage allows you to store user acquisition campaign data securely in your own S3-compatible storage solution. You will be able to save your campaign performance data, attribution data, and user acquisition events to your custom S3 bucket as .csv files.  
To set up this integration, you will need to follow a few simple steps in your S3-compatible storage console and Adapty UA dashboard.

:::note
Adapty UA sends your data every **24h** at 4:00 UTC.

Each file will contain data for the events created for the entire previous calendar day in UTC. For example, the data exported automatically at 4:00 UTC on March 8th will contain all the events created on March 7th from 00:00:00 to 23:59:59 in UTC.
:::

## Set up Custom S3 integration

To start receiving data, configure the integration in Adapty UA:

1. Go to [**Integrations** -> **Custom S3**](https://app.adapty.io/ua/integrations/custom-s3)
2. Turn on the **Export install events to custom S3** toggle from.
3. Fill out the required fields to build a connection between your custom S3 storage and Adapty UA profiles 


| Field                                   | Description                                                                                                                                                                                                                        |
|:----------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Access Key ID**                       | A unique identifier that is used to authenticate a user or application's access to your S3-compatible storage service. Find this ID in your storage provider's console.                                                            |
| **Secret Access Key**                   | A private key that is used in conjunction with the Access Key ID to authenticate a user or application's access to your S3-compatible storage service. Find this Key in your storage provider's console.                           |
| **S3 Bucket Name**                      | A globally unique name that identifies a specific S3 bucket within your storage environment. S3 buckets are a simple storage service that allows users to store and retrieve data objects, such as files and images, in the cloud. |
| **Region** (Optional)                   | Get your Region from the Management Console.                                                                                                                                                                                                                                   |
| **Folder Inside the Bucket** (Optional) | The name of the folder that you want to have inside the selected S3 bucket. Please note that S3 simulates folders using object key prefixes, which are essentially folder names.                                                   |
| **Custom Endpoint URL**                 | The endpoint URL for your S3-compatible storage service. This should be provided by your storage provider (e.g., MinIO, DigitalOcean Spaces, Wasabi, etc.).                                                                        |

:::note
You can also specify nested directories in the S3 bucket name field, e.g. `adapty-ua-events/com.sample-app`
:::

<ZoomImage id="ua-custom-s3.webp" width="700px" />

## Manual data export

In addition to the automatic event data export to your custom S3 storage, Adapty UA also provides a manual file export functionality. With this feature, you can select a date for the user acquisition data and export it to your S3 bucket manually. This allows you to have greater control over the data you export and when you export it. 
