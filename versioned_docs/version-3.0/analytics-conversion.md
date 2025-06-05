---
title: "Conversion analysis"
description: "Measure subscription conversion rates using Adapty’s analytics tools."
metadataTitle: "Subscription Conversion Analytics | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

While funnels give you a high-level overview and retention focuses on user loyalty, conversion analysis is designed to help you evaluate effectiveness at every critical step in the user journey—over time. 

Conversions assist with the following questions:

1. How do app conversions change over time? Are there any seasonal trends?
2. How conversions are changed in the moment of marketing activities or some other new circumstances? 
3. How do users in different regions respond to your app updates?
4. Which product types convert better over time?

Conversion is performed with the data we gather through Adapty SDK and store notifications, and it doesn't require any additional configuration from your side.


<Zoom>
  <img src={require('./img/conversion-tab.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Main controls and charts

Though revenue is often the go-to metric for measuring success, it's just one part of the bigger picture. Understanding how your business performs over time—across different user behaviors and lifecycle stages—is equally important. That’s where conversion analytics come into play. 

You can find more valuable insights about user behavior by setting filters and groups. To identify and analyze trends, monitor how your conversions evolve daily, monthly, or yearly.
<Zoom>
  <img src={require('./img/conversion-chart.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



On the left side of the chart, you'll find the conversion steps control. This lets you choose which specific conversions to track—such as Install → Trial, Trial → Paid, or Paid → Renewal.

Each conversion metric follows this logic:

- Let **X** be the number of users who entered the starting state on a selected date (e.g., installs).

- Let **Y** be the number of those users who eventually reached the target state (e.g., trial starts).

- The conversion rate is calculated as: **Conversion = (Y / X) × 100%**

:::note
The date shown on the chart corresponds to when users entered the initial state (X)—the moment they became eligible to convert.
:::

Please see below for each conversion explanation, along with an example for your reference.

### Install -> Paid
This metric shows what percentage of users who installed the app on a specific date eventually purchased their first subscription.

  
<details>

   <summary>How it works</summary>

 
**Let**:

- **X** = number of installs on a selected date (same for all products, as no product is chosen at the time of installation).

- **Y** = number of those users who eventually purchased their first subscription (trial or non-trial).

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, there were 100 installs.

- By January 8, 20 of those users had subscribed.

  - On January 8, the conversion for January 1 = (20 / 100) × 100% = 20%

- By February 1, 30 more users from the January 1 install group had purchased a subscription.

  - On February 1, the conversion for January 1 = ((20 + 30) / 100) × 100% = 50%

This means that 50% of users who installed the app on January 1 eventually converted to a paid subscription, up to the current moment.

</details>

### Install -> Trial  
This metric shows the percentage of users who installed the app on a specific date and eventually started a trial.

<details>
<summary>How it works</summary>

**Let**:

- **X** = number of installs on a selected date (same for all products, as no product is chosen at the time of installation).

- **Y** = number of those users who eventually activated a trial, at any time.

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, there were 100 installs.

- By January 8, 20 of those users had started a trial.

  - On January 8, the conversion for January 1 = (20 / 100) × 100% = 20%

- By February 1, 30 more users from the January 1 install group had started a trial.

  - On February 1, the conversion for January 1 = ((20 + 30) / 100) × 100% = 50%

This means that 50% of users who installed the app on January 1 eventually started a trial, up to the current moment.
</details>
 
### Trial -> Paid  
This metric shows the percentage of users who started a trial on a specific date and later purchased their first subscription.

<details>
<summary>How it works</summary>

**Let**:

- **X** = number of trials started on a selected date.

- **Y** = number of those users who eventually purchased a subscription after their trial.

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, 100 trials were started.

- By January 8, 20 of those users had subscribed.

  - On January 8, the conversion for January 1 = (20 / 100) × 100% = 20%

- By February 1, 30 more users from the January 1 trial group had subscribed.

  - On February 1, the conversion for January 1 = ((20 + 30) / 100) × 100% = 50%

This means that 50% of users who started a trial on January 1 eventually converted to a paid subscription, up to the current moment.

</details>

### Paid -> 2nd Period  
This metric shows the percentage of users who renewed their subscription after the first payment.

<details>
<summary>How it works</summary>

**Let**:

- **X** = number of first-time subscriptions on a selected date.

- **Y** = number of users who renewed for a second period, any time later (typically after one subscription cycle; includes grace period renewals).

- **Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, there were 100 first-time subscriptions.

- By January 8, 20 of those had renewed.

  - On January 8, the conversion for January 1 = (20 / 100) × 100% = 20%

- By February 1, 30 more users from that group had renewed.

  - On February 1, the conversion for January 1 = ((20 + 30) / 100) × 100% = 50%

This shows that 50% of users who made their first subscription payment on January 1 renewed for a second period, up to the current moment.

</details>
  
### 2nd Period -> 3rd Period 
This metric tracks how many users renewed again after their second subscription period.

<details>
<summary>How it works</summary>

**Let**:

- **X** = number of second-period subscriptions on a selected date.

- **Y** = number of users who renewed for a third period, any time later (typically after one more billing cycle; includes grace period renewals).

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, there were 100 second-period subscriptions.

- By January 8, 20 of those users had renewed.

  - On January 8, the conversion for January 1 = (20 / 100) × 100% = 20%

- By February 1, 30 more users had renewed.

  - On February 1, the conversion for January 1 = ((20 + 30) / 100) × 100% = 50%

This shows that 50% of users who entered their second subscription period on January 1 renewed for a third, up to the current moment.


</details>
 
### 3rd Period -> 4th Period  

This metric shows the percentage of users who renewed after their third subscription period.

<details>
<summary>How it works</summary>

**Let**:

- **X** = number of third-period subscriptions on a selected date.

- **Y** = number of users who renewed for a fourth period any time later (typically after one billing cycle; includes grace period renewals).

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, there were 100 third-period subscriptions.

- By January 8, 20 users had renewed.

  - On January 8, the conversion for January 1 = (20 / 100) × 100% = 20%

- By February 1, 30 more users renewed.

  - On February 1, the conversion for January 1 = ((20 + 30) / 100) × 100% = 50%

This means that 50% of users who entered their third subscription period on January 1 renewed for a fourth, up to the current moment.

</details>
 
### 4th Period -> 5 the Period  

This metric shows the percentage of users who renewed after their fourth subscription period.

<details>
<summary>How it works</summary>

**Let**:

- **X** = number of fourth-period subscriptions on a selected date.

- **Y** = number of users who renewed for a fifth period any time later (typically after one billing cycle; includes grace period renewals).

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, there were 100 fourth-period subscriptions.

- By January 8, 20 users had renewed.

  - On January 8, the conversion for January 1 = (20 / 100) × 100% = 20%

- By February 1, 30 more users renewed.

  - On February 1, the conversion for January 1 = ((20 + 30) / 100) × 100% = 50%

This means that 50% of users who entered their fourth subscription period on January 1 renewed for a fifth, up to the current moment.

</details>
 
### 6 Months +  

This metric shows the percentage of users who remained subscribed for longer than 6 months from their first subscription.

<details>
<summary>How it works</summary>

**Let**:

- **X** = number of first-time subscriptions on a selected date.

- **Y** = number of those users who renewed at least once after 6 months from the original subscription date.

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, there were 100 first-time subscriptions.

- By the first week of July, 20 of them renewed (e.g. on their 25th weekly subscription).

  - On July 8, the conversion for January 1 = (20 / 100) × 100% = 20%

- By August 1, 30 more renewed after 6 months.

  - On August 1, the conversion for January 1 = ((20 + 30) / 100) × 100% = 50%

This means that 50% of users who subscribed on January 1 remained subscribed past 6 months as of August 1.

</details>
 
### 1 Year +  

This metric shows the percentage of users who remained subscribed for longer than 12 months from their first subscription.

<details>
<summary>How it works</summary>

**Let**:

- **X** = number of first-time subscriptions on a selected date.

- **Y** = number of those users who renewed at least once after 12 months from the original subscription date.

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, 2021, there were 100 first-time subscriptions.

- By the first week of January 2022, 20 had renewed.

  - On January 8, 2022, the conversion = (20 / 100) × 100% = 20%

- By February 1, 2022, 30 more had renewed after 12 months.

  - On February 1, 2022, the conversion = ((20 + 30) / 100) × 100% = 50%

This means that 50% of users who subscribed on January 1, 2021 stayed active for more than one year.

</details>
 
### 2 Years +  

This metric shows the percentage of users who stayed subscribed for more than 24 months from their first payment date.

<details>
<summary>How it works</summary>

**Let**:

- X = number of first-time subscriptions on a selected date.

- Y = number of those users who renewed at least once after 24 months from the original subscription date.

**Formula**: Conversion = (Y / X) × 100%

**Example**:

- On January 1, 2020, there were 100 first-time subscriptions.

- By the first week of January 2022, 20 of them had renewed.

  - On January 8, 2022, the conversion = (20 / 100) × 100% = 20%

- By February 1, 2022, 30 more had renewed after 2 years.

  - On February 1, 2022, the conversion = ((20 + 30) / 100) × 100% = 50%

This means that 50% of the users who subscribed on January 1, 2020 were still active after 2 years, as of February 1, 2022.

</details>




## Grouping and time ranges

The object for the analysis when the conversion is chosen is the chart. It performs how the conversion percentage changes over time. Using the date picker please select the quick options for the time period.  
The chart usually contains several curves. Up to five of them are selected by default in the list of grouping and you may change the selection by choosing the checkboxes in the area to the right of the chart.  
When you open the page for the first time the product duration is selected as a default grouping. Then your settings are saved in the cache and the next time you see the group you've recently selected.  
The following groupings are available:

- Product
- Country
- Store 
- Paywall
- Duration
- Marketing attribution


<Zoom>
  <img src={require('./img/2454c7f-CleanShot_2022-08-01_at_15.06.53.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





If a chosen date range is not enough to show any results, you may see a notification that offers a relevant date and an option to adjust the date range automatically so you may do it with one click.


<Zoom>
  <img src={require('./img/64a0769-CleanShot_2022-08-02_at_08.05.02.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





## Table view, filters and CSV export

A comparison of the curves gives a bright picture, and to get more use the table view below the chart. The table is synchronized with the chart so hovering over a column you see the associated pop-up over the curves.


<Zoom>
  <img src={require('./img/3fe5da8-CleanShot_2022-08-02_at_08.11.45.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The grouping that was mentioned above changes both the charts and the table. Set quick filter by product or use other advanced ones, including Product, Country, Store, Duration, Attribution. 


<Zoom>
  <img src={require('./img/67c4ac4-CleanShot_2022-07-25_at_22.24.38.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





We know that it's important to have an option to work with numbers the way you like. So on the right of the control panel, there's a button to export funnel data to CSV. You can then open it in Excel, or Google Sheets, or import it into your own analytical system to continue analysis and forecasting in your preferred environment.  


<Zoom>
  <img src={require('./img/85788c5-CleanShot_2022-07-25_at_22.39.30.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::warning
Be sure to indicate that your app is included in Small Business Program in [Adapty General Settings](https://app.adapty.io/settings/general).
:::