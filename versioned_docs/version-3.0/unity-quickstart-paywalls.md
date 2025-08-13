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


To enable any kind of in-app purchases, you need to understand how Adapty structures purchases:

- **Products** are anything available for purchase – subscriptions, consumables, or lifetime access.
- **Paywalls** are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.

Adapty offers you three ways to enable purchases in your app. Select one of them depending on your app requirements:

| Implementation             | Complexity | When to use                                                                                                                                                                                                                                |
|----------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Adapty Paywall Builder** | ✅ Easy     | You [create a complete, purchase-ready paywall in the no-code builder](quickstart-paywalls). Adapty automatically renders it and handles all the complex purchase flow, receipt validation, and subscription management behind the scenes. |
| `makePurchase`             | 🟡 Medium  | You implement your paywall UI in your app code and use the Adapty SDK method for handling purchases. See the [guide](unity-making-purchases).                                                                                              |
| Observer mode              | 🔴 Hard    | You implement the purchase flow yourself completely. See the [guide](implement-observer-mode-unity).                                                                                                                                       |


:::danger
**The steps below show how to implement a paywall created in the Adapty paywall builder.**
:::

To display a paywall created in the Adapty paywall builder, in your app code, you only need to:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall and delegate handling purchases to Adapty**: Show the paywall container you've got in your app.
3. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.

## 1. Get the paywall

Your paywalls are associated with placements configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the [placement](placements.md) ID using the `GetPaywall` method and check whether it is a paywall created in the builder using the `hasViewConfiguration` property.

2. Create the paywall view using the `CreateView` method. The view contains the UI elements and styling needed to display the paywall.

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

:::info
This quickstart provides the minimum configuration required to display a paywall. For advanced configuration details, see our [guide on getting paywalls](unity-get-pb-paywalls).
:::

## 2. Display the paywall

Now, when you have the paywall configuration, it's enough to add a few lines to display your paywall.

To display the paywall, use the `view.present()` method on the `view` created by the `СreateView` method. Each `view` can only be used once. If you need to display the paywall again, call `createPaywallView` one more to create a new `view` instance.

```csharp showLineNumbers title="Unity"
view.Present((error) => {
  // handle the error
});
```

:::info
For more details on how to display a paywall, see our [guide](unity-present-paywalls.md).
:::

## 3. Handle button actions

When users click buttons in the paywall, purchases and restoration are handled automatically. However, other buttons have custom or pre-defined IDs and require handling actions in your code.

For example, your paywall probably has a close button and URLs to open (e.g., terms of use and privacy policy). So, you need to respond to actions with the `Close` and `OpenUrl` IDs.

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

:::tip
Read our guides on how to handle other button [actions](unity-handle-paywall-actions.md) and [events](unity-handling-events.md).
:::

## Next steps

Your paywall is ready to be displayed in the app.

Now, you need to [check the users' access level](unity-check-subscription-status.md) to ensure you display a paywall or give access to paid features to right users.

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
        GetAndDisplayPaywall();
    }
    
    private void GetAndDisplayPaywall()
    {
        Adapty.GetPaywall(placementId, (paywall, error) => {
            if (error != null) {
                Debug.LogError("Error getting paywall: " + error.Message);
                return;
            }
            
            if (paywall.hasViewConfiguration) {
                CreateAndPresentPaywallView(paywall);
            } else {
                Debug.LogWarning("Paywall was not created using the builder");
            }
        });
    }
    
    private void CreateAndPresentPaywallView(AdaptyPaywall paywall)
    {
        var parameters = new AdaptyUICreateViewParameters();
        
        AdaptyUI.CreateView(paywall, parameters, (view, error) => {
            if (error != null) {
                Debug.LogError("Error creating paywall view: " + error.Message);
                return;
            }
            
            currentPaywallView = view;
            
            view.Present((presentError) => {
                if (presentError != null) {
                    Debug.LogError("Error presenting paywall: " + presentError.Message);
                    return;
                }
                
                Debug.Log("Paywall presented successfully");
            });
        });
    }
    
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
              Application.OpenURL(action.Value);
              break;
            default:
                break;
        }
    }
    
    public void ShowPaywall()
    {
        GetAndDisplayPaywall();
    }
    
    void OnDestroy()
    {
        if (currentPaywallView != null) {
            currentPaywallView.Dismiss(null);
        }
    }
}
```