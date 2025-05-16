---
title: "iOS - Handle onboarding events"
description: "Handle onboarding-related events in iOS using Adapty."
metadataTitle: "Handling Onboarding Events in iOS | Adapty Docs"
toc_max_heading_level: 4
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Onboardings configured with the builder generate events your app can respond to. Learn how to respond to these events below.

## Handling events in Swift

Implement the `AdaptyOnboardingControllerDelegate` methods to control or monitor processes occurring on the onboarding screen within your mobile app.

| SwiftUI callback | OnboardingDelegate method  | Description      |
|------------------------------------------|-------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `didFinishLoading`                       | `onboardingController(_:didFinishLoading:)`                 | Called when the onboarding content has finished loading. Use this to handle the moment of hiding the splash screen and showing onboarding to the user.         |
| `onCloseAction`                          | `onboardingController(_:onCloseAction:)`                    | Triggered when the user dispatches the “close” action on the onboarding screen. Use this to manage what happens when onboarding is closed.                     |
| `onOpenPaywallAction`                    | `onboardingController(_:onPaywallAction:)`                  | Called when the user triggers the “Open paywall action. This is useful for showing paywalls or other in-app purchases.                                         |
| `onCustomAction`                         | `onboardingController(_:onCustomAction:)`                   | Triggered by a custom action defined in the onboarding flow. Use this to handle specific events unique to your onboarding experience.                          |
| `onStateUpdatedAction`                   | `onboardingController(_:onStateUpdatedAction:)`             | Called when the state of the user data is updated. This could include changes like option changes or input changes.                                            |
| `onAnalyticsEvent`                       | `onboardingController(_:onAnalyticsEvent:)`                 | Triggered when an analytics event occurs during onboarding. Use this to capture and log user interactions like moving to the next screen or updating progress. |
| `onError`                                | `onboardingController(_:didFailWithError:)`                 | Called when an error occurs during onboarding. Use this to manage errors and provide feedback to the user.                                                     |