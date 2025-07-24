---
title: "iOS - Handle onboarding events"
description: "Handle onboarding-related events in iOS using Adapty."
metadataTitle: "Handling Onboarding Events in iOS | Adapty Docs"
toc_max_heading_level: 4
keywords: ['onCloseAction', 'AdaptyOnboardingsCloseAction', 'onStateUpdatedAction', 'onPaywallAction', 'didFinishLoading', 'onAnalyticsEvent']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Onboardings configured with the builder generate events your app can respond to. Learn how to respond to these events below.

To control or monitor processes occurring on the onboarding screen within your mobile app, implement the `AdaptyOnboardingControllerDelegate` methods.

## Custom actions

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

```swift showLineNumbers    
func onboardingController(_ controller: AdaptyOnboardingController, onCustomAction action: AdaptyOnboardingsCustomAction) {
    if action.actionId == "allowNotifications" {
        // Request notification permissions
    }
}
    
func onboardingController(_ controller: AdaptyOnboardingController, didFailWithError error: AdaptyUIError) {
    // Handle errors
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

## Closing onboarding

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
For example:

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, onCloseAction action: AdaptyOnboardingsCloseAction) {
    controller.dismiss(animated: true)
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

## Updating field state

When your users respond to a quiz question or input their data into an input field, the `onStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, onStateUpdatedAction action: AdaptyOnboardingsStateUpdatedAction) {
    // Store user preferences or responses
    switch action.params {
    case .select(let params):
        // Handle single selection
        saveUserPreference(elementId: action.elementId, value: params)
    case .multiSelect(let params):
        // Handle multiple selections
        saveUserPreferences(elementId: action.elementId, values: params)
    case .input(let params):
        // Handle text input
        saveUserInput(elementId: action.elementId, value: params)
    case .datePicker(let params):
        // Handle date selection
        saveUserDate(elementId: action.elementId, value: params)
    }
}
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

<Details>
<summary>Saved data examples (Click to expand)</summary>

```javascript
// Example of a saved select action
{
    "elementId": "preference_selector",
    "meta": {
        "onboardingId": "onboarding_123",
        "screenClientId": "preferences_screen",
        "screenIndex": 1,
        "screensTotal": 3
    },
    "params": {
        "type": "select",
        "value": {
            "id": "option_1",
            "value": "premium",
            "label": "Premium Plan"
        }
    }
}

// Example of a saved multi-select action
{
    "elementId": "interests_selector",
    "meta": {
        "onboardingId": "onboarding_123",
        "screenClientId": "interests_screen",
        "screenIndex": 2,
        "screensTotal": 3
    },
    "params": {
        "type": "multiSelect",
        "value": [
            {
                "id": "interest_1",
                "value": "sports",
                "label": "Sports"
            },
            {
                "id": "interest_2",
                "value": "music",
                "label": "Music"
            }
        ]
    }
}

// Example of a saved input action
{
    "elementId": "name_input",
    "meta": {
        "onboardingId": "onboarding_123",
        "screenClientId": "profile_screen",
        "screenIndex": 0,
        "screensTotal": 3
    },
    "params": {
        "type": "input",
        "value": {
            "type": "text",
            "value": "John Doe"
        }
    }
}

// Example of a saved date picker action
{
    "elementId": "birthday_picker",
    "meta": {
        "onboardingId": "onboarding_123",
        "screenClientId": "profile_screen",
        "screenIndex": 0,
        "screensTotal": 3
    },
"params": {
    "type": "datePicker",
    "value": {
        "day": 15,
        "month": 6,
        "year": 1990
        }
    }
}
```
</Details>

## Opening a paywall

:::tip
Handle this event to open a paywall if you want to open it inside the onboarding. If you want to open a paywall after it is closed, there is a more straightforward way to do it – handle [`AdaptyOnboardingsCloseAction`](#closing-onboarding) and open a paywall without relying on the event data.
:::

If a user clicks a button that opens a paywall, you will get a button action ID that you [set up manually](get-paid-in-onboardings.md). The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID. This way, after the `AdaptyOnboardingsOpenPaywallAction`, you can use the placement ID to get and open the paywall right away:

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, onPaywallAction action: AdaptyOnboardingsOpenPaywallAction) {
    Task {
        do {
            // Get the paywall using the placement ID from the action
            let paywall = try await Adapty.getPaywall(placementId: action.actionId)
            
            // Get the paywall configuration
            let paywallConfig = try await AdaptyUI.getPaywallConfiguration(
                forPaywall: paywall
            )
            
            // Create and present the paywall controller
            let paywallController = try AdaptyUI.paywallController(
                with: paywallConfig,
                delegate: self
            )
            
            // Present the paywall
            controller.present(paywallController, animated: true)
        } catch {
            // Handle any errors that occur during paywall loading
            print("Failed to present paywall: \(error)")
        }
    }
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

## Finishing loading onboarding

When an onboarding finishes loading, this method will be invoked:

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, didFinishLoading action: OnboardingsDidFinishLoadingAction) {
    // Handle loading completion
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

## Tracking navigation

The `onAnalyticsEvent` method is called when various analytics events occur during the onboarding flow. 

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



Here's an example of how you can use analytics events for tracking:

```swift
func onboardingController(_ controller: AdaptyOnboardingController, onAnalyticsEvent event: AdaptyOnboardingsAnalyticsEvent) {
    switch event {
    case .onboardingStarted(let meta):
        // Track onboarding start
        trackEvent("onboarding_started", meta: meta)
    case .screenPresented(let meta):
        // Track screen presentation
        trackEvent("screen_presented", meta: meta)
    case .screenCompleted(let meta, let elementId, let reply):
        // Track screen completion with user response
        trackEvent("screen_completed", meta: meta, elementId: elementId, reply: reply)
    case .onboardingCompleted(let meta):
        // Track successful onboarding completion
        trackEvent("onboarding_completed", meta: meta)
    case .unknown(let meta, let name):
        // Handle unknown events
        trackEvent(name, meta: meta)
    // Handle other cases as needed
    }
}
```

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