---
title: "Analytics integrations"
description: "Integrate analytics tools with Adapty to track and optimize user subscriptions."
metadataTitle: "Analytics Integration Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty sends all [subscription events](events) to analytical services, such as [Amplitude](amplitude), [Mixpanel](mixpanel), and [AppMetrica](appmetrica). We can also send events to your server using [webhook](webhook) integration. The best thing about this is that you don't have to send any of the events, we'll do it for you. Just make sure to configure the integration in the Adapty Dashboard.

Adapty supports the integration with the following 3d-party analytics services:

- [Amplitude](amplitude)
- [AppMetrica](appmetrica)
- [Firebase and Google Analytics](firebase-and-google-analytics)
- [Mixpanel](mixpanel)
- [PostHog](posthog)
- [SplitMetrics Acquire](splitmetrics)

:::note
Don't see your analytics provider?

Let us know! [Write to the Adapty support](mailto:support@adapty.io) and we'll consider adding it.
:::

## Event properties

Webhook events are sent in JSON format. All events follow the same structure, but their fields vary based on the event type, store, and your specific configuration. 

| Property                      | Type          | Description                                                  |
| ----------------------------- | ------------- | ------------------------------------------------------------ |
| **profile_id**                | uuid          | Adapty user ID.                                              |
| **currency**                  | str           | Local currency (defaults to USD).                            |
| **price_usd**                 | float         | Product price before Apple/Google cut. Revenue.              |
| **proceeds_usd**              | float         | Product price after Apple/Google cut. Net revenue.           |
| **net_revenue_usd**           | float         | Net revenue (income after Apple/Google cut and taxes) in USD. Can be empty. |
| **price_local**               | float         | Product price before Apple/Google cut in local currency. Revenue. |
| **proceeds_local**            | float         | Product price after Apple/Google cut in local currency. Net revenue. |
| **transaction_id**            | str           | A unique identifier for a transaction such as a purchase or renewal. |
| **original_transaction_id**   | str           | The transaction identifier of the original purchase.         |
| **purchase_date**             | ISO 8601 date | The date and time of product purchase.                       |
| **original_purchase_date**    | ISO 8601 date | The date and time of the original purchase.                  |
| **environment**               | str           | Can be _Sandbox_ or _Production_.                            |
| **vendor_product_id**         | str           | Product ID in the Apple App Store, Google Play Store, or Stripe. |
| **base_plan_id**              | str           | [Base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973)   in the Google Play Store or [price ID](https://docs.stripe.com/products-prices/how-products-and-prices-work#what-is-a-price)   in Stripe. |
| **event_datetime**            | ISO 8601 date | The date and time of the event.                              |
| **store**                     | str           | Can be _app_store_ or _play_store_.                          |
| **trial_duration**            | str           | Duration of a trial period in days. Sent in a format "{} days" , for example, "7 days". |
| **cancellation_reason**       | str           | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be</p><p>iOS & Android</p><p>_voluntarily_cancelled_, _billing_error_, _refund_</p><p>iOS</p><p>_price_increase_, _product_was_not_available_, _unknown_</p><p>Android</p><p>_new_subscription_replace_, _cancelled_by_developer_</p> |
| **subscription_expires_at**   | ISO 8601 date | The Expiration date of subscription. Usually in the future.  |
| **consecutive_payments**      | int           | The number of periods, that a user is subscribed to without interruptions. Includes the current period. |
| **rate_after_first_year**     | bool          | Boolean indicates that a vendor reduces cuts to 15%. Apple and Google have 30% first-year cut and 15% after it. |
| **promotional_offer_id**      | str           | ID of promotional offer as indicated in the Product section of the Adapty Dashboard |
| **store_offer_category**      | str           | Can be _introductory_ or _promotional_.                      |
| **store_offer_discount_type** | str           | Can be _free_trial_, _pay_as_you_go_ or _pay_up_front_.      |
| **paywall_name**              | str           | Name of the paywall where the transaction originated.        |
| **paywall_revision**          | int           | Revision of the paywall where the transaction originated. The value is set to 1. |
| **developer_id**              | str           | Developer (SDK) ID of the placement where the transaction originated. |
| **ab_test_name**              | str           | Name of the A/B test where the transaction originated.       |
| **ab_test_revision**          | int           | Revision of the A/B test where the transaction originated. The value is set to 1. |
| **cohort_name**               | str           | Name of the audience to which the profile belongs to.        |
| **profile_event_id**          | uuid          | Unique event ID that can be used for deduplication.          |
| **store_country**             | str           | The country sent to us by the store.                         |
| **profile_ip_address**        | str           | Profile IP (can be IPv4 or IPv6, with IPv4 preferred when available). It is updated each time IP of the device changes. |
| **profile_country**           | str           | Determined by Adapty, based on profile IP.                   |
| **profile_total_revenue_usd** | float         | Total revenue for the profile, refunds included.             |
| **variation_id**              | uuid          | Unique ID of the paywall where the purchase was made.        |
| **access_level_id**           | str           | Paid access level ID                                         |
| **is_active**                 | bool          | Boolean indicating whether paid access level is active for the profile. |
| **will_renew**                | bool          | Boolean indicating whether paid access level will be renewed. |
| **is_refund**                 | bool          | Boolean indicating whether transaction is refunded.          |
| **is_lifetime**               | bool          | Boolean indicating whether paid access level is lifetime.    |
| **is_in_grace_period**        | bool          | Boolean indicating whether profile is in grace period.       |
| **starts_at**                 | ISO 8601 date | Date and time when paid access level starts for the user.    |
| **renewed_at**                | ISO 8601 date | Date and time when paid access will be renewed.              |
| **expires_at**                | ISO 8601 date | Date and time when paid access will expire.                  |
| **activated_at**              | ISO 8601 date | Date and time when paid access was activated.                |
| **billing_issue_detected_at** | ISO 8601 date | Date and time of billing issue.                              |
| **profile_has_access_level**  | Bool          | A boolean that indicates whether the profile has an active access level (Webhook only). |



Each event has the following properties:

`transaction_id, original_transaction_id, purchase_date, original_purchase_date, environment, vendor_product_id, event_datetime, store`. 

In addition, some events have additional properties. For the events `subscription_refunded` and `non_subscription_purchase_refunded`, it is mandatory to provide the values of `price_usd` and `proceeds_usd` as additional properties.

| Event Name                          | Properties                                                   |
| :---------------------------------- | :----------------------------------------------------------- |
| **subscription\_initial\_purchase** | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **subscription\_renewed**           | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **subscription\_cancelled**         | cancellation\_reason, trial\_duration                        |
| **trial\_started**                  | subscription\_expires\_at, trial\_duration                   |
| **trial\_converted**                | price\_usd, proceeds\_usd, subscription\_expires\_at, consecutive\_payments, rate\_after\_first\_year, trial\_duration |
| **trial\_cancelled**                | cancellation\_reason, trial\_duration                        |
| **non\_subscription\_purchase**     | price\_usd, proceeds\_usd                                    |
| **billing\_issue\_detected**        | subscription\_expires\_at, trial\_duration                   |
| **entered\_grace\_period**          | subscription\_expires\_at, trial\_duration                   |

Event example

```json title="Json"
{
    "price_usd": 9.99,
    "proceeds_usd": 6.99,
    "transaction_id": "1000000628581600",
    "original_transaction_id": "1000000628581600",
    "purchase_date": "2020-02-18T18:40:22.000000+0000",
    "original_purchase_date": "2020-02-18T18:40:22.000000+0000",
    "environment": "Sandbox",
    "vendor_product_id": "premium",
    "event_datetime": "2020-02-18T18:40:22.000000+0000",
    "store": "app_store"
}
```

Adapty sends events to your server and 3rd party analytical systems.

**profile_ip_address** property is synchronized with the current device IP. Each time the Adapty servers receive info from the SDK, the IP will be updated if it differs from the one we have on record.

### Setting the profile's identifier

Set the profile's identifier for the selected analytics using [`.setIntegrationIdentifier`](setting-user-attributes#setting-user-attributes) method. For example, for Amplitude integration, you can set either `amplitudeUserId` or `amplitudeDeviceId`. For Mixpanel integration, you have to set `mixpanelUserId`. When these identifiers are not set, Adapty will use `customerUserId` instead. If the `customerUserId` is not set, we will use our internal profile ID.

:::warning
Avoiding duplication

Don't forget to turn off sending subscription events from devices and your server to avoid duplication
:::

### Disabling external analytics for a specific customer

You may want to stop sending analytics events for a specific customer. This is useful if you have an option in your app to opt-out of analytics services.

To disable external analytics for a customer, use `updateProfile()` method. Create `AdaptyProfileParameters.Builder` object and set the corresponding value to it.  
When external analytics is blocked, Adapty won't be sending any events to any integrations for the specific user. If you want to disable an integration for all users of your app, just turn it off in Adapty Dashboard.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers
let builder = AdaptyProfileParameters.Builder()
    .with(analyticsDisabled: true)

Adapty.updateProfile(parameters: builder.build())
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
val builder = AdaptyProfileParameters.Builder()
    .withExternalAnalyticsDisabled(true)
  
Adapty.updateProfile(builder.build())
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers ]
AdaptyProfileParameters.Builder builder = new AdaptyProfileParameters.Builder()
    .withExternalAnalyticsDisabled(true);

