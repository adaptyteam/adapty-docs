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

This integration operates in two key ways:

1. **Receiving attribution data from PostHog** Once integrated, Adapty collects attribution data from PostHog. You can access this information on the user’s profile page in the Adapty Dashboard.
2. **Sending subscription events to PostHog** Adapty sends purchase events to PostHog in real time. These events help evaluate the effectiveness of your ad campaigns directly within PostHog’s dashboard.

## Integration Characteristics

| Integration characteristic | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| Schedule                   | Real-time; events may not appear immediately on the PostHog dashboard. |
| Data direction             | Two-way transmission: <ul><li>**Adapty events**: From Adapty server to PostHog server</li><li> **PostHog attribution**: From PostHog SDK to Adapty server</li></ul> |
| Adapty integration point   | <ul><li> PostHog and Adapty SDKs in the mobile app code</li><li> Adapty server</li></ul> |

## PostHog event structure

Adapty sends selected events to PostHog as configured in the **Events names** section on the [**PostHog Integration page**](https://app.adapty.io/integrations/posthog). Each event is structured like this:

```json
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
    "ip_address": "192.168.1.1",
    "*": "{{everything_else}}"
  }
}
```

Where

| **Parameter**       | **Type**      | **Description**                                              |
| ------------------- | ------------- | ------------------------------------------------------------ |
| **distinct_id**     | String        | Unique identifier for the user (e.g., `profile.posthog_distinct_user_id`, `customer_user_id`, or `profile_id`). |
| **event**           | String        | The name of the event as you defined it in the Events names section of the [**PostHog configuration**](https://app.adapty.io/integrations/posthog). |
| **properties**      | Object        | Contains all the event-specific properties.                  |
| **properties.$set** | Object        | Contains person properties to be set or updated in the user's profile. |
| **email**           | String        | User's email address.                                        |
| **first_name**      | String        | User's first name.                                           |
| **last_name**       | String        | User's last name.                                            |
| **birthday**        | String (Date) | User's date of birth.                                        |
| **gender**          | String        | User's gender.                                               |
| **os**              | String        | Operating system of the user's device.                       |
| **timezone**        | String        | User's time zone in format `$geoip_time_zone`.               |
| **ip_address**      | String (IPv4) | User's IP address.                                           |

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

   <Zoom>
     <img src={require('./img/e5dce30-image_3.webp').default}
     style={{
       border: 'none', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

5. Paste the API key into the **Project API key** field in the Adapty Dashboard. PostHog doesn’t have a specific Sandbox mode for server-to-server integration. 

6. Choose your **PostHog Deployment**:

   | Option | Description                                                  |
   | ------ | ------------------------------------------------------------ |
   | us/eu  | Default PostHog-hosted deployments.                          |
   | Custom | For self-hosted instances. Enter your instance URL in the **PostHog Instance URL** field. |

7. (optional) If you use PostHog deployed on your own servers, fill in the PostHog Instance URL field with the address of your PostHog deployment.

8. (optional) You can adjust settings such as **Reporting Proceeds**, **Exclude Historical Events**, **Report User's Currency**, and **Send Trial Price** if needed. For more details about these options, check the [Integration settings](https://adapty.io/docs/configuration#integration-settings).

9. (optional) Adjust event sharing in the **Events names** section. Disable unwanted events or rename them as needed.

10. Click **Save** to finalize the setup.

Adapty will now send events to PostHog and receive attribution data. 

## SDK configuration

<Tabs groupId="posthog"> 

<TabItem value="Swift" label="Swift" default> 

```swift
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

```Kotlin
Adapty.setIntegrationIdentifier("posthog_distinct_user_id", PostHog.distinctId()) { error ->
    if (error != null) {
        // handle the error
    }

```

 </TabItem> 

<TabItem value="java" label="Java" default>

```java
Adapty.setIntegrationIdentifier("posthog_distinct_user_id", PostHog.distinctId(), error -> {
    if (error != null) {
        // handle the error
    }
});
```

</TabItem> 

<TabItem value="Flutter" label="Flutter" default> 

```
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

There is no official SDK for Unity.

</TabItem> 

<!--- <TabItem value="RN" label="React Native (TS)" default>

 Text 

</TabItem> --->

</Tabs>