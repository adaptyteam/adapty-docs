---
title: "Process data from onboardings in Kotlin Multiplatform SDK"
description: "Save and use data from onboardings in your Kotlin Multiplatform app with Adapty SDK."
metadataTitle: "Onboardings | Kotlin Multiplatform SDK | Adapty Docs"
---
import Details from '@site/src/components/Details';
import ZoomImage from '@site/src/components/ZoomImage';

When your users respond to a quiz question or input their data into an input field, the `onboardingViewOnStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```kotlin
import com.adapty.exampleapp.AppLogger
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.AdaptyUIOnboardingsEventsObserver
import com.adapty.kmp.models.AdaptyOnboardingsDatePickerParams
import com.adapty.kmp.models.AdaptyOnboardingsInputParams
import com.adapty.kmp.models.AdaptyOnboardingsMultiSelectParams
import com.adapty.kmp.models.AdaptyOnboardingsSelectParams
import com.adapty.kmp.models.AdaptyOnboardingsStateUpdatedParams
import com.adapty.kmp.models.AdaptyOnboardingsTextInput
import com.adapty.kmp.models.AdaptyUIOnboardingView
import com.adapty.kmp.models.AdaptyUIOnboardingMeta

class MyAdaptyUIOnboardingsEventsObserver : AdaptyUIOnboardingsEventsObserver {
    override fun onboardingViewOnStateUpdatedAction(
        view: AdaptyUIOnboardingView,
        meta: AdaptyUIOnboardingMeta,
        elementId: String,
        params: AdaptyOnboardingsStateUpdatedParams
    ) {
        // Store user preferences or responses
        when (params) {
            is AdaptyOnboardingsSelectParams -> {
                // Handle single selection
                val id = params.id
                val value = params.value
                val label = params.label
                AppLogger.d("Selected option: $label (id: $id, value: $value)")
            }
            is AdaptyOnboardingsMultiSelectParams -> {
                // Handle multiple selections
            }
            is AdaptyOnboardingsInputParams -> {
                // Handle text input
            }
            is AdaptyOnboardingsDatePickerParams -> {
                // Handle date selection
            }
        }
    }
}

// Set up the observer
AdaptyUI.setOnboardingsEventsObserver(MyAdaptyUIOnboardingsEventsObserver())
```

<Details>
<summary>Saved data examples (the format may differ in your implementation)</summary>

```javascript
// Example of a saved select action
{
  "id": "onboarding_on_state_updated_action",
  "view": { /* AdaptyUI.OnboardingView object */ },
  "meta": {
    "onboarding_id": "onboarding_123",
    "screen_cid": "preferences_screen",
    "screen_index": 1,
    "total_screens": 3
  },
  "action": {
    "element_id": "preference_selector",
    "element_type": "select",
    "value": {
      "id": "option_1",
      "value": "premium",
      "label": "Premium Plan"
    }
  }
}

