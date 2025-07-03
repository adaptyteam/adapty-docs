---
title: "Migration guide to React Native Adapty SDK 3.8.0"
description: "Learn how to migrate to React Native Adapty SDK 3.8.0."
metadataTitle: "Migration Guide to React Native SDK 3.8.0 | Adapty Docs"
slug: /react-native-migration-guide-380
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Migration to React Native Adapty SDK 3.8.0

This guide helps you migrate from older versions to React Native Adapty SDK 3.8.0.

### Breaking Changes

#### Updated Observer API

The observer API has been updated for better performance:

```javascript
// Old way
const observer = new AdaptyProfileObserver();
observer.addListener('profile_updated', callback);

// New way
const observer = new AdaptyProfileObserver();
observer.on('profile_updated', callback);
```

#### Changed Paywall Presentation

Paywall presentation methods have been updated:

```javascript
// Old way
await Adapty.presentPaywall(paywall, { observerMode: true });

// New way
await Adapty.presentPaywall(paywall);
```

#### Modified Error Handling

Error handling structure has been improved:

```javascript
// Old way
try {
  await Adapty.makePurchase(product);
} catch (error) {
  console.log(error.message);
}

// New way
try {
  await Adapty.makePurchase(product);
} catch (error) {
  console.log(error.code, error.message);
}
```

### Migration Steps

1. **Update package version:**
```bash
npm install react-native-adapty@3.8.0
```

2. **Update observer usage:**
   - Replace `addListener` with `on`
   - Replace `removeListener` with `off`

3. **Update paywall presentation:**
   - Remove `observerMode` parameter
   - Use new event handling

4. **Update error handling:**
   - Use new error structure
   - Handle specific error codes

5. **Test thoroughly:**
   - Test all purchase flows
   - Test paywall presentation
   - Test subscription status checking

### New Features

- Enhanced paywall presentation
- Improved error handling
- Better TypeScript support
- Performance optimizations 