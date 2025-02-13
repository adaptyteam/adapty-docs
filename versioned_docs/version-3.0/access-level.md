---
title: "Access levels"
description: "Learn about access levels in Adapty and how to configure them for user management."
metadataTitle: "Understanding Access Levels | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Access levels let you control what your app's users can do in your mobile app without hardcoding specific product IDs. Each product defines how long the user gets a certain access level for. So, whenever a user makes a purchase, Adapty grants access to the app for a specific period (for subscriptions) or forever (for lifetime purchases).

When you create an app in the Adapty Dashboard, the `premium` access level is automatically generated. This serves as the default access level and it cannot be deleted. 

You can have multiple access levels per app. This is when they can be useful:

- In a newspaper app where you sell subscriptions to different topics independently, you can create access levels such as `sports` and `science`.
- In a fitness app offering recorded video training under a regular subscription (using the default `premium` access level), customers may opt for a more expensive option providing access to live training with a coach. In this case, you can create a `live_coach_access` level.
- In a language learning app, you can choose to create an access level for each available language.

To begin working with access levels in Adapty, open the **[Paywalls and Products](https://app.adapty.io/access-levels)** section from the Adapty main menu, then select the **Access levels** tab.

The **Access levels** list displays all access levels, including  the `premium` one that is added automatically and those added by you in Adapty.


<Zoom>
  <img src={require('./img/22b4a1e-access_level_list.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


