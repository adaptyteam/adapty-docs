---
title: "Grant permissions to service account in the Google Play Console"
description: "Authorize Adapty's service account by granting essential permissions in the Google Play Console, facilitating seamless management of subscriptions and validation of purchases. Learn how to grant permissions to optimize your app's integration with Adapty"
metadataTitle: "Google Play Console: Granting Permissions to Adapty's Service Account"
---

Grant the required permissions to the service account that Adapty will use to manage subscriptions and validate purchases.

1. Open the [**Users and permissions**](https://play.google.com/console/u/0/developers/8970033217728091060/users-and-permissions) page in the Google Play Console and click the **Invite new users** button.

   
<img
  src={require('./img/7b0e614-users_and_permissions.png').default}
/>



2. In the **Invite user** page, enter the email of the service users you've created.

   
<img
  src={require('./img/3afd002-invite_user.png').default}
/>



3. Switch to the  **Account permissions** tab.

   
<img
  src={require('./img/4e2717b-account_permissions.png').default}
/>



4. Select the following permissions:
   - View app information and download bulk reports (read-only)
   - View financial data, orders, and cancellation survey responses
   - Manage orders and subscriptions
   - Manage store presence
5. Click the **Invite user** button.
6. In the **Send invite?** window, click the **Send invite** button. The service account will show in the user list.