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

## Present onboarding

To display an onboarding, use the `view.present()` method on the `view` created by the `createOnboardingView` method. Each `view` can only be used once. If you need to display the onboarding again, call `createOnboardingView` one more time to create a new `view` instance.

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

## Configure iOS presentation style

Configure how the onboarding is presented on iOS by passing the `iosPresentationStyle` parameter to the `present()` method. The parameter accepts `'full_screen'` (default) or `'page_sheet'` values.

```typescript showLineNumbers
await view.present({ iosPresentationStyle: 'page_sheet' });
```

## Customize how links open in onboardings

:::important
Customizing how links open in onboardings is supported starting from Adapty SDK v.3.15.
:::

By default, links in onboardings open in an in-app browser. This provides a seamless user experience by displaying web pages within your application, allowing users to view them without switching apps.

If you prefer to open links in an external browser instead, you can customize this behavior by setting the `openIn` parameter to `browser_out_app`:

```typescript showLineNumbers
await view.present({ openIn: 'browser_out_app' }); // default — browser_in_app
```

## Next steps

Once you've presented your onboarding, you'll want to [handle user interactions and events](capacitor-handling-onboarding-events.md). Learn how to handle onboarding events to respond to user actions and track analytics.
