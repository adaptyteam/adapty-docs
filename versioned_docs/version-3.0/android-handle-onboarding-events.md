---
title: "Android - Handle onboarding events"
description: "Handle onboarding-related events in Android using Adapty."
metadataTitle: "Handling Onboarding Events in Android | Adapty Docs"
toc_max_heading_level: 4
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Before you start, ensure that:

1. You have installed [Adapty Android SDK](installation-of-adapty-sdks.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

Onboardings configured with the builder generate events your app can respond to. Learn how to respond to these events below.

To control or monitor processes occurring on the onboarding screen within your Android app, implement the `OnboardingsDelegate` interface.

### Custom actions

In the builder, you can add a **custom** action to a button and assign it an ID. Then, you can use this ID in your code and handle it as a custom action. 

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

For example, if a user taps a custom button, like **Login** or **Allow notifications**, the delegate method `onCustomAction` will be triggered with the action ID from the builder. You can create your own IDs, like "allowNotifications".

```kotlin showLineNumbers
class YourActivity : AppCompatActivity() {
    private val eventListener = object : OnboardingsDelegate {
        override fun onCustomAction(action: OnboardingsCustomAction) {
            when (action.actionId) {
                "allowNotifications" -> {
                    // Request notification permissions
                }
            }
        }
        
        override fun onError(error: OnboardingsError) {
            // Handle errors
        }
        
        // ... other required delegate methods
    }
}
```

### Closing onboarding

Onboarding is considered closed when a user taps a button with the **Close** action assigned. You need to manage what happens when a user closes the onboarding. For example:

```kotlin
override fun onCloseAction(action: OnboardingsCloseAction) {
    // Dismiss the onboarding screen
    finish()
}
```

### Opening a paywall

If a user clicks a button that opens a paywall, you will get a button action ID that you set up manually. 

The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID. This way, after the `OnboardingsOpenPaywallAction`, you can use the placement ID to get and open the paywall right away:

```kotlin
override fun onOpenPaywallAction(action: OnboardingsOpenPaywallAction) {
    // Get the paywall using the placement ID from the action
    Adapty.getPaywall(placementId = action.actionId) { result ->
        result.onSuccess { paywall ->
            // Get the paywall configuration
            AdaptyUI.getViewConfiguration(paywall) { configResult ->
                configResult.onSuccess { paywallConfig ->
                    // Create and present the paywall
                    val paywallController = AdaptyUI.getPaywallController(
                        activity = this,
                        viewConfig = paywallConfig,
                        eventListener = paywallEventListener
                    )
                    // Add the paywall view to your layout
                    binding.container.addView(paywallController)
                }
            }
        }
    }
}
```

### Finishing loading onboarding

When an onboarding finishes loading, this method will be invoked:

```kotlin
override fun onFinishLoading() {
    // Handle loading completion
}
```

### Updating field state

When your users respond to a quiz question or input their data into an input field, the `onStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```kotlin
override fun onStateUpdatedAction(action: OnboardingsStateUpdatedAction) {
    // Store user preferences or responses
    when (val params = action.params) {
        is OnboardingsStateUpdatedParams.Select -> {
            // Handle single selection
            saveUserPreference(elementId = action.elementId, value = params.value)
        }
        is OnboardingsStateUpdatedParams.MultiSelect -> {
            // Handle multiple selections
            saveUserPreferences(elementId = action.elementId, values = params.values)
        }
        is OnboardingsStateUpdatedParams.Input -> {
            // Handle text input
            saveUserInput(elementId = action.elementId, value = params.value)
        }
        is OnboardingsStateUpdatedParams.DatePicker -> {
            // Handle date selection
            saveUserDate(elementId = action.elementId, value = params.value)
        }
    }
}
```

:::note
This example suggests you implement custom methods for saving user data depending on the data type. These methods are not built into the Adapty SDK.
:::

The `action` object contains:
- `elementId`: A unique identifier for the input element. You can use it to associate questions with answers when saving them.
- `params`: The user's input data, which can be one of the following types:
    - `Select`: Single selection from a list of options.
    - `MultiSelect`: Multiple selections from a list of options.
    - `Input`: Text input from the user.
    - `DatePicker`: Date selected by the user.

### Analytics events

The `onAnalyticsEvent` method is called when various analytics events occur during the onboarding flow.

The `event` object can be one of the following types:
|Type | Description |
|------------|-------------|
| `OnboardingStarted` | When the onboarding has been loaded |
| `ScreenPresented` | When any screen is shown |
| `ScreenCompleted` | When a screen is completed. Includes optional `elementId` (identifier of the completed element) and optional `reply` (response from the user). Triggered when users perform any action to exit the screen. |
| `SecondScreenPresented` | When the second screen is shown |
| `UserEmailCollected` | Triggered when the user's email is collected via the input field |
| `OnboardingCompleted` | Triggered when a user reaches a screen with the `final` ID. If you need this event, assign the `final` ID to the last screen. |
| `Unknown` | For any unrecognized event type. Includes `name` (the name of the unknown event) and `meta` (additional metadata) |

Each event includes `meta` information containing:
| Field | Description |
|------------|-------------|
| `onboardingId` | Unique identifier of the onboarding flow |
| `screenClientId` | Identifier of the current screen |
| `screenIndex` | Current screen's position in the flow |
| `screensTotal` | Total number of screens in the flow |

Here's an example of how you can use analytics events for tracking:

```kotlin
override fun onAnalyticsEvent(event: OnboardingsAnalyticsEvent) {
    when (event) {
        is OnboardingsAnalyticsEvent.OnboardingStarted -> {
            // Track onboarding start
            trackEvent("onboarding_started", event.meta)
        }
        is OnboardingsAnalyticsEvent.ScreenPresented -> {
            // Track screen presentation
            trackEvent("screen_presented", event.meta)
        }
        is OnboardingsAnalyticsEvent.ScreenCompleted -> {
            // Track screen completion with user response
            trackEvent("screen_completed", event.meta, event.elementId, event.reply)
        }
        is OnboardingsAnalyticsEvent.OnboardingCompleted -> {
            // Track successful onboarding completion
            trackEvent("onboarding_completed", event.meta)
        }
        is OnboardingsAnalyticsEvent.Unknown -> {
            // Handle unknown events
            trackEvent(event.name, event.meta)
        }
        // Handle other cases as needed
    }
}
``` 