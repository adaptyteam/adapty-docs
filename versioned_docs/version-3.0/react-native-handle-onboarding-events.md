---
title: "Handle onboarding events"
description: "Learn how to handle onboarding events in your React Native app with Adapty SDK."
metadataTitle: "Handle Onboarding Events | React Native SDK | Adapty Docs"
slug: /react-native-handle-onboarding-events
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Onboarding observer

To handle onboarding events, use the `AdaptyOnboardingObserver`:

```javascript
import { AdaptyOnboardingObserver } from 'react-native-adapty';

const observer = new AdaptyOnboardingObserver();

observer.on('onboarding_presented', (onboarding) => {
  console.log('Onboarding presented:', onboarding.developerId);
});

observer.on('onboarding_dismissed', (onboarding) => {
  console.log('Onboarding dismissed:', onboarding.developerId);
});

observer.on('onboarding_action', (action) => {
  console.log('Onboarding action:', action);
});
```

## Handle onboarding actions

Onboardings can trigger various actions:

```javascript
observer.on('onboarding_action', (action) => {
  switch (action.type) {
    case 'close':
      console.log('User closed onboarding');
      break;
    case 'next':
      console.log('User moved to next screen');
      break;
    case 'previous':
      console.log('User moved to previous screen');
      break;
    case 'purchase':
      console.log('User initiated purchase');
      handlePurchase(action.productId);
      break;
    case 'custom':
      console.log('Custom action:', action.data);
      handleCustomAction(action.data);
      break;
  }
});
```

## Track onboarding progress

Track user progress through onboarding:

```javascript
observer.on('onboarding_action', (action) => {
  if (action.type === 'next') {
    console.log('User completed screen:', action.screenIndex);
    
    // Track analytics
    trackOnboardingProgress(action.onboardingId, action.screenIndex);
  }
});
```

## Handle onboarding completion

When user completes onboarding:

```javascript
observer.on('onboarding_action', (action) => {
  if (action.type === 'close' && action.isCompleted) {
    console.log('Onboarding completed');
    
    // Mark onboarding as completed
    markOnboardingAsCompleted(action.onboardingId);
    
    // Show main app content
    showMainApp();
  }
});
```

## Custom onboarding actions

Handle custom actions defined in your onboarding:

```javascript
observer.on('onboarding_action', (action) => {
  if (action.type === 'custom') {
    switch (action.data.action) {
      case 'open_settings':
        openAppSettings();
        break;
      case 'contact_support':
        openSupportChat();
        break;
      case 'skip_onboarding':
        skipOnboarding();
        break;
      default:
        console.log('Unknown custom action:', action.data);
    }
  }
});
```

## Onboarding state management

Manage onboarding state in your app:

```javascript
const [currentOnboarding, setCurrentOnboarding] = useState(null);
const [onboardingProgress, setOnboardingProgress] = useState({});

observer.on('onboarding_presented', (onboarding) => {
  setCurrentOnboarding(onboarding);
  setOnboardingProgress({
    ...onboardingProgress,
    [onboarding.developerId]: { currentScreen: 0, completed: false }
  });
});

observer.on('onboarding_action', (action) => {
  if (action.type === 'next' && currentOnboarding) {
    setOnboardingProgress(prev => ({
      ...prev,
      [currentOnboarding.developerId]: {
        currentScreen: action.screenIndex + 1,
        completed: false
      }
    }));
  }
  
  if (action.type === 'close' && action.isCompleted) {
    setOnboardingProgress(prev => ({
      ...prev,
      [currentOnboarding.developerId]: {
        ...prev[currentOnboarding.developerId],
        completed: true
      }
    }));
    setCurrentOnboarding(null);
  }
});
```

## Error handling

Handle onboarding errors:

```javascript
observer.on('onboarding_error', (error) => {
  console.error('Onboarding error:', error);
  
  switch (error.code) {
    case 'LOAD_ERROR':
      console.log('Failed to load onboarding');
      showFallbackOnboarding();
      break;
    case 'PRESENTATION_ERROR':
      console.log('Failed to present onboarding');
      break;
    default:
      console.log('Unknown onboarding error:', error);
  }
});
```

## Clean up observer

Don't forget to clean up the observer:

```javascript
// In React component
useEffect(() => {
  const observer = new AdaptyOnboardingObserver();
  
  observer.on('onboarding_action', handleOnboardingAction);
  observer.on('onboarding_presented', handleOnboardingPresented);
  observer.on('onboarding_dismissed', handleOnboardingDismissed);
  
  return () => {
    observer.off('onboarding_action', handleOnboardingAction);
    observer.off('onboarding_presented', handleOnboardingPresented);
    observer.off('onboarding_dismissed', handleOnboardingDismissed);
  };
}, []);
``` 