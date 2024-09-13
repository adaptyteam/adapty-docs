---
title: "Step 1. Create flow to show paywall data"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Once you created all variables and linked them to the paywall page, let's move on to showing the paywall data in the beautiful paywall you have designed in FlutterFlow.

In order to show data in your paywall, we will need to:

1. Request Adapty paywall.
2. Request Adapty paywall products.
3. Check if the data is successfully received.
4. If yes, show the product title and price in our paywall page.
5. If not, show an error message.

## Step 1.1. Request Adapty paywall


1. Open the **Actions** section in the right pane.

  <Zoom>
    <img src={require('./FF_img/switch-to-actions.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

2. Open the **Action Flow Editor**.

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

3. In the **Select Action Trigger** window, choose **On Page Load**.
  <Zoom>
    <img src={require('./FF_img/new-on-page-load.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

4. In the **No Actions Created** window, click the **Add Action** button.

  <Zoom>
    <img src={require('./FF_img/new-add-action.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

5. In the **Actions Flow Editor** window, search for `getPaywall` custom action and choose it.

  <Zoom>
    <img src={require('./FF_img/new-get-paywall.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

6. In the **Set Actions Arguments** section, enter the real ID of the [placement you have created](create-placement) in the Adapty Dashboard to which the desired paywall is added. In our example it's `example_ab_test`. Please use your real placement ID!

  <Zoom>
    <img src={require('./FF_img/placement-id.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

7. In the **Action Output Variable Name**, type the name of a new variable. We'll call it `getPaywallResult`.


  <Zoom>
    <img src={require('./FF_img/new-getpaywallresult-output.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

## Step 1.2. Request Adapty paywall products

1. Click the **plus (+)** button below, click the **Add Action** button to add an action to receive Adapty paywall products. For this, search and choose `getPaywallProducts`.

  <Zoom>
    <img src={require('./FF_img/new-getpaywallproducts.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

2. In the **Set Actions Arguments** section, choose `getPaywallResult` variable we've created.

  <Zoom>
    <img src={require('./FF_img/action-getPaywallResult.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Fill in other fields as listed below:

  | Parameter | Value |
  |--------------------------|----------|
  | Available Options| Data Structured Field |
  | Select Field| value |

  <Zoom>
    <img src={require('./FF_img/getPaywall_result-fields.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

4. Click the **Confirm** button.
5. In the **Action Output Variable Name**, type the name of a new variable. We'll call it `getPaywallProductsResult`.

That is the moment when the paywall page will update and show actual product name and price.

## Step 1.3. Add check if the paywall uploaded successfully

1. Click the **plus (+)** button and click **Add Conditional**.

  <Zoom>
    <img src={require('./FF_img/new-add-conditional.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

2. In the **Action Output** section, select the action output variable created earlier (`getPaywallResult` in our example).

  <Zoom>
    <img src={require('./FF_img/condition-getPaywallResult.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. To verify the Adapty paywall was received successfully, check for the presence of a field with a value. In the **Available Options** list, choose **Has Field**.

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

4. In the **Field (AdaptyGetPaywallResult)** list, choose **value**.
6. Click the **Confirm** button to finish setting up the condition. 

## Step 1.4. Log the paywall review

For Adapty analytics to learn that a user has seen a paywall, it's necessary to log this paywall showing. Without this step, Adapty analytics will not count the paywall. So let's do it:

1. Click the **plus (+)** button under the **TRUE** label and click **Add Action**.
2. In the **Select Action** field, search for and choose **logShowPaywall **.
3. Click the **Value** field in the **Set Action Arguments** area and choose the `getPaywallResult` variable we've created. As you remember, this variable contains data on paywall.
4. Fill in the fields as listed below:

  | Parameter | Value |
  |--------------------------|----------|
  | Available Options| Data Structured Field |
  | Select Field| value |

5. Click the **Confirm** button.

## Step 1.5. Show error if paywall not received

Let's show some alert if the paywall products are not received.

1. Add an **Informational Dialog** action to the **FALSE** label.
  <Zoom>
    <img src={require('./FF_img/informational-dialog.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>
2. In the **Title** field, add text you want to see as the dialog title. In our example, it's **Error**.
3. Click at the **Value** button of the **Message** box.

  <Zoom>
    <img src={require('./FF_img/value-parameters.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

 4. Fill in the fields as listed below:

  <Zoom>
    <img src={require('./FF_img/error.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

  | Parameter | Value |
  |--------------------------|----------|
  | Set Variable| `getPaywallProductResult` variable we've created  |
  | Available Options| Data Structure Field |
  | Select Field | error |
  | Available Options| Data Structure Field |
  | Select Field | errorMessage |

5. Click the **Confirm** button.
6. Add **Terminate action** to the  **FALSE** flow.
7. Click the **Close** button in the top-right.
  <Zoom>
    <img src={require('./FF_img/close.png').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>
