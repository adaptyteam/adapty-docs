---
title: "Unity - Adapty SDK installation & configuration"
description: "Discover step-by-step instructions for installing and configuring Adapty SDK and AdaptyUI SDK on Unity, enabling seamless integration of Adapty into your mobile app. Find the correct pair of SDKs with the compatibility table provided."
metadataTitle: "Unity -  - Adapty SDK Installation and Configuration Guide"
---

Adapty comprises two crucial SDKs for seamless integration into your mobile app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](https://docs.adapty.io/docs/release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDKs

To install the Adapty SDKs:

1. Download the `adapty-unity-plugin-*.unitypackage` from GitHub and import it into your project. 

   
<img
  src={require('./img/456bd98-adapty-unity-plugin.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




2. Download the `adapty-ui-unity-plugin-*.unitypackage` from GitHub and import it into your project.

   
<img
  src={require('./img/2ab0b4a-adapty-ui-unity-plugin.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




3. Download and import the [External Dependency Manager plugin](https://github.com/googlesamples/unity-jar-resolver).

4. The SDK uses the "External Dependency Manager" plugin to handle iOS Cocoapods dependencies and Android gradle dependencies. After the installation, you may need to invoke the dependency manager:

   `Assets -> External Dependency Manager -> Android Resolver -> Force Resolve`

   and

   `Assets -> External Dependency Manager -> iOS Resolver -> Install Cocoapods`

5. When building your Unity project for iOS, you would get `Unity-iPhone.xcworkspace` file, which you have to open instead of `Unity-iPhone.xcodeproj`, otherwise, Cocoapods dependencies won't be used.

## Configure Adapty SDKs

To configure the Adapty SDKs for Unity, start by initializing the Adapty Unity Plugin and then using it as described in the guidance below. Additionally, ensure to set up your logging system to receive errors and other important information from Adapty.

### Initiate Adapty Unity Plugin on iOS

The Adapty Unity Plugin on iOS is initialized automatically. To make it work properly:

1. Manually create the `Adapty-Info.plist` file and add it to the `/Assets` folder of your Unity project. It will be automatically copied to the Xcode project during the build phase. Below is an example of how this file should be structured:

```xml title="Xml"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>AdaptyPublicSdkKey</key>
    <string>insert_here_your_Adapty_public_key#</string>
    <key>AdaptyObserverMode</key>
	  <false/>
</dict>
</plist>
```

Parameters:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **AdaptyPublicSdkKey** | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general) |
| **AdaptyObserverMode** | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| **idfaCollectionDisabled** | optional | <p>A boolean parameter, that allows you to disable IDFA collection for your iOS app. The default value is `false`.</p><p>For more details, refer to the [Analytics integration](analytics-integration#disable-collection-of-idfa) section.</p> |


### Initiate Adapty Unity Plugin on Android

The Adapty Unity Plugin on Android is automatically initialized. To ensure it works properly:

1. Add `<meta-data` section with "AdaptyPublicSdkKey" as a direct child of the `<application` section to your project's AndroidManifest.xml file. If you don't have one, it can be easily created in **Project Settings** -> **Player** -> **Settings for Android** -> **Publishing settings** -> **Custom Main Manifest** checkbox). Here is an example:

```xml title="Xml"
<?xml version="1.0" encoding="utf-8"?>
<manifest ...>
    <application ...>
        ...

        <meta-data
            android:name="AdaptyPublicSdkKey"
            android:value="PUBLIC_SDK_KEY" />
      
      	<meta-data
           	android:name="AdaptyObserverMode"
           	android:value="false" />
    </application>
</manifest>
```

Configurational options:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **AdaptyPublicSDKkey** | required | <p>The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).</p><p>Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api) only.</p> |
| **AdaptyObservermode** | optional | <p>A boolean value that controls [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics. Default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |


### Use Adapty Unity Plugin

1. Create a script to listen to Adapty events. Name it `AdaptyListener` in your scene. We suggest using the `DontDestroyOnLoad` method for this object to ensure it persists throughout the application's lifespan.


<img
  src={require('./img/2ccd564-create_adapty_listener.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Adapty uses `AdaptySDK` namespace. At the top of your script files that use the Adapty SDK, you may add

```csharp title="C#"
using AdaptySDK;
```

2. Subscribe to Adapty events:

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

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to [display the paywalls](display-pb-paywalls) and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

## Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. There are three levels available:

| error   | Only errors will be logged.                                                                                                 |
| :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| warn    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.       |
| info    | Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged. |
| verbose | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.   |

You can call `SetLogLevel()` method in your app before configuring Adapty.