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
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

You can use marketing data from third-party services to find connections between your advertising efforts and user subscriptions. These connections will help you understand what motivates your users to take action. If you store attribution data in Adapty, you can filter your [subscription charts](analytics-charts) by attribution.

Adapty offers out-of-the-box attribution integration with [9 popular marketing platforms](#automatic-attribution). Users of other platforms can follow a [manual workflow](#manual-attribution) that achieves the same goal.

### Automatic Attribution

1. **Set up automatic data sharing.** Adapty offers out-of-the-box integration with 9 popular marketing platforms. These platforms can automatically receive real-time [subscription data](events) from Adapty. The marketing platform processes each purchase, and responds with an appropriate attribution (if it finds one).

    You can enable attribution integration with **multiple platforms at once**. Adapty will select the most appropriate attribution provider for each transaction.

    Each platform has its own integration workflow. Refer to your platform's dedicated documentation page for in-depth instructions:

    - [Adjust](adjust)
    - [Airbridge](airbridge)
    - [Apple Search Ads](apple-search-ads)
    - [AppsFlyer](appsflyer)
    - [Asapty](asapty)
    - [Branch](branch)
    - [Facebook Ads](facebook-ads)
    - [Singular](singular)
    - [Tenjin](tenjin)

    When you complete the setup, [disable other event sharing services](#avoid-event-duplication) to avoid duplicate events.

    :::note
    If Adapty doesn't support automatic attribution integration with your favorite marketing platform, contact [Adapty Support](mailto:support@adapty.io) to express your interest.
    :::

2. **Invoke the `.updateAttribution()` method** to retrieve attribution data from the marketing platform, and set the attribution value for the transaction.

    Adapty can only store attribution data from one source at a time. If you enable multiple attribution sources, the system gives preference to the service that shares the most information. **Once you set the attribution value, you cannot override it.**

    On iOS, non-organic [Apple Search Ads attribution](apple-search-ads) will always take priority if available. To turn Apple Search Ads attribution off, open the [**App Settings** -> **Apple Search Ads** tab](https://app.adapty.io/settings/apple-search-ads), and toggle the **Receive Apple Search Ads attribution** switch.

    Attribution integration methods **vary between the platforms**. Refer to your platform's dedicated documentation page for an in-depth overview of the SDK configuration code. The following is a **generic example**:

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
    Adapty.updateAttribution(
        mapOf("source" to "appsflyer", "campaign" to "summer_sale_2024"),
        "appsflyer",
        "networkUserId"
    ) { error ->
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
    </Tabs>

    **Parameters:**

    - **Attribution** (required): dictionary with attribution data. Adapty automatically fills it with the data it receives from the marketing platform.
    - **Source** (required): attribution source. The following values are acceptable:
        - `.appsflyer`
        - `.adjust`
        - `.branch`
        - `.custom`
    - **Network user Id** (required for AppsFlyer, optional otherwise): a string with the profile ID from the attribution service.

### Manual Attribution

1. **Send subscription data to the marketing platform**

    If Adapty doesn't offer built-in integration with your marketing platform, you need to manually program the logic necessary to send subscription data to your platform's API.

    When you complete the setup, [disable other event sharing services](#avoid-event-duplication) to avoid duplicate events.

2. **Retrieve attribution data from the marketing platform**

    If Adapty doesn't offer built-in integration with your marketing platform, you need to manually retrieve attribution data from the platform.

3. **Create a dictionary with attribution data**

    The dictionary may contain the following keys:

    - `status` (`organic`, `non-organic`, or `unknown`)
    - `channel`
    - `campaign`
    - `ad_group`
    - `ad_set`
    - `creative`

    All the keys are optional. The value of each key may be up to 50 characters long. Adapty ignores custom attribution keys.

    **Example**: 

    ```swift showLineNumbers title="Swift"
    let attribution = [
        "status": "non_organic",
        "channel": "Google Ads",
        "campaign": "Christmas Sale",
        "ad_group": "ad group 1",
        "ad_set": "ad set 1",
        "creative": "creative id 1"
    ]
    ```

4. **Set the attribution data**:

    Pass the attribution dictionary to the `updateAttribution` method:

    ```swift showLineNumbers title="Swift"
    Adapty.updateAttribution(attribution, source: "custom") { error in
        if error == nil {
            // successful attribution update
        }
    }
    ```

    Once you set the attribution value, you cannot override it.

### Avoid Event Duplication

If you use Adapty to share real-time subscription data with your marketing platforms, **you need to disable** other services that serve the same purpose. If you connected your Facebook account to AppsFlyer, Adjust, or Branch, it will automatically forward your events to these services, unless you opt out.

Duplicate events can skew your analytics, and make it hard to interpret data. Once you configured Adapty event sharing, turn third-party event forwarding capabilities **off**.  

### See Also

If your marketing platform supports automatic Attribution Integration, it also supports [User Acquisition Analytics](user-acquisition.md)! 

This capability pools all the data about your app's economy into one place, allowing you to see the relationship between ad spend and subscription revenue.