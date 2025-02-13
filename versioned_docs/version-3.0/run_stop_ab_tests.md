---
title: "Run and stop A/B test"
description: "Learn how to run and stop A/B tests in Adapty to optimize subscription conversions."
metadataTitle: "Running and Stopping A/B Tests | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Running A/B test in Adapty means adding it to a placement. In Adapty, you have two options to run an [A/B test](ab-tests): from the **Placement** page or the **A/B test** page.

### How to run the A/B test

In Adapty, you have two ways to run an [A/B test](ab-tests): from the **Placement** page or the **A/B test** page.

To run your A/B test for the chosen audience and placement:

1. Open the [**A/B tests**](ab-tests) section from the Adapty main menu.

   
<Zoom>
  <img src={require('./img/ebd94b2-run_ab_test.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Click on the **Run** button next to the A/B test you want to begin. The **Run** button only shows for A/B tests that are neither **Live** nor **Completed**.
3. In the opened **Running A/B test** window, select a **Placement** from the drop-down list. This indicates where in your app the A/B test will display for the chosen audience. This list includes all [placements](placements)  you have in Adapty for your app.
4. From the **Audience** drop-down list, choose user segment for your A/B test. This list includes all [segments](segments) you have in Adapty for your app.  
   If you choose an audience that is a part of some other placement, it will automatically become a part of the chosen placement as well after you run the A/B test.  
   Please note that every audience has a numerical **Priority** (starting from 1). If you add an audience with a priority lower than #1 to an A/B test, potential users for this A/B test may be directed to an audience with a higher priority instead, bypassing their participation in this A/B test. You can [adjust audience priority](change-audience-priority) in the placement itself.
5. After you've chosen the audience and placement for the A/B test, click the **Run** button to launch it. 

After launching, you can then track its progress and view metrics on the [A/B test metrics](results-and-metrics) page. This will help you identify the better-performing variation and make informed decisions to enhance your app's performance. For more details on Adapty A/B test metrics, refer to [Maths behind the A/B tests](maths-behind-it) section.

### How to stop the A/B test

When you choose to stop an A/B test, it means you have finished observing and analyzing the data. This step is essential for evaluating the test accurately and making informed decisions for future strategies. Stopping an A/B test is a crucial part of the testing process to optimize your outcomes effectively.

There are two options available to stop an A/B test: you can do so either from the **A/B tests** list page or the placement detail page. Regardless of whether you are on the A/B test list page or the placement detail page, both paths lead to the same flow.


<Zoom>
  <img src={require('./img/5906809-CleanShot_2023-07-19_at_18.03.482x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. Open the **A/B tests** section from the Adapty main menu and locate the A/B test you want to stop. Only tests that are currently running can be stopped.
2. Click on the **Stop** button next to the A/B test.
3. In the opened **Stop the A/B test** window, choose how to finish the A/B test. You have two options:

- Select a winner paywall from the list of tested paywalls.  
  Based on the included paywall metrics such as revenue, probability to be best (abbreviated as **P2BB**), and revenue per 1K users, you can choose the winning paywall from the list of tested paywalls. By selecting this option, after stopping the A/B test for the selected placement and audience, the winning paywall will be displayed in the app. This allows you to optimize your app's performance by showcasing the most effective paywall to your users.
- Choose to stop the A/B test without selecting a winner paywall.  
  For this, select the **Don't show a specific paywall for the audience** radio-button. In this case, for the selected placement and audience, no paywalls from that A/B test will be displayed in the app. This option is useful if you want to pause the display of any paywalls for that specific combination of placement and audience.

4. Click the **Stop and complete this A/B test** button.

Once the A/B test is stopped, it will no longer be active, and the paywalls will no longer be displayed to users. However, you can still access the A/B test results and metrics on the A/B test metrics page to analyze the data collected during the test.

:::note
Stopping an A/B test is irreversible, and the test cannot be restarted once it has been stopped. Ensure that you have gathered sufficient data and insights before making the decision to stop an A/B test.
:::