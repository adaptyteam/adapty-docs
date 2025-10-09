---
title: "Growth Autopilot"
description: "Automate setting the prices that bring the most revenue."
metadataTitle: "Growth Autopilot | Adapty Docs"
keywords: ['autopilot', 'growth autopilot']
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::important
Growth Autopilot can analyze only those apps that already have transactions in production. It's important for us to consider the results you already have when planning the next steps.
:::

Your app growth primarily relies on the following factors:
- Pricing strategy
- Paywall design
- Discounts and upsells

Your pricing strategy should be based on the market, so it's important to see how competitors set their prices. This helps you spot trends, find gaps, and make smart decisions to improve your pricing and stand out.

So, you need to clearly understand **which prices to set** and **which paywalls to launch**.

Adapty Growth Autopilot helps you to automate these tasks, so you have less to worry about.

## How it works

1. You select your app to analyze. This app must already have transactions in the production environment.
2. Adapty selects your live paywall from your largest placement that brings in the most revenue to serve as a baseline for the analysis.
3. Adapty compares your prices and funnel effectiveness to your top competitors and to the industry benchmarks for your category.
4. Adapty creates a testing strategy plan for you to boost your revenue growth that includes adjusting app pricing and paywall design and running A/B tests.

## Analyze your app

:::important
Before you start, consider the following:
- To provide a single, consistent point of comparison, this analysis is based on the U.S. App Store. This allows us to benchmark all apps against the same large dataset, with prices shown in USD.
- This analysis focuses only on subscription products. Consumable in-app purchases are not included.
:::

To create a report on your app:

1. Go to **A/B tests** from the dashboard sidebar and click **Start Pricing Analysis**.

<Zoom>
  <img src={require('./img/pricing-analysis.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<br/>

:::note
If the analysis doesn't start, it may be due to one of the following reasons:
- Adapty couldn't select a top-performing paywall because there is not enough purchase data yet.
- There are no purchases in the USA.
- Your top-performing paywall has two or more products with the same period.
:::

2. Select your app from the list and click **Analyze this app**. After that, Adapty will need some time to analyze your app, but don't leave the page – it won't take long.

<Zoom>
  <img src={require('./img/select-app.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. At this stage, we will detect your top-performing paywall. Review its information and click **Proceed to competitors research**.

<Zoom>
  <img src={require('./img/app-analysis.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Confirm your competitors we've detected, or add some manually using their links from the App Store. Then, click **Generate report**.
   
    We recommend focusing on apps with higher MRR that you have.

<Zoom>
  <img src={require('./img/competitors.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. Once the analysis is ready, you can see how your top-performing paywall compares to your competitors and industry benchmarks. Click **Go to recommendations** to see the testing plan for your new pricing strategy.

<Zoom>
  <img src={require('./img/compare.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


6. Click **Let's begin** to see the growth plan we've created for you. You will see several stages with different durations.

<Zoom>
  <img src={require('./img/growth-strategy.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


## What's next 

Once your recommendations are ready, it’s time to put them into action. 

Your plan consists of three parts: setting new prices, updating paywalls, and conducting A/B tests with them. After each round, the winning strategy will advance to the next round. The winner of the final round will be your most efficient pricing option. Based on our estimates, completing the entire test cycle could increase your revenue by up to 80%.

To start with the first stage:

1. Create new products right from the report. Don't forget to add them to stores as well ([App Store](app-store-products.md) and [Google Play](android-products.md)).
2. Duplicate your current top-performing paywall and add products to it.
3. Launch A/B test that will compare how the new paywall performs against the current paywall.

<Zoom>
  <img src={require('./img/recommendation.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>