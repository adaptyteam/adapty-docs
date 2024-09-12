---
title: "Fetch Adapty paywall in FlutterFlow"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

We assume you'll design the paywall UI yourself using FlutterFlow's rich features. In parallel, you'll need to [create the same paywall](create-paywall) iin the Adapty Dashboard. You don't need to design the UI in Adapty, but be sure to add the products—subscriptions or non-subscriptions—that you want to sell on the paywall. Ensure that the paywall you design in FlutterFlow matches the number of products in the Adapty paywall.

Once you've created a paywall in the Adapty Dashboard, please [create a placement](create-placement) and [add your paywall](add-audience-paywall-ab-test) to it. Adapty's placement system allows you to experiment with different paywalls, swapping one out for another over time without needing to release a new app version.

The only thing you need to hardcode in your mobile app is the placement ID. This means you hardcode the placement ID, and through it, you get the set of products configured for the specific paywall added to this placement.

Before proceeding, make sure you've done the following in the Adapty Dashboard::

1. [Created at least one paywall and added at least one product to it](create-paywall).
2. [Created at last one placement](create-placement) and [added your paywall to it](add-audience-paywall-ab-test).

After completing these steps, you'll be able to call your paywall in your FlutterFlow app.

## Step 1. Create page state variable

When setting up a paywall in your mobile app, you'll need a place to track the paywall data while the user is on that page. This is where a page state variable comes in. Think of it as a temporary storage box for paywall data specific to a single screen in your app.

### Why Do You Need One?
The page state variable serves several key functions:

- **Stores Your Paywall**: It holds the paywall element when it’s received.
- **Handles Errors**: If something goes wrong while fetching the paywall, this variable helps catch and handle the error.
- **Updates the Screen**: Once the paywall data is received, the screen can update with the list of products.

### How to create a page state variable

1. On the page that is shown before the page with the paywall, click the **State Manageemnt** button in the right pane.

