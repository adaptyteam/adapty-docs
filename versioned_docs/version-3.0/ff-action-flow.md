---
title: "Step 1. Create flow to show paywall data"
description: "Set up feature flag action flows in Adapty to personalize user subscription journeys."
metadataTitle: "Feature Flags Action Flow | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::important
When using the FlutterFlow plugin, you can't use paywalls created in the Adapty Paywall builder. You must implement your own paywall page in FlutterFlow and connect it to Adapty.
:::

After adding the Adapty library as a dependency to your FlutterFlow project, it's time to build the flow that **retrieves Adapty paywall and product data and displays it on the paywall you've designed in FlutterFlow**.

We first need to receive the paywall data from Adapty. We'll start by requesting the Adapty paywall, then its associated products, and finally checking if the data was successfully received. If successful, we’ll display the product title and price on the paywall page. Otherwise, we'll show an error message.

Before proceeding, make sure you've done the following:

1. [Created at least one paywall and added at least one product to it](create-paywall) in the Adapty Dashboard.
2. [Created at last one placement](create-placement) and [added your paywall to it](add-audience-paywall-ab-test) in the Adapty Dashboard.

Let's get started!

## Step 1.1. Request Adapty paywall
As mentioned, to display data in your FlutterFlow paywall, we first need to retrieve it from Adapty. The initial step is to get the Adapty paywall itself. Here’s how:

1. Open your paywall screen and switch to the **Actions** section in the right pane. There, open the **Action Flow Editor**.

  <Zoom>
    <img src={require('./img/ff_action_flow.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

2. In the **Select Action Trigger** window, select **On Page Load**.
  <Zoom>
    <img src={require('./img/ff_action_trigger.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Click **Add Action**. Then, search for the `getPaywall` custom action and select it.

  <Zoom>
    <img src={require('./img/ff_getpaywall.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

4. In the **Set Actions Arguments** section, enter the real ID of the [placement you have created](create-placement) in the Adapty Dashboard that includes the paywall. In this example it's `monthly`. Be sure to use your real placement ID!

  <Zoom>
    <img src={require('./img/ff_placementid.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

5. If you have [localized](localizations-and-locale-codes.md) your paywall in the Adapty dashboard, you can also set up the **locale** argument.

6. In the **Action Output Variable Name**, create a new variable and name it `getPaywallResult`. We'll use this in the next step to reference the Adapty paywall and request its products.


  <Zoom>
    <img src={require('./img/ff_getpaywallresult.webp').default}
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

1. Click **+** under the created action and select **Add Action**. This action will receive Adapty paywall products. For this, search and select `getPaywallProducts`.

2. In the **Set Actions Arguments** section, select the `getPaywallResult` variable created earlier.

  <Zoom>
    <img src={require('./img/ff_getpaywallproduct.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Fill in the other fields as follows:
  - **Available Options**: Data Structured Field
  - **Select Field**: value
  - **Available Options**: No further changes


  <Zoom>
    <img src={require('./img/ff_getpaywallresult2.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

4. Click **Confirm**.
5. In the **Action Output Variable Name**, create a new variable and name it `getPaywallProductsResult`. We'll use this to map the paywall you designed in FlutterFlow with the Adapty paywall data.

  <Zoom>
    <img src={require('./img/ff_getpaywallproductsresult.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

## Step 1.3. Add check if the paywall uploaded successfully

Before moving on, let’s verify that the Adapty paywall was received successfully. If so, we can update the paywall with the product data. If not, we’ll handle the error. Here's how to add the check:

1. Click **+** and click **Add Conditional**.

  <Zoom>
    <img src={require('./img/ff-add-conditional.webp').default}
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
    <img src={require('./img/ff-getpaywallresult.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. To verify that the Adapty paywall was received, check for the presence of a field with a value. Fill in the fields as follows:
 - **Available Options**: Has Field
 - **Field (AdaptyGetPaywallResult)**: value

4. Click **Confirm** to finalize the condition. 

## Step 1.4. Log the paywall review

To ensure Adapty analytics track the paywall view, we need to log this event. Without this step, the view won’t be counted in the analytics. Here’s how:

1. Click **+** under the **TRUE** label and click **Add Action**.
2. In the **Select Action** field, search for and choose **logShowPaywall**.

  <Zoom>
    <img src={require('./img/ff-logshowpaywall.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Click **Value** in the **Set Action Arguments** area and choose the `getPaywallResult` variable we've created. This variable contains the paywall data.
4. Fill in the fields as follows:
  - **Available Options**: Data Structured Field
  - **Select Field**: value

5. Click **Confirm**.

  <Zoom>
    <img src={require('./img/ff-lohsgowpaywallresult.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

## Step 1.5. Show error if paywall not received

If the Adapty paywall is not received, you need to [handle the error](error-handling-on-flutter-react-native-unity#system-storekit-codes). In this example, we'll simply display an alert message.

1. Add an **Informational Dialog** action to the **FALSE** label.
2. In the **Title** field, add text you want to see as the dialog title. In this example, it's **Error**.
3. Click **Value** in the **Message** box.

4. Fill in the fields as follows:
  - **Set Variable**: `getPaywallProductResult` variable we've created
  - **Available Options**: Data Structure Field
  - **Select Field**: error
  - **Available Options**: Data Structure Field
  - **Select Field**: errorMessage

  <Zoom>
    <img src={require('./img/ff-error.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

5. Click **Confirm**.
6. Add a **Terminate action** to the **FALSE** flow.

  <Zoom>
    <img src={require('./img/ff-terminate.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

7. Click **Close** in the top-right corner.

  Congratulations! You’ve successfully received the product data. Now, let’s [map it to your paywall you've designed in FlutterFlow](ff-add-variables-to-paywalls).
