---
title: "Webhook integration"
description: "Learn how to use webhooks to get instant notifications about subscription events like new trials and billing issues, enabling seamless automation and enhanced backend management for your app."
metadataTitle: "Understanding Webhooks: Real-Time Notifications for Subscription Events"
---

A webhook is a convenient and fast way to get notifications about [events](events). For example, if a new trial is started, a subscription is renewed, or a billing issue happens. The webhook mechanism works through a callback function. You set up a URL (called Endpoint URL) to which an HTTP request is sent when an event occurs. 


<img
  src={require('./img/e5dce30-image_3.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Unlike API requests, which require repeatedly requesting information from the server, a webhook is configured only once. When the target event occurs in your app, it immediately sends data via the HTTP protocol.

With webhooks integrated, you can:

- Keep track of subscriptions and purchases in your backend system.
- Automate processes and workflows based on subscription lifecycles.
- Engage with subscribers by reminding them of app benefits, addressing unsubscribe decisions, and handling billing issues.
- Conduct a detailed analysis of the user behavior.

**Integration characteristics**

| Integration characteristic | Description                                                 |
| :------------------------- | :---------------------------------------------------------- |
| Schedule                   | Real-time updates                                           |
| Data direction             | One-way data transmission: from Adapty to your server       |
| Adapty integration flow    | Events are sent by the Adapty server once they are received |

## Webhook event structure

Adapty will send you those events you've chosen in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.

Each event is wrapped into the following structure:

```json title="Json"
{
  "profile_id": "772204ce-ebf6-4ed9-82b0-d8688ab62b01",
  "customer_user_id": "john.doe",
  "idfv": "00000000-0000-0000-0000-000000000000",
  "idfa": "00000000-0000-0000-0000-000000000000",
  "advertising_id": "00000000-0000-0000-0000-000000000000",
  "profile_install_datetime": "2020-02-18T18:40:22.000000+0000",
  "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  "email": "john.doe@company.com",
  "event_type": "non_subscription_purchase",
  "event_datetime": "2023-02-18T18:40:22.000000+0000",
  "event_properties": <event-specific properties>,
  "event_api_version": 1,
  "attributions": {"attribution_source1": <attribution_data>, "attribution_source2": <attribution_data>, ...},
  "user_attributes": {"attribute_name1": "attribute_value1", "attribute_name2": "attribute_value2", ...}
  "integration_ids": {"firebase_app_instance_id": "val1", "branch_id": "val2", "one_signal_player_id": "val3", ... }
}
```

### Event parameters

| Property                     | Type                 | Description                                                                                                                                                                                                                                                                                                 |
| :--------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **profile_id**               | String               | The Сustomer user ID of the profile in Adapty.                                                                                                                                                                                                                                                              |
| **customer_user_id**         | String               | User ID you use in your app to identify the user. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it.                                                                                                                                                                 |
| **idfv**                     | String               | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps                                                                                                                                                             |
| **idfa**                     | String               | The identifier for advertisers (IDFA) is a random device identifier assigned by Apple to a user's device.                                                                                                                                                                                                   |
| **advertising_id**           | String               | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device.                                                                                                                                                               |
| **profile_install_datetime** | ISO 8601 date & time | Installation date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html): starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **user_agent**               | String               | User-agent used by the browser on the device.                                                                                                                                                                                                                                                               |
| **email**                    | String               | E-mail of your user.                                                                                                                                                                                                                                                                                        |
| **event_type**               | String               | Event name as set up in the in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook)  page in lowercase.                                                                                                                                |
| **event_datetime**           | ISO 8601 date & time | Event date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html) : starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m.       |
| **event_properties**         | JSON                 | JSON of [event properties](events#properties).                                                                                                                                                                                                                                                          |
| **event_api_version**        | Integer              | Adapty API version. The current value is `1`.                                                                                                                                                                                                                                                               |
| **attributions**             | JSON                 | JSON of [attribution data](webhook#attribution-data).                                                                                                                                                                                                                                                   |
| **user_attributes**          | JSON                 | JSON of [custom user attributes](setting-user-attributes#custom-user-attributes).                                                                                                                                                                                                                       |
| **integration_ids**          | JSON                 | JSON of user integration identifiers. If a user doesn't have any identifier or integrations are disabled, then a null is sent.                                                                                                                                                                              |

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Webhook integration enables the control of sending attribution and user attributes. 

- Enable the **Send Attribution** option in the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page to send the information about the source of app installs from data providers. 
- Enable the **Send User Attributes** option to send custom user attributes set up from the Adapty SDK, such as user preferences and app usage data.

### Attribution data

If you've chosen to send attribution data, the following data will be sent with the event:

| Field name          | Field type    | Description                                        |
| :------------------ | :------------ | :------------------------------------------------- |
| **network_user_id** | str           | ID assigned to the user by the attribution source. |
| **status**          | str           | Can be `organic`, `non_organic` or `unknown`.      |
| **created_at**      | ISO 8601 date | Date and time of attribution record creation.      |
| **channel**         | str           | Marketing channel name.                            |
| **campaign**        | str           | Marketing campaign name.                           |
| **ad_group**        | str           | Attribution ad group.                              |
| **ad_set**          | str           | Attribution ad set.                                |
| **creative**        | str           | Attribution creative keyword.                      |