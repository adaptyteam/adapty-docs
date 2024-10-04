---
title: "Google Play Store credentials"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Google Play Store credentials are used for server-side purchase verification, without them Adapty can't validate and process transactions. Obtaining the credentials is a bit tricky but this guide will help you.

## 1\. Enable APIs in the Google Cloud Console

1. Select the [Google Cloud Project](https://console.cloud.google.com/welcome) you want to use or create a new one. Please make sure to use the same Google Cloud Project during all the steps of this guide.


<Zoom>
  <img src={require('./img/0390dd7-001854-October-23-Nk2RAdHn.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Go to the [Google Play Android Developer API](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com) page and click **Enable**.


<Zoom>
  <img src={require('./img/1a8e73b-001847-October-23-j1fkdEcd.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/73123aa-001849-October-23-9bvFZZvb.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. Go to the [Google Play Developer Reporting API](https://console.cloud.google.com/apis/library/playdeveloperreporting.googleapis.com) page and click **Enable**.


<Zoom>
  <img src={require('./img/678d7d4-001855-October-23-qo0C0ZsM.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/afa7b40-001856-October-23-CvHQVAGt.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## 2\. Create a Service account in the Google Cloud Console

1. Go to Google Cloud Console -> IAM & Admin ->  [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts). Please make sure to use the same Google Cloud Project you used in the previous steps. Click **Create Service Account**.


<Zoom>
  <img src={require('./img/1989a9c-001858-October-23-2YWd3DFw.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Enter its name and copy its **ID** (email address) for future use. Click **Create and Continue**.


<Zoom>
  <img src={require('./img/1800831-001859-October-23-1BGA5JXy.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. In the next step you should add two **Roles**:

- Pub/Sub Admin (to enable Real-time Developer Notifications)
- Monitoring Viewer (to allow monitoring of the notification queue).


<Zoom>
  <img src={require('./img/08e981d-001862-October-23-rKjN3OE9.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/2e7ef1e-001758-September-22-1hDOjkIv.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/646ab43-001759-September-22-qVKTtI9u.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





4. Don't enter anything in this step and click **Done**.


<Zoom>
  <img src={require('./img/cb4f948-001760-September-22-eSZBwBdM.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





5. Find the newly created account in the list and in the actions click **Manage keys**. Create a new JSON key and save it locally on your computer. This is the key you will upload to the Adapty Dashboard.


<Zoom>
  <img src={require('./img/572a5ec-001761-September-22-55RRChbc.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/d4e7d74-001864-October-23-r75z1IO4.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/47b4418-001865-October-23-ep2cR8lV.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## 3\. Grant permissions in the Google Play Console

1. Go to the [**Users and permissions**](https://play.google.com/console/u/0/developers/users-and-permissions) page in the Google Play Console and click **Invite new users**.


<Zoom>
  <img src={require('./img/8db9ba1-001866-October-23-ZRHyzACg.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Enter the email of the service account you've created in section 2 of this guide.


<Zoom>
  <img src={require('./img/bbfa846-001867-October-23-63IVmFQe.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. Grant **View app information and download bulk reports (read-only)**, **View financial data, orders, and cancellation survey responses**, **Manage orders and subscriptions** and **Manage store presence** permissions and create the user by clicking **Invite user**. You can grant permissions to the whole account or to one/several applications.


<Zoom>
  <img src={require('./img/cafff5b-CleanShot_2021-08-31_at_23.26.08.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## 4\. Upload Google credentials to Adapty Dashboard

1. Go to Adapty -> App Settings -> [Android SDK](https://app.adapty.io/settings/android-sdk). Upload the **Service Account Key File** (JSON file) to the Adapty Dashboard. Make sure to set a **Package Name** too. If you've done everything correctly, Adapty will generate an RTDN topic for you. Copy it and set up [Real-time Developer Notifications](real-time-developer-notifications-rtdn).


<Zoom>
  <img src={require('./img/4218da3-CleanShot_2023-08-30_at_16.02.482x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::note
It takes at least 24 hours for changes to take effect but there's a [hack](https://stackoverflow.com/a/60691844). In [Google Play Console](https://play.google.com/apps/publish/), open any application and in the **Monetize** section go to **Products** -> **Subscriptions**/**In-app products**. Change the description of any product and save the changes. Everything should be working now, you can revert in-app changes. If not, make sure **Google Play Android Developer API** is enabled in [Google Cloud Project](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com).
:::