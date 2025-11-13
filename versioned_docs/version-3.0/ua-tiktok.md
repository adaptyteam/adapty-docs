---
title: "Integrate TikTok for Business with Adapty UA"
metadataTitle: "Using Adapty User Acquisition | Adapty Docs"
keywords: ['adapty ua', 'user acquisition']
---
import ZoomImage from '@site/src/components/ZoomImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';

Adapty UA’s TikTok for Business integration lets you track and optimize campaign performance in TikTok.

<details>
   <summary>See how to create a campaign in TikTok for Business</summary>

1. Create a new campaign.
2. Select **Traffic** as a campaign objective.
3. Select **Website** as **Promotion type** at the **Ad group** level.
4. Select **Website** as **Destination type**. You will use the **Click link** from [Step 2](#step-2-add-campaigns) as **Website URL**.
</details>

## Step 1. Connect your TikTok account

1. Go to **Integrations > TikTok Ads** from the left sidebar and click **Continue with TikTok**.

<ZoomImage id="ua-connect-tiktok.webp" width="700px" />

2. Sign in using your TikTok account and click **Continue**.

3. Review the requested permissions and click **Save**.

<ZoomImage id="ua-tiktok-sign.webp" width="500px" />

After that, all your companies will be added to Adapty UA. You can proceed with adding campaigns.

## Step 2. Add campaigns

To add a TikTok for Business campaign to Adapty User Acquisition and track how your TikTok ads work in Adapty:

1. Switch to the **Web campaigns** tab and click **Create campaign**. Select the app and click **Save**.

<ZoomImage id="ua-new-campaign-tiktok.webp" width="500px" />

2. In the **General** tab, paste your App Store and/or Google Play application URLs.

<ZoomImage id="ua-url.webp" width="900px" />

3. Copy the **Click link** field value. Then, in TikTok Ads Manager, when creating your ad, paste this value in the **Tracking URL** field under the **Advanced Settings** section. This will allow Adapty to connect installs and purchases to ads in TikTok.

<ZoomImage id="ua-tiktok-lnk.webp" width="900px" />

4. (Optional) To send the conversion events back to TikTok, you can also associate your pixels from TikTok with campaigns in Adapty UA. To do that, select one of your existing pixels in the **Pixel** dropdown.

## Step 3. Map events

To send conversion events back to TikTok for campaign optimization, you need to configure event mapping in the **Events names** section. This allows Adapty to automatically send subscription events to your TikTok pixel when users perform actions in your app.

In the **Events names** section, toggle on the events you want to track in TikTok Ads Manager. For each enabled event, select the corresponding TikTok event from the dropdown or set a custom one. By default, Adapty maps Adapty events to TikTok's standard events.

Click **Save** to apply your event mapping configuration.

<ZoomImage id="ua-meta-events.webp" width="900px" />

## Additional configuration

### Additional parameters

The **Additional parameter** field allows you to add custom data points for analysis outside Adapty. This is useful when you need to pass specific campaign or user data to external analytics tools or attribution partners.

In the **Additional parameter** field, enter any custom data you want to include with your attribution tracking. The additional parameter will be included in all attribution data sent to TikTok and can be used for advanced campaign analysis and optimization.

For example, if you're running multiple variations of the same campaign, you could add `variant=A` or `variant=B` to distinguish between different creative approaches.

:::important
Additional parameters change the **Click link** you paste in TikTok Ads Manager. If you have already copied this link there and added a custom parameter later, ensure you copy and paste an updated click link that contains the custom parameter.
:::

<br/>

<ZoomImage id="ua-custom.webp" width="900px" />


### Attribution settings

Attribution settings control how Adapty matches user actions to your TikTok Ads campaigns. These settings determine the time windows for both deterministic and probabilistic attribution matching.

To configure attribution settings, go to the **Attribution Settings** tab in your campaign configuration. Here you'll find two main settings to adjust:

- **Deterministic matching window**: This uses exact device identifiers (like IDFA on iOS or Advertising ID on Android) to match users to campaigns with high precision. Set this to 168 hours (7 days) for maximum attribution accuracy - this is the default and recommended value. When a user clicks your TikTok ad and installs your app within this window, Adapty can definitively attribute the install to that specific ad click using device identifiers.

- **Probabilistic matching window**: This uses statistical modeling and device fingerprinting to match users when deterministic matching isn't possible. Set this to 6 hours for most campaigns - this is the default and works well for most use cases. For campaigns with high click volumes, you can reduce this to 1-2 hours. For users who can't be matched deterministically (due to privacy settings or other factors), Adapty uses probabilistic matching within this shorter window.

Click **Save** to apply your attribution settings.

<ZoomImage id="ua-meta-attribution-settings.webp" width="900px" />

### Deferred deep linking

Deferred deeplinks allow you to pass custom data to your app when users install it after clicking your TikTok ads. For example, you can navigate them to a specific location in your app right after they install and launch it.

Here's how it works:

1. When a user clicks your TikTok ad, TikTok stores the click data.
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

### Set up fallback deferred data parameters

To set up fallback values for deferred data:

1. Go to the **Deferred Deeplinks** tab in your campaign configuration in the Adapty UA dashboard.
2. Enter the deferred parameter values for iOS and Android in the **Deferred deeplink data** field for each platform.
3. Click **Save** to apply your configuration.

If these parameters are not retrieved from the click link, these fallback values will be used instead.

<ZoomImage id="ua-deeplink.webp" width="900px" />
