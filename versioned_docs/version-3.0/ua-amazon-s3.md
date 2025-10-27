---
title: "Amazon S3"
description: "Export user acquisition data to S3 for advanced analytics and reporting."
metadataTitle: "S3 Exports & Data Management | Adapty Docs"
keywords: ['adapty ua', 'user acquisition', 's3', 'amazon']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ZoomImage from '@site/src/components/ZoomImage';

Adapty UA's integration with Amazon S3 allows you to store user acquisition campaign data securely in one central location. You will be able to save your campaign performance data, attribution data, and user acquisition events to your Amazon S3 bucket as .csv files.  
To set up this integration, you will need to follow a few simple steps in the AWS Console and Adapty UA dashboard.

:::note
Adapty UA sends your data every **24h** at 4:00 UTC.

Each file will contain data for the events created for the entire previous calendar day in UTC. For example, the data exported automatically at 4:00 UTC on March 8th will contain all the events created on March 7th from 00:00:00 to 23:59:59 in UTC.
:::

## How to set up Amazon S3 integration

To start receiving data, you'll need the following credentials:

1. Access key ID
2. Secret access key
3. S3 bucket name
4. Folder name inside the S3 bucket

:::note
Nested directories

You can specify nested directories in the Amazon S3 bucket name field, e.g. adapty-ua-events/com.sample-app
:::

### Step 1. Create Amazon S3 credentials

This guide will help you create the necessary credentials in your AWS Console.

#### 1.1. Create Access Policy

1. Navigate to the [IAM Policy Dashboard](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/policies) in your AWS Console
2. Select the option to **Create Policy**

<Zoom>
  <img src={require('./img/7af075c-CleanShot_2023-03-21_at_10.52.002x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the Policy editor, paste the following JSON and change `adapty-s3-integration-test` to your bucket name:

```json showLineNumbers title="Json"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowListObjectsInBucket",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::adapty-s3-integration-test"
        },
        {
            "Sid": "AllowAllObjectActions",
            "Effect": "Allow",
            "Action": "s3:*Object",
            "Resource": [
                "arn:aws:s3:::adapty-s3-integration-test/*",
                "arn:aws:s3:::adapty-s3-integration-test"
            ]
        },
        {
            "Sid": "AllowBucketLocation",
            "Effect": "Allow",
            "Action": "s3:GetBucketLocation",
            "Resource": "arn:aws:s3:::adapty-s3-integration-test"
        }
    ]
}
```

<Zoom>
  <img src={require('./img/d4e474a-CleanShot_2023-03-21_at_10.56.212x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. After completing the policy configuration, you may choose to add tags (optional) and then click **Next** to proceed to the final step
5. In this step, you will name your policy and simply click on the **Create policy** button to finalize the creation process

<Zoom>
  <img src={require('./img/7dcb02f-CleanShot_2023-03-21_at_11.03.372x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

#### 1.2. Create IAM user

To enable Adapty UA to upload raw data reports to your bucket, you will need to provide them with the Access Key ID and Secret Access Key for a user who has write access to the specific bucket.

1. Navigate to the IAM Console and select the [Users section](https://console.aws.amazon.com/iamv2/home#/users)
2. Click on the **Add users** button

<Zoom>
  <img src={require('./img/bb612c8-CleanShot_2023-03-21_at_11.12.392x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Give the user a name, choose **Access key – Programmatic access**, and proceed to permissions

<Zoom>
  <img src={require('./img/467ee4d-j6aoX.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. For the next step, please select the **Add user to group** option and then click the **Create group** button

<Zoom>
  <img src={require('./img/bfd0e80-CleanShot_2023-03-21_at_11.24.592x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. Next, you need to assign a name to your User Group and select the policy that was previously created by you
6. Once you have selected the policy, click on the **Create group** button to complete the process

<Zoom>
  <img src={require('./img/df29c12-CleanShot_2023-03-21_at_11.28.052x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. After successfully creating the group, please **select it** and proceed to the next step

<Zoom>
  <img src={require('./img/1f3722e-CleanShot_2023-03-21_at_11.36.192x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

8. Since this is the final step for this section, you may proceed by simply clicking on the **Create User** button

<Zoom>
  <img src={require('./img/ea43722-CleanShot_2023-03-21_at_11.40.462x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

9. Lastly, you can either **download the credentials in .csv** format or alternatively, copy and paste the credentials directly from the dashboard

<Zoom>
  <img src={require('./img/bcf35e1-S3created.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Step 2. Configure integration in Adapty UA

1. Go to [**Integrations** -> **Amazon S3**](https://app.adapty.io/ua/integrations/s3)
2. Turn on the **Export install events to Amazon S3** toggle.
3. Fill out the following fields to build a connection between Amazon S3 and Adapty UA profiles:

| Field                        | Description                                                  |
|:-----------------------------| :----------------------------------------------------------- |
| **Access Key ID**            | A unique identifier that is used to authenticate a user or application's access to an AWS service.  Find this ID in the downloaded [csv file](ua-amazon-s3#how-to-create-amazon-s3-credentials) . |
| **Secret Access Key**        | A private key that is used in conjunction with the Access Key ID to authenticate a user or application's access to an AWS service. Find this Key in the downloaded  [csv file](ua-amazon-s3#how-to-create-amazon-s3-credentials) . |
| **S3 Bucket Name**           | A globally unique name that identifies a specific S3 bucket within the AWS cloud. S3 buckets are a simple storage service that allows users to store and retrieve data objects, such as files and images, in the cloud. |
| **Folder Inside the Bucker** | The  name of the folder that you want to have inside the selected S3 bucket. Please note that S3 simulates folders using object key prefixes, which are essentially folder names. |
| **Region** (Optional)         | Get your Region from the AWS Management Console under your IAM user account.                                                                                                                                                                                  |

<ZoomImage id="ua-amazon-s3.webp" width="700px" />

## Manual data export

In addition to the automatic event data export to Amazon S3, Adapty UA also provides a manual file export functionality. With this feature, you can select a specific date for the user acquisition data and export it to your S3 bucket manually. This allows you to have greater control over the data you export and when you export it. 

