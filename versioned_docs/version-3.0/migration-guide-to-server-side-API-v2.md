---
title: "Migration guide to server-side API v2"
description: ""
metadataTitle: ""
---

Adapty's Server-Side API v2 introduces new capabilities and improvements to help you manage access levels, transactions, and user profiles more effectively.

## Why Migrate?

The second version of the Server-Side API gives you more flexibility and features when working with Adapty:

- **Separate access level management and transaction recording**:
  - **Grant access without transactions**: Assign access levels to users without requiring transaction details, making it easier to handle compensations, bonuses, or other non-transactional scenarios.
  - **Record one-time purchases without granting access**: Log transactions for consumable product purchases without affecting the user's access level.
- **Enhanced transaction details:** Include more data with transactions, like refunds, billing issues, cancellation reasons, renewals, and more.
- **Profile updates:** Instead of just adding attributes, you can update a user’s profile. For instance, you can add installation metadata or disable external analytics if needed.

Although v1 is still supported, we recommend moving to v2 for expanded functionality and ongoing updates.

## Migration Steps

### General Changes

1. **Base URL Update:**
   - Change from `https://api.adapty.io/api/v1/sdk/` to `https://api.adapty.io/api/v2/server-side-api/`.
2. **Endpoint Changes:** Refer to the updated endpoints for each specific request.
3. **Authorization Updates:**
   - Move `{profile_id_or_customer_user_id}` from the endpoint to a header.
   - Remove `{access_level}` from the endpoint and include it as a parameter where needed.
   - Add a new `adapty-platform` header with options like `iOS`, `macOS`, `iPadOS`, `visionOS`, or `Android`.
