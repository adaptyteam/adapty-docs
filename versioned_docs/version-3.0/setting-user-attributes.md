---
title: "Set user attributes in iOS SDK"
description: "Learn how to set user attributes in Adapty to enable better audience segmentation."
metadataTitle: "Setting User Attributes | Adapty Docs"
keywords: ["updateProfile", "update profile", "user attributes"]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

You can set optional attributes such as email, phone number, etc, to the user of your app. You can then use attributes to create user [segments](segments) or just view them in CRM.

### Setting user attributes

To set user attributes, call `.updateProfile()` method:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

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
<TabItem value="swift-callback" label="Swift-Callback" default>

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


### Custom user attributes

You can set your own custom attributes. These are usually related to your app usage. For example, for fitness applications, they might be the number of exercises per week, for language learning app user's knowledge level, and so on. You can use them in segments to create targeted paywalls and offers, and you can also use them in analytics to figure out which product metrics affect the revenue most.


```swift showLineNumbers
do {
     builder = try builder.with(customAttribute: "value1", forKey: "key1")
} catch {
     // handle key/value validation error
}
```

To remove existing key, use `.withRemoved(customAttributeForKey:)` method:

```swift showLineNumbers
do {
     builder = try builder.withRemoved(customAttributeForKey: "key2")
} catch {
     // handle error
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