---
title: "Identify users in Android SDK"
description: "Identify users in Adapty to improve personalized subscription experiences (Android)."
metadataTitle: "Identifying Users in Adapty | Adapty Docs"
displayed_sidebar: sdkandroid
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapty creates an internal profile ID for every user. However, if you have your own authentication system, you should set your own Customer User ID. You can find users by their Customer User ID in the [Profiles](profiles-crm) section and use it in the [server-side API](getting-started-with-server-side-api), which will be sent to all integrations.

### Setting customer user ID on configuration

If you have a user ID during configuration, just pass it as `customerUserId` parameter to `.activate()` method:

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyConfig

Adapty.activate(
    AdaptyConfig.Builder("PUBLIC_SDK_KEY")
        .withCustomerUserId("YOUR_USER_ID")
        .build()
) { error ->
    error?.let {
        // handle the error
    }
}
```

<SampleApp />

### Setting customer user ID after configuration

If you don't have a user ID in the SDK configuration, you can set it later at any time with the `.identify()` method. The most common cases for using this method are after registration or authorization, when the user switches from being an anonymous user to an authenticated user.

```kotlin showLineNumbers
import com.adapty.kmp.Adapty

Adapty.identify("YOUR_USER_ID") { error ->
    error?.let {
        // handle the error
    } ?: run {
        // successful identify
    }
}
```

Request parameters:

- **Customer User ID** (required): a string user identifier.

:::warning
Resubmitting of significant user data

In some cases, such as when a user logs into their account again, Adapty's servers already have information about that user. In these scenarios, the Adapty SDK will automatically switch to work with the new user. If you passed any data to the anonymous user, such as custom attributes or attributions from third-party networks, you should resubmit that data for the identified user.

It's also important to note that you should re-request all paywalls and products after identifying the user, as the new user's data may be different.
:::

### Logging out and logging in

You can log the user out anytime by calling `.logout()` method:


```kotlin showLineNumbers
import com.adapty.kmp.Adapty

Adapty.logout { error ->
    error?.let {
        // handle the error
    } ?: run {
        // successful logout
    }
}
```

You can then login the user using `.identify()` method.