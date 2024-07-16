---
title: "Attribution integration"
description: ""
metadataTitle: ""
---

Adapty allows easy integration with the popular attribution services: [AppsFlyer](appsflyer), [Adjust](adjust), [Branch](branch), [Apple Search Ads](apple-search-ads), and [Facebook Ads](facebook-ads). Adapty will send [subscription events](events) to these services so you can accurately measure the performance of ad campaigns. You can also filter [charts data](analytics-charts) using attribution data.

Send subscription events with correct user properties and ID's to attributions services you use.

Follow our detailed guidance on configuring the following 3d-part attribution integrations:

- [Adjust](adjust)
- [Airbridge](airbridge)
- [Apple Search Ads](apple-search-ads)
- [AppsFlyer](appsflyer)
- [Asapty](asapty)
- [Branch](branch)
- [Facebook Ads](facebook-ads)
- [Singular](singular)

:::note
Don't see your attribution provider?

Let us know! [Write to the Adapty support](mailto:support@adapty.io) and we'll consider adding it.
:::

### Important

:::warning
Avoiding events duplication

Make sure to turn off sending subscription events from devices and your server to avoid duplication.

If you set up direct integration with Facebook, turn off events forwarding from AppsFlyer, Adjust, or Branch.
:::

:::info
Be sure you've set up attribution integration in Adapty Dashboard, otherwise, we won't be able to send subscription events.
:::

:::note
Attribution data is set for every profile one time, we won't override the data once it's been saved.
:::

### Setting attribution data

To set attribution data for the profile, use `.updateAttribution()` method:

```swift title="Swift"
Adapty.updateAttribution("<attribution>", source: "<source>", networkUserId: "<networkUserId>") { error in
    if error == nil {
        // succesfull attribution update
    }
}
```
```kotlin title="Kotlin"
Adapty.updateAttribution("<attribution>", "<source>", "<networkUserId>") { error ->
    if (error == null) {
        // succesfull attribution update
    }
}
```
```java title="Java"
Adapty.updateAttribution("<attribution>", "<source>", "<networkUserId>", error -> {
    if (error == null) {
        // succesfull attribution update
    }
});
```
```javascript title="Flutter"
try {
  await Adapty().updateAttribution("<attribution>", source: "<source>", networkUserId: "<networkUserId>");
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```typescript title="React Native"
// Optionally import enum to JavaScript
import { AttributionSource } from 'react-native-adapty';

const attribution = { /* ... */ };

