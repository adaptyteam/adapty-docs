---
title: "iOS - Handle onboarding events"
description: "Handle onboarding-related events in iOS using Adapty."
metadataTitle: "Handling Onboarding Events in iOS | Adapty Docs"
toc_max_heading_level: 4
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Onboardings configured with the builder generate events your app can respond to. Learn how to respond to these events below.

## Handle events in Swift

To control or monitor processes occurring on the onboarding screen within your mobile app, implement the `AdaptyOnboardingControllerDelegate` methods.

### Custom actions

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

Then, you can use this ID in your code and handle it as a custom action. For example, if a user taps a custom button, like **Login** or **Allow notifications**, the delegate method `onboardingController` will be triggered with the `.custom(id:)` case and the `id` parameter is the **Action ID** from the builder. You can create your own IDs, like "allowNotifications".

```swift showLineNumbers    
func onboardingController(_ controller: AdaptyOnboardingController, onCustomAction action: AdaptyOnboardingsCustomAction) {
    if action.id == "allowNotifications" {
        // Request notification permissions
    }
}
    
func onboardingController(_ controller: AdaptyOnboardingController, didFailWithError error: AdaptyUIError) {
    // Handle errors
}
```

### Closing onboarding

Onboarding is considered closed when a user taps a button with the **Close** action assigned.

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

You need to manage what happens when a user closes the onboarding. For example:

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, onCloseAction action: AdaptyOnboardingsCloseAction) {
    controller.dismiss(animated: true)
}
```

### Opening a paywall

If a user clicks a button that opens a paywall, this method will be invoked:

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

### Finishing loading onboarding

When an onboarding finishes loading, this method will be invoked:

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, didFinishLoading action: OnboardingsDidFinishLoadingAction) {
    // Handle loading completion
}
```

### Updating field state

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
This example suggests you implement custom methods for saving user data depending on the data type. These methods are not built into the Adapty SDK.
:::

The `action` object contains:
    - `elementId`: A unique identifier for the input element. You can use it to associate questions with answers when saving them.
    - `params`: The user's input data, which can be one of the following types:
        - `select`: Single selection from a list of options.
        - `multiSelect`: Multiple selections from a list of options.
        - `input`: Text input from the user.
        - `datePicker`: Date selected by the user.

### Analytics events 

The `onAnalyticsEvent` method is called when various analytics events occur during the onboarding flow. 

The `event` object can be one of the following types:
|Type | Description |
|------------|-------------|
| `onboardingStarted` | When the onboarding flow begins |
| `screenPresented` | When a screen is shown |
| `screenCompleted` | When a screen is completed. Includes optional `elementId` (identifier of the completed element) and optional `reply` (response from the user) |
| `secondScreenPresented` | When the second screen is shown |
| `registrationScreenPresented` | When the registration screen is shown |
| `productsScreenPresented` | When the products screen is shown |
| `userEmailCollected` | Triggered when user's email is collected |
| `onboardingCompleted` | Triggered when the entire onboarding flow is completed |
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