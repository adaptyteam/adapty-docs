---
title: "Restore purchases in mobile app"
description: "Learn how to implement the restore purchases feature in your iOS and Android apps using Adapty. Discover the importance of enabling users to regain access to their previously purchased content without additional charges, and explore the simple process of restoring purchases using the .restorePurchases() method."
metadataTitle: "Adapty: How to Restore Purchases on iOS and Android Apps"
---

Restoring Purchases in both iOS and Android is a feature that allows users to regain access to previously purchased content, such as subscriptions or in-app purchases, without being charged again. This feature is especially useful for users who may have uninstalled and reinstalled the app or switched to a new device and want to access their previously purchased content without paying again.

:::note
In paywalls built with [Paywall Builder](paywall-builder-getting-started) purchases are restored automatically without additional code from you. If that's your case — you can skip this step.
:::

To restore a purchase if you do not use the [Paywall Builder](https://docs.adapty.io/v3.0/docs/adapty-paywall-builder) to customize the paywall, call `.restorePurchases()` method:

```swift title="Swift"
Adapty.restorePurchases { [weak self] result in
    switch result {
        case let .success(profile):
            if info.profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
	            // successful access restore
            }
        case let .failure(error):
            // handle the error
    }
}
```
```kotlin title="Kotlin"
Adapty.restorePurchases { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
                      
            if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true) {
            // successful access restore
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java title="Java"
Adapty.restorePurchases(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        
      	if (profile != null) {
            AdaptyProfile.AccessLevel premium = profile.getAccessLevels().get("YOUR_ACCESS_LEVEL");
            
          	if (premium != null && premium.isActive()) {
                // successful access restore
            }
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
```javascript title="Flutter"
try {
  final profile = await Adapty().restorePurchases();
  if (profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive ?? false) {
		// successful access restore      
  }
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp title="Unity"
Adapty.RestorePurchases((profile, error) => {
    if (error != null) {
        // handle the error
      return;
  }
  
  var accessLevel = profile.AccessLevels["YOUR_ACCESS_LEVEL"];
  if (accessLevel != null && accessLevel.IsActive) {
      // restore access
  }
});
```
```typescript title="React Native (TS)"
try {
	const profile = await adapty.restorePurchases();
  const isSubscribed = profile.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;
  
	if (isSubscribed) {
		// restore access
	}
} catch (error) {
	// handle the error
}
```

Response parameters:

| Parameter | Description |
|---------|-----------|
| **Profile** | <p>An [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases.</p><p>Сheck the **access level status** to determine whether the user has access to the app.</p> |