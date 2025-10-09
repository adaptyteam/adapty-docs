---
title: "Give access level to specific customer"
description: "Assign specific access levels to customers using Adapty’s advanced tools."
metadataTitle: "Assign Access Levels to Customers | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can manually adjust the access level for a particular customer right in the Adapty Dashboard. This is useful, especially in support scenarios. For example, if you'd like to extend a user's premium usage by an extra week as a thank-you for leaving a fantastic review.

## Give access level to a specific customer in the Adapty Dashboard

1. Go to **[Profiles and Segments](https://app.adapty.io/placements)** from the Adapty main menu.

   

<Zoom>
  <img src={require('./img/profiles-list.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Click on the customer you want to grant access to. 

3. Click **Add access level**.

   

<Zoom>
  <img src={require('./img/add-access-level.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. Select the access level to grant and when it should expire for this customer.

5. Click **Apply**.

## Give access level to a specific customer via API

You also have the option to give a customer an access level from your server using the Adapty API. This comes in handy if you have bonuses for referrals or other events related to your products. Find additional details on the [Grant access level with server-side API](ss-grant-access-level) page.