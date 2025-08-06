---
title: "Show paywalls and enable purchases in Android SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls android', 'sdk android']
rank: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';


<PaywallsIntro />

:::info
If you are not using the paywall builder for your paywalls, consider our [guide for implementing paywalls manually](android-implement-paywalls-manually).
:::

## 1. Get the paywall

Your paywalls are associated with [placements](placements.md) configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

That's why, to get a paywall to display, you need to:

1. Get the `paywall` object by the placement ID using the `getPaywall` method and check whether it is a paywall created in the builder.

2. If it is a paywall created in the builder, get its view configuration using the `getViewConfiguration` method. The view configuration contains the UI elements and styling needed to display the paywall.

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

:::tip
For more details on how to display a paywall, see our [guide](android-present-paywalls.md).
:::

## 3.  Handle button actions

When users click buttons in the paywall, purchases, restoration, closing the paywall, and opening links are handled automatically in the Android SDK.

However, other buttons have custom or pre-defined IDs and require handling actions in your code. Or, you may want to override their default behavior.

For example, you may want to close the paywall after your app users open a web link. Let's see how you can handle it in your implementation.

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers title="Kotlin"
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
    when (action) {
        is AdaptyUI.Action.OpenUrl -> {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(action.url))
            try {
                context.startActivity(Intent.createChooser(intent, ""))
            } catch (e: Throwable) {
                // Handle error if needed
            }
            (context as? Activity)?.onBackPressed()
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
@Override
public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
    if (action instanceof AdaptyUI.Action.OpenUrl) {
        String url = ((AdaptyUI.Action.OpenUrl) action).getUrl();
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        try {
            context.startActivity(Intent.createChooser(intent, ""));
        } catch (Throwable e) {
            // Handle error if needed
        }
        if (context instanceof Activity) {
            ((Activity) context).onBackPressed();
        }
    }
}
```
</TabItem>

</Tabs>

:::tip
Read our guides on how to handle other button [actions](android-handle-paywall-actions.md) and [events](android-handling-events.md).
:::

## Next steps

Now, your paywall is ready to be displayed in the app.

As a next step, you need to [learn how to work with user profiles](android-quickstart-identify.md) to ensure they can access what they have paid for.

## Full example

Here is how all those steps can be integrated in your app together.

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers title="Kotlin"
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

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
                                override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
                                    when (action) {
                                        is AdaptyUI.Action.OpenUrl -> {
                                            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(action.url))
                                            try {
                                                context.startActivity(Intent.createChooser(intent, ""))
                                            } catch (e: Throwable) {
                                                // Handle error if needed
                                            }
                                            (context as? Activity)?.onBackPressed()
                                        }
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

```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

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
                                    public void onActionPerformed(@NonNull AdaptyUI.Action action, @NonNull Context context) {
                                        if (action instanceof AdaptyUI.Action.OpenUrl) {
                                            String url = ((AdaptyUI.Action.OpenUrl) action).getUrl();
                                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                                            try {
                                                context.startActivity(Intent.createChooser(intent, ""));
                                            } catch (Throwable e) {
                                                // Handle error if needed
                                            }
                                            if (context instanceof Activity) {
                                                ((Activity) context).onBackPressed();
                                            }
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
}

```
</TabItem>

</Tabs>

