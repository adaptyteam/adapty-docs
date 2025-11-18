---
title: "Present onboardings in Unity SDK"
description: "Learn how to present onboardings effectively to drive more conversions."
metadataTitle: "Presenting onboardings | Adapty Docs"
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your Unity app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

Before you start, ensure that:

1. You have installed [Adapty Unity SDK](sdk-installation-unity.md) 3.12.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

To display an onboarding, use the `view.Present()` method on the `view` created by the `CreateOnboardingView` method. Each `view` can only be used once. If you need to display the paywall again, call `CreateOnboardingView` one more to create a new `view` instance.

:::warning
Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

```csharp showLineNumbers title="Unity"
view.Present((presentError) => {
    if (presentError != null) {
        // handle the error
    }
};
```