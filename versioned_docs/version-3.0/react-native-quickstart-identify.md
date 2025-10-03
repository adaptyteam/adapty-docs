---
title: "Identify users in React Native SDK"
description: "Quickstart guide to setting up Adapty for in-app subscription management in React Native."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['identify', 'identifying users', 'customeruserid']
rank: 80
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::important
This guide is for you if you have your own authentication system. Here, you will learn how to work with user profiles in Adapty to ensure it aligns with your existing authentication system.
:::

How you manage users' purchases depends on your app's authentication model:
- If your app doesn't use backend authentication and doesn't store user data, see the [section about anonymous users](#anonymous-users).
- If your app has (or will have) backend authentication, see the [section about identified users](#identified-users).

**Key concepts**:
- **Profiles** are the entities required for the SDK to work. Adapty creates them automatically. 
- They can be anonymous **(without customer user ID)** or identified **(with customer user ID)**. 
- You provide **customer user ID** in order to cross-reference profiles in Adapty with your internal auth system

Here is what is different for anonymous and identified users:

|                         | Anonymous users                                   | Identified users                                                        |
|-------------------------|---------------------------------------------------|-------------------------------------------------------------------------|
| **Purchase management** | Store-level purchase restoration                  | Maintain purchase history across devices through their customer user ID |
| **Profile management**  | New profiles on each reinstall                    | The same profile across sessions and devices                            |
| **Data persistence**    | Anonymous users' data is tied to app installation | Identified users' data persists across app installations                |


## Anonymous users

If you don't have backend authentication, **you don't need to handle authentication in the app code**:

1. When the SDK is activated on the app's first launch, Adapty **creates a new profile for the user**.
2. When the user purchases anything in the app, this purchase is **associated with their Adapty profile and their store account**.
3. When the user **re-installs** the app or installs it from a **new device**, Adapty **creates a new anonymous profile on activation**.
4. If the user has previously made purchases in your app, by default, their purchases are automatically synced from the App Store on the SDK activation.

So, with anonymous users, new profiles will be created on each installation, but that's not a problem because, in the Adapty analytics, you can [configure what will be considered a new installation](general#4-installs-definition-for-analytics).

## Identified users

You have two options to identify users in the app:

- [**During login/signup:**](#during-loginsignup) If users sign in after your app starts, call `identify()` with a customer user ID when they authenticate.

- [**During the SDK activation:**](#during-the-sdk-activation) If you already have a customer user ID stored when the app launches, send it when calling `activate()`.

:::important
By default, when Adapty receives a purchase from a Customer User ID that is currently associated with another Customer User ID, the access level is shared, so both profiles have paid access. You can configure this setting to transfer paid access from one profile to another or disable sharing completely. See the [article](general#6-sharing-purchases-between-user-accounts) for more details.
:::

<Zoom>
  <img src={require('./img/identify-diagram.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### During login/signup

If you're identifying users after the app launch (for example, after they log into your app or sign up), use the `identify` method to set their customer user ID.

- If you **haven't used this customer user ID before**, Adapty will automatically link it to the current profile.
- If you **have used this customer user ID to identify the user before**, Adapty will switch to working with the profile associated with this customer user ID.

:::important
Customer user IDs must be unique for each user. If you hardcode the parameter value, all users will be considered as one.
:::

```typescript showLineNumbers
try {
    await adapty.identify("YOUR_USER_ID"); // Unique for each user
    // successfully identified
} catch (error) {
    // handle the error
}
```

### During the SDK activation

If you already know a customer user ID when you activate the SDK, you can send it in the `activate` method instead of calling `identify` separately.

If you know a customer user ID but set it only after the activation, that will mean that, upon activation, Adapty will create a new anonymous profile and switch to the existing one only after you call `identify`.

You can pass either an existing customer user ID (the one you have used before) or a new one. If you pass a new one, a new profile created upon activation will be automatically linked to the customer user ID.

:::note
By default, created anonymous profiles won't affect the dashboard [analytics](analytics-charts.md), because installs will be counted by new device IDs. However, if you want to change this behavior and count new customer user IDs instead of device IDs, go to **App settings** and set up [**Installs definition for analytics**](general#4-installs-definition-for-analytics).
:::

```typescript showLineNumbers
adapty.activate("PUBLIC_SDK_KEY", {
    customerUserId: "YOUR_USER_ID" // Customer user IDs must be unique for each user. If you hardcode the parameter value, all users will be considered as one.
});
```


### Log users out

If you have a button for logging users out, use the `logout` method. 

:::important
Logging users out creates a new anonymous profile for the user.
:::

```typescript showLineNumbers
try {
    await adapty.logout();
    // successful logout
} catch (error) {
    // handle the error
}
```

:::info
To log users back into the app, use the `identify` method.
:::

### Allow purchases without login

If your users can make purchases both before and after they log into your app, you need to ensure that they will keep access after they log in:

1. When a logged-out user makes a purchase, Adapty ties it to their anonymous profile ID.
2. When the user logs into their account, Adapty switches to working with their identified profile.
    - If it is a new customer user ID (e.g., the purchase has been made before registration), Adapty assigns the customer user ID to the current profile, so all the purchase history is maintained.
    - If it is an existing customer user ID (the customer user ID is already linked to a profile), you need to get the actual access level after the profile switch. You can either call [`getProfile`](react-native-check-subscription-status.md) right after the identification, or [listen for profile updates](react-native-check-subscription-status.md) so the data syncs automatically.

## Next steps

Congratulations! You have implemented in-app payment logic in your app! We wish you all the best with your app monetization!

To get even more from Adapty, you can explore these topics:
- [**Testing**](troubleshooting-test-purchases.md): Ensure that everything works as expected
- [**Onboardings**](react-native-onboardings.md): Engage users with onboardings and drive retention
- [**Integrations**](configuration.md): Integrate with marketing attribution and analytics services in just one line of code
- [**Set custom profile attributes**](react-native-setting-user-attributes.md): Add custom attributes to user profiles and create segments, so you can launch A/B tests or show different paywalls to different users