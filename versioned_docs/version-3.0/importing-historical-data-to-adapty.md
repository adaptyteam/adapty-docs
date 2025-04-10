---
title: "Importing historical data to Adapty"
description: "Import historical data into Adapty for detailed analytics."
metadataTitle: "Importing Historical Data into Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

After installing the Adapty SDK and releasing your app, you can access your users and subscribers in the [Profiles](profiles-crm) section. But what if you have legacy infrastructure and need to migrate to Adapty, or simply want to see your existing data in Adapty?

:::note
Data import is not mandatory

Adapty will automatically grant access levels to historical users and restore their purchase events once they open the app with the Adapty SDK integrated. For this use case, importing historical data is not necessary. However, importing data ensures precise analytics if you have a significant number of historical transactions, although it is generally not required for migration.
:::

To import data to Adapty:

1. Export your transactions to a CSV file (separate files should be provided for iOS, Android, and Stripe). Please refer to the [Import file format section](importing-historical-data-to-adapty#import-file-format) below for detailed requirements.
2. If any file exceeds 1 GB, prepare a data sample with approximately 100 lines.
3. Upload all the files to Google Drive (you can compress them, but keep them separate).
4. For iOS transactions, ensure the **In-app purchase API** section in the [**App settings**](https://app.adapty.io/settings/ios-sdk)is filled out with the **Issuer ID**, **Key ID**, and the **Private key** (.P8 file) even if you use the StoreKit 1. See the [Provide Issuer ID and Key ID](app-store-connection-configuration#step-2-provide-issuer-id-and-key-id) and [Upload In-App Purchase Key file](app-store-connection-configuration#step-3-upload-in-app-purchase-key-file) sections for detailed instructions.
5. Share the links with our team via  [email](mailto:support@adapty.io) or through the online chat in the Adapty Dashboard.

Do not worry, importing historical data will not create duplicates, even if that data overlaps with existing entries in Adapty.

## Known limitations for Android

1. Only active subscriptions will be restored; expired transactions will not be.
2. Only the latest renewals in a subscription will be restored; the entire chain of purchases will not be.
3. If the product price has changed since the purchase, the current price will be used, which may result in incorrect pricing.

## Import file format

Please prepare your data in a file or files that meet the following rules:

- [ ] The file format is .CSV.
- [ ] Separate files for Android, iOS, and Stripe imports.
- [ ] Every import file contains all [required columns](importing-historical-data-to-adapty#required-fields).
- [ ] The columns in the import file(s) have headers.
- [ ] The column headers are exactly as in the **Column name** column in the table below. Please check for typos.
- [ ] Columns that are not required can be absent from the file. Don't add empty columns for data you don't have.
- [ ] Import files should not have extra columns not mentioned in the table. If present, please delete them.
- [ ] Values are separated by commas.
- [ ] Values are not enclosed in quotes.
- [ ] If there are several **apple_original_transaction_id**'s for one user, add all of them as separate lines for each **apple_original_transaction_id**. Otherwise, we may not be able to restore consumable purchases. 

Please use the following files as samples for [iOS](https://docs.google.com/spreadsheets/d/1GTw7cqL0wkDrbXGUTSS3TrdeypvJnrD6h7Jd-SYnmiY/edit?usp=sharing) and [Android](https://docs.google.com/spreadsheets/d/1i68ZMorGDnfUoveoMOI53FKYPc9UWNChapbeVTQSGks/edit?usp=sharing).

### Available import file columns

| Column name | Presence | Description |
|-----------|--------|-----------|
| **user_id** | required | ID of your user |
| **apple_original_transaction_id** | required for iOS | <p>The original transaction ID or OTID ([learn more](https://developer.apple.com/documentation/appstoreserverapi/originaltransactionid) ), used in StoreKit 2 import mechanism. As one user can have multiple OTIDs, it is enough to provide at least one for successful import.</p><p></p><p>**Note:** We require In-app purchase API credentials for this import to be set up in your Adapty Dashboard. Learn how to do it [here](app-store-connection-configuration#step-3-upload-in-app-purchase-key-file) .</p> |
| **google_product_id** | required for Google | Product ID in the Google Play Store. |
| **google_purchase_token** | required for Google | A unique identifier that represents the user and the product ID for the in-app product they purchased |
| **google_is_subscription** | required for Google | Possible values are `1` \| `0` |
| **stripe_token** | required for Stripe | Token of a Stripe object that represents a unique purchase. Could either be a token of Stripe's Subscription (`sub_...`) or Payment Intent (`pi_...`). |
| **subscription_expiration_date** | optional | The date of subscription expiration, i.g. next charging date, date, and time with timezone (2020-12-31T23:59:59-06:00) |
| **created_at** | optional | Date and time of profile creation (2019-12-31 23:59:59-06:00) |
| **birthday** | optional | The birthday of the user in format 2000-12-31 |
| **email** | optional | The e-mail of your user |
| **gender** | optional | The gender of the user |
| **phone_number** | optional | The phone number of your user |
| **country** | optional | format [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) |
| **first_name** | optional | The first name of your user |
| **last_name** | optional | The last name of your user |
| **last_seen** | optional | The date and time with timezone (2020-12-31T23:59:59-06:00) |
| **idfa** | optional | The identifier for advertisers (IDFA) is a random device identifier assigned by Apple to a user's device. Applicable to iOS apps only |
| **idfv** | optional | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps. Applicable to iOS apps only |
| **advertising_id** | optional | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device |
| **amplitude_user_id** | optional | The user ID from Amplitude |
| **amplitude_device_id** | optional | The device ID from Amplitude |
| **mixpanel_user_id** | optional | User ID from Mixpanel |
| **appmetrica_profile_id** | optional | User profile ID from AppMetrica |
| **appmetrica_device_id** | optional | The device ID from AppMetrica |
| **appsflyer_id** | optional | Unique identifier from AppsFlyer |
| **adjust_device_id** | optional | The device ID from Adjust |
| **facebook_anonymous_id** | optional | A unique identifier generated by Facebook for users who interact with your app or website anonymously, meaning they are not logged into Facebook |
| **branch_id** | optional | Unique identifier from Branch |
| **attribution_source** | optional | The source integration of the attribution, for example, appsflyer |
| **attribution_status** | optional | organic |
| **attribution_channel** | optional | The attribution channel that brought the transaction |
| **attribution_campaign** | optional | The attribution campaign that brought the transaction |
| **attribution_ad_group** | optional | The attribution ad group that brought the transaction |
| **attribution_ad_set** | optional | The attribution ad set that brought the transaction |
| **attribution_creative** | optional | Specific visual or textual elements used in an advertisement or marketing campaign that are tracked to determine their effectiveness in driving desired actions, such as clicks, conversions, or installs |
| **custom_attributes** | optional | Define up to 30 custom attributes as a JSON dictionary in key-value format: <ul><li>**key**: (string) The name of the custom attribute</li><li> **value**: (string, integer, float, or boolean) The value of the custom attribute.</li></ul><p> Format: `"{'string_value': 'some_value', 'float_value': 123.0, 'int_value': 456}"`.</p><p>Note the use of double and single quotes in the format. Keep in mind that booleans and integers will be converted to floats.</p> |

### Required Fields

There are 2 groups of required fields for each platform: **user_id** and data identifying purchases specific to the corresponding platform. Refer to the table below for the mandatory fields per platform.

| Platform | Required fields |
|--------|---------------|
| iOS | <p>user_id</p><p>apple_original_transaction_id</p> |
| Android | <p>user_id</p><p>google_product_id</p><p>google_purchase_token</p><p>google_is_subscription</p> |
| Stripe | <p>user_id</p><p>stripe_token</p> |


Without these fields, Adapty won't be able to fetch transactions.

For precise cohort analytics, please specify `created_at`. If not provided, we will assume the install date to be the same as the first purchase date.

### Import data to Adapty

Please contact us and share your import files via [support@adapty.io](mailto:support@adapty.io) or through the online chat in the [Adapty Dashboard](https://app.adapty.io/overview).