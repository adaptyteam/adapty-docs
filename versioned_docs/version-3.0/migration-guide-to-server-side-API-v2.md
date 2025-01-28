---
title: "Migration guide to server-side API v2"
description: ""
metadataTitle: ""
toc_max_heading_level: 5
---

Adapty's Server-Side API v2 introduces new capabilities and improvements to help you manage access levels, transactions, and user profiles more effectively.

## Why Migrate?

The second version of the Server-Side API gives you more flexibility and features when working with Adapty:

- **Separate access level management**: Assign access levels to users without requiring transaction details, making it easier to handle compensations, bonuses, or other non-transactional scenarios.
- **Record one-time purchases**: Log transactions for consumable product purchases by providing consumable-product-specific fields.
- **Enhanced transaction details:** Include more data with transactions, like refunds, billing issues, cancellation reasons, renewals, and more.
- **Profile updates:** Instead of just adding attributes, you can update a user’s profile. For instance, you can add installation metadata or disable external analytics if needed.

Although v1 is still supported, we recommend moving to v2 for expanded functionality and ongoing updates.

## Changes Overview

| Change                              | Required action                                              |
| ----------------------------------- | ------------------------------------------------------------ |
| **Base URL and Endpoint**           | Base URL and all endpoints are changed. Update your configuration as described in the request endpoints |
| **Request Headers**                 | <ol><li> Add either `adapty-profile-id` or `adapty-customer-user-id` as a header.</li><li> Add a new `adapty-platform` header.</li></ol> |
| **Request and Response Structure**  | Modify parameters as outlined for each request and update your integration to handle the [new response formats](api-responses). |
| **Changed access level management** | The old [Prolong/grant a subscription for a user](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request is now split into three: <ul><li> [Set Transaction](ss-set-transaction): Add transaction details with adding access.</li><li> [Grant Access Level](ss-grant-access-level): Add or extend access without transaction.</li><li> [Revoke Access Level](ss-revoke-access-level): Shorten or revoke access without transaction.</li></ul> |

## Migration Steps

:::note

To simplify using our server-side API, we've prepared a Postman collection and an environment file you can download and import into Postman.

[Download the collection and environment](Adapty_server_side_API_postman_collection.zip)

:::

<!---


1. **Base URL and Endpoint**: Please pay attention to the request endpoints and update all of them with new ones.
2. **Request Header**: In v2, requests require either `adapty-profile-id` or `adapty-customer-user-id` as the header. In addition, a new `adapty-platform` header should be added to the request.
3. **New Access Management Requests:** The old [Prolong/grant a subscription for a user](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request is now split into three:
   - [Set Transaction](ss-set-transaction): Add transaction details with adding access.
   - [Grant Access Level](ss-grant-access-level): Add or extend access without transaction.
   - [Revoke Access Level](ss-revoke-access-level): Shorten or revoke access without transaction.
4. **Request and Response Structure:** Modify parameters as outlined for each request and update your integration to handle the [new response formats](api-responses).

--->

### Step 1. Configure request headers

Add new request headers as follows:

| **Header**                  | **Description**                                              |
| --------------------------- | ------------------------------------------------------------ |
| **adapty-profile-id**       | (Required, choose one) The user’s Adapty profile ID. Visible in the **Adapty ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. Interchangeable with **adapty-customer-user-id**, use any of them. |
| **adapty-customer-user-id** |<p>(Required, choose one) The user’s ID in your system. Visible in the **Customer user ID** field in the [Adapty Dashboard -> **Profiles**](https://app.adapty.io/profiles/users) -> specific profile page. Interchangeable with **adapty-profile-id**, use any of them.</p><p>⚠️ Works only if you [identify users](http://localhost:3000/docs/identifying-users) in your app code using the Adapty SDK.</p>|
| **adapty-platform**         | Specify the app's platform. Possible options: `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`. |

---

### Step 2. Change transaction and access management requests

In version 1, you used to use:

- [Prolong/Grant a Subscription for a User](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request:  to record a transaction and grant or shorten access level.
- [Revoke access level](server-side-api-specs-legacy#revoke-subscription-from-a-user) request: to immediately revoke access.

They are now replaced with three separate requests to distinguish between adding transactions and managing access levels:

1. **[Grant Access Level](ss-grant-access-level):** Use this request to extend an access level without linking it to a transaction.
2. **[Revoke Access Level](ss-revoke-access-level):** to immediately revoke or shorten access.
3. **[Set Transaction](ss-set-transaction):** Use this request to add transaction details to Adapty with access levels.

---

#### Step 2.1. How to grant access level

:::info

For a detailed description, refer to the [Grant access level](ss-grant-access-level) request.

:::

In version 1, the [Prolong/grant a subscription for a user](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request was used to grant access. Now you can grant access with the [Grant access level](ss-grant-access-level) request without providing transaction details.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/grant/access-level/`
- Parameters to keep:
  - **access_level_id**: Previously in the endpoint. Required.
  - **starts_at**: Now nullable.
  - **expires_at**: Optional for lifetime access and nullable.

<!---

| Change     | Old value                                                    | How to change                                                |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Endpoint   | `https://api.adapty.io/api/v1/sdk/profiles/{profile_id_or_customer_user_id}/paid-access-levels/{access_level}/grant/` | `https://api.adapty.io/api/v2/server-side-api/grant/access-level/` |
| Parameters | Many transaction parameters that are no longer needed in this request. | Parameters to keep: <ul><li> **access_level_id**: Previously in the endpoint. Required.</li><li> **starts_at**: Now nullable.</li><li> **expires_at**: Optional for lifetime access and nullable.</li></ul> |

--->

---

#### Step 2.2. How to revoke or shorten access level

:::info

For a detailed description, refer to the [Revoke access level](ss-revoke-access-level) request.

:::

In version 1, you used the [Revoke access level](server-side-api-specs-legacy#revoke-subscription-from-a-user) request to immediately revoke access and the [Prolong/Grant a Subscription for a User](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request to shorten it. Now you can use the [Revoke access level](ss-revoke-access-level) request for both actions.

<!---

| Change     | Old value                                                    | How to change                                                |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Endpoint   | `https://api.adapty.io/api/v1/sdk/profiles/{profile_id_or_customer_user_id}/paid-access-levels/{access_level}/grant/` | `https://api.adapty.io/api/v2/server-side-api/grant/access-level/` |
| Parameters | Many transaction parameters that are no longer needed in this request. | Parameters to keep: <ul><li> **access_level_id**: Previously in the endpoint. Required.</li><li> **starts_at**: Now nullable.</li><li> **expires_at**: Optional for lifetime access and nullable.</li></ul> |

--->

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/purchase/profile/revoke/access-level/`
- Parameters to keep:
  - **access_level_id**: Required.
  - **expires_at**: Nullable unless access is revoked immediately.

---

#### Step 2.3. How to record a subscription transaction

:::info

For a detailed description, refer to the [Set transaction](ss-set-transaction) request.

:::

In version 1, transactions were recorded using the [Prolong/Grant a Subscription for a User](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request, which was limited to subscription transactions.

In version 2, this functionality has been replaced by the [Set Transaction](ss-set-transaction) request. This request can handle both subscription transactions and one-time purchases.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/`
- **Details:** The parameters required vary based on whether the transaction is a subscription or a one-time purchase. See the guidelines below for recording subscription transactions.

**New fields**

| **Parameter**               | **Change** | **Type**      | **Required**       | **Nullable**       | **Description**                                              |
| --------------------------- | ---------- | ------------- | ------------------ | ------------------ | ------------------------------------------------------------ |
| `billing_issue_detected_at` | Added      | ISO 8601 date | :heavy_plus_sign:  | :heavy_plus_sign:  | The datetime when a billing issue was detected (e.g., a failed card charge). Subscription might still be active. This is cleared if the payment goes through. |
| `cancellation_reason`       | Added      | String        | :heavy_plus_sign:  | :heavy_plus_sign:  | Possible reasons for cancellation include: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, or `unknown`. |
| `environment`               | Added      | String        | :heavy_minus_sign: | :heavy_minus_sign: | <p>Environment where the transaction took place. Options are `Sandbox` or `Production.`</p><p> Replaces the `is_sandbox` parameter.</p> |
| `grace_period_expires_at`   | Added      | ISO 8601 date | :heavy_minus_sign: | :heavy_minus_sign: | The datetime when the [grace period](https://developer.apple.com/news/?id=09122019c) will end, if the subscription is currently in one. |
| `is_family_shared`          | Added      | Boolean       | :heavy_minus_sign: | :heavy_minus_sign: | A Boolean value indicating whether the product supports family sharing in App Store Connect. iOS only. Always `false` for iOS below 14.0 and macOS below 11.0. |
| `offer`                     | Added      | Object        | :heavy_plus_sign:  | :heavy_minus_sign: | Represents the purchase offer as an object. See the [Offer](server-side-api-objects#offer) object. |
| `originally_purchased_at`   | Added      | ISO 8601 date | :heavy_plus_sign:  | :heavy_minus_sign: | For subscription chains, this is the purchase date of the original transaction, linked by `store_original_transaction_id`. |
| `purchase_type`             | Added      | String        | :heavy_plus_sign:  | :heavy_minus_sign: | Specifies product type, here set to `subscription`.          |
| `purchased_at`              | Added      | ISO 8601 date | :heavy_plus_sign:  | :heavy_minus_sign: | Indicates most recent purchase date.                         |
| `refunded_at`               | Added      | ISO 8601 date | :heavy_minus_sign: | :heavy_minus_sign: | Indicates subscription refund datetime if applicable.        |
| `renew_status`              | Added      | Boolean       | :heavy_plus_sign:  | :heavy_minus_sign: | Indicates if subscription auto-renewal is enabled.           |
| `renew_status_changed_at`   | Added      | ISO 8601 date | :heavy_minus_sign: | :heavy_minus_sign: | Indicates when auto-renewal status changed.                  |
| `variation_id`              | Added      | String        | :heavy_minus_sign: | :heavy_minus_sign: | The variation ID used to trace purchases to the specific paywall they were made from. |

**Removed fields**

| **Parameter**             | **Change** | **Description**                                              |
| ------------------------- | ---------- | ------------------------------------------------------------ |
| `base_plan_id`            | Removed    | Removed. Ass the base plan ID to the `store_product_id` field in the format `product_id:base_plan_id`. |
| `duration_days`           | Removed    | Removed as not needed. The duration is calculated automatically. |
| `introductory_offer_type` | Removed    | Offer types are now in the `offer` object.                   |
| `is_lifetime`             | Removed    | Removed as it's replaced with the `purchase_type` parameter. |
| `is_sandbox`              | Removed    | Replaced with the `environment` parameter.                   |
| `price_locale`            | Removed    | Moved to the `price` object.                                 |
| `proceeds`                | Removed    |                                                              |
| `starts_at`               | Removed    | Removed as it will be automatically taken from the access level connected to the selected product. |

**Changed fields**

| **Parameter**                                                | **Change**       | **Type**        | **Required**                            | **Nullable**       | Change Description                                           |
| ------------------------------------------------------------ | ---------------- | --------------- | --------------------------------------- | ------------------ | ------------------------------------------------------------ |
| `price`                                                      | Changed          | Float -> Object | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | Now represented as a [Price](server-side-api-objects#price) object and includes `price_locale`, `country`, and `value` fields. |
| `store`                                                      | Changed          | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | <ol><li>The field became mandatory.</li><li>In addition to standard app stores, you can now use custom stores as well.</li></ol> |
| `vendor_original_transaction_id` -> `store_original_transaction_id` | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | <ol><li> The field is renamed.</li><li> The field beca,e mandatory.</li></ol> |
| `vendor_product_id` -> `store_product_id`                    | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | <ol><li> The field is renamed.</li><li> The field beca,e mandatory.</li></ol> |
| `vendor_transaction_id` -> `store_transaction_id`            | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | <ol><li> The field is renamed.</li><li> The field beca,e mandatory.</li></ol> |

---

#### Step 2.4. How to record a one-time purchase transaction

:::info

For a detailed description, refer to the [Set transaction](ss-set-transaction) request.

:::

In version 1, transactions were recorded using the [Prolong/Grant a Subscription for a User](server-side-api-specs-legacy#prolonggrant-a-subscription-for-a-user) request, which was limited to subscription transactions.

In version 2, this functionality has been replaced by the [Set Transaction](ss-set-transaction) request. This request can handle both subscription transactions and one-time purchases.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/`
- **Details:** The parameters required vary based on whether the transaction is a subscription or a one-time purchase. See the guidelines below for recording one-time purchase transactions.

**New fields**

| **Parameter**                    | **Change** | **Type**        | **Required**                            | **Nullable**       | **Description Change**                                       |
| -------------------------------- | ---------- | --------------- | --------------------------------------- | ------------------ | ------------------------------------------------------------ |
| `cancellation_reason`            | Added      | String          | :heavy_minus_sign:                      | :heavy_minus_sign: | Possible reasons for cancellation: voluntarily_cancelled, billing_error, price_increase, product_was_not_available, refund, cancelled_by_developer, new_subscription_replace, upgraded, unknown, adapty_revoked. |
| `environment`                    | Added      | String          | :heavy_minus_sign:                      | :heavy_minus_sign: | <p>Environment where the transaction took place. Options are `Sandbox` or `Production.`</p><p> Replaces the `is_sandbox` parameter.</p> |
| `is_family_shared`               | Added      | Boolean         | :heavy_minus_sign:                      | :heavy_minus_sign: | Indicates whether the product supports family sharing in App Store Connect. iOS only. Always false for iOS below 14.0 and macOS below 11.0. |
| `offer`                          | Added      | Object          | :heavy_minus_sign:                      | :heavy_minus_sign: | Represents the purchase offer as an object. See the [Offer](server-side-api-objects#offer) object. |
| `purchase_type`                  | Added      | String          | :heavy_plus_sign:                       | :heavy_minus_sign: | Specifies the type of product purchased. Here set to `one_time_purchase`. |
| `purchased_at`                   | Added      | ISO 8601 date   | :heavy_plus_sign:                       | :heavy_minus_sign: | The datetime when the access level was last purchased.       |
| `refunded_at`                    | Added      | ISO 8601 date   | :heavy_minus_sign:                      | :heavy_minus_sign: | If refunded, shows the datetime of the refund.               |
| `variation_id`                                               | Added            | String          | :heavy_minus_sign:                      | :heavy_minus_sign:                       | The variation ID used to trace purchases to the specific paywall they were made from. |

**Removed fields**

| **Parameter**             | **Change** | **Description Change**                                       |
| ------------------------- | ---------- | ------------------------------------------------------------ |
| `base_plan_id`            | Removed    | Removed. Ass the base plan ID to the `store_product_id` field in the format `product_id:base_plan_id`. |
| `duration_days`           | Removed    | Removed as not needed. The duration is calculated automatically. |
| `expires_at`              | Removed    | Removed as not relevant to a one-time purchase.              |
| `introductory_offer_type` | Removed    | Offer types are now in the `offer` object.                   |
| `is_lifetime`             | Removed    | Removed as it's replaced with the `purchase_type` parameter. |
| `is_sandbox`              | Removed    | Replaced with the `environment`parameter.                    |
| `price_locale`            | Removed    | Moved to the `price` object.                                 |
| `proceeds`                | Removed    |                                                              |
| `starts_at`               | Removed    | Removed as not relevant to a one-time purchase.              |

**Changed fields**

| **Parameter**                                                | **Change**       | **Type**        | **Required**                            | **Nullable**       | **Description Change**                                       |
| ------------------------------------------------------------ | ---------------- | --------------- | --------------------------------------- | ------------------ | ------------------------------------------------------------ |
| `price`                                                      | Changed          | Float -> Object | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | Now represented as a [Price](server-side-api-objects#price) object and includes `price_locale`, `country`, and `value` fields. |
| `store`                                                      | Changed          | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | <ol><li>The field became mandatory.</li><li>In addition to standard app stores, you can now use custom stores as well.</li></ol> |
| `vendor_original_transaction_id` -> `store_original_transaction_id` | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | <ol><li> The field is renamed.</li><li> The field beca,e mandatory.</li></ol> |
| `vendor_product_id` -> `store_product_id`                    | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | <ol><li> The field is renamed.</li><li> The field beca,e mandatory.</li></ol> |
| `vendor_transaction_id` -> `store_transaction_id`            | Renamed, changed | String          | :heavy_minus_sign: -> :heavy_plus_sign: | :heavy_minus_sign: | <ol><li> The field is renamed.</li><li> The field beca,e mandatory.</li></ol> |

---

### Step 3. Change `Get info about a user` request

:::info

For a detailed description, refer to the [Get profile](ss-get-profile) request.

:::

Change the request as follows:

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/profile/`
- **Change:** The User Profile ID or Customer User ID is now passed via headers, and no additional parameters are needed. The **extended** parameter is no longer needed as the complete profile data is always returned.

---

### Step 4. Change `Set the user's attribute` request

:::info

For a detailed description, refer to the [Update profile](ss-update-profile) request.

:::

In version 1, you could only update user attributes. With version 2, you can modify a wider range of profile fields, such as installation metadata or analytics settings.

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/profile/`.

| **Parameter**        | **Change** | **Type**              | **Required**       | **Nullable**                            | **Description Change**                                       |
| -------------------- | ---------- | --------------------- | ------------------ | --------------------------------------- | ------------------------------------------------------------ |
| `analytics_disabled` | Added      | Boolean               | :heavy_minus_sign: | :heavy_minus_sign:                      | Option to opt out of external analytics. When disabled, events won’t be sent to integrations, and `idfa`, `idfv`, and `advertising_id` become nullable. |
| `installation_meta`  | Added      | Dictionary            | :heavy_minus_sign: | :heavy_minus_sign:                      | Contains app-specific device details as a dictionary of [Installation Meta](server-side-api-objects#installation-meta) objects. |
| `store`              | Added      | String                | :heavy_minus_sign: | :heavy_plus_sign:                       | Store where the product was bought. Options include **app_store**, **play_store**, **stripe**, or the name of your [custom store](custom-store). |
| `store_country`      | Added      | String                | :heavy_minus_sign: | :heavy_plus_sign:                       | Country of the end user app store.                           |
| `birthday`           | Changed    | Date -> ISO 8601 date | :heavy_minus_sign: | :heavy_plus_sign: -> :heavy_minus_sign: | Your end user's birthday.                                    |
| `ip_country`         | Changed    | String                | :heavy_minus_sign: | :heavy_plus_sign: -> :heavy_minus_sign: | Country of the end user in ISO 3166-2 format. Must be passed if the request is made from the server. Otherwise, determined by request IP. |

---

### Step 5. Change `Delete user's data` request

:::info

For a detailed description, refer to the [Delete profile](ss-delete-profile) request.

:::

- **Endpoint:** `https://api.adapty.io/api/v2/server-side-api/profile/`
- **Change:** The `adapty-profile-id` or `adapty-customer-user-id` is now passed via headers, and no additional parameters are needed.
