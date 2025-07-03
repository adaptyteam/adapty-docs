---
title: "Export placement info"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
keywords: ['export placements']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ResponseExample from '@site/src/components/reusable/ResponseExample.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';

Retrieves information about paywall or onboarding placements: paywalls, segments, audiences, and A/B tests. This can help you ensure everything is set up correctly without having to open each placement you have separately.

:::note
As an alternative, you can [export the same data from the dashboard](export-placements.md).
:::

## Endpoint and method

```
POST https://api-admin.adapty.io/api/v1/client-api/exports/placements/
```

## Example request

<Tabs groupId="api-lang" queryString>
<TabItem value="curl" label="cURL" default> 

```bash showLineNumbers
curl -X POST --location "https://api-admin.adapty.io/api/v1/client-api/exports/placements/" \
    -H "Authorization: Api-Key <SECRET-KEY>" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d '{
          "filters": {
            "placement_type": "paywall"
          }
        }'
```

</TabItem> 

<TabItem value="python" label="Python" default> 

```python showLineNumbers
import requests

url = 'https://api-admin.adapty.io/api/v1/client-api/exports/placements/'

headers = {
    'Authorization': 'Api-key <YOUR_SECRET_API_KEY>',
    'Accept': 'text/csv',  # or application/json
}

payload = {
    'filters': {
        'placement_type': 'paywall',
    },
}

response = requests.post(url, headers=headers, json=payload)
```

</TabItem>

<TabItem value="js" label="JavaScript" default> 

```javascript showLineNumbers
const myHeaders = new Headers();
myHeaders.append("Authorization", "Api-Key <YOUR_SECRET_API_KEY>");
myHeaders.append("Accept", "application/json");

const raw = JSON.stringify({
  "filters": {
      "placement_type": "paywall"
    }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api-admin.adapty.io/api/v1/client-api/exports/placements/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem> 


</Tabs>

Placeholders:

- `<YOUR_SECRET_API_KEY>`: Your secret API key for authorization.

:::tip
Depending on how you are going to use the response, you can set `Accept` to `text/csv` to get it as CSV or `application/json` to get a JSON file.
:::

## Parameters


| Parameter | Type   | Required in request | Nullable in request | Description                                                                                                                                                                                                              |
|-----------|--------|---------------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| filters   | Object | :heavy_plus_sign:   | :heavy_minus_sign:  | Filter which placements will be sent in the response.  <br/> Currently, you can only filter by `placement_type`: `paywall` or `onboarding`. So, the `filters` parameter value will be an object with one key-value pair. |

```json showLineNumbers
{
  "filters": {
    "placement_type": "paywall"
  }
}
```

## Successful response: 200: OK

| Parameter                    | Type   | Description                    |
|------------------------------|--------|--------------------------------|
| developer_id                 | String | Placement ID.                  |
| placement_name               | String | Placement name.                |
| audience_name                | String | Audience name.                 |
| segment_name                 | String | Audience ID.                   |
| cross_placement_ab_test_name | String | Cross-placement A/B test name. |
| ab_test_name                 | String | A/B test name.                 |
| paywall_name                 | String | Paywall name.                  |
| onboarding_name              | String | Onboarding name.               |

<Tabs>
<TabItem value="json" label="JSON" default> 

```json
{
  "data": [
    {
      "developer_id": "monthly",
      "placement_name": "Monthly",
      "audience_name": "USA",
      "segment_name": "USA",
      "cross_placement_ab_test_name": "Monthly cross A/B",
      "ab_test_name": "Monthly A/B",
      "paywall_name": "Monthly USA"
    },
    {
      "developer_id": "weekly",
      "placement_name": "Weekly",
      "audience_name": "USA",
      "segment_name": "USA",
      "cross_placement_ab_test_name": "Weekly cross A/B",
      "ab_test_name": "Weekly A/B",
      "paywall_name": "Weekly USA"
    }
  ]
}
```
</TabItem>

<TabItem value="csv" label="CSV" default> 

```csv
developer_id,placement_name,audience_name,segment_name,cross_placement_ab_test_name,ab_test_name,paywall_name
monthly,Monthly,USA,USA,Monthly cross A/B,Monthly A/B,Monthly USA
weekly,Weekly,USA,USA,Weekly cross A/B,Weekly A/B,Weekly USA
```
</TabItem>

</Tabs>

## Errors

### 401: Unauthorized

<ProfileResponseUnauthorized /> 