---
title: "Process data from onboardings in Flutter SDK"
description: "Save and use data from onboardings in your Flutter app with Adapty SDK."
metadataTitle: "Onboardings | Flutter SDK | Adapty Docs"
---
import Details from '@site/src/components/Details';
import ZoomImage from '@site/src/components/ZoomImage';

When your users respond to a quiz question or input their data into an input field, the `onStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```dart
// Full-screen presentation
void onboardingViewOnStateUpdatedAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String elementId,
  AdaptyOnboardingsStateUpdatedParams params,
) {
  // Process data 
}

// Embedded widget
onStateUpdatedAction: (meta, elementId, params) {
  // Process data 
}
```

See the action format [here](https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/AdaptyUIOnboardingPlatformView/onStateUpdatedAction.html).

<Details>
<summary>Saved data examples (the format may differ in your implementation)</summary>

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

## Use cases

### Enrich user profiles with data

If you want to immediately link the input data with the user profile and avoid asking them twice for the same info, you need to [update the user profile](flutter-setting-user-attributes.md) with the input data when handling the action.

For example, you ask users to enter their name in the text field with the `name` ID, and you want to set this field's value as user's first name. Also, you ask them to enter their email in the `email` field. In your app code, it can look like this:

```dart showLineNumbers
// Full-screen presentation
void onboardingViewOnStateUpdatedAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String elementId,
  AdaptyOnboardingsStateUpdatedParams params,
) {
  // Store user preferences or responses
  if (params is AdaptyOnboardingsInputParams) {
    final builder = AdaptyProfileParametersBuilder();
    
    // Map elementId to appropriate profile field
    switch (elementId) {
      case 'name':
        if (params.input is AdaptyOnboardingsTextInput) {
          builder.setFirstName((params.input as AdaptyOnboardingsTextInput).value);
        }
        break;
      case 'email':
        if (params.input is AdaptyOnboardingsEmailInput) {
          builder.setEmail((params.input as AdaptyOnboardingsEmailInput).value);
        }
        break;
    }
    
    // Update profile
    Adapty().updateProfile(builder.build()).catchError((error) {
      // handle the error
    });
  }
}

// Embedded widget
onStateUpdatedAction: (meta, elementId, params) {
  // Store user preferences or responses
  if (params is AdaptyOnboardingsInputParams) {
    final builder = AdaptyProfileParametersBuilder();
    
    // Map elementId to appropriate profile field
    switch (elementId) {
      case 'name':
        if (params.input is AdaptyOnboardingsTextInput) {
          builder.setFirstName((params.input as AdaptyOnboardingsTextInput).value);
        }
        break;
      case 'email':
        if (params.input is AdaptyOnboardingsEmailInput) {
          builder.setEmail((params.input as AdaptyOnboardingsEmailInput).value);
        }
        break;
    }
    
    // Update profile
    Adapty().updateProfile(builder.build()).catchError((error) {
      // handle the error
    });
  }
}
```

### Customize paywalls based on answers

Using quizzes in onboardings, you can also customize paywalls you show users after they complete the onboarding.

For example, you can ask users about their experience with sport and show different CTAs and products to different user groups.

1. [Add a quiz](onboarding-quizzes.md) in the onboarding builder and assign meaningful IDs to its options.

<ZoomImage id="experience.webp" />

2. Handle the quiz responses based on their IDs and [set custom attributes](flutter-setting-user-attributes.md) for users.

```dart showLineNumbers
// Full-screen presentation
void onboardingViewOnStateUpdatedAction(
  AdaptyUIOnboardingView view,
  AdaptyUIOnboardingMeta meta,
  String elementId,
  AdaptyOnboardingsStateUpdatedParams params,
) {
  // Handle quiz responses and set custom attributes
  if (params is AdaptyOnboardingsSelectParams) {
    final builder = AdaptyProfileParametersBuilder();
    
    // Map quiz responses to custom attributes
    switch (elementId) {
      case 'experience':
        // Set custom attribute 'experience' with the selected value (beginner, amateur, pro)
        builder.setCustomStringAttribute(params.value, 'experience');
        break;
    }
    
    // Update profile
    Adapty().updateProfile(builder.build()).catchError((error) {
      // handle the error
    });
  }
}

// Embedded widget
onStateUpdatedAction: (meta, elementId, params) {
  // Handle quiz responses and set custom attributes
  if (params is AdaptyOnboardingsSelectParams) {
    final builder = AdaptyProfileParametersBuilder();
    
    // Map quiz responses to custom attributes
    switch (elementId) {
      case 'experience':
        // Set custom attribute 'experience' with the selected value (beginner, amateur, pro)
        builder.setCustomStringAttribute(params.value, 'experience');
        break;
    }
    
    // Update profile
    Adapty().updateProfile(builder.build()).catchError((error) {
      // handle the error
    });
  }
}
```

3. [Create segments](segments.md) for each custom attribute value.
4. Create a [placement](placements.md) and add [audiences](audience.md) for each segment you've created.
5. [Display a paywall](flutter-paywalls.md) for the placement in your app code. If your onboarding has a button that opens a paywall, implement the paywall code as a [response to this button's action](flutter-handling-onboarding-events#opening-a-paywall).