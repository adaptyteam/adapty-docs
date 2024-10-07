---
title: "Create access level"
description: "Optimize user access management in your mobile app with Adapty's Access Levels feature, facilitating customization without reliance on specific product IDs. Learn how to create access levels for tailored user experiences"
metadataTitle: "Enhanced User Access Control: Creating Access Levels in Adapty"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Access levels let you control what your app's users can do in your mobile app without hardcoding specific product IDs. Each product defines how long the user gets a certain access level for. So, whenever a user makes a purchase, Adapty grants access to the app for a specific period (for subscriptions) or forever (for lifetime purchases).

When you create an app in the Adapty Dashboard, the `premium` access level is automatically generated. This serves as the default access level and it cannot be deleted.

To create a new access level:

1. Open the **[Paywalls and Products](https://app.adapty.io/access-levels) ** section from the Adapty main menu, then select the **Access levels** tab.

   
<Zoom>
  <img src={require('./img/5b2bc83-access_levels.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Click the **Create access level** button. 

   
<Zoom>
  <img src={require('./img/b8646ca-image.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. In the **Create access level** window, assign it an ID. This ID will serve as the identifier within your mobile app, enabling access to additional features upon user purchase. Additionally, this identifier aids in distinguishing one access level from others within the app. Ensure it's clear and easily understandable for your convenience.

4. Click the **Create access level** button to confirm the access level creation.