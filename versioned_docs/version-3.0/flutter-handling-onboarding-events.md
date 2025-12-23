---
title: "Handle onboarding events in Flutter SDK"
description: "Handle onboarding-related events in Flutter using Adapty."
metadataTitle: "Handling Onboarding Events in Flutter | Adapty Docs"
toc_max_heading_level: 4
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Onboardings configured with the builder generate events your app can respond to. The way you handle these events depends on which presentation approach you're using:

- **Full-screen presentation**: Requires setting up a global event observer that handles events for all onboarding views
- **Embedded widget**: Handles events through inline callback parameters directly in the widget

Before you start, ensure that:

1. You have installed [Adapty Flutter SDK](sdk-installation-flutter.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

## Full-screen presentation events

### Set up event observer

To handle events for full-screen onboardings, implement the `AdaptyUIOnboardingsEventsObserver` and set it before presenting:

```javascript showLineNumbers title="Flutter"
AdaptyUI().setOnboardingsEventsObserver(this);

try {
  await onboardingView.present();
} on AdaptyError catch (e) {
  // handle the error
} catch (e) {
  // handle the error
}
```

### Handle events

Implement these methods in your observer:

```javascript showLineNumbers title="Flutter"
void onboardingViewDidFinishLoading(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
) {
  // Onboarding finished loading
}

void onboardingViewDidFailWithError(
  AdaptyUIOnboardingView view,
  AdaptyError error,
) {
  // Handle loading errors
}

void onboardingViewOnCloseAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String actionId,
) {
  // Handle close action
  view.dismiss();
}

void onboardingViewOnPaywallAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String actionId,
) {
  // Dismiss onboarding before presenting paywall
  view.dismiss().then((_) {
    _openPaywall(actionId);
  });
}

void onboardingViewOnCustomAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String actionId,
) {
  // Handle custom actions
}

void onboardingViewOnStateUpdatedAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String elementId,
  AdaptyOnboardingsStateUpdatedParams params,
) {
  // Handle user input updates
}

void onboardingViewOnAnalyticsEvent(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  AdaptyOnboardingsAnalyticsEvent event,
) {
  // Track analytics events
}
```

## Embedded widget events

When using `AdaptyUIOnboardingPlatformView`, you can handle events through inline callback parameters directly in the widget. Note that events will be sent to both the widget callbacks and the global observer (if set up), but the global observer is optional:

```javascript showLineNumbers title="Flutter"
AdaptyUIOnboardingPlatformView(
  onboarding: onboarding,
  onDidFinishLoading: (meta) {
    // Onboarding finished loading
  },
  onDidFailWithError: (error) {
    // Handle loading errors
  },
  onCloseAction: (meta, actionId) {
    // Handle close action
  },
  onPaywallAction: (meta, actionId) {
    _openPaywall(actionId);
  },
  onCustomAction: (meta, actionId) {
    // Handle custom actions
  },
  onStateUpdatedAction: (meta, elementId, params) {
    // Handle user input updates
  },
  onAnalyticsEvent: (meta, event) {
    // Track analytics events
  },
)
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

Then, you can use this ID in your code and handle it as a custom action. For example, if a user taps a custom button, like **Login** or **Allow notifications**, the delegate method `onboardingController` will be triggered with the `.custom(id:)` case and the `actionId` parameter is the **Action ID** from the builder. You can create your own IDs, like "allowNotifications".

```javascript
// Full-screen presentation
void onboardingViewOnCustomAction(
    AdaptyUIOnboardingView view,
    AdaptyUIOnboardingMeta meta,
    String actionId,
) {
    switch (actionId) {
        case 'login':
            _login();
            break;
        case 'allow_notifications':
            _allowNotifications();
            break;
    }
}

// Embedded widget
onCustomAction: (meta, actionId) {
    _handleCustomAction(actionId);
}
```

<Details>
<summary>Event example (Click to expand)</summary>

```json
{
  "actionId": "allowNotifications",
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

```javascript showLineNumbers title="Flutter"
// Full-screen presentation
void onboardingViewDidFinishLoading(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
) {
  print('Onboarding loaded: ${meta.onboardingId}');
}

// Embedded widget
onDidFinishLoading: (meta) {
  print('Onboarding loaded: ${meta.onboardingId}');
}
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

```javascript showLineNumbers title="Flutter"
// Full-screen presentation
void onboardingViewOnCloseAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String actionId,
) {
  await view.dismiss();
}

// Embedded widget
onCloseAction: (meta, actionId) {
  Navigator.of(context).pop();
}
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

If a user clicks a button that opens a paywall, you will get a button action ID that you [set up manually](get-paid-in-onboardings.md). The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID:

Note that, for iOS, only one view (paywall or onboarding) can be displayed on screen at a time. If you present a paywall on top of an onboarding, you cannot programmatically control the onboarding in the background. Attempting to dismiss the onboarding will close the paywall instead, leaving the onboarding visible. To avoid this, always dismiss the onboarding view before presenting the paywall.

```javascript showLineNumbers title="Flutter"
// Full-screen presentation
void onboardingViewOnPaywallAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String actionId,
) {
  // Dismiss onboarding before presenting paywall
  view.dismiss().then((_) {
    _openPaywall(actionId);
  });
}

Future<void> _openPaywall(String actionId) async {
  // Implement your paywall opening logic here
}

// Embedded widget
onPaywallAction: (meta, actionId) {
  _openPaywall(actionId);
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

```javascript showLineNumbers title="Flutter"
// Full-screen presentation
void onboardingViewOnAnalyticsEvent(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  AdaptyOnboardingsAnalyticsEvent event,
) {
  trackEvent(event.type, meta.onboardingId);
}

// Embedded widget
onAnalyticsEvent: (meta, event) {
  trackEvent(event.type, meta.onboardingId);
}
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