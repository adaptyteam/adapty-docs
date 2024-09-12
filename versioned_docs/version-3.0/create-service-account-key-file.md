---
title: "Generate service account key file  in the Google Play Console"
description: "Enhance app security and establish a secure link between your Play Store mobile application and Adapty by generating service account key files in the Google Play Console. Learn how to generate key files to ensure the security of your app and prevent unauthorized access"
metadataTitle: "Google Play Console: Generating Service Account Key Files for Adapty"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

To link your mobile application, sold via the Play Store, with Adapty, you'll need to generate special service account key files in the Google Play Console and then upload them to Adapty. These files ensure the security of your app, preventing unauthorized access.

1. Open the [**Service accounts**](https://console.cloud.google.com/iam-admin/serviceaccounts) section of the Google Play Console. Make sure you've chosen the correct project.  


<Zoom>
  <img src={require('./img/c3156cb-action_manage_keys.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Locate the newly created service account in the list. Click the ellipsis button in the **Actions** column next to it, then select the **Manage keys** action.

   
<Zoom>
  <img src={require('./img/44b30ee-create_new_key.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. In the opened window named after your project, click the **Add key** button, and in the opened drop-down list, select the **Create new key** option. 

   
<Zoom>
  <img src={require('./img/e7b8101-cretae_private_key.png').default}
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
  <img src={require('./img/187ddc6-Private_key_saved.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




The created file will be needed during the [initial integration of Adapty with Google Play](google-play-store-connection-configuration) step.