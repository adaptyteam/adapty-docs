---
title: "Growth Autopilot"
description: "Automate setting the prices that bring the most revenue."
metadataTitle: "Growth Autopilot | Adapty Docs"
keywords: ['autopilot', 'growth autopilot']
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::important
Growth Autopilot works best with apps that already generate revenue. If Adapty can analyze your financial metrics, its suggestions are more likely to be effective.
:::

Your app growth primarily relies on the following factors:
- Pricing strategy
- Paywall design
- Discounts and upsells

Your pricing strategy should be based on the market, so it's important to see how competitors set their prices. This helps you spot trends, find gaps, and make smart decisions to improve your pricing and stand out.

So, you need to clearly understand **which prices to set** and **which paywalls to launch**.

Adapty Growth Autopilot helps you to automate these tasks, so you have less to worry about.

<div style={{ textAlign: 'center' }}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/u0HZep9X9e4?si=AKEfLK8NPeNdYpSM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## How it works

1. Select one of your apps for analysis.
2. To establish a baseline for the analysis, Adapty picks the *live paywall* with the *most revenue* from your *largest placement*. If your application hasn't generated any revenue yet, Adapty selects one at random. You can manually select a different paywall with at least 1 product if necessary.
3. Adapty compares your prices and funnel effectiveness to your top competitors and to the industry benchmarks for your category.
4. Adapty creates a testing strategy for revenue growth, with suggestions for pricing, paywall design, and A/B tests.

## Analyze your app

:::important
Before you start, consider the following:
- To provide a single, consistent point of comparison, this analysis is based on the U.S. App Store. This allows us to benchmark all apps against the same large dataset, with prices shown in USD.
- This analysis focuses only on subscription products. Consumable in-app purchases are not included.
:::

To create a report on your app:

1. Go to **A/B tests** from the dashboard sidebar and click **Adapty autopilot**.

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

2. Adapty automaticaly selects the top-performing placement based on revenue data. If you'd like to analyze a different placement, select one from the **Placement** dropdown. Then, click **Analyze this placement**. After that, Adapty will need some time to analyze your app, but don't leave the page – it won't take long.
<Zoom>
  <img src={require('./img/select-placement.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '500px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Adapty automatically selects the top-performing live paywall for analysis. If you wish to analyze a different paywall, click the **Change Paywall** button, and pick another option. You can only select a paywall added to the placement from the previous step.

    Review the paywall data: products, conversion metrics, the revenue distribution chart. When you're ready to proceed to the next step, click **Go to competitors research**.
   
<Zoom>
  <img src={require('./img/autopilot-select-paywall.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Adapty suggests a list of up to 5 competitors for analysis. They are chosen based on your app's category and MRR. You can modify the list, and manually add applications with an App Store link. We recommend selecting apps with higher MRR than yours.

    Click **Generate report** to confirm the list of competitors.
   
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

Your plan consists of several parts that include setting new prices, updating paywalls, and conducting A/B tests with them. After each round, the winning strategy will advance to the next round. The winner of the final round will be your most efficient pricing option. Based on our estimates, completing the entire test cycle could increase your revenue by up to 80%.

To start with the first stage:

1. Create new products right from the report or modify your existing products. You can automatically push your new products to App Store and Google Play right away.
2. Duplicate your current top-performing paywall and add products to it. You can also modify your current paywall design according to the recommendations or generate a new one using the AI generator in the [Adapty Paywall Builder](adapty-paywall-builder.md).
3. Launch A/B test that will compare how the new paywall performs against the current paywall.

:::important
The recommendations page will show you the target number of subscribers and the minimum duration for the A/B test. Follow these recommendations to get the most accurate data before you begin with the next stage. You will need to stop the A/B test manually.
:::

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

## Why will it work?

Every recommendation comes with a clear hypothesis that explains the reasoning behind it. You'll see how your current metrics stack up against competitors and industry averages, what opportunity we've identified, and which key metrics the test is expected to improve.

For a detailed look at how Autopilot analyzes your growth strategy and which data sources it uses to create recommendations, check out [our article](autopilot-how-it-works.md).

<Zoom>
  <img src={require('./img/hypothesis.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
