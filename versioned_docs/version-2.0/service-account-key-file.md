---
title: "Google Play Store credentials"
description: ""
metadataTitle: ""
---

Google Play Store credentials are used for server-side purchase verification, without them Adapty can't validate and process transactions. Obtaining the credentials is a bit tricky but this guide will help you.

## 1\. Enable APIs in the Google Cloud Console

1. Select the [Google Cloud Project](https://console.cloud.google.com/welcome) you want to use or create a new one. Please make sure to use the same Google Cloud Project during all the steps of this guide.


<img
  src={require('./img/0390dd7-001854-October-23-Nk2RAdHn.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





2. Go to the [Google Play Android Developer API](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com) page and click **Enable**.


<img
  src={require('./img/1a8e73b-001847-October-23-j1fkdEcd.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>






<img
  src={require('./img/73123aa-001849-October-23-9bvFZZvb.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





3. Go to the [Google Play Developer Reporting API](https://console.cloud.google.com/apis/library/playdeveloperreporting.googleapis.com) page and click **Enable**.


<img
  src={require('./img/678d7d4-001855-October-23-qo0C0ZsM.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>






<img
  src={require('./img/afa7b40-001856-October-23-CvHQVAGt.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





## 2\. Create a Service account in the Google Cloud Console

1. Go to Google Cloud Console -> IAM & Admin ->  [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts). Please make sure to use the same Google Cloud Project you used in the previous steps. Click **Create Service Account**.


<img
  src={require('./img/1989a9c-001858-October-23-2YWd3DFw.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





2. Enter its name and copy its **ID** (email address) for future use. Click **Create and Continue**.


<img
  src={require('./img/1800831-001859-October-23-1BGA5JXy.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





3. In the next step you should add two **Roles**:

- Pub/Sub Admin (to enable Real-time Developer Notifications)
- Monitoring Viewer (to allow monitoring of the notification queue).


<img
  src={require('./img/08e981d-001862-October-23-rKjN3OE9.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>






<img
  src={require('./img/2e7ef1e-001758-September-22-1hDOjkIv.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>






<img
  src={require('./img/646ab43-001759-September-22-qVKTtI9u.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





4. Don't enter anything in this step and click **Done**.


<img
  src={require('./img/cb4f948-001760-September-22-eSZBwBdM.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





5. Find the newly created account in the list and in the actions click **Manage keys**. Create a new JSON key and save it locally on your computer. This is the key you will upload to the Adapty Dashboard.


<img
  src={require('./img/572a5ec-001761-September-22-55RRChbc.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>






<img
  src={require('./img/d4e7d74-001864-October-23-r75z1IO4.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>






<img
  src={require('./img/47b4418-001865-October-23-ep2cR8lV.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





## 3\. Grant permissions in the Google Play Console

1. Go to the [**Users and permissions**](https://play.google.com/console/u/0/developers/users-and-permissions) page in the Google Play Console and click **Invite new users**.


<img
  src={require('./img/8db9ba1-001866-October-23-ZRHyzACg.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





2. Enter the email of the service account you've created in section 2 of this guide.


<img
  src={require('./img/bbfa846-001867-October-23-63IVmFQe.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





3. Grant **View app information and download bulk reports (read-only)**, **View financial data, orders, and cancellation survey responses**, **Manage orders and subscriptions** and **Manage store presence** permissions and create the user by clicking **Invite user**. You can grant permissions to the whole account or to one/several applications.


<img
  src={require('./img/cafff5b-CleanShot_2021-08-31_at_23.26.08.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





## 4\. Upload Google credentials to Adapty Dashboard

1. Go to Adapty -> App Settings -> [Android SDK](https://app.adapty.io/settings/android-sdk). Upload the **Service Account Key File** (JSON file) to the Adapty Dashboard. Make sure to set a **Package Name** too. If you've done everything correctly, Adapty will generate an RTDN topic for you. Copy it and set up [Real-time Developer Notifications](real-time-developer-notifications-rtdn).


<img
  src={require('./img/4218da3-CleanShot_2023-08-30_at_16.02.482x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





:::note
It takes at least 24 hours for changes to take effect but there's a [hack](https://stackoverflow.com/a/60691844). In [Google Play Console](https://play.google.com/apps/publish/), open any application and in the **Monetize** section go to **Products** -> **Subscriptions**/**In-app products**. Change the description of any product and save the changes. Everything should be working now, you can revert in-app changes. If not, make sure **Google Play Android Developer API** is enabled in [Google Cloud Project](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com).
:::