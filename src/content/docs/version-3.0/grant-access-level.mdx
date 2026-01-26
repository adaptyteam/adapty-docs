---
title: "Grant access levels manually"
description: "Unlock paid features manually for specific users or user groups"
metadataTitle: "Guides | API | Adapty"
displayed_sidebar: APISidebar
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZoomImage from '@site/src/components/ZoomImage';

If you need to **manually unlock premium features** for specific users or user groups, you can do it using the Adapty API. This is useful for promotional campaigns, investor access, or special customer support cases.

In this guide, you'll learn how to identify users and grant them access levels programmatically.

#### Sample use cases

- **Promo codes**: When users enter a valid promo code in your app, automatically grant them access to premium features.

- **Investor/beta tester access**: Provide premium access to investors or beta testers by checking their custom attributes.

## Step 1. Identify users

Adapty uses `customer_user_id` to identify users across platforms and devices. This is crucial for ensuring users keep their access after reinstalling the app or switching devices.

You need to create this ID once. When users first sign up from the app, you can pass their customer user ID during SDK activation, or use the `identify` method if the SDK was activated before signup.

:::important
If you identify new users after SDK activation, the SDK will first create an anonymous profile (it can't work without one). When you call `identify` with a customer user ID, a new profile will be created.

This behavior is normal and won't affect analytics accuracy. Read more [here](ios-quickstart-identify.md).
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS" default>
```swift showLineNumbers
do {
    try await Adapty.identify("YOUR_USER_ID") // Unique for each user
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="swift-callback" label="iOS (Swift-Callback)" default>

```swift showLineNumbers
// User IDs must be unique for each user
Adapty.identify("YOUR_USER_ID") { error in
    if let error {
        // handle the error
    }
}
```
</TabItem>
<TabItem value="android" label="Android (Kotlin)" default>
```kotlin showLineNumbers
Adapty.identify("YOUR_USER_ID") { error -> // Unique for each user
    if (error == null) {
        // successful identify
    }
}
```
</TabItem>
<TabItem value="java" label="Android (Java)" default>
```java showLineNumbers
// User IDs must be unique for each user
Adapty.identify("YOUR_USER_ID", error -> {
    if (error == null) {
        // successful identify
    }
});
```
</TabItem>
<TabItem value="react-native" label="React Native" default>
```typescript showLineNumbers
try {
    await adapty.identify("YOUR_USER_ID"); // Unique for each user
    // successfully identified
} catch (error) {
    // handle the error
}
```
</TabItem>

<TabItem value="flutter" label="Flutter" default>
```dart showLineNumbers
try {
  await Adapty().identify(customerUserId); // Unique for each user
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>

<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
Adapty.Identify("YOUR_USER_ID", (error) => { // Unique for each user
  if(error == null) {
    // successful identify
  }
});
```
</TabItem>

<TabItem value="kmp" label="Kotlin Multiplatform" default>
```kotlin showLineNumbers
Adapty.identify("YOUR_USER_ID") // Unique for each user
    .onSuccess {
        // successful identify
    }
    .onError { error ->
        // handle the error
    }
```
</TabItem>

<TabItem value="capacitor" label="Capacitor" default>
```typescript showLineNumbers
try {
  await adapty.identify({ customerUserId: "YOUR_USER_ID" });
  // successfully identified
} catch (error) {
  // handle the error
}
```
</TabItem>
</Tabs>

## Step 2. Grant access level via API

Once a user is identified with a `customer_user_id`, you can grant them access levels using the server-side API. This API call will grant the access level to the user, so they can access paid features without actually paying.

See the full method reference [here](api-adapty#/operations/grantAccessLevel).

:::tip
You can control user access by adding a custom attribute (e.g., Beta tester or Investor) in the Adapty dashboard.
When your app launches, [check this attribute in the user’s profile](subscription-status.md) to grant access automatically.
To update access, just change the attribute in the dashboard.
:::

```curl
curl --request POST \
  --url https://api.adapty.io/api/v2/server-side-api/purchase/profile/grant/access-level/ \
  --header 'Accept: application/json' \
  --header 'Authorization: Api-Key YOUR_SECRET_API_KEY' \
  --header 'Content-Type: application/json' \
  --header 'adapty-customer-user-id: CUSTOMER_USER_ID' \
  --data '{
  "access_level_id": "YOUR_ACCESS_LEVEL"
}'
```

## Step 3. Verify access in the app

After granting access via API, the user's profile will be automatically updated. Fetch their profile to check their subscription status and unlock premium features.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS" default>

```swift showLineNumbers
do {
    let profile = try await Adapty.getProfile()

    if profile.accessLevels["YOUR_ACCESS_LEVEL_ID"]?.isActive ?? false {
        // grant access to premium features
    }
} catch {
// handle the error
}
```

</TabItem>

<TabItem value="swift-callback" label="iOS (Swift-Callback)" default>

```swift showLineNumbers
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
        if profile.accessLevels["YOUR_ACCESS_LEVEL_ID"]?.isActive ?? false {
            // grant access to premium features
        }
    }
}
```

</TabItem>

<TabItem value="android" label="Android (Kotlin)" default>

```kotlin showLineNumbers
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // check the access
            if (profile.accessLevels["YOUR_ACCESS_LEVEL_ID"]?.isActive == true) {
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

<TabItem value="java" label="Android (Java)" default>

```java showLineNumbers
Adapty.getProfile(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // check the access
        if (profile.getAccessLevels().get("YOUR_ACCESS_LEVEL_ID") != null && profile.getAccessLevels().get("YOUR_ACCESS_LEVEL_ID").getIsActive()) {
            // grant access to premium features
        }

    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```

</TabItem>

<TabItem value="react-native" label="React Native" default>

```typescript showLineNumbers
try {
    const profile = await adapty.getProfile();
    // check the access
    if (profile.accessLevels["YOUR_ACCESS_LEVEL_ID"]?.isActive) {
        // grant access to premium features
    }
} catch (error) {
  // handle the error
}
```

</TabItem>

<TabItem value="flutter" label="Flutter" default>

```dart showLineNumbers
try {
  final profile = await Adapty().getProfile();
  // check the access
  if (profile.accessLevels["YOUR_ACCESS_LEVEL_ID"]?.isActive ?? false) {
      // grant access to premium features
  }
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```

</TabItem>

<TabItem value="unity" label="Unity" default>

```csharp showLineNumbers
Adapty.GetProfile((profile, error) => {
  if (error != null) {
    // handle the error
    return;
  }

  // check the access
  if (profile.AccessLevels["YOUR_ACCESS_LEVEL_ID"]?.IsActive ?? false) {
      // grant access to premium features
  }
});
```

</TabItem>

<TabItem value="kmp" label="Kotlin Multiplatform" default>

```kotlin showLineNumbers
Adapty.getProfile()
    .onSuccess { profile ->
        // check the access
        if (profile.accessLevels["YOUR_ACCESS_LEVEL_ID"]?.isActive == true) {
            // grant access to premium features
        }
    }
    .onError { error ->
        // handle the error
    }
```

</TabItem>

<TabItem value="capacitor" label="Capacitor" default>

```typescript showLineNumbers
try {
  const profile = await adapty.getProfile();
  // check the access
  if (profile.accessLevels["YOUR_ACCESS_LEVEL_ID"]?.isActive) {
      // grant access to premium features
  }
} catch (error) {
  // handle the error
}
```

</TabItem>
</Tabs>
