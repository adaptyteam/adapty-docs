---
title: "Step 2. Add data to paywall page"
description: "Add Feature Flag variables to paywalls in Adapty."
metadataTitle: "Adding Feature Flag Variables to Paywalls | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Once you've [received all the necessary product data](ff-action-flow), it's time to map it to the beautiful paywall you designed in FlutterFlow. In this example, we'll map the product title and its price.

## Step 2.1. Add product title to paywall page

1. Double-click the product text on your paywall page. In the **Set from Variable** window, search for `getPaywallProductResult` variable and choose it.

  <Zoom>
    <img src={require('./img/ff-paywall-text.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

2. Fill in the fields as follows:
  - **Available Options**: Data Structured Field
  - **Select Field**: value
  - **Available Options**: Item at Index
  - **List Index Options**: First
  - **Available Options**: Data Structured Field
  - **Select Field**: localizedTitle
  - **Default Variable Value**: null
  - **UI Builder Display Value**: Anything, in the example, it's `product.title`

  <Zoom>
    <img src={require('./img/ff-product.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Click **Confirm** to save the changes.

## Step 2.2. Add price text to paywall page

Repeat the steps from Step 2.1 for the price text as shown below:

1. Double-click the price text on your paywall page. In the **Set from Variable** window, search for `getPaywallProductResult` variable and choose it.

<Zoom>
  <img src={require('./img/ff-price.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Fill in the fields as follows:

- **Available Options**: Data Structured Field
- **Select Field**: value
- **Available Options**: Item at Index
- **List Index Options**: First
- **Available Options**: Data Structured Field
- **Select Field**: price
- **Default Variable Value**: null
- **UI Builder Display Value**: Anything, in the example, it's `product.price`


3. Click the **Confirm** button to save the changes.

### Add price in local currency to paywall page

1. Double-click the price on your paywall page. In the **Set from Variable** window, search for `getPaywallProductResult` variable and choose it.

2. Fill in the fields as follows:

- **Available Options**: Data Structured Field
- **Select Field**: value
- **Available Options**: Item at Index
- **List Index Options**: First
- **Available Options**: Data Structured Field
- **Select Field**: price
- **Available Options**: Data Structured Field
- **Select Field**: amount
- **Available Options**: Decimal
- **Decimal Type**: Automatic
- **Default Variable Value**: null
- **UI Builder Display Value**: Anything, in the example, it's `price.amount`

3. Click **Confirm** to save the changes.

And voilà! Now, when you launch your app, it will display the product data from the Adapty paywall directly on your paywall page!
It's time to [let your users purchase this product](ff-make-purchase).

