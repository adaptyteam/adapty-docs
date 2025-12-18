---
title: "Getting started success checklist"
description: "Ensure a smooth Adapty integration with your mobile app by following our comprehensive success checklist, tailored for both Apple App Store and Google Play Store configurations."
metadataTitle: "Getting Started Success Checklist for Adapty Initial Integration and Configuration"
---

## Text

Adapty integrates with your mobile app on three levels: in the Adapty Dashboard, in the app stores, and in your mobile app code.

It's important to note that the initial installation and configuration process varies between the Apple App Store and Google Play Store.

<!----->

While the initial installation and configuration may seem like a preliminary step, we highly recommend pausing after this stage to verify the results against our recommendations. This ensures any potential errors are easily identified before proceeding to the next stage.

## Check list with expanding text inside

Use the following criteria to confirm the success of the integration:

- [ ] The banner asking to install the Adapty SDK is hidden. If you still see it, double-check that you have completed all the steps outlined above. [Check now](https://app.adapty.io/paywalls)

    <details>
   <summary>Banner screenshots for state verification (Click to Expand)</summary>

   <div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/b32389b-nobanner_installSDK.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




  
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/cdd49a2-banner_installSDK.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>
</details>

- [ ] The mobile platform icon is marked with green in the top-left **App** menu. [Check now](https://app.adapty.io/paywalls)

   <details>
   <summary>Mobile platform icon screenshot for state verification (Click to Expand)</summary>

   <div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/864ae93-sdk_installed.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>
</details>

## Callouts

### Danger

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](https://docs.adapty.io/docs/release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

### Info

:::note
This section refers to [Observer mode](observer-vs-full-mode) only. If you do not work in Observer mode, refer to the [Android - Present Paywall Builder paywalls](android-present-paywalls) topic instead.
:::

### Warning 

:::warning
Don't forget to [Associate paywalls to purchase transactions](associate-paywalls-to-transactions). Otherwise, Adapty will not determine the source paywall of the purchase.
:::


## Code blocks inside lists

1. yaml

   ```yaml title="pubspec.yaml"
   dependencies:
   adapty_flutter: ^2.10.1
   adapty_ui_flutter: ^2.1.1
   ```

2. Bash

   ```bash title="bash"
   flutter pub get
   ```

3. Dart

   ```dart title="dart"
   import 'package:adapty_flutter/adapty_flutter.dart';
   import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';
   ```

4. Xml

```xml title="Adapty-Info.plist"
<dict>
    <key>AdaptyPublicSdkKey</key>
    <string>PUBLIC_SDK_KEY</string>
    <key>AdaptyObserverMode</key>
    <false/>
</dict>
```
5. Javascript - Flutter
```javascript title="Flutter"
try {
   await Adapty().setLogLevel(AdaptyLogLevel.verbose);
} on AdaptyError catch (adaptyError) {
} catch (e) {}
```
6. Json

```json title="json"
{
    adapty_check: {{check_string}}
}
```


7. Kotlin and java. One after another

   ```kotlin title="kotlin"
   val observerModeHandler =
   AdaptyUiObserverModeHandler { product, paywall, paywallView, onStartPurchase, onFinishPurchase ->
       onStartPurchase()
       yourBillingClient.makePurchase(
           product,
           onSuccess = { purchase ->
               onFinishPurchase()
               //handle success
           },
           onError = {
               onFinishPurchase()
               //handle error
           },
           onCancel = {
               onFinishPurchase()
               //handle cancel
           }
       )
   }
   ```
   ```java title="Java"
   AdaptyUiObserverModeHandler observerModeHandler = (product, paywall, paywallView, onStartPurchase, onFinishPurchase) -> {
       onStartPurchase.invoke();
       yourBillingClient.makePurchase(
           product,
           purchase -> {
               onFinishPurchase.invoke();
               //handle success
           },
           error -> {
               onFinishPurchase.invoke();
               //handle error
           },
           () -> { //cancellation
               onFinishPurchase.invoke();
               //handle cancel
           }
       );
   };
   ```

## Pictures in blocks in expanding text

- [ ] Events appear in the [**Event Feed**](https://app.adapty.io/event-feed) of the Adapty Dashboard.

<details>
   <summary>Event feed screen for state verification (Click to Expand)</summary>

   [block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b0d60b5-event_feed_sandbox.png",
        null,

      ],
      "align": "center",
      "sizing": "700px",
      "border": true,
    }
  ]
}
[/block]



<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/31a79b2-no_events.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>






<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/17bce91-no_events_not_installed_SDK.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>
</details>

