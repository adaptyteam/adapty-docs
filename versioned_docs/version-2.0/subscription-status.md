---
title: "Check subscription status"
description: "Easily check subscription status by retrieving active access levels from the AdaptyProfile object in Adapty. Stay updated on changes made in it"
metadataTitle: "Check Subscription Status with AdaptyProfile Access Levels"
---

Adapty makes it easy to track subscription status without needing to manually input product IDs into your code. Instead, you can simply check for an active [access level](access-level) to confirm a user's subscription status.

You can create multiple access levels for a single app. For example, in a newspaper app, you might sell subscriptions to different topics like "sports" and "science." However, most apps only require one access level. If that’s the case for your app, you can use the default "premium" access level.

Once you determine the user's subscription status (access level), you can grant access to the appropriate features in your app.

<details>
   <summary>Before you start checking subscription status (Click to Expand)</summary>

   - For iOS, set up [App Store Server Notifications](app-store-server-notifications)
   - For Android, set up [Real-time Developer Notifications (RTDN)](real-time-developer-notifications-rtdn)
</details>

## Access level and the AdaptyProfile object

Access levels are properties of the [AdaptyProfile](sdk-models#adaptyprofile) object. We recommend retrieving the profile when your app starts, such as when you [identify a user](identifying-users#setting-customer-user-id-on-configuration) , and then updating it whenever changes occur. This way, you can use the profile object without repeatedly requesting it.

To be notified of profile updates, listen for profile changes as described in the [Listening for profile updates, including access levels](subscription-status#listening-for-profile-updates-including-access-levels) section below.

## Retrieving the access level from the server

To get the access level from the server, use the `.getProfile()` method:

```swift title="Swift"
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
      	profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
        	// grant access to premium features
        }
    }
}
```
```kotlin title="Kotlin"
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // check the access
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
```java title="Java"
Adapty.getProfile(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // check the access
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
```javascript title="Flutter"
try {
  final profile = await Adapty().getProfile();
  // check the access
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp title="Unity"
Adapty.GetProfile((profile, error) => {
  if (error != null) {
    // handle the error
    return;
  }
  
  // check the access
});
```
```typescript title="React Native (TS)"
try {
	const profile = await adapty.getProfile();
} catch (error) {
  // handle the error
}
```

Response parameters:

| Parameter   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Profile** | An [AdaptyProfile](sdk-models#adaptyprofile) object. You generally need to check only the access level status of the profile to determine if the user has premium access to the app. The `.getProfile` method provides the most up-to-date result by querying the API. If the Adapty SDK fails to retrieve information due to reasons like no internet connection, cached data will be returned. The Adapty SDK regularly updates the `AdaptyProfile` cache to keep the information as current as possible. |

## Example: Checking the default "premium" access level

```swift title="Swift"
Adapty.getProfile { result in
    if let profile = try? result.get(), 
       profile.accessLevels["premium"]?.isActive ?? false {
        // grant access to premium features
    }
}
```
```kotlin title="Kotlin"
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            
            if (profile.accessLevels["premium"]?.isActive == true) {
                // grant access to premium features
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
Adapty.getProfile(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        
      	AdaptyProfile.AccessLevel premium = profile.getAccessLevels().get("premium");
        
      	if (premium != null && premium.isActive()) {
            // grant access to premium features
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
```javascript title="Flutter"
try {
  final profile = await Adapty().getProfile();
  if (profile?.accessLevels['premium']?.isActive ?? false) {
		// grant access to premium features
	}
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```csharp title="Unity"
Adapty.GetProfile((profile, error) => {
  if (error != null) {
    // handle the error
    return;
  }

  // "premium" is an identifier of default access level
  var accessLevel = profile.AccessLevels["premium"];
  if (accessLevel != null && accessLevel.IsActive) {
    // grant access to premium features
  }
});
```
```typescript title="React Native (TS)"
try {
	const profile = await adapty.getProfile();
	
  const isActive = profile.accessLevels["premium"]?.isActive;
	if (isActive) {
		// grant access to premium features
	}
} catch (error) {
	// handle the error
}
```

## Listening for profile updates, including access levels

Adapty fires an event whenever the user’s profile is updated.

To receive profile updates, including changes to subscription status (access levels), follow these steps:

```swift title="Swift"
Adapty.delegate = self

// To receive user profile updates, extend `AdaptyDelegate` with this method:
func didLoadLatestProfile(_ profile: AdaptyProfile) {
    // handle any changes to user profile
}
```
```kotlin title="Kotlin"
Adapty.setOnProfileUpdatedListener { profile ->
    // handle any changes to user profile
}
```
```java title="Java"
Adapty.setOnProfileUpdatedListener(profile -> {
    // handle any changes to user profile
});
```
```javascript title="Flutter"
Adapty().didUpdateProfileStream.listen((profile) {
  // handle any changes to user profile
});
```
```csharp title="Unity"
// Extend `AdaptyEventListener ` with `OnLoadLatestProfile ` method:
public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
  public void OnLoadLatestProfile(Adapty.Profile profile) {
    // handle any changes to suser profile
  }
}
```
```typescript title="React Native (TS)"
// Create an "onLatestProfileLoad" event listener
adapty.addEventListener('onLatestProfileLoad', profile => {
	// handle any changes to user profile
});
```

Adapty also triggers an event when the application starts. In this case, the cached profile will be returned.

## Caching profile including access level

The Adapty SDK includes a cache that stores the user profile and access level as a part of it. This ensures that even if the server is unavailable, you can still access the profile’s subscription status. However, note that you cannot directly request data from the cache. The SDK regularly queries the server every minute to check for updates or changes related to the profile. Any modifications, such as new transactions, will be synced with the cached data to keep it aligned with the server