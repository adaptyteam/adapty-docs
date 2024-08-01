---
title: "AppsFlyer integration (new)"
description: ""
metadataTitle: ""
---

[AppsFlyer](https://www.appsflyer.com/) is a leading platform for mobile attribution and marketing analytics. It stands as a third-party service that gathers and organizes data from marketing campaigns. This helps you see how well your campaigns are performing in one place.

Integrating Adapty with AppsFlyer allows app developers and marketers to close the gap between user acquisition data and revenue analytics. This integration is essential for accurately attributing app installs and user actions to various marketing campaigns and channels.

By forwarding [subscription events](events) to Appsflyer, you can see exactly where conversions come from and which campaigns bring in the most value across all channels, platforms, and devices. Essentially, Appsflyer’s dashboards offer advanced analytics for marketing campaigns.

By forwarding AppsFlyer attribution to Adapty, you enrich the Adapty analytics with additional filtration criteria you can use in cohort and conversion analysis.

The integration between Adapty and AppsFlyer operates in two main ways.

1. **Receiving attribution data from AppsFlyer**  
   Once you've set up the AppsFlyer integration, Adapty will start receiving attribution data from AppsFlyer. You can easily access and view this data on the user's profile page.


<img
  src={require('./img/b764bdd-appsflyer_attribution.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





2. **Sending subscription events to AppsFlyer**  
     Adapty can send all subscription events that are configured in your integration to AppsFlyer. As a result, you'll be able to track these events within the AppsFlyer dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## Integration characteristics

| Integration characteristic | Description |
|--------------------------|-----------|
| Schedule | Real-time with a 5-minute delay |
| Data direction | <p>Two-way transmission:</p><p></p><p>- Adapty events: From Adapty server to AppsFlyer server</p><p>- AppsFlyer attribution: From AppsFlyer SDK to Adapty server</p> |
| Adapty integration point | <p>\- AppsFlyer and Adapty SDKs in the mobile app code</p><p></p><p>- Adapty server</p> |


## AppsFlyer event structure

Adapty will send you those events you've chosen in the **Events names** section of the [**Integrations** ->  **AppsFlyer**](https://app.adapty.io/integrations/appsflyer) page.

Each event is wrapped into the following structure:

```json title="Json"
{
"ip": "127.0.0.1",
"os": "17.4.1",
"att": "1",
"idfa": "00000000-0000-0000-0000-000000000000",
"idfv": "00000000-0000-0000-0000-000000000000",
"eventName": "non_subscription_purchase",
"eventTime": "2023-02-18 18:40:22",
"eventValue": "{\"af_content_id\": \"sub.renew.week.799\", \"af_order_id\": \"123456789012345\", \"store_country\": \"US\", \"profile_country\": \"US\", \"af_content_type\": \"in_app\", \"af_revenue\": \"0.0000\", \"af_currency\": \"USD\", \"af_quantity\": \"1\"}",
"appsflyer_id": "0000000000000-0000000",
"eventCurrency": "USD",
"bundleIdentifier": "com.example.id",
"customer_user_id": "john.doe"
}
```

Where

| Property | Type | Description |
|--------|----|-----------|
| **ip** | String | IP address of the subscription event device |
| **os** | Float | Device operating system version |
| **att** | Integer | <p>The numeric values for the different ATT options (0-3):</p><p>(0): The user has not yet received a prompt asking for permission to track</p><p>(1): The user is not allowed to grant permission for tracking. This can be due to parental controls or other restrictions</p><p>(2): The user has explicitly denied permission to track</p><p>(3): The user has granted permission to track their activity</p> |
| **idfa** | String | The identifier for advertisers (IDFA) is a random device identifier assigned by Apple to a user's device. Applicable to iOS apps only |
| **idfv** | String | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps. Applicable to iOS apps only |
| **advertising_id** | String | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device |
| **eventName** | String | Event name as set up in the in the **Events names** section of the [**Integrations** ->  **AppsFlyer**](https://app.adapty.io/integrations/appsflyer)   page in lowercase |
| **eventTime** | ISO 8601 date & time | Event date and time in the following format: starting with the year, followed by the month, the day, the hour, the minutes, and the seconds. For example, 2020-07-10 15:00:00, represents the 10th of July 2020 at 3 p.m. |
| **eventValue** | String | JSON of the event value. `af_quantity`, `af_currency`, `af_revenue`, and `af_content_type` are filled in for payment events only, i.e. events with price |
| **appsflyer_id** | String | A unique identifier assigned by AppsFlyer to a specific profile |
| **eventCurrency** | String | Local currency (defaults to USD). |
| **bundleIdentifier** | String | Bundle ID of the iOS app or package name of the Android app |
| **customer_user_id** | String | The Customer User ID (CUID) is a unique user identifier. It is usually generated and set by the app owner at the time of user registration. The CUID lets app owners follow user journeys across different devices |