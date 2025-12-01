---
title: "Handle onboarding events in React Native SDK"
description: "Handle onboarding-related events in React Native using Adapty."
metadataTitle: "Handling Onboarding Events in React Native | Adapty Docs"
toc_max_heading_level: 4
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Onboardings configured with the builder generate events your app can respond to. The way you handle these events depends on which presentation approach you're using:

- **Modal presentation**: Requires setting up event handlers that handle events for all onboarding views
- **React component**: Handles events through inline callback parameters directly in the widget

Before you start, ensure that:

1. You have installed [Adapty React Native SDK](sdk-installation-reactnative.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

## Modal presentation events

### Set up event handlers

To handle events for modal presentation, use the event handlers method:

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>
```javascript showLineNumbers title="React Native"
import { createOnboardingView } from 'react-native-adapty';

const view = await createOnboardingView(onboarding);

const unsubscribe = view.setEventHandlers({
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
</TabItem>

<TabItem value="old" label="SDK version < 3.14">
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
</TabItem>
</Tabs>

## React component events

When using `AdaptyOnboardingView`, you can handle events through inline callback parameters directly in the widget:

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>

```typescript showLineNumbers title="React Native (TSX)"
import React, { useCallback } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const onAnalytics = useCallback<OnboardingEventHandlers['onAnalytics']>((event, meta) => {}, []);
  const onClose = useCallback<OnboardingEventHandlers['onClose']>((actionId, meta) => {}, []);
  const onCustom = useCallback<OnboardingEventHandlers['onCustom']>((actionId, meta) => {}, []);
  const onPaywall = useCallback<OnboardingEventHandlers['onPaywall']>((actionId, meta) => {}, []);
  const onStateUpdated = useCallback<OnboardingEventHandlers['onStateUpdated']>((action, meta) => {}, []);
  const onFinishedLoading = useCallback<OnboardingEventHandlers['onFinishedLoading']>((meta) => {}, []);
  const onError = useCallback<OnboardingEventHandlers['onError']>((error) => {}, []);

  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={styles.container}
      onAnalytics={onAnalytics}
      onClose={onClose}
      onCustom={onCustom}
      onPaywall={onPaywall}
      onStateUpdated={onStateUpdated}
      onFinishedLoading={onFinishedLoading}
      onError={onError}
    />
  );
}
```

</TabItem>

<TabItem value="old" label="SDK version < 3.14">

```javascript showLineNumbers title="React Native"
import React from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  return (
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
  );
}
```

</TabItem>
</Tabs>

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

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.setEventHandlers({
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

// React component
import React, { useCallback } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const onCustom = useCallback<OnboardingEventHandlers['onCustom']>((actionId, meta) => {
    switch (actionId) {
      case 'login':
        login();
        break;
      case 'allow_notifications':
        allowNotifications();
        break;
    }
  }, []);

  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={styles.container}
      onCustom={onCustom}
    />
  );
}
```
</TabItem>

<TabItem value="old" label="SDK version < 3.14">
```javascript showLineNumbers title="React Native"
// Modal presentation
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

// React component
import React from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty/dist/ui';

function MyOnboarding({ onboarding }) {
  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      eventHandlers={{
        onCustom(actionId, meta) {
          handleCustomAction(actionId);
        },
      }}
    />
  );
}
```
</TabItem>
</Tabs>

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

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.setEventHandlers({
  onFinishedLoading(meta) {
    console.log('Onboarding loaded:', meta.onboardingId);
  },
});

// React component
import React, { useCallback } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const onFinishedLoading = useCallback<OnboardingEventHandlers['onFinishedLoading']>((meta) => {
    console.log('Onboarding loaded:', meta.onboardingId);
  }, []);

  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={styles.container}
      onFinishedLoading={onFinishedLoading}
    />
  );
}
```
</TabItem>

<TabItem value="old" label="SDK version < 3.14">
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.registerEventHandlers({
  onFinishedLoading(meta) {
    console.log('Onboarding loaded:', meta.onboardingId);
  },
});

// React component
import React from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty/dist/ui';

function MyOnboarding({ onboarding }) {
  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      eventHandlers={{
        onFinishedLoading(meta) {
          console.log('Onboarding loaded:', meta.onboardingId);
        },
      }}
    />
  );
}
```
</TabItem>
</Tabs>

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

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.setEventHandlers({
  onClose(actionId, meta) {
    await view.dismiss();
    return true;
  },
});

// React component
import React, { useCallback } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const onClose = useCallback<OnboardingEventHandlers['onClose']>((actionId, meta) => {
    navigation.goBack();  
  }, [navigation]);

  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={styles.container}
      onClose={onClose}
    />
  );
}
```
</TabItem>

<TabItem value="old" label="SDK version < 3.14">
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.registerEventHandlers({
  onClose(actionId, meta) {
    await view.dismiss();
    return true;
  },
});

// React component
import React from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty/dist/ui';

function MyOnboarding({ onboarding }) {
  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      eventHandlers={{
        onClose(actionId, meta) {
          // Handle navigation back or dismiss the view
        },
      }}
    />
  );
}
```
</TabItem>
</Tabs>

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

If a user clicks a button that opens a paywall, you will get a button action ID that you [set up manually](get-paid-in-onboardings.md). The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID:

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.setEventHandlers({
  onPaywall(actionId, meta) {
    openPaywall(actionId);
  },
});

const openPaywall = async (actionId) => {
  // Implement your paywall opening logic here
};

// React component
import React, { useCallback } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const onPaywall = useCallback<OnboardingEventHandlers['onPaywall']>((actionId, meta) => {
    openPaywall(actionId);
  }, []);

  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={styles.container}
      onPaywall={onPaywall}
    />
  );
}
```
</TabItem>

<TabItem value="old" label="SDK version < 3.14">
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.registerEventHandlers({
  onPaywall(actionId, meta) {
    openPaywall(actionId);
  },
});

const openPaywall = async (actionId) => {
  // Implement your paywall opening logic here
};

// React component
import React from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty/dist/ui';

function MyOnboarding({ onboarding }) {
  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      eventHandlers={{
        onPaywall(actionId, meta) {
          openPaywall(actionId);
        },
      }}
    />
  );
}
```
</TabItem>
</Tabs>

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

<Tabs groupId="version" queryString>
<TabItem value="new" label="SDK version 3.14 or later" default>
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.setEventHandlers({
  onAnalytics(event, meta) {
    trackEvent(event.type, meta.onboardingId);
  },
});

// React component
import React, { useCallback } from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty';
import type { OnboardingEventHandlers } from 'react-native-adapty';

function MyOnboarding({ onboarding }) {
  const onAnalytics = useCallback<OnboardingEventHandlers['onAnalytics']>((event, meta) => {
    trackEvent(event.type, meta.onboardingId);
  }, []);

  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      style={styles.container}
      onAnalytics={onAnalytics}
    />
  );
}
```
</TabItem>

<TabItem value="old" label="SDK version < 3.14">
```javascript showLineNumbers title="React Native"
// Modal presentation
const unsubscribe = view.registerEventHandlers({
  onAnalytics(event, meta) {
    trackEvent(event.type, meta.onboardingId);
  },
});

// React component
import React from 'react';
import { AdaptyOnboardingView } from 'react-native-adapty/dist/ui';

function MyOnboarding({ onboarding }) {
  return (
    <AdaptyOnboardingView
      onboarding={onboarding}
      eventHandlers={{
        onAnalytics(event, meta) {
          trackEvent(event.type, meta.onboardingId);
        },
      }}
    />
  );
}
```
</TabItem>
</Tabs>

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