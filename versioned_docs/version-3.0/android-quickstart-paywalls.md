---
title: "Display paywalls"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls android', 'sdk android']
rank: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';


<PaywallsIntro />

:::tip
This is the minimum setup you need to get up and running with paywalls created using the builder. Read more detailed [guides on working with paywalls](android-paywalls.md).
:::

## 1. Get the paywall

Your paywalls are associated with [placements](placements.md) configured in the dashboard. Placements allow you to run different paywalls for different audiences or run [A/B tests](ab-tests.md).

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the placement ID using the `getPaywall` method and check whether it is a paywall created in the builder.

2. If it is a paywall created in the builder, get its view configuration using the `getViewConfiguration` method. View configuration contains the UI elements and styling needed to display the paywall.

:::tip
This quickstart provides the minimum configuration required to display a paywall. For advanced configuration details, see our [guide on getting paywalls](android-get-pb-paywalls).
:::

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
...

Adapty.getPaywall("YOUR_PLACEMENT_ID") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            // the requested paywall
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}

if (!paywall.hasViewConfiguration) {
    // use your custom logic
    return
}

AdaptyUI.getViewConfiguration(paywall) { result ->
    when(result) {
        is AdaptyResult.Success -> {
            val viewConfiguration = result.value
            // use loaded configuration
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers

Adapty.getPaywall("YOUR_PLACEMENT_ID"), result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        // the requested paywall
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});

if (!paywall.hasViewConfiguration()) {
    // use your custom logic
    return;
}

AdaptyUI.getViewConfiguration(paywall), result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyUI.LocalizedViewConfiguration viewConfiguration =
          ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) result).getValue();
        // use loaded configuration
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
</TabItem>

</Tabs>

## 2. Display the paywall

Now, when you have the paywall configuration, it's enough to add a few lines to display your paywall.

:::tip
For more details on how to display a paywall, see our [guide](android-present-paywalls.md).
:::

In order to display the visual paywall on the device screen, you must first configure it. To do this, call the method `AdaptyUI.getPaywallView()` or create the `AdaptyPaywallView` directly:

<Tabs groupId="current-os" queryString>
  <TabItem value="kotlin" label="Kotlin (option 1)" default>

```kotlin showLineNumbers
   val paywallView = AdaptyUI.getPaywallView(
       activity,
       viewConfiguration,
       null, // products = null means auto-fetch
       eventListener,
   )
```
</TabItem>
<TabItem value="kotlin2" label="Kotlin (option 2)" default>

```kotlin showLineNumbers
   val paywallView =
        AdaptyPaywallView(activity) // or retrieve it from xml
   ...
   with(paywallView) {
       showPaywall(
           viewConfiguration,
           null, // products = null means auto-fetch
		   eventListener,
       )
   }
```

</TabItem>
<TabItem value="java" label="Java (option 1)" default>

```java showLineNumbers
AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
        activity,
        viewConfiguration,
        null, // products = null means auto-fetch
        eventListener,
);
```
</TabItem>
<TabItem value="java2" label="Java (option 2)" default>

```java showLineNumbers
AdaptyPaywallView paywallView =
  new AdaptyPaywallView(activity); //add to the view hierarchy if needed, or you receive it from xml
...
paywallView.showPaywall(viewConfiguration, products, eventListener);
```

</TabItem>
<TabItem value="XML" label="XML" default>

```xml showLineNumbers
<com.adapty.ui.AdaptyPaywallView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```
</TabItem>
</Tabs>

After the view has been successfully created, you can add it to the view hierarchy and display it on the screen of the device.

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](android-implement-paywalls-manually).
:::

## 3. Check subscription status before displaying

Now, you have implemented a paywall, but we want to show it only to users without the premium access. Before showing a paywall, check if the user already has premium access.

You need to get their profile using the `getProfile` method and check the access levels in the `profile` object.

By default, Adapty has the built-in `premium` access level, but you can [set up your own access levels](access-level.md) in the Adapty dashboard.