## Block image os another type in a list item

. The file created will be needed during the [initial integration of Adapty with Google Play](google-play-store-connection-configuration) step. You can use the name of the file provided in the opened **Private key saved to your computer** window to locate it if needed.

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/bdb056f-google_cloud_private_key_saved.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>




## Video

[block:embed]
{
  "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.loom.com%2Fembed%2Fbe0190e0b6a14c718538dd37abb64c56&display_name=Loom&url=https%3A%2F%2Fwww.loom.com%2Fshare%2Fbe0190e0b6a14c718538dd37abb64c56&image=https%3A%2F%2Fcdn.loom.com%2Fsessions%2Fthumbnails%2Fbe0190e0b6a14c718538dd37abb64c56-00001.gif&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=loom\" width=\"1280\" height=\"960\" scrolling=\"no\" title=\"Loom embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
  "url": "https://www.loom.com/share/be0190e0b6a14c718538dd37abb64c56",
  "title": "Funnels | Adapty - 17 July 2022",
  "favicon": null,
  "image": "https://cdn.loom.com/sessions/thumbnails/be0190e0b6a14c718538dd37abb64c56-00001.gif",
  "provider": "loom.com",
  "href": "https://www.loom.com/share/be0190e0b6a14c718538dd37abb64c56"
}
[/block]

## Table in block with paragraphs inside

