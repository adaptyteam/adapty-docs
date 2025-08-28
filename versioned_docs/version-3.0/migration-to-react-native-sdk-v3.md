---
title: "Migrate Adapty React Native SDK to v. 3.0"
description: "Migrate to Adapty React Native SDK v3.0 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty React Native SDK v3.0 | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK v.3.0 brings support for the new exciting [Adapty Paywall Builder](adapty-paywall-builder), the new version of the no-code user-friendly tool to create paywalls. With its maximum flexibility and rich design capabilities, your paywalls will become most effective and profitable.

## Upgrade to version 3.0.1

1. Upgrade to version 3.0.1 as usual.
2. Replace the fallback paywall files:
   1. [Download the latest version](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) from the Adapty Dashboard.
   2. Store them on the user's device and pass them to the `.setFallbackPaywalls` method as described [here](react-native-use-fallback-paywalls). 