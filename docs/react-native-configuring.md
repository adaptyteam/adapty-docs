---
title: "React Native — Configure Adapty SDK"
description: ""
metadataTitle: ""
---

To initialize Adapty SDK, import `adapty` and call `activate` in your _core component_ such as `App.tsx`. Preferably, place activation before the React component to make sure no other Adapty call will happen before the activation call.

```typescript title="title="/src/App.tsx""
import { adapty } from 'react-native-adapty';

adapty.activate('PUBLIC_SDK_KEY');

const App = () => {
	// ...
}
```

There are a number of optional parameters, that you can pass during activation:

```typescript title="title="adapty.activate('PUBLIC_SDK_KEY', {""
  observerMode: false,
  customerUserId: 'YOUR_USER_ID',
  logLevel: 'error',
  __debugDeferActivation: false,
  ipAddressCollectionDisabled: false,
  ios: {
    idfaCollectionDisabled: false,
  },
});
```
```javascript title="title="JavaScript""
import { IosStorekit2Usage, LogLevel } from 'react-native-adapty';

adapty.activate('PUBLIC_SDK_KEY', {
  observerMode: false,
  customerUserId: 'YOUR_USER_ID',
  logLevel: LogLevel.ERROR,
  __debugDeferActivation: false,
  ios: {
  ipAddressCollectionDisabled: false,
  storeKit2Usage: IosStorekit2Usage.EnabledForIntroductoryOfferEligibility,
ios: {
    idfaCollectionDisabled: false,
    enableUsageLogs: true,
  },
});

```

| Parameter | Presence | Description |
|---------|--------|-----------|
| **Public SDK key** | required | A Public SDK Key is the unique identifier used to integrate Adapty into your mobile app. You can copy it in the Adapty Dashboard:  [**App settings** -> **General **tab -> **API Keys** section](https://app.adapty.io/settings/general). |
| **Observer mode** | optional | A boolean value that controls [Observer mode](observer-vs-full-mode). Set it to`TRUE` if you manage purchases and subscription status independently, using Adapty solely for sending subscription events and analytics. |
| **Customer user ID** | optional | <p>An identifier of a user in your system. We send it with subscription and analytical events, so we can match events to the right user profile. You can also find customers using the `customerUserId` in the [Profiles](profiles-crm)  section.</p><p></p><p>If you don't have a user ID when you start with Adapty, you can add it later using the `adapty.identify()` method. For more details, see the [Identifying Users](react-native-identifying-users)  section.</p> |
| **Log level** | optional | A string parameter that makes Adapty record errors and other important information to help you understand what's happening. |
| **Deferred activation** | optional | A boolean parameter, that lets you delay SDK activation until your next Adapty call. This is intended solely for development purposes and **should not be used in production**. |
| **Disabling IP address collection** | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |
| **Disabling IDFA collection** | optional | A boolean parameter, that allows you to disable IDFA collection for your iOS app. For more details, refer to the [Analytics integration](https://docs.adapty.io/docs/analytics-integration#react-native) section. |


:::note
Note that `storeKit2Usage` refers to the method the SDK uses to determine eligibility for introductory offers, not the payment process itself. Pass the value `'enabled_for_introductory_offer_eligibility'` if you want to utilize the StoreKit 2 API for this specific purpose.
:::

:::note
Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.
:::

:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

### Logging

Adapty logs errors and other important information to help you understand what is going on. There are four levels available:

1. `error`: only errors will be logged 
2. `warn`: messages from the SDK that do not cause critical errors, but are worth paying attention to
3. `info`: various information messages, such as those that log the lifecycle of various modules
4. `verbose`: any additional information that may be useful during debugging, such as function calls, API queries, etc.

You can set `logLevel` at any time in the application's lifespan, but we recommend that you do this before configuring Adapty.

```typescript title="title="adapty.setLogLevel('verbose');""
```
```javascript title="title="import { LogLevel } from 'react-native-adapty';""

adapty.setLogLevel(LogLevel.VERBOSE);
```

For both `activate` and `setLogLevel` methods TypeScript would validate the string that you pass as an argument. However, if you are using JavaScript you might want to use `LogLevel` enum, that would guarantee to provide you a safe value:

### Handling logs

If you save your stdout logs, you might want to filter Adapty logs from others. To do this you can add a prefix for all `AdaptyError` instances that would be consoled:

```typescript title="title="import { AdaptyError } from 'react-native-adapty';""

AdaptyError.prefix = "[ADAPTY]";
```

You also can handle all the raised errors from any place you like with `onError`. Errors would be thrown where expected, but also duplicated to your event listener:

```typescript title="title="import { AdaptyError } from 'react-native-adapty';""

AdaptyError.onError = error => {
	// ... 
  console.error(error);
};
```

### Delaying SDK activation

Adapty pre-fetches all required data about a user when SDK is activated. It allows Adapty to provide you with fresh data faster.

Apparently, it leads to a problem with the iOS simulator, when the Simulator constantly prompts you to authenticate during development. While Adapty cannot control the StoreKit authentication flow, it can delay the requests SDK makes to obtain fresh user data.

Turning `__debugDeferActivation` property on and holds `activate` call until the moment you make the next Adapty SDK call. This way, you would not be prompted to provide authentication data if you don't need it.

**This feature should be used in development only**, as it does not consider all the edge cases of how users use your application. There is likely no need to delay activation in production as iPhones (or any real devices) remember authentication data and usually don't prompt to re-enter credentials again.

Thus, here is the preferred way to use it:

```typescript title="title="adapty.activate('PUBLIC_SDK_KEY', {""
  __debugDeferActivation: isSimulator(), // 'isSimulator' from any 3rd party library
});
```