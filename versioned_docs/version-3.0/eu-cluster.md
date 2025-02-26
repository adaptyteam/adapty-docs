---
title: "Adapty on EU servers"
description: "Understand Adapty’s EU cluster and its data storage policies."
metadataTitle: "EU Cluster & Data Storage | Adapty Docs"
no_index: true
---
<head>
  <!-- Will target all robots: Algolia Crawler, Google, Bing, etc... -->
  <meta name="robots" content="noindex" />
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

If legal requirements mandate EU-based servers, Adapty provides an EU cluster option. Follow these steps:

1. Configure Adapty SDK for the EU region.
2. Register with Adapty via the EU-specific registration link.
3. Log in to Adapty through the EU-specific login link.

After setup, you can use the Adapty Dashboard as usual at `app.adapty.io`.

## Step 1. Configure Adapty SDK for EU region

<Tabs groupId="current-os" queryString> 
<TabItem value="swift" label="iOS"> 

Install Adapty SDK 3.0.3 or later as described in [Adapty SDK Installation & Configuration](sdk-installation-android). During configuration, add the EU cluster as follows:

Include the `backendBaseUrl` parameter in your configuration:

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
        .with(idfaCollectionDisabled: false)
        .with(ipAddressCollectionDisabled: false)
        // highlight-next-line
        .with(backendBaseUrl: URL(string: "https://api-eu.adapty.io/api/v1")!)

Adapty.activate(with: configurationBuilder) { error in
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
          .with(idfaCollectionDisabled: false) // optional
          .with(ipAddressCollectionDisabled: false) // optional
          // highlight-next-line
          .with(backendBaseUrl: URL(string: "https://api-eu.adapty.io/api/v1")!)
  
        Adapty.activate(with: configurationBuilder) { error in
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
| **backendBaseUrl** | Use the `URL(string: "https://api-eu.adapty.io/api/v1")!` value to connect your app to Adapty’s European servers. |


</TabItem> 

<TabItem value="kotlin" label="Android" default> 
Install Adapty SDK 3.0.4 or later as described in [Adapty SDK Installation & Configuration](sdk-installation-android). During configuration, add the EU cluster as follows:

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
          .withIpAddressCollectionDisabled(false) //default false
          // highlight-next-line
          .withServerCluster(AdaptyConfig.ServerCluster.EU)
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
          .withIpAddressCollectionDisabled(false) //default false
          // highlight-next-line
          .withServerCluster(AdaptyConfig.ServerCluster.EU)
          .build()
    );
}
```

  </TabItem>
</Tabs>

Added method:

| Method                | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **withServerCluster** | Pass the value `AdaptyConfig.ServerCluster.EU` to it to connect your app to Adapty’s European servers. |

</TabItem>

</Tabs>

## Step 2. Register with EU cluster

To register your company in the EU cluster, use https://app.adapty.io/eu-registration. Once registered, you can [add employees](members-settings#how-to-add-a-member) in the Adapty Dashboard as usual.

## Step 3: Log in with EU-specific link

Direct your team to log in via https://app.adapty.io/eu-login. After logging in, they can use https://app.adapty.io for regular dashboard access.

:::warning

New users or existing users logging in from a new device must use https://app.adapty.io/eu-login for the first login.

:::

This should help ensure you comply with EU data regulations while using Adapty!x