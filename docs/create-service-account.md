---
title: "Create service account in the Google Cloud Console"
description: "Enhance integration with Adapty by creating a service account in the Google Cloud Console, facilitating streamlined data access automation and seamless connectivity with the Google Play Console. Learn how to create a service account to optimize your app management process"
metadataTitle: "Google Cloud Console: Creating a Service Account for Adapty"
---

For Adapty to automate data access, a service account is necessary in the Google Play Console.

1. Open [**IAM & Admin** - > **Service accounts**](https://console.cloud.google.com/iam-admin/serviceaccounts) section of the Google Cloud Console. Make sure you use the correct project.


<img
  src={require('./img/17bbf45-google_cloud_create_service_account.png').default}
/>





2. In the Click the **Create service account** button. 


<img
  src={require('./img/b93eec1-service_account_details.png').default}
/>





3. In **Service account details** sub-section of the **Create service account** window, enter the **Service Account Name** you want. We recommend including "Adapty" in the name to indicate the purpose of this account. The **Service account ID** will be created automatically.

4. Copy the service account email address and save it for future usage.

5. Click the **Create and continue** button.

   
<img
  src={require('./img/e69d713-grant_access_to_project.png').default}
/>




6. In the **Select a role** drop-down list of the **Grant this service account access to project** sub-section, select **Pub/Sub -> Pub/Sub Admin**. This role is required to enable real-time developer notifications.

   
<img
  src={require('./img/976299c-service_account_role.png').default}
/>




7. Click the **Add another role** button. 

8. In a new **Role** drop-down list, select **Monitoring -> Monitoring Viewer**. This role is required to allow monitoring of the notification queue.

9. Click the **Continue** button.

   
<img
  src={require('./img/ffe8d82-grant_user_access.png').default}
/>




10. Click the **Done** button without any changes. The **Service accounts** window opens.