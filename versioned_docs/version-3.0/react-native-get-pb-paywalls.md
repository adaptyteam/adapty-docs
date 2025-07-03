---
title: "Get paywalls"
description: "Learn how to get paywalls in your React Native app with Adapty SDK."
metadataTitle: "Get Paywalls | React Native SDK | Adapty Docs"
slug: /react-native-get-pb-paywalls
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Get paywalls

To get available paywalls from Adapty:

```javascript
import { Adapty } from 'react-native-adapty';

const paywalls = await Adapty.getPaywalls();
console.log('Available paywalls:', paywalls);
```

## Get paywalls with options

You can specify options when getting paywalls:

```javascript
const paywalls = await Adapty.getPaywalls({
  locale: 'en_US',
  loadTimeout: 10000
});
```

## Paywall structure

Each paywall contains the following information:

```javascript
const paywalls = await Adapty.getPaywalls();

paywalls.forEach(paywall => {
  console.log('Paywall ID:', paywall.developerId);
  console.log('Paywall name:', paywall.name);
  console.log('Products:', paywall.products);
  console.log('Visual paywall:', paywall.visualPaywall);
});
```

## Get specific paywall

To get a specific paywall by ID:

```javascript
const paywalls = await Adapty.getPaywalls();
const specificPaywall = paywalls.find(p => p.developerId === 'premium_paywall');

if (specificPaywall) {
  console.log('Found paywall:', specificPaywall);
}
```

## Handle errors

Always handle potential errors when getting paywalls:

```javascript
try {
  const paywalls = await Adapty.getPaywalls();
  console.log('Paywalls loaded:', paywalls.length);
} catch (error) {
  console.error('Failed to get paywalls:', error);
  // Handle error appropriately
}
```

## Cache paywalls

Paywalls are cached locally for offline use:

```javascript
// Get paywalls (will use cache if available)
const paywalls = await Adapty.getPaywalls();

// Force refresh from server
const freshPaywalls = await Adapty.getPaywalls({
  forceUpdate: true
});
```

## Paywall observer

To listen for paywall updates:

```javascript
import { AdaptyPaywallObserver } from 'react-native-adapty';

const observer = new AdaptyPaywallObserver();

observer.on('paywalls_updated', (paywalls) => {
  console.log('Paywalls updated:', paywalls);
});

observer.on('paywalls_loaded', (paywalls) => {
  console.log('Paywalls loaded:', paywalls);
});
``` 