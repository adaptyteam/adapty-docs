---
title: "Legacy installation guide"
description: "Legacy installation guide for React Native Adapty SDK."
metadataTitle: "Legacy Installation Guide | React Native SDK | Adapty Docs"
slug: /react-native-legacy-install
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Legacy Installation

This guide covers installation for older versions of React Native Adapty SDK.

### Installation Steps

1. Install the package:
```bash
npm install react-native-adapty@2.x
```

2. Link the native modules:
```bash
npx react-native link react-native-adapty
```

3. Configure iOS (in `ios/Podfile`):
```ruby
pod 'Adapty', '~> 2.0'
```

4. Configure Android (in `android/app/build.gradle`):
```gradle
implementation 'io.adapty:adapty-android:2.x'
```

### Legacy Configuration

```javascript
import { Adapty } from 'react-native-adapty';

// Legacy activation
await Adapty.activate('your_api_key');
```

### Migration to New SDK

We strongly recommend migrating to the latest SDK version for better performance and features. 