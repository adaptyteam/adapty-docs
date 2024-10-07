---
title: "Funnel analysis"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty funnels are designed to assist you with such kinds of questions:

1. What percentage of installs is converted to paying clients?
2. What part of those who tried the product became loyal?
3. Which steps show high drop-off and need more attention?
4. Why do clients stop to pay?

With a funnel chart, you may also find more insights about user behavior setting filters and groups.   

Funnels work with the data that we gather through SDK and store notifications and don't require any additional configuration from your side.


<Zoom>
  <img src={require('./img/10c99f9-CleanShot_2022-06-24_at_10.08.53.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Funnel chart step by step

Let's go through the elements of a funnel to understand how to read the user journey on the chart.


<Zoom>
  <img src={require('./img/ed5bf5d-CleanShot_2022-06-23_at_09.36.49.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The 1st column (1) is the number of installs. It is shown as an absolute value (2) of total installations (not unique users) and also as 100% - the largest input number for further conversions relative calculation. If a user deletes an app and then installs it again two separate installs will be counted.  
A grey area nearby stands for transition parameters between steps. A conversion percent to the next step (Displayed paywall) is shown on a flag (3). Drop off percent and an absolute value of churn are shown below (4).


<Zoom>
  <img src={require('./img/00416f9-CleanShot_2022-06-23_at_14.02.06.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The 2nd column (5) shows the number of users of the app who saw a paywall at least one time (6). They are taken only from those installs that happened in a selected period. If a user sees a paywall in the selected period but his install date is out of range his view is not counted.  
There is also a percentage of such views taken from the 1st step (7). You may notice that this percent is equal to the grey flag (3) of the 1st step. This equality takes place only for these first steps.

We collect data for this step from all your paywalls that use the `logShowPaywall()` method. So please be sure to send every paywall view to Adapty using this method as described in the [docs](present-remote-config-paywalls#track-paywall-view-events).

A grey area next to the 2nd column stands for transition. A conversion percent to the next step (Trial) is shown on a flag (8). Drop-off percent and the absolute value of churned customers after the paywall are shown below (9). 


<Zoom>
  <img src={require('./img/fb11650-CleanShot_2022-06-23_at_15.54.32.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The 3rd column (10) shows the number of trials activated on the paywalls by customers who installed the app within a selected period (11). If a filter is set to non-trial product(s) this value becomes zero and the column is empty. 

See also a percent of trials taken from the 1st step, showing the conversion from installs to trials (12).  
You may notice that this percent is not equal now to the grey flag (8) of the previous step conversion. This is because we compare the current value with the 1st step at the top of the chart and with the previous step on grey flags.  
So a grey area next to the 3rd column shows a conversion percent to the next step (Paid) which is displayed on a flag (13). Drop-off percent and absolute value of churned customers during a trial period are shown below (14).


<Zoom>
  <img src={require('./img/7b88909-CleanShot_2022-06-23_at_15.54.32_-_2.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Starting from the trial you can hover on the step to see churn reasons.


<Zoom>
  <img src={require('./img/df40d2f-CleanShot_2022-06-23_at_17.36.08.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





The 4th column shows the number of activated subscriptions (15). For products without trials, this number includes direct subscriptions from a paywall. For products with trials, it contains the number of trials converted into paid subscriptions. If you have both types of products, with trial and without, it will be a sum of both. 

The percent at the top shows the conversion from installs (16).  
The percent on a grey flag shows conversion to the next step (renewal to the 2nd period) (17).  
Drop off before the renewal to the 2nd period percent and absolute value are shown below the conversion (18).


<Zoom>
  <img src={require('./img/d13bf9b-CleanShot_2022-06-23_at_15.54.32-3.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





This step starts a sequence of steps with a similar structure. After the 2nd renewal comes the 3rd, then the 4th, etc. If there is enough data in your app history you may see dozens of periods using the horizontal scroll. The logic for these steps remains the same:

- percent from installs at the top, 
- percent from the previous step at the bottom, 
- the absolute amount of renewal at the top, 
- the absolute amount of churn at the bottom,
- a hover for churn reasons pop-up. 

### Table view, filters and CSV export

A funnel chart is enriched with data in a table to provide handy material for your work with numbers. 


<Zoom>
  <img src={require('./img/4787aff-CleanShot_2022-06-23_at_21.01.44.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





This table repeats the approach of the funnel with some amendments.  
There are columns that show data on all steps except for the step of the 1st paid subscription.  
Instead of this one, there are two separate: Install -> Paid and Trial -> Paid. They display a core point of conversion when a free user becomes paying.

It may seem that there is a product type division: Install -> Paid column shows only products without trials while the column Trial -> Paid contains only products with trials. But that's not exactly the way it works. Because we also consider those users whose trial has expired and they purchase a product with a trial like it doesn't have it at all.


<Zoom>
  <img src={require('./img/a9bcbc7-CleanShot_2022-06-23_at_21.29.12.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Diving deeper into numbers you will find filtering powerful tools for new hypotheses.  
Feel free to set conditions in different dimensions. Collect true insights based on data.  
Variate: 

1. Product type - economy, length, etc
2. Time range. 
3. Country segmentation.
4. Traffic attribution.
5. Store.

Select Absolute #, Relative %, or both to view only necessary data.


<Zoom>
  <img src={require('./img/1475e42-CleanShot_2022-06-23_at_21.50.33_-2.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Finally, on the right of the control panel, there's a button to export funnel data to CSV. You can then open it in Excel, or Google Sheets, or import it into your own analytical system.


<Zoom>
  <img src={require('./img/ff23846-CleanShot_2022-06-23_at_22.15.49.webp').default}
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