Adapty.updateProfile(builder.build());
```
</TabItem>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
final builder = AdaptyProfileParametersBuilder()
  ..setAnalyticsDisabled(true);

try {
  await Adapty().updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
var builder = new AdaptyProfileParameters.Builder()
    .SetAnalyticsDisabled(true);

Adapty.UpdateProfile(builder.Build(), (error) => {
    if(error != null) {
      // handle the error
    }
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
adapty.updateProfile({ analyticsDisabled: true });
```
</TabItem>
</Tabs>

### Disable collection of advertising identifiers

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS" default>
You can disable IDFA collection by using the `idfaCollectionDisabled` property. Make sure you call it before `.activate()` method.

```swift showLineNumbers
// In your AppDelegate class:
import Adapty

let configurationBuilder =
    AdaptyConfiguration
        .builder(withAPIKey: "PUBLIC_SDK_KEY")
 // highlight-start
        .with(idfaCollectionDisabled: true) // set to `true`
// highlight-end

Adapty.activate(with: configurationBuilder.build()) { error in
  // handle the error
}
```
</TabItem>

<TabItem value="kotlin" label="Android (Kotlin)" default>
You can disable AAID/GAID collection by using the `withAdIdCollectionDisabled` property when activating the Adapty SDK:

```swift showLineNumbers
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(true) // set to `true`
      // highlight-end
          .build()
    )  
}
```

