---
title: "Process data from onboardings in Android SDK"
description: "Save and use data from onboardings in your Android app with Adapty SDK."
metadataTitle: "Onboardings | Android SDK | Adapty Docs"
---
import Details from '@site/src/components/Details';
import ZoomImage from '@site/src/components/ZoomImage';

When your users respond to a quiz question or input their data into an input field, the `onStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```kotlin
override fun onStateUpdatedAction(action: AdaptyOnboardingStateUpdatedAction, context: Context) {
    // Store user preferences or responses
    when (val params = action.params) {
        is AdaptyOnboardingStateUpdatedParams.Select -> {
            // Handle single selection
        }
        is AdaptyOnboardingStateUpdatedParams.MultiSelect -> {
            // Handle multiple selections
        }
        is AdaptyOnboardingStateUpdatedParams.Input -> {
            // Handle text input
        }
        is AdaptyOnboardingStateUpdatedParams.DatePicker -> {
            // Handle date selection
        }
    }
}
```

See the action format [here](https://android.adapty.io/adapty-ui/com.adapty.ui.onboardings.actions/-adapty-onboarding-state-updated-action/).

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

If you want to immediately link the input data with the user profile and avoid asking them twice for the same info, you need to [update the user profile](android-setting-user-attributes.md) with the input data when handling the action.

For example, you ask users to enter their name in the text field with the `name` ID, and you want to set this field's value as user's first name. Also, you ask them to enter their email in the `email` field. In your app code, it can look like this:

```kotlin showLineNumbers
override fun onStateUpdatedAction(action: AdaptyOnboardingStateUpdatedAction, context: Context) {
    // Store user preferences or responses
    when (val params = action.params) {
        is AdaptyOnboardingStateUpdatedParams.Input -> {
            // Handle text input
            val builder = AdaptyProfileParameters.Builder()
            
            // Map elementId to appropriate profile field
            when (action.elementId) {
                "name" -> {
                    when (val inputParams = params.params) {
                        is AdaptyOnboardingInputParams.Text -> {
                            builder.withFirstName(inputParams.value)
                        }
                    }
                }
                "email" -> {
                    when (val inputParams = params.params) {
                        is AdaptyOnboardingInputParams.Email -> {
                            builder.withEmail(inputParams.value)
                        }
                    }
                }
            }
            
            Adapty.updateProfile(builder.build()) { error ->
                if (error != null) {
                    // handle the error
                }
            }
        }
    }
}
```

### Customize paywalls based on answers

Using quizzes in onboardings, you can also customize paywalls you show users after they complete the onboarding.

For example, you can ask users about their experience with sport and show different CTAs and products to different user groups.

1. [Add a quiz](onboarding-quizzes.md) in the onboarding builder and assign meaningful IDs to its options.

<ZoomImage id="experience.webp" />

2. Handle the quiz responses based on their IDs and [set custom attributes](android-setting-user-attributes.md) for users.

```kotlin showLineNumbers
override fun onStateUpdatedAction(action: AdaptyOnboardingStateUpdatedAction, context: Context) {
    // Handle quiz responses and set custom attributes
    when (val params = action.params) {
        is AdaptyOnboardingStateUpdatedParams.Select -> {
            // Handle quiz selection
            val builder = AdaptyProfileParameters.Builder()
            
            // Map quiz responses to custom attributes
            when (action.elementId) {
                "experience" -> {
                    // Set custom attribute 'experience' with the selected value (beginner, amateur, pro)
                    builder.withCustomAttribute("experience", params.params.value)
                }
            }
            
            Adapty.updateProfile(builder.build()) { error ->
                if (error != null) {
                    // handle the error
                }
            }
        }
    }
}
```

3. [Create segments](segments.md) for each custom attribute value.
4. Create a [placement](placements.md) and add [audiences](audience.md) for each segment you've created.
5. [Display a paywall](android-paywalls.md) for the placement in your app code. If your onboarding has a button that opens a paywall, implement the paywall code as a [response to this button's action](android-handle-onboarding-events#opening-a-paywall).