---
title: "Handle onboarding events"
description: "Learn how to handle onboarding events in your Unity app with Adapty SDK."
metadataTitle: "Handle Onboarding Events | Unity SDK | Adapty Docs"
slug: /unity-handle-onboarding-events
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Onboarding observer

To handle onboarding events, use the `Adapty` event handlers:

```csharp
using Adapty;

Adapty.OnOnboardingPresented += (onboarding) =>
{
    Debug.Log($"Onboarding presented: {onboarding.DeveloperId}");
};

Adapty.OnOnboardingDismissed += (onboarding) =>
{
    Debug.Log($"Onboarding dismissed: {onboarding.DeveloperId}");
};

Adapty.OnOnboardingAction += (action) =>
{
    Debug.Log($"Onboarding action: {action.Type}");
};
```

## Handle onboarding actions

Onboardings can trigger various actions:

```csharp
Adapty.OnOnboardingAction += (action) =>
{
    switch (action.Type)
    {
        case "close":
            Debug.Log("User closed onboarding");
            break;
        case "next":
            Debug.Log("User moved to next screen");
            break;
        case "previous":
            Debug.Log("User moved to previous screen");
            break;
        case "purchase":
            Debug.Log("User initiated purchase");
            HandlePurchase(action.ProductId);
            break;
        case "custom":
            Debug.Log($"Custom action: {action.Data}");
            HandleCustomAction(action.Data);
            break;
    }
};
```

## Track onboarding progress

Track user progress through onboarding:

```csharp
Adapty.OnOnboardingAction += (action) =>
{
    if (action.Type == "next")
    {
        Debug.Log($"User completed screen: {action.ScreenIndex}");
        // Track analytics
        TrackOnboardingProgress(action.OnboardingId, action.ScreenIndex);
    }
};
```

## Handle onboarding completion

When user completes onboarding:

```csharp
Adapty.OnOnboardingAction += (action) =>
{
    if (action.Type == "close" && action.IsCompleted)
    {
        Debug.Log("Onboarding completed");
        // Mark onboarding as completed
        MarkOnboardingAsCompleted(action.OnboardingId);
        // Show main app content
        ShowMainApp();
    }
};
```

## Custom onboarding actions

Handle custom actions defined in your onboarding:

```csharp
Adapty.OnOnboardingAction += (action) =>
{
    if (action.Type == "custom")
    {
        switch (action.Data["action"])
        {
            case "open_settings":
                OpenAppSettings();
                break;
            case "contact_support":
                OpenSupportChat();
                break;
            case "skip_onboarding":
                SkipOnboarding();
                break;
            default:
                Debug.Log($"Unknown custom action: {action.Data}");
                break;
        }
    }
};
```

## Onboarding state management

Manage onboarding state in your app:

```csharp
public class OnboardingManager : MonoBehaviour
{
    private AdaptyOnboarding currentOnboarding;
    private Dictionary<string, OnboardingProgress> onboardingProgress = new();

    void Start()
    {
        Adapty.OnOnboardingPresented += (onboarding) =>
        {
            currentOnboarding = onboarding;
            onboardingProgress[onboarding.DeveloperId] = new OnboardingProgress { CurrentScreen = 0, Completed = false };
        };

        Adapty.OnOnboardingAction += (action) =>
        {
            if (action.Type == "next" && currentOnboarding != null)
            {
                onboardingProgress[currentOnboarding.DeveloperId].CurrentScreen = action.ScreenIndex + 1;
                onboardingProgress[currentOnboarding.DeveloperId].Completed = false;
            }
            if (action.Type == "close" && action.IsCompleted)
            {
                onboardingProgress[currentOnboarding.DeveloperId].Completed = true;
                currentOnboarding = null;
            }
        };
    }

    private class OnboardingProgress
    {
        public int CurrentScreen;
        public bool Completed;
    }
}
```

## Error handling

Handle onboarding errors:

```csharp
Adapty.OnOnboardingError += (error) =>
{
    Debug.LogError($"Onboarding error: {error.Message}");
    switch (error.Code)
    {
        case "LOAD_ERROR":
            Debug.Log("Failed to load onboarding");
            ShowFallbackOnboarding();
            break;
        case "PRESENTATION_ERROR":
            Debug.Log("Failed to present onboarding");
            break;
        default:
            Debug.Log($"Unknown onboarding error: {error.Code}");
            break;
    }
};
```

## Clean up observer

Don't forget to clean up the observer:

```csharp
void OnDestroy()
{
    Adapty.OnOnboardingAction -= HandleOnboardingAction;
    Adapty.OnOnboardingPresented -= HandleOnboardingPresented;
    Adapty.OnOnboardingDismissed -= HandleOnboardingDismissed;
}

private void HandleOnboardingAction(AdaptyOnboardingAction action)
{
    // Handle onboarding action
}

private void HandleOnboardingPresented(AdaptyOnboarding onboarding)
{
    // Handle onboarding presented
}

private void HandleOnboardingDismissed(AdaptyOnboarding onboarding)
{
    // Handle onboarding dismissed
}
``` 