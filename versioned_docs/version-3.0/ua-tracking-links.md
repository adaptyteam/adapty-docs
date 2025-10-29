---
title: "Tracking links in Adapty User Acquisition"
description: "Track your campaigns and measure their success anywhere."
metadataTitle: "Tracking links in Adapty User Acquisition | Adapty Docs"
keywords: ['adapty ua', 'user acquisition', 'tracking link']
---
import ZoomImage from '@site/src/components/ZoomImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tracking links let you measure where your users come from and connect installs to ad campaigns.
When someone clicks your ad, Adapty records the click and later matches it with the install event sent by the SDK. This way, you can see which channels, campaigns, ad sets, and ads drive the most revenue on your [Analytics page](ua-analytics.md).

You can create two types of tracking links:

- **One link** — a universal tracking endpoint used across all platforms. It logs campaign data and works together with your ad network’s redirect.

- **Store-specific links** — platform-targeted links that both record the click and automatically redirect users to the App Store or Google Play. You can also append deferred deep link parameters to them.

## Create tracking links

To create a tracking link:

1. In the Adapty UA dashboard, go to **Tracking links** from the sidebar menu. There, click **Create link**.

<ZoomImage id="new-tracking-link.webp" width="700px" />

2. Select your app from the list and give your tracking link a name.

<ZoomImage id="ua-choose-app.webp" width="700px" />

3. Fill in the link parameters to match it with the campaign and ad you want to track. All the parameters are required.

| Parameter                    | Description                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| **Channel**                  | The source of traffic, such as Meta, Reddit, or TikTok. Used to group campaigns in analytics. |
| **Campaign ID**              | The unique identifier of the campaign in your ad platform.                                    |
| **Campaign name**            | The readable name of the campaign.                                                            |
| **Ad set ID**                | The unique identifier of the ad set (ad group) in your ad platform.                           |
| **Ad set name**              | The name of the ad set.                                                                       |
| **Ad ID**                    | The unique identifier of the individual ad creative.                                          |
| **Ad name**                  | The name of the ad creative or variation.                                                     |

4. By default, you are setting up one link, which means it will only be used as a tracking link, and you'll need to set a redirect link to stores in your ad platform separately. 

   If you want the tracking link to be a redirect link at the same time (so it is used both for tracking and navigating users), deselect the **One link** checkbox and paste the app URLs to the **App Store application URL** and/or **Google Play application URL** fields.

<ZoomImage id="one-link.webp" width="700px" />

5. Click **Create**.
6. Open your tracking link page and copy the **Click link** from one of the sections:
   - **One link** to use only as a tracking link
   - **iOS link** or **Android link** to use both as a tracking link and as a store redirect URL

:::tip
You can also set additional link parameters to [work with deferred data](#deferred-deep-linking). For example, you can implement deferred deep linking.
:::

<ZoomImage id="click-link.webp" width="700px" />

7. Go to your ad platform and paste the link to your ad either as a tracking link (for one links) or as a click link (for platform-specific links).

Now, app installations will be matched with the ads and campaigns they are coming from, so you can measure the campaign effectiveness on the **Analytics** page.

## Deferred deep linking

Deferred deeplinks allow you to pass custom data to your app when users install it after clicking your ad. For example, you can navigate them to a specific location in your app right after they install and launch it.

Here's how it works:

1. When a user clicks your ad, Adapty saves the click data.
2. When Adapty registers the install event, it gets deferred data from the click.
3. After the user installs your app, and it launches for the first time, Adapty retrieves the stored data and your app receives the custom parameters, allowing you to react to different values in the app code.

Adapty supports the following deferred data parameters:

- `ios_deferred_data`
- `android_deferred_data`
- `deferred_data_sub[1-10]`

To add deferred data parameters, append them to your click link in your campaign settings:

1. In your ad platform, append the parameters to the link. For example, if you want your iOS users to land on the 'Welcome' screen, your link may look somehow like that:

```
https://api-ua.adapty.io/api/v1/attribution/click?adpt_cid=__ADAPTY__ID__&ios_deferred_data=welcome&campaign_id=__CAMPAIGN_ID__&adset_id=__AID__&ad_id=__CID__&campaign_name=__CAMPAIGN_NAME__&adset_name=__AID_NAME__&ad_name=__CID_NAME__&redirect_url=__APP_LINK__
```

2. Respond to parameters in your app code. Note that deferred data parameters are in the `payload` parameter, and the `payload` parameter is an escaped JSON, so you need to parse it in your app code.

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
