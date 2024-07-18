---
title: "Cohorts"
description: ""
metadataTitle: ""
---

By cohort, we usually mean a group of subscribers united by some action (app installation in our case) during the same selected period of time. How can this be helpful? 

**Step 1 - reveal acquisition effort.**  
For example, you attracted some amount of traffic during June using a special "Only in June" campaign and you want to see how it paid off.  
If you look at the total revenue for June it will contain: 

1. all the attracted subscribers from the "Only in June" period who have made their first payment;
2. all those, who have had their 2nd payment (equal to those who made their first payment in May minus the churned ones);
3. all those, who have had their 3rd payment (equal to those who made their first payment in April minus the churned ones);
4. etc  
   So to easily evaluate the impact of the 1st group - users attracted during the "Only in June" campaign - you can just see them as a cohort of June. 

**Step 2 - track the patterns of churn. **  
But the story doesn't end in June when subscribers are attracted. Then month by month your June cohort will have the 2nd payment in July, the 3rd in August, etc. And the total amount of money earned from this cohort will grow. While the number of subscribers in the cohort will tend to zero or to some baseline which depends on the app. Understanding the behavior of your cohorts will helps to plan the app's economy. 

**Step 3 - balance unit economy. **  
You can [upload your spending data to Adapty](https://docs.adapty.io/docs/how-to-get-spends-data-from-fb-business-manager) to see profit and loss on the same page in cohorts.  

Overall this tool lets you analyze your revenue or proceeds dynamics for different cohorts to:

- See how different periods of acquisition pay off
- Understand your churn and retention patterns
- Track up-to-the-moment revenue for each cohort
- Measure the impact of product or pricing changes

:::note
Why would you use cohorts

The reasons may be:

- to see how different periods of acquisition pay off
- to understand your churn and retention patterns
- to track up-to-the-moment revenue for each cohort
- to measure the impact of product or pricing changes
:::

Here is what the cohort table looks like:


<img
  src={require('./img/b00fac2-CleanShot_2022-12-21_at_07.14.45.png').default}
/>





### How is this table calculated?

#### Rows

"Cohort" in other words is just "a group of users" and each such group has a row in the table. In the most standard case, the grouping of users into cohorts is time-based. Our Cohorts are based on the time of installation — which allows you to reliably determine how quickly you turn the marketing costs into profit.

For example, for a user to end up in a Jul 2020 cohort, their installation has to occur any time from July 1st to July 31st. **Note**: in case we don't have an install time for a user (which is often the case when Adapty is installed after the app has been launched), we just take the time of their first transaction.

You can also form cohorts by install day, product, platform, or country.

**Note** The last three options aggregate all the data for the chosen time period (control to the right of the Filters) and group it by product, platform or country — thus, your cohorts are no longer time-based. Yet this is useful to compare the performance of users revenue-wise: for example, you might learn that one of your products isn't that effective compared to the other one. Just make sure you select the time period that allows for a fair comparison.

#### Columns

Columns typically show the revenue each cohort has generated over time. It can also show Subscribers or ARPPU if you choose to.

:::note
What's ARPPU?

ARPPU stands for Average Revenue Per Paying User. We calculate it by dividing the revenue for the period by the total number of paying users in cohort. That way you can track how it accumulates for each user over time — thus being able to determine your up to the moment ROI.
:::

Each "month" is a 30-day window, each "week" is a 7-day window and each "day" is a 24-hour window. For instance, Month 0 lasts from the time of install to 30\*24=720 hours from that; Month 1 from 720 hours after the time of install to 1440 hours, and so on.

**Note**: "Months" and other time periods you choose for columns are calculated for each user individually. For a user who installed the app on July 1st at 3:00 PM, "Month 0" will last until July 31st at 3:00 PM. If they make a transaction on July 31st at 3:05 PM, it will end up in the Month 1 column.

Simply put, Month 0 for a Jul 2020 cohort isn't exactly "August", it's actually a period from July 31st up to August 30th.

:::note
Things to watch out for while using Cohorts

Basing cohorts on install time (which we do) allows to determine exactly how much time it is required for your product to return the marketing costs. It also allows to track the promotions you launch more precisely — you will see an uptick of revenue in the corresponding columns.

However, this approach may also result in confusion. For example, the picture at the top of this page demonstrates that August cohort has generated $0 in the first month while generating $90 in the following months. Even though it looks a little weird, this likely means that during that time all the subscriptions were monthly and thus the first purchases came a little later than a month after install time.

Another thing to watch out for are individual time-windows for each user. For example, if most of your user-base is subscribed to monthly plans, and you decide to view revenue for weeks, you might end up with cells with $0 revenue (just because no purchases were made during that time).

Or, while viewing the revenue for a January cohort on February 20th you might be surprised to find out that we only have complete revenue data for W0 and W1. That's because for the latest user of the cohort (who came on Jan 31st) there has only been two complete weeks (Feb 1st - Feb 7th and Feb 8th - Feb 15th).

In short — remember two things:

1. Our cohorts are based on install times, not first-purchase times
2. The time-windows for each user are calculated individually
:::

#### "Total" column and row

Total column shows the total revenue/subscribers/average ARPPU for each cohort. This value is useful to quickly calculate the ROI for this month (provided you have the acquisition costs).

Total row shows the total revenue/subscribers/average ARPPU for each column. This is useful to understand how quickly it accumulates in general as it shows a sort of a general picture for all your cohorts.

#### Incomplete data

Some cells have incomplete data — the time period they correspond to isn't over for some users of the cohorts. Such cells are shaded and have a special notification in their pop-up.


<img
  src={require('./img/d531c66-CleanShot_2022-12-21_at_16.27.00.png').default}
/>





### User acquisition metrics. How to track unit economy.

Turn on a toggle to show user acquisition metrics. When you enable it three additional columns appear in the cohort table: Ad spend, Paying CAC, and ROAS. 

Please mind that the spending analytics has a beta status, for now, works with Facebook spending and you should upload data manually. Please follow our [step-by-step guide](https://docs.adapty.io/docs/how-to-get-spends-data-from-fb-business-manager) to do it easily. 

After your data is uploaded you will see the additional metrics as follows.

1. **Ad spend** - shows how much you spent on user acquisition in Facebook for the specific cohort.

2. **Paying CAC** - is an acquisition cost of paying customer. It’s calculated as ad spend / unique paying users. $20000 ad spend / 1000 paying users = $20 Paying CAC. You can see if your app’s economy is balanced by comparing this number to APPPU.

3. **ROAS** - (revenue) is a return on ad spend as a percentage. It’s calculated as (total revenue / ad spend) _ 100. ($60000 revenue / $20000 ad spend) _ 100 = 300% ROAS. ROAS=100% means that you earned the same amount you spent. ROAS=200% means that you earn twice more as spend.


<img
  src={require('./img/6fc260c-CleanShot_2022-12-21_at_16.31.45_2.png').default}
/>





### Other controls

#### Filters

You can filter the Cohorts by product, attribution, country, segment, store, product duration, or product type - with trials or without them. For example, if you filter by products with trials, only revenue from those products will be taken into account.


<img
  src={require('./img/602c3db-CleanShot_2022-12-21_at_16.53.50.png').default}
/>





#### Date filter

Date filter specifies the time window for the installs to occur so that their transaction history is taken into account in Cohorts. 

**Note:** Cohorts are always calculated up to the current moment, the date control just filters which installs to take.

#### "Form cohorts by"

Configures the rows of the table. See [Rows](https://adaptyteam.readme.io/docs/cohorts#rows) section above.

#### "Show Revenue/Subscribers/ARPPU"

Configures which values to put in the cells of the table. You can see Revenue, Subscribers or ARPPU individually or all of them at once.

#### "Total value"/"From start"

By default you just see the values of the metrics you'd like to see. You can toggle this control to "From start" to see the ratio of the current cell to the starting cell in the cohort (the first time period).

#### "change by Monthly/Weekly/Daily periods"

Configures the time periods of the columns.