---
title: "Adjust integration"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

[Adjust](https://www.adjust.com/) is one of the leading Mobile Measurement Partner (MMP) platforms, that collects and presents data from marketing campaigns. This helps companies track their campaign performance. 

Integrating Adapty with Adjust allows app developers and marketers to close the gap between user acquisition data and revenue analytics. This integration is essential for accurately attributing app installs and user actions to various marketing campaigns and channels.

By forwarding [subscription events](events) to Adjust, you can see exactly where conversions come from and which campaigns bring in the most value across all channels, platforms, and devices. Essentially, Adjust dashboards offer advanced analytics for marketing campaigns.

By forwarding Adjust attribution to Adapty, you enrich the Adapty analytics with additional filtration criteria you can use in cohort and conversion analysis.

The integration between Adapty and Adjust operates in two main ways.

The integration between Adapty and Adjust works in two main ways.

1. **Receiving attribution data from Adjust**  
   Once you've set up the Adjust integration, Adapty will start receiving attribution data from Adjust. You can easily access and view this data on the user's profile page.


<Zoom>
  <img src={require('./img/d2f019d-adjust_adapty_attributionsection.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. **Sending subscription events to Adjust**  
   Adapty can send all subscription events which are configured in your integration to Adjust. As a result, you'll be able to track these events within the Adjust dashboard. This integration is beneficial for evaluating the effectiveness of your advertising campaigns.

## Adjust event structure

Adapty will send you those events you've chosen in the **Events names** section of the [**Integrations** ->  **Adjust**](https://app.adapty.io/integrations/appsflyer) page.

Each event is wrapped into the following structure:

```json title="Json"
{
  "s2s": 1,
  "adid": "1c4188b31930bc7778f7cd7dc5fe093d",
  "idfv": "2F1C248B-93CF-4443-949A-87B0C109842D",
  "revenue": 4.893,
  "currency": "USD",
  "app_token": "hgokwq52pb0g",
  "ip_address": "74.73.33.134",
  "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  "event_token": "xmstfd",
  "callback_params": "{\"profile_event_id\":\"b57dc673-a98a-444c-b0f4-66f31047d8e8\",\"profile_id\":\"ad1ef1c0-4248-4558-9dd3-24154d47682b\",\"store_country\":\"US\",\"profile_country\":\"US\",\"profile_total_revenue_usd\":\"90.19942005350637\",\"environment\":\"Production\",\"store\":\"app_store\",\"vendor_product_id\":\"askhowto.weekly.02\",\"transaction_id\":\"310001839953853\",\"original_transaction_id\":\"310001669643532\",\"purchase_date\":\"2024-05-23T01:29:09.000000+0000\",\"original_purchase_date\":\"2023-12-25T19:08:38.000000+0000\",\"event_datetime\":\"2024-05-23T01:29:09.000000+0000\",\"currency\":\"USD\",\"price_usd\":\"6.99\",\"proceeds_usd\":\"4.893\",\"net_revenue_usd\":\"4.893\",\"tax_amount_usd\":\"0.0\",\"price_local\":\"6.99\",\"proceeds_local\":\"4.893\",\"net_revenue_local\":\"4.893\",\"tax_amount_local\":\"0.0\",\"consecutive_payments\":\"14\",\"rate_after_first_year\":\"False\",\"subscription_expires_at\":\"2024-05-30T01:29:09.000000+0000\",\"customer_user_id\":\"2F1C248B-93CF-4443-949A-87B0C109842DEB8AFFA3-374E-49F2-8A94-0F15A170A6F9\",\"integration_event_id\":\"64478b33-a2ba-47ce-9c33-4483171024bc\"}",
  "created_at_unix": 1716427749,
  "customer_user_id": "2F1C248B-93CF-4443-949A-87B0C109842DEB8AFFA3-374E-49F2-8A94-0F15A170A6F9",
  "external_device_id": "2F1C248B-93CF-4443-949A-87B0C109842DEB8AFFA3-374E-49F2-8A94-0F15A170A6F9"
}
```

Where

| Property | Type | Description |
|--------|----|-----------|
| **s2s** | Integer | A hardcoded s2s=1 parameter to inform the endpoint that the requests are server-to-server. |
| **adid** | String | The Adjust identifier associated with the device. Useful for identifying LAT users on iOS without IDFA information. |
| **idfv** | String | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps. Applicable to iOS apps only |
| **gps_adid** | String | Google Play advertising identifier. Android-only |
| **revenue** | Float | Revenue event value in full currency units (149.99 = $149.99). Adjust's servers accept a minimum value of 0.001 for this parameter. |
| **currency** | Float | Local currency (defaults to USD). |
| **app_token** | String | Adjust app token |
| **android_id** | String | Android identifier, only sent if gps_adid is not present. Android only |
| **ip_address** | String | <p>The IP address of the device. Used for linking events to third parties (for example, Google) and including location-related information (for example, city, postal_code) in your callbacks.</p><p></p><p>The ip_address parameter accepts only IPv4 addresses. IPv6 isn't currently supported.</p> |
| **user_agent** | String | The user agent of the device. Must be URL-encoded. |
| **event_token** | String | Adjust event token |
| **callback_params** | JSON object | A URL-encoded JSON object containing string key-value pairs. |
| **created_at_unix** | ISO 8601 date | The date and time at which the event occurred. |
| **customer_user_id** | String | The Customer User ID (CUID) is a unique user identifier. It is usually generated and set by the app owner at the time of user registration. The CUID lets app owners follow user journeys across different devices |
| **external_device_id** | String | An [external device identifier](https://help.adjust.com/en/article/external-device-identifiers) is a case-sensitive, custom value assigned to a device or user. |


For more information, please refer to the [Adjust documentation](https://help.adjust.com/en/article/server-to-server-events).