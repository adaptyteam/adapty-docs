---
title: "Google Play Store credentials"
description: ""
metadataTitle: ""
---

Google Play Store credentials are used for server-side purchase verification, without them Adapty can't validate and process transactions. Obtaining the credentials is a bit tricky but this guide will help you.

## 1\. Enable APIs in the Google Cloud Console

1. Select the [Google Cloud Project](https://console.cloud.google.com/welcome) you want to use or create a new one. Please make sure to use the same Google Cloud Project during all the steps of this guide.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/0390dd7-001854-October-23-Nk2RAdHn.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





2. Go to the [Google Play Android Developer API](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com) page and click **Enable**.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/1a8e73b-001847-October-23-j1fkdEcd.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/73123aa-001849-October-23-9bvFZZvb.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





3. Go to the [Google Play Developer Reporting API](https://console.cloud.google.com/apis/library/playdeveloperreporting.googleapis.com) page and click **Enable**.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/678d7d4-001855-October-23-qo0C0ZsM.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/afa7b40-001856-October-23-CvHQVAGt.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





## 2\. Create a Service account in the Google Cloud Console

1. Go to Google Cloud Console -> IAM & Admin ->  [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts). Please make sure to use the same Google Cloud Project you used in the previous steps. Click **Create Service Account**.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/1989a9c-001858-October-23-2YWd3DFw.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





2. Enter its name and copy its **ID** (email address) for future use. Click **Create and Continue**.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/1800831-001859-October-23-1BGA5JXy.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





3. In the next step you should add two **Roles**:

- Pub/Sub Admin (to enable Real-time Developer Notifications)
- Monitoring Viewer (to allow monitoring of the notification queue).


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/08e981d-001862-October-23-rKjN3OE9.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/2e7ef1e-001758-September-22-1hDOjkIv.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/646ab43-001759-September-22-qVKTtI9u.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





4. Don't enter anything in this step and click **Done**.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/cb4f948-001760-September-22-eSZBwBdM.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





5. Find the newly created account in the list and in the actions click **Manage keys**. Create a new JSON key and save it locally on your computer. This is the key you will upload to the Adapty Dashboard.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/572a5ec-001761-September-22-55RRChbc.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/d4e7d74-001864-October-23-r75z1IO4.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/47b4418-001865-October-23-ep2cR8lV.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





## 3\. Grant permissions in the Google Play Console

1. Go to the [**Users and permissions**](https://play.google.com/console/u/0/developers/users-and-permissions) page in the Google Play Console and click **Invite new users**.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/8db9ba1-001866-October-23-ZRHyzACg.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





2. Enter the email of the service account you've created in section 2 of this guide.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/bbfa846-001867-October-23-63IVmFQe.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





3. Grant **View app information and download bulk reports (read-only)**, **  
   View financial data, orders, and cancellation survey responses**, **Manage orders and subscriptions** and **Manage store presence** permissions and create the user by clicking **Invite user**. You can grant permissions to the whole account or to one/several applications.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/cafff5b-CleanShot_2021-08-31_at_23.26.08.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





## 4\. Upload Google credentials to Adapty Dashboard

1. Go to Adapty -> App Settings -> [Android SDK](https://app.adapty.io/settings/android-sdk). Upload the **Service Account Key File** (JSON file) to the Adapty Dashboard. Make sure to set a **Package Name** too. If you've done everything correctly, Adapty will generate an RTDN topic for you. Copy it and set up [Real-time Developer Notifications](real-time-developer-notifications-rtdn).


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/4218da3-CleanShot_2023-08-30_at_16.02.482x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





:::note
It takes at least 24 hours for changes to take effect but there's a [hack](https://stackoverflow.com/a/60691844). In [Google Play Console](https://play.google.com/apps/publish/), open any application and in the **Monetize** section go to **Products** -> **Subscriptions**/**In-app products**. Change the description of any product and save the changes. Everything should be working now, you can revert in-app changes. If not, make sure **Google Play Android Developer API** is enabled in [Google Cloud Project](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com).
:::