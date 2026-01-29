---
title: "Troubleshoot data discrepancies"
description: "Find the cause of divergencies in data"
metadataTitle: "Troubleshoot data discrepancies | Adapty Docs"
keywords: ['discrepancies', 'data', 'analytics', 'troubleshooting']
---

import ZoomImage from '@site/src/components/ZoomImage';

Adapty users may encounter **discrepancies** when comparing similar sets of data from different sources. In particular, this can occur when you compare:

    * Adapty charts to store reports
    * Adapty charts to third-party charts
    * Different charts within Adapty

Most of the time, discrepancies occur because **different sources process the same data differently**. Other times, they indicate an **issue with your Adapty configuration**.

This article explains common issues that lead to data discrepancies, as well as common solutions.

## Connection issues

#### Server notifications and RTDN

If you didn't correctly configure server-to-server communication between Adapty and the stores, Adapty will not be able to process some events, such as subscription renewals.

Complete the configuration as soon as you can ([App Store](app-store-server-notifications) | [Play Store](real-time-developer-notifications-rtdn)) and [wait](#data-delays) for the stores to establish the connection.

You can [manually upload](importing-historical-data-to-adapty) the missing data to Adapty.

## Data delays

Adapty aims to provide a close to real-time analysis of your application's economy. The following limitations and exceptions apply:

* When you first integrate Adapty into your application, it may take a while for the data to start pouring in. Likewise, when you enable an integration with a third-party platform, there may be a transition period during which the data is not yet perfectly synced.
* Once Adapty receives store data, it takes another **15-30 minutes** for it to be processed and displayed on the Analytics page.
* Data exchange between Adapty and third parties is **not always instantaneous** due to the number of variables involved.
* Calculations for some advanced metrics (such as [cohort predictions](predicted-ltv-and-revenue)) require a certain amount of data. Adapty will only perform these calculations when it gathers enough data.

#### Data delays due to incomplete adoption

If a part of your install base uses an older version of the application without the Adapty SDK, Adapty won't be able to receive their data. For this reason the numbers of Adapty and other sources will diverge.

## Time and calendar

#### Dates and timezones

One of the most common reasons for perceived data discrepancies is a difference in timezone settings.

Adapty counts days according to the `UTC` timezone. If another platform uses a different timezone, the calculations will differ. The difference will decrease as you increase the scale.

You can [change the timezone setting](general#3-reporting-timezone) for each application.

<ZoomImage id="timezone-setting.webp" width="700px" />

#### The Apple fiscal calendar

Apple uses its own [accounting calendar](https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/wa/jumpTo?page=fiscalcalendar) to determine sales periods and payout dates.

Each "month" in the calendar consists of **4 or 5 weeks**, and **may include days from the neighboring calendar months**. After it ends, one more month has to pass before the developer receives the earnings.

For example, the "January 2026" sales period begins on December 28th, 2025 — 4 days before the start of the calendar month. The estimated payment date for this period is March 5th.

Do not compare data from Apple payout reports to calendar months. Instead, select a [custom date range](controls-filters-grouping-compare-proceeds#time-ranges) that corresponds to the necessary sales period.

#### Transaction dates

Some services may apply [cohort](analytics-cohorts) rules when displaying transactions, and attribute them to the application's install date, rather than the date the transaction itself occurred.

## Revenue, fees and taxes

Depending on the [setting](controls-filters-grouping-compare-proceeds#store-commission-and-taxes), Adapty charts can display your **gross revenue**, **revenue after store commission**, or **revenue after store commission and tax**. 

<ZoomImage id="revenue-types.webp" width="500px" />

Some stores and third-party platforms may lack the capability to display gross revenue, or automatically deduct taxes. If you see a discrepancy between two different revenue charts, make sure that the comparison is valid.

### Cancellations and refunds

Different platforms display refund data differently. Adapty treats refunds as negative revenue. If a user subscribes, and requests a refund the next day, both events will be reflected in Adapty charts — each on its own day. Other platforms may subtract the refund value from the original transaction.

### Sandbox purchases

The [event feed](event-feed) displays purchases made by sandbox accounts. The analytics charts do not. However, if your historical import data contains sandbox purchases, Adapty won't be able to tell them apart, and its charts will reflect historical sandbox purchases.

## Installs and downloads

Stores can track user downloads directly. Their statistics may include cases where the application was installed, but never launched.

Adapty can only register an installation when a user launches the application, regardless of your [install definition](general#4-installs-definition-for-analytics).

<ZoomImage id="install-definitions.webp" width="700px" />

:::important
The number of installations on App Store Connect includes re-downloads and restores.
:::

## Country and store

To ensure accurate reporting, Adapty [may infer](controls-filters-grouping-compare-proceeds#filtering-and-grouping) the user's country from their IP. Stores always attribute downloads and purchases to a specific app store.

If you need to clearly distinguish between the two, you can [create a new user segment](segments) with the `Country by store account` attribute, and [filter analytics by segment](controls-filters-grouping-compare-proceeds#filtering-and-grouping).

## Missing historical data

Adapty doesn't have access to your application's historical data, unless you [manually import](importing-historical-data-to-adapty) it. If the chart's [time range](controls-filters-grouping-compare-proceeds#time-ranges) starts before you integrated Adapty into your application, and you haven't imported historical data, the values displayed will differ from other sources.

## Product editing

Incorrect or inconsistent product data may cause discrepancies in analytics. Do not edit the **access level** or the **store product ID** unless you accidentally make a typo in one or the other. Create a new product instead.

### Product pricing

If incorrect product pricing causes a revenue discrepancy, changing the price doesn't fix it retroactively. To change existing transactions' prices, you need to import this data separately.

When a user restores an old purchase after a price change, Apple may incorrectly report the purchase's value. You need to import historical data for Adapty to reflect the correct value.

## Attribution conflicts

Adapty can only use [a single attribution source](attribution-integration#prevent-data-issues) for each transaction. You cannot override this data later on.

If your setup includes multiple attribution providers that disagree with one another, the same transaction on two different platforms may appear to have two different traffic sources.

## Differences in terminology

Different platforms may have different definitions for the same term — or different terms for the same concept.

For example, Adapty only registers a [new subscription](reactivated-subscriptions) **after** the end of a free trial. Other platforms may count **each trial as a new subscription**, even before the first payment was made. The definitions of the word [revenue](#revenue-fees-and-taxes) may diverge, as well.

## Manual troubleshooting

If you suspect that your data varies from platform to platform, and the reasons above don't explain the discrepancies, the best course of action is to **export raw data** and **compare the files**.

* Even stores can experience issues related to data processing and presentation. Access the stores' **raw transaction data** for the most accurate comparison.
* When comparing Adapty to another analytics platform, use store transaction reports as the source of truth and point of comparison.
* It's easier to identify inconsistencies with a limited data set. Compare small volumes of data — focus on a specific product and a single day.
* Identify whether your discrepancy stems from a difference in **pricing** or **event number**. Pricing issues can be fixed with a [product update](#product-pricing). Event issues may indicate [server-side problems](#connection-issues).
