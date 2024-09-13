---
title: "Step 1. Create variables"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Once you designed your paywall in FlutterFlow, it's time to alive it with Adapty magic. In this section, we will load the paywall, show it's products and product prices in the page. Strap yourself in!


In order to show data, we will need the following variables linked to Adapty:

- **paywall**: This variable will receive the paywall ID from Adapty. It will be linked to `AdaptyPaywall`.
- **product**: This variable will receive paywall product from Adapty. It will be linked to `AdaptyPaywallProduct'.
- **price**: This variable will receive the product price from Adapty. It will be linked to `AdaptyPrice`.
- **getPaywallProductsResult**: This variable will receive data on products, like product name and price. It will be linked to `AdaptyGetProductResult`. 
- **getPaywallResult**: This variable will receive data on products. It will be linked to `AdaptyGetPaywallResult`. AdaptyGetProductResult

## Step 1.1. Create paywall variable

1. While being in the paywall page, , click the **State Management** button in the right pane.

<Zoom>
  <img src={require('./FF_img/new-variable.png').default}
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
  <img src={require('./FF_img/new-add-field.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. In the **Field name** field, enter a clear name for your variable,  we will call it `paywall`.

<Zoom>
  <img src={require('./FF_img/new-paywall.png').default}
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
  <img src={require('./FF_img/new-datatype.png').default}
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
  <img src={require('./FF_img/new-adapty-paywall.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

6. Click the **Confirm** button.

## Step 1.2. Create product variable

Repeat steps from Step 1.1 for product variable:
1. Call it `product`. 
2. Select **Is List** checkbox.
3. Choose **AdaptyPaywallProduct** as type:

<Zoom>
  <img src={require('./FF_img/new-product.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 1.3. Create product price variable

Repeat steps from Step 1.1 for product variable:
1. Call it `price`. 
2. Choose **AdaptyPrice** as type:

<Zoom>
  <img src={require('./FF_img/new-price.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 1.4. Create product result variable

Repeat steps from Step 1.1 for product variable:
1. Call it `getPaywallProductResult`. 
2. Choose **AdaptyGetProductResult** as type:

<Zoom>
  <img src={require('./FF_img/getPaywallProductResult.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Step 1.5. Create paywall result variable

Repeat steps from Step 1.1 for paywall variable:
1. Call it `getPaywallResult`. 
2. Choose **AdaptyGetPaywallResult** as type:

<Zoom>
  <img src={require('./FF_img/AdaptyGetPaywallResult.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Click the **Confirm** button.



