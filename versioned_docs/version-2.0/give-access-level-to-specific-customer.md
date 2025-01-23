---
title: "Give access level to specific customer"
description: "Enhance user satisfaction by manually assigning access levels to specific customers in Adapty, whether through the intuitive Adapty Dashboard interface or API integration. Learn how to personalize user experiences and optimize support interactions efficiently"
metadataTitle: "Personalized Access Control: Assigning Access Levels to Specific Customers in Adapty"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can manually adjust the access level for a particular customer right in the Adapty Dashboard. This is useful, especially in support scenarios. For example, if you'd like to extend a user's premium usage by an extra week as a thank-you for leaving a fantastic review.

## Give access level to a specific customer in the Adapty Dashboard

1. Open the **[Profiles and Segments](https://app.adapty.io/placements)** section from the Adapty main menu, then select the **Profiles** tab.

   

<Zoom>
  <img src={require('./img/444f659-profiles_list.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. In the **Profiles** window, click on the customer you want to grant access to. 

   

<Zoom>
  <img src={require('./img/96d0abf-add_access_level_to_customer.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. In the opened window, click the **Add access level** button.

   

<Zoom>
  <img src={require('./img/2379036-add_access_level_to_customer1.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. In the opened **Add Access level** window, select the Access level to grant and when it should expire for this customer.

5. Click the **Apply** button.

## Give access level to a specific customer via API

You also have the option to give a customer an access level from your server using the Adapty API. This comes in handy if you have bonuses for referrals or other events related to your products. Find additional details in the [API Specs](ss-grant-access-level) section.