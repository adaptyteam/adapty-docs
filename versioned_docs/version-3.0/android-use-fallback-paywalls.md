---
title: "Android - Use fallback paywalls"
description: "Handle cases when users are offline or Adapty servers aren't available."
metadataTitle: "Using Fallback Paywalls on Android | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

import FallbackPaywallIntroduction from '@site/src/components/reusable/FallbackPaywallIntroduction.md';

<FallbackPaywallIntroduction />

## Configuration

1. Move the fallback configuration file to the `assets` or `res/raw` directory of your Android project.
2. Add the `.setFallback` method to your application code. Place it **before** the method that fetches the target paywall or [onboarding](/localize-onboardings).
3. Create a FileLocation object that corresponds to the fallback configuration file path.
4. Pass the FileLocation object to the method.

Example:

<Tabs groupId="current-os" queryString>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
//if you put the 'android_fallback.json' file to the 'assets' directory
val location = FileLocation.fromAsset("android_fallback.json")
//or `FileLocation.fromAsset("<additional_folder>/android_fallback.json")` if you placed it in a child folder of 'assets')

//if you put the 'android_fallback.json' file to the 'res/raw' directory
val location = FileLocation.fromResId(context, R.raw.android_fallback)

//you can also pass a file URI
val fileUri: Uri = //get Uri for the file with fallback paywalls
val location = FileLocation.fromFileUri(fileUri)

//pass the file location
Adapty.setFallback(location, callback)
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
//if you put the 'android_fallback.json' file to the 'assets' directory
FileLocation location = FileLocation.fromAsset("android_fallback.json");
//or `FileLocation.fromAsset("<additional_folder>/android_fallback.json");` if you placed it in a child folder of 'assets')

//if you put the 'android_fallback.json' file to the 'res/raw' directory
FileLocation location = FileLocation.fromResId(context, R.raw.android_fallback);

//you can also pass a file URI
Uri fileUri = //get Uri for the file with fallback paywalls
FileLocation location = FileLocation.fromFileUri(fileUri);

//pass the file location
Adapty.setFallback(location, callback);
```
</TabItem>
</Tabs>

Parameters:

| Parameter    | Description                                                  |
| :----------- | :----------------------------------------------------------- |
| **location** | The [FileLocation](https://kotlin.adapty.io/adapty/com.adapty.utils/-file-location/-companion/) object for the fallback configuration file |
