---
title: "Switch from AppsFlyer S2S API 2 to 3"
description: "Learn how Adapty's support for AppsFlyer S2S API 3 provides a seamless transition from API 2, enhancing security and reducing fraud in in-app events. Switch today"
metadataTitle: "Adapty Supports AppsFlyer S2S API 3 Upgrade: Enhanced Security and Fraud Reduction"
---

According to the [official AppsFlyer What's New](https://support.appsflyer.com/hc/en-us/articles/20509378973457-Bulletin-Upgrading-the-AppsFlyer-S2S-API), to provide a more secure experience for API usage and to reduce fraud, AppsFlyer has upgraded its server-to-server (S2S) API for in-app events. The existing endpoint will be deprecated in the future and we recommend to start planning the switch. 

Adapty supports AppsFlyer S2S API 3 and provides you with a seamless switch from API 2. Keep in mind that this switch is one-way, so you won’t be able to return to API 2 once you’ve made the change.

To switch from AppsFlyer S2S API 2 to 3:

1. Open the [AppsFlyer site](https://appsflyer.com/home) and log in.

2. Click **Your account name** -> **Security Center** in the top-left corner of the dashboard.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/be299ea-appsflyer_security_center.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




3. In the **Manage your account security** window, click the **Manage your AppsFlyer API and S2S tokens** button.

4. If you do not have an S2S token, click the **New token** button. If you have it, please proceed with step 8.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/7934920-appsflyer_new_token.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




5. In the **New token** window, enter the name of the token. This name is solely for your reference. 

6. Choose **S2S** in the **Choose type** list.

7. Don't forget to click the **Create new token** button to save the new token.

8. In the **Tokens** window, copy the S2S token.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/d014c25-appsflyer_tokens.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




9. Open [**Integrations** -> **AppsFlyer**](https://app.adapty.io/integrations/appsflyer) in the Adapty Dashboard.

10. In the **AppsFlyer S2S API** field, select **API 3**.

    
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/c0b3e72-appsflyer_switch_API.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




11. Paste the copied S2S key into the **Dev key for iOS** and **Dev key for Android** fields. 

12. Click the **Save** button to confirm the switch.

At this moment, your integration instantly switches to AppsFlyer S2S API 3 and your new events will be sent to the new URL https://api3.appsflyer.com/inappevent.