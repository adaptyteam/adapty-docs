---
title: "Run and stop A/B test"
description: "Learn how to run and stop A/B tests in Adapty to optimize subscription conversions."
metadataTitle: "Running and Stopping A/B Tests | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Running an A/B test in Adapty means assigning it to a placement so it can start showing paywalls to users.

## How to run the A/B test

1. Go to the [A/B tests](ab-tests) section from the Adapty main menu.

2. Make sure you're viewing the correct list — **regular** and **cross-placement** A/B tests are shown in separate tabs that you can switch between.

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

3. Switch to the **Drafts** tab. Only draft tests can be started.

4. Click the **Run A/B test** button next to the test you want to launch.

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

5. The **Edit A/B test** window will open so you can review and make any final changes before launching the test. If something important is missing — like the placement or audience — you’ll be able to add it now. Keep in mind that once the test is live, you won’t be able to make any edits. To apply changes later, you’ll need to stop the test and create a new one.

6. Once everything looks good, click **Run A/B test** to start.

After launching the test, you can track its progress and view performance data on the [A/B test metrics](results-and-metrics) page. This helps you spot the best-performing variation and make smarter decisions. For more details on how Adapty calculates these metrics, check out Math behind the A/B tests.

## How to stop the A/B test

Stopping an A/B test means you're ready to end it and review the results. This step is key for wrapping up the test and deciding what to show users next.

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

1. Open the [A/B tests](https://app.adapty.io/ab-tests) section and go to the **Live** tab.

2. Click the three-dot menu next to the test you want to stop, then choose **Stop A/B test**.

3. In the **Stop the A/B test** window, decide what should happen after the test ends. You have three options:

   | Option                                             | Description                                                  |
   | -------------------------------------------------- | ------------------------------------------------------------ |
   | Show one of the tested paywalls                    | Choose the winning paywall based on test results like revenue, probability to be best (**P2BB**), and revenue per 1K users. This paywall will then be shown for the selected placement and audience. |
   | Select paywalls that don’t participate in A/B test | In this case, you can choose any paywall that isn’t part of the current A/B test. This is helpful when the test results show that none of the tested paywalls performed well, and you want to continue with a more effective one instead. |
   | Don’t show any specific paywall                    | For the selected placement and audience, no specific paywall will be selected after the A/B test ends. Instead, the next available paywall based on audience priority will be shown. This is a good choice if you’d rather let your existing setup decide which paywall to display, without manually selecting one. |

4. Click the **Stop and complete this A/B test** button.

Once the A/B test is finished, it will no longer be active, and the paywalls from it will no longer be displayed to users. However, you can still access the A/B test results and metrics on the [A/B test metrics page](results-and-metrics#metrics-controls) to analyze the data collected during the test.

:::note
Stopping an A/B test is irreversible, and the test cannot be restarted once it has been stopped. Ensure that you have gathered sufficient data and insights before making the decision to stop an A/B test.
:::