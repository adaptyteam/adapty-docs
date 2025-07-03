---
title: "Listen for subscription status changes"
description: "Learn how to implement real-time subscription status monitoring in your Flutter app."
metadataTitle: "Listen for Subscription Changes | Adapty Docs"
slug: /flutter-listen-subscription-changes
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty provides real-time subscription status monitoring through profile observers. This allows your Flutter app to react immediately to subscription changes, such as purchases, renewals, or cancellations.

## Implementing Profile Observer

Here's how to implement a profile observer in your Flutter app:

```dart showLineNumbers
// Add observer
final observer = Adapty().addProfileObserver((profile) {
  if (profile.accessLevels['premium']?.isActive ?? false) {
    // User's subscription is active
    // Update UI or enable features
  } else {
    // User's subscription is inactive
    // Update UI or restrict features
  }
});

// Remove observer when no longer needed
observer.remove();
```

## Best Practices

1. **Add Observer Early**: Set up the observer when your app launches
2. **Handle All States**: Consider all possible subscription states
3. **Update UI**: Refresh your app's UI when subscription status changes
4. **Clean Up**: Remove observers when they're no longer needed

## Common Use Cases

- Updating premium feature access in real-time
- Showing/hiding premium content
- Displaying subscription expiration warnings
- Handling trial period transitions

For more detailed information about subscription management, check out our [complete subscription status guide](flutter-subscription-status). 