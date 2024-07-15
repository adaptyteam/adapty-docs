---
title: "Paywalls 2.0: new paywall management system"
description: ""
metadataTitle: ""
---

We are excited to announce paywalls 2.0 — the new paywall management system in Adapty, designed to revolutionize the way you manage paywalls and A/B tests and maximize your revenue potential. Let's explore how it works and guide you through the steps to make the most of this feature.

:::note
Paywalls 2.0 will be released gradually, let us know if you want to try them first
:::

### Placement

A placement is basically a place in the app where a paywall might be displayed. Usually, the app has several places to display paywalls: onboarding flow, inside the app, and sometimes special offers. Different paywalls or A/B tests can be run in one place over time, but the place is fixed.

With paywalls 2.0, you create a few placements and display paywalls and A/B tests within them. You can display the same paywall in multiple places, something that wasn't possible before.

#### Audience

Users coming to the placement can be split into audiences and shown different paywalls or A/B tests based on the audience they have been assigned to. If the user belongs to multiple audiences, the paywall from the audience with the highest priority will be shown. Previously, it was possible only in A/B tests, but with placements, you can use it with the paywalls as well.

In the example below, we have a placement with an identifier `Placement_ID`. In your app code, you will access the placement using this identifier. All placements start with one required audience: "All users". You can then add additional audiences and manually prioritize them. If the user belongs to the audiences "US users" and "Facebook users", they will see a paywall from the "US users" because it has higher priority.

![](https://files.readme.io/d8902e4-Placements.png)

### Paywall

A paywall stores information about the products, including their order, and additional visualization and localization options in the remote config.

With paywalls  2.0, we made paywalls reusable. You can display one paywall in multiple placements and audiences simultaneously. You can also use one paywall in multiple A/B tests at the same time. The metrics will be collected separately for every place the paywall is used, this way you can analyze how outside factors affect paywall metrics.

We also removed versions from paywalls. Some of our customers created hundreds of versions and it was pretty much impossible to navigate them. Now, instead of creating a new version, you should create a new paywall with a proper name so you can easily find it. And then, using the placements, you can just replace paywall A with paywall B, no code changes are needed.

In the example below, we have two paywalls: Paywall A and Paywall B. Paywall A is shown to the "US users" audience; Payball B is shown to the "Facebook users" and "All users" audiences. Showing the same paywall to multiple audiences within one placement can be useful if you want to compare metrics independently.

![](https://files.readme.io/af57d8a-Paywalls.png)

### A/B test

An A/B test is a temporary experiment of two or more paywalls. The paywalls are shown to the same audience at the same time, so you can compare the metrics and find the best-performing paywall. You can configure the distribution of paywalls within A/B tests by setting the weights. An A/B test with two paywalls each having a 50% weight, will show one paywall to half of the users, and the other paywall to the other half.

In Paywalls 2.0 one paywall can be used in multiple A/B tests. This way, you can create several paywalls and then constantly run experiments trying different combinations and placements.

Similarly to paywalls, we removed versions from A/B tests. When you need to run a new experiment, simply create a new A/B test, define the goal, and wait for a set period of time for results. We recommend running all experiments for the same period of time (2-4 weeks) for more consistent results.

Finally, under the hood, we changed the way we calculate A/B test winners. It's now based on Bayesian modeling and should better cover corner cases. We'll write more about the calculations later.

In the example below, the two paywalls from the previous step are grouped together creating an A/B test for the "Facebook users" audience. Each of the paywalls has 50% weight, so it will be shown to half of the users.

![](https://files.readme.io/412ccb4-B_tests.png)

### How to use paywalls 2.0

Here's a quick breakdown of how to work with paywalls 2.0:

1. Create a paywall that you want to display within your app.
2. Create a placement and set up the audiences you want to target. Assign the paywall to the audiences of the Placement.
3. Create more paywalls to run experiments. You can also show these paywalls individually using placements and audiences.
4. Create A/B tests. Control where to display them with placements and audiences.

![](https://files.readme.io/633c924-Flow.png)

### Choosing meaningful placements

When creating the placements, it's essential to consider the logical flow of your app and the user experience you want to create. Most apps should have no more than 5 placements without sacrificing the ability to run experiments. Here's an example of how you can structure your placements:

![](https://files.readme.io/5b47c03-user-flow-placements_1.png)

1. **Onboarding placement:** This placement represents the first interaction your users have with your app. It's an excellent opportunity to introduce your users to your app's value proposition and set the stage for a positive user experience. Over 80% of subscriptions are activated during onboarding, so it's important to focus on selling the most profitable subscriptions here. With Adapty, you can easily show different paywalls to different audiences and run A/B tests to find the best option for your app. For example, you can run an A/B test for users from the US, showing more expensive subscriptions 50% of the time.
2. **App settings placement: **If the user hasn't subscribed during onboarding, you can create a placement within your app. This can be in the app settings or after the user has completed a specific target action. Since users inside the app tend to think more thoroughly about subscribing, the products on this paywall might be slightly less expensive compared to those in the onboarding stage.
3. **Promo placement: **If the user hasn't subscribed after seeing the paywall multiple times, it could indicate that the prices are too high for them or they are hesitant about subscriptions. In this case, you can show a special offer to them with the most affordable subscription or even a lifetime product. This can help entice users who are price-sensitive or skeptical about subscriptions to make a purchase.  
   Most apps will have similar logic and placements, following the user journey and key points where paywalls or A/B tests can be displayed to drive conversions and revenue. In each placement, you can configure multiple paywalls or A/B tests to experiment and optimize your monetization strategies.