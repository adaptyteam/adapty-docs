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

Integrate Adapty with an attribution data provider to:

* Match subscription events to specific marketing campaigns
* Discover which marketing strategies yield the most revenue
* Filter Adapty [subscription charts](analytics-charts) by attribution
* Use the capabilities of a third-party service to analyze Adapty subscription data

Adapty supports a [simplified integration process](#simplified-attribution-process) for 9 popular platforms. You can integrate any other platform with a [manual attribution](#manual-attribution) process.


## Simplified attribution process

Adapty offers out-of-the-box attribution integration with [9 popular services](#platform-specific-guides). These platforms can automatically receive [subscription data](events) from Adapty, process each purchase, and respond with an appropriate attribution.

### General overview

Each platform has a different workflow, but the steps are similarly simple:

1. **Set up automatic data sharing.** Authorize Adapty to communicate with your platform of choice.
2. **Integrate the Aadpty SDK.** Some platforms require extra code to set attribution data.
3. **Disable other event sharing services and attribution sources** to avoid [event duplication](#avoid-event-duplication) and [data conflicts](#select-a-single-attribution-source).

### Platform-specific guides

- [Adjust](adjust)
- [Airbridge](airbridge)
- [Apple Search Ads](apple-search-ads)
- [AppsFlyer](appsflyer)
- [Asapty](asapty)
- [Branch](branch)
- [Facebook Ads](facebook-ads)
- [Singular](singular)
- [Tenjin](tenjin)

If Adapty doesn't offer a simplified attribution workflow for your favorite service, contact [Adapty Support](mailto:support@adapty.io) to express your interest.

## Manual attribution

If your attribution source does not suppport the [simplified attribution workflow](#simplified-attribution-process), you need to write your own code that communicates with the attribution source.

1. **Send subscription data to the attribution service**

    Program the logic necessary to send subscription data to your platform's API.

2. **Retrieve attribution data from the attribution service**

    Retrieve attribution data from the platform.

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

    Pass the attribution dictionary to the `updateAttribution` method. Once you set the attribution value, you cannot override it:

    ```swift showLineNumbers title="Swift"
    Adapty.updateAttribution(attribution, source: "custom") { error in
        if error == nil {
            // successful attribution update
        }
    }
    ```

    **Parameters:**

    - `attribution` (required): dictionary with attribution data.
    - `source` (required): attribution source. Set to `.custom` if your attribution provider does not support the [simplified attribution process](#simplified-attribution-process).
    - `networkUserID` (optional): a string with the profile ID from the attribution service.

5. **Disable other event sharing services and attribution sources** to avoid [event duplication](#avoid-event-duplication) and [data conflicts](#select-a-single-attribution-source).

## Best practices

### Select a single attribution source

Do not enable attribution integration with multiple platforms at once. Adapty can only accept one attribution source at a time, and once it saves the attribution value, it cannot override it.

If you enable multiple attribution sources, Adapty will select the source with the most data — not necessarily the best data.

For example, non-organic [Apple Search Ads attribution](apple-search-ads) will always take priority on iOS. To turn Apple Search Ads attribution off, open the [**App Settings** -> **Apple Search Ads** tab](https://app.adapty.io/settings/apple-search-ads), and toggle the **Receive Apple Search Ads attribution** switch.

### Avoid event duplication

If you use Adapty to share real-time subscription data with your attribution services, **you need to disable** other services that serve the same purpose. If you connected your Facebook account to AppsFlyer, Adjust, or Branch, it will automatically forward your events to these services, unless you opt out.

Duplicate events can skew your analytics, and make it hard to interpret data. Once you configured Adapty event sharing, turn third-party event forwarding capabilities **off**.  

### What's Next

Enable [User Acquisition Analytics](user-acquisition.md) to learn more about your application economy. Dive deeper into the complicated relationship between ad spend and subscription revenue.
