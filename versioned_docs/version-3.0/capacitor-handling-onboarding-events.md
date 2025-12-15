---
title: "Handle onboarding events in Capacitor SDK"
description: "Handle onboarding-related events in Capacitor using Adapty."
metadataTitle: "Handling Onboarding Events in Capacitor | Adapty Docs"
toc_max_heading_level: 4
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Onboardings configured with the builder generate events your app can respond to. Use the `setEventHandlers` method to handle these events for standalone screen presentation.

Before you start, ensure that:

1. You have [created an onboarding](create-onboarding.md).
2. You have added the onboarding to a [placement](placements.md).

## Set up event handlers

To handle events for onboardings, use the `view.setEventHandlers` method:

```typescript showLineNumbers
import { adapty, createOnboardingView } from '@adapty/capacitor';

try {
  const view = await createOnboardingView(onboarding);
  
  view.setEventHandlers({
    onAnalytics(event, meta) {
      console.log('Analytics event:', event);
    },
    onClose(actionId, meta) {
      console.log('Onboarding closed:', actionId);
      return true; // Allow the onboarding to close
    },
    onCustom(actionId, meta) {
      console.log('Custom action:', actionId);
      return false; // Don't close the onboarding
    },
    onPaywall(actionId, meta) {
      console.log('Paywall action:', actionId);
      view.dismiss().then(() => {
        openPaywall(actionId);
      });
    },
    onStateUpdated(action, meta) {
      console.log('State updated:', action);
    },
    onFinishedLoading(meta) {
      console.log('Onboarding finished loading');
    },
    onError(error) {
      console.error('Onboarding error:', error);
    },
  });
  
  await view.present();
} catch (error) {
  console.error('Failed to present onboarding:', error);
}
```



## Event types

The following sections describe the different types of events you can handle.

### Handle custom actions

In the builder, you can add a **custom** action to a button and assign it an ID.

<Zoom>
  <img src={require('./img/ios-events-1.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Then, you can use this ID in your code and handle it as a custom action. For example, if a user taps a custom button, like **Login** or **Allow notifications**, the event handler will be triggered with the `actionId` parameter that matches the **Action ID** from the builder. You can create your own IDs, like "allowNotifications".

```typescript showLineNumbers
view.setEventHandlers({
  onCustom(actionId, meta) {
    switch (actionId) {
      case 'login':
        console.log('Login action triggered');
        break;
      case 'allow_notifications':
        console.log('Allow notifications action triggered');
        break;
    }
    return false; // Don't close the onboarding
  },
});
```

<Details>
<summary>Event example (Click to expand)</summary>

```json
{
  "actionId": "allow_notifications",
  "meta": {
    "onboardingId": "onboarding_123",
    "screenClientId": "profile_screen",
    "screenIndex": 0,
    "screensTotal": 3
  }
}
```
</Details>

### Finishing loading onboarding

When an onboarding finishes loading, this event will be triggered:

```typescript showLineNumbers
view.setEventHandlers({
  onFinishedLoading(meta) {
    console.log('Onboarding loaded:', meta.onboardingId);
  },
});
```

<Details>
<summary>Event example (Click to expand)</summary>

```json
{
    "meta": {
        "onboarding_id": "onboarding_123",
        "screen_cid": "welcome_screen",
        "screen_index": 0,
        "total_screens": 4
    }
}
```
</Details>

### Closing onboarding

Onboarding is considered closed when a user taps a button with the **Close** action assigned.

<Zoom>
  <img src={require('./img/ios-events-2.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::important
Note that you need to manage what happens when a user closes the onboarding. For instance, you need to stop displaying the onboarding itself.
:::

```typescript showLineNumbers
view.setEventHandlers({
  onClose(actionId, meta) {
    console.log('Onboarding closed:', actionId);
    return true; // Allow the onboarding to close
  },
});
```

<Details>
<summary>Event example (Click to expand)</summary>

```json
{
  "action_id": "close_button",
  "meta": {
    "onboarding_id": "onboarding_123",
    "screen_cid": "final_screen",
    "screen_index": 3,
    "total_screens": 4
  }
}
```
</Details>

### Opening a paywall

:::tip
Handle this event to open a paywall if you want to open it inside the onboarding. If you want to open a paywall after it is closed, there is a more straightforward way to do it – handle the close action and open a paywall without relying on the event data.
:::

If a user clicks a button that opens a paywall, you will get a button action ID that you [set up manually](get-paid-in-onboardings.md). The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID.

Note that, for iOS, only one view (paywall or onboarding) can be displayed on screen at a time. If you present a paywall on top of an onboarding, you cannot programmatically control the onboarding in the background. Attempting to dismiss the onboarding will close the paywall instead, leaving the onboarding visible. To avoid this, always dismiss the onboarding view before presenting the paywall.

```typescript showLineNumbers
view.setEventHandlers({
  onPaywall(actionId, meta) {
    // Dismiss onboarding before presenting paywall
    view.dismiss().then(() => {
      openPaywall(actionId);
    });
  },
});

async function openPaywall(placementId: string) {
  // Implement your paywall opening logic here
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```json
{
    "action_id": "premium_offer_1",
    "meta": {
        "onboarding_id": "onboarding_123",
        "screen_cid": "pricing_screen",
        "screen_index": 2,
        "total_screens": 4
    }
}
```
</Details>

### Tracking navigation

You receive an analytics event when various navigation-related events occur during the onboarding flow:

```typescript showLineNumbers
view.setEventHandlers({
  onAnalytics(event, meta) {
    console.log('Analytics event:', event.type, meta.onboardingId);
  },
});
```

The `event` object can be one of the following types:

|Type | Description |
|------------|-------------|
| `onboardingStarted` | When the onboarding has been loaded |
| `screenPresented` | When any screen is shown |
| `screenCompleted` | When a screen is completed. Includes optional `elementId` (identifier of the completed element) and optional `reply` (response from the user). Triggered when users perform any action to exit the screen. |
| `secondScreenPresented` | When the second screen is shown |
| `userEmailCollected` | Triggered when the user's email is collected via the input field |
| `onboardingCompleted` | Triggered when a user reaches a screen with the `final` ID. If you need this event, [assign the `final` ID to the last screen](design-onboarding.md). |
| `unknown` | For any unrecognized event type. Includes `name` (the name of the unknown event) and `meta` (additional metadata) |

Each event includes `meta` information containing:

| Field | Description |
|------------|-------------|
| `onboardingId` | Unique identifier of the onboarding flow |
| `screenClientId` | Identifier of the current screen |
| `screenIndex` | Current screen's position in the flow |
| `screensTotal` | Total number of screens in the flow |

<Details>
<summary>Event examples (Click to expand)</summary>

```javascript
// onboardingStarted
{
  "name": "onboarding_started",
  "meta": {
    "onboarding_id": "onboarding_123",
    "screen_cid": "welcome_screen",
    "screen_index": 0,
    "total_screens": 4
  }
}

// screenPresented
{
    "name": "screen_presented",
    "meta": {
        "onboarding_id": "onboarding_123",
        "screen_cid": "interests_screen",
        "screen_index": 2,
        "total_screens": 4
    }
}

// screenCompleted
{
    "name": "screen_completed",
    "meta": {
        "onboarding_id": "onboarding_123",
        "screen_cid": "profile_screen",
        "screen_index": 1,
        "total_screens": 4
    },
    "params": {
        "element_id": "profile_form",
        "reply": "success"
    }
}

// secondScreenPresented
{
    "name": "second_screen_presented",
    "meta": {
        "onboarding_id": "onboarding_123",
        "screen_cid": "profile_screen",
        "screen_index": 1,
        "total_screens": 4
    }
}

// userEmailCollected
{
    "name": "user_email_collected",
    "meta": {
        "onboarding_id": "onboarding_123",
        "screen_cid": "profile_screen",
        "screen_index": 1,
        "total_screens": 4
    }
}

// onboardingCompleted
{
    "name": "onboarding_completed",
    "meta": {
        "onboarding_id": "onboarding_123",
        "screen_cid": "final_screen",
        "screen_index": 3,
        "total_screens": 4
    }
}
```
</Details>