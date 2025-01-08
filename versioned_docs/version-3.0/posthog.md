---
title: "PostHog"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

PostHog is an analytics platform that provides tools for tracking user behavior, visualizing product usage, and analyzing retention. With features like event tracking, user flows, and feature flags, it’s designed to help you better understand and improve your product.

Integrating PostHog with Adapty enables seamless tracking of subscription-related events, such as trial starts, renewals, and cancellations. By sending these events to PostHog, you can analyze how subscription changes affect user behavior, evaluate paywall performance, and gain deeper insights into your monetization strategies—all within your existing analytics workflow.

### How to set up PostHog integration





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