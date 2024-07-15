---
title: "Enable Developer APIs in Google Play Console"
description: "Optimize your subscription model by enabling Developer APIs in the Google Play Console for seamless integration with Adapty. Learn how to activate Developer APIs to facilitate automated processes and real-time data analysis for enhanced subscription management"
metadataTitle: "Google Play Console: Enabling Developer APIs for Adapty Integration"
---

If your mobile app is available in the Play Store, activating Developer APIs is crucial for integrating it with Adapty. This step ensures seamless communication between your app and our platform, facilitating automated processes and real-time data analysis to optimize your subscription model. The following APIs should be enabled:

- [Google Play Android Developer API](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com)
- [Google Play Developer Reporting API](https://console.cloud.google.com/apis/library/playdeveloperreporting.googleapis.com)
- [Cloud Pub/Sub API](https://console.cloud.google.com/marketplace/product/google/pubsub.googleapis.com)

If your app isn't distributed via the Play Store, you can skip this step. However, if you do sell through the Play Store, you can delay this step for now, though it's crucial for Adapty's basic functionality. After completing the onboarding process, you can configure the application store settings in the **App settings** section.

Here's how to enable Developer APIs in the Google Play Console:

1. Open the [Google Cloud Console](https://console.cloud.google.com/). 

2. In the top-left corner of the Google Cloud window, select the project you wish to use or create a new one. Ensure you use the same Google Cloud project until you upload the service account key file to Adapty.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/fd66a11-google_cloud_project.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




3. Open the [**Google Play Android Developer API**](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com) page. 

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/f754f72-google_play_api.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




4. Click the **Enable **button and wait for the status **Enabled** to show. This means the Google Android Developer API is enabled.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/d47ed14-google_play_api_create_credentials.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




5. Open the [**Google Play Developer Reporting API**](https://console.cloud.google.com/apis/library/playdeveloperreporting.googleapis.com) page.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/966cf73-Google_play_developer_reporting_api.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




6. Click the **Enable **button and wait for the status **Enabled** to show.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/e776d77-Google_play_developer_reporting_api_enabled.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




7. Open the [**Cloud Pub/Sub API**](https://console.cloud.google.com/marketplace/product/google/pubsub.googleapis.com) page.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/b13f609-enable_Cloud_Pub_Sub_API.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




8. Click the **Enable **button and wait for the status **Enabled** to show.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/3f45602-Cloud_Pub_Sub_API_enabled.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




Developer APIs are enabled.

You can recheck it in the [**APIs & Services**](https://console.cloud.google.com/apis/dashboard) page of teh Google Cloud Console. Scroll the page down and validate the table at the bottom of the page contains all 3 APIs:

- Google Play Android Developer API
- Google Play Developer Reporting API
- Cloud Pub/Sub API


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/b81d174-google_enabled_api.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>


