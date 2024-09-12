---
title: "Fetch paywall data in FlutterFlow"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


Now that you’ve prepared everything to load the paywall, it’s time to load paywall products.

## Step1. Create a new page for a paywall

1. In the **Page Selector**, click the **Add Page, Component, or Flow** button.

<Zoom>
  <img src={require('./FF_img/new-page.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Start with a blank page.
3. Name the page in the **New page** window. We will name it `paywallPage`.
4. Click the **Create page** button.


## Step 2. Add a parameter for a paywall

1. Open the **Page Parameters** pane on the right.

<Zoom>
  <img src={require('./FF_img/page-parameters.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the pane, click the **Add Parameter** button.

<Zoom>
  <img src={require('./FF_img/add-parameter.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Name the parameter in the **Parameter Name** field. We will name it `paywall`.

<Zoom>
  <img src={require('./FF_img/parameter-name.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. In the **Type** list, choose **Data Type**.

<Zoom>
  <img src={require('./FF_img/type-data-type.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. In the second **Type** list, choose `AdaptyPaywall`.


<Zoom>
  <img src={require('./FF_img/adaptyPaywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Click the **Confirm** button.

<Zoom>
  <img src={require('./FF_img/parameter-confirm.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
You've now added a parameter for an Adapty paywall. 


## Step 3. Create product list variable

Now we’ll create a variable to hold the products fetched with the paywall.

1. Switch to the **State Management** section in the right page.

<Zoom>
  <img src={require('./FF_img/paywall-state-management.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Click the **Add field** button.

<Zoom>
  <img src={require('./FF_img/paywall-add-field.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Name the variable in the **Field Name** field. We'll name it `products`.

<Zoom>
  <img src={require('./FF_img/paywall-products.png').default}
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
  <img src={require('./FF_img/products-data-type.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. Select the **Is List** check-box.

<Zoom>
  <img src={require('./FF_img/products-is-list.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. In the second **Type** list, choose `AdaptyPaywallProduct`.

<Zoom>
  <img src={require('./FF_img/AdaptyPaywallProduct.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Click the **Confirm** button to save the changes.

<Zoom>
  <img src={require('./FF_img/paywall-confirm.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Congratulations! You've set up the parameters and variables required to fetch paywall products. Let's now build an action block to fetch those products, similar to what we did when fetching the paywall.

## Step 4. Create action block to fetch paywall products

You’re already familiar with action blocks. Let’s create one to fetch paywall products.

1. On the right, switch to the **Actions** section.

<Zoom>
  <img src={require('./FF_img/products-actions.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Open the Action Flow Editor.

<Zoom>
  <img src={require('./FF_img/products-open-editor.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the **Select Action Trigger** window, click the **Action Blocks** button in the header.

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

4. In the opened **Action Blocks** window, toggle **Page**. 

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

5. Click the **Create** button.

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

6. In the **Action Block Name** window, enter a name like **getPaywallActionBlock**. 

<Zoom>
  <img src={require('./FF_img/getProductActionBlock.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Click the **Create** button.

<Zoom>
  <img src={require('./FF_img/getProductActionBlock-create.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


8. The **Action Flow Editor** will open. Configuring this action block to fetch products is similar to how we fetched the paywall. Start with the **Add Action** button.


<Zoom>
  <img src={require('./FF_img/add-action-products.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

9. In the new window, expand the **Custom Actions** section on the right.

<Zoom>
  <img src={require('./FF_img/custom_actions-products.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

10. Expand the **Adapty FF Plugin** section.

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

11. In the expanded **Adapty FF Plugin** section, choose **getPaywall**. Yes, we know, you'd prefer to get products all at once, but we need to go step by step: first, retrieve the paywall using the placement ID, and only then fetch the products. So, select **getPaywall**.

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

12. In the **Value** field in the **Set Actions Arguments** section, enter the ID of the placement that includes the paywall you want to display. In this example, the placement ID is `onboarding_placement`.

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

13. After requesting the paywall, you’ll need to capture its ID as a result. In the **Action Output Variable Name** field, type `paywallResult`  (or any name that's meaningful to you).

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

14. With all the setup complete, you’re ready to build the action flow. 

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

2. We are going to process both ways: when the paywall is successfully received and when something went wrong and the paywall is not received. That is why we are going to add a condition - success of the paywall receiving. Choose **Add Conditional**.

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


3. In the **Action Output** section, find and click the action output variable we've created in step 9. In our examople, its `paywallResult`.

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

4. Th easiest way to check that the Adapty paywall is successfully received is to check if it has a field with a value. Let;s do that. In the **Available Options** list, choose **Has Field**.

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

6. We've finished setting up the condition, click the **Confirm** button. 

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


