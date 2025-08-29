---
title: "Adapty on China servers"
description: "Understand Adapty's China cluster and its data storage policies."
metadataTitle: "China Cluster & Data Storage | Adapty Docs"
no_index: true
---
<head>
  <!-- Will target all robots: Algolia Crawler, Google, Bing, etc... -->
  <meta name="robots" content="noindex" />
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InlineTooltip from '@site/src/components/InlineTooltip';

To ensure that your application is not blocked in China and works efficiently, Adapty provides a China cluster option. This ensures fast and reliable service for your users in mainland China while helping you comply with local regulations.

The Great Firewall of China can significantly impact connectivity and performance for applications using servers hosted outside the country. 

However, Adapty's China-based infrastructure allows your application to deliver consistent, reliable performance to users in mainland China.

:::important 

In China, applications require explicit user permission to access the internet. Until this permission is granted, **no network requests will work**. Ensure your application:
- Requests internet access permission appropriately.
- Handles cases where permission is denied or not yet granted.
- Provides clear user guidance about why internet access is needed.
:::

## Step 1. Configure Adapty SDK for China region

<InlineTooltip tooltip="Install Adapty SDK as described in the installation guide">[iOS](sdk-installation-ios), [Android](sdk-installation-android), [Flutter](sdk-installation-flutter), [React Native](sdk-installation-reactnative), and [Unity](sdk-installation-unity)</InlineTooltip>.

For the China region, when configuring the SDK during the installation, follow the instructions depending on your framework:

<Tabs groupId="current-os" queryString> 
<TabItem value="swift" label="iOS"> 

During configuration, add the China cluster as follows:

For Adapty iOS SDK 3.6.0 or later, set the cluster as `.with(serverCluster: .cn)`. For older versions, include the `backendBaseUrl` parameter in your configuration: `.with(backendBaseUrl: URL(string: "https://api-cn.adapty.io/api/v1")!)`.

<Tabs groupId="current-os" queryString>

<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
// In your AppDelegate class:
import Adapty

let configurationBuilder =
    AdaptyConfiguration
        .Builder(withAPIKey: "PUBLIC_SDK_KEY")
        .with(observerMode: false)
        .with(customerUserId: "YOUR_USER_ID")
        // highlight-next-line
        .with(serverCluster: .cn)

Adapty.activate(with: configurationBuilder.build()) { error in
  // handle the error
}
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI" default>

```swift showLineNumbers
import Adapty

@main
struct SampleApp: App {
    init() 
      let configurationBuilder =
        AdaptyConfiguration
          .Builder(withAPIKey: "PUBLIC_SDK_KEY")
          .with(observerMode: false) // optional
          .with(customerUserId: "YOUR_USER_ID") // optional
          // highlight-next-line
          .with(serverCluster: .cn)
  
        Adapty.activate(with: configurationBuilder.build()) { error in
          // handle the error
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

</TabItem>
</Tabs>

Parameters:

| Parameter          | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| **backendBaseUrl** | Use the `URL(string: "https://api-cn.adapty.io/api/v1")!` value to connect your app to Adapty's China servers. |


</TabItem> 

<TabItem value="kotlin" label="Android" default> 
During configuration, add the China cluster as follows:

Use the `.withServerCluster` method in your configuration:

<Tabs groupId="current-os" queryString>
  <TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
          .withObserverMode(false) //default false
          .withCustomerUserId(customerUserId) //default null
          // highlight-next-line
          .withServerCluster(AdaptyConfig.ServerCluster.CN)
          .build()
    )  
}
```

  </TabItem>
  <TabItem value="java" label="Java" default>

```java showLineNumbers
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
          .withObserverMode(false) //default false
          .withCustomerUserId(customerUserId) //default null
          // highlight-next-line
          .withServerCluster(AdaptyConfig.ServerCluster.CN)
          .build()
    );
}
```

  </TabItem>
</Tabs>

Added method:

| Method                | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **withServerCluster** | Pass the value `AdaptyConfig.ServerCluster.CN` to it to connect your app to Adapty's China servers. |

</TabItem>

<TabItem value="react-native" label="React Native">

For React Native applications, configure the China cluster as follows:

```javascript showLineNumbers
import Adapty from 'react-native-adapty';

// Initialize Adapty with China servers
await Adapty.activate({
  sdkKey: 'PUBLIC_SDK_KEY',
  observerMode: false, // optional, default false
  customerUserId: 'YOUR_USER_ID', // optional
  // highlight-next-line
  serverCluster: 'cn', // Use 'cn' for China servers
});
```

Parameters:

| Parameter         | Description                                       |
| ----------------- | ------------------------------------------------- |
| **serverCluster** | Use the value `'cn'` to connect to China servers. |

</TabItem>

<TabItem value="flutter" label="Flutter">

For Flutter applications, configure the China cluster as follows:

```dart showLineNumbers
import 'package:adapty_flutter/adapty_flutter.dart';

await Adapty().activate(
    configuration: AdaptyConfiguration(apiKey: 'PUBLIC_SDK_KEY')
      ..withServerCluster(AdaptyServerCluster.cn)
      ..withCustomerUserId('YOUR_USER_ID'),
);
```

