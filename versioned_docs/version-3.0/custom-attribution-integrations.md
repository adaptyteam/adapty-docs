---
title: "Attribution integration"
description: "Set up custom attribution integrations."
metadataTitle: "Custom attribution integrations Guide | Adapty Docs"
---


Adapty allows easy integration with the popular attribution services: [AppsFlyer](appsflyer), [Adjust](adjust), [Branch](branch), [Apple Search Ads](apple-search-ads), [Facebook Ads](facebook-ads), and more. Adapty will send [subscription events](events) to these services so you can accurately measure the performance of ad campaigns. You can also filter [charts data](analytics-charts) using attribution data.

If you use another attribution system, you can pass the attribution data to Adapty. Then, you can segment users based on this data.  
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