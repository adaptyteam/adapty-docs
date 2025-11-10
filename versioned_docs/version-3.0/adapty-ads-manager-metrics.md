---
title: "Metrics in Apple Ads Manager"
description: "See the app analytics in Apple Ads Manager."
metadataTitle: "Using Apple Ads Manager | Adapty Docs"
keywords: ['apple ads', 'asa']
---

Apple Ads Manager provides comprehensive metrics to measure campaign performance and user behavior.

## Performance

| Metric | Description |
|--------|-------------|
| Spend | The sum of the cost of each customer tap on your ad. |
| Daily budget usage | Shows the portion of the campaign's Daily Budget spent during the selected period. Lifetime budget and campaign status are not considered. Spend / Sum of Daily Budgets * 100% |
| Impressions | The number of times your sponsored ad appeared in App Store search results within the reporting time period. |
| CPM | The average amount you pay per one thousand ad impressions. Avg CPM = Spend / (Impressions / 1000) Note: for App Store Search Results Campaigns with CPT pricing model it shows effective CPM. |
| Taps | The number of times the ad was tapped by users within the reporting time period. |
| CPT | The average amount you pay per one tap on your ad. Avg CPT = Spend / Taps |
| TTR | The number of times your ad was tapped on by customers divided by the total impressions your ad received. TTR = Taps / Impressions * 100% |
| Downloads (Total) | The total number of click-through and view-through new downloads and redownloads from an ad within the reporting period. |
| Downloads (View-Through) | The total number of new downloads and redownloads from users who viewed your ad within a 24-hour window but didn't click on it |
| Downloads (Click-Through) | DThe total number of new downloads and redownloads from users who clicked on your ad within a 30-day window. |
| Avg CPA (Total) | Total average cost-per-acquisition (CPA) is total campaign spend divided by total downloads resulting from a view or a tap on your ad within the reporting period. |
| Avg CPA (Click-Through) | Click-through average cost-per-acquisition (CPA) is total campaign spend divided by the number of clicks on your ad that led to downloads within the reporting period. |
| Download Rate (Total) | Conversion rate for Apple Ads is total downloads resulting from a view or a click on your ad divided by the total number of clicks within the reporting period. |
| Download Rate (Click-Through) | Click-through conversion rate for Apple Ads is total downloads resulting from clicks on your ad divided by the total number of clicks within the reporting period. |


## Conversions

:::note
Revenue, ARPU, ARPPU, ARPAS, ROAS, and ROI are also available as cohort metrics for time-based analysis of user groups.
:::


