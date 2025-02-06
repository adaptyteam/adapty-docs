---
title: "PostHog"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

PostHog is an analytics platform that provides tools for tracking user behavior, visualizing product usage, and analyzing retention. With features like event tracking, user flows, and feature flags, it’s designed to help you better understand and improve your product.

Integrating PostHog with Adapty enables seamless tracking of subscription-related events, such as trial starts, renewals, and cancellations. By sending these events to PostHog, you can analyze how subscription changes affect user behavior, evaluate paywall performance, and gain deeper insights into your monetization strategies — all within your existing analytics workflow.

## Integration Characteristics

| Integration characteristic | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| Schedule                   | Real-time; events may not appear immediately on the PostHog dashboard. |
| Data direction             | Adapty events are sent from the Adapty server to the PostHog server. |
| Adapty integration point   | <ul><li> PostHog and Adapty SDKs in the mobile app code</li><li> Adapty server</li></ul> |

## PostHog event structure

Adapty sends selected events to PostHog as configured in the **Events names** section on the [**PostHog Integration page**](https://app.adapty.io/integrations/posthog). Each event is structured like this:

```json showLineNumbers
{
  "distinct_id": "john.doe@example.com",
  "timestamp": "2025-01-08T11:06:12+00:00",
  "event": "subscription_started",
  "properties": {
    "$set": {
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "birthday": "1990-01-01",
      "gender": "male",
      "os": "iOS"
    },
    "timezone": "America/New_York",
    "ip_address": "10.168.1.1",
    "*": "{{other_event_properties}}"
  }
}
```

Where

| **Parameter**   | **Type**             | **Description**                                              |
| --------------- | -------------------- | ------------------------------------------------------------ |
| **distinct_id** | String               | Unique identifier for the user (e.g., `profile.posthog_distinct_user_id`, `customer_user_id`, or `profile_id`). |
| **timestamp**   | ISO 8601 date & time | The date and time of the event.                              |
| **event**       | String               | The name of the event as you defined it in the Events names section of the [**PostHog configuration**](https://app.adapty.io/integrations/posthog). |
| **properties**  | Object               | Contains the [properties.$set](posthog#propertiesset-parameters) and all the [event-specific properties](events#properties). Each property is optional and won't be sent to PostHog if missing. |

### properties.$set parameters

Each `properties.$set` object parameter is optional and won't be sent to PostHog if missing.

| **Parameter**   | **Type**             | **Description**                                              |
| --------------- | -------------------- | ------------------------------------------------------------ |
| **email**           | String        | User's email address.                                        |
| **first_name**      | String        | User's first name.                                           |
| **last_name**       | String        | User's last name.                                            |
| **birthday**        | String (Date) | User's date of birth.                                        |
| **gender**          | String        | User's gender.                                               |
| **os**              | String        | Operating system of the user's device.                       |

## Setting up PostHog integration

1. Open the [**Integrations -> PostHog**](https://app.adapty.io/integrations/posthog) page in the Adapty Dashboard and enable the toggle.

   <Zoom>
     <img src={require('./img/posthog-on.webp').default}
     style={{
       border: 'none', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Log into the [PostHog Dashboard](https://posthog.com/).

3. Navigate to **Settings -> Project**.

   <Zoom>
     <img src={require('./img/posthog-settings.webp').default}
     style={{
       border: 'none', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

4. In the **Project** window, scroll down to the **Project ID** section and copy the **Project API key**.

5. Paste the API key into the **Project API key** field in the Adapty Dashboard. PostHog doesn’t have a specific Sandbox mode for server-to-server integration. 

6. Choose your **PostHog Deployment**:

   | Option | Description                                                  |
   | ------ | ------------------------------------------------------------ |
   | us/eu  | Default PostHog-hosted deployments.                          |
   | Custom | For self-hosted instances. Enter your instance URL in the **PostHog Instance URL** field. |

7. (optional) If you're using a self-hosted PostHog deployment, enter your deployment's address in the **PostHog Instance URL** field.

8. (optional) Tweak settings like **Reporting Proceeds**, **Exclude Historical Events**, **Report User's Currency**, and **Send Trial Price**. Check the [Integration settings](https://adapty.io/docs/configuration#integration-settings) for details on these options.

9. (optional) You can also customize which events are sent to PostHog in the **Events names** section. Disable unwanted events or rename them as needed.

10. Click **Save** to finalize the setup.

## SDK configuration

To enable receiving attribution data from PostHog, pass the `distinctId` value to Adapty as shown below:

<Tabs groupId="posthog"> 

<TabItem value="Swift" label="Swift" default> 

```swift showLineNumbers
do {
    let distinctId = PostHogSDK.shared.getDistinctId()

    try await Adapty.setIntegrationIdentifier(
        key: "posthog_distinct_user_id",
        value: distinctId
    )                
} catch {
    // handle the error
}
```

</TabItem> 

<TabItem value="kotlin" label="Kotlin" default> 

```Kotlin showLineNumbers
Adapty.setIntegrationIdentifier("posthog_distinct_user_id", PostHog.distinctId()) { error ->
    if (error != null) {
        // handle the error
    }

```

 </TabItem> 

<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.setIntegrationIdentifier("posthog_distinct_user_id", PostHog.distinctId(), error -> {
    if (error != null) {
        // handle the error
    }
});
```

</TabItem> 

<TabItem value="Flutter" label="Flutter" default> 

```javascript showLineNumbers
try {
    final distinctId = await Posthog().getDistinctId();

    await Adapty().setIntegrationIdentifier(
        key: "posthog_distinct_user_id",
        value: distinctId,
    );
} catch (e) {
    // handle the error
}
```

</TabItem> 

<TabItem value="Unity" label="Unity" default> 

There is no official PostHog SDK for Unity.

</TabItem> 

<TabItem value="RN" label="React Native (TS)" default>

```typescript showLineNumbers
 import { adapty } from 'react-native-adapty';
import { usePostHog } from 'posthog-react-native'

// ...
const posthog = usePostHog();

// ...
try {
  await adapty.setIntegrationIdentifier("posthog_distinct_user_id", posthog.get_distinct_id());
} catch (error) {
  // handle `AdaptyError`
}
```

</TabItem>

</Tabs>

Adapty will now send events to PostHog and receive attribution from it. 