---
title: "Grace period converted"
description: "Track the number of subscriptions that entered the grace period and were renewed before it ended."
metadataTitle: "Track grace period conversions | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Grace Period Converted chart displays the number of subscriptions that entered the [grace period](grace-period) state, and were successfully renewed before the period elapsed. 

TODO: Add screenshot

### Calculation

The Grace Period Converted chart displays the daily number of subscription renewals for users in a grace period.

The Grace period begins when the subscription enters the billing issue state due to a payment failure and ends after a specified amount of time (6 days for weekly subscriptions, 16 days for all other subscriptions) or when payment is successfully received. The chart provides insights into the effectiveness of the grace period feature and can help identify potential issues with payment processing or subscription management.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in [this documentation](controls-filters-grouping-compare-proceeds).

### Grace Period Converted chart usage

TODO: insufficient information

### Similar metrics

- [Billing issue](billing-issue)
- [Billing issue converted](billing-issue-converted)
- [Billing issue converted revenue](billing-issue-converted-revenue)
- [Grace period](trials-renewal-cancelled)
- [Grace period converted revenue](grace-period-converted-revenue)
- [Refund money](new-trials)
- [Refund events](active-trials)