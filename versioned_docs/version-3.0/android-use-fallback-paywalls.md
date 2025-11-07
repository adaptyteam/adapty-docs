---
title: "Android - Use fallback paywalls"
description: "Handle cases when users are offline or Adapty servers aren't available."
metadataTitle: "Using Fallback Paywalls on Android | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

To use fallback paywalls:

1. Place the fallback JSON file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) in the `assets` or `res/raw` directory of your Android project.
2. Call the `.setFallback` method. Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

Here's an example of retrieving fallback paywall data from locally stored JSON file named `android_fallback.json`.

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
| **location** | The [FileLocation](https://kotlin.adapty.io/adapty/com.adapty.utils/-file-location/-companion/)  for the file with fallback paywalls |
