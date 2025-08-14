---
title: "Create access level"
description: "Create and assign access levels in Adapty for better user segmentation."
metadataTitle: "Creating Access Levels | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Access levels let you control what your app's users can do in your mobile app without hardcoding specific product IDs. Each product defines how long the user gets a certain access level for. So, whenever a user makes a purchase, Adapty grants access to the app for a specific period (for subscriptions) or forever (for lifetime purchases).

When you create an app in the Adapty Dashboard, the `premium` access level is automatically generated. This serves as the default access level and it cannot be deleted.

To create a new access level:

1. Go to **[Products](https://app.adapty.io/access-levels)** from the Adapty main menu, then select the **Access levels** tab.

   
<Zoom>
  <img src={require('./img/access-level-list.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Click **Create access level**. 

   
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

4. Click **Create access level** to confirm the access level creation.