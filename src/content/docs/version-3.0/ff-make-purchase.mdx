---
title: "Step 3. Enable purchase"
description: "Learn how to make purchases using Adapty’s Feature Flags system."
metadataTitle: "Feature Flags: Making Purchases | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Congratulations! You've successfully [set up your paywall to display product data from Adapty](ff-add-variables-to-paywalls), including the product title and price.

Now, let's move on to the final step – letting users make a purchase through the paywall.

## Step 3.1. Enable users to make purchases

1. Double-click the buy button on your paywall page. In the right panel, open the **Actions** section if it's not already open.

2. Open the **Action Flow Editor**.

<Zoom>
  <img src={require('./img/ff-action-flow-editor.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the **Select Action Trigger** window, choose **On Tap**.
4. In the **No Actions Created** window, click **Add Action**. Search for the `makePurchase` action and choose it.

<Zoom>
  <img src={require('./img/ff-makepurchase.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

5. In the **Set Actions Arguments** section, choose `getPaywallProductsResult` variable created earlier.
6. Fill in the fields as follows:
	- **Available Options**: Data Structure Field
    - **Select Field**: value
    - **Available Options**: Item at Index
    - **List Index Options**: First

<Zoom>
  <img src={require('./img/ff-makepurchase-value.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Click `subscriptionUpdateParameters`, search for `AdaptySubscriptionUpdateParameters` and select it. Click **Confirm**.
    :::info
    By default, you can leave all the object fields empty. You would need to fill them in to replace one subscription with another in Android apps. Read more [here](https://kotlin.adapty.io//////////adapty/com.adapty.models/-adapty-subscription-update-parameters/).
    :::
   <Zoom>
   <img src={require('./img/ff-subupdate.webp').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
8. Click **Confirm**. 
9. In the **Action Output Variable Name**, create a new variable and name it `makePurchaseResult` - this will be used later to confirm the purchase was successful.

<Zoom>
  <img src={require('./img/ff-makepurchaseresult.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 3.2. Check if the purchase was successful

Now, let's set up a check to see if the purchase went through. 

1. Click **+** and click **Add Conditional**.
2. In **Set Condition for Action**, select the `makePurchaseResult` variable.
3. In the **Set Variable** window, fill in the fields as follows:
    - **Available Options**: Has Field
    - **Select Field**: profile

<Zoom>
  <img src={require('./img/ff-makepurchaseresult-conditional.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Click **Confirm**.

## Step 3.3. Open paid content

If the purchase is successful, you can unlock the paid content. Here’s how to set that up:

1. Click **+** under the **TRUE** label and click **Add Action**.
2. In the **Define Action** field, search for and select the page you want to open from the **Navigate To** list. In this example, the page is **Questions**.

<Zoom>
  <img src={require('./img/ff-questions.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


## Step 3.4 Show error message if purchase failed

If the purchase fails, let's display an alert to the user.

1. Add an **Informational Dialog** action to the **FALSE** label.
2. In the **Title** field, enter the text you want for the dialog title, such as **Purchase Failed**.
 <Zoom>
    <img src={require('./img/ff-purchase-fail.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Click **Value** in the **Message** box. In the **Set from Variable** window, search for `makePurchaseResult` and choose it. Fill in the fields as follows:
    
   - **Available Options**: Data Structure Field
   - **Select Field**: error
   - **Available Options**: Data Structure Field
   - **Select Field**: errorMessage
      
   <Zoom>
      <img src={require('./img/ff-fail-message.webp').default}
      style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
      }}
      />
      </Zoom>

4. Click **Confirm**.
5. Add a **Terminate** action to the **FALSE** flow.

  <Zoom>
    <img src={require('./img/ff-terminate-purchase.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

6. Finally, click **Close** in the top-right corner.

Congratulations! Your users can now purchase your products. As an extra step, let's [set up a check for user access to paid content](ff-check-subscription-status) elsewhere to decide whether to display paid content or the paywall to them.
