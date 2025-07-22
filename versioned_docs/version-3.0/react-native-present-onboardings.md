---
title: "Present onboardings in React Native SDK"
description: "Discover how to present onboardings on React Native to boost conversions and revenue."
metadataTitle: "Presenting onboardings on React Native | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

Before you start, ensure that:

1. You have installed [Adapty React Native SDK](sdk-installation-reactnative.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).

Adapty React Native SDK provides two ways to present onboardings:

- **Full-screen presentation (classic view)**: Modal presentation gives users native platform dismissal gestures (swipe, back button).

- **Embedded component**: Embedded component gives you complete control over dismissal through your own UI and logic.

## Present as full-screen modal

To display an onboarding as a full-screen modal, use the `view.present()` method on the `view` created by the `createOnboardingView` method. Each `view` can only be used once. If you need to display the onboarding again, call `createOnboardingView` one more time to create a new `view` instance.

:::warning
Reusing the same `view` without recreating it may result in an `AdaptyUIError.viewAlreadyPresented` error.
:::

```typescript showLineNumbers title="React Native (TSX)"
import { createOnboardingView } from 'react-native-adapty/dist/ui';

const view = await createOnboardingView(onboarding);

view.registerEventHandlers(); // handle close press, etc

try {
    await view.present();
} catch (error) {
    // handle the error
}
```



## Embed in component hierarchy

To embed an onboarding within your existing component tree, use the `AdaptyOnboardingView` component directly in your React Native component hierarchy:

```typescript showLineNumbers title="React Native (TSX)"
import { AdaptyOnboardingView } from 'react-native-adapty/dist/ui';

<AdaptyOnboardingView
  onboarding={onboarding}
  style={{ /* your styles */ }}
  eventHandlers={{
    onAnalytics(event, meta) { 
      // Handle analytics events
    },
    onClose(actionId, meta) { 
      // Handle close actions
    },
    onCustom(actionId, meta) { 
      // Handle custom actions
    },
    onPaywall(actionId, meta) { 
      // Handle paywall actions
    },
    onStateUpdated(action, meta) { 
      // Handle state updates
    },
    onFinishedLoading(meta) { 
      // Handle when onboarding finishes loading
    },
    onError(error) { 
      // Handle errors
    },
  }}
/>
```

## Next steps

Once you've presented your onboarding, you'll want to [handle user interactions and events](react-native-handling-onboarding-events.md). Learn how to handle onboarding events to respond to user actions and track analytics.
