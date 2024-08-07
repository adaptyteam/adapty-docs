---
title: "Check subscription status"
description: ""
metadataTitle: ""
---

With Adapty, keeping track of subscription status is made easy. You don't have to manually insert product IDs into your code. Instead, you can effortlessly confirm a user's subscription status by checking for an active [access level](access-level).

<details>
   <summary>Before you start checking subscription status (Click to Expand)</summary>

   - For iOS, set up [App Store Server Notifications](app-store-server-notifications)
- For Android, set up [Real-time Developer Notifications (RTDN)](real-time-developer-notifications-rtdn)
</details>

To do this, call `.getProfile()` method:

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

| Parameter |  |
|---------||
| **Profile** | <p>An [AdaptyProfile](sdk-models#adaptyprofile) object. Generally, you have to check only the access level status of the profile to determine whether the user has premium access to the app.</p><p></p><p>The `.getProfile` method provides the most up-to-date result as it always tries to query the API. If for some reason (e.g. no internet connection), the Adapty SDK fails to retrieve information from the server, the data from the cache will be returned. It is also important to note that the Adapty SDK updates `AdaptyProfile` cache regularly, to keep this information as up-to-date as possible.</p> |


The `.getProfile()` method provides you with the user profile from which you can get the access level status. You can have multiple access levels per app. For example, if you have a newspaper app and sell subscriptions to different topics independently, you can create access levels "sports" and "science". But most of the time, you will only need one access level, in that case, you can just use the default "premium" access level.

Here is an example for checking for the default "premium" access level:

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

### Listening for subscription status updates

Whenever the user's subscription changes, Adapty fires an event. 

To receive messages from Adapty, you need to make some additional configuration:

```swift title="Swift"
Adapty.delegate = self

// To receive subscription updates, extend `AdaptyDelegate` with this method:
func didLoadLatestProfile(_ profile: AdaptyProfile) {
    // handle any changes to subscription state
}
```
```kotlin title="Kotlin"
Adapty.setOnProfileUpdatedListener { profile ->
    // handle any changes to subscription state
}
```
```java title="Java"
Adapty.setOnProfileUpdatedListener(profile -> {
    // handle any changes to subscription state
});
```
```javascript title="Flutter"
Adapty().didUpdateProfileStream.listen((profile) {
  // handle any changes to subscription state
});
```
```csharp title="Unity"
// Extend `AdaptyEventListener ` with `OnLoadLatestProfile ` method:
public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
  public void OnLoadLatestProfile(Adapty.Profile profile) {
    // handle any changes to subscription state
  }
}
```
```typescript title="React Native (TS)"
// Create an "onLatestProfileLoad" event listener
adapty.addEventListener('onLatestProfileLoad', profile => {
	// handle any changes to subscription state
});
```

Adapty also fires an event at the start of the application. In this case, the cached subscription status will be passed.

### Subscription status cache

The cache implemented in the Adapty SDK stores the subscription status of the profile. This means that even if the server is unavailable, the cached data can be accessed to provide information about the profile's subscription status.

However, it's important to note that direct data requests from the cache are not possible. The SDK periodically queries the server every minute to check for any updates or changes related to the profile. If there are any modifications, such as new transactions or other updates, they will be sent to the cached data in order to keep it synchronized with the server.