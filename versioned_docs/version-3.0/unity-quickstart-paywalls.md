---
title: "Show paywalls and enable purchases in Unity SDK"
description: "Learn how to present paywalls in your Unity app with Adapty SDK."
metadataTitle: "Present a Paywall | Unity SDK | Adapty Docs"
slug: /unity-quickstart-paywalls
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';


<PaywallsIntro />

:::tip
This is the minimum setup you need to get up and running with paywalls created using the builder. Read more detailed [guides on working with paywalls](unity-paywalls.md).
:::

## 1. Get the paywall

Your paywalls are associated with [placements](placements.md) configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the placement ID using the `GetPaywall` method and check whether it is a paywall created in the builder using the `hasViewConfiguration` property.

2. If it is a paywall created in the builder, create its view using the `CreateView` method. The view contains the UI elements and styling needed to display the paywall.

:::tip
This quickstart provides the minimum configuration required to display a paywall. For advanced configuration details, see our [guide on getting paywalls](unity-get-pb-paywalls).
::: 

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](unity-implement-paywalls-manually).
:::

```csharp showLineNumbers
Adapty.GetPaywall("YOUR_PLACEMENT_ID", (paywall, error) => {
  if(error != null) {
    // handle the error
    return;
  }
  
  // paywall - the resulting object
});

var parameters = new AdaptyUICreateViewParameters()

AdaptyUI.CreateView(paywall, parameters, (view, error) => {
  // handle the result
});
```
## 2. Display the paywall

Now, when you have the paywall configuration, it's enough to add a few lines to display your paywall.

:::tip
For more details on how to display a paywall, see our [guide](unity-present-paywalls.md).
:::

To display the paywall, use the `view.Зresent()` method on the `view` created by the `СreateView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance.

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](unity-implement-paywalls-manually).
:::

```csharp showLineNumbers title="Unity"
view.Present((error) => {
  // handle the error
});
```

## 3. Check subscription status before displaying

Now that you've implemented the paywall, you will want to only show it to users who baven't already paid for premium access. Before showing a paywall, check if the user already has premium access.

You need to get their profile using the `GetProfile` method and check the access levels in the `profile` object.

By default, Adapty provides a built-in access level called `premium`, but you can [set up your own access levels](access-level.md) in the Adapty dashboard.

:::tip
Proceed with the quickstart guide to also [implement listening for subscription status changes](unity-check-subscription-status).
:::

```csharp
Adapty.GetProfile((profile, error) => {
  if (error != null) {
    // handle the error
    return;
  }
  // "premium" is an identifier of default access level
  var accessLevel = profile.AccessLevels["premium"];
  if (accessLevel == null || !accessLevel.IsActive) {
    // show paywall to non-premium users
  }
});
```

## 4. Handle button actions

When users click buttons in the paywall, purchases and restoration are handled automatically. However, other buttons have custom or pre-defined IDs and require handling actions in your code.

For example, your paywall probably has a close button and URLs to open (e.g., terms of use and privacy policy). So, you need to respond to actions with the `Close` and `OpenUrl` IDs.

:::tip
Read our guides on how to handle other button [actions](unity-handle-paywall-actions.md) and [events](unity-handling-events.md).
:::

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](unity-implement-paywalls-manually).
:::

```csharp showLineNumbers title="Unity"
public void PaywallViewDidPerformAction(
  AdaptyUIView view, 
  AdaptyUIUserAction action
) {
  switch (action.Type) {
    case AdaptyUIUserActionType.Close:
      view.Dismiss(null);
      break;
    case AdaptyUIUserActionType.OpenUrl:
      // Open the URL using Unity's Application.OpenURL
      Application.OpenURL(action.Value);
      break;
    default:
      break;
  }
}
```

## Full example

Here is how all those steps can be integrated in your app together.

```csharp
using System;
using UnityEngine;

public class PaywallManager : MonoBehaviour
{
    [SerializeField] private string placementId = "YOUR_PLACEMENT_ID";
    
    private AdaptyUIView currentPaywallView;
    
    void Start()
    {
        // Check subscription status and show paywall if needed
        CheckSubscriptionAndShowPaywall();
    }
    
    private void CheckSubscriptionAndShowPaywall()
    {
        // Step 3: Check subscription status before displaying
        Adapty.GetProfile((profile, error) => {
            if (error != null) {
                Debug.LogError("Error getting profile: " + error.Message);
                return;
            }
            
            // "premium" is an identifier of default access level
            var accessLevel = profile.AccessLevels["premium"];
            if (accessLevel == null || !accessLevel.IsActive) {
                // User doesn't have premium access, show paywall
                GetAndDisplayPaywall();
            } else {
                Debug.Log("User already has premium access");
            }
        });
    }
    
    private void GetAndDisplayPaywall()
    {
        // Step 1: Get the paywall
        Adapty.GetPaywall(placementId, (paywall, error) => {
            if (error != null) {
                Debug.LogError("Error getting paywall: " + error.Message);
                return;
            }
            
            // Check if it's a paywall created in the builder
            if (paywall.hasViewConfiguration) {
                CreateAndPresentPaywallView(paywall);
            } else {
                Debug.LogWarning("Paywall was not created using the builder");
                // Handle manual paywall implementation here
            }
        });
    }
    
    private void CreateAndPresentPaywallView(AdaptyPaywall paywall)
    {
        // Create view parameters
        var parameters = new AdaptyUICreateViewParameters();
        
        // Create the paywall view
        AdaptyUI.CreateView(paywall, parameters, (view, error) => {
            if (error != null) {
                Debug.LogError("Error creating paywall view: " + error.Message);
                return;
            }
            
            // Store reference to the view
            currentPaywallView = view;
            
            // Step 2: Display the paywall
            view.Present((presentError) => {
                if (presentError != null) {
                    Debug.LogError("Error presenting paywall: " + presentError.Message);
                    return;
                }
                
                Debug.Log("Paywall presented successfully");
            });
        });
    }
    
    // Step 4: Handle button actions
    public void PaywallViewDidPerformAction(
        AdaptyUIView view, 
        AdaptyUIUserAction action
    ) {
        switch (action.Type) {
            case AdaptyUIUserActionType.Close:
                Debug.Log("Close button pressed");
                view.Dismiss(null);
                break;
            case AdaptyUIUserActionType.OpenUrl:
              // Open the URL using Unity's Application.OpenURL
              Application.OpenURL(action.Value);
              break;
            default:
                break;
        }
    }
    
    
    // Optional: Method to manually trigger paywall display
    public void ShowPaywall()
    {
        CheckSubscriptionAndShowPaywall();
    }
    
    // Clean up when object is destroyed
    void OnDestroy()
    {
        if (currentPaywallView != null) {
            currentPaywallView.Dismiss(null);
        }
    }
}
```