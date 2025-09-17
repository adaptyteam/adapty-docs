---
title: "Set user attributes in Kotlin Multiplatform SDK"
description: "Learn how to set user attributes in Adapty to enable better audience segmentation."
metadataTitle: "Setting User Attributes | Adapty Docs"
keywords: ["updateProfile", "update profile", "user attributes"]
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md';

You can set optional attributes such as email, phone number, etc, to the user of your app. You can then use attributes to create user [segments](segments) or just view them in CRM.

### Setting user attributes

To set user attributes, call `.updateProfile()` method:


```kotlin showLineNumbers
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyProfile
import com.adapty.kmp.models.AdaptyProfileParameters

val builder = AdaptyProfileParameters.Builder()
    .withEmail("email@email.com")
    .withPhoneNumber("+18888888888")
    .withFirstName("John")
    .withLastName("Appleseed")
    .withGender(AdaptyProfile.Gender.FEMALE)
    .withBirthday(AdaptyProfile.Date(1970, 1, 3))
  
Adapty.updateProfile(builder.build())
    .onSuccess {
        // profile updated successfully
    }
    .onError { error ->
        // handle the error
    }
```


Please note that the attributes that you've previously set with the `updateProfile` method won't be reset.

<SampleApp />

### The allowed keys list

The allowed keys `<Key>` of `AdaptyProfileParameters.Builder` and the values `<Value>` are listed below:

| Key | Value |
|---|-----|
| <p>email</p><p>phoneNumber</p><p>firstName</p><p>lastName</p> | String up to 30 characters |
| gender | Enum, allowed values are: `AdaptyProfile.Gender.FEMALE`, `AdaptyProfile.Gender.MALE`, `AdaptyProfile.Gender.OTHER` |
| birthday | Date |


### Custom user attributes

You can set your own custom attributes. These are usually related to your app usage. For example, for fitness applications, they might be the number of exercises per week, for language learning app user's knowledge level, and so on. You can use them in segments to create targeted paywalls and offers, and you can also use them in analytics to figure out which product metrics affect the revenue most.

```kotlin showLineNumbers
import com.adapty.kmp.models.AdaptyProfileParameters

val builder = AdaptyProfileParameters.Builder()
builder.withCustomAttribute("key1", "value1")
```

To remove existing key, use `.withRemovedCustomAttribute()` method:

```kotlin showLineNumbers
import com.adapty.kmp.models.AdaptyProfileParameters

val builder = AdaptyProfileParameters.Builder()
builder.withRemovedCustomAttribute("key2")
```

Sometimes you need to figure out what custom attributes have already been installed before. To do this, use the `customAttributes` field of the `AdaptyProfile` object.

:::warning
Keep in mind that the value of `customAttributes` may be out of date since the user attributes can be sent from different devices at any time so the attributes on the server might have been changed after the last sync.
:::

### Limits

- Up to 30 custom attributes per user
- Key names are up to 30 characters long. The key name can include alphanumeric characters and any of the following: `_`  `-` `.`
- Value can be a string or float with no more than 50 characters.