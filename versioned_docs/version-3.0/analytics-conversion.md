---
title: "Conversion analysis"
description: "Measure subscription conversion rates using Adapty’s analytics tools."
metadataTitle: "Subscription Conversion Analytics | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

While funnels show the overall picture and retention is focused on working with users' loyalty, the conversion feature is a handy tool for tracking the effectiveness at every point over time. 

Conversions assist with the following questions:

1. How do your app conversions change over time? Are there any seasonal trends?
2. How conversions are changed in the moment of marketing activities or some other new circumstances? 
3. How do different regions react to your app updates?
4. What types of products convert better over time?

You could find valuable insights about user behavior setting filters and groups.   

Conversion is performed with the data we gather through SDK and store notifications and doesn't require any additional configuration from your side.


<Zoom>
  <img src={require('./img/28ebb72-CleanShot_2022-08-01_at_12.35.38.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Main controls and charts

It's a common practice to measure success in money, e.g. tracking revenue. But sometimes it's important to see how your business works as a system at different financial scales over time. And here conversions come on stage.  
There is usually a number of marketing activities, technical updates, and external events that may impact the changes in user behavior. To validate this inspect how conversions change over days, months and years. 


<Zoom>
  <img src={require('./img/39c99b2-CleanShot_2022-08-01_at_14.30.14.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The main steps control is to the left of the chart. It contains a list of conversions to track.

In general the logic of a conversion value X->Y for a particular day is that we use for a ratio the number of those who started their X state on the selected day and the number of those who then converted later (no matter when exactly) to the Y state, so conversions for the particular day are all associated with the date when a user activated an opportunity to convert to Y, which is the moment when he activated X. Using these we calculate a conversion = (Y / X) \* 100%.

:::note
The date shown on the chart corresponds to when users entered the initial state (X)—the point at which they became eligible to convert. If the conversion period is still ongoing, this date range may be marked as an [incomplete data period](#incomplete-data-period).
:::

Please see below each conversion explanation with an example for your reference.

1. Install -> Paid  
   If Х - the number of installs (the same for all products because there is no product chosen at the stage of installation) for the selected date, and Y - the amount of those among Х who paid (any possible time) for the 1st subscription (directly, without trial), then Conversion = (Y / X) _ 100%. For example, we had 100 installs on the 1st of January and among them, 20 subscribed the same week. On the 8th of January we open the chart and see the conversion of the 1st of January = (20 / 100) _ 100% = 20%. Then 30 more installs of the 1st on January bought the 1st subscription without trial by the end of January. We open the chart on the 1st of February and see that the conversion of the 1st of January = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had installed the app on the 1st of January converted to the 1st subscription without trial by the current moment. 

2. Install -> Trial  
   If Х - the number of installs (the same for all products because there is no product chosen at the stage of installation) for the selected date, and Y - the amount of those among Х who activated a trial (any possible time), then Conversion = (Y / X) _ 100%. For example, we had 100 installs on the 1st of January and among them 20 activated a trial the same week. On the 8th of January, we open the chart and see the conversion of the 1st of January (20 / 100) _ 100% = 20%. Then 30 more installs on the 1st of January activated a trial by the end of January. We open the chart on the 1st of February and see that the conversion of the 1st of January = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had installed the app on the 1st of January converted to the trial by the current moment. 

3. Trial -> Paid  
   If Х - the number of trials taken during the selected date, and Y - the number of subscriptions after these trials taken any time later, then Conversion = (Y / X) _ 100%. For example, we had 100 trials taken on the 1st of January and among them, 20 bought a subscription the same week. On the 8th of January, we open the chart and see the conversion of the 1st of January = (20 / 100) _ 100% = 20%. Then 30 more trials of the 1st of January paid by the end of January. We open the chart on the 1st of February and see that the conversion of the 1st of January = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had activated the trial on the 1st of January converted to the 1st subscription by the current moment. 

4. Paid -> 2nd Period  
   If Х - the number of the 1st subscriptions taken during the selected date, and Y - the amount of the 2nd subscriptions taken after them any time later (normally the product duration time though grace period cases are also counted), then Conversion = (Y / X) _ 100%. For example, we had 100 1st subscriptions of various products on the 1st of January and among them 20 renewed in a week. On the 8th of January, we open the chart and see the conversion of the 1st of January = (20 / 100) _ 100% = 20%. Then 30 more subscribers of the 1st of January renewed by the start of February. We open the chart on the 1st of February and see that the conversion of the 1st of January = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had their 1st payment on the 1st of January converted to the 2nd subscription by the current moment. 

5. 2nd Period -> 3rd Period  
   If Х - the number of the 2nd subscriptions taken during the selected date, and Y - the amount of the 3rd subscriptions taken after them any time later (normally the product duration time though grace period cases are also counted), than Conversion = (Y / X) _ 100%. For example, we had 100 2nd subscriptions of various products on the 1st of January and among them 20 renewed in a week. On the 8th of January we open the chart and see the conversion of the 1st of January = (20 / 100) _ 100% = 20%. Then 30 more subscribers of the 1st on January renewed by the start of February. We open the chart on the 1st of February and see that the conversion of the 1st of January = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had their 2nd payment on the 1st of January converted to the 3rd subscription by the current moment. 

6. 3rd Period -> 4th Period  
   If Х - the number of the 3rd subscriptions taken during the selected date, and Y - the amount of the 4th subscriptions taken after them any time later (normally the product duration time though grace period cases are also counted), then Conversion = (Y / X) _ 100%. For example, we had 100 3rd subscriptions of various products on the 1st of January and among them 20 renewed in a week. On the 8th of January, we open the chart and see the conversion of the 1st of January = (20 / 100) _ 100% = 20%. Then 30 more subscribers of the 1st of January renewed by the start of February. We open the chart on the 1st of February and see that the conversion of the 1st of January = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had their 3rd payment on the 1st of January converted to the 4th subscription by the current moment. 

7. 4th Period -> 5 the Period  
   If Х - the number of the 4th subscriptions taken during the selected date, and Y - the amount of the 5th subscriptions taken after them any time later (normally the product duration time though grace period cases are also counted), then Conversion = (Y / X) _ 100%. For example, we had 100 4th subscriptions of various products on the 1st of January and among them 20 renewed in a week. On the 8th of January, we open the chart and see the conversion of the 1st of January = (20 / 100) _ 100% = 20%. Then 30 more subscribers of the 1st of January renewed by the start of February. We open the chart on the 1st of February and see that the conversion of the 1st of January = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had their 4th payment on the 1st of January converted to the 5th subscription by the current moment. 

8. 6 Months +  
   If Х - the number of the 1st payments taken during the selected date, and Y - the amount of the renewals that happened after the 6 months since the selected date from those 1st payments, then Conversion = (Y / X) _ 100%. For example, we had 100 1st subscriptions of various products on the 1st of January and among them 20 renewed on the 1st week of July (the 25th payment). On the 8th of July, we open the chart and see the conversion of the 1st of January = (20 / 100) _ 100% = 20%. Then 30 more subscribers of the 1st of January renewed by the start of August (the 8th payment). We open the chart on the 1st of August and see that the conversion of the 1st of January = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had their 1st payment on the 1st of January converted to the period > 6 months with any number of payments by the current moment. 

9. 1 Year +  
   If Х - the number of the 1st payments taken during the selected date, and Y - the amount of the renewals that happened after the 12 months since the selected date from those 1st payments, then Conversion = (Y / X) _ 100%. For example, we had 100 1st subscriptions of various products on the 1st of January 2021 and among them 20 renewed on the 1st week of January 2022. On the 8th of January 2022, we open the chart and see the conversion of the 1st of January 2021 = (20 / 100) _ 100% = 20%. Then 30 more subscribers of the 1st of January renewed by the start of February 2022. We open the chart on the 1st of February 2022 and see that the conversion of the 1st of January 2021 = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had their 1st payment on the 1st of January 2021 converted to the period > 12 months with any number of payments by the current moment. 

10. 2 Years +  
    If Х - the number of the 1st payments taken during the selected date, and Y - the amount of the renewals that happened after the 24 months since the selected date from those 1st payments, then Conversion = (Y / X) _ 100%. For example, we had 100 1st subscriptions of various products on the 1st of January 2020 and among them 20 renewed on the 1st week of January 2022. On the 8th of January 2022, we open the chart and see the conversion of the 1st of January 2021 = (20 / 100) _ 100% = 20%. Then 30 more subscribers of the 1st of January renewed by the start of February 2022. We open the chart on the 1st of February 2022 and see that the conversion of the 1st of January 2020 = ((20+30) / 100) \* 100% = 50%. This number shows which part of those who had their 1st payment on the 1st of January 2020 converted to the period > 24 months with any number of payments by the current moment. 


<Zoom>
  <img src={require('./img/289b193-CleanShot_2022-08-02_at_07.46.15.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





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

### Incomplete data period

Sometimes, a conversion may include incomplete data—for example, if trials or subscriptions haven't had time to expire yet. This can happen with any conversion except Install → Trial and Install → Paid.

In such cases:
- Adapty marks the period with incomplete data using a dashed line on the chart. This may cover up to 30 days before the current date.
- These incomplete trials or subscriptions are excluded from the overall conversion calculation.

<Zoom>
  <img src={require('./img/conversion-incomplete.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Table view, filters and CSV export

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