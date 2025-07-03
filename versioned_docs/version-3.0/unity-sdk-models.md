---
title: "SDK models"
description: "Data models and types for Unity Adapty SDK."
metadataTitle: "SDK Models | Unity SDK | Adapty Docs"
slug: /unity-sdk-models
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Core Models

### AdaptyProfile

Represents a user profile with subscription information.

```csharp
public class AdaptyProfile {
    public string ProfileId;
    public string Email;
    public string PhoneNumber;
    public string FirstName;
    public string LastName;
    public string Birthday;
    public string Gender;
    public Dictionary<string, object> CustomAttributes;
    public Dictionary<string, AdaptyAccessLevel> AccessLevels;
    public List<AdaptySubscription> Subscriptions;
    public List<AdaptyNonSubscription> NonSubscriptions;
}
```

### AdaptyAccessLevel

Represents an access level with subscription status.

```csharp
public class AdaptyAccessLevel {
    public string Id;
    public bool IsActive;
    public string VendorProductId;
    public string Store;
    public string ActivatedAt;
    public string RenewedAt;
    public string ExpiresAt;
    public bool IsLifetime;
    public bool IsInGracePeriod;
    public bool WillRenew;
    public bool IsRefund;
    public bool IsActiveIntroductoryOffer;
    public bool IsActivePromotionalOffer;
    public bool IsActiveOffer;
    public string IntroductoryOfferEligibility;
    public string PromotionalOfferEligibility;
    public string OfferId;
    public string RevocationDate;
    public string CancellationReason;
}
```

### AdaptySubscription

Represents a subscription purchase.

```csharp
public class AdaptySubscription {
    public string PurchaseId;
    public string VendorProductId;
    public string Store;
    public string PurchaseDate;
    public string ExpiresDate;
    public bool IsActive;
    public bool IsLifetime;
    public bool IsInGracePeriod;
    public bool WillRenew;
    public bool IsRefund;
    public bool IsActiveIntroductoryOffer;
    public bool IsActivePromotionalOffer;
    public bool IsActiveOffer;
    public string IntroductoryOfferEligibility;
    public string PromotionalOfferEligibility;
    public string OfferId;
    public string RevocationDate;
    public string CancellationReason;
}
```

### AdaptyPaywall

Represents a paywall with products and visual content.

```csharp
public class AdaptyPaywall {
    public string DeveloperId;
    public string Name;
    public int Revision;
    public bool IsPromo;
    public bool IsPersonalized;
    public List<AdaptyProduct> Products;
    public AdaptyVisualPaywall VisualPaywall;
}
```

### AdaptyProduct

Represents a product available for purchase.

```csharp
public class AdaptyProduct {
    public string VendorProductId;
    public string LocalizedTitle;
    public string LocalizedDescription;
    public string LocalizedPrice;
    public double Price;
    public string CurrencyCode;
    public string CurrencySymbol;
    public string RegionCode;
    public AdaptyProductDiscount IntroductoryOffer;
    public AdaptyProductDiscount PromotionalOffer;
    public string SubscriptionPeriod;
    public string SubscriptionGroupIdentifier;
    public bool IsLifetime;
    public bool IsConsumable;
}
```

### AdaptyOnboarding

Represents an onboarding flow.

```csharp
public class AdaptyOnboarding {
    public string DeveloperId;
    public string Name;
    public int Revision;
    public bool IsActive;
    public List<AdaptyOnboardingScreen> Screens;
    public AdaptyVisualOnboarding VisualOnboarding;
}
```

### AdaptyOnboardingScreen

Represents a screen in an onboarding flow.

```csharp
public class AdaptyOnboardingScreen {
    public string Id;
    public string Title;
    public string Subtitle;
    public string ImageUrl;
    public string VideoUrl;
    public List<AdaptyOnboardingAction> Actions;
}
```

### AdaptyOnboardingAction

Represents an action in an onboarding screen.

```csharp
public class AdaptyOnboardingAction {
    public string Id;
    public string Title;
    public string Type;
    public string Url;
    public string ProductId;
    public Dictionary<string, object> Data;
}
```

## Configuration Types

### AdaptyConfig

```csharp
public class AdaptyConfig {
    public string ApiKey;
    public bool ObserverMode;
    public bool EnableAnalytics;
    public bool EnableLogs;
    public string LogLevel;
}
```

### AdaptyProfileParameters

```csharp
public class AdaptyProfileParameters {
    public string Email;
    public string PhoneNumber;
    public string FirstName;
    public string LastName;
    public string Birthday;
    public string Gender;
    public Dictionary<string, object> CustomAttributes;
} 