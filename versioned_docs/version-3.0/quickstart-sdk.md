---
title: "Integrate the Adapty SDK in your app code"
description: "Integrate Adapty with App Store, Google Play, custom stores, Stripe, and Paddle."
metadataTitle: "Integrate with stores or web payments and set up products | Adapty Docs"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Explain what they will need:
- Install & configure: Just for it to work :)
- Log users into the app: To manage user IDs locally.
- Identify users: To link the user to their Adapty profile, access their subscription history and sync profiles across devices.
- Show a paywall: To render your paywall and handle purchases.
- Handle button actions: They must remember that actions are not handled automatically, so you can customize the app's response in your code.
- Unlock premium content based on the subscription: Use the profile data to understand what should be available to users.
- Listen for subscription status updates: Update the profile information to control whether paid content is available.

The order may vary from app to app, but basically that's it.

Draw a simple diagram with the method names and flow to show that evertyhing is quite easy.

Mention sample apps here. 

Redirect readers to platform-specific quickstarts from here (open in a new page, so they understand that they are being navigated to the SDK docs): e.g., [ios-sdk-overview](ios-sdk-overview)