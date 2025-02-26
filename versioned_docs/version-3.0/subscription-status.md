---
title: "Check subscription status"
description: "Track and manage user subscription status in Adapty for improved customer retention."
metadataTitle: "Understanding Subscription Status | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';

With Adapty, keeping track of subscription status is made easy. You don't have to manually insert product IDs into your code. Instead, you can effortlessly confirm a user's subscription status by checking for an active [access level](access-level).

<details>
   <summary>Before you start checking subscription status (Click to Expand)</summary>

   - For iOS, set up [App Store Server Notifications](enable-app-store-server-notifications)
   - For Android, set up [Real-time Developer Notifications (RTDN)](enable-real-time-developer-notifications-rtdn)
</details>

## Access level and the AdaptyProfile object

Access levels are properties of the [AdaptyProfile](sdk-models#adaptyprofile) object. We recommend retrieving the profile when your app starts, such as when you [identify a user](identifying-users#setting-customer-user-id-on-configuration) , and then updating it whenever changes occur. This way, you can use the profile object without repeatedly requesting it.

To be notified of profile updates, listen for profile changes as described in the [Listening for profile updates, including access levels](subscription-status#listening-for-subscription-status-updates) section below.

## Retrieving the access level from the server

To get the access level from the server, use the `.getProfile()` method:

<Tabs groupId="current-os" queryString>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
do {
    let profile = try await Adapty.getProfile()
    
    if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
        // grant access to premium features
    }
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
        profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
            // grant access to premium features
        }
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
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
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
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
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript showLineNumbers
try {
  final profile = await Adapty().getProfile();
  // check the access
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp showLineNumbers
Adapty.GetProfile((profile, error) => {
  if (error != null) {
    // handle the error
    return;
  }
  
  // check the access
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript showLineNumbers
try {
    const profile = await adapty.getProfile();
} catch (error) {
  // handle the error
}
```
</TabItem>
</Tabs>

Response parameters:

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| Profile   | <p>An [AdaptyProfile](sdk-models#adaptyprofile) object. Generally, you have to check only the access level status of the profile to determine whether the user has premium access to the app.</p><p></p><p>The `.getProfile` method provides the most up-to-date result as it always tries to query the API. If for some reason (e.g. no internet connection), the Adapty SDK fails to retrieve information from the server, the data from the cache will be returned. It is also important to note that the Adapty SDK updates `AdaptyProfile` cache regularly, to keep this information as up-to-date as possible.</p> |


The `.getProfile()` method provides you with the user profile from which you can get the access level status. You can have multiple access levels per app. For example, if you have a newspaper app and sell subscriptions to different topics independently, you can create access levels "sports" and "science". But most of the time, you will only need one access level, in that case, you can just use the default "premium" access level.

Here is an example for checking for the default "premium" access level:

<Tabs groupId="current-os" queryString>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
do {
    let profile = try await Adapty.getProfile()
    let isPremium = profile.accessLevels["premium"]?.isActive ?? false
    // grant access to premium features
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift" default>

```swift showLineNumbers
Adapty.getProfile { result in
    if let profile = try? result.get(), 
       profile.accessLevels["premium"]?.isActive ?? false {
        // grant access to premium features
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
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
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
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
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript showLineNumbers
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
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp showLineNumbers
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
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript showLineNumbers
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
</TabItem>
</Tabs>

### Listening for subscription status updates

Whenever the user's subscription changes, Adapty fires an event. 

To receive messages from Adapty, you need to make some additional configuration:

<Tabs groupId="current-os" queryString>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
Adapty.delegate = self

// To receive subscription updates, extend `AdaptyDelegate` with this method:
nonisolated func didLoadLatestProfile(_ profile: AdaptyProfile) {
    // handle any changes to subscription state
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.setOnProfileUpdatedListener { profile ->
    // handle any changes to subscription state
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers t
Adapty.setOnProfileUpdatedListener(profile -> {
    // handle any changes to subscription state
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript showLineNumbers
Adapty().didUpdateProfileStream.listen((profile) {
  // handle any changes to subscription state
});
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp showLineNumbers
// Extend `AdaptyEventListener ` with `OnLoadLatestProfile ` method:
public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
  public void OnLoadLatestProfile(AdaptyProfile profile) {
    // handle any changes to subscription state
  }
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript showLineNumbers
// Create an "onLatestProfileLoad" event listener
adapty.addEventListener('onLatestProfileLoad', profile => {
    // handle any changes to subscription state
});
```
</TabItem>
</Tabs>

Adapty also fires an event at the start of the application. In this case, the cached subscription status will be passed.

### Subscription status cache

The cache implemented in the Adapty SDK stores the subscription status of the profile. This means that even if the server is unavailable, the cached data can be accessed to provide information about the profile's subscription status.

However, it's important to note that direct data requests from the cache are not possible. The SDK periodically queries the server every minute to check for any updates or changes related to the profile. If there are any modifications, such as new transactions or other updates, they will be sent to the cached data in order to keep it synchronized with the server.