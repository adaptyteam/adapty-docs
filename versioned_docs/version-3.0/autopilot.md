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

<div style={{ textAlign: 'center' }}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/u0HZep9X9e4?si=AKEfLK8NPeNdYpSM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

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

:::note
If the analysis doesn't start, it may be due to one of the following reasons:
- Adapty couldn't select a top-performing paywall because there is not enough purchase data yet.
- There are no purchases in the USA.
- Your top-performing paywall has two or more products with the same period.
:::

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

Once your recommendations are ready, it’s time to put them into action. 

## Get to know your growth plan

Adapty presents your growth plan as a series of **_rounds_**, competitions. Each round is an A/B test that compares your existing strategy to our algorithmically generated recommendation.

The winner — the setup that yields the most revenue — gets to advance to the next round. The winner of the final round represents the most efficient strategy.

Based on our estimates, completing the entire test cycle could increase your revenue by up to 80%.

### Experiment with the basics

Adapty automatically sets up several rounds to get you started. These experiments concern the basic components of your in-app purchases: pricing, product selection, and subscription duration. When you're done with these rounds, you can [add extra rounds](#add-new-rounds-explore-the-ideas-library) to explore other ideas and new paywall designs.

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

### Expand the plan: the ideas library and new paywall designs

Other aspects of your product, such as its visual design, depend on your personal taste and the identity of your brand. The Adapty autopilot can offer you suggestions, but it's up to you to implement them.

To accommodate this workflow, Autopilot allows you to add new rounds to your growth plan.

Click the "Add new round" button on the sidebar to open the **Ideas library**. Inside, you'll find the **Paywall designs** section. It contains suggestions for new paywall elements and layouts.

Click a design suggestion to open the [Paywall Builder](adapty-paywall-builder.md) and customize the paywall to your liking. When you're ready to proceed, you can create a new A/B test straight from the builder interface, and see if the suggestion worked out well.

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
