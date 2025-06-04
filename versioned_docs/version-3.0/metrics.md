---
title: "Metrics"
description: "A reference of metric definitions to help you track and analyze the performance of paywalls, onboardings, and placements, and improve your subscription revenue."
metadataTitle: "Analyzing Metrics | Adapty Docs"
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty collects a series of metrics to help you better measure the performance of the paywalls, onboardings, and placements. It’s easy to get overwhelmed by dozens of different values without a clear understanding of what each one measures.

In this section, you will find a reference of metric definitions to help you track and analyze performance, and improve your subscription revenue.

For details on metric availability, usage, and controls, refer to the sections on:
- [Paywalls](https://adapty.io/docs/paywall-metrics)
- [Onboardings](https://adapty.io/docs/onboarding-metrics)
- [Placements](https://adapty.io/docs/placement-metrics)


## Metrics definitions

### Views & unique views

Views count the number of times users see your paywall/onboarding/placement. If someone visits twice, that's two **views** but one **unique view**. This metric helps you understand how often your paywall/onboarding/placement has been shown.

### Completions & unique completions

Completions count the number of times users complete your onboarding, meaning that they go from the first to the last screen. If someone completes it twice, that's two **completions** but one **unique completion**.

### Unique completions rate

The unique completion number divided by the unique view number. This metric helps you understand how people engage with onboarding and make changes if you notice that people ignore it.

### Revenue

**Revenue** shows your total earnings in USD from purchases and renewals. This is the amount before any deductions.

### Proceeds

[**Proceeds**](analytics-cohorts#revenue-vs-proceeds) shows what you receive after App Store/Play Store takes their commission, but before taxes.

### Net proceeds

Your final earnings after both store commissions and taxes are deducted.

### ARPPU

ARPPU is the average revenue per paying user. It’s calculated as total revenue divided by the number of unique paying users. $15000 revenue / 1000 paying users = $15 ARPPU.

### ARPU

ARPU is the average revenue per user who viewed the onboarding. It's calculated as total revenue divided by the number of unique viewers.

### ARPAS

ARPAS shows how much money each active subscriber generates on average. Simply divide your total revenue by your number of active subscribers. For example: $5,000 revenue ÷ 1,000 subscribers = $5 ARPAS.

### CR purchases & unique CR purchases

**Conversion rate to purchases** shows what percentage of paywall/onboarding/placement views lead to purchases. For example, 10 purchases from 100 views is 10% conversion rate.
**Unique CR purchases** measures what percentage of unique users who view your onboarding end up making a purchase, counting each user only once, regardless of how many times they see it.

### CR trials

**Conversion rate to trials** shows what percentage of onboarding views lead to starting a trial. For example, 10 trials from 100 views is 10% conversion rate.

### Unique CR trials
**Unique CR trials** measures what percentage of unique users who view your paywall/onboarding/placement start a trial, counting each user only once, regardless of how many times they see it.

### Purchases

**Purchases** counts all transactions on your paywall/onboarding/placement, except renewals. This includes:

- New direct purchases
- Trial conversions
- Plan changes (upgrades, downgrades, cross-grades)
- Subscription restores

This metric gives you a complete picture of new transaction-related activity from your paywall/onboarding/placement.

### Trials

**Trials** counts the number of users who started free trial periods through your paywall/onboarding/placement. This helps you track how well your trial offers attract users before they decide to pay.

### Trials cancelled

**Trials cancelled** shows how many users turned off auto-renewal during their trial period. This tells you how many people decided not to continue with a paid subscription after trying your service.

### Refunds

**Refunds** counts how many purchases and subscriptions were returned for a refund, regardless of the reason.

### Refund rate

**Refund rate** shows the percentage of first-time purchases refunded. Example: 5 refunds from 1,000 purchases = 0.5% refund rate. Renewals aren't counted in this calculation.
