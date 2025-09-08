---
title: "Deal with ATT in Unity SDK"
description: "Get started with Adapty on Unity to streamline subscription setup and management."
metadataTitle: "Getting Started with Unity | Adapty Docs"
displayed_sidebar: sdkunity
---


If your application uses AppTrackingTransparency framework and presents an app-tracking authorization request to the user, then you should send the [authorization status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus/) to Adapty.

```csharp showLineNumbers
var builder = new Adapty.ProfileParameters.Builder()
    .SetAppTrackingTransparencyStatus(IOSAppTrackingTransparencyStatus.Authorized);

Adapty.UpdateProfile(builder.Build(), (error) => {
    if(error != null) {
        // handle the error                        
    }
});
```

:::warning
We strongly recommend that you send this value as early as possible when it changes, only in that case the data will be sent in a timely manner to the integrations you have configured.
::: 