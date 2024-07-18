---
title: "Billing issue"
description: ""
metadataTitle: ""
---

The Billing issue chart displays the number of subscriptions that have entered the Billing Issue state. This state is typically triggered when the store, such as Apple or Google, is unable to receive payment from the subscriber for some reason. This could happen due to reasons such as an expired credit card or insufficient funds.


<img
  src={require('./img/8749d28-CleanShot_2023-07-11_at_15.21.262x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





### Calculation

Adapty calculates the billing issue chart by tracking the number of subscriptions that have entered the billing issue state during a given period. A subscription enters the Billing Issue state when the store (e.g. Apple, Google) is unable to process payment from the subscriber for some reason, such as an expired credit card or insufficient funds. During the Billing Issue state, the subscription is not considered active, and if the Grace Period feature is enabled in the store settings, the subscription will only move to the Billing Issue state after the Grace Period has expired.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in the[ this documentation.](https://docs.adapty.io/docs/controls-filters-grouping-compare-proceeds)

### Billing issue chart usage

The Billing Issue chart can provide valuable insights into your app's subscription performance and revenue. By tracking the number of subscriptions in the Billing Issue state over time, you can identify patterns and potential issues related to payment processing and user payment information. This information can be used to optimize your app's payment process and reduce the likelihood of subscription cancellations due to payment issues. You can also use the chart to track the impact of changes to payment processing and billing information update flows.

### Similar metrics

In addition to the Billing Issue chart, Adapty also provides metrics for other issues-related events, such as Refund events, Refund money, and Grace period. To learn more about these issue-related metrics, please refer to the following documentation:

- [Refund money](https://docs.adapty.io/docs/new-trials)
- [Refund events](https://docs.adapty.io/docs/active-trials)
- [Grace period](https://docs.adapty.io/docs/trials-renewal-cancelled)