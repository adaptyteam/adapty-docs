---
no_index: true
---

<!--- sharingaccesslevel.md --->

**Enabled (default)**

Identified users (those with a [Customer User ID](identifying-users#setting-customer-user-id-on-configuration)) can share the same [access level](https://adapty.io/docs/access-level) provided by Adapty if their device is signed in to the same Apple/Google ID. This is useful when a user reinstalls the app and logs in with a different email — they’ll still have access to their previous purchase. With this option, multiple identified users can share the same access level.

Even though the access level is shared, all past and future transactions are logged as events in the original Customer User ID to maintain consistent analytics and keep a complete transaction history — including trial periods, subscription purchases, renewals, and more, linked to the same profile.

**Transfer access to new user**

Identified users can keep accessing the [access level](access-level) provided by Adapty, even if they log in with a different [Customer User ID](identifying-users#setting-customer-user-id-on-configuration) or reinstall the app, as long as the device is signed in to the same Apple/Google ID.

Unlike the previous option, Adapty transfers the purchase between identified users. This ensures that the purchased content is available, but only one user can have access at a time. For example, if UserA buys a subscription and UserB logs in on the same device and restores transactions, UserB will gain access to the subscription, and it will be revoked from UserA.

If one of the users (either the new or the old one) is not identified, the access level will still be shared between those profiles in Adapty.

Although the access level is transferred, all past and future transactions are logged as events in the original Customer User ID to maintain consistent analytics and keep a complete transaction history — including trial periods, subscription purchases, renewals, and more, linked to the same profile.

After switching to **Transfer access to new user**, access levels won’t be transferred between profiles immediately. The transfer process for each specific access level is triggered only when Adapty receives an event from the store, such as subscription renewal, restore, or when validating a transaction.

**Disabled**

The first identified user profile to get an access level will retain it forever. This is the best option if your business logic requires that purchases be tied to a single Customer User ID.

Note that access levels are still shared between anonymous users.

You can "untie" a purchase by [deleting the owner’s user profile](ss-delete-profile). After deletion, the access level becomes available to the first user profile that claims it, whether anonymous or identified.

Disabling sharing only affects new users. Subscriptions already shared between users will continue to be shared even after this option is disabled.

:::warning

Apple and Google require in-app purchases to be shared or transferred between users because they rely on the Apple/Google ID to associate the purchase with. Without sharing, restoring purchases might not work upon subsequent reinstalls.

Disabling sharing may prevent users from regaining access after logging in.

We recommend disabling sharing only if your users **are required to log in** before they make a purchase. Otherwise, an identified user could buy a subscription, log into another account, and lose access permanently.
:::

### Which setting should I choose?

| My app...                                                    | Option to choose                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Does not have a login system and only uses Adapty’s anonymous profile IDs. | Use the default option, as access levels are always shared between anonymous profile IDs for all three options. |
| Has an optional login system and allows customers to make purchases before creating an account. | Choose **Transfer access to new user** to ensure that customers who purchase without an account can still restore their transactions later. |
| Requires customers to create an account before purchasing but allows purchases to be linked to multiple Customer User IDs. | Choose **Transfer access to new user** to ensure that only one Customer User ID has access at a time, while still allowing users to log in with a different Customer User ID without losing their paid access. |
| Requires customers to create an account before purchasing, with strict rules that tie purchases to a single Customer User ID. | Choose **Disabled** to ensure that transactions are never transferred between accounts. |
