---
title: "Members"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::note
This page is about Adapty dashboard members

If you want to give different access levels to users of your app check [Access Level.](access-level)
:::

The Adapty dashboard members system allows you to grant different levels of access to Adapty and specify applications for each member.

### Roles

The following roles are available for members in the Adapty dashboard:


<Zoom>
  <img src={require('./img/22c99e5-6187b395ae899b73d8d64a26_Frame_1434.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





**Owner:** The Owner is the original creator of the Adapty account and holds the highest level of access and control. Owners have complete access to Adapty billing, allowing them to manage payment information and subscription plans. Additionally, only Owners and Admins can specify application access for new members. There can be only one Owner for each Adapty account.

**Admin:** Members with the Admin role have full access to the chosen applications.  They can perform various management tasks, including creating and modifying paywalls, conducting A/B tests, analyzing analytics, and managing members within those applications.

**Viewer:** Members with the Viewer role have read-only access to the chosen applications. They can view information but cannot create or modify paywalls, A/B tests, and other features, invite new users, create new apps, and change the app settings.

**Support:** Members with the Support role have access only to user profiles in chosen applications. However, they cannot perform actions like adding new members or accessing any other sections of Adapty. This role is particularly suitable for support teams or individuals who need to assist customers with subscription-related inquiries or troubleshooting.

### How to add a member

To access the members section and add new members, please navigate to the [Account section](https://app.adapty.io/account) in the Adapty dashboard.  Within this section, you have the ability to select roles and specify apps for the new members, provided you have sufficient rights.


<Zoom>
  <img src={require('./img/f72acc9-Area_2023-06-08_181614_Jun_08_2023_0619_PM.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::note
It is only possible to invite an email that is not yet registered in Adapty. If your colleague already created a standalone account, invite another email address of theirs or contact Adapty support - we'll delete the problematic account.
:::

If you want to transfer ownership of Adapty account, contact support.

By following these steps and utilizing the information provided, you can effectively manage member access and permissions within your Adapty account using the Adapty dashboard members system. For details on the number of members allowed for each plan, please refer to our [Pricing documentation.](https://adapty.io/pricing/)