---
title: "Android - Use fallback paywalls"
description: ""
metadataTitle: ""
---

To use fallback paywalls:

1. Place the fallback JSON file you downloaded in the Adapty Dashboard alongside your app in the user's device.
2. Call the `.setFallbackPaywalls` method. Place this method in your code **before** fetching a paywall, ensuring that the mobile app possesses it when a fallback paywall is required to replace the standard one.

Here's an example of retrieving fallback paywall data from locally stored JSON file named `android_fallback.json`.

```kotlin
//if you put the 'android_fallback.json' file to the 'assets' directory
val location = FileLocation.fromAsset("android_fallback.json")
//or `FileLocation.fromAsset("<additional_folder>/android_fallback.json")` if you placed it in a child folder of 'assets')

//if you put the 'android_fallback.json' file to the 'res/raw' directory
val location = FileLocation.fromResId(context, R.raw.android_fallback)

//pass the file location
Adapty.setFallbackPaywalls(location, callback)
```
```java
//if you put the 'android_fallback.json' file to the 'assets' directory
FileLocation location = FileLocation.fromAsset("android_fallback.json");
//or `FileLocation.fromAsset("<additional_folder>/android_fallback.json");` if you placed it in a child folder of 'assets')

//if you put the 'android_fallback.json' file to the 'res/raw' directory
FileLocation location = FileLocation.fromResId(context, R.raw.android_fallback);

//pass the file location
Adapty.setFallbackPaywalls(location, callback);
```

Parameters:

| Parameter    | Description                                                                                                               |
| :----------- | :------------------------------------------------------------------------------------------------------------------------ |
| **location** | The [FileLocation](https://kotlin.adapty.io/adapty/com.adapty.utils/-file-location/)  for the file with fallback paywalls |

Alternatively, you can use a URI instead of the file location. here is an example of how to do so:

```kotlin
val fileUri: Uri = //get Uri for the file with fallback paywalls
// for example, if you put the 'android_fallback.json' file to 'res/raw' directory,
// you can obtain the Uri as follows:
//
// val fileUri = Uri.Builder()
//    .scheme(ContentResolver.SCHEME_ANDROID_RESOURCE)
//    .authority(yourAuthority) //usually your applicationId
//    .appendPath("${R.raw.android_fallback}")
//    .build()

Adapty.setFallbackPaywalls(fileUri, callback)
```
```java
Uri fileUri = //get Uri for the file with fallback paywalls
// for example, if you put the 'android_fallback.json' file to 'res/raw' directory,
// you can obtain the Uri as follows:
//
// Uri fileUri = new Uri.Builder()
//    .scheme(ContentResolver.SCHEME_ANDROID_RESOURCE)
//    .authority(yourAuthority) //usually your applicationId
//    .appendPath(String.valueOf(R.raw.android_fallback))
//    .build();

Adapty.setFallbackPaywalls(fileUri, callback);
```

Parameters:

| Parameter   | Description                                                                                            |
| :---------- | :----------------------------------------------------------------------------------------------------- |
| **fileUri** | The [Uri](https://developer.android.com/reference/android/net/Uri) for the file with fallback paywalls |