<Zoom>
  <img src={require('./FF_img/create_page_state_variable.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the **Local Page State Variables** pane that opens, click the **Add field** button.

<Zoom>
  <img src={require('./FF_img/add_field.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the **Field name** field, enter a clear name for your variable, like `paywall.

<Zoom>
  <img src={require('./FF_img/field_name.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
4. In the **Type** list, choose **Data Type**.

<Zoom>
  <img src={require('./FF_img/variable_type.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. In the second **Type** field, choose **AdaptyPaywall**. 

<Zoom>
  <img src={require('./FF_img/adapty_paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. Click the **Confirm** button.

You’ve now created a page state variable for the paywall. Next, we'll define how this paywall can be managed and how it should behave. 

## Step 2. Create Action Block

While you can add actions separately to a page, it’s more convenient to create an action block for the paywall that defines how to retrieve it, process it, and handle any errors. You can then easily recall this action block whenever you need to re-fetch the paywall, such as in case of a connection failure. We’ll first prepare this action block and later use it in our app flow in Step 3.

### Step 2.1. Open FlutterFlow Action Flow Editor

1. In the right pane, click the **Actions** button.

<Zoom>
  <img src={require('./FF_img/actions.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. n the opened pane, click **Open** button next to the **Action Flow Editor**.

<Zoom>
  <img src={require('./FF_img/action_flow_editor.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


### Step 2.2. Start action block

1. To create a full flow, open the **Select Action Trigger** window and click the **Action Blocks** button in the header.

<Zoom>
  <img src={require('./FF_img/action-blocks.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the **Action Blocks** window, toggle the **Page** toggle. 

<Zoom>
  <img src={require('./FF_img/action-blocks-page.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Then click the **Create** button.

<Zoom>
  <img src={require('./FF_img/action-blocks-create.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


3. Name your action block in the **Action Block Name** window. Use a name that makes sense to you; in this example, we’ll use `getPaywallActionBlock. 

<Zoom>
  <img src={require('./FF_img/getPaywallActionBlock.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Click the **Create** button.

5. The **Action Flow Editor** will open and be ready to use. We’ll start by adding the paywall to the placement in Adapty. To do this, create an action by clicking the **Add Action** button.


<Zoom>
  <img src={require('./FF_img/add_action.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. In the new window, expand the **Custom Actions** section on the right pane.

<Zoom>
  <img src={require('./FF_img/custom_actions.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Expand the **Adapty FF Plugin** section.

<Zoom>
  <img src={require('./FF_img/expand_adapty_ff_plugin.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

8. Choose `getPaywall` from the **Adapty FF Plugin** section. Although it might seem better to get products directly, we need to first fetch the paywall using the placement ID and then get the products from it. So, select  `getPaywall`.

<Zoom>
  <img src={require('./FF_img/get-paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

9. In the **Set Actions Arguments** section, enter the placement ID where you added the paywall in the **Value** field. In our example, the placement ID is `onboarding_placement`.

<Zoom>
  <img src={require('./FF_img/placement_id.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

10. Set up the output of the paywall request by entering `paywallResult` (or a name of your choice) in the **Action Output Variable Name** field.

<Zoom>
  <img src={require('./FF_img/paywallResult.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

11. Now that the setup is complete, we can draw our action flow. 

### Step 2.3. Add condition to process successful Adapty paywal load and its failure

1. Click the **plus (+)** button below the **Custom Action** block.

<Zoom>
  <img src={require('./FF_img/plus-button.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Since we need to handle both successful and failed paywall requests, add a condition by selecting **Add Conditional**.

<Zoom>
  <img src={require('./FF_img/add-conditional.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


3. In the **Action Output** section, select the action output variable created earlier (`paywallResult` in our example).

<Zoom>
  <img src={require('./FF_img/action-output-paywallResult.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. To verify the Adapty paywall was received successfully, check for the presence of a field with a value. In the **Available Options** list, choose **Has Field**.

<Zoom>
  <img src={require('./FF_img/has-field.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. In the **Field (AdaptyGetPaywallResult)** list, choose **value**.

<Zoom>
  <img src={require('./FF_img/value.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. Click the **Confirm** button to finish setting up the condition. 

<Zoom>
  <img src={require('./FF_img/confirm.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Step 2.4. Process successful paywall receving case

1. Set up the action for when the paywall is successfully received by clicking the **plus (+)** button below the **TRUE** label.

<Zoom>
  <img src={require('./FF_img/true.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Select **Add Action** from the list.

<Zoom>
  <img src={require('./FF_img/add-action.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the right pane, select **Update Page State** from the **State Management** section or use the search.
<Zoom>
  <img src={require('./FF_img/update-page-state.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Define what should be updated on the page by clicking the **Add field** button.

<Zoom>
  <img src={require('./FF_img/update-page-state-add-field.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. In the **Search for field** window, click **paywall**. 
<Zoom>
  <img src={require('./FF_img/field-paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. Set the update type by choosing **Set Value** in the **Select Update Type** list.

<Zoom>
  <img src={require('./FF_img/set-value.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Click the `UNSET` value in the **Value** to Set field. In the **Set Variable** window, select the action output variable set in step 9 (`paywallResult).

<Zoom>
  <img src={require('./FF_img/page-reload-action-output.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

8. In the **Available Options** field, choose **Data Structure Field**.
<Zoom>
  <img src={require('./FF_img/data-structure-field.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

9. And finally, in the **Select Field** list, choose **value**.

<Zoom>
  <img src={require('./FF_img/data-structure-field-value.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

10. Click the **Confirm** button to complete the setup.
<Zoom>
  <img src={require('./FF_img/set-variable-confirm.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Step 2.5. Handle failed paywall retrieval

Configure what should happen if the paywall is not successfully received. For a complete list of error codes and how to handle them, refer to our [AdaptyErrorCode class](https://pub.dev/documentation/adapty_flutter/latest/adapty_flutter/AdaptyErrorCode-class.html) section.


<Zoom>
  <img src={require('./FF_img/false.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Once you've completed this step, close the FlutterFlow Action Flow Editor by clicking the **Close** button at the top-right corner of the **Action Flow Editor** window.

<Zoom>
  <img src={require('./FF_img/close-editor.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 3. Fetch paywall on page load

Now that we've set up the action block for handling the paywall or any failure to retrieve it, let's incorporate it into our application flow. 

1. In the main window of your project, navigate to the page where the paywall should open, then click the **Add Action** button in the right pane. 

<Zoom>
  <img src={require('./FF_img/fetch_paywall_add_action.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

::: info
- If you're still in the Action Flow Editor, close it by clicking the **Close** button in the top-right corner, as shown in Step 2.5.
- If you're in the main window and can't see the button, make sure you're in the **Page** widget in the left pane, and have opened the **Actions** pane in the right.
:::


<Zoom>
  <img src={require('./FF_img/make-sure.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the **Select Action** section on the right, choose the **On Page Load** option. You may need to scroll down to find it.

<Zoom>
  <img src={require('./FF_img/on-page-load.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Next, in the **Page Action Blocks** section, select the block you created in Step 2. In this case, it's`getPaywallActionBlock`.

<Zoom>
  <img src={require('./FF_img/page-action-blocks.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Enable the **Update Page After** toggle to display the paywall once it's retrieved.

<Zoom>
  <img src={require('./FF_img/update-page-after.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Once you're done with this page, switch to the paywall page.