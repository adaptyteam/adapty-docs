---
title: "A/B test"
description: "Optimize subscription pricing with A/B tests in Adapty for better conversion rates."
metadataTitle: "A/B Testing for Paywalls | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Are you looking to boost your in-app purchases and subscription revenue? One effective way to optimize your offerings is through A/B testing. With Adapty you can easily create and manage A/B tests for different pricing strategies, subscription lengths, trial durations, and more. In this guide, we'll walk you through the steps of creating A/B tests in the Adapty Dashboard and analyzing the results to make data-driven decisions about your in-app purchases and subscriptions. Whether you're new to A/B testing or looking to improve your existing strategies, this guide will provide you with the tools and insights you need to maximize your app's revenue potential.

:::warning
Be sure you [send paywall views to Adapty](present-remote-config-paywalls#track-paywall-view-events) using the `.logShowPaywall().` Without this method, Adapty wouldn't be able to calculate views for the paywalls within the test, which would result in irrelevant conversion stats.
:::

## A/B test types

Adapty supports three types of A/B tests:

- **Regular A/B test:** An A/B test created for a single paywall placement.
- **Onboarding A/B test:** An A/B test created for a single onboarding placement.
- **Crossplacement A/B test:** An A/B test created for multiple paywall placements in your app. This means the same variant once determined by the A/B test will be consistently shown across different sections of your app.

:::warning
Crossplacement A/B tests are only available for native iOS, Flutter, and Android SDKs starting from v3.5.0.

Onboarding A/B tests are only available for native iOS and Android SDKs starting from v3.8.0.

Users from previous versions skip them.
::: 

### A/B test types use cases
Each A/B test type is useful if:
- **Regular** and **Onboarding A/B/ tests**:
  - You have only one placement in your app.
  - You want to run your A/B test for only one placement even if you have multiple placements in your app and see economics changes for this one placement only.
  - You want to run an A/B test on old users (those who have seen at least one Adapty paywall).
- **Crossplacement A/B test**:
   - You want to use the same variant in multiple sections, such as Onboarding and Settings.
   - You want to evaluate your app's overall economy, ensuring that A/B testing is conducted across the entire app rather than just specific parts, making it easier to analyze results in the A/B testing statistics.
   - You want to run an A/B test on new users only, i.e. the users who have never seen a single Adapty paywall.

   

### Key differences
| Feature                         | Regular A/B Test                                                                                        | Onboarding A/B Test                                                                                        | Crossplacement A/B Test                                                           |
| ------------------------------- |---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **What is being tested**        | One paywall                                                                                             | One onboarding                                                                                             | Set of paywalls belonging to one variant                                         |
| **Variant consistency**         | Variant is determined separately for every placement                                                    | Variant is determined separately for every placement                                                       | Same variant used across all paywall placements                                   |
| **Audience targeting**          | Defined per paywall placement                                                                           | Defined per onboarding placement                                                                           | Shared across all paywall placements                                              |
| **Analytics**                   | You analyse one paywall placement                                                                      | You analyse one onboarding placement                                                                       | You analyze the whole app on those placements that are a part of the test         |
| **Variant weight distribution** | Per paywall                                                                                             | Per onboarding                                                                                             | Per set of paywalls                                                |
| **Users**                       | For all users                                                                                           | For all users                                                                                              | Only new users (those who haven’t seen an Adapty paywall)                         |
| **Adapty SDK version**          | Any                                                                                                     | :warning: 3.8.0+                                                                                           | :warning: 3.5.0+  |
| **Best for**                    | Testing independent changes in a single paywall placement without considering the overall app economics | Testing independent changes in a single onboarding placement without considering the overall app economics | Evaluating overall monetization strategies app-wide                               |

Each paywall/onboarding is assigned a weight that determines how traffic is split during the test.

For example, if one paywall is given a weight of 70% and the other 30%, the first paywall will be shown to roughly 700 out of 1,000 users, and the second to about 300. The total weight across all variants must equal 100%.

The key difference between regular and cross-placement A/B tests is that cross-placement tests allow you to show paywalls in multiple placements. These paywalls can be different or even partially the same depending on what you're testing. In cross-placement tests, weights are assigned per variant, not per paywall.

Setting up your A/B test this way allows you to effectively compare different paywalls and make smarter, data-driven decisions for your app’s monetization strategy.

## A/B test selection logic

As you may have noticed from the table above, **cross-placement A/B tests take priority over regular A/B tests**. However, cross-placement tests are only shown to **new users** — those who haven’t seen a single Adapty paywall yet (to be precise, `getPaywall` SDK method was called). This ensures consistency in results across placements.

Here is an example of the logic Adapty follows when deciding which A/B test to show for a paywall placement:

<Zoom>
  <img src={require('./img/ab-tests-scheme.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '350px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<!--- ### How each A/B test works

- **Regular A/B Test:**
  - Conducted separately for each placement.
  - Different placements may show different paywalls.
  - Analytics shown for one placement.
  - Lower audience priority if a cross-placement test applies to the same audience/placement.
- **Cross-placement A/B Test:**
  - Conducted across multiple placements for the same audience.
  - The same paywall variant is assigned and shown consistently across all included placements.
  - Variant weight distribution remains uniform across all affected placements.
  - Analytics shown for the entire app.
  - Highest audience priority. If multiple crossplacement tests apply, the oldest runs first. --->

Regular, onboarding, and crossplacement A/B tests are displayed in separate lists, which you can switch between.

<Zoom>
  <img src={require('./img/ab-tests-tabs.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Crossplacement A/B test limitations

Currently, crossplacement A/B tests cannot include onboarding placements.

Also, crossplacement A/B tests guarantee the same variant across all placements in the A/B test, but this causes several limitations:

- They always have the highest priority in a placement.
- Only new users can participate, i.e. the users who have not seen a single Adapty paywall before (to be precise, `getPaywall` SDK method was called). That is done because it's not possible to guarantee for the old users that they will see the same paywall chain, because an existing user could have seen something before the test has been started.

## Creating A/B tests

When creating a new A/B test, you need to include at least two [paywalls](paywalls) or [onboardings](https://docs.adapty.io/docs/onboardings), depending on your test type. 

<!--- When it comes to creating A/B tests in Adapty, you have several options to choose from. Depending on your goals and needs, you can create a new A/B test directly from the A/B test section, from a specific placement page, or from a paywall page. Here's a step-by-step guide on how to create an A/B test using each of these options. --->

To create a new A/B test:

1. Go to [A/B tests](ab-tests) from the Adapty main menu.

   <Zoom>
     <img src={require('./img/go-to-abtests.png').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. Click the **Create A/B test** button at the top right.

   <Zoom>
     <img src={require('./img/create-abtest.png').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

4. In the **Create the A/B test** window, enter a **Test name**. This is required and should help you easily identify the test later. Choose something descriptive and meaningful so it’s clear what the test is about when you review the results.
5. Fill in the **Test goal** to keep track of what you're trying to achieve. It could be increasing subscriptions, improving engagement, reducing churn, or anything else you're focusing on. A clear goal helps you stay on track and measure success.
6. Click **Select placement** and choose a paywall placement for a regular A/B testб or an onboarding placement for an onboarding A/B test.   
7. Now it’s time to set up the test content using the **Variants** table. Variants go in rows, placements go in columns, and paywalls are added where they intersect. By default, there are 2 variants and 1 placement, but you can add more of each. 

   Once you add a second placement, the test becomes a cross-placement A/B test.


   
      <Zoom>
          <img src={require('./img/abtest-variants.png').default}
          style={{
            border: '1px solid #727272', /* border width and color */
            width: '700px', /* image width */
            display: 'block', /* for alignment */
            margin: '0 auto' /* center alignment */
          }}
        />
       </Zoom>

    Key:

<div style={{ marginLeft: '2em' }}>
  <table>
    <tr>
      <td>1</td>
      <td>Rename the variant to make it more descriptive for you.</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Change the weight of the variant. Keep in mind that in total, the variants must build 100%.</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Add more variants if needed.</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Add more placements if needed.</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Add paywalls/onboardings to display in the placements for every variant.</td>
    </tr>
  </table>
</div>
7. Don’t forget to save your test. You have two options:
    1. **Save as draft**: This means the test won’t go live right away. You can launch it later from either the placement or A/B test list. This option is great if you’re not quite ready to start the test and want more time to review or tweak it.
    2. **Run A/B test**: Choose this if you’re ready to launch the test immediately. The test will go live as soon as you click this button.

To learn more about launching A/B tests, check out our [guide on running A/B tests](run_stop_ab_tests). You’ll also be able to track performance using a variety of metrics — see the [metrics documentation](results-and-metrics) for more details.

<!--- ### Creating A/B test from the placement

Another way to create an A/B test is to do it from the Placement detail page. To get started, navigate to the detail page of the corresponding placement. Here, for each selected audience you have two options: you can choose to show any paywall to the users in that audience by selecting a paywall, or you can choose to run an A/B test by selecting the corresponding option. 

If you're not familiar with Placements, you can learn more about them in our [documentation](placements).

For creating a new A/B test you should click on the **Create A/B test** button for the corresponding audience. The rest of the process is similar to creating an A/B test from the A/B test section.

You'll be prompted to choose whether you want to select an existing paywall group or create a new A/B test from scratch. If you choose to create a new A/B test, you can add your desired paywalls in the creation modal by clicking the "Add Paywall" button.

Once you've added your paywalls, you can assign weights to each option to control how often they appear during the test. You can also set a test goal to track your progress and determine which paywall performs best with your audience.

<Zoom>
  <img src={require('./img/1a7b50a-small-CleanShot_2023-04-25_at_14.53.452x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Once you've created your A/B test and saved the placement, it will be available in the corresponding placement of your app and displayed for the selected audience.

This means that users in the selected audience will see the paywalls included in the A/B test as they interact with your app. The weights assigned to each paywall option will determine how often each paywall appears during the test, allowing you to collect data on which paywalls perform best with your audience.

You can monitor the progress of your A/B test in the dashboard and make adjustments as needed to improve your results. One way to do this is by checking the metrics of the placement. You can learn more about placement metrics in [this doc](placement-metrics).

By setting up an A/B test from the Placement detail page, you'll be able to more easily test different paywalls with specific audiences and get valuable insights into what works best for your business. --->

## Editing A/B tests

You can only edit A/B tests that are saved as drafts. Once a test is live, it can’t be changed. However, you can use the **Modify** option to create a duplicate of the test with the same name and make your updates there. The original test will be stopped, and both the original and the new version will appear separately in your analytics.