---
title: "Sync purchases between web and mobile"
description: "Sync subscribers on web and mobile."
metadataTitle: "Guides | API | Adapty"
displayed_sidebar: APISidebar
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If your users can purchase a product on your **website**, you can keep their access levels automatically synced with your **mobile app**.

In this guide, you will learn how to do it using the Adapty API and SDK.

#### Sample use case

Let's say, in your app, sers can sign up for a freemium plan on both mobile and web. You allow them to upgrade to a Premium plan on your website via Stripe or Chargebee.
Once a user subscribes on the web, you want them to immediately get Premium access in the mobile app — without waiting or re-logging.

That’s what Adapty helps you automate.

## Step 1. Identify users

Adapty uses `customer_user_id` to identify users across platforms.

You should create this ID once and pass it to both your mobile SDK and web backend. 

### Sign up from web

When your users sign up on your website, you need to create a profile for them in Adapty using the server-side API.

See the method reference [here](api-adapty#/operations/createProfile).

```curl
curl --request POST \
  --url https://api.adapty.io/api/v2/server-side-api/profile/ \
  --header 'Accept: application/json' \
  --header 'Authorization: Api-Key YOUR_SECRET_API_KEY' \
  --header 'Content-Type: application/json' \
  --header 'adapty-customer-user-id: YOUR_CUSTOMER_USER_ID'
```

### Sign up from app

When your users first sign up from the app, you can pass their customer user ID during the SDK activation, or if you have activated the Adapty SDK before the signup stage, use the `identify` method to create a new profile and assign it a customer user ID.

:::important
If you identify new users after the SDK activation, first, the SDK will create an anonymous profile, as it can't work without any profile at all. Next, when you identify the user and assign them a new customer user ID, a new profile will be created.

This behavior is completely normal, and it won't affect the analytics accuracy. Read more [here](ios-quickstart-identify.md ).
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

## Step 2. Check subscription status via API

When a user logs in on your website, fetch their Adapty profile using the API.

If the user doesn’t have an active subscription, you can display a paywall.

See the method reference [here](api-adapty#/operations/getProfile).

```curl
curl --request GET \
  --url https://api.adapty.io/api/v2/server-side-api/profile/ \
  --header 'Accept: application/json' \
  --header 'Authorization: Api-Key YOUR_SECRET_API_KEY' \
  --header 'adapty-customer-user-id: YOUR_USER_ID' \
```

## Step 3. Display a paywall on your website

On your website, show a paywall for freemium users.
You can use any payment provider (Stripe, Chargebee, LemonSqueezy, etc.).

## Step 4. Update subscription status in Adapty

After the payment is completed on your website, call Adapty API to update the user’s access level according to the product they bought.

See the method reference [here](api-adapty#/operations/grantAccessLevel).

```curl
curl --request POST \
  --url https://api.adapty.io/api/v2/server-side-api/purchase/profile/grant/access-level/ \
  --header 'Accept: application/json' \
  --header 'Authorization: Api-Key YOUR_SECRET_API_KEY' \
  --header 'Content-Type: application/json' \
  --header 'adapty-customer-user-id: YOUR_USER_ID' \
  --data '{
  "access_level_id": "YOUR_ACCESS_LEVEL"
}'
```

## Step 5. Sync status in the app

When the user opens your mobile app, pull the updated profile and unlock paid features.

You need to either get their profile or sync it automatically. Then, get the access level from it.

Below, you see how to get the profile and check its status. For more details, go [here](ios-check-subscription-status.md).

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS" default>

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

<TabItem value="swift-callback" label="iOS (Swift-Callback)" default>

```swift showLineNumbers
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
        if profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
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
            if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true) {
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
        if (profile.getAccessLevels().get("YOUR_ACCESS_LEVEL") != null && profile.getAccessLevels().get("YOUR_ACCESS_LEVEL").getIsActive()) {
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
    if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive) {
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
  if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false) {
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
  if (profile.AccessLevels["YOUR_ACCESS_LEVEL"]?.IsActive ?? false) {
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
        if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive == true) {
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
  if (profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive) {
      // grant access to premium features
  }
} catch (error) {
  // handle the error
}
```

</TabItem>
</Tabs>