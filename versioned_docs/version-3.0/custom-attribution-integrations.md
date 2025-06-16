---
title: "Custom attribution integration"
description: "Set up custom attribution integrations."
metadataTitle: "Custom attribution integrations Guide | Adapty Docs"
---


Adapty makes it easy to integrate with popular attribution services like [AppsFlyer](appsflyer), [Adjust](adjust), [Branch](branch), [Apple Search Ads](apple-search-ads), [Facebook Ads](facebook-ads), and more.

If you use another attribution system, you can pass the attribution data to Adapty. Then, you can segment users based on this data.  

To set custom attributes, use only the keys shown in the example below. Follow these limitations (all keys are optional):
- A maximum of 30 attributes is supported.
- Keys are limited to 30 characters.
- Values must not exceed 50 characters.
- The `status` value must be one of: `organic`, `non_organic`, or `unknown`.
- Any additional keys will be omitted.

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