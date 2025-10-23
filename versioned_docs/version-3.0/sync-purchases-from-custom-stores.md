---
title: "Sync transactions from custom stores"
description: "Sync transactions from custom stores to Adapty to provide access and track revenue."
metadataTitle: "Guides | API | Adapty"
displayed_sidebar: APISidebar
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you're selling subscriptions or in-app purchases through **custom stores** like Amazon Appstore, Microsoft Store, or your own payment platform, you can sync those transactions with Adapty to automatically manage access levels and track revenue in your analytics.

In this guide, you'll learn how to connect custom store purchases with Adapty using the SDK and API.

#### Sample use case

Let's say you're distributing your app on Amazon Appstore, or you've built your own web store for direct purchases. When a user completes a purchase through these platforms, you want to:
- Automatically grant them access to premium features in your mobile app
- Track the transaction in Adapty analytics alongside your App Store and Google Play revenue
- Trigger integrations and webhooks just like any other subscription

That's what this integration helps you achieve.

## Step 1. Identify users

Adapty uses `customer_user_id` to identify users across platforms.

You should create this ID once and pass it to both your mobile SDK and web backend. When your users first sign up from the app, you can pass their customer user ID during the SDK activation, or if you have activated the Adapty SDK before the signup stage, use the `identify` method to create a new profile and assign it a customer user ID.

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

## Step 2. Create a custom store in Adapty Dashboard

Before you can sync transactions, you need to set up a custom store in the Adapty Dashboard.

1. Go to [**App Settings → General**](https://app.adapty.io/settings/general) in the Adapty Dashboard.
2. In the **Stores** section, click **Add Store**.
3. Select **Custom store** from the list.
4. Give your store a name (e.g., "Amazon Appstore", "Microsoft Store", or "Web Store").
5. Save the store.

Once created, you'll use this store when syncing transactions via API. Make sure to note the store name—you'll need it in Step 3.

## Step 3. Create products in your custom store

After creating your custom store, you need to add products to it so Adapty can match transactions to the correct items.

1. In the Adapty Dashboard, navigate to [**Products & Paywalls → Products**](https://app.adapty.io/products).
2. Click **Add Product**.
3. Fill in the product details:
   - **Product ID**: This should match the product identifier from your custom store (e.g., Amazon product ID)
   - **Store**: Select the custom store you created in Step 2
   - **Access Level**: Choose which access level this product grants
   - **Duration**: Set the subscription duration (if applicable)
4. Save the product.

Repeat this for each product you sell through your custom store.

## Step 4. Sync transactions via API

When a purchase is completed in your custom store, you need to validate it on your backend and then sync it to Adapty using the Set Transaction API.

This API call will:
- Record the transaction in Adapty
- Grant the corresponding access level to the user
- Trigger any integrations and webhooks you've configured
- Make the transaction appear in your analytics

See the full method reference [here](api-adapty#/operations/setTransaction).

```curl
curl --request POST \
  --url https://api.adapty.io/api/v2/server-side-api/purchase/profile/transaction/ \
  --header 'Accept: application/json' \
  --header 'Authorization: Api-Key YOUR_SECRET_API_KEY' \
  --header 'Content-Type: application/json' \
  --header 'adapty-customer-user-id: YOUR_USER_ID' \
  --data '{
  "store": "YOUR_CUSTOM_STORE_NAME",
  "product_id": "YOUR_PRODUCT_ID",
  "transaction_id": "UNIQUE_TRANSACTION_ID",
  "purchased_at": "2024-01-15T10:30:00Z",
  "price": 9.99,
  "currency": "USD"
}'
```

:::important Required parameters
- **store**: The exact name of your custom store from Step 2
- **product_id**: The product ID you configured in Step 3
- **transaction_id**: A unique identifier for this transaction (must be unique per user)
- **purchased_at**: ISO 8601 timestamp when the purchase occurred
- **price**: The amount paid by the user
- **currency**: Three-letter ISO currency code (e.g., USD, EUR, GBP)
:::

## Step 5. Verify access in the app

Once the transaction is synced, the user's profile will be automatically updated with the new access level.

When the user opens your mobile app, fetch their profile to check their subscription status and unlock premium features.

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