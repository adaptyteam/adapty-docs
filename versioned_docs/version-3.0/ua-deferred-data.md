---
title: "Deferred deeplinks in Adapty User Acquisition"
description: "Set up deeplinks in Adapty User Acquisition"
metadataTitle: "Deferred deeplinks in Adapty User Acquisition | Adapty Docs"
keywords: ['adapty ua', 'user acquisition', 'deeplink', 'deferred deeplink']
---
import ZoomImage from '@site/src/components/ZoomImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Deferred deeplinks allow you to pass custom data to your app when users install it after clicking your ads. For example, you can navigate them to a specific location in your app right after they install and launch it.

Here's how it works:

1. When a user clicks your ad, Adapty saves the click data.
2. When Adapty registers the install event, it gets deferred data from the click.
3. After the user installs your app, and it launches for the first time, Adapty retrieves the stored data and your app receives the custom parameters, allowing you to react to different values in the app code.

Adapty supports the following deferred data parameters:

- `ios_deferred_data`
- `android_deferred_data`
- `deferred_data_sub[1-10]`

To add deferred data parameters, append them to your click link in your campaign settings:

1. Copy the click link to your campaign.

<ZoomImage id="ua-lnk.webp" width="900px" />

2. Append the parameters to the link. For example, if you want your iOS users to land on the 'Welcome' screen, your link may look somehow like that:

```
https://api-ua.adapty.io/api/v1/attribution/click?adpt_cid=__ADAPTY__ID__&ios_deferred_data=welcome&campaign_id=__CAMPAIGN_ID__&adset_id=__AID__&ad_id=__CID__&campaign_name=__CAMPAIGN_NAME__&adset_name=__AID_NAME__&ad_name=__CID_NAME__&redirect_url=__APP_LINK__
```

3. Respond to parameters in your app code. Note that deferred data parameters are in the `payload` parameter, and the `payload` parameter is an escaped JSON, so you need to parse it in your app code.

For example, here is how you can handle installations where `ios_deferred_data` is `welcome`:


<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
Adapty.delegate = self

nonisolated func onInstallationDetailsSuccess(_ details: AdaptyInstallationDetails) {
    guard
        let payloadStr = details.payload,
        let data = payloadStr.data(using: .utf8),
        let payload = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
        let deeplink = payload["ios_deferred_data"] as? String,
        deeplink == "welcome"
    else { return }

    DispatchQueue.main.async {
        print("Navigate to welcome screen")
        // navigate to your screen here
    }
}
```

</TabItem>

<TabItem value="android" label="Kotlin">

```kotlin showLineNumbers
Adapty.setOnInstallationDetailsListener(object : OnInstallationDetailsListener {
    override fun onInstallationDetailsSuccess(details: AdaptyInstallationDetails) {
        details.payload?.let {
            runCatching {
                val json = JSONObject(it)
                if (json.optString("android_deferred_data") == "welcome") {
                    println("Navigate to welcome screen")
                    // navigate here
                }
            }.onFailure(Throwable::printStackTrace)
        }
    }
})

```

</TabItem>

<TabItem value="rn" label="React Native" default>

```typescript showLineNumbers
adapty.addEventListener('onInstallationDetailsSuccess', details => {
    // Parse the payload JSON and navigate to welcome screen if needed
    try {
        if (details.payload) {
            const payload = JSON.parse(details.payload);
            if (payload.ios_deferred_data === 'welcome') {
                // Navigate to welcome screen
                // Replace with your app's navigation logic
                // For example, using React Navigation:
                // navigation.navigate('Welcome');
                console.log('Navigate to welcome screen');
            }
        }
    } catch (error) {
        console.error('Error parsing installation details payload:', error);
    }
});
```

</TabItem>


<TabItem value="flutter" label="Flutter">

```dart showLineNumbers
Adapty().onUpdateInstallationDetailsSuccessStream.listen((details) {
  final payloadStr = details.payload;
  if (payloadStr == null) return;

  final payload = json.decode(payloadStr) as Map<String, dynamic>;
  if (payload['ios_deferred_data'] == 'welcome') {
    print('Navigate to welcome screen');
  }
});

```

</TabItem>

</Tabs>

#### Set up fallback deferred data parameters

In the [Meta Ads](ua-facebook.md) and [TikTok for Business](ua-tiktok.md) integrations, you can set up fallback values for deferred data parameters. If deferred data is not retrieved from the click link, these fallback values will be used instead.

To set up fallback values for deferred data:

1. Go to the **Deferred Deeplinks** tab in your campaign configuration in the Adapty UA dashboard.
2. Enter the deferred parameter values for iOS and Android in the **Deferred deeplink data** field for each platform.
3. Click **Save** to apply your configuration.

<ZoomImage id="ua-deeplink.webp" width="900px" />
