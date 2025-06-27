---
title: "Migration guide to React Native Adapty SDK 3.8.0"
description: "Migrate to React Native Adapty SDK 3.8.0"
metadataTitle: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK 3.8.0 is a major release that brought some improvements which however may require some migration steps from you.

## Update input type for getting placement params

The input type for getting placement params has been renamed to better reflect its purpose:

```diff showLineNumbers
- type GetPaywallParamsInput = {
+ type GetPlacementParamsInput = {
   placementId: string;
   locale?: string;
   fetchPolicy?: AdaptyPlacementFetchPolicy;
   loadTimeout?: number;
 }
```

## Update fallback location type

The type for specifying fallback locations has been renamed:

```diff showLineNumbers
- type FallbackPaywallsLocation = {
+ type FileLocation = {
   ios?: {
     fileName: string;
   };
   android?: {
     relativeAssetPath?: string;
     rawResName?: string;
   };
 }
```

## Update fallback method

The method for setting fallbacks has been updated:

```diff showLineNumbers
- await adapty.setFallbackPaywalls(paywallsLocation: Input.FallbackPaywallsLocation);
+ await adapty.setFallback(fileLocation: Input.FileLocation);
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
