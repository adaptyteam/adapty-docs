---
title: Adapty Web API
description: ""
metadataTitle: ""
toc_max_heading_level: 4
displayed_sidebar: APISidebar
---

import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

The Web API is an extension of the server-side API designed for use with web apps. It allows you to retrieve the correct paywall using its connected placement ID and record paywall views. This helps you track which paywalls contribute to your revenue

## Use case: Record a transaction from your web app and link it to the used paywall

Let's say you sell products in your web app. You need to display a paywall to your users, let them purchase a product, and then add the transaction details to Adapty. It’s essential to link these transactions to the specific paywalls through which the user made the purchase so that your analytics reflect accurate data. This can be easily accomplished using the Adapty API

### Prerequisites

1. [Create the products](create-product) you’ll use in the paywall within the Adapty Dashboard.
2. [Create the paywall](create-paywall) in the Adapty Dashboard. [Use remote config](customize-paywall-with-remote-config) to design your web paywall.
3. [Set up a placement](create-placement) and link the paywall to it in the Adapty Dashboard.

### Steps with Adapty API

1. **Fetch and display the paywall:** When the user reaches the placement in your web app where the paywall should be shown, use the [Get paywall](ss-get-paywall) request to retrieve the paywall via the placement ID. Display the paywall in your web app.
2. **Record the paywall view:** Use the [Record paywall view](ss-record-paywall-view) to log the paywall view with Adapty to ensure your analytics accurately reflect the event.
3. **Record the purchase:** If the user completes a purchase, send the transaction details to Adapty using the Adapty API. Include the **variation ID** in this request to link the transaction to the specific paywall displayed. For guidance, check out our page on [associating paywalls with transactions in mobile apps](associate-paywalls-to-transactions)—the same approach applies to web apps.
4. **Add attribution data (if applicable):** If you have any attribution data (e.g., campaign or ad details), use the [Add attribution](ss-add-attribution) to merge it into the user profile to enrich the analytics and improve insights.

**What's next:**

- Proceed with [Web API authorization](web-api-authorization)
- Requests:
  - [Add attribution](ss-add-attribution)
  - [Get paywall](ss-get-paywall)
  - [Record paywall view](ss-record-paywall-view)
