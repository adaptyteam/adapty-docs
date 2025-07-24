---
title: "Identify users in Android SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management in Android."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
rank: 70
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

How you manage users' purchases depends on your app's authentication model:
- If your app doesn't use backend authentication and doesn't store user data, see the [section about anonymous users](#anonymous-users).
- If your app has (or will have) backend authentication, see the [section about identified users](#identified-users).

Here is what is different for anonymous and identified users:

- **Purchase management:**
    - Anonymous users rely on store-level purchase restoration
    - Identified users maintain purchase history across devices through their customer user ID
- **Profile management:**
    - Anonymous users get new profiles on each reinstall
    - Identified users maintain the same profile across sessions and devices
- **Data persistence:**
    - Anonymous users' data is tied to device/installation
    - Identified users' data persists across devices and sessions

## Anonymous users

If you don't have backend authentication:

1. When activating the Adapty SDK with the `activate` method, don't set `customerUserId` in the configuration:

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
// In your Application class
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Adapty.activate(
            applicationContext,
            AdaptyConfig.Builder("PUBLIC_SDK_KEY")
                  // don't set customerUserId even to null
                .build()
        )
    }
}
```

</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
// In your Application class
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Adapty.activate(
            getApplicationContext(),
            new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
                  // don't set customerUserId even to null
                .build()
        );
    }
}
```

</TabItem>
</Tabs>

2. When the SDK is activated on the app's first launch, Adapty **creates a new profile for the user**.
3. When the user purchases anything in the app, this purchase is **associated with their Adapty profile and their store account**.
4. When the user **reinstalls** the app or installs it from a **new device**, Adapty **creates a new empty profile on activation**.
5. If the user has previously made purchases in your app, you can provide the best user experience by **automatically [restoring](android-restore-purchase.md) their purchases on the first launch**. To do this, Adapty retrieves the store purchase history for the user.

<Tabs groupId="current-os" queryString>

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

</Tabs>

:::important
Since restoring purchases happens for the new profile, the way it works will depend on how you set up [sharing access levels between user accounts](general#6-sharing-purchases-between-user-accounts) in **App settings**.

For anonymous users, we recommend keeping it **Enabled**, as it is by default. When sharing access levels is enabled, the old profile access levels will be copied to the new profile. The old profile (e.g., if they still use their old device) will keep access.

If you set it to **Transfer access to new user** the old profile loses access. It is not recommended, since many users, for example, install the same app on their iPhone and iPad.

**Don't disable** sharing paid access for anonymous users. This would block restoring purchases.
:::

## Identified users

:::tip
**Key concept**:
**Customer user IDs** are identifiers **you create** for Adapty to link your users to their Adapty profiles.

**Adapty automatically creates** a **profile ID** for each user:

- If a profile doesn't have a customer user ID yet (meaning, **the user isn't signed in**), when you send a customer user ID, it gets associated with that profile.
- If it is a **re-install, sign in, or install from a new device**, and you have sent their customer user ID before, a new profile is not created. Instead, we switch to the existing profile associated with the customer user ID.
  :::

You have two options to identify users in the app:

- **During login/signup:** If users sign in after your app starts, call `identify()` with a customer user ID when they authenticate.

- **During the SDK activation:** If you already have a customer user ID stored when the app launches, send it during Adapty activation.

### During login/signup

If you're identifying users after the app launch (for example, after they log into your app or sign up), use the `identify` method to set their customer user ID.

- If you **haven't used this customer user ID before**, Adapty will automatically link it to the current profile.
- If you **have used this customer user ID to identify the user before**, Adapty will switch to working with the profile associated with this customer user ID.

:::tip
When creating a customer user ID, save it with your user data so you can send the same ID when they log in from new devices or reinstall your app.
:::

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.identify("YOUR_USER_ID") { error ->
    if (error == null) {
        // successful identify
    }
}
```

</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
Adapty.identify("YOUR_USER_ID", error -> {
    if (error == null) {
        // successful identify
    }
});
```
</TabItem>
</Tabs>

### During the SDK activation

If you already know a customer user ID when you activate the SDK, you can send it during the SDK activation instead of calling `identify` separately. If you know a customer user ID but set it only after the activation, that will mean that, upon activation, Adapty will create a new empty profile and switch to the existing one only after you call `identify`. To prevent creating unwanted empty profiles, **set the customer user ID as soon as you know it**.

You can pass either an existing customer user ID (the one you have used before) or a new one. If you pass a new one, a new profile created on the activation will be automatically linked to the customer user ID.

:::important
If you don't know a customer user ID during the SDK activation and only set it later using the `identify` method, you will have an extra anonymous profile created. This anonymous profile affects your installation counts in the analytics.
:::

<Tabs>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withCustomerUserId("user123")
    .build()
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    .withCustomerUserId("user123")
    .build();
```
</TabItem>
</Tabs>


### Log users out

If you have a button for logging users out, use the `logout` method. This creates a new anonymous profile ID for the user.

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
Adapty.logout { error ->
    if (error == null) {
        // successful logout
    }
}
```

</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
Adapty.logout(error -> {
    if (error == null) {
        // successful logout
    }
});
```
</TabItem>
</Tabs>

:::info
To log users back into the app, use the `identify` method.
:::

### Allow purchases without login

If your users can make purchases both before and after they log into your app, you need to do additional setup, as logging in will switch them to the different Adapty profile.

Here's how it works:
1. When a logged-out user makes a purchase, Adapty ties it to their anonymous profile ID.
2. When the user logs into their account, Adapty switches to working with their identified profile.
3. For purchases to appear in the identified user profile, you need to [restore](android-restore-purchase.md) their purchases on login, so they are retrieved from the store and tied to the identified user profile.

For this to work properly, go to **App settings** and set **Sharing paid access between user accounts** to **Transfer access to new user**, so only the new profile has access.