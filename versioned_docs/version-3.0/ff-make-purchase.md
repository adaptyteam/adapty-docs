---
title: "Step 4. Enable purchase"
description: "Feature Flags: Making Purchases | Adapty Docs"
metadataTitle: "Learn how to make purchases using Adapty’s Feature Flags system."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Congratulations! You've successfully [set up your paywall to display product data from Adapty](ff-add-variables-to-paywalls), including the product title and price.

Now, let's move on to the final step – letting users make a purchase through the paywall.

## Step 4.1. Enable users make your purchase

1. Double-click the buy button on your paywall page.
<Zoom>
  <img src={require('./FF_img/double-click-buy.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the right panel, open the **Actions** section if it's not already open.

<Zoom>
  <img src={require('./FF_img/actions-makepurchase.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Open the **Action Flow Editor**.

<Zoom>
  <img src={require('./FF_img/new-editor.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. In the **Select Action Trigger** window, choose **On Tap**.
5. In the **No Actions Created** window, click the **Add Action** button.
6. In the **Actions Flow Editor** window, search for `makePurchase` custom action and choose it.

<Zoom>
  <img src={require('./FF_img/make-purchase.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. In the **Set Actions Arguments** section, choose `getPaywallProductsResult` variable created earlier.
8. Fill in the fields as follows:

	  | Parameter | Value |
	  |--------------------------|----------|
	  | Available Options| Data Structure Field |
	  | Select Field | value |
	  | Available Options | Item is Index |
	  | List Index Options | First |

9. Click the **Confirm** button.
10. In the **Action Output Variable Name**, create a new variable and name it `makePurchaseResult` - this will be used later to confirm the purchase was successful.

<Zoom>
  <img src={require('./FF_img/makePurchaseResult.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 4.2. Check if the purchase was successful

Now, let's set up a check to see if the purchase went through. 

1. Click the **plus (+)** button and click **Add Conditional**.
2. In the **Set Condition for Action** section, select the `makePurchaseResult` variable.
3. In the **Set Variable** window, fill in the fields as follows:

	  | Parameter | Value |
	  |--------------------------|----------|
	  | Available Options| Has Field |
	  | Select Field | profile |

<Zoom>
  <img src={require('./FF_img/check-makePurchaseResult.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Click the **Confirm** button.

## Step 4.3. Open paid content

If the purchase is successful, you can unlock the paid content. Here’s how to set that up:

1. Click the **plus (+)** button under the **TRUE** label and click **Add Action**.
2. In the **Select Action** field, search for and select the page you want to open from the **Navigate To** list. In this example, the page is **YogaClessSession**.

<Zoom>
  <img src={require('./FF_img/open-paid-content.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


## Step 4.4 Show error message if purchase failed

If the purchase fails, let's display an alert to the user.

1. Add an **Informational Dialog** action to the **FALSE** label.
2. In the **Title** field, enter the text you want for the dialog title, such as **Purchase Failed**.
 <Zoom>
    <img src={require('./FF_img/makePurchase-informational.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Click at the **Value** button of the **Message** box.

  <Zoom>
    <img src={require('./FF_img/makePurchase-error.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

4. Fill in the fields as follows:

	  | Parameter | Value |
	  |--------------------------|----------|
	  | Set Variable| `makePurchaseResult` variable we've created  |
	  | Available Options| Data Structure Field |
	  | Select Field | error |
	  | Available Options| Data Structure Field |
	  | Select Field | errorMessage |

5. Click the **Confirm** button.
6. Add a **Terminate action** to the  **FALSE** flow.

  <Zoom>
    <img src={require('./FF_img/makePurchaseFinal.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

7. Finally, click the **Close** button in the top-right corner.

Congratulations! Your users can now purchase your products. As an extra step, let's [set up a check for user access to paid content](ff-check-subscription-status) elsewhere to decide whether to display paid content or the paywall to them.