Parameters:

| Parameter         | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| **serverCluster** | Use the value `AdaptyServerCluster.cn` for China servers. |

</TabItem>

</Tabs>

After configuring the China server cluster, you can use the Adapty Dashboard as usual at `app.adapty.io`. The dashboard experience is identical regardless of which server cluster you're using.

## Step 2. Detect when to use China servers

It's important to dynamically choose between global and China-specific servers based on user location. Here are two approaches:

### Option 1: Detect by region/country

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS">

```swift showLineNumbers
func shouldUseChinaServers() -> Bool {
  Locale.current.regionCode == "CN"
}

// In your configuration
let baseURL = shouldUseChinaServers() 
    ? URL(string: "https://api-cn.adapty.io/api/v1")!
    : URL(string: "https://api.adapty.io/api/v1")! // Default URL

let configurationBuilder =
    AdaptyConfiguration
        .Builder(withAPIKey: "PUBLIC_SDK_KEY")
        .with(serverCluster: .cn)
        // other configuration options
```

</TabItem>

<TabItem value="react-native" label="React Native">

```javascript showLineNumbers
import { NativeModules, Platform } from 'react-native';
import Adapty from 'react-native-adapty';
import { getCountry } from 'react-native-localize'; 

async function initializeAdapty() {
  // Determine if user is in China
    const shouldUseChinaServers = () => getCountry() === "CN";
  // Initialize with appropriate server
  await Adapty.activate({
    sdkKey: 'PUBLIC_SDK_KEY',
    serverCluster: shouldUseChinaServers ? 'cn' : 'default',
    // other configuration options
  });
}

// Call the initialization function
initializeAdapty();
```

</TabItem>

<TabItem value="kotlin" label="Android">

```kotlin
// Define the helper function
private fun shouldUseChinaServers() = Locale.getDefault().country == "CN"

// Use it in configuration
private fun setupAdapty() {
    val serverCluster = if (shouldUseChinaServers())
        AdaptyConfig.ServerCluster.CN
    else
        AdaptyConfig.ServerCluster.DEFAULT

    Adapty.activate(
        context,
        AdaptyConfig.Builder("PUBLIC_SDK_KEY")
            // other configuration options
            .withServerCluster(serverCluster)
            .build()
    )
}
```

</TabItem>

</Tabs>

### Option 2: Detect by app store

For applications distributed through different app stores, you can determine which server to use based on the installation source:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="iOS">

```swift showLineNumbers
import StoreKit

func shouldUseChinaServers() async -> Bool {
    let code: String?
    
    if #available(iOS 15.0, *) {
        code = await Storefront.current?.countryCode
    } else {
        code = SKPaymentQueue.default().storefront?.countryCode
    }
    
    return code == "CHN"
}

// In your configuration
let configurationBuilder = AdaptyConfiguration
    .Builder(withAPIKey: "PUBLIC_SDK_KEY")

// Only set server cluster if it's China
if await shouldUseChinaServers() {
    configurationBuilder.with(serverCluster: .cn)
}
// other configuration options
```

</TabItem>

<TabItem value="react-native" label="React Native">

```javascript showLineNumbers
import { Platform } from 'react-native';
import Adapty from 'react-native-adapty';
import { isChineseStore } from './storeDetection'; // Implement this based on your store detection logic

async function initializeAdapty() {
  // For Android, determine if the app was installed from a Chinese app store
  // For iOS, you might check the storefront country
  const shouldUseChinaServers = Platform.OS === 'android' 
    ? await isChineseStore() 
    : await isChineseStorefront();
  
  // Initialize with appropriate server
  await Adapty.activate({
    sdkKey: 'PUBLIC_SDK_KEY',
    serverCluster: shouldUseChinaServers ? 'cn' : 'default',
    // other configuration options
  });
}

// Example implementation for Android (simplified)
async function isChineseStore() {
  try {
    // Check if the app was installed from a Chinese app store
    // This is a simplified example - implement proper store detection based on your distribution channels
    const { installerPackageName } = await NativeModules.InstallerInfo.getInstallerInfo();
    
    const chineseStores = [
      'com.huawei.appmarket',  // Huawei AppGallery
      'com.xiaomi.market',     // Xiaomi GetApps
      'com.oppo.market',       // OPPO App Market
      'com.vivo.appstore',     // Vivo App Store
      // Add other Chinese app stores as needed
    ];
    
    return chineseStores.includes(installerPackageName);
  } catch (error) {
    console.error('Error detecting store:', error);
    return false;
  }
}

// Example implementation for iOS (simplified)
async function isChineseStorefront() {
  // Implementation depends on how you detect the App Store region
  // This would typically involve checking receipt information or other store data
  
  // Simplified example:
  return await NativeModules.StoreHelper.isChineseStorefront();
}

// Call the initialization function
initializeAdapty();
```

</TabItem>

</Tabs>
