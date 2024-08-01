---
title: "Churned (expired) subscriptions"
description: ""
metadataTitle: ""
---

The churned (expired) subscriptions chart displays the number of subscriptions that have expired, meaning that the user no longer has access to the premium features of the app. Typically, this occurs when the user decides to stop paying at the end of the subscription period for the app or encounters a billing issue.


<img
  src={require('./img/2b882cd-small-CleanShot_2023-05-08_at_15.09.592x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





### Calculation

The churned (expired) subscriptions chart calculation logic for Adapty involves counting the number of subscriptions that have expired during a given period. This includes users who have decided to stop paying for the app or those who have experienced billing issues. To obtain this chart, the number of expired subscriptions should be counted daily or monthly. At a daily resolution, the count of expired subscriptions represents the number of subscriptions that expired on that day, while at a monthly resolution, it represents the number of expired subscriptions during that month.

### Available filters and grouping

- ✅ Filter by: Attribution, country, paywall, store, product, and duration. 
- ✅ Group by: Expiration reason, product, country, store, paywall, duration, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in [this documentation.](controls-filters-grouping-compare-proceeds)

### Churned subscriptions chart usage

The Churned (expired) subscriptions chart is a useful metric to gain insights into the number of users who have stopped paying for the app or have experienced billing issues during a specific period. This metric provides information on the number of users who have churned, which can be used to identify trends in user behavior and billing issues. By combining the Churned subscription chart with filters and grouping, app developers or business owners can gain a deeper understanding of their user base and analyze the reasons for churn.

### Similar metrics

In addition to Churned subscriptions, Adapty also provides metrics for other subscription-related events, such as active subscriptions, new subscriptions, subscriptions renewal canceled, and non-subscriptions. To learn more about these subscriptions-related metrics, please refer to the following documentation guides:

- [Active subscriptions](active-subscriptions)
- [New subscriptions](reactivated-subscriptions)
- [Cancelled subscriptions](cancelled-subscriptions)
- [Non-subscriptions](non-subscriptions)