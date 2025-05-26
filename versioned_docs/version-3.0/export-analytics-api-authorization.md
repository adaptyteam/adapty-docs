---
title:  Authorization and request format for Exporting analytics API
toc_max_heading_level: 2
---

## Authorization

You need to authenticate your API requests with your secret API key as an Authorization header. You can find it in the [App Settings](https://app.adapty.io/settings/general). The format is `Api-Key {YOUR_SECRET_API_KEY}`, for example: `Api-Key secret_live_...`.

## Request format

**Headers**

The server-side API requests require specific headers and a JSON body. Use the details below to structure your requests:

| Header       | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| Content-Type | (Required) Set to `application/json` for the API to process the request. |
| Adapty-Tz    | (Optional) Set the timezone to define how the data is grouped and displayed. Use the [IANA Time Zone Database format](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g., `Europe/Berlin`). |

## Body

The API expects a JSON-formatted body with the necessary data for the request.

---

**What's next: Requests:**

- [Retrieve analytics data](export-analytics-api-retrieve-analytics-data)
- [Retrieve cohort data](export-analytics-api-retrieve-cohort-data)
- [Retrieve conversion data](export-analytics-api-retrieve-conversion-data)
- [Retrieve funnel data](export-analytics-api-retrieve-funnel-data)
- [Retrieve Lifetime Value (LTV) data](export-analytics-api-retrieve-ltv)
- [Retrieve retention data](export-analytics-api-retrieve-retention-data)