4. **Unified Access Revocation:** In v1, you used separate requests to revoke or shorten access. Now, use the [Revoke access level](ss-revoke-access-level) request for both.
5. **New Access Management Requests:** The old [Prolong/grant a subscription for a user](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request is now split into three:
   - [Grant Access Level](ss-grant-access-level): Add or extend access without transaction.
   - [Revoke Access Level](ss-revoke-access-level): Shorten or revoke access without transaction.
   - [Set Transaction](ss-set-transaction): Add transaction details with adding access.
6. **Parameter Updates:** Modify parameters as outlined for each request.
7. **Response Handling:** Update your integration to handle the [new response formats](api-responses).

---

### Prolong/grant a subscription for a user

1. This request is now replaced with three separate requests to distinguish between adding transactions and managing access levels:
   1. **Grant Access Level:** Use this request to extend an access level without linking it to a transaction.
   2. Revoke Access Level:
      - In version 1, you used the [Revoke access level](server-side-api-specs-legacy#revoke-subscription-from-a-user) request to immediately revoke access and the [Prolong/Grant a Subscription for a User](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request to shorten it.
      - In version 2, both actions are handled by the [Revoke access level](ss-revoke-access-level) request.
   3. **Set Transaction:** Use this request to add transaction details to Adapty without managing access levels.
   

---

#### Grant Access Level

:::info

For a detailed description, refer to the [Grant access level](ss-grant-access-level) request.

:::

Grant or extend access for a user without tying it to a transaction.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/grant/access-level/`
- Parameters to keep:
  - **access_level_id**: Previously in the endpoint. Required.
  - **starts_at**: Now nullable.
  - **expires_at**: Optional for lifetime access and nullable.
  

---

#### Revoke access level

:::info

For a detailed description, refer to the [Revoke access level](ss-revoke-access-level) request.

:::

Revoke or shorten a user’s access.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/purchase/profile/revoke/access-level/`
- Parameters to keep:
  - **access_level_id**: Required.
  - **expires_at**: Nullable unless access is revoked immediately.

---

#### Set transaction

:::info

For a detailed description, refer to the [Set transaction](ss-set-transaction) request.

:::

Submit a transaction to Adapty, separate from granting or revoking access.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/`
- **Details:** Parameters depend on whether the purchase is a subscription or one-time product. See specific guidelines for each.

---

##### For Subscription

| **Parameter**                                                | **Change**       | **Type**        | **Required**                            | **Nullable**                             | **Description Change**                                       |
| ------------------------------------------------------------ | ---------------- | --------------- | --------------------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `base_plan_id`                                               | Removed          |                 |                                         |                                          |                                                              |
| `billing_issue_detected_at`                                  | Added            | ISO 8601 date   | :heavy_plus_sign:                       | :heavy_plus_sign:                        | The datetime when a billing issue was detected (e.g., a failed card charge). Subscription might still be active. This is cleared if the payment goes through. |
| `cancellation_reason`                                        | Added            | String          | :heavy_plus_sign:                       | :heavy_plus_sign:                        | Possible reasons for cancellation include: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, or `unknown`. |
| `duration_days`                                              | Removed          |                 |                                         |                                          |                                                              |
| `environment`                                                | Added            | String          | :heavy_minus_sign:                      | :heavy_minus_sign:                       | <p>Environment where the transaction took place. Options are `Sandbox` or `Production.`</p><p> Replaces the `is_sandbox` parameter.</p> |
| `expires_at`                                                 | Changed          | ISO 8601 date   | :heavy_plus_sign:                       | :heavy_plus_sign:                        | The datetime when the access level expires. It may be in the past and may be `null` for lifetime access. |
| `grace_period_expires_at`                                    | Added            | ISO 8601 date   | :heavy_minus_sign:                      | :heavy_minus_sign:                       | The datetime when the [grace period](https://developer.apple.com/news/?id=09122019c) will end, if the subscription is currently in one. |
| `introductory_offer_type`                                    | Removed          |                 |                                         |                                          |                                                              |
| `is_family_shared`                                           | Added            | Boolean         | :heavy_minus_sign:                      | :heavy_minus_sign:                       | A Boolean value indicating whether the product supports family sharing in App Store Connect. iOS only. Always `false` for iOS below 14.0 and macOS below 11.0. |
| `is_lifetime`                                                | Removed          |                 |                                         |                                          |                                                              |
| `is_sandbox`                                                 | Removed          |                 |                                         |                                          | Replaced with the `environment` parameter.                   |
| `offer`                                                      | Added            | Object          | :heavy_plus_sign:                       | :heavy_minus_sign:                       | Represents the purchase offer as an object. See the [Offer](server-side-api-objects#offer) object. |
| `originally_purchased_at`                                    | Added            | ISO 8601 date   | :heavy_plus_sign:                       | :heavy_minus_sign:                       | For subscription chains, this is the purchase date of the original transaction, linked by `store_original_transaction_id`. |
| `price`                                                      | Changed          | Float -> Object | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign:                       | Now represented as a [Price](server-side-api-objects#price) object. |
| `price_locale`                                               | Removed          |                 |                                         |                                          |                                                              |
| `proceeds`                                                   | Removed          |                 |                                         |                                          |                                                              |
| `purchase_type`                                              | Added            | String          | :heavy_plus_sign:                       | :heavy_minus_sign:                       | Specifies product type, here set to `subscription`.          |
| `purchased_at`                                               | Added            | ISO 8601 date   | :heavy_plus_sign:                       | :heavy_minus_sign:                       | Indicates most recent purchase date.                         |
| `refunded_at`                                                | Added            | ISO 8601 date   | :heavy_minus_sign:                      | :heavy_minus_sign:                       | Indicates subscription refund datetime if applicable.        |
| `renew_status`                                               | Added            | Boolean         | :heavy_plus_sign:                       | :heavy_minus_sign:                       | Indicates if subscription auto-renewal is enabled.           |
| `renew_status_changed_at`                                    | Added            | ISO 8601 date   | :heavy_minus_sign:                      | :heavy_minus_sign:                       | Indicates when auto-renewal status changed.                  |
| `starts_at`                                                  | Removed          |                 |                                         |                                          |                                                              |
| `store`                                                      | Changed          | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: -> :heavy_minus_sign: | Store where the product was bought. Options include **app_store**, **play_store**, **stripe**, or the name of your [custom store](initial-custom). |
| `vendor_original_transaction_id` -> `store_original_transaction_id` | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign:                       | <p>For subscriptions, this ID links to the first transaction in a renewal chain. Each renewal is connected to this original transaction.</p><br /><p>If there’s no renewal, store_original_transaction_id matches store_transaction_id.</p> |
| `vendor_product_id` -> `store_product_id`                    | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign:                       | Represents product ID in app stores.                         |
| `vendor_transaction_id` -> `store_transaction_id`            | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign:                       | Represents transaction ID in app stores.                     |
| `variation_id`                                               | Added            | String          | :heavy_minus_sign:                      | :heavy_minus_sign:                       | The variation ID used to trace purchases to the specific paywall they were made from. |

##### For One-time purchase

| **Parameter**                    | **Change** | **Type**        | **Required**                            | **Nullable**       | **Description Change**                                       |
| -------------------------------- | ---------- | --------------- | --------------------------------------- | ------------------ | ------------------------------------------------------------ |
| `base_plan_id`                   | Removed    |                 |                                         |                    |                                                              |
| `cancellation_reason`            | Added      | String          | :heavy_minus_sign:                      | :heavy_minus_sign: | Possible reasons for cancellation: voluntarily_cancelled, billing_error, price_increase, product_was_not_available, refund, cancelled_by_developer, new_subscription_replace, upgraded, unknown, adapty_revoked. |
| `duration_days`                  | Removed    |                 |                                         |                    |                                                              |
| `environment`                    | Added      | String          | :heavy_minus_sign:                      | :heavy_minus_sign: | <p>Environment where the transaction took place. Options are `Sandbox` or `Production.`</p><p> Replaces the `is_sandbox` parameter.</p> |
| `expires_at`                     | Removed    |                 |                                         |                    |                                                              |
| `introductory_offer_type`        | Removed    |                 |                                         |                    |                                                              |
| `is_family_shared`               | Added      | Boolean         | :heavy_minus_sign:                      | :heavy_minus_sign: | Indicates whether the product supports family sharing in App Store Connect. iOS only. Always false for iOS below 14.0 and macOS below 11.0. |
| `is_lifetime`                    | Removed    |                 |                                         |                    |                                                              |
| `is_sandbox`                     | Removed    |                 |                                         |                    | Replaced with the `environment`parameter.                    |
| `offer`                          | Added      | Object          | :heavy_minus_sign:                      | :heavy_minus_sign: | Represents the purchase offer as an object. See the [Offer](server-side-api-objects#offer) object. |
| `price`                          | Changed    | Float -> Object | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | Now represented as a [Price](server-side-api-objects#price) object. |
| `price_locale`                   | Removed    |                 |                                         |                    |                                                              |
| `proceeds`                       | Removed    |                 |                                         |                    |                                                              |
| `purchase_type`                  | Added      | String          | :heavy_plus_sign:                       | :heavy_minus_sign: | Specifies the type of product purchased. Here set to `one_time_purchase`. |
| `purchased_at`                   | Added      | ISO 8601 date   | :heavy_plus_sign:                       | :heavy_minus_sign: | The datetime when the access level was last purchased.       |
| `refunded_at`                    | Added      | ISO 8601 date   | :heavy_minus_sign:                      | :heavy_minus_sign: | If refunded, shows the datetime of the refund.               |
| `starts_at`                      | Removed    |                 |                                         |                    |                                                              |
| `store`                          | Changed    | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | Store where the product was bought. Options include **app_store**, **play_store**, **stripe**, or the name of your [custom store](initial-custom). |
| `vendor_original_transaction_id` -> `store_original_transaction_id` | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign:                       | <p>For subscriptions, this ID links to the first transaction in a renewal chain. Each renewal is connected to this original transaction.</p><br /><p>If there’s no renewal, store_original_transaction_id matches store_transaction_id.</p> |
| `vendor_product_id` -> `store_product_id`                    | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign:                       | Represents product ID in app stores.                         |
| `vendor_transaction_id` -> `store_transaction_id`            | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign:                       | Represents transaction ID in app stores.                     |
| `variation_id`                                               | Added            | String          | :heavy_minus_sign:                      | :heavy_minus_sign:                       | The variation ID used to trace purchases to the specific paywall they were made from. |

---

### Revoke subscription from a user

:::info

For a detailed description, refer to the [Revoke access level](ss-revoke-access-level) request.

:::

In version 1, you used the [Revoke subscription from a user](server-side-api-specs-legacy#revoke-subscription-from-a-user) request to immediately remove access. Now, use the [Revoke access level](ss-revoke-access-level) request to either immediately remove access or shorten it.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/purchase/profile/revoke/access-level/`
- **New Option:** Specify a future revoke date (`revoke_at`) if immediate revocation isn’t needed.

---

### Validate a purchase from Stripe, provide access level to a customer, and import his transaction history from Stripe

No changes

---

### Get info about a user

:::info

For a detailed description, refer to the [Get profile](ss-get-profile) request.

:::

Retrieve complete user profile data without additional parameters.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/profile/`
- **Change:** The User Profile ID or Customer User ID is now passed via headers, and no additional parameters are needed. The **extended** parameter is no longer needed as the complete profile data is always returned.

---

### Set the user's attribute

:::info

For a detailed description, refer to the [Update profile](ss-update-profile) request.

:::

In version 1, you could only update user attributes. With v2, you can modify a wider range of profile fields, such as installation metadata or analytics settings.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/profile/`.

| **Parameter**        | **Change** | **Type**              | **Required**       | **Nullable**                            | **Description Change**                                       |
| -------------------- | ---------- | --------------------- | ------------------ | --------------------------------------- | ------------------------------------------------------------ |
| `analytics_disabled` | Added      | Boolean               | :heavy_minus_sign: | :heavy_minus_sign:                      | Option to opt out of external analytics. When disabled, events won’t be sent to integrations, and `idfa`, `idfv`, and `advertising_id` become nullable. |
| `birthday`           | Changed    | Date -> ISO 8601 date | :heavy_minus_sign: | :heavy_plus_sign: -> :heavy_minus_sign: | Your end user's birthday.                                    |
| `installation_meta`  | Added      | Dictionary            | :heavy_minus_sign: | :heavy_minus_sign:                      | Contains app-specific device details as a dictionary of [Installation Meta](server-side-api-objects#installation-meta) objects. |
| `ip_country`         | Changed    | String                | :heavy_minus_sign: | :heavy_plus_sign: -> :heavy_minus_sign: | Country of the end user in ISO 3166-2 format. Must be passed if the request is made from the server. Otherwise, determined by request IP. |
| `store`              | Added      | String                | :heavy_minus_sign: | :heavy_plus_sign:                       | Store where the product was bought. Options include **app_store**, **play_store**, **stripe**, or the name of your [custom store](initial-custom). |
| `store_country`      | Added      | String                | :heavy_minus_sign: | :heavy_plus_sign:                       | Country of the end user app store.                           |

---

### Delete user's data

:::info

For a detailed description, refer to the [Delete profile](ss-delete-profile) request.

:::

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/profile/`
- **Change:** The User Profile ID or Customer User ID is now passed via headers, and no additional parameters are needed.
