---
title: "Process data from onboardings in iOS SDK"
description: "Save and use data from onboardings in your iOS app with Adapty SDK."
metadataTitle: "Onboardings | iOS SDK | Adapty Docs"
displayed_sidebar: sdkios
---
import Details from '@site/src/components/Details';
import ZoomImage from '@site/src/components/ZoomImage';

When your users respond to a quiz question or input their data into an input field, the `onStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, onStateUpdatedAction action: AdaptyOnboardingsStateUpdatedAction) {
    // Store user preferences or responses
    switch action.params {
    case .select(let params):
        // Handle single selection
    case .multiSelect(let params):
        // Handle multiple selections
    case .input(let params):
        // Handle text input
    case .datePicker(let params):
        // Handle date selection
    }
}
```

The `action` object contains:

| Parameter      | Description                                                                                                                                                                                                                                                                                     |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `elementId`    | A unique identifier for the input element. You can use it to associate questions with answers when saving them.                                                                                                                                                                                 |
| `params`       | The user's input data object containing type and value properties.                                                                                                                                                                                                                              |
| `params.type`  | The type of input element. Can be:<br/>• `"select"` - Single selection from options<br/>• `"multiSelect"` - Multiple selections from options<br/>• `"input"` - Text input field<br/>• `"datePicker"` - Date selection                                                                           |
| `params.value` | The value(s) selected or entered by the user. Structure depends on type:<br/>• `select`: Object with `id`, `value`, `label`<br/>• `multiSelect`: Array of objects with `id`, `value`, `label`<br/>• `input`: Object with `type`, `value`<br/>• `datePicker`: Object with `day`, `month`, `year` |

<Details>
<summary>Saved data examples (may differ in your implementation)</summary>

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

If you want to immediately link the input data with the user profile and avoid asking them twice for the same info, you need to [update the user profile](setting-user-attributes.md) with the input data when handling the action.

For example, you ask users to enter their name in the text field with the `name` ID, and you want to set this field's value as user's first name. Also, you ask them to enter their email in the `email` field. In your app code, it can look like this:

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, onStateUpdatedAction action: AdaptyOnboardingsStateUpdatedAction) {
    // Store user preferences or responses
    switch action.params {
    case .input(let params):
        // Handle text input
        let builder = AdaptyProfileParameters.Builder()
        
        // Map elementId to appropriate profile field
        switch action.elementId {
        case "name":
            builder.with(firstName: params.value.value)
        case "email":
            builder.with(email: params.value.value)
        }
        
        do {
            try await Adapty.updateProfile(params: builder.build())
        } catch {
            // handle the error
        }
}
```

### Customize paywalls based on answers

Using quizzes in onboardings, you can also customize paywalls you show users after they complete the onboarding.

For example, you can ask users about their experience with sport and show different CTAs and products to different user groups.

1. [Add a quiz](onboarding-quizzes.md) in the onboarding builder and assign meaningful IDs to its options.

<ZoomImage id="experience.webp" />

2. Handle the quiz responses based on their IDs and [set custom attributes](setting-user-attributes.md) for users.

```swift showLineNumbers
func onboardingController(_ controller: AdaptyOnboardingController, onStateUpdatedAction action: AdaptyOnboardingsStateUpdatedAction) {
    // Handle quiz responses and set custom attributes
    switch action.params {
    case .select(let params):
        // Handle quiz selection
        let builder = AdaptyProfileParameters.Builder()
        
        // Map quiz responses to custom attributes
        switch action.elementId {
        case "experience":
            // Set custom attribute 'experience' with the selected value (beginner, amateur, pro)
            try? builder.with(customAttribute: params.value.value, forKey: "experience")
        }
        
        do {
            try await Adapty.updateProfile(params: builder.build())
        } catch {
            // handle the error
        }
    }
}
```

3. [Create segments](segments.md) for each custom attribute value. 
4. Create a [placement](placements.md) and add [audiences](audience.md) for each segment you've created.
5. [Display a paywall](ios-paywalls.md) for the placement in your app code. If your onboarding has a button that opens a paywall, implement the paywall code as a [response to this button's action](ios-handling-onboarding-events#opening-a-paywall).