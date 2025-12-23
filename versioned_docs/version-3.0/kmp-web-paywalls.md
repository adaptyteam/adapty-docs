---
title: "Implement web paywalls in Kotlin Multiplatform SDK"
description: "Set up a web paywall to get paid without the store fees and audits."
metadataTitle: "Accept payments in web for Kotlin Multiplatform apps"
keywords: ['web paywalls']
---
import Zoom from 'react-medium-image-zoom';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::important
Before you begin, make sure you have [configured your web paywall in the dashboard](web-paywall.md) and installed Adapty SDK version 3.15 or later.
:::

## Open web paywalls

If you are working with a paywall you developed yourself, you need to handle web paywalls using the SDK method. The `openWebPaywall` method:
1. Generates a unique URL allowing Adapty to link a specific paywall shown to a particular user to the web page they are redirected to.
2. Tracks when your users return to the app and then requests `getProfile` at short intervals to determine whether the profile access rights have been updated.

This way, if the payment has been successful and access rights have been updated, the subscription activates in the app almost immediately.

:::note
After users return to the app, refresh the UI to reflect the profile updates. Adapty will receive and process profile update events.
:::

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import kotlinx.coroutines.launch

viewModelScope.launch {
    Adapty.openWebPaywall(product = product).onSuccess {
        // the web paywall was opened successfully
    }.onError { error ->
        // handle the error
    }
}
```

:::note
There are two versions of the `openWebPaywall` method:
1. `openWebPaywall(product = product)` that generates URLs by paywall and adds the product data to URLs as well.
2. `openWebPaywall(paywall = paywall)` that generates URLs by paywall without adding the product data to URLs. Use it when your products in the Adapty paywall differ from those in the web paywall.
   :::

## Customize how web paywalls open

By default, web paywalls open in an in-app browser. This provides a seamless user experience by displaying the web purchase page within your application, allowing users to complete transactions without switching apps.

If you prefer to open web paywalls in an external browser instead, you can customize this behavior by setting the `openIn` parameter to `AdaptyWebPresentation.EXTERNAL_BROWSER`:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyWebPresentation
import kotlinx.coroutines.launch

viewModelScope.launch {
    Adapty.openWebPaywall(
        product = product,
        openIn = AdaptyWebPresentation.EXTERNAL_BROWSER // default – IN_APP_BROWSER
    ).onSuccess {
        // the web paywall was opened successfully
    }.onError { error ->
        // handle the error
    }
}
```