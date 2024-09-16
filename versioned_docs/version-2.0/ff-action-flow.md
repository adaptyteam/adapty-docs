---
title: "Step 1. Create flow to show paywall data"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


Here’s the improved version:

After adding the Adapty Plugin as a dependency to your FlutterFlow project, it's time to build the flow that retrieves Adapty paywall data and displays it on the paywall you've designed in FlutterFlow.

We first need to receive the paywall data from Adapty. We'll start by requesting the Adapty paywall, then its associated products, and finally checking if the data was successfully received. If successful, we’ll display the product title and price on the paywall page. Otherwise, we'll show an error message.

Let's get started!

## Step 1.1. Request Adapty paywall
As mentioned, to display data in your FlutterFlow paywall, we first need to retrieve it from Adapty. The initial step is to get the Adapty paywall itself. Here’s how:

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

6. In the **Set Actions Arguments** section, enter the real ID of the [placement you have created](create-placement) in the Adapty Dashboard that includes the paywall. In this example it's `example_ab_test`. Be sure to use your real placement ID!

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

7. In the **Action Output Variable Name**, create a new variable and name it `getPaywallResult`. We'll use this in the next step to reference the Adapty paywall and request its products.


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

Great! We’ve retrieved the Adapty paywall. Now, let's get the products associated with this paywall:

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

2. In the **Set Actions Arguments** section, choose `getPaywallResult` variable created earlier.

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

3. Fill in the other fields as follows:

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
5. In the **Action Output Variable Name**, create a new variable and name it `getPaywallProductsResult`. We'll use this to map the paywall you designed in FlutterFlow with the Adapty paywall data.

## Step 1.3. Add check if the paywall uploaded successfully

Before moving on, let’s verify that the Adapty paywall was received successfully. If so, we can update the paywall with the product data. If not, we’ll handle the error. Here's how to add the check:

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

3. To verify that the Adapty paywall was received, check for the presence of a field with a value. In the **Available Options** list, choose **Has Field**.

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
6. Click the **Confirm** button to finalize the condition. 

## Step 1.4. Log the paywall review

To ensure Adapty analytics track the paywall view, we need to log this event. Without this step, the view won’t be counted in the analytics. Here’s how:

1. Click the **plus (+)** button under the **TRUE** label and click **Add Action**.
2. In the **Select Action** field, search for and choose **logShowPaywall **.
3. Click the **Value** field in the **Set Action Arguments** area and choose the `getPaywallResult` variable we've created. This variable contains the paywall data.
4. Fill in the fields as follows:

  | Parameter | Value |
  |--------------------------|----------|
  | Available Options| Data Structured Field |
  | Select Field| value |

5. Click the **Confirm** button.

## Step 1.5. Show error if paywall not received

If the Adapty paywall is not received, you need to [handle the error](error-handling-on-flutter-react-native-unity#system-storekit-codes). In this example, we'll simply display an alert message.

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
2. In the **Title** field, add text you want to see as the dialog title. In this example, it's **Error**.
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

 4. Fill in the fields as follows:

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
6. Add a **Terminate action** to the  **FALSE** flow.
7. Click the **Close** button in the top-right corner.
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

  Congratulations! You’ve successfully received the product data. Now, let’s [map it to your paywall you've designed in FlutterFlow](ff-add-variables-to-paywalls).
