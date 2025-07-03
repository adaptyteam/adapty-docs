---
title: "SDK models"
description: "Data models and types for React Native Adapty SDK."
metadataTitle: "SDK Models | React Native SDK | Adapty Docs"
slug: /react-native-sdk-models
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Core Models

### AdaptyProfile

Represents a user profile with subscription information.

```typescript
interface AdaptyProfile {
  profileId: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  gender?: string;
  customAttributes?: Record<string, any>;
  accessLevels: Record<string, AdaptyAccessLevel>;
  subscriptions: AdaptySubscription[];
  nonSubscriptions: AdaptyNonSubscription[];
}
```

### AdaptyAccessLevel

Represents an access level with subscription status.

```typescript
interface AdaptyAccessLevel {
  id: string;
  isActive: boolean;
  vendorProductId: string;
  store: string;
  activatedAt: string;
  renewedAt?: string;
  expiresAt?: string;
  isLifetime: boolean;
  isInGracePeriod: boolean;
  willRenew: boolean;
  isRefund: boolean;
  isActiveIntroductoryOffer: boolean;
  isActivePromotionalOffer: boolean;
  isActiveOffer: boolean;
  introductoryOfferEligibility: string;
  promotionalOfferEligibility: string;
  offerId?: string;
  revocationDate?: string;
  cancellationReason?: string;
}
```

### AdaptySubscription

Represents a subscription purchase.

```typescript
interface AdaptySubscription {
  purchaseId: string;
  vendorProductId: string;
  store: string;
  purchaseDate: string;
  expiresDate?: string;
  isActive: boolean;
  isLifetime: boolean;
  isInGracePeriod: boolean;
  willRenew: boolean;
  isRefund: boolean;
  isActiveIntroductoryOffer: boolean;
  isActivePromotionalOffer: boolean;
  isActiveOffer: boolean;
  introductoryOfferEligibility: string;
  promotionalOfferEligibility: string;
  offerId?: string;
  revocationDate?: string;
  cancellationReason?: string;
}
```

### AdaptyPaywall

Represents a paywall with products and visual content.

```typescript
interface AdaptyPaywall {
  developerId: string;
  name: string;
  revision: number;
  isPromo: boolean;
  isPersonalized: boolean;
  products: AdaptyProduct[];
  visualPaywall?: AdaptyVisualPaywall;
}
```

### AdaptyProduct

Represents a product available for purchase.

```typescript
interface AdaptyProduct {
  vendorProductId: string;
  localizedTitle: string;
  localizedDescription: string;
  localizedPrice: string;
  price: number;
  currencyCode: string;
  currencySymbol: string;
  regionCode: string;
  introductoryOffer?: AdaptyProductDiscount;
  promotionalOffer?: AdaptyProductDiscount;
  subscriptionPeriod?: string;
  subscriptionGroupIdentifier?: string;
  isLifetime: boolean;
  isConsumable: boolean;
}
```

### AdaptyOnboarding

Represents an onboarding flow.

```typescript
interface AdaptyOnboarding {
  developerId: string;
  name: string;
  revision: number;
  isActive: boolean;
  screens: AdaptyOnboardingScreen[];
  visualOnboarding?: AdaptyVisualOnboarding;
}
```

### AdaptyOnboardingScreen

Represents a screen in an onboarding flow.

```typescript
interface AdaptyOnboardingScreen {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  videoUrl?: string;
  actions: AdaptyOnboardingAction[];
}
```

### AdaptyOnboardingAction

Represents an action in an onboarding screen.

```typescript
interface AdaptyOnboardingAction {
  id: string;
  title: string;
  type: string;
  url?: string;
  productId?: string;
  data?: Record<string, any>;
}
```

## Observer Types

### AdaptyProfileObserver

```typescript
class AdaptyProfileObserver {
  on(event: 'profile_updated', callback: (profile: AdaptyProfile) => void): void;
  on(event: 'profile_loaded', callback: (profile: AdaptyProfile) => void): void;
  off(event: string, callback: Function): void;
}
```

### AdaptyPaywallObserver

```typescript
class AdaptyPaywallObserver {
  on(event: 'paywalls_updated', callback: (paywalls: AdaptyPaywall[]) => void): void;
  on(event: 'paywalls_loaded', callback: (paywalls: AdaptyPaywall[]) => void): void;
  on(event: 'paywall_presented', callback: (paywall: AdaptyPaywall) => void): void;
  on(event: 'paywall_dismissed', callback: (paywall: AdaptyPaywall) => void): void;
  off(event: string, callback: Function): void;
}
```

### AdaptyOnboardingObserver

```typescript
class AdaptyOnboardingObserver {
  on(event: 'onboardings_updated', callback: (onboardings: AdaptyOnboarding[]) => void): void;
  on(event: 'onboardings_loaded', callback: (onboardings: AdaptyOnboarding[]) => void): void;
  on(event: 'onboarding_presented', callback: (onboarding: AdaptyOnboarding) => void): void;
  on(event: 'onboarding_dismissed', callback: (onboarding: AdaptyOnboarding) => void): void;
  on(event: 'onboarding_action', callback: (action: AdaptyOnboardingAction) => void): void;
  off(event: string, callback: Function): void;
}
```

## Configuration Types

### AdaptyConfig

```typescript
interface AdaptyConfig {
  apiKey: string;
  observerMode?: boolean;
  enableAnalytics?: boolean;
  enableLogs?: boolean;
  logLevel?: string;
}
```

### AdaptyProfileParameters

```typescript
interface AdaptyProfileParameters {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  gender?: string;
  customAttributes?: Record<string, any>;
}
``` 