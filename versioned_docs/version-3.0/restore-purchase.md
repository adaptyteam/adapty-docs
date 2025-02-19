---
title: "Restore purchases in mobile app"
description: "Learn how to restore purchases in Adapty to ensure seamless user experience."
metadataTitle: "Restoring Purchases in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Restoring Purchases in both iOS and Android is a feature that allows users to regain access to previously purchased content, such as subscriptions or in-app purchases, without being charged again. This feature is especially useful for users who may have uninstalled and reinstalled the app or switched to a new device and want to access their previously purchased content without paying again.

:::note
In paywalls built with [Paywall Builder](adapty-paywall-builder), purchases are restored automatically without additional code from you. If that's your case — you can skip this step.
:::

To restore a purchase if you do not use the [Paywall Builder](adapty-paywall-builder) to customize the paywall, call `.restorePurchases()` method:

<Tabs>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
do {
    let profile = try await Adapty.restorePurchases()
    if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
        // successful access restore
    }
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.restorePurchases { [weak self] result in
    switch result {
        case let .success(profile):
            if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
                // successful access restore
            }
        case let .failure(error):
            // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
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
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
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
</TabItem>
<TabItem value="Flutter" label="Flutter" default>

```javascript showLineNumbers
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
</TabItem>
<TabItem value="Unity" label="Unity" default>

```csharp showLineNumbers
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
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript showLineNumbers
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
</TabItem>
</Tabs>

Response parameters:

| Parameter | Description |
|---------|-----------|
| **Profile** | <p>An [`AdaptyProfile`](sdk-models#adaptyprofile) object. This model contains info about access levels, subscriptions, and non-subscription purchases.</p><p>Сheck the **access level status** to determine whether the user has access to the app.</p> |

<SampleApp />