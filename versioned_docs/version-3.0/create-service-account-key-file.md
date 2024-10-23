---
title: "Generate service account key file  in the Google Play Console"
description: "Enhance app security and establish a secure link between your Play Store mobile application and Adapty by generating service account key files in the Google Play Console. Learn how to generate key files to ensure the security of your app and prevent unauthorized access"
metadataTitle: "Google Play Console: Generating Service Account Key Files for Adapty"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

To link your mobile app on the Play Store with Adapty, you'll need to generate special service account key files in the Google Play Console and upload them to Adapty. These files help secure your app and prevent unauthorized access.

:::warning
It usually takes at least 24 hours for your new service account to become active. However, there's a [hack](https://stackoverflow.com/a/60691844). After creating the service account in the [Google Play Console](https://play.google.com/apps/publish/), open any application and navigate to **Monetize** -> **Products** -> **Subscriptions/In-app products**. Edit the description of any product and save the changes. This should activate the service account immediately, and you can revert the changes afterward.
:::

1. Open the [**Service accounts**](https://console.cloud.google.com/iam-admin/serviceaccounts) section in the Google Play Console. Ensure you’ve selected the correct project.  


<Zoom>
  <img src={require('./img/c3156cb-action_manage_keys.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. In the window that opens, click **Add key** and choose **Create new key** from the dropdown menu.

   

<Zoom>
  <img src={require('./img/44b30ee-create_new_key.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. In the **Create private key for [Your_project_name]** window, click **Create**. Your private key will be saved to your computer as a JSON file. You can find it using the file name provided in the **Private key saved to your computer** window. 

   

<Zoom>
  <img src={require('./img/e7b8101-cretae_private_key.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. In the **Create private key for Your_project_name** window, click the **Create **button. This action will save your private key on your computer as a JSON file. You can use the name of the file provided in the opened **Private key saved to your computer** window to locate it if needed. 

   

<Zoom>
  <img src={require('./img/187ddc6-Private_key_saved.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




You’ll need this file when you [initially integrate Adapty with Google Play](google-play-store-connection-configuration).

:::warning
It usually takes at least 24 hours for your new service account to become active. However, there's a [hack](https://stackoverflow.com/a/60691844). After creating the service account in the [Google Play Console](https://play.google.com/apps/publish/), open any application and navigate to **Monetize** -> **Products** -> **Subscriptions/In-app products**. Edit the description of any product and save the changes. This should activate the service account immediately, and you can revert the changes afterward.
:::

**What's next**

- [Configure Google Play Store integration](google-play-store-connection-configuration)