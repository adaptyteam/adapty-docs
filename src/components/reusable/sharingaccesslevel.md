---
no_index: true
---

<!--- sharingaccesslevel.md --->

:::important
If your application doesn't authenticate users, you can ignore this setting. Anonymous profiles associated with the same store account *always* share their access level.
:::

| Setting | Best for | Description |
| ------- | -------- | ----------- |
| **Enabled (default)**     |    Applications **without authentication**.      |      All user profiles associated with the same store account share the access level. The user can reinstall the app, access the app from a different device, log in and out.   |
| **Transfer access to new user**      |    Applications that allow purchases  **with or without authentication**.      |      Adapty limits purchase access to 1 customer ID at a time. When a new authorized customer ID accesses the application, the old one loses access.        |
| **Disabled** (use with caution)       |     Applications with **mandatory authentication**.   | No access level sharing. Each purchase ties the product to the currently active customer ID. Without mandatory authentication and hand-coded purchase access control, your customers can lose access to their products, and your application can **fail store review**.  |