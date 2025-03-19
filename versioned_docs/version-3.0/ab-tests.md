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

Adapty supports two types of A/B tests:

- **Regular A/B test:** An A/B test created for a single placement. This is useful if:
  - Your app has only one placement.
  - You want to show different paywalls in different placements within your app.
  
- **Crossplacement A/B test:** An A/B test created for multiple placements in your app. This means the same paywall once determined by the A/b test will be consistently shown across different sections of your app, with the weight distribution for variants being the same across all affected placements. This is useful when:
  - You want to use the same product set in multiple sections, such as Onboarding and Settings.
  - You want to evaluate your app's overall economy, ensuring that A/B testing is conducted across the entire app rather than just specific parts, making it easier to analyze results in the A/B testing statistics.
  

### Key differences

| Feature                 | Regular A/B Test                                  | Cross-placement A/B Test                                     |
| ----------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| **Scope**               | Single placement                                  | Multiple placements                                          |
| **Paywall consistency** | Different paywalls per placement                  | Same paywall across placements                               |
| **Audience targeting**  | Per placement                                     | Shared across placements                                     |
| **Weight distribution** | Independent for each placement                    | Same across all placement                                    |
| **Users**               | For all users                                     | Only for new users, i.e. users that have never seen a single Adapty paywall in your app |
| **Best for**            | Testing unique paywalls in different app sections | Evaluating app-wide monetization strategies                  |

### How each A/B test works

- **Regular A/B Test:**
  - Conducted separately for each placement.
  - Different placements may show different paywalls.
- **Cross-placement A/B Test:**
  - Conducted across multiple placements for the same audience.
  - The same paywall variant is assigned and shown consistently across all included placements.
  - Variant weight distribution remains uniform across all affected placements.

Regular and cross-placement A/B tests are displayed in separate lists, which you can switch between.

<Zoom>
  <img src={require('./img/ab-test-type.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Creating A/B tests

When creating a new A/B test, a regular one, or a crossplacement one, you must have at least two [paywalls](paywalls) in it. Each paywall in the test will have a weight, which represents the relative amount of users it will receive during the test. 

For example, if the first paywall has a weight of 70% and the second paywall weighs 30%, the first paywall will receive approximately 700 users out of 1000, and the second paywall will receive approximately 300 users. The sum of all weights must be 100%.

The difference between regular and A/B tests is that for the crossplacement A/B tests, you can show paywalls in more than 1 placement in the app. The paywalls in the placements can be the same or different if this fits the variants you wanna test. The weight is configured per variant rather than per paywall.

By configuring your A/B test options and assigning weights to each paywall, you can more effectively test different paywalls, enabling data-driven decisions for your business.

<!--- When it comes to creating A/B tests in Adapty, you have several options to choose from. Depending on your goals and needs, you can create a new A/B test directly from the A/B test section, from a specific placement page, or from a paywall page. Here's a step-by-step guide on how to create an A/B test using each of these options. --->

To create a new A/B test from the **A/B tests** section:

1. Open the [A/B tests](https://app.adapty.io/ab-tests) item from the Adapty main menu. 

   <Zoom>
     <img src={require('./img/list_cross_AB_test.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. Click the **Create A/B test** button located at the top right side of the page. 

   <Zoom>
     <img src={require('./img/create_AB_cross_test.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

4. In the **Create the A/B test** window, enter the **Test name**. This is a mandatory field and should be something that helps you easily identify the test in the future. Choose a name that is descriptive and meaningful, so you can quickly recognize the test when reviewing its results later on.
   
5. Enter the **Test goal** for your further reference. Clearly defining the goal will help you stay focused on what you're trying to achieve with the test. The goal could be related to increasing subscription sign-ups, improving user engagement, or reducing bounce rates, among other objectives. By setting a specific goal, you can align your efforts and measure the success of the A/B test accurately.
   
6. Now it's time to set up the content of the test: placements and variants in the **Variants** table. Variants are set up in the lines, while placements - in the rows. In the crossing of them - the paywalls. By default, we added 2 variants and 1 placement, but you can add as many as you need. Once you add the second placement, the A/B test will become a crossplatform.
   
      <Zoom>
          <img src={require('./img/cross-ab-test.webp').default}
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
      <td>Add paywalls to display in the placements for every variant.</td>
    </tr>
  </table>
</div>
7. Don't forget to save the created test. You have two ways to save the new A/B test:

    1. You can choose to save the newly created paywall **as a draft**, which means the test won't be launched at once. You can run the test later from the placement or A/B test list. This option is suitable if you're not yet ready to make the test live and want to review and modify it further before implementation. If you choose this option, click **Save as draft**.
	   
    2. Alternatively, you can choose to run the A/B test immediately by clicking **Run A/B test**. Once you do that, the A/B test will become active and live.

To learn more about running A/B tests and the process involved, you can refer to the [documentation](run_stop_ab_tests) on running A/B tests. You'll be able to monitor and track the test's performance using various metrics. For more information on these metrics, please refer to the [metrics documentation](results-and-metrics). 


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

Only draft A/B tests can be edited. After you run an A/B test, you cannot change it anymore. The **Modify** option lets you create a duplicate of the test with the same name and make the changes in it. The original A/B test however will be stopped. This means that in analytics, you will see 2 different tests. 