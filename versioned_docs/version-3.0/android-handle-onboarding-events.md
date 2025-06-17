---
title: "Android - Handle onboarding events"
description: "Handle onboarding-related events in Android using Adapty."
metadataTitle: "Handling Onboarding Events in Android | Adapty Docs"
toc_max_heading_level: 4
keywords: ['onCustomAction', 'onCloseAction', 'onStateUpdatedAction', 'onOpenPaywallAction', 'onFinishLoading', 'onAnalyticsEvent', 'AdaptyOnboardingCustomAction']
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Before you start, ensure that:

1. You have installed [Adapty Android SDK](installation-of-adapty-sdks.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

Onboardings configured with the builder generate events your app can respond to. Learn how to respond to these events below.

To control or monitor processes occurring on the onboarding screen within your Android app, implement the `AdaptyOnboardingEventListener` interface.

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
    private val eventListener = object : AdaptyOnboardingEventListener {
        override fun onCustomAction(action: AdaptyOnboardingCustomAction, context: Context) {
            when (action.actionId) {
                "allowNotifications" -> {
                    // Request notification permissions
                }
            }
        }
        
        override fun onError(error: AdaptyOnboardingError, context: Context) {
            // Handle errors
        }
        
        // ... other required delegate methods
    }
}
```

### Closing onboarding

Onboarding is considered closed when a user taps a button with the **Close** action assigned. You need to manage what happens when a user closes the onboarding. For example:

:::important
You need to manage what happens when a user closes the onboarding. For instance, you need to stop displaying the onboarding itself.
:::

For example:

```kotlin
override fun onCloseAction(action: AdaptyOnboardingCloseAction, context: Context) {
    // Dismiss the onboarding screen
    (context as? Activity)?.onBackPressed()
}
```

### Updating field state

When your users respond to a quiz question or input their data into an input field, the `onStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```kotlin
override fun onStateUpdatedAction(action: AdaptyOnboardingStateUpdatedAction, context: Context) {
    // Store user preferences or responses
    when (val params = action.params) {
        is AdaptyOnboardingStateUpdatedParams.Select -> {
            // Handle single selection
            saveUserPreference(elementId = action.elementId, value = params.value)
        }
        is AdaptyOnboardingStateUpdatedParams.MultiSelect -> {
            // Handle multiple selections
            saveUserPreferences(elementId = action.elementId, values = params.map { it.value })
        }
        is AdaptyOnboardingStateUpdatedParams.Input -> {
            // Handle text input
            saveUserInput(elementId = action.elementId, value = params.value)
        }
        is AdaptyOnboardingStateUpdatedParams.DatePicker -> {
            // Handle date selection
            saveUserDate(elementId = action.elementId, value = "${params.month}-${params.day}-${params.year}")
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

<Details>
<summary>Saved data examples (Click to expand)</summary>

```
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

### Opening a paywall

:::tip
Handle this event to open a paywall if you want to open it inside the onboarding. If you want to open a paywall after it is closed, there is a more straightforward way to do it – handle [`AdaptyOnboardingCloseAction`](#closing-onboarding) and open a paywall without relying on the event data.
:::

If a user clicks a button that opens a paywall, you will get a button action ID that you [set up manually](get-paid-in-onboardings.md). The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID. This way, after the `AdaptyOnboardingOpenPaywallAction`, you can use the placement ID to get and open the paywall right away:

```kotlin
override fun onOpenPaywallAction(action: AdaptyOnboardingOpenPaywallAction, context: Context) {
    // Get the paywall using the placement ID from the action
    Adapty.getPaywall(placementId = action.actionId) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val paywall = result.value
                // Get the paywall configuration
                AdaptyUI.getViewConfiguration(paywall) { result ->
                    when(result) {
                        is AdaptyResult.Success -> {
                            val paywallConfig = result.value
                            // Create and present the paywall
                            val paywallView = AdaptyUI.getPaywallView(
                                activity = this,
                                viewConfig = paywallConfig,
                                products,
                                eventListener = paywallEventListener
                            )
                            // Add the paywall view to your layout
                            binding.container.addView(paywallView)
                        }
                        is AdaptyResult.Error -> {
                            val error = result.error
                            // handle the error
                        }
                    }
                }
            is AdaptyResult.Error -> {
                val error = result.error
                // handle the error
            }        
        }
    }
}
```

### Finishing loading onboarding

When an onboarding finishes loading, this method will be invoked:

```kotlin
override fun onFinishLoading(context: Context) {
    // Handle loading completion
}
```

### Navigation events

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
| `totalScreens` | Total number of screens in the flow |

Here's an example of how you can use analytics events for tracking:

```kotlin
override fun onAnalyticsEvent(event: AdaptyOnboardingAnalyticsEvent, context: Context) {
    when (event) {
        is AdaptyOnboardingAnalyticsEvent.OnboardingStarted -> {
            // Track onboarding start
            trackEvent("onboarding_started", event.meta)
        }
        is AdaptyOnboardingAnalyticsEvent.ScreenPresented -> {
            // Track screen presentation
            trackEvent("screen_presented", event.meta)
        }
        is AdaptyOnboardingAnalyticsEvent.ScreenCompleted -> {
            // Track screen completion with user response
            trackEvent("screen_completed", event.meta, event.elementId, event.reply)
        }
        is AdaptyOnboardingAnalyticsEvent.OnboardingCompleted -> {
            // Track successful onboarding completion
            trackEvent("onboarding_completed", event.meta)
        }
        is AdaptyOnboardingAnalyticsEvent.Unknown -> {
            // Handle unknown events
            trackEvent(event.name, event.meta)
        }
        // Handle other cases as needed
    }
}
``` 