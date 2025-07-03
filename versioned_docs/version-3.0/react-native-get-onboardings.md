---
title: "Get onboardings"
description: "Learn how to get onboardings in your React Native app with Adapty SDK."
metadataTitle: "Get Onboardings | React Native SDK | Adapty Docs"
slug: /react-native-get-onboardings
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Get onboardings

To get available onboardings from Adapty:

```javascript
import { Adapty } from 'react-native-adapty';

const onboardings = await Adapty.getOnboardings();
console.log('Available onboardings:', onboardings);
```

## Get onboardings with options

You can specify options when getting onboardings:

```javascript
const onboardings = await Adapty.getOnboardings({
  locale: 'en_US',
  loadTimeout: 10000
});
```

## Onboarding structure

Each onboarding contains the following information:

```javascript
const onboardings = await Adapty.getOnboardings();

onboardings.forEach(onboarding => {
  console.log('Onboarding ID:', onboarding.developerId);
  console.log('Onboarding name:', onboarding.name);
  console.log('Screens:', onboarding.screens);
  console.log('Visual onboarding:', onboarding.visualOnboarding);
});
```

## Get specific onboarding

To get a specific onboarding by ID:

```javascript
const onboardings = await Adapty.getOnboardings();
const specificOnboarding = onboardings.find(o => o.developerId === 'welcome_onboarding');

if (specificOnboarding) {
  console.log('Found onboarding:', specificOnboarding);
}
```

## Handle errors

Always handle potential errors when getting onboardings:

```javascript
try {
  const onboardings = await Adapty.getOnboardings();
  console.log('Onboardings loaded:', onboardings.length);
} catch (error) {
  console.error('Failed to get onboardings:', error);
  // Handle error appropriately
}
```

## Cache onboardings

Onboardings are cached locally for offline use:

```javascript
// Get onboardings (will use cache if available)
const onboardings = await Adapty.getOnboardings();

// Force refresh from server
const freshOnboardings = await Adapty.getOnboardings({
  forceUpdate: true
});
```

## Onboarding observer

To listen for onboarding updates:

```javascript
import { AdaptyOnboardingObserver } from 'react-native-adapty';

const observer = new AdaptyOnboardingObserver();

observer.on('onboardings_updated', (onboardings) => {
  console.log('Onboardings updated:', onboardings);
});

observer.on('onboardings_loaded', (onboardings) => {
  console.log('Onboardings loaded:', onboardings);
});
```

## Check onboarding availability

You can check if specific onboardings are available:

```javascript
const onboardings = await Adapty.getOnboardings();

// Check if welcome onboarding is available
const hasWelcomeOnboarding = onboardings.some(o => o.developerId === 'welcome_onboarding');

if (hasWelcomeOnboarding) {
  console.log('Welcome onboarding is available');
} else {
  console.log('Welcome onboarding is not available');
}
```

## Filter onboardings

You can filter onboardings based on criteria:

```javascript
const onboardings = await Adapty.getOnboardings();

// Get only active onboardings
const activeOnboardings = onboardings.filter(o => o.isActive);

// Get onboardings for specific locale
const localizedOnboardings = onboardings.filter(o => 
  o.visualOnboarding?.localizations.some(l => l.locale === 'en_US')
);
``` 