---
title: "Unity - Use fallback paywalls"
description: ""
metadataTitle: ""
---

To use fallback paywalls, call the `.setFallbackPaywalls` method. Pass the content of the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard). Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

```csharp title="title="Unity""
Adapty.SetFallbackPaywalls("<FALLBACK_PAYWALL_DATA>", (error) => {
    if(error != null) {
        // handle error
    }
});
```

Parameters:

| Parameter                | Presence | Description                                                                                                                                                         |
| :----------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \<FALLBACK_PAYWALL_DATA> | required | The contents of the fallback JSON file [you downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) |