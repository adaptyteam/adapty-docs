---
title: "Enable purchases by using paywalls in Android SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['paywalls android', 'sdk android']
rank: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PaywallsIntro from '@site/src/components/reusable/PaywallsIntro.md';

To enable in-app purchases, you need to understand three key concepts:

- **Products** – anything users can buy (subscriptions, consumables, lifetime access)
- **Paywalls** are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.
- **Placements** – where and when you show paywalls in your app (like `main`, `onboarding`, `settings`). You set up paywalls for placements in the dashboard, then request them by placement ID in your code. This makes it easy to run A/B tests and show different paywalls to different users.

Adapty offers you three ways to enable purchases in your app. Select one of them depending on your app requirements:

| Implementation             | Complexity | When to use                                                                                                                                                                                                                                |
|----------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Adapty Paywall Builder** | ✅ Easy     | You [create a complete, purchase-ready paywall in the no-code builder](quickstart-paywalls). Adapty automatically renders it and handles all the complex purchase flow, receipt validation, and subscription management behind the scenes. |
| `makePurchase`             | 🟡 Medium  | You implement your paywall UI in your app code, but still get the paywall object from Adapty to maintain flexibility in product offerings. See the [guide](android-making-purchases).                                                                                            |
| Observer mode              | 🔴 Hard    | You implement the purchase flow yourself completely. See the [guide](implement-observer-mode-android).                                                                                                                                     |

:::important
**The steps below show how to implement a paywall created in the Adapty paywall builder.**

If you don't want to use the paywall builder, see the [guide for handling purchases in manually created paywalls](android-making-purchases.md).
:::

To display a paywall created in the Adapty paywall builder, in your app code, you only need to:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall and Adapty will handle purchases for you**: Show the paywall container you've got in your app.
3. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.

## 1. Get the paywall

Your paywalls are associated with placements configured in the dashboard. Placements allow you to run different paywalls for different audiences or to run [A/B tests](ab-tests.md).

To get a paywall created in the Adapty paywall builder, you need to:

1. Get the `paywall` object by the [placement](placements.md) ID using the `getPaywall` method and check whether it is a paywall created in the builder.

2. Get the paywall view configuration using the `getViewConfiguration` method. The view configuration contains the UI elements and styling needed to display the paywall.

:::important
To get the view configuration, you must switch on the **Show on device** toggle in the Paywall Builder. Otherwise, you will get an empty view configuration, and the paywall won't be displayed.
:::

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.getPaywall("YOUR_PLACEMENT_ID") { result ->
    if (result is AdaptyResult.Success) {
        val paywall = result.value
        
        if (!paywall.hasViewConfiguration) {
            return@getPaywall
        }
        
        AdaptyUI.getViewConfiguration(paywall) { configResult ->
            if (configResult is AdaptyResult.Success) {
                val viewConfiguration = configResult.value
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers

Adapty.getPaywall("YOUR_PLACEMENT_ID", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        
        if (!paywall.hasViewConfiguration()) {
            return;
        }
        
        AdaptyUI.getViewConfiguration(paywall, configResult -> {
            if (configResult instanceof AdaptyResult.Success) {
                AdaptyUI.LocalizedViewConfiguration viewConfiguration =
                    ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();
                // use loaded configuration
            }
        });
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

When users click buttons in the paywall, the Android SDK automatically handles purchases, restoration, closing the paywall, and opening links.

However, other buttons have custom or pre-defined IDs and require handling actions in your code. Or, you may want to override their default behavior.

For example, you may want to close the paywall after your app users open a web link. Let's see how you can handle it in your implementation.

:::tip
Read our guides on how to handle button [actions](android-handle-paywall-actions.md) and [events](android-handling-events.md).
:::

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers title="Kotlin"
override fun onActionPerformed(action: AdaptyUI.Action, context: Context) {
    when (action) {
        is AdaptyUI.Action.OpenUrl -> {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(action.url))
            context.startActivity(Intent.createChooser(intent, ""))
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
        context.startActivity(Intent.createChooser(intent, ""));
        if (context instanceof Activity) {
            ((Activity) context).onBackPressed();
        }
    }
}
```
</TabItem>

</Tabs>

## Next steps

Your paywall is ready to be displayed in the app.

Now, you need to [check the users' access level](android-check-subscription-status.md) to ensure you display a paywall or give access to paid features to right users.

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

