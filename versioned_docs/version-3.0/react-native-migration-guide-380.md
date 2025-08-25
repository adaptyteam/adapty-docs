---
title: "Migrate Adapty React Native SDK to v. 3.8"
description: "Migrate to Adapty React Native SDK v3.8 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty React Native SDK v3.8 | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.8.0 is a major release that brought some improvements which however may require some migration steps from you.

## Update input type for getting placement params

`GetPaywallParamsInput` has been renamed to `GetPlacementParamsInput`:

```diff showLineNumbers
- type GetPaywallParamsInput = {
+ type GetPlacementParamsInput = {
   placementId: string;
   locale?: string;
   fetchPolicy?: AdaptyPlacementFetchPolicy;
   loadTimeout?: number;
 }
```

## Update fallback method

The method for setting fallbacks has been updated, and the type for specifying fallback locations has been renamed:

```diff showLineNumbers
- adapty.setFallbackPaywalls(paywallsLocation: Input.FallbackPaywallsLocation);
+ adapty.setFallback(fileLocation: Input.FileLocation);
```

## Update paywall property access

The following properties have been moved from `AdaptyPaywall` to `AdaptyPlacement`:

```diff showLineNumbers
- paywall.abTestName
- paywall.audienceName
- paywall.revision
- paywall.placementId
+ paywall.placement.abTestName
+ paywall.placement.audienceName
+ paywall.placement.revision
+ paywall.placement.id
```