// Example of a saved multi-select action
{
  "id": "onboarding_on_state_updated_action",
  "view": { /* AdaptyUI.OnboardingView object */ },
  "meta": {
    "onboarding_id": "onboarding_123",
    "screen_cid": "interests_screen",
    "screen_index": 2,
    "total_screens": 3
  },
  "action": {
    "element_id": "interests_selector",
    "element_type": "multi_select",
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
  "id": "onboarding_on_state_updated_action",
  "view": { /* AdaptyUI.OnboardingView object */ },
  "meta": {
    "onboarding_id": "onboarding_123",
    "screen_cid": "profile_screen",
    "screen_index": 0,
    "total_screens": 3
  },
  "action": {
    "element_id": "name_input",
    "element_type": "input",
    "value": {
      "type": "text",
      "value": "John Doe"
    }
  }
}

// Example of a saved date picker action
{
  "id": "onboarding_on_state_updated_action",
  "view": { /* AdaptyUI.OnboardingView object */ },
  "meta": {
    "onboarding_id": "onboarding_123",
    "screen_cid": "profile_screen",
    "screen_index": 0,
    "total_screens": 3
  },
  "action": {
    "element_id": "birthday_picker",
    "element_type": "date_picker",
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

If you want to immediately link the input data with the user profile and avoid asking them twice for the same info, you need to [update the user profile](kmp-setting-user-attributes.md) with the input data when handling the action.

For example, you ask users to enter their name in the text field with the `name` ID, and you want to set this field's value as user's first name. Also, you ask them to enter their email in the `email` field. In your app code, it can look like this:

```kotlin
import com.adapty.kmp.Adapty
import com.adapty.kmp.AdaptyUI
import com.adapty.exampleapp.AppLogger
import com.adapty.kmp.AdaptyUIOnboardingsEventsObserver
import com.adapty.kmp.models.AdaptyOnboardingsEmailInput
import com.adapty.kmp.models.AdaptyOnboardingsInputParams
import com.adapty.kmp.models.AdaptyOnboardingsStateUpdatedParams
import com.adapty.kmp.models.AdaptyOnboardingsTextInput
import com.adapty.kmp.models.AdaptyProfileParameters
import com.adapty.kmp.models.AdaptyUIOnboardingView
import com.adapty.kmp.models.AdaptyUIOnboardingMeta

class MyAdaptyUIOnboardingsEventsObserver : AdaptyUIOnboardingsEventsObserver {
    override fun onboardingViewOnStateUpdatedAction(
        view: AdaptyUIOnboardingView,
        meta: AdaptyUIOnboardingMeta,
        elementId: String,
        params: AdaptyOnboardingsStateUpdatedParams
    ) {
        // Store user preferences or responses
        when (params) {
            is AdaptyOnboardingsInputParams -> {
                // Handle text input
                val builder = AdaptyProfileParameters.Builder()

                // Map elementId to appropriate profile field
                when (elementId) {
                    "name" -> {
                        when (val input = params.input) {
                            is AdaptyOnboardingsTextInput -> {
                                builder.withFirstName(input.value)
                            }
                        }
                    }
                    "email" -> {
                        when (val input = params.input) {
                            is AdaptyOnboardingsEmailInput -> {
                                builder.withEmail(input.value)
                            }
                        }
                    }
                }

                // Update profile asynchronously
                mainUiScope.launch {
                    val profileParams = builder.build()
                    val result = Adapty.updateProfile(profileParams)
                    result.onSuccess { profile ->
                        // Profile updated successfully
                        AppLogger.d("Profile updated: ${profile.email}")
                    }.onError { error ->
                        // Handle the error
                        AppLogger.e("Failed to update profile: ${error.message}")
                    }
                }
            }
        }
    }
}

// Set up the observer
AdaptyUI.setOnboardingsEventsObserver(MyAdaptyUIOnboardingsEventsObserver())
```

### Customize paywalls based on answers

Using quizzes in onboardings, you can also customize paywalls you show users after they complete the onboarding.

For example, you can ask users about their experience with sport and show different CTAs and products to different user groups.

1. [Add a quiz](onboarding-quizzes.md) in the onboarding builder and assign meaningful IDs to its options.

<ZoomImage id="experience.webp" />

2. Handle the quiz responses based on their IDs and [set custom attributes](kmp-setting-user-attributes.md) for users.

```kotlin
import com.adapty.kmp.Adapty
import com.adapty.kmp.AdaptyUI
import com.adapty.exampleapp.AppLogger
import com.adapty.kmp.AdaptyUIOnboardingsEventsObserver
import com.adapty.kmp.models.AdaptyOnboardingsSelectParams
import com.adapty.kmp.models.AdaptyOnboardingsStateUpdatedParams
import com.adapty.kmp.models.AdaptyProfileParameters
import com.adapty.kmp.models.AdaptyUIOnboardingView
import com.adapty.kmp.models.AdaptyUIOnboardingMeta

class MyAdaptyUIOnboardingsEventsObserver : AdaptyUIOnboardingsEventsObserver {
    override fun onboardingViewOnStateUpdatedAction(
        view: AdaptyUIOnboardingView,
        meta: AdaptyUIOnboardingMeta,
        elementId: String,
        params: AdaptyOnboardingsStateUpdatedParams
    ) {
        // Handle quiz responses and set custom attributes
        when (params) {
            is AdaptyOnboardingsSelectParams -> {
                // Handle quiz selection
                val builder = AdaptyProfileParameters.Builder()

                // Map quiz responses to custom attributes
                when (elementId) {
                    "experience" -> {
                        // Set custom attribute 'experience' with the selected value (beginner, amateur, pro)
                        builder.withCustomAttribute("experience", params.value)
                    }
                }

                // Update profile asynchronously
                mainUiScope.launch {
                    val profileParams = builder.build()
                    val result = Adapty.updateProfile(profileParams)
                    result.onSuccess { profile ->
                        // Profile updated successfully
                        AppLogger.d("Custom attribute 'experience' set to: ${params.value}")
                    }.onError { error ->
                        // Handle the error
                        AppLogger.e("Failed to update profile: ${error.message}")
                    }
                }
            }
        }
    }
}

// Set up the observer
AdaptyUI.setOnboardingsEventsObserver(MyAdaptyUIOnboardingsEventsObserver())
```

3. [Create segments](segments.md) for each custom attribute value.
4. Create a [placement](placements.md) and add [audiences](audience.md) for each segment you've created.
5. [Display a paywall](kmp-paywalls.md) for the placement in your app code. If your onboarding has a button that opens a paywall, implement the paywall code as a [response to this button's action](kmp-handling-onboarding-events.md#opening-a-paywall).