---
title: "Grace period converted"
description: "Track the number of subscriptions that entered the grace period and were renewed before it ended."
metadataTitle: "Track grace period conversions | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The **Grace period converted** chart displays the number of subscriptions that entered the [grace period](grace-period) state, and were successfully renewed before the period elapsed. 

### Calculation

The Grace period converted chart displays the daily number of subscription renewals for users in a grace period.

The Grace period begins when the subscription enters the billing issue state due to a payment failure and ends after a specified amount of time (6 days for weekly subscriptions, 16 days for all other subscriptions) or when payment is successfully received. The chart provides insights into the effectiveness of the grace period feature and can help identify potential issues with payment processing or subscription management.

### Available filters

- ✅ Filter by: Attribution, audience, refund reason, country, offer type, offer ID, offer discount type, A/B test, paywall, store, placement, period, segment, product, and duration. 

You can find more information about the available controls, filters, grouping options, and how to use them in [this documentation](controls-filters-grouping-compare-proceeds).

### Grace period converted chart usage

Use this chart to track how effectively the grace period feature helps recover subscriptions with payment issues. By monitoring conversion trends over time, you can identify patterns in payment resolution and assess the impact of changes to your payment update flows or communication strategies during grace periods.

### Similar metrics

- [Billing issue](billing-issue)
- [Billing issue converted](billing-issue-converted)
- [Billing issue converted revenue](billing-issue-converted-revenue)
- [Grace period](grace-period.md)
- [Grace period converted revenue](grace-period-converted-revenue)
- [Refund money](refund-money.md)
- [Refund events](refund-events.md)