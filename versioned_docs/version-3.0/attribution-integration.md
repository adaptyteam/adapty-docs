---
title: "Attribution integration"
description: "Integrate Adapty with attribution tools to track user acquisition and LTV."
metadataTitle: "Attribution Integration Guide | Adapty Docs"
keywords: ['attribution', 'updateAttribution']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty allows easy integration with the popular attribution services: [AppsFlyer](appsflyer), [Adjust](adjust), [Branch](branch), [Apple Search Ads](apple-search-ads), and [Facebook Ads](facebook-ads). Adapty will send [subscription events](events) to these services so you can accurately measure the performance of ad campaigns. You can also filter [charts data](analytics-charts) using attribution data.

You can also integrate with [Adapty's User Acquisition](user-acquisition.md) to connect ad spend with subscription revenue, giving you a complete view of your app's economy in one place.

### Important
Send subscription events with correct user properties and ID's to attributions services you use.

:::warning

- **Avoid event duplication**: Be sure to disable subscription event forwarding from both devices and your server to prevent duplicates. If you're using direct integration with Facebook, remember to turn off event forwarding from AppsFlyer, Adjust, or Branch.

- **Properly set up attribution integration**: Ensure that attribution is set up in both your mobile app code and the Adapty Dashboard. Without both in place, Adapty won’t be able to send subscription events.
- **Set a single attribution source**: Adapty can use attribution data in analytics from only one source at a time. If multiple attribution sources are enabled, the system will decide which attribution to use for each device based on the source that provides more fields. 
  For iOS devices, this means non-organic [Apple Search Ads attribution](apple-search-ads) will always take priority if it's enabled. You can disable Apple Search Ads attribution collection by toggling off the **Receive Apple Search Ads attribution in Adapty** in the [**App Settings** -> **Apple Search Ads** tab](https://app.adapty.io/settings/apple-search-ads). 
- **Attribution data is never overwritten in analytics**: Attribution data is saved once after the user profile is created and won’t be overwritten in analytics once stored.

:::

Follow our detailed guidance on configuring the following 3d-part attribution integrations:

- [Adjust](adjust)
- [Airbridge](airbridge)
- [Apple Search Ads](apple-search-ads)
- [AppsFlyer](appsflyer)
- [Asapty](asapty)
- [Branch](branch)
- [Facebook Ads](facebook-ads)
- [Singular](singular)
- [Tenjin](tenjin)

:::note
Don't see your attribution provider?

Let us know! [Write to the Adapty support](mailto:support@adapty.io) and we'll consider adding it.
:::

<!--

### Setting attribution data

To set attribution data for the profile, use `.updateAttribution()` method:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers
Adapty.updateAttribution("<attribution>", source: "<source>", networkUserId: "<networkUserId>") { error in
    if error == nil {
        // succesfull attribution update
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
Adapty.updateAttribution("<attribution>", "<source>", "<networkUserId>") { error ->
    if (error == null) {
        // succesfull attribution update
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
Adapty.updateAttribution("<attribution>", "<source>", "<networkUserId>", error -> {
    if (error == null) {
        // succesfull attribution update
    }
});
```
</TabItem>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
try {
  await Adapty().updateAttribution("<attribution>", source: "<source>", networkUserId: "<networkUserId>");
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
Adapty.UpdateAttribution("<attributions>", source, "<networkUserId>", (error) => {
    if (error != null) {
        // handle the error
    }
  
        // succesfull attribution update
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
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
</TabItem>
</Tabs>

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

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers
// Find your implementation of AppsFlyerLibDelegate 
// and update onConversionDataSuccess method:
func onConversionDataSuccess(_ installData: [AnyHashable : Any]) {
    // It's important to include the network user ID
    Adapty.updateAttribution(installData, source: .appsflyer, networkUserId: AppsFlyerLib.shared().getAppsFlyerUID())
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
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
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
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
</TabItem>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
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
</TabItem>
</Tabs>

### Adjust

:::warning
iOS SDK

To set attribution from Adjust, pass the attribution you receive from the delegate method of Adjust iOS SDK. You should also configure [Adjust integration](adjust) in Adapty Dashboard.
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers
// Find your implementation of AdjustDelegate 
// and update adjustAttributionChanged method:
func adjustAttributionChanged(_ attribution: ADJAttribution?) {
    if let attribution = attribution?.dictionary() {
        Adapty.updateAttribution(attribution, source: .adjust)
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
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
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
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
</TabItem>
</Tabs>




### Branch

:::warning
iOS SDK

To connect Branch user and Adapty user, make sure you set your `customerUserId` as Branch Identity Id. If you prefer to not use `customerUserId` in Branch, set `networkUserId` param in `.updateAttribution()` method to specify the Branch user Id.
:::

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers
// Pass the attribution you receive from the initializing method of Branch iOS SDK to Adapty.
Branch.getInstance().initSession(launchOptions: launchOptions) { (data, error) in
    if let data = data {
        Adapty.updateAttribution(data, source: .branch)
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
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
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
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
</TabItem>
</Tabs>




:::note
You should also configure [Branch integration](branch) in Adapty Dashboard.
:::

### Apple Search Ads

Adapty can automatically collect Apple Search Ad attribution data. All you need is to add `AdaptyAppleSearchAdsAttributionCollectionEnabled` to the app’s `Info.plist` file and set it to `YES` (boolean value).

### Facebook Ads

Because of iOS IDFA changes in iOS 14.5, if you use Facebook integration, make sure you send [`facebookAnonymousId`](https://developers.facebook.com/docs/reference/iossdk/current/FBSDKCoreKit/classes/fbsdkappevents.html/) to Adapty via [`.updateProfile()`](setting-user-attributes) method. It allows Facebook to handle events if IDFA is not available. You should also configure [Facebook Ads](facebook-ads) in Adapty Dashboard.

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers
let builder = ProfileParameterBuilder()
    .with(facebookAnonymousId: FBSDKCoreKit.AppEvents.anonymousID)

Adapty.updateProfile(parameters: builder.build()) { error in
    if error == nil {
        // successful update
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
val builder = AdaptyProfileParameters.Builder()
    .withFacebookAnonymousId(AppEventsLogger.getAnonymousAppDeviceGUID(context))
  
Adapty.updateProfile(builder.build()) { error ->
    if (error == null) {
        // successful update
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
AdaptyProfileParameters.Builder builder = new AdaptyProfileParameters.Builder()
        .withFacebookAnonymousId(AppEventsLogger.getAnonymousAppDeviceGUID(context));

Adapty.updateProfile(builder.build(), error -> {
    if (error == null) {
        // successful update
    }
});
```
</TabItem>
</Tabs>

-->

### Custom

If you use another attribution system, you can pass the attribution data to Adapty. You can then segment users based on this data.  
To set attributes, use only the keys from the example below (all keys are optional). The system supports max 30 available attributes, where the keys are limited to 30 characters. Every value in the map should be no longer than 50 characters. `status` can only be `organic`, `non-organic` or `unknown`. Any additional keys will be omitted. 

```swift showLineNumbers title="Swift"
let attribution = [
    "status": "non_organic|organic|unknown",
    "channel": "Google Ads",
    "campaign": "Christmas Sale",
    "ad_group": "ad group",
    "ad_set": "ad set",
    "creative": "creative id"
]
Adapty.updateAttribution(attribution, source: "custom")
```