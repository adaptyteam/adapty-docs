---
title: "Access level sharing"
description: "Allow users to access purchases from multiple accounts"
metadataTitle: "Share access level across accounts | Adapty Docs"
---

## Default behavior

When a user makes a purchase, Adapty ties their [access level](access-level) to the device's Apple/Google ID. If a device is authorized, any account you log into will have access to the purchased product.

If the user owns more than one device with the same Apple/Google ID, they can even log into a different account on each device, and access paid content from multiple accounts simultaneously.

Adapty calls this process **access level sharing**. It is enabled out of the box for all new applications. You can use the default behaviour, or set a different shared access level policy that fits your business model:

* [Limit purchase access to one account at a time](#limit-purchase-access-to-one-account-at-a-time). The user can sign in and out of accounts at will, but only one account at a time can access the purchases.
* [Disable access level sharing](#disable-access-level-sharing) completely. Adapty will tie the product to the active [Customer User ID](identifying-users#setting-customer-user-id-on-configuration) at the time of purchase. Every user can only access their own purchases.

<details>

    <summary>Which access sharing policy should I choose? (Click to expand)</summary>

    | My app...                                                    | Best option                                             |
    | ------------------------------------------------------------ | ------------------------------------------------------------ |
    | Does not have authentication capabilities, and only uses Adapty’s anonymous profile IDs. | Use the default policy. Note: anonymous profiles share the access level regardless of your selected policy. |
    | Can authenticate users, but allows them to make purchases without an account. | Enable the **Transfer access to new user** setting. The users will be able to sign up and claim anonymous purchases. |
    | Requires customers to create an account before a purchase, but can link a single product to multiple Customer User IDs. | Enable the **Transfer access to new user** setting. Multiple accounts will be able to access the product, but only in sequence. |
    | Requires customers to create an account before purchasing, with strict rules that tie purchases to a single Customer User ID. | **Disable** access level sharing. |

</details>

## Limit purchase access to one account at a time

If you select the **Transfer access to new user** setting, Adapty limits purchase access to 1 account at a time. The device owner can reinstall the app, log in and out, but cannot access the same product from more than one account simultaneously.

When you log out of account A, and into account B, Adapty revokes access from the first account, and authorizes the second. If one of the users does not have a distinct identity, the two will continue to share the access level. This is necessary to prevent access loss in applications without mandatory authentication.

When you enable this behavior, Adapty does not immediately update the access levels of existing users. This process occurs when the user triggers a new store event: for example, renews the subscription, or restores the purchases.

## Disable access level sharing

:::note
Anonymous user profiles *always* share their access level, regardless of this setting.
:::

:::warning
Only disable access level sharing if you prohibit anonymous purchases.

In-app purchases that can be shared or transferred diminish the likelihood of users permanently losing access to paid products due to authentication issues. If you disable access sharing, some users may not be able to restore their purchases.
:::

If you disable access level sharing, Adapty ties the product to the active [Customer User ID](identifying-users#setting-customer-user-id-on-configuration) at the time of the purchase. This policy allows for stict 1-to-1 product distribution, and works best with mandatory authentication.

Adapty cannot revoke the shared access levels of existing users. When you disable access level sharing, users that already share subscriptions will continue to do so. This change will only affect future purchases.

You can transfer the product from one user to another without establishing a shared access level. When you [delete a user profile](ss-delete-profile), the associated products become free to claim. The next application user, whether anonymous or identified, will gain access to the products.

## Access sharing in analytics

To maintain consistent charts and graphs, Adapty treats data from all accounts that share the same access level as if it were from a single customer. This data is logged under the active [Customer User ID](identifying-users#setting-customer-user-id-on-configuration) at the time of purchase.
