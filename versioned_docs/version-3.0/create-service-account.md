---
title: "Create service account in the Google Cloud Console"
description: "Learn how to create a service account for secure API access in Adapty."
metadataTitle: "Creating a Service Account | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

For Adapty to automate data access, a service account is necessary in the Google Play Console.

1. Open [**IAM & Admin** - > **Service accounts**](https://console.cloud.google.com/iam-admin/serviceaccounts) section of the Google Cloud Console. Make sure you use the correct project.


<Zoom>
  <img src={require('./img/17bbf45-google_cloud_create_service_account.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. In the **Service accounts** window, click the **Create service account** button. 


<Zoom>
  <img src={require('./img/b93eec1-service_account_details.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





3. In the **Service account details** sub-section of the **Create service account** window, enter the **Service Account Name** you want. We recommend including "Adapty" in the name to indicate the purpose of this account. The **Service account ID** will be created automatically.

4. Copy the service account email address and save it for future usage.

5. Click the **Create and continue** button.

   

<Zoom>
  <img src={require('./img/e69d713-grant_access_to_project.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




6. In the **Select a role** drop-down list of the **Grant this service account access to project** sub-section, select **Pub/Sub -> Pub/Sub Admin**. This role is required to enable real-time developer notifications.

   

<Zoom>
  <img src={require('./img/976299c-service_account_role.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




7. Click the **Add another role** button. 

8. In a new **Role** drop-down list, select **Monitoring -> Monitoring Viewer**. This role is required to allow monitoring of the notification queue.

9. Click the **Continue** button.

   

<Zoom>
  <img src={require('./img/ffe8d82-grant_user_access.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




10. Click the **Done** button without any changes. The **Service accounts** window opens.

**What's next**

- [Grant permissions to the service account in the Google Play Console](grant-permissions-to-service-account)