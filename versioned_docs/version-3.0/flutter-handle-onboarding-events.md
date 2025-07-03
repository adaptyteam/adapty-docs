---
title: "Flutter - Handle onboarding events"
description: "Handle onboarding-related events in Flutter using Adapty."
metadataTitle: "Handling Onboarding Events in Flutter | Adapty Docs"
toc_max_heading_level: 4
keywords: ['onCustomAction', 'onCloseAction', 'onStateUpdatedAction', 'onOpenPaywallAction', 'onFinishLoading', 'onAnalyticsEvent', 'AdaptyOnboardingCustomAction']
displayed_sidebar: sdkflutter
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Before you start, ensure that:

1. You have installed [Adapty Flutter SDK](sdk-installation-flutter.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

Onboardings configured with the builder generate events your Flutter app can respond to. Learn how to respond to these events below.

To control or monitor processes occurring on the onboarding screen within your Flutter app, implement the `AdaptyOnboardingEventListener` interface.

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

```dart showLineNumbers
class YourWidget extends StatefulWidget {
  @override
  _YourWidgetState createState() => _YourWidgetState();
}

class _YourWidgetState extends State<YourWidget> {
  late AdaptyOnboardingEventListener eventListener;

  @override
  void initState() {
    super.initState();
    eventListener = AdaptyOnboardingEventListener(
      onCustomAction: (action, context) {
        switch (action.actionId) {
          case "allowNotifications":
            // Request notification permissions
            break;
        }
      },
      onError: (error, context) {
        // Handle errors
      },
      // ... other required delegate methods
    );
  }
}
```

### Closing onboarding

Onboarding is considered closed when a user taps a button with the **Close** action assigned. You need to manage what happens when a user closes the onboarding. For example:

:::important
You need to manage what happens when a user closes the onboarding. For instance, you need to stop displaying the onboarding itself.
:::

For example:

```dart
onCloseAction: (action, context) {
  // Dismiss the onboarding screen
  Navigator.of(context).pop();
}
```

### Updating field state

When your users respond to a quiz question or input their data into an input field, the `onStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```dart
onStateUpdatedAction: (action, context) {
  // Store user preferences or responses
  switch (action.params.runtimeType) {
    case AdaptyOnboardingStateUpdatedParamsSelect:
      // Handle single selection
      saveUserPreference(elementId: action.elementId, value: action.params.value);
      break;
    case AdaptyOnboardingStateUpdatedParamsMultiSelect:
      // Handle multiple selections
      saveUserPreferences(elementId: action.elementId, values: action.params.map((e) => e.value));
      break;
    case AdaptyOnboardingStateUpdatedParamsInput:
      // Handle text input
      saveUserInput(elementId: action.elementId, value: action.params.value);
      break;
    case AdaptyOnboardingStateUpdatedParamsDatePicker:
      // Handle date selection
      saveUserDate(elementId: action.elementId, value: "${action.params.month}-${action.params.day}-${action.params.year}");
      break;
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
```

</Details>