try {
	await adapty.updateAttribution(
		attribution,
		AttributionSource.Branch, // or just 'branch'
		'networkUserId'
	);
	// succesfull attribution update
} catch (error) {
	// handle `AdaptyError`
}
```
```csharp title="Unity"
Adapty.UpdateAttribution("<attributions>", source, "<networkUserId>", (error) => {
    if (error != null) {
        // handle the error
    }
  
		// succesfull attribution update
});
```

**Request parameteres:**

- **Attribution** (required): a dictionary containing attribution (conversion) data.

- **Source** (required): a source of attribution. The allowed values are:
  - `.appsflyer`
  - `.adjust`
  - `.branch`
  - `.custom`

- **Network user Id** (optional): a string profile's identifier from the attribution service.

### AppsFlyer

:::warning
iOS SDK

To set attribution from AppsFlyer, pass the attribution you receive from the delegate method of AppsFlyer iOS SDK. Don't forget to set `networkUserId`. You should also configure [AppsFlyer integration](appsflyer) in Adapty Dashboard.
:::

:::warning
In this case, it is mandatory to pass the `networkUserId` parameter.
:::

```swift title="Swift"
// Find your implementation of AppsFlyerLibDelegate 
// and update onConversionDataSuccess method:
func onConversionDataSuccess(_ installData: [AnyHashable : Any]) {
    // It's important to include the network user ID
    Adapty.updateAttribution(installData, source: .appsflyer, networkUserId: AppsFlyerLib.shared().getAppsFlyerUID())
}
```
```kotlin title="Kotlin"
val conversionListener: AppsFlyerConversionListener = object : AppsFlyerConversionListener {
    override fun onConversionDataSuccess(conversionData: Map<String, Any>) {
        // It's important to include the network user ID
        Adapty.updateAttribution(
            conversionData,
            AdaptyAttributionSource.APPSFLYER,
            AppsFlyerLib.getInstance().getAppsFlyerUID(context)
        ) { error ->
            if (error != null) {
                //handle error
            }
        }
    }
}
```
```java title="Java"
AppsFlyerConversionListener conversionListener = new AppsFlyerConversionListener() {
    @Override
    public void onConversionDataSuccess(Map<String, Object> conversionData) {
        // It's important to include the network user ID
        Adapty.updateAttribution(
                conversionData,
                AdaptyAttributionSource.APPSFLYER,
                AppsFlyerLib.getInstance().getAppsFlyerUID(context),
                error -> {
                    if (error != null) {
                        //handle error
                    }
                }
        );
    }
};
```
```javascript title="Flutter"
@override
Future<bool> initialize() async {
    appsflyerSdk.onInstallConversionData((data) {
      try {
        await Adapty().updateAttribution(data, 
                                         source: AdaptyAttributionSource.appsflyer, 
                                         networkUserId: await appsflyerSdk.getAppsFlyerUID());
      } on AdaptyError catch (adaptyError) {
	      // handle the error
      } catch (e) {
      }        
    });

    await appsflyerSdk.initSdk(
    	registerConversionDataCallback: true,
    	registerOnAppOpenAttributionCallback: true,
    	registerOnDeepLinkingCallback: true
    );

    return Future<bool>.value(true);
}
```

### Adjust

:::warning
iOS SDK

To set attribution from Adjust, pass the attribution you receive from the delegate method of Adjust iOS SDK. You should also configure [Adjust integration](adjust) in Adapty Dashboard.
:::

```swift title="Swift"
// Find your implementation of AdjustDelegate 
// and update adjustAttributionChanged method:
func adjustAttributionChanged(_ attribution: ADJAttribution?) {
    if let attribution = attribution?.dictionary() {
        Adapty.updateAttribution(attribution, source: .adjust)
    }
}
```
```kotlin title="Kotlin"
adjustConfig.setOnAttributionChangedListener { attribution ->
    attribution?.let { attribution ->
        Adapty.updateAttribution(attribution, AdaptyAttributionSource.ADJUST) { error ->
            if (error != null) {
                //handle error
            }
        }
    }
}
```
```java title="Java"
adjustConfig.setOnAttributionChangedListener(attribution -> {
    if (attribution != null) {
        Adapty.updateAttribution(attribution, AdaptyAttributionSource.ADJUST, error -> {
            if (error != null) {
                //handle error
            }
        });
    }
});
```

### Branch

:::warning
iOS SDK

To connect Branch user and Adapty user, make sure you set your `customerUserId` as Branch Identity Id. If you prefer to not use `customerUserId` in Branch, set `networkUserId` param in `.updateAttribution()` method to specify the Branch user Id.
:::

```swift title="Swift"
// Pass the attribution you receive from the initializing method of Branch iOS SDK to Adapty.
Branch.getInstance().initSession(launchOptions: launchOptions) { (data, error) in
    if let data = data {
        Adapty.updateAttribution(data, source: .branch)
    }
}
```
```kotlin title="Kotlin"
object branchListener : Branch.BranchReferralInitListener {
    override fun onInitFinished(referringParams: JSONObject?, error: BranchError?) {
        referringParams?.let { data ->
            Adapty.updateAttribution(data, AdaptyAttributionSource.BRANCH) { error ->
                if (error != null) {
                    //handle error
                }
            }
        }
    }
}
```
```java title="Java"
Branch.BranchReferralInitListener branchListener = (data, e) -> {
    if (data != null) {
        Adapty.updateAttribution(data, AdaptyAttributionSource.BRANCH, error -> {
            if (error != null) {
                //handle error
            }
        });
    }
};
```

:::note
You should also configure [Branch integration](branch) in Adapty Dashboard.
:::

### Apple Search Ads

Adapty can automatically collect Apple Search Ad attribution data. All you need is to add `AdaptyAppleSearchAdsAttributionCollectionEnabled` to the app’s `Info.plist` file and set it to `YES` (boolean value).

### Facebook Ads

Because of iOS IDFA changes in iOS 14.5, if you use Facebook integration, make sure you send [`facebookAnonymousId`](https://developers.facebook.com/docs/reference/iossdk/current/FBSDKCoreKit/classes/fbsdkappevents.html/) to Adapty via [`.updateProfile()`](setting-user-attributes) method. It allows Facebook to handle events if IDFA is not available. You should also configure [Facebook Ads](facebook-ads) in Adapty Dashboard.

```swift title="Swift"
let builder = ProfileParameterBuilder()
    .with(facebookAnonymousId: FBSDKCoreKit.AppEvents.anonymousID)

Adapty.updateProfile(parameters: builder.build()) { error in
    if error == nil {
        // successful update
    }
}
```
```kotlin title="Kotlin"
val builder = AdaptyProfileParameters.Builder()
    .withFacebookAnonymousId(AppEventsLogger.getAnonymousAppDeviceGUID(context))
  
Adapty.updateProfile(builder.build()) { error ->
    if (error == null) {
        // successful update
    }
}
```
```java title="Java"
AdaptyProfileParameters.Builder builder = new AdaptyProfileParameters.Builder()
        .withFacebookAnonymousId(AppEventsLogger.getAnonymousAppDeviceGUID(context));

Adapty.updateProfile(builder.build(), error -> {
    if (error == null) {
        // successful update
    }
});
```

### Custom

If you use another attribution system, you can pass the attribution data to Adapty. You can then segment users based on this data.  
To set attributes, use only the keys from the example below (all keys are optional). The system supports max 30 available attributes, where the keys are limited to 30 characters. Every value in the map should be no longer than 50 characters. `status` can only be `organic`, `non-organic` or `unknown`. Any additional keys will be omitted. 

```swift title="Swift"
let attribution = [
    "status": "non_organic|organic|unknown",
    "channel": "Google Ads",
    "campaign": "Christmas Sale",
    "ad_group": "ad group",
    "ad_set": "ad set",
    "creative": "creative id"
]
Adapty.updateAttribution(attribution, source: .custom)
```