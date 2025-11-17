---
title: "Migrate Adapty Android SDK to v. 3.12"
description: "Migrate to Adapty Android SDK v3.12 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty Android SDK v3.12 | Adapty Docs"
---

In Adapty SDK 3.12.0, we have deleted the `logShowOnboarding` method from the SDK.
If you have been using this method, it won't be available when you upgrade the SDK to version 3.12 or later.

Instead, you can [create onboardings in the Adapty no-code onboarding builder](onboardings.md). Analytics for these onboardings are tracked automatically, and you have a lot of customization options.