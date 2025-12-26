---
title: "Asapty"
description: "Discover Asapty and its role in Adapty’s subscription ecosystem."
metadataTitle: "What is Asapty? | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Using [Asapty](https://asapty.com/) integration you can optimize your Search Ads campaigns. Adapty sends subscription events to Asapty, so you can build custom dashboards there, based on Apple Search Ads attribution.

This specific integration doesn't add any attribution data to Adapty, as we already have everything we need from [ASA](apple-search-ads) directly.

## Initial Setup

To integrate Asapty navigate to [Integrations > Asapty](https://app.adapty.io/integrations/asapty) in the Adapty dashboard and fill out the field value for Asapty ID.

<Zoom>
  <img src={require('./img/895de2b-CleanShot_2023-08-14_at_18.57.462x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Asapty ID can be found in Settings> General section in your Asapty account.

## Events and tags

Below the credentials, there are three groups of events you can send to Asapty from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).

<Zoom>
  <img src={require('./img/58ddf41-CleanShot_2023-08-15_at_15.11.072x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

We recommend using the default event names provided by Asapty. But you can change the event names based on your needs.

## Attribution Integration

Once you complete the steps outlined above, Adapty automatically receives attribution data from Asapty. There's no need to explicitly request attribution data in your application code. For better attribution data accuracy, configure Asapty to share the `customerUserId` with each event's data.

## Asapty event structure

Adapty sends events to Asapty via a GET request using query parameters. Each event URL looks like this:

```
https://asapty.com/_api/mmpEvents/?source=adapty&asaptyid=a1b2c3d4&keywordid=12345&adgroupid=67890&campaignid=11223&conversiondate=1709294400000&event_name=subscription_renewed&install_time=1709100000&app_name=MyApp&json=%7B%22af_revenue%22%3A%229.99%22%2C%22af_currency%22%3A%22USD%22...%7D
```

Query parameters:

| Parameter        | Type   | Description                                          |
|:-----------------|:-------|:-----------------------------------------------------|
| `source`         | String | Always "adapty".                                     |
| `asaptyid`       | String | The Asapty ID from your credentials.                 |
| `keywordid`      | String | Apple Search Ads Keyword ID (if available).          |
| `adgroupid`      | String | Apple Search Ads Ad Group ID (if available).         |
| `campaignid`     | String | Apple Search Ads Campaign ID (if available).         |
| `conversiondate` | Long   | Timestamp of the event in **milliseconds**.          |
| `event_name`     | String | The event name (mapped from Adapty event).           |
| `install_time`   | Long   | Timestamp of the install in seconds.                 |
| `app_name`       | String | The app title from Adapty (if available).            |
| `json`           | String | URL-encoded JSON string containing event details (see below). |

The `json` parameter is a URL-encoded JSON string containing the following fields:

| Parameter                 | Type   | Description                                  |
|:--------------------------|:-------|:---------------------------------------------|
| `af_revenue`              | String | Revenue amount as a string.                  |
| `af_currency`             | String | Currency code (e.g., "USD").                 |
| `transaction_id`          | String | Store Transaction ID.                        |
| `original_transaction_id` | String | Original Store Transaction ID.               |
| `purchase_date`           | Long   | Purchase timestamp in milliseconds.          |
| `original_purchase_date`  | Long   | Original purchase timestamp in milliseconds. |
| `environment`             | String | `Production` or `Sandbox`.                   |
| `vendor_product_id`       | String | The Product ID from the store.               |
| `profile_country`         | String | Country code based on user's IP.             |
| `store_country`           | String | Country code of the store user.              |

## Troubleshooting

- Make sure you've configured [Apple Search Ads](apple-search-ads) in Adapty and [uploaded credentials](https://app.adapty.io/settings/apple-search-ads), without them, Asapty won't work.
- Only the profiles with detailed, non-organic ASA attribution will deliver their events to Asapty. You will see "The user profile is missing the required integration data." if the attribution is not sufficient.
- Profiles created prior to configuring the integrations will not be able to deliver their events to Asapty.
- If the integration with Adapty isn't working despite the correct setup, ensure the **Receive Apple Search Ads attribution in Adapty** toggle is enabled in the [**App Settings** -> **Apple Search Ads** tab](https://app.adapty.io/settings/apple-search-ads).