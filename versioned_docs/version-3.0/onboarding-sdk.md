---
title: "Display onboardings"
metadataTitle: "Display Onboardings in Adapty | Adapty Docs"
---
import Collapse from '@site/src/components/Collapse';

:::important
Currently, onboardings are only available for the iOS and Android SDK.
:::

When you create an [onboarding](onboardings.md) with our no-code builder, it's stored as a container with configuration that your app needs to fetch and display. This container manages the entire experience - what content appears, how it's presented, and how user interactions (like quiz answers or form inputs) are processed. The container also automatically tracks analytics events, so you don't need to implement separate view tracking.

To integrate onboarding in your application:

1. [Fetch the onboarding configuration](get-onboardings.md)
2. [Render the onboarding in your UI](ios-present-onboardings.md)
3. [Handle any events](ios-handling-onboarding-events.md)
