---
title: "Google Cloud Storage (new)"
description: ""
metadataTitle: ""
---

Google Cloud Storage is a scalable, high-speed, web-based object storage service provided by Google Cloud. It is designed to handle a wide range of storage needs, from simple backups to complex data lakes for big data analytics.

Google Cloud Storage is highly scalable, capable of managing vast amounts of data without performance degradation. It ensures high durability and availability by distributing data across multiple regions. The service provides robust security features, including encryption and identity management, and integrates seamlessly with other Google Cloud services.

With Google Cloud Storage integrated, you can:

1. Export Adapty events and paywall views to Google Cloud Storage as CSV files.
2. Use the exported data for a wide range of purposes, including detailed analytics, predictions, or behavior analysis.

**Integration characteristics for automatic periodic export**

| Integration characteristic | Description |
|--------------------------|-----------|
| Schedule | Adapty sends your data every 24 hours at 4:00 UTC. |
| Data sending format | <p>CSV files with all Adapty events of selected types or all paywall views.</p><p></p><p>Each file contains data for the events or paywall views created for the entire previous calendar day in UTC. For example, the data exported automatically at 4:00 UTC on March 8th will contain all the events or paywall views created on March 7th from 00:00:00 to 23:59:59 in UTC.</p> |
| Data direction | One-way data transmission: from Adapty to Google Cloud Storage. You can set up separate destinations—one for events and another for paywall views. |
| Adapty integration flow | Events and paywall views are sent by the Adapty server by schedule |


**Integration characteristics for manual export**

| Integration characteristic | Description                                                                                                                                        |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| Schedule                   | Not scheduled. The data is exported by user's manual launch                                                                                        |
| Data sending format        | CSV file with all Adapty events of selected types or with all paywall views for a custom period of time defined by the user                        |
| Data direction             | One-way data transmission: from Adapty to Google Cloud Storage. You can set up separate destinations—one for events and another for paywall views. |
| Adapty integration flow    | Events and paywall views are sent by the Adapty server upon user's request                                                                         |

## Table structure

Whether you export Adapty events or paywalls, manually or automatically by schedule, you will get a table with an exact list of columns. Of course, the columns will differ for events and paywall views.

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Here is the table structure for the events:

| Column | Description |
|------|-----------|
| **profile_id** | Adapty user ID. |
| **event_type** | Lowercased event name. Refer to the [Events](events) section to learn event types. |
| **event_datetime** | ISO 8601 date. |
| **transaction_id** | A unique identifier for a transaction such as a purchase or renewal. |
| **original_transaction_id** | The transaction identifier of the original purchase. |
| **subscription_expires_at** | The Expiration date of subscription. Usually in the future. |
| **environment** | Could be Sandbox or Production. |
| **revenue_usd** | Revenue in USD. Can be empty. |
| **proceeds_usd** | Proceeds in USD. Can be empty. |
| **net_revenue_usd** | Net revenue (income after taxes) in USD. Can be empty. |
| **tax_amount_usd** | Amount of money deducted for taxes in USD. Can be empty. |
| **revenue_local** | Revenue in local currency. Can be empty. |
| **proceeds_local** | Proceeds in local currency. Can be empty. |
| **net_revenue_local** | Net revenue (income after taxes) in local currency. Can be empty. |
| **tax_amount_local** | Amount of money deducted for taxes in local currency. Can be empty. |
| **customer_user_id** | Developer user ID. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. |
| **store** | Could be _app_store_ or _play_store_. |
| **product_id** | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **base_plan_id** | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973)  in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price)  in Stripe. |
| **developer_id** | Developer (SDK) ID of the paywall where the transaction originated. |
| **ab_test_name** | Name of the A/B test where the transaction originated. |
| **ab_test_revision** | Revision of the A/B test where the transaction originated. |
| **paywall_name** | Name of the paywall where the transaction originated. |
| **paywall_revision** | Revision of the paywall where the transaction originated. |
| **profile_country** | Profile Country determined by Adapty, based on IP. |
| **install_date** | ISO 8601 date when the installation happened. |
| **idfv** | [identifierForVendor](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) on iOS devices |
| **idfa** | [advertisingIdentifier](https://developer.apple.com/documentation/adsupport/asidentifiermanager/advertisingidentifier) on iOS devices |
| **advertising_id** | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device |
| **ip_address** | Device IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes |
| **cancellation_reason** | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be:</p><p>**iOS & Android**_voluntarily_cancelled_, _billing_error_, _refund_</p><p>**iOS**  _price_increase_, _product_was_not_available_, _unknown_, _upgraded_</p><p>**Android**  _new_subscription_replace_, _cancelled_by_developer_</p> |
| **android_app_set_id** | An [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - unique, per-device, per developer-account user-resettable ID for non-monetizing advertising use cases. |
| **android_id** | On Android 8.0 (API level 26) and higher versions of the platform, a 64-bit number (expressed as a hexadecimal string), unique to each combination of app-signing key, user, and device. For more details, see [Android developer documentation](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). |
| **device** | The end-user-visible device model name. |
| **currency** | The 3-letter currency code (ISO-4217) of the transaction. |
| **store_country** | Profile Country determined by Apple/Google store. |
| **attribution_source** | Attribution source. |
| **attribution_network_user_id** | ID assigned to the user by attribution source. |
| **attribution_status** | Can be organic, non_organic or unknown. |
| **attribution_channel** | Marketing channel name. |
| **attribution_campaign** | Marketing campaign name. |
| **attribution_ad_group** | Attribution ad group. |
| **attribution_ad_set** | Attribution ad set. |
| **attribution_creative** | Attribution creative keyword. |


Here is the table structure for the paywall visits:

| Column                | Description                                                                                                  |
| :-------------------- | :----------------------------------------------------------------------------------------------------------- |
| **profile_id**        | Adapty user ID.                                                                                              |
| **customer_user_id**  | Developer user ID. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it. |
| **profile_country**   | Profile Country determined by Apple/Google store.                                                            |
| **install_date**      | ISO 8601 date when the installation happened.                                                                |
| **store**             | Could be _app_store_ or _play_store_.                                                                        |
| **paywall_showed_at** | The date when the paywall has been displayed to the customer.                                                |
| **developer_id**      | Developer (SDK) ID of the paywall where the transaction originated.                                          |
| **ab_test_name**      | Name of the A/B test where the transaction originated.                                                       |
| **ab_test_revision**  | Revision of the A/B test where the transaction originated.                                                   |
| **paywall_name**      | Name of the paywall where the transaction originated.                                                        |
| **paywall_revision**  | Revision of the paywall where the transaction originated.                                                    |