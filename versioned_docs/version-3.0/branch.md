---
title: "Branch"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Branch](https://www.branch.io/) enables customers to reach, interact, and assess results across diverse devices, channels, and platforms. It's a user-friendly platform designed to enhance mobile revenue through specialized links that work seamlessly on all devices, channels, and platforms.

Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. 

The integration between Adapty and Branch operates in two main ways.

1. **Receiving attribution data from Branch**  
   Once you've set up the Branch integration, Adapty will start receiving attribution data from Branch. You can easily access and view this data on the user's profile page.


<Zoom>
  <img src={require('./img/49f4aa7-CleanShot_2023-08-11_at_17.36.072x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. **Sending subscription events to Branch**  
   Adapty can send all subscription events which are configured in your integration to Branch. As a result, you'll be able to track these events within the Branch dashboard. 

## How to set up Branch integration

To integrate Branch go to [Integrations > Branch](https://app.adapty.io/integrations/branch) in Adapty Dashboard , turn on a toggle from off to on, and fill out fields.


<Zoom>
  <img src={require('./img/817a051-CleanShot_2023-08-11_at_15.54.372x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





To get the value for the **Branch Key**,  open your Branch [Account Settings](https://dashboard.branch.io/account-settings/profile) and find the **Branch Key** field. Use it for the **Key test** (for Sandbox) or **Key live** (fo Production) field in the Adapty Dashboard. In Branch, switch between Live and Tests environments for the appropriate key.


<Zoom>
  <img src={require('./img/130e58b-CleanShot_2023-08-11_at_15.24.162x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Events and tags

Below the credentials, there are three groups of events you can send to Branch from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).

You can send an event with Proceeds \(after Apple/Google cut\) or just revenue. Also, you can check a box for reporting in the user's currency.


<Zoom>
  <img src={require('./img/a645cf8-CleanShot_2023-08-11_at_15.18.282x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs.

Adapty will send subscription events to Branch using a server-to-server integration, allowing you to view all subscription events in your Branch dashboard and link them to your acquisition campaigns. 

## SDK configuration

It's very important to send Branch attribution data from the device to Adapty using `Adapty.updateAttribution()` SDK method. The example below shows how to do that.

To connect the Branch and Adapty user, make sure you provide your `customerUserId` to Branch. If you prefer not to use `customerUserId` in Branch, use the `setIntegrationIdentifier method to specify the Branch user ID.

<Tabs groupId="branch">
<TabItem value="Swift" label="iOS (Swift)" default>

```swift 
do {
    try await Adapty.setIntegrationIdentifier(
        key: "branch_id", 
        value: <BRANCH_IDENTITY_ID>
    )
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin 
// login and update attribution and identifier
Branch.getAutoInstance(this)
    .setIdentity("YOUR_USER_ID") { referringParams, error ->
        referringParams?.let { data ->
            Adapty.updateAttribution(data, "branch") { error ->
                if (error != null) {
                    //handle the error
                }
            }
        }
    }

// logout
Branch.getAutoInstance(context).logout()
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript
import 'package:flutter_branch_sdk/flutter_branch_sdk.dart';

FlutterBranchSdk.setIdentity('YOUR_USER_ID');
```
</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>
```csharp 
Branch.setIdentity("your user id");
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript 
import branch from 'react-native-branch';

branch.setIdentity('YOUR_USER_ID');
```

</TabItem>
</Tabs>

Next, pass the attribution you receive from the initializing method of Branch iOS SDK to Adapty.

<Tabs>
<TabItem value="Swift" label="iOS (Swift)" default>

```swift 
class YourBranchImplementation {
    func initializeBranch() {
        // Pass the attribution you receive from the initializing method of Branch iOS SDK to Adapty.
        Branch.getInstance().initSession(launchOptions: launchOptions) { (data, error) in
            if let data {
                Adapty.updateAttribution(data, source: .branch)
            }
        }
    }
}

```
</TabItem>
<TabItem value="kotlin" label="Android (Kotlin)" default>

```kotlin 
//everything is in the above snippet for Android
```
</TabItem>
<TabItem value="Flutter" label="Flutter (Dart)" default>

```javascript
try {
    await Adapty().setIntegrationIdentifier(
        key: "branch_id", 
        value: <BRANCH_IDENTITY_ID>,
    );
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
    // handle the error
}
```
</TabItem>
<TabItem value="Unity" label="Unity (C#)" default>

```csharp 
Branch.initSession(delegate(Dictionary<string, object> parameters, string error) {
    string attributionString = JsonUtility.ToJson(parameters);
    Adapty.UpdateAttribution(attributionString, AttributionSource.Branch, (error) => {
        // handle the error
    });
});
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>

```typescript 
import { adapty, AttributionSource } from 'react-native-adapty';
import branch from 'react-native-branch';

branch.subscribe({
  enComplete: ({
    params,
  }) => {
    adapty.updateAttribution(params, AttributionSource.Branch);
  },
});
```
</TabItem>
</Tabs>