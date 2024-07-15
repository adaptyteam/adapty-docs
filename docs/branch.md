---
title: "Branch"
description: ""
metadataTitle: ""
---

[Branch](https://www.branch.io/) enables customers to reach, interact, and assess results across diverse devices, channels, and platforms. It's a user-friendly platform designed to enhance mobile revenue through specialized links that work seamlessly on all devices, channels, and platforms.

Adapty provides a complete set of data that lets you track [subscription events](https://docs.adapty.io/docs/events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective. 

The integration between Adapty and Branch operates in two main ways.

1. **Receiving attribution data from Branch**  
   Once you've set up the Branch integration, Adapty will start receiving attribution data from Branch. You can easily access and view this data on the user's profile page.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/49f4aa7-CleanShot_2023-08-11_at_17.36.072x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





2. **Sending subscription events to Branch**  
   Adapty can send all subscription events which are configured in your integration to Branch. As a result, you'll be able to track these events within the Branch dashboard. 

## How to set up Branch integration

To integrate Branch go to [Integrations > Branch](https://app.adapty.io/integrations/branch) in Adapty Dashboard , turn on a toggle from off to on, and fill out fields.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/817a051-CleanShot_2023-08-11_at_15.54.372x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





To get the value for the **Branch Key**,  open your Branch [Account Settings](https://dashboard.branch.io/account-settings/profile) and find the **Branch Key** field. Use it for the **Key test** or **Key live** field in the Adapty Dashboard. In Branch, switch between Live and Tests environments for the appropriate key.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/130e58b-CleanShot_2023-08-11_at_15.24.162x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





## Events and tags

Below the credentials, there are three groups of events you can send to Branch from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](https://docs.adapty.io/docs/events).

You can send an event with Proceeds \(after Apple/Google cut\) or just revenue. Also, you can check a box for reporting in the user's currency.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/a645cf8-CleanShot_2023-08-11_at_15.18.282x.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs.

Adapty will send subscription events to Branch using a server-to-server integration, allowing you to view all subscription events in your Branch dashboard and link them to your acquisition campaigns. 

## SDK configuration

It's very important to send Branch attribution data from the device to Adapty using `Adapty.updateAttribution()` SDK method. The example below shows how to do that.

To connect the Branch and Adapty user, make sure you provide your `customerUserId` as Branch Identity id. If you prefer not to use `customerUserId` in Branch, use `networkUserId` param in attribution method to specify the Branch user ID to attach to.

```swift iOS (Swift)
// login
Branch.getInstance().setIdentity("YOUR_USER_ID")
```
```kotlin Android (Kotlin)
// login and update attribution
Branch.getAutoInstance(this)
    .setIdentity("YOUR_USER_ID") { referringParams, error ->
        referringParams?.let { params ->
            Adapty.updateAttribution(data, AdaptyAttributionSource.BRANCH) { error ->
    						if (error != null) {
        						//handle error
    						}
						}
        }
    }

// logout
Branch.getAutoInstance(context).logout()
```
```csharp Flutter (Dart)
import 'package:flutter_branch_sdk/flutter_branch_sdk.dart';

FlutterBranchSdk.setIdentity('YOUR_USER_ID');
```
```typescript React Native (TS)
import branch from 'react-native-branch';

branch.setIdentity('YOUR_USER_ID');
```
```csharp Unity (C#)
Branch.setIdentity("your user id");
```

Next, pass the attribution you receive from the initializing method of Branch iOS SDK to Adapty.

```swift iOS (Swift)
// Pass the attribution you receive from the initializing method of Branch iOS SDK to Adapty.
Branch.getInstance().initSession(launchOptions: launchOptions) { (data, error) in
    if let data = data {
        Adapty.updateAttribution(data, source: .branch)
    }
}
```
```kotlin Android (Kotlin)
//everything is in the above snippet for Android
```
```Text Flutter (Dart)
import 'package:flutter_branch_sdk/flutter_branch_sdk.dart';

FlutterBranchSdk.initSession().listen((data) async {
    try {
        await Adapty().updateAttribution(data, source: AdaptyAttributionSource.branch);
    } on AdaptyError catch (adaptyError) {
        // handle error
    } catch (e) {}
});
```
```typescript React Native (TS)
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
```csharp Unity (C#)
Branch.initSession(delegate(Dictionary<string, object> parameters, string error) {
    string attributionString = JsonUtility.ToJson(parameters);
    Adapty.UpdateAttribution(attributionString, AttributionSource.Branch, (error) => {
        // handle the error
    });
});
```