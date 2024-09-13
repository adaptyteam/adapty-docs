---
title: "Step 4. Enable purchase"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Congratulations! You have added logic to receive paywall product and show its title and price in the paywall page.

Now let's do the last but not the least - let the user buy your product:

## Step 4.1. Make the purchase

1. Double-click the buy button in your paywall page.
<Zoom>
  <img src={require('./FF_img/double-click-buy.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Open the **Actions** section in the right pane if it's not open.

<Zoom>
  <img src={require('./FF_img/actions-makepurchase.png').default}
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
  <img src={require('./FF_img/new-editor.png').default}
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
  <img src={require('./FF_img/make-purchase.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. In the **Set Actions Arguments** section, choose `getPaywallProductsResult` variable.
8. Fill in other fields as listed below. 

	  | Parameter | Value |
	  |--------------------------|----------|
	  | Available Options| Data Structure Field |
	  | Select Field | value |
	  | Available Options | Item is Index |
	  | List Index Options | First |

9. Click the **Confirm** button.
10. In the **Action Output Variable Name**, type the name of a new variable. We'll call it `makePurchaseResult`. We will use it later to make sure the purchase is successful.

<Zoom>
  <img src={require('./FF_img/makePurchaseResult.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 4.2. Add check if the purchase is successful

Now let's check if the purchase was successful, you need to check . 

1. Click the **plus (+)** button and click **Add Conditional**.
2. In the **Set Condition for Action** section, select `makePurchaseResult` variable.
3. In the **Set Variable** window, fill in the fields as listed below:

	  | Parameter | Value |
	  |--------------------------|----------|
	  | Available Options| Has Field |
	  | Select Field | profile |

<Zoom>
  <img src={require('./FF_img/check-makePurchaseResult.png').default}
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

If the purchase is successful, you can open the paid content. Let's set it up.

1. Click the **plus (+)** button under the **TRUE** label and click **Add Action**.
2. In the **Select Action** field, search for and choose the page you want to open in the **Navigate To** list. In our example, the page is called **YogaClessSession**.

<Zoom>
  <img src={require('./FF_img/open-paid-content.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


## Step 4.4 Show error message id the purchase failed

Let's show some alert if the purchase failed.

1. Add an **Informational Dialog** action to the **FALSE** label.
2. In the **Title** field, add text you want to see as the dialog title, for example, **Purchase Failed**.
 <Zoom>
    <img src={require('./FF_img/makePurchase-informational.png').default}
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
    <img src={require('./FF_img/makePurchase-error.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

4. Fill in the fields as listed below:

	  | Parameter | Value |
	  |--------------------------|----------|
	  | Set Variable| `makePurchaseResult` variable we've created  |
	  | Available Options| Data Structure Field |
	  | Select Field | error |
	  | Available Options| Data Structure Field |
	  | Select Field | errorMessage |

5. Click the **Confirm** button.
6. Add **Terminate action** to the  **FALSE** flow.

  <Zoom>
    <img src={require('./FF_img/makePurchaseFinal.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

7. Click the **Close** button in the top-right.
