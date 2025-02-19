---
title: "Set user attributes"
description: "Learn how to set user attributes in Adapty to enable better audience segmentation."
metadataTitle: "Setting User Attributes | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

You can set optional attributes such as email, phone number, etc, to the user of your app. You can then use attributes to create user [segments](segments) or just view them in CRM.

### Setting user attributes

To set user attributes, call `.updateProfile()` method:

<Tabs>
<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
let builder = AdaptyProfileParameters.Builder()
    .with(email: "email@email.com")
    .with(phoneNumber: "+18888888888")
    .with(firstName: "John")
    .with(lastName: "Appleseed")
    .with(gender: .other)
    .with(birthday: Date())
    
do {
    try await Adapty.updateProfile(params: builder.build())
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift-Callback" default>

```swift showLineNumbers
let builder = AdaptyProfileParameters.Builder()
    .with(email: "email@email.com")
    .with(phoneNumber: "+18888888888")
    .with(firstName: "John")
    .with(lastName: "Appleseed")
    .with(gender: .other)
    .with(birthday: Date())
    
Adapty.updateProfile(params: builder.build()) { error in
    if error != nil {
        // handle the error                        
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
val builder = AdaptyProfileParameters.Builder()
    .withEmail("email@email.com")
    .withPhoneNumber("+18888888888")
    .withFirstName("John")
    .withLastName("Appleseed")
    .withGender(AdaptyProfile.Gender.OTHER)
    .withBirthday(AdaptyProfile.Date(1970, 1, 3))
  
Adapty.updateProfile(builder.build()) { error ->
    if (error != null) {
        // handle the error
    }
}
```

</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
AdaptyProfileParameters.Builder builder = new AdaptyProfileParameters.Builder()
    .withEmail("email@email.com")
    .withPhoneNumber("+18888888888")
    .withFirstName("John")
    .withLastName("Appleseed")
    .withGender(AdaptyProfile.Gender.OTHER)
    .withBirthday(new AdaptyProfile.Date(1970, 1, 3));

Adapty.updateProfile(builder.build(), error -> {
    if (error != null) {
        // handle the error
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>

```javascript showLineNumbers
final builder = AdaptyProfileParametersBuilder()
  ..setEmail("email@email.com")
  ..setPhoneNumber("+18888888888")
  ..setFirstName('John')
  ..setLastName('Appleseed')
  ..setGender(AdaptyProfileGender.other)
  ..setBirthday(DateTime(1970, 1, 3));

try {
  await Adapty().updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>

```csharp showLineNumbers
var builder = new Adapty.ProfileParameters.Builder()
        .SetFirstName("John")
        .SetLastName("Appleseed")
        .SetBirthday(new DateTime(1970, 1, 3))
        .SetGender(ProfileGender.Female)
        .SetEmail("example@adapty.io");

Adapty.UpdateProfile(builder.Build(), (error) => {
    if(error != nil) {
        // handle the error                        
    }
});
```

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript showLineNumbers
// Only for TypeScript validation
import type { AdaptyProfileParameters } from 'react-native-adapty';

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

</TabItem>
</Tabs>

Please note that the attributes that you've previously set with the `updateProfile` method won't be reset.

<SampleApp />

### The allowed keys list

The allowed keys `<Key>` of `AdaptyProfileParameters.Builder` and the values `<Value>` are listed below:

| Key | Value |
|---|-----|
| <p>email</p><p>phoneNumber</p><p>firstName</p><p>lastName</p> | String up to 30 characters |
| gender | Enum, allowed values are: `female`, `male`, `other` |
| birthday | Date |


### App Tracking Transparency Status (starting iOS 14)

If your application uses AppTrackingTransparency framework and presents an app-tracking authorization request to the user, then you should send the [authorization status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus/) to Adapty.

<Tabs>

<TabItem value="Swift" label="Swift" default>

```swift showLineNumbers
if #available(iOS 14, macOS 11.0, *) {
    let builder = AdaptyProfileParameters.Builder()
        .with(appTrackingTransparencyStatus: .authorized)

    do {
      try await Adapty.updateProfile(params: builder.build())
    } catch {
      // handle the error
    }
}
```
</TabItem>
<TabItem value="Swift-Callback" label="Swift-Callback" default>

```swift showLineNumbers
if #available(iOS 14, macOS 11.0, *) {
    let builder = AdaptyProfileParameters.Builder()
        .with(appTrackingTransparencyStatus: .authorized)

    Adapty.updateProfile(params: builder.build()) { [weak self] error in
        if error != nil {
            // handle the error
        }
    }
}
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>

```javascript showLineNumbers
final builder = AdaptyProfileParametersBuilder()
  ..setAppTrackingTransparencyStatus(AdaptyIOSAppTrackingTransparencyStatus.authorized);

try {
  await Adapty().updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>

```csharp showLineNumbers
var builder = new Adapty.ProfileParameters.Builder();
        .SetAppTrackingTransparencyStatus(IOSAppTrackingTransparencyStatus.Authorized);

Adapty.UpdateProfile(builder.Build(), (error) => {
    if(error != nil) {
        // handle the error                        
    }
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

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
</TabItem>
</Tabs>

:::warning
We strongly recommend that you send this value as early as possible when it changes, only in that case the data will be sent in a timely manner to the integrations you have configured.
:::

### Custom user attributes

You can set your own custom attributes. These are usually related to your app usage. For example, for fitness applications, they might be the number of exercises per week, for language learning app user's knowledge level, and so on. You can use them in segments to create targeted paywalls and offers, and you can also use them in analytics to figure out which product metrics affect the revenue most.

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift showLineNumbers
do {
     builder = try builder.with(customAttribute: "value1", forKey: "key1")
} catch {
     // handle key/value validation error
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
builder.withCustomAttribute("key1", "value1")
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
builder.withCustomAttribute("key1", "value1");
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript showLineNumbers
try {
  final builder = AdaptyProfileParametersBuilder()
      ..setCustomStringAttribute('value1', 'key1')
      ..setCustomDoubleAttribute(1.0, 'key2');
  
  await Adapty().updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp showLineNumbers
try {
    builder = builder.SetCustomStringAttribute("string_key", "string_value");
    builder = builder.SetCustomDoubleAttribute("double_key", 123.0f);
} catch (Exception e) {
    // handle the exception
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
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
</TabItem>
</Tabs>

To remove existing key, use `.withRemoved(customAttributeForKey:)` method:

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift showLineNumbers
do {
     builder = try builder.withRemoved(customAttributeForKey: "key2")
} catch {
     // handle error
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
builder.withRemovedCustomAttribute("key2")
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
builder.withRemovedCustomAttribute("key2");
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript showLineNumbers
try {
  final builder = AdaptyProfileParametersBuilder()
    ..removeCustomAttribute('key1')
    ..removeCustomAttribute('key2');
  
  await Adapty().updateProfile(builder.build());
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp showLineNumbers
try {
    builder = builder.RemoveCustomAttribute("key_to_remove");
} catch (Exception e) {
    // handle the exception
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
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
</TabItem>
</Tabs>

Sometimes you need to figure out what custom attributes have already been installed before. To do this, use the `customAttributes` field of the `AdaptyProfile` object.

:::warning
Keep in mind that the value of `customAttributes` may be out of date since the user attributes can be sent from different devices at any time so the attributes on the server might have been changed after the last sync.
:::

### Limits

You can set up to 30 custom attributes per user, with key names up to 30 characters long and values up to 50 characters long.

- Up to 30 custom attributes per user
- Key name up to 30 characters long. The key name can include alphanumeric characters and any of the following: `_`  `-` `.`
- Value up to 50 characters long