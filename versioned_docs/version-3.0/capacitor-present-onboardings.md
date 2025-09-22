---
title: "Present onboardings in Capacitor SDK"
description: "Discover how to present onboardings on Capacitor to boost conversions and revenue."
metadataTitle: "Presenting onboardings on Capacitor | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

If you've customized an onboarding using the builder, you don't need to worry about rendering it in your mobile app code to display it to the user. Such an onboarding contains both what should be shown within the onboarding and how it should be shown.

Before you start, ensure that:

1. You have [created an onboarding](create-onboarding.md).
2. You have added the onboarding to a [placement](placements.md).

Adapty Capacitor SDK provides two ways to present onboardings:

- **Standalone screen:** Modal presentation that can be dismissed by users through native platform gestures (swipe, back button). Best for optional onboardings where users should be able to skip or dismiss the content.

- **Embedded component:** Gives you complete control over dismissal through your own UI and logic. Ideal for required onboardings where you want to ensure users complete the flow before proceeding.

## Present as standalone screen

To display an onboarding as a standalone screen that users can dismiss, use the `view.present()` method on the `view` created by the `createOnboardingView` method. Each `view` can only be used once. If you need to display the onboarding again, call `createOnboardingView` one more time to create a new `view` instance.

:::warning
Reusing the same `view` without recreating it may result in an error.
:::

```typescript showLineNumbers
import { adapty, createOnboardingView } from '@adapty/capacitor';

try {
  const view = await createOnboardingView(onboarding);
  
  view.setEventHandlers({
    onClose: (actionId, meta) => {
      console.log('Onboarding closed:', actionId);
      return true; // Allow the onboarding to close
    },
    onCustom: (actionId, meta) => {
      console.log('Custom action:', actionId);
      return false; // Don't close the onboarding
    }
  });
  
  await view.present();
  console.log('Onboarding presented successfully');
} catch (error) {
  console.error('Failed to present onboarding:', error);
}
```

## Next steps

Once you've presented your onboarding, you'll want to [handle user interactions and events](capacitor-handling-onboarding-events.md). Learn how to handle onboarding events to respond to user actions and track analytics.
