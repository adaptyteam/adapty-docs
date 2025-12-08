---
title: "Present onboardings in Kotlin Multiplatform SDK"
description: "Learn how to present onboardings effectively to drive more conversions."
metadataTitle: "Presenting onboardings | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your Kotlin Multiplatform app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

Before you start, ensure that:

1. You have installed [Adapty Kotlin Multiplatform SDK](sdk-installation-kotlin-multiplatform.md) 3.14.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

To display an onboarding, use the `view.present()` method on the `view` created by the `createOnboardingView` method. Each `view` can only be used once. If you need to display the onboarding again, call `createPaywallView` one more to create a new `view` instance.

:::warning
Reusing the same `view` without recreating it may result in an error.
:::

```kotlin showLineNumbers title="Kotlin Multiplatform"
import com.adapty.kmp.AdaptyUI
import com.adapty.kmp.models.AdaptyPaywall
import kotlinx.coroutines.launch

viewModelScope.launch {
    val view = AdaptyUI.createOnboardingView(onboarding = onboarding)
    view?.present()
}
```