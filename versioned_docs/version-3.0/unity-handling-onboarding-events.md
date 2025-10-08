---
title: "Handle onboarding events in Unity SDK"
description: "Handle onboarding-related events in Unity using Adapty."
metadataTitle: "Handling Onboarding Events in Unity | Adapty Docs"
toc_max_heading_level: 4
keywords: ['onCloseAction', 'AdaptyOnboardingsCloseAction', 'onStateUpdatedAction', 'onPaywallAction', 'didFinishLoading', 'onAnalyticsEvent']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Before you start, ensure that:

1. You have installed [Adapty Unity SDK](sdk-installation-unity.md) 3.12.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

Onboardings configured with the builder generate events your app can respond to. Learn how to respond to these events below.

To control or monitor processes occurring on the onboarding screen within your Unity app, implement the `AdaptyOnboardingsEventsListener` interface.

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

Then, you can use this ID in your code and handle it as a custom action. For example, if a user taps a custom button, like **Login** or **Allow notifications**, the delegate method `OnboardingViewOnCustomAction` will be triggered with the `actionId` parameter being the **Action ID** from the builder. You can create your own IDs, like "allowNotifications".

```csharp showLineNumbers title="Unity"
public class OnboardingManager : MonoBehaviour, AdaptyOnboardingsEventsListener
{
    void Start()
    {
        Adapty.SetOnboardingsEventsListener(this);
    }

    public void OnboardingViewOnCustomAction(
        AdaptyUIOnboardingView view,
        AdaptyUIOnboardingMeta meta,
        string actionId
    )
    {
        if (actionId == "allowNotifications")
        {
            // Request notification permissions
        }
    }
    
    public void OnboardingViewDidFailWithError(
        AdaptyUIOnboardingView view,
        AdaptyError error
    )
    {
        // Handle errors
    }
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

```csharp showLineNumbers title="Unity"
public void OnboardingViewOnCloseAction(
    AdaptyUIOnboardingView view,
    AdaptyUIOnboardingMeta meta,
    string actionId
)
{
    view.Dismiss((error) => {
        if (error != null)
        {
            Debug.LogError($"Failed to dismiss onboarding: {error.Message}");
        }
    });
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

When your users respond to a quiz question or input their data into an input field, the `OnboardingViewOnStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```csharp showLineNumbers title="Unity"
public void OnboardingViewOnStateUpdatedAction(
    AdaptyUIOnboardingView view,
    AdaptyUIOnboardingMeta meta,
    string elementId,
    AdaptyOnboardingsStateUpdatedParams @params
)
{
    // Store user preferences or responses
    switch (@params)
    {
        case AdaptyOnboardingsSelectParams selectParams:
            // Handle single selection
            SaveUserPreference(elementId, selectParams.Value);
            break;
        case AdaptyOnboardingsMultiSelectParams multiSelectParams:
            // Handle multiple selections
            SaveUserPreferences(elementId, multiSelectParams.Params);
            break;
        case AdaptyOnboardingsInputParams inputParams:
            // Handle text input
            SaveUserInput(elementId, inputParams.Input.Value);
            break;
        case AdaptyOnboardingsDatePickerParams datePickerParams:
            // Handle date selection
            SaveUserDate(elementId, datePickerParams);
            break;
    }
}
```

:::note
If you want to save or process data, you need to implement the methods yourself.
:::

The `@params` object contains:
- `elementId`: A unique identifier for the input element. You can use it to associate questions with answers when saving them.
- `@params`: The user's input data, which can be one of the following types:
- `AdaptyOnboardingsSelectParams`: Single selection from a list of options.
- `AdaptyOnboardingsMultiSelectParams`: Multiple selections from a list of options.
- `AdaptyOnboardingsInputParams`: Text input from the user.
- `AdaptyOnboardingsDatePickerParams`: Date selected by the user.

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
Handle this event to open a paywall if you want to open it inside the onboarding. If you want to open a paywall after it is closed, there is a more straightforward way to do it – handle [`OnboardingViewOnCloseAction`](#closing-onboarding) and open a paywall without relying on the event data.
:::

If a user clicks a button that opens a paywall, you will get a button action ID that you [set up manually](get-paid-in-onboardings.md). The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID. This way, after the `OnboardingViewOnPaywallAction`, you can use the placement ID to get and open the paywall right away:

```csharp showLineNumbers title="Unity"
public void OnboardingViewOnPaywallAction(
    AdaptyUIOnboardingView view,
    AdaptyUIOnboardingMeta meta,
    string actionId
)
{
    // Get the paywall using the placement ID from the action
    Adapty.GetPaywall(
        actionId,
        (paywall, error) =>
        {
            if (error != null)
            {
                Debug.LogError($"Failed to get paywall: {error.Message}");
                return;
            }

            // Create paywall view parameters
            var parameters = new AdaptyUICreatePaywallViewParameters()
                .SetPreloadProducts(true)
                .SetLoadTimeout(new TimeSpan(0, 0, 3));

            // Create and present the paywall view
            AdaptyUI.CreatePaywallView(
                paywall,
                parameters,
                (paywallView, paywallError) =>
                {
                    if (paywallError != null)
                    {
                        Debug.LogError($"Failed to create paywall view: {paywallError.Message}");
                        return;
                    }

                    // Present the paywall
                    paywallView.Present((presentError) =>
                    {
                        if (presentError != null)
                        {
                            Debug.LogError($"Failed to present paywall: {presentError.Message}");
                        }
                    });
                }
            );
        }
    );
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

```csharp showLineNumbers title="Unity"
public void OnboardingViewDidFinishLoading(
    AdaptyUIOnboardingView view,
    AdaptyUIOnboardingMeta meta
)
{
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

The `OnboardingViewOnAnalyticsEvent` method is called when various analytics events occur during the onboarding flow. 

The `analyticsEvent` object can be one of the following types:
|Type | Description |
|------------|-------------|
| `AdaptyOnboardingsAnalyticsEventOnboardingStarted` | When the onboarding has been loaded |
| `AdaptyOnboardingsAnalyticsEventScreenPresented` | When any screen is shown |
| `AdaptyOnboardingsAnalyticsEventScreenCompleted` | When a screen is completed. Includes optional `ElementId` (identifier of the completed element) and optional `Reply` (response from the user). Triggered when users perform any action to exit the screen. |
| `AdaptyOnboardingsAnalyticsEventSecondScreenPresented` | When the second screen is shown |
| `AdaptyOnboardingsAnalyticsEventUserEmailCollected` | Triggered when the user's email is collected via the input field |
| `AdaptyOnboardingsAnalyticsEventOnboardingCompleted` | Triggered when a user reaches a screen with the `final` ID. If you need this event, [assign the `final` ID to the last screen](design-onboarding.md). |
| `AdaptyOnboardingsAnalyticsEventUnknown` | For any unrecognized event type. Includes `Name` (the name of the unknown event) and `meta` (additional metadata) |

Each event includes `meta` information containing:
| Field | Description |
|------------|-------------|
| `OnboardingId` | Unique identifier of the onboarding flow |
| `ScreenClientId` | Identifier of the current screen |
| `ScreenIndex` | Current screen's position in the flow |
| `ScreensTotal` | Total number of screens in the flow |

Here's an example of how you can use analytics events for tracking:

```csharp showLineNumbers title="Unity"
public void OnboardingViewOnAnalyticsEvent(
    AdaptyUIOnboardingView view,
    AdaptyUIOnboardingMeta meta,
    AdaptyOnboardingsAnalyticsEvent analyticsEvent
)
{
    switch (analyticsEvent)
    {
        case AdaptyOnboardingsAnalyticsEventOnboardingStarted:
            // Track onboarding start
            TrackEvent("onboarding_started", meta);
            break;
        case AdaptyOnboardingsAnalyticsEventScreenPresented:
            // Track screen presentation
            TrackEvent("screen_presented", meta);
            break;
        case AdaptyOnboardingsAnalyticsEventScreenCompleted screenCompleted:
            // Track screen completion with user response
            TrackEvent("screen_completed", meta, screenCompleted.ElementId, screenCompleted.Reply);
            break;
        case AdaptyOnboardingsAnalyticsEventOnboardingCompleted:
            // Track successful onboarding completion
            TrackEvent("onboarding_completed", meta);
            break;
        case AdaptyOnboardingsAnalyticsEventUnknown unknownEvent:
            // Handle unknown events
            TrackEvent(unknownEvent.Name, meta);
            break;
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

