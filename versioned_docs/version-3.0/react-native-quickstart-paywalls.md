---
title: "Present a paywall"
description: "Learn how to present paywalls in your React Native app with Adapty SDK."
metadataTitle: "Present a Paywall | React Native SDK | Adapty Docs"
slug: /react-native-quickstart-paywalls
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Get paywalls

To get available paywalls:

```javascript
import { Adapty } from 'react-native-adapty';

const paywalls = await Adapty.getPaywalls();
console.log('Available paywalls:', paywalls);
```

## Present paywall

To present a paywall to the user:

```javascript
// Get paywalls first
const paywalls = await Adapty.getPaywalls();

// Present the first paywall
if (paywalls.length > 0) {
  const paywall = paywalls[0];
  await Adapty.presentPaywall(paywall);
}
```

## Handle paywall presentation

You can also handle the paywall presentation manually:

```javascript
const paywalls = await Adapty.getPaywalls();

if (paywalls.length > 0) {
  const paywall = paywalls[0];
  
  // Show your custom UI with paywall data
  // Then handle purchase when user taps buy
  const purchase = await Adapty.makePurchase(paywall.products[0]);
  console.log('Purchase successful:', purchase);
}
```

## Paywall observer

To listen for paywall presentation events:

```javascript
import { AdaptyPaywallObserver } from 'react-native-adapty';

const observer = new AdaptyPaywallObserver();

observer.on('paywall_presented', (paywall) => {
  console.log('Paywall presented:', paywall);
});

observer.on('paywall_dismissed', (paywall) => {
  console.log('Paywall dismissed:', paywall);
});
``` 