---
title: "Run and stop A/B test"
description: "Learn how to run and stop A/B tests in Adapty to optimize subscription conversions."
metadataTitle: "Running and Stopping A/B Tests | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Running an A/B test in Adapty means adding it to a placement. 

### How to run the A/B test

1. Open the [A/B tests](ab-tests) section from the Adapty main menu.

   

<Zoom>
  <img src={require('./img/run-ab-test.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Make sure you are in the correct list as regular and cross-placement A/B tests are displayed in separate lists, which you can switch between.

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

3. Switch to the **Drafts** tab since only draft A/B tests can be run. 

4. Click on the **Run A/B test** button next to the A/B test you want to begin.

   <Zoom>
     <img src={require('./img/run-ab-test.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

5. The **Edit A/B test** window opens and lets you review and adjust the test before running. If some data is absent and prevents the test from running, for example, placement and audience, you have the chance to fix it. Keep in mind that after the test is run, you cannot correct it, you can only finish this test and create a new one with the made changes. So be accurate when reviewing your test.
   
6. After you added all the required data, click **Run A/B test** to launch the test. 

After launching, you can then track its progress and view metrics on the [A/B test metrics](results-and-metrics) page. This will help you identify the better-performing variation and make informed decisions to enhance your app's performance. For more details on Adapty A/B test metrics, refer to [Maths behind the A/B tests](maths-behind-it) section.

### How to stop the A/B test

When you choose to stop an A/B test, it means you have finished observing and analyzing the data. This step is essential for evaluating the test accurately and making informed decisions for future strategies. Stopping an A/B test is a crucial part of the testing process to optimize your outcomes effectively.

<Zoom>
  <img src={require('./img/stop-ab-test.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Open the [A/B tests](https://app.adapty.io/ab-tests) section from the Adapty main menu and locate the A/B test you want to stop. Only tests in the **Live** tab, i.e. the tests that are currently running can be stopped.
2. Click on the **Stop A/B test** button from the elipse button next to the A/B test.
3. In the opened **Stop the A/B test** window, choose which paywall to show after the A/B test is finished. You have the following options:

   | Option                                             | Description                                                  |
   | -------------------------------------------------- | ------------------------------------------------------------ |
   | Show one of the tested paywalls                    | Based on the included paywall metrics such as revenue, probability to be best (abbreviated as **P2BB**), and revenue per 1K users, you can choose the winning paywall from the list of tested paywalls. By selecting this option, after stopping the A/B test for the selected placement and audience, the winning paywall will be displayed in the app. This allows you to optimize your app's performance by showcasing the most effective paywall to your users. |
   | Select paywalls that don’t participate in A/B test | In this case, you can choose any paywall that is not a part of the current A/B test. That is useful if the result of the test show that none of the tested paywalls showed good results and you want to continue with a more resulting pywall. |
   | Don’t show any specific paywall                    | For the selected placement and audience, no paywalls from that A/B test will be displayed in the app. This option is useful if you want to pause the display of any paywalls for that specific combination of placement and audience. |

4. Click the **Stop and complete this A/B test** button.

Once the A/B test is stopped, it will no longer be active, and the paywalls will no longer be displayed to users. However, you can still access the A/B test results and metrics on the [A/B test metrics page](results-and-metrics#metrics-controls) to analyze the data collected during the test.

:::note
Stopping an A/B test is irreversible, and the test cannot be restarted once it has been stopped. Ensure that you have gathered sufficient data and insights before making the decision to stop an A/B test.
:::