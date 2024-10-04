---
title: "Android – Subscription Status"
description: ""
metadataTitle: ""
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

With Adapty you don't have to hardcode product ids to check subscription status. You just have to verify that the user has an active access level. To do this, you have to call `.getProfile()` method:

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
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
```java 
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
</Tabs>




Response parameters:

- **Profile**: an [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases. Generally, you have to check only access level status to determine whether the user has premium access to the app.

:::note
The `.getProfile` method provides the most up-to-date result as it always tries to query the API. If for some reason (e.g. no internet connection), the Adapty SDK fails to retrieve information from the server, the data from cache will be returned. It is also important to note that the Adapty SDK updates Profile cache on a regular basis, in order to keep this information as up-to-date as possible.
:::

Below is a complete example of checking the user's access level.

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

:::note
You can have multiple access levels per app. For example, if you have a newspaper app and sell subscriptions to different topics independently, you can create access levels "sports" and "science". But most of the time, you will only need one access level, in that case, you can just use the default "**premium**" access level.

Read more about access levels in the [Access Level](access-level) section.
:::

### Listening for subscription status updates

You can respond to any changes in the user's subscription by setting an optional `OnProfileUpdatedListener`. The callback will fire whenever we receive a change in profile:

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

:::warning
Make sure to set up [Real-time Developer Notifications (RTDN)](real-time-developer-notifications-rtdn) to receive subscription updates without significant delays.
:::