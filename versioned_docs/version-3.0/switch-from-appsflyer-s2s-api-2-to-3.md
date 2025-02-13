---
title: "Switch from AppsFlyer S2S API 2 to 3"
description: "Switching from AppsFlyer S2S API 2 to 3 | Adapty Docs"
metadataTitle: "Upgrade from AppsFlyer S2S API 2 to 3 in Adapty."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

According to the [official AppsFlyer What's New](https://support.appsflyer.com/hc/en-us/articles/20509378973457-Bulletin-Upgrading-the-AppsFlyer-S2S-API), to provide a more secure experience for API usage and to reduce fraud, AppsFlyer has upgraded its server-to-server (S2S) API for in-app events. The existing endpoint will be deprecated in the future and we recommend to start planning the switch. 

Adapty supports AppsFlyer S2S API 3 and provides you with a seamless switch from API 2. Keep in mind that this switch is one-way, so you won’t be able to return to API 2 once you’ve made the change.

To switch from AppsFlyer S2S API 2 to 3:

1. Open the [AppsFlyer site](https://appsflyer.com/home) and log in.

2. Click **Your account name** -> **Security Center** in the top-left corner of the dashboard.

   

<Zoom>
  <img src={require('./img/be299ea-appsflyer_security_center.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. In the **Manage your account security** window, click the **Manage your AppsFlyer API and S2S tokens** button.

4. If you do not have an S2S token, click the **New token** button. If you have it, please proceed with step 8.

   

<Zoom>
  <img src={require('./img/7934920-appsflyer_new_token.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




5. In the **New token** window, enter the name of the token. This name is solely for your reference. 

6. Choose **S2S** in the **Choose type** list.

7. Don't forget to click the **Create new token** button to save the new token.

8. In the **Tokens** window, copy the S2S token.

   

<Zoom>
  <img src={require('./img/d014c25-appsflyer_tokens.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




9. Open [**Integrations** -> **AppsFlyer**](https://app.adapty.io/integrations/appsflyer) in the Adapty Dashboard.

10. In the **AppsFlyer S2S API** field, select **API 3**.

    

<Zoom>
  <img src={require('./img/c0b3e72-appsflyer_switch_API.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




11. Paste the copied S2S key into the **Dev key for iOS** and **Dev key for Android** fields. 

12. Click the **Save** button to confirm the switch.

At this moment, your integration instantly switches to AppsFlyer S2S API 3 and your new events will be sent to the new URL: `https://api3.appsflyer.com/inappevent`.