| Issue | Solution |
|-----|--------|
| An error is returned in the mobile app | Refer to the error list for your platform: [for iOS](ios-sdk-error-handling), [for Android](android-sdk-error-handling), [for React Native, Flutter, or Unity](error-handling-on-flutter-react-native-unity) and follow our recommendations to resolve the issue. |
| Transaction is absent from the **Event Feed** although no error is returned in the mobile app | <p>1\. for iOS: Ensure you use a real device rather than a simulator.</p><p>2. Ensure that the `Bundle ID`/`Package name` of your app matches the one in the [**App settings**](https://app.adapty.io/settings/general).</p><p>3. Ensure the `PUBLIC_SDK_KEY` in your app matches the **Public SDK key** in the Adapty Dashboard: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).</p> |
| No event is present in my testing profile | <p>A new user profile record is automatically created in Adapty in the following cases:</p><p></p><p>- When a user runs your app for the first time</p><p>- When a user logs out of your app</p><p></p><p>All transactions and events in a chain are tied to the profile that generated the first transaction. This helps keep the entire transaction history, including trial periods, subscription purchases, renewals, and more linked to the same profile. This means that a new profile record that generated a subsequent translation - we call it a non-original profile - may not have any events associated with it but will retain the granted access level. In some cases, you'll also see "access_level_updated" events here. It's advised to ignore these new, empty profiles and focus on the original ones for a clearer view of the user's transaction history.</p><p></p><p>This behavior is more prominent for testing scenarios but also normal for production. It should not be treated as a bug or SDK misconfiguration.In order to run the test with only one profile and have fun concise history in one place, create a new test account (Sandbox Apple ID) each time you reinstall the mobile app.</p><p></p><p>Please see an example of a non-original profile under the table. For more details on profile creation, please see [Profile record creation](profiles-crm#profile-record-creation).</p> |
| Prices do not reflect the actual prices set in App Store Connect | <p>In both Sandbox and TestFlight which uses the sandbox environment for in-app purchases, it's important to verify that the purchase flow functions correctly, rather than focusing on the accuracy of prices. It's worth noting that Apple's API can occasionally provide inaccurate data, particularly when different regions are configured for devices or accounts. And since the prices come directly from the Store and the Adapty backend does not affect purchase prices in any way, you can ignore any inaccuracy in prices during the testing of the purchases through Adapty.</p><p></p><p>Therefore, prioritize testing the purchase flow itself over the accuracy of prices to ensure it functions as intended.</p> |
| The transaction time in the **Event Feed** is incorrect | The **Event Feed** uses the time zone set in the **App Settings**. To align the time zone of events with your local time, adjust the **Reporting timezone** in [**App settings** -> **General** tab](https://app.adapty.io/settings/general). |

## Simple table

| Field                        | Description                                                                                                                                                                                                                                                  |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Access Key ID**            | A unique identifier that is used to authenticate a user or application's access to an AWS service.  Find this ID in the downloaded [csv file](https://docs.adapty.io/docs/s3-exports#how-to-create-amazon-s3-credentials) .                                  |
| **Secret Access Key**        | A private key that is used in conjunction with the Access Key ID to authenticate a user or application's access to an AWS service. Find this Key in the downloaded  [csv file](https://docs.adapty.io/docs/s3-exports#how-to-create-amazon-s3-credentials) . |
| **S3 Bucket Name **          | A globally unique name that identifies a specific S3 bucket within the AWS cloud. S3 buckets are a simple storage service that allows users to store and retrieve data objects, such as files and images, in the cloud.                                      |
| **Folder Inside the Bucker** | The  name of the folder that you want to have inside the selected S3 bucket. Please note that S3 simulates folders using object key prefixes, which are essentially folder names.                                                                            |


## Block table. Now successfully converted

Here is the table structure for the events:

| Column | Description |
|------|-----------|
| **profile_id** | Adapty user ID. |
| **event_type** | Lower cased event name. Refer to the [Events](events) section to learn event types. |
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
| **profile_county** | Profile Country determined by Adapty, based on IP. |
| **install_date** | ISO 8601 date when the installation happened. |
| **idfv** | [identifierForVendor](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) on iOS devices |
| **idfa** | [advertisingIdentifier](https://developer.apple.com/documentation/adsupport/asidentifiermanager/advertisingidentifier) on iOS devices |
| **advertising_id** | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device |
| **ip_address** | Device IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes. |
| **cancellation_reason** | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be:</p><p>**iOS & Android**  _voluntarily_cancelled_, _billing_error_, _refund_</p><p>**iOS**  _price_increase_, _product_was_not_available_, _unknown_, _upgraded_</p><p>**Android** _new_subscription_replace_, _cancelled_by_developer_</p> |
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

## Table with github images and 


## Table in block with Warning in a cell

| Parameter | Presence | Description |
|---------|--------|-----------|
| **AdaptyPublicSdkKey** | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **AdaptyObserverMode** | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. At any purchase or restore in your application, you'll need to call `.restorePurchases()` method to record the action in Adapty. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **idfaCollectionDisabled** | optional | <p>A boolean parameter, that allows you to disable IDFA collection for your iOS app. The default value is `false`.</p><p>For more details, refer to the [Analytics integration](https://docs.adapty.io/docs/analytics-integration#react-native)  section.</p> |

   [block:parameters]{"data":{"h-0":"Parameter","h-1":"Presence","h-2":"Description","0-0":"PUBLIC_SDK_KEY","0-1":"required","0-2":"Contents of the **Public SDK key** field in the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard. **SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.  \nMake sure you use the **Public SDK key** for Adapty initialization, since the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.","1-0":"AdaptyObserverMode","1-1":"optional","1-2":"A boolean value that is controlling [Observer mode](observer-vs-full-mode) . Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.  \nThe default value is `false`.  \n  \n🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.","2-0":"AdaptyIDFACollectionDisabled","2-1":"optional","2-2":"A boolean parameter, that allows you to disable IDFA collection for your app. The default value is `false`.  \nFor more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa)   section."},"cols":3,"rows":3,"align":["left","left","left"]}[/block]


## Other tables in block


   Required parameters:



   

 Request parameters:

   [block:parameters]{"data":{"h-0":"Parameter","h-1":"Presence","h-2":"Description","0-0":"**Products**","0-1":"optional","0-2":"Provide an array of `AdaptyPaywallProduct `to optimize the display timing of products on the screen. If `null` is passed, AdaptyUI will automatically fetch the required products.","1-0":"**ViewConfiguration**","1-1":"required","1-2":"Supply an `AdaptyViewConfiguration` object containing visual details of the paywall. Use the `Adapty.getViewConfiguration(paywall)` method to load it. Refer to [Fetch the visual configuration of paywall](get-and-show-paywall-builder-paywalls#fetch-the-visual-configuration-of-paywall-customized-using-paywall-builder) topic for more details.","2-0":"**Insets**","2-1":"required","2-2":"Define an `AdaptyPaywallInsets` object containing information about the area overlapped by system bars, creating vertical margins for content. If neither the status bar nor the navigation bar overlaps the `AdaptyPaywallView`, pass `AdaptyPaywallInsets.NONE`. For fullscreen mode where system bars overlap part of your UI, obtain insets as shown under the table.","3-0":"**EventListener**","3-1":"optional","3-2":"Provide an `AdaptyUiEventListener` to observe paywall events. Extending AdaptyUiDefaultEventListener is recommended for ease of use. Refer to [Handling paywall events](android-handling-events)  topic for more details.","4-0":"**PersonalizedOfferResolver**","4-1":"optional","4-2":"To indicate personalized pricing ([read more](https://developer.android.com/google/play/billing/integrate#personalized-price)  ), implement `AdaptyUiPersonalizedOfferResolver`  and pass your own logic that maps `AdaptyPaywallProduct` to true if the product's price is personalized, otherwise false.","5-0":"**TagResolver**","5-1":"optional","5-2":"Use `AdaptyUiTagResolver` to resolve custom tags within the paywall text. This resolver takes a tag parameter and resolves it to a corresponding string. Refer to [Custom tags in paywall builder](custom-tags-in-paywall-builder)  topic for more details.","6-0":"**ObserverModeHandler**","6-1":"required for Observer mode","6-2":"The  `AdaptyUiObserverModeHandler` you've implemented in the previous step.","7-0":"**variationId**","7-1":"required","7-2":"The string identifier of the variation. You can get it using `variationId` property  of the [`AdaptyPaywall`](sdk-models#adaptypaywall)   object.","8-0":"**transaction**","8-1":"required","8-2":"For iOS, StoreKit1: an [`SKPaymentTransaction`](https://developer.apple.com/documentation/storekit/skpaymenttransaction)   object.  \nFor iOS, StoreKit 2: [Transaction](https://developer.apple.com/documentation/storekit/transaction)   object.  \nFor Android: String identifier (`purchase.getOrderId()`) of the purchase, where the purchase is an instance of the billing library [Purchase](https://developer.android.com/reference/com/android/billingclient/api/Purchase)  class."},"cols":3,"rows":9,"align":["left","left","left"]}[/block]


[block:parameters]{"data":{"h-0":"Field","h-1":"Description","0-0":"**Google Cloud Project ID**","0-1":"A user-assigned identifier for your Google Cloud project. Find this ID in the downloaded private JSON key file under the `project_id` field.","1-0":"**Google Cloud Bucket Name**","1-1":"The name of the bucket in Google Cloud Storage where you want to store your data. That is the bucket you granted access to in the [Grant access to Google Cloud Storage bucket](google-cloud-setup#create-google-cloud-storage-service-account) section above.","2-0":"**Email **","2-1":"The email address associated with your service account in Google Cloud Console.  Find it in the downloaded private JSON key file under the `client_email` field.  \nIt is used to grant access to resources in your project.","3-0":"**Google Cloud Service Account Private Key ID**","3-1":"The text block private key you created for your service account in the Google Cloud Console.  Find the block in the downloaded private JSON key file under the `private_key` field.  \nIf the field contains the newline character sequence (`/n`)  in your block, replace them with a line break!","4-0":"**Google Cloud Service Account Private Key ID**","4-1":"A unique identifier assigned to your private key when you create a new service account in the Google Cloud Console.  Find it in the downloaded private JSON key file under the `private_key_id` field.","5-0":"**Folder inside the bucket **","5-1":"The name of the folder inside the bucket where you want to store your data. It should be unique within the bucket and can be used to organize your data. This field is optional to fill."},"cols":2,"rows":6,"align":["left","left"]}[/block]



 [block:parameters]{"data":{"h-0":"Field","h-1":"Description","0-0":"**Production endpoint URL**","0-1":"URL that is used by Adapty to send HTTP POST requests to this URL when events occur. ","1-0":"**Authorization header value for production endpoint**","1-1":"The header that your server will use to authenticate requests from Adapty in production. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.  \n  \nAlthough not mandatory, it's strongly recommended for enhanced security."},"cols":2,"rows":2,"align":["left","left"]}[/block]

   Additionally, for your testing needs in the staging environment, two other fields are available:

   [block:parameters]{"data":{"h-0":"Testing field","h-1":"Description","0-0":"**Sandbox endpoint URL**","0-1":"Adapty will use this URL to send HTTP POST requests when events occur in the staging environment.","1-0":"**Authorization header value for sandbox endpoint**","1-1":"The header that your server will use to authenticate requests from Adapty during testing in the sandbox environment. Note that we'll use the value specified in this field as the `Authorization` header exactly as provided, without any changes or additions.  \n  \nAlthough not mandatory, it's strongly recommended for enhanced security."},"cols":2,"rows":2,"align":["left","left"]}[/block]

   # Direct link

   <https://www.notion.so/adapty>


   # Block picture with caption

   [block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1f3722e-CleanShot_2023-03-21_at_11.36.192x.png",
        "CleanShot 2023-03-21 at 11.36.19@2x.png",
        "Amazon S3 - Photo 9"
      ],
      "align": "center",
      "sizing": "700px",
      "border": true,
      "caption": "AWS IAM - "Select" Policy for Group"
    }
  ]
}
[/block]