---
title: "Deal with ATT in React Native SDK"
description: "Get started with Adapty on React Native to streamline subscription setup and management."
metadataTitle: "Getting Started with React Native | Adapty Docs"
displayed_sidebar: sdkreactnative
---


If your application uses AppTrackingTransparency framework and presents an app-tracking authorization request to the user, then you should send the [authorization status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus/) to Adapty.

```typescript showLineNumbers
import {AppTrackingTransparencyStatus} from 'react-native-adapty';

try {
  await adapty.updateProfile({
    // you can also pass a string value (validated via tsc) if you prefer
    appTrackingTransparencyStatus: AppTrackingTransparencyStatus.Authorized,
  });
} catch (error) {
  // handle `AdaptyError`
}
```

:::warning
We strongly recommend that you send this value as early as possible when it changes, only in that case the data will be sent in a timely manner to the integrations you have configured.
::: 