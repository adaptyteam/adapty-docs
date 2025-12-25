---
title: "Billing issue converted"
description: "Track the number of billing issues that are resolved before the end of the billing cycle."
metadataTitle: "Track resolved billing issues | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Billing Issue Converted chart displays the daily number of subscriptions that entered the [Billing Issue](billing-issue) state, and were renewed before the end of the billing cycle.

TODO: Screenshot

### Calculation

The Billing Issue Converted chart displays the number of subscriptions that entered the [Billing Issue](billing-issue) state in the current billing cycle, and were renewed on the day.

A subscription enters the Billing Issue state when the store (e.g. Apple, Google) is unable to process payment from the subscriber for some reason, such as an expired credit card or insufficient funds. During the Billing Issue state, the subscription is not considered active, and if the Grace Period feature is enabled in the store settings, the subscription will only move to the Billing Issue state after the Grace Period has expired.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration.
- ✅ Group by: Product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in [this documentation](controls-filters-grouping-compare-proceeds).

### Billing Issue Converted chart usage

TODO: Insufficient information

### Similar metrics

- [Billing issue](billing-issue)
- [Billing issue converted revenue](billing-issue-converted-revenue)
- [Refund money](new-trials)
- [Refund events](active-trials)
- [Grace period](trials-renewal-cancelled)
- [Grace period converted](grace-period-converted)
- [Grace period converted revenue](grace-period-converted-revenue)