</TabItem>

<TabItem value="java" label="Android (Java)" default>
You can disable AAID/GAID collection by using the `withAdIdCollectionDisabled` property when activating the Adapty SDK:

```swift showLineNumbers 
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
      // highlight-start
          .withAdIdCollectionDisabled(true) // set to `true`
      // highlight-end
          .build()
    );
}
```

</TabItem>

<TabItem value="flutter" label="Flutter" default>
You can disable IDFA collecting by using the `withAppleIdfaCollectionDisabled` property and Google/Android Advertising ID by using the `withGoogleAdvertisingIdCollectionDisabled` property. Set them to `true` when activating the Adapty SDK:

```dart showLineNumbers
try {
    await Adapty().activate(
        configuration: AdaptyConfiguration(apiKey: 'YOUR_API_KEY')
 // highlight-start
          ..withGoogleAdvertisingIdCollectionDisabled(true), // set to `true`
          ..withAppleIdfaCollectionDisabled(true), // set to `true`
// highlight-end
    );
} catch (e) {
    // handle the error
}
```
</TabItem>

<TabItem value="unity" label="Unity" default>
You can disable IDFA collecting by using the `SetIDFACollectionDisabled` property when activating the Adapty SDK. The AAID/GAID collection cannot be disabled now.

```dart showLineNumbers
var builder = new AdaptyConfiguration.Builder("YOUR_API_KEY")
 // highlight-start
    .SetIDFACollectionDisabled(true); // set to `true`
 // highlight-end

Adapty.Activate(builder.Build(), (error) => {
    // handle the error
}
```

</TabItem>

<TabItem value="rn" label="React Native" default>
You also can disable IDFA collecting by using `idfaCollectionDisabled` property when activating the Adapty SDK. The AAID/GAID collection cannot be disabled now.

```typescript showLineNumbers
adapty.activate('PUBLIC_SDK_KEY', {
  // highlight-start 
  ios: {
    idfaCollectionDisabled: true, // set to `true`
  },
  // highlight-end
});
```
</TabItem>
</Tabs>