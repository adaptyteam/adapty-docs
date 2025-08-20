---
title: "Set user attributes in Capacitor SDK"
description: "Learn how to update user attributes and profile data in your Capacitor app with Adapty SDK."
metadataTitle: "Update User Data | Capacitor SDK | Adapty Docs"
slug: /capacitor-setting-user-attributes
displayed_sidebar: sdkcapacitor
---

import SampleApp from '@site/src/components/reusable/SampleApp.md';

You can set optional attributes such as email, phone number, etc, to the user of your app. You can then use attributes to create user [segments](segments) or just view them in CRM.

### Setting user attributes

To set user attributes, call `.updateProfile()` method:

```typescript showLineNumbers
// Only for TypeScript validation
import type { AdaptyProfileParameters } from 'capacitor-adapty';

const params: AdaptyProfileParameters = {
    email: 'email@email.com',
    phoneNumber: '+18888888888',
    firstName: 'John',
    lastName: 'Appleseed',
    gender: 'other',
    birthday: new Date().toISOString(),
};

try {
    await adapty.updateProfile(params);
} catch (error) {
    // handle `AdaptyError`
}
```


Please note that the attributes that you've previously set with the `updateProfile` method won't be reset.

<SampleApp />

### The allowed keys list

The allowed keys `<Key>` of `AdaptyProfileParameters.Builder` and the values `<Value>` are listed below:

| Key | Value |
|---|-----|
| <p>email</p><p>phoneNumber</p><p>firstName</p><p>lastName</p> | String up to 30 characters |
| gender | Enum, allowed values are: `female`, `male`, `other` |
| birthday | Date |


### Custom user attributes

You can set your own custom attributes. These are usually related to your app usage. For example, for fitness applications, they might be the number of exercises per week, for language learning app user's knowledge level, and so on. You can use them in segments to create targeted paywalls and offers, and you can also use them in analytics to figure out which product metrics affect the revenue most.

```typescript showLineNumbers
try {
  await adapty.updateProfile({
    codableCustomAttributes: {
      key_1: 'value_1',
      key_2: 2,
    },
  });
} catch (error) {
    // handle `AdaptyError`
}
```

To remove existing key, use `.withRemoved(customAttributeForKey:)` method:

```typescript showLineNumbers
try {
  // to remove a key, pass null as its value
  await adapty.updateProfile({
    codableCustomAttributes: {
      key_1: null,
      key_2: null,
    },
  });
} catch (error) {
    // handle `AdaptyError`
}
```

Sometimes you need to figure out what custom attributes have already been installed before. To do this, use the `customAttributes` field of the `AdaptyProfile` object.

:::warning
Keep in mind that the value of `customAttributes` may be out of date since the user attributes can be sent from different devices at any time so the attributes on the server might have been changed after the last sync.
:::

### Limits

- Up to 30 custom attributes per user
- Key names are up to 30 characters long. The key name can include alphanumeric characters and any of the following: `_`  `-` `.`
- Value can be a string or float with no more than 50 characters.