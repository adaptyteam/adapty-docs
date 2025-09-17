---
title: "Deal with ATT in Kotlin Multiplatform SDK"
description: "Get started with Adapty on Kotlin Multiplatform to streamline subscription setup and management."
---


If your application uses AppTrackingTransparency framework and presents an app-tracking authorization request to the user, then you should send the [authorization status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus/) to Adapty.

```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyProfileParameters

val profileParameters = AdaptyProfileParameters.Builder()
    .withAttStatus(3) // 3 = ATTrackingManagerAuthorizationStatusAuthorized
    .build()

Adapty.updateProfile(profileParameters)
    .onSuccess {
        // ATT status updated successfully
    }
    .onError { error ->
        // handle AdaptyError
    }
```

:::warning
We strongly recommend that you send this value as early as possible when it changes, only in that case the data will be sent in a timely manner to the integrations you have configured.
::: 