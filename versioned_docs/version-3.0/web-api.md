---
title: Adapty Web API
description: ""
metadataTitle: ""
toc_max_heading_level: 4
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

The Web API is an extension of the server-side API designed for use with web apps. It allows you to retrieve the correct paywall using its related placement ID and record paywall views for accurate conversion tracking. This helps you use the A/B testing and paywall personalization available within Adapty, as well as track which paywalls work the best.

## Use case: Record a transaction from your web app and link it to the used paywall

Let's say you sell products in your web app. You need to display a paywall to your users, let them purchase a product, and then add the transaction details to Adapty. It’s essential to link these transactions to the specific paywalls through which the user made the purchase so that your analytics reflects accurate data. This can be easily accomplished using the Adapty API

### Prerequisites

1. [Create the products](create-product) you’ll use in the paywall within the Adapty Dashboard.
2. [Create the paywall](create-paywall) in the Adapty Dashboard. [Use remote config](customize-paywall-with-remote-config) to design your web paywall.
3. [Set up a placement](create-placement) and link the paywall to it in the Adapty Dashboard.

### Steps with Adapty API

1. **Create a user profile:** Adapty relies on having a profile before requesting a paywall to personalize the end result to the user who requested it. Use the [Create profile](api-adapty#/operations/createProfile) request to create a user profile.
2. **Fetch and display the paywall:** When the user reaches the placement in your web app where the paywall should be shown, use the [Get paywall](api-web#/operations/getPaywall) request to retrieve the paywall via the [placement ID](placements). As a result, you'll get a paywall for the [audience](audience) corresponding to your user. Display the paywall with your code, using the returned products and (optionally) this paywall's [remote config](customize-paywall-with-remote-config). 
3. **Record the paywall view:** Use the [Record paywall view](api-web#/operations/recordPaywallView) to log the paywall view with Adapty to ensure your analytics accurately reflect the event. This is vital to track conversions correctly.
4. **Record the purchase:** If the user completes a purchase, send the transaction details to Adapty using the Adapty API. Include the **variation ID** in this request to link the transaction to the specific paywall displayed. For guidance, check out our page on [associating paywalls with transactions in mobile apps](report-transactions-observer-mode)—the same approach applies to web apps.
5. **Add marketing attribution data (if applicable):** If you have any marketing attribution data (e.g., campaign or ad details), use the [Add attribution](api-web#/operations/addAttribution) to merge it into the user profile to enrich the analytics and learn more about your ad performance in Adapty.

---


**What's next:**

- Proceed with [Web API authorization](web-api-authorization)
- Requests:
  - [Add attribution](api-web#/operations/addAttribution)
  - [Get paywall](api-web#/operations/getPaywall)
  - [Record paywall view](api-web#/operations/recordPaywallView)