:::tip
Proceed with the quickstart guide to also [implement listening for subscription status changes](android-check-subscription-status).
:::

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// highlight-start
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            
            if (profile.accessLevels["premium"]?.isActive != true) {
// highlight-end
                // Show paywall to non-premium users
                val paywallView = AdaptyUI.getPaywallView(
                    activity,
                    viewConfiguration,
                    null, // products = null means auto-fetch
                    eventListener
                )
                setContentView(paywallView)
// highlight-start
            } else {
                // User has premium access
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
// highlight-end
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// highlight-start
Adapty.getProfile(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        
        AdaptyProfile.AccessLevel premium = profile.getAccessLevels().get("premium");
        
        if (premium == null || !premium.isActive()) {
// highlight-end
            // Show paywall to non-premium users
            AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
                activity,
                viewConfiguration,
                null, // products = null means auto-fetch
                eventListener
            );
            setContentView(paywallView);
// highlight-start
        } else {
            // User has premium access
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
// highlight-end
```
</TabItem>

</Tabs>

## 4. Handle button actions

When users click buttons in the paywall, purchases and restoration are handled automatically. However, other buttons have custom or pre-defined IDs and require handling actions in your code.

For example, your paywall probably has a close button. Let's see how you can handle it in your implementation.

:::tip
Read our [guide](android-handling-events) on how to handle other button actions and events.
:::

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers title="Kotlin"
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
    when (action) {
        AdaptyUI.Action.Close -> (context as? Activity)?.onBackPressed()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
@Override
public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
    if (action == AdaptyUI.Action.Close) {
        if (context instanceof Activity) {
            ((Activity) context).onBackPressed();
        }
    }
}
```
</TabItem>

</Tabs>

## Full example

Here is how all those steps can be integrated in your app together.

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers title="Kotlin"
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        Adapty.getProfile { profileResult ->
            if (profileResult is AdaptyResult.Success) {
                val profile = profileResult.value
                if (profile.accessLevels["premium"]?.isActive == true) {
                    // User has premium access
                    return@getProfile
                }

                Adapty.getPaywall("YOUR_PLACEMENT_ID") { paywallResult ->
                    if (paywallResult is AdaptyResult.Success) {
                        val paywall = paywallResult.value

                        if (!paywall.hasViewConfiguration) {
                            // Use custom logic
                            return@getPaywall
                        }

                        AdaptyUI.getViewConfiguration(paywall) { configResult ->
                            if (configResult is AdaptyResult.Success) {
                                val viewConfiguration = configResult.value

                                val paywallView = AdaptyUI.getPaywallView(
                                    this,
                                    viewConfiguration,
                                    null, // products = null means auto-fetch
                                    object : AdaptyUIEventListener {
                                        override fun onActionPerformed(
                                            action: AdaptyUI.Action,
                                            context: Context
                                        ) {
                                            if (action == AdaptyUI.Action.Close) {
                                                finish()
                                            }
                                        }
                                    }
                                )

                                setContentView(paywallView)
                            }
                        }
                    }
                }
            }
        }
    }
}

```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Adapty.getProfile(profileResult -> {
            if (profileResult instanceof AdaptyResult.Success) {
                AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) profileResult).getValue();
                AdaptyProfile.AccessLevel premium = profile.getAccessLevels().get("premium");

                if (premium != null && premium.isActive()) {
                    // User has premium access
                    return;
                }

                Adapty.getPaywall("YOUR_PLACEMENT_ID", paywallResult -> {
                    if (paywallResult instanceof AdaptyResult.Success) {
                        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) paywallResult).getValue();

                        if (!paywall.hasViewConfiguration()) {
                            // Use custom logic
                            return;
                        }

                        AdaptyUI.getViewConfiguration(paywall, configResult -> {
                            if (configResult instanceof AdaptyResult.Success) {
                                AdaptyUI.LocalizedViewConfiguration viewConfiguration =
                                    ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();

                                AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
                                    this,
                                    viewConfiguration,
                                    null, // products = null means auto-fetch
                                    new AdaptyUIEventListener() {
                                        @Override
                                        public void onActionPerformed(
                                            @NonNull AdaptyUI.Action action,
                                            @NonNull Context context
                                        ) {
                                            if (action == AdaptyUI.Action.Close && context instanceof Activity) {
                                                ((Activity) context).finish();
                                            }
                                        }
                                    }
                                );

                                setContentView(paywallView);
                            }
                        });
                    }
                });
            }
        });
    }
}

```
</TabItem>

</Tabs>