| Metric | Description |
|--------|-------------|
| Revenue | Revenue is the total amount of money generated from purchases, renewals, or other monetized conversions in your app within a selected timeframe (before store commission). |
| ROAS | ROAS (Return on Ad Spend) is the revenue from your ads divided by the ad spend, expressed as a percentage. Formula: (Revenue / Spend) × 100% if Spend > 0, otherwise 0% |
| ROI | ROI (Return on Investment) measures net profit relative to spend. Formula: ((Revenue − Spend) / Spend) × 100% if Spend > 0, otherwise 0% |
| ARPU | ARPU (Average Revenue per User) is the average revenue per user. It's calculated as total revenue divided by the number of unique users. $60000 revenue / 5000 users = $12 ARPU. It's helpful to compare this value to the cost per install (CPI) to understand the effectiveness of your marketing campaigns. |
| ARPPU | ARPPU (Average Revenue per Paying User) is the average revenue per paying user. It's calculated as total revenue divided by the number of unique paying users. $60000 revenue / 1000 paying users = $60 ARPPU. It helps you understand how much money a paying customer generates on average. |
| ARPAS | ARPAS is the average revenue per active subscriber. It's calculated as total revenue / number of active subscribers. By subscribers, we mean those who activated a trial period or subscription. $60000 revenue / 1500 subscribers = $40 ARPAS. |
| Download Rate (Total) | Download Rate (Total) measures how many total downloads (view + click) occurred relative to the total taps, typically expressed as (Downloads ÷ Taps) × 100%. |
| Download Rate (View-Through) | Download Rate (View-Through) measures how many view-through downloads occurred relative to impressions or taps, depending on your internal formula (often (View-Through Downloads ÷ Impressions) × 100%). |
| Download Rate (Tap-Through) | Download Rate (Tap-Through) measures how many tap-through downloads occurred relative to ad taps, typically (Tap-Through Downloads ÷ Taps) × 100%. |
| Installs | Installs is the the total number of users who have installed the app for the first time, as well as any reinstalls by existing users. This includes multiple installations by the same user on different devices. Please note that incomplete downloads or installations that are canceled before completion are not counted toward the install count. |
| Install Rate | Install Rate is the percentage of users from total downloads that installed the app. Formula: (Installs / Total Downloads) × 100% if Total Downloads > 0, otherwise 0% |
| CPI | CPI (Cost per Install) is the cost per install captured by Adapty. Formula: Spend / Installs if Installs > 0, otherwise 0 |
| Trials Started | Trials Started is the number of new trial subscriptions initiated during the reporting period. |
| Trials Conversion Rate | Trials Conversion Rate is the percentage of users from total downloads that started a trial. Formula: (Trials New / Total Downloads) × 100% if Total Downloads > 0, otherwise 0% |
| Cost per Trial | Cost per Trial is your total spend divided by the number of new trial starts. Formula: Spend / Trials New if Trials New > 0, otherwise 0 |
| Converted Trials | Converted Trials is the number of trial subscriptions that successfully converted into paid subscriptions within the reporting period. |
| Trial Conversion Rate | Trial Conversion Rate is the percentage of total downloads that converted from trial to paid subscription. Formula: (Trials Converted / Total Downloads) × 100% if Total Downloads > 0, otherwise 0% |
| Cost per Converted Trial | Cost per Converted Trial is your total spend divided by the number of converted trials in the same period. Formula: Spend / Trials Converted if Trials Converted > 0, otherwise 0 |
| Subscriptions Started | Subscriptions Started is the total number of new subscription sign-ups (non-trial) in the reporting period. |
| Subscription Rate | Subscription Rate is the percentage of total downloads that start a paid subscription (without a free trial). Formula: (Subscriptions Started / Total Downloads) × 100% if Total Downloads > 0, otherwise 0% |
| Cost per Subscription Started | Cost per Subscription Started is your total spend divided by the number of new subscriptions started. Formula: Spend / Subscriptions Started if Subscriptions Started > 0, otherwise 0 |
| Non-subscription Purchases | Non-subscription Purchases is the total number of one-time in-app purchases that aren't subscription-based. |
| Non-subscription Purchase Rate | Non-subscription Purchase Rate is the percentage of total downloads that made a non-subscription purchase in your app. Formula: (Non-subscriptions / Total Downloads) × 100% if Total Downloads > 0, otherwise 0% |
| Cost per Non-subscription Purchase | Cost per Non-subscription Purchase is your total spend divided by the number of non-subscription purchases. Formula: Spend / Non-subscriptions if Non-subscriptions > 0, otherwise 0 |

## Advanced downloads

| Metric | Description |
|--------|-------------|
| New Downloads (Total) | The total number of click-through and view-through new downloads within the reporting period. |
| New Downloads (View-Through) | New downloads from users who viewed your ad but didn't click on it and had not previously downloaded your app are counted within a 24-hour window. |
| New Downloads (Click-Through) | New downloads from users who clicked on your ad and have not previously downloaded your app. These are counted within a 30-day attribution window. |
| New Download Share (Click-Through) | Shows what percentage of the total number of downloads from clicks are new downloads (from users who clicked on your ad within a 30-day attribution window). |
| Redownloads (Total) | The total number of click-through and view-through redownloads within the reporting period. |
| Redownloads (View-Through) | Redownloads from users who viewed your ad but didn't click on it within a 24-hour window.These are counted when a user downloads your app, deletes it, and downloads it again on the same device or a different one after viewing an ad. |
| Redownloads (Click-Through) | Redownloads from users who clicked on your ad within a 30-day attribution window. These are counted when a user downloads your app, deletes it, and downloads it again on the same device or a different one after clicking on an ad. |
| Redownloads Share (Click-Through) | Shows the percentage of the total number of downloads from clicks are redownloads. |

## Insights


| Metric | Description |
|--------|-------------|
| Impression Share | Impression Share is the percentage of impressions your ad received compared to the total impressions for the same search term. |
| Rank | Rank (current) is your app's current position in terms of impression share for the selected search term in a specific country or region. |
| Search Popularity | Search Popularity (current) is the popularity of search terms based on country or region. The ranking is 1–5, with 5 as the most search volume. |
