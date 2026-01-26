---
title: "Sync transactions from custom stores"
description: "Sync transactions from custom stores to Adapty to provide access and track revenue."
metadataTitle: "Guides | API | Adapty"
displayed_sidebar: APISidebar
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZoomImage from '@site/src/components/ZoomImage';

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

You need to create this ID once and pass it to both your mobile SDK and web backend. When your users first sign up from the app, you can pass their customer user ID during the SDK activation, or if you have activated the Adapty SDK before the signup stage, use the `identify` method to create a new profile and assign it a customer user ID.

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

## Step 2. Create products in a custom store in Adapty Dashboard

For Adapty to match custom store transactions with your products, you need to add products and and set up the custom store details for them.

1. Go to [**Products**](https://app.adapty.io/settings/general) from the left menu in the Adapty Dashboard and click **Create product**. Or, click an existing product to edit it.
2. Ensure you have selected an [access level](access-level.md) you want to grant users purchasing the product.
3. Click **+** and select **Add a custom store**.
4. Click **Create new custom store**.

<ZoomImage id="add-custom-store.webp" width="500px" />

5. Give your store a name (e.g., "Amazon Appstore", "Microsoft Store", or "Web Store") and ID. Click **Create custom store**.

<ZoomImage id="new-store.webp" width="500px" />

6. Then, click **Save changes** to link the product to the custom store.
7. Enter **Store product ID** for the product, so you map it with some product in that store. Then, click **Save**.

<ZoomImage id="store-product-id.webp" width="500px" />

## Step 3. Sync transactions via API

When a purchase is completed in your custom store, you need to sync it to Adapty using the server-side API.

This API call will:
- Record the transaction in Adapty
- Grant the corresponding access level to the user
- Trigger any integrations and webhooks you've configured
- Make the transaction appear in your analytics

See the full method reference [here](api-adapty#/operations/setTransaction).

```curl
curl --request POST \
  --url https://api.adapty.io/api/v2/server-side-api/purchase/set/transaction/ \
  --header 'Accept: application/json' \
  --header 'Authorization: Api-Key YOUR_SECRET_API_KEY' \
  --header 'Content-Type: application/json' \
  --header 'adapty-customer-user-id: YOUR_CUSTOMER_USER_ID' \
  --data '{
  "purchase_type": "PRODUCT_PERIOD",
  "store": "YOUR_CUSTOM_STORE",
  "environment": "production",
  "store_product_id": "YOUR_STORE_PRODUCT_ID",
  "store_transaction_id": "STORE_TRANSACTION_ID",
  "store_original_transaction_id": "ORIGINAL_TRANSACTION_ID",
  "price": {
    "country": "COUNTRY_CODE",
    "currency": "CURRENCY_CODE",
    "value": "YOUR_PRICE"
  },
  "purchased_at": "2024-01-15T10:30:00Z"
}'
```

:::important 
Important parameters:
- **store**: The ID of your custom store from Step 2
- **store_product_id**: Store product ID from Step 2
- **store_transaction_id**: A unique identifier for this transaction
- **purchased_at**: ISO 8601 timestamp when the purchase occurred
- **price**: The amount paid by the user
:::

## Step 4. Verify access in the app

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