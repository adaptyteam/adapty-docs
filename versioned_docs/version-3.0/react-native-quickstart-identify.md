---
title: "Identify users"
description: "Learn how to identify users in your React Native app with Adapty SDK."
metadataTitle: "Identify Users | React Native SDK | Adapty Docs"
slug: /react-native-quickstart-identify
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Identify users

To identify a user, call the `identify` method:

```javascript
import { Adapty } from 'react-native-adapty';

// Identify user with custom ID
await Adapty.identify('user123');

// Or identify user with profile
await Adapty.identify('user123', {
  email: 'user@example.com',
  phoneNumber: '+1234567890'
});
```

## Get user profile

To get the current user profile:

```javascript
const profile = await Adapty.getProfile();
console.log('User ID:', profile.profileId);
console.log('Email:', profile.email);
```

## Set user attributes

You can set custom attributes for the user:

```javascript
await Adapty.setProfile({
  email: 'user@example.com',
  phoneNumber: '+1234567890',
  customAttributes: {
    'user_type': 'premium',
    'registration_date': '2024-01-01'
  }
});
```

## Clear user data

To clear user data (useful for logout):

```javascript
await Adapty.logout();
``` 