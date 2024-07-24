---
title: "Unity – Configure Adapty SDK"
description: ""
metadataTitle: ""
---

### iOS

The Adapty Unity Plugin on iOS is initialized automatically. To make it work properly, you need to manually create the Adapty-Info.plist file and add it to the `/Assets` folder of your Unity project (it will be automatically copied to the Xcode project during the build phase).  
This is how this file should look like:

```xml title="Xml"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>AdaptyPublicSdkKey</key>
    <string>insert_here_your_Adapty_public_key#</string>
</dict>
</plist>
```

For iOS, you can optionally set the AdaptyObserverMode flag to `TRUE`, if you want Adapty to run in Observer mode. Usually, it means, that you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.

```xml title="Xml"
<key>AdaptyObserverMode</key>
<true/>
```

Also, you can disable IDFA collection by adding the specific key to the Adapty-Info.plist file:

```xml title="Xml"
<key>AdaptyIDFACollectionDisabled</key>
<false/>
```

##### StoreKit 2 Usage

Also you can add `AdaptyStoreKit2Usage` key. This value controls StoreKit 1 and 2 API utilisation. Read more in the [Displaying Paywalls & Products](display-pb-paywalls) section.

```xml title="Adapty-Info.plist"
<dict>
    <key>AdaptyStoreKit2Usage</key>
    <string>intro_eligibility_check</string>
</dict>
```

### Android

The Adapty Unity Plugin on Android is initialized automatically. To make it work properly, you need to add `<meta-data` section with "AdaptyPublicSdkKey" as a direct child of the `<application` section to your project's AndroidManifest.xml file (if you don't have one, it can be easily created in Project Settings -> Player -> Settings for Android -> Publishing settings -> Custom Main Manifest checkbox). Basically it will look like this:

```xml title="Xml"
<?xml version="1.0" encoding="utf-8"?>
<manifest ...>
    <application ...>
        ...

        <meta-data
            android:name="AdaptyPublicSdkKey"
            android:value="PUBLIC_SDK_KEY"/>
    </application>
</manifest>
```

### Usage

First of all you need to create a script which will be responsible for listening of Adapty events. Let's call it `AdaptyListener` and place on any object of your scene. We recommed to call `DontDestroyOnLoad` method for this object to make it live forever.


<img
  src={require('./img/2ccd564-create_adapty_listener.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Adapty uses `AdaptySDK` namespace. You may add at the top of your script files that would use Adapty SDK:

```csharp title="C#"
using AdaptySDK;
```

Next you need to subscribe for Adapty events:

```csharp title="C#"
using UnityEngine;
using AdaptySDK;

public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
	void Start() {
		DontDestroyOnLoad(this.gameObject);
		Adapty.SetEventListener(this);
	}

  public void OnLoadLatestProfile(Adapty.Profile profile) {
    // handle updated profile data
  }
}
```

### Logging

Adapty logs errors and other important information to help you understand what is going on. There are three levels available:

1. `Error`: only errors will be logged
2. `Warn`: messages from the SDK that do not cause critical errors, but are worth paying attention to
3. `Info`: various information messages, such as those that log the lifecycle of various modules
4. `Verbose`: any additional information that may be useful during debugging, such as function calls, API queries, etc.

You can call `SetLogLevel()` method in your app before configuring Adapty.