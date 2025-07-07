---
title: "Unity - Adapty SDK installation & configuration"
description: "Install Adapty SDK in Unity for subscription management."
metadataTitle: "Installing Adapty SDK for Unity | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk unity', 'google play billing library', 'gpbl', 'billing library']
rank: 30
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

<Tabs groupId="current-os" queryString> 

<TabItem value="current" label="Adapty SDK v3.x+ (current)" default> 

Adapty SDK includes two key modules for seamless integration into your mobile app:

- **Core Adapty**: This essential SDK module is required for Adapty to function properly in your app.
- **AdaptyUI**: This optional module is needed if you use the Adapty Paywall Builder, a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built with a visual constructor right in our dashboard, run natively on the device, and require minimal effort to create high-performing designs.

:::info
Adapty is compatible with Google Play Billing Library up to 7.x. Support for [Billing Library 8.0.0 (released 30 June, 2025)](https://developer.android.com/google/play/billing/release-notes#8-0-0) is planned.
:::

## Install Adapty SDK

To install the Adapty SDK:

1. Download the `adapty-unity-plugin-*.unitypackage` from GitHub and import it into your project. 

   

<Zoom>
  <img src={require('./img/456bd98-adapty-unity-plugin.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Download the `adapty-ui-unity-plugin-*.unitypackage` from GitHub and import it into your project.

   

<Zoom>
  <img src={require('./img/2ab0b4a-adapty-ui-unity-plugin.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Download and import the [External Dependency Manager plugin](https://github.com/googlesamples/unity-jar-resolver).

4. The SDK uses the "External Dependency Manager" plugin to handle iOS Cocoapods dependencies and Android gradle dependencies. After the installation, you may need to invoke the dependency manager:

   `Assets -> External Dependency Manager -> Android Resolver -> Force Resolve`

   and

   `Assets -> External Dependency Manager -> iOS Resolver -> Install Cocoapods`

5. When building your Unity project for iOS, you would get `Unity-iPhone.xcworkspace` file, which you have to open instead of `Unity-iPhone.xcodeproj`, otherwise, Cocoapods dependencies won't be used.

## Configure Adapty SDK

To configure the Adapty SDK for Unity, start by initializing the Adapty Unity Plugin and then using it as described in the guidance below. Additionally, ensure to set up your logging system to receive errors and other important information from Adapty.

1. Activate you Adapty SDK. You only need to activate it once, typically early in your app's lifecycle.

    ```csharp showLineNumbers title="C#"
    using UnityEngine;
    using AdaptySDK;
    
    public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
        void Start() {
            DontDestroyOnLoad(this.gameObject);
            Adapty.SetEventListener(this);
    
            var builder = new AdaptyConfiguration.Builder("YOUR_API_KEY")
              .SetCustomerUserId(null)
              .SetObserverMode(false)
              .SetServerCluster(AdaptyServerCluster.Default)
              .SetIPAddressCollectionDisabled(false)
              .SetIDFACollectionDisabled(false)
              .SetActivateUI(true)
              .SetAdaptyUIMediaCache(
                100 * 1024 * 1024, // MemoryStorageTotalCostLimit 100MB
                null, // MemoryStorageCountLimit
                100 * 1024 * 1024 // DiskStorageSizeLimit 100MB
              );
    
            Adapty.Activate(builder.Build(), (error) => {
                if (error != null) {
                    // handle the error
                    return;
                }
            });
        }
    }
    ```








    | Parameter                           | Presence | Description                                                  |
    | ----------------------------------- | -------- | ------------------------------------------------------------ |
    | apiKey                 | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [App settings-> General tab -> API keys subsection](https://app.adapty.io/settings/general) |
    | logLevel                | optional | Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:<ul><li> error: Only errors will be logged.</li><li> warn: Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.</li><li> info: Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged.</li><li> verbose: Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.</li></ul> |
    | observerMode                | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
    | customerUserId              | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. |
    | idfaCollectionDisabled      | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers)   section.</p> |
    | ipAddressCollectionDisabled | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |

2. Create a script to listen to Adapty events. Name it `AdaptyListener` in your scene. We suggest using the `DontDestroyOnLoad` method for this object to ensure it persists throughout the application's lifespan.

    <Zoom>
      <img src={require('./img/2ccd564-create_adapty_listener.webp').default}
      style={{
        border: 'none', /* border width and color */
        width: '700px', /* image width */
        display: 'block', /* for alignment */
        margin: '0 auto' /* center alignment */
      }}
    />
    </Zoom>

		Adapty uses `AdaptySDK` namespace. At the top of your script files that use the Adapty SDK, you may add

    ```csharp showLineNumbers title="C#"
         using AdaptySDK;
    ```

3. Subscribe to Adapty events:

    ```csharp showLineNumbers title="C#"
    using UnityEngine;
    using AdaptySDK;
    
    public class AdaptyListener : MonoBehaviour, AdaptyEventListener {
         public void OnLoadLatestProfile(Adapty.Profile profile) {
           // handle updated profile data
         }
    }
    ```
    
4. We recommend adjusting the Script Execution Order to place the AdaptyListener before Default Time. This ensures that Adapty initializes as early as possible.

   <Zoom>
     <img src={require('./img/activate_unity.webp').default}
     style={{
       border: 'none', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to [display the paywalls](display-pb-paywalls) and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

## Add Kotlin Plugin to your project

:::warning

This step is required. If you skip it, your mobile app can crash when the paywall is displayed.

:::

1. In **Player Settings**, ensure that the **Custom Launcher Gradle Template** and **Custom Base Gradle Template** options are selected.
   <Zoom>
     <img src={require('./img/kotlin-plugin1.webp').default}
     style={{
       border: 'none', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Add the following line to `/Assets/Plugins/Android/launcherTemplate.gradle`:

   ```groovy showLineNumbers
   apply plugin: 'com.android.application'
   // highlight-next-line
   apply plugin: 'kotlin-android'
   apply from: 'setupSymbols.gradle'
   apply from: '../shared/keepUnitySymbols.gradle'
   ```

3. Add the following line to `/Assets/Plugins/Android/baseProjectTemplate.gradle`:

   ```groovy showLineNumbers
   plugins {
       // If you are changing the Android Gradle Plugin version, make sure it is compatible with the Gradle version preinstalled with Unity
       // See which Gradle version is preinstalled with Unity here https://docs.unity3d.com/Manual/android-gradle-overview.html
       // See official Gradle and Android Gradle Plugin compatibility table here https://developer.android.com/studio/releases/gradle-plugin#updating-gradle
       // To specify a custom Gradle version in Unity, go do "Preferences > External Tools", uncheck "Gradle Installed with Unity (recommended)" and specify a path to a custom Gradle version
       id 'com.android.application' version '8.3.0' apply false
       id 'com.android.library' version '8.3.0' apply false
   // highlight-next-line
       id 'org.jetbrains.kotlin.android' version '1.8.0' apply false
       **BUILD_SCRIPT_DEPS**
   }
   ```

</TabItem> 

<TabItem value="old" label="Adapty SDK up to v2.x (legacy)" default> 

Adapty comprises two crucial SDKs for seamless integration into your mobile app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall Builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| AdaptySDK-Unity version | AdaptyUI-Unity version |
| :---------------------- | :--------------------- |
| 2.7.1                   | 2.0.1                  |
| 2.9.0                   | not compatible         |

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install Adapty SDKs

To install the Adapty SDKs:

1. Download the `adapty-unity-plugin-*.unitypackage` from GitHub and import it into your project. 

   

<Zoom>
  <img src={require('./img/456bd98-adapty-unity-plugin.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Download the `adapty-ui-unity-plugin-*.unitypackage` from GitHub and import it into your project.

   

<Zoom>
  <img src={require('./img/2ab0b4a-adapty-ui-unity-plugin.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Download and import the [External Dependency Manager plugin](https://github.com/googlesamples/unity-jar-resolver).

4. The SDK uses the "External Dependency Manager" plugin to handle iOS Cocoapods dependencies and Android gradle dependencies. After the installation, you may need to invoke the dependency manager:

   `Assets -> External Dependency Manager -> Android Resolver -> Force Resolve`

   and

   `Assets -> External Dependency Manager -> iOS Resolver -> Install Cocoapods`

5. When building your Unity project for iOS, you would get `Unity-iPhone.xcworkspace` file, which you have to open instead of `Unity-iPhone.xcodeproj`, otherwise, Cocoapods dependencies won't be used.

## Configure Adapty SDK

To configure the Adapty SDK for Unity, start by initializing the Adapty Unity Plugin and then using it as described in the guidance below. Additionally, ensure to set up your logging system to receive errors and other important information from Adapty.

### Activate Adapty SDK

You only need to activate the Adapty SDK once, typically early in your app's lifecycle.

```csharp showLineNumbers
using AdaptySDK;

var builder = new AdaptyConfiguration.Builder("YOUR_API_KEY")
  .SetCustomerUserId(null)
  .SetObserverMode(false)
  .SetServerCluster(AdaptyServerCluster.Default)
  .SetIPAddressCollectionDisabled(false)
  .SetIDFACollectionDisabled(false);
  .SetActivateUI(true)
  .SetAdaptyUIMediaCache(
    100 * 1024 * 1024, // MemoryStorageTotalCostLimit 100MB
    null, // MemoryStorageCountLimit
    100 * 1024 * 1024 // DiskStorageSizeLimit 100MB
  );
  
Adapty.Activate(builder.Build(), (error) => {
  if (error != null) {
    // handle the error
    return;
  }
});
```

| Parameter                       | Presence | Description                                                  |
| ------------------------------- | -------- | ------------------------------------------------------------ |
| apiKey                          | required | The key you can find in the **Public SDK key** field of your app settings in Adapty: [App settings-> General tab -> API keys subsection](https://app.adapty.io/settings/general) |
| logLevel                    | optional | Adapty logs errors and other crucial information to provide insight into your app's functionality. There are the following available levels:<ul><li> error: Only errors will be logged.</li><li> warn: Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.</li><li> info: Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged.</li><li> verbose: Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged.</li></ul> |
| observerMode                | optional | <p>A boolean value controlling [Observer mode](observer-vs-full-mode). Turn it on if you handle purchases and subscription status yourself and use Adapty for sending subscription events and analytics.</p><p>The default value is `false`.</p><p></p><p>🚧 When running in Observer mode, Adapty SDK won't close any transactions, so make sure you're handling it.</p> |
| customerUserId              | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. |
| idfaCollectionDisabled      | optional | <p>Set to `true` to disable IDFA collection and sharing.</p><p>The default value is `false`.</p><p>For more details on IDFA collection, refer to the [Analytics integration](analytics-integration#disable-collection-of-advertising-identifiers)   section.</p> |
| ipAddressCollectionDisabled | optional | <p>Set to `true` to disable user IP address collection and sharing.</p><p>The default value is `false`.</p> |

### Use Adapty Unity Plugin

1. Create a script to listen to Adapty events. Name it `AdaptyListener` in your scene. We suggest using the `DontDestroyOnLoad` method for this object to ensure it persists throughout the application's lifespan.


<Zoom>
  <img src={require('./img/2ccd564-create_adapty_listener.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





   Adapty uses `AdaptySDK` namespace. At the top of your script files that use the Adapty SDK, you may add

   ```csharp showLineNumbers title="C#"
using AdaptySDK;
   ```

2. Subscribe to Adapty events:

```csharp showLineNumbers title="C#"
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

</TabItem> 

</Tabs>

<SampleApp />

## Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. There are three levels available:

| error   | Only errors will be logged.                                  |
| :------ | :----------------------------------------------------------- |
| warn    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged. |
| info    | Errors, warnings, and serious information messages, such as those that log the lifecycle of various modules will be logged. |
| verbose | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged. |

You can call `SetLogLevel()` method in your app before configuring Adapty. 
