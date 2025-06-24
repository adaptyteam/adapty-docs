---
title: "React Native - Handle onboarding events"
description: "Handle onboarding-related events in React Native using Adapty."
metadataTitle: "Handling Onboarding Events in React Native | Adapty Docs"
toc_max_heading_level: 4
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Onboardings configured with the builder generate events your app can respond to. The way you handle these events depends on which presentation approach you're using:

- **Full-screen presentation**: Requires setting up event handlers that handle events for all onboarding views
- **Embedded widget**: Handles events through inline callback parameters directly in the widget

Before you start, ensure that:

1. You have installed [Adapty React Native SDK](installation-of-adapty-sdks.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

## Full-screen presentation events

### Set up event handlers

To handle events for full-screen onboardings, use the `view.registerEventHandlers` method:

```javascript showLineNumbers title="React Native"
import { createOnboardingView } from 'react-native-adapty/dist/ui';

const view = await createOnboardingView(onboarding);

const unsubscribe = view.registerEventHandlers({
  onAnalytics(event, meta) {
    // Track analytics events
  },
  onClose(actionId, meta) {
    // Handle close action
    view.dismiss();
    return true;
  },
  onCustom(actionId, meta) {
    // Handle custom actions
  },
  onPaywall(actionId, meta) {
    // Handle paywall actions
  },
  onStateUpdated(action, meta) {
    // Handle user input updates
  },
  onFinishedLoading(meta) {
    // Onboarding finished loading
  },
  onError(error) {
    // Handle loading errors
  },
});

try {
  await view.present();
} catch (error) {
  // handle the error
}
```

## Embedded widget events

When using `AdaptyOnboardingView`, you can handle events through inline callback parameters directly in the widget:

```javascript showLineNumbers title="React Native"
import { AdaptyOnboardingView } from 'react-native-adapty/dist/ui';

<AdaptyOnboardingView
  onboarding={onboarding}
  style={{ flex: 1 }}
  eventHandlers={{
    onAnalytics(event, meta) {
      // Track analytics events
    },
    onClose(actionId, meta) {
      // Handle close action
    },
    onCustom(actionId, meta) {
      // Handle custom actions
    },
    onPaywall(actionId, meta) {
      // Handle paywall actions
    },
    onStateUpdated(action, meta) {
      // Handle user input updates
    },
    onFinishedLoading(meta) {
      // Onboarding finished loading
    },
    onError(error) {
      // Handle loading errors
    },
  }}
/>
```

## Event types

The following sections describe the different types of events you can handle, regardless of which presentation approach you're using.

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

```javascript showLineNumbers title="React Native"
// Full-screen presentation
const unsubscribe = view.registerEventHandlers({
  onCustom(actionId, meta) {
    switch (actionId) {
      case 'login':
        login();
        break;
      case 'allow_notifications':
        allowNotifications();
        break;
    }
  },
});

// Embedded widget
<AdaptyOnboardingView
  onboarding={onboarding}
  eventHandlers={{
    onCustom(actionId, meta) {
      handleCustomAction(actionId);
    },
  }}
/>
```

### Finishing loading onboarding

When an onboarding finishes loading, this event will be triggered:

```javascript showLineNumbers title="React Native"
// Full-screen presentation
const unsubscribe = view.registerEventHandlers({
  onFinishedLoading(meta) {
    console.log('Onboarding loaded:', meta.onboardingId);
  },
});

// Embedded widget
<AdaptyOnboardingView
  onboarding={onboarding}
  eventHandlers={{
    onFinishedLoading(meta) {
      console.log('Onboarding loaded:', meta.onboardingId);
    },
  }}
/>
```

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

```javascript showLineNumbers title="React Native"
// Full-screen presentation
const unsubscribe = view.registerEventHandlers({
  onClose(actionId, meta) {
    await view.dismiss();
    return true;
  },
});

// Embedded widget
<AdaptyOnboardingView
  onboarding={onboarding}
  eventHandlers={{
    onClose(actionId, meta) {
      // Handle navigation back or dismiss the view
    },
  }}
/>
```

### Opening a paywall

:::tip
Handle this event to open a paywall if you want to open it inside the onboarding. If you want to open a paywall after it is closed, there is a more straightforward way to do it – handle the close action and open a paywall without relying on the event data.
:::

If a user clicks a button that opens a paywall, you will get a button action ID that you [set up manually](get-paid-in-onboardings.md). The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID:

```javascript showLineNumbers title="React Native"
// Full-screen presentation
const unsubscribe = view.registerEventHandlers({
  onPaywall(actionId, meta) {
    openPaywall(actionId);
  },
});

const openPaywall = async (actionId) => {
  // Implement your paywall opening logic here
};

// Embedded widget
<AdaptyOnboardingView
  onboarding={onboarding}
  eventHandlers={{
    onPaywall(actionId, meta) {
      openPaywall(actionId);
    },
  }}
/>
```

### Updating field state

When your users respond to a quiz question or input their data into an input field, the state update event will be triggered:

```javascript showLineNumbers title="React Native"
// Full-screen presentation
const unsubscribe = view.registerEventHandlers({
  onStateUpdated(action, meta) {
    saveUserResponse(action.elementId, action.params);
  },
});

// Embedded widget
<AdaptyOnboardingView
  onboarding={onboarding}
  eventHandlers={{
    onStateUpdated(action, meta) {
      saveUserResponse(action.elementId, action.params);
    },
  }}
/>
```

:::note
If you want to save or process data, you need to implement the methods yourself.
:::

The `action` object contains:
- `elementId`: A unique identifier for the input element. You can use it to associate questions with answers when saving them.
- `params`: The user's input data, which can be one of the following types:
  - `select`: Single selection from a list of options.
  - `multiSelect`: Multiple selections from a list of options.
  - `input`: Text input from the user.
  - `datePicker`: Date selected by the user.

### Tracking navigation

You receive an analytics event when various navigation-related events occur during the onboarding flow:

```javascript showLineNumbers title="React Native"
// Full-screen presentation
const unsubscribe = view.registerEventHandlers({
  onAnalytics(event, meta) {
    trackEvent(event.type, meta.onboardingId);
  },
});

// Embedded widget
<AdaptyOnboardingView
  onboarding={onboarding}
  eventHandlers={{
    onAnalytics(event, meta) {
      trackEvent(event.type, meta.onboardingId);
    },
  }}
/>
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