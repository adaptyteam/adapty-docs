---
title: "Step 2. Add data to paywall page"
description: "Adding Feature Flag Variables to Paywalls | Adapty Docs"
metadataTitle: "Add Feature Flag variables to paywalls in Adapty."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Once you've [received all the necessary product data](ff-action-flow), it's time to map it to the beautiful paywall you designed in FlutterFlow. In this example, we'll map the product title and its price.

## Step 2.1. Add product title to paywall page

1. Double-click the product text on your paywall page. 

  <Zoom>
    <img src={require('./FF_img/product-text.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

2. In the **Set from Variable** window, search for `getPaywallProductResult` variable and choose it.

  <Zoom>
    <img src={require('./FF_img/add-product-title-to-page.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Fill in the fields as follows:

  | Parameter | Value |
  |--------------------------|----------|
  | Available Options| Data Structured Field |
  | Select Field| value |
  | Available Options| Data as Index |
  | List Index Options| First |
  | Available Options| Data Structured Field |
  | Select Field| Localized Title |
  | Default Variable Value| null |
  | UI Builder Display Value| Anything, in the example, it's `product.title` |

  <Zoom>
    <img src={require('./FF_img/product.title.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

3. Click the **Confirm** button to save the changes.

## Step 2.2. Add price text to paywall page

Repeat the steps from Step 2.1 for the price text as shown below:

1. Double-click the price text on your paywall page. 

<Zoom>
  <img src={require('./FF_img/price-text.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Fill in the fields as follows:

| Parameter | Value |
|--------------------------|----------|
| Search variable| getPaywallProductResult |
| Available Options| Data Structured Field |
| Select Field| value |
| Available Options| Data as Index |
| List Index Options| First |
| Available Options| Data Structured Field |
| Select Field| price |
| Available Options| Data Structured Field |
| Select Field| LocalizedString |
| Default Variable Value| null |
| UI Builder Display Value| Anything, in the example, it's `product.price` |

3. Click the **Confirm** button to save the changes.

## Step 2.2. Add price in local currency to paywall page

1. Double-click the price on your paywall page. 

2. Fill in the fields as follows:

| Parameter | Value |
|--------------------------|----------|
| Search variable| getPaywallProductResult |
| Available Options| Data Structured Field |
| Select Field| value |
| Available Options| Data as Index |
| List Index Options| First |
| Available Options| Data Structured Field |
| Select Field| price |
| Available Options| Data Structured Field |
| Select Field| amount |
| Available Options| Decimal |
| Decimal Type| Automatic |
| Default Variable Value| null |
| UI Builder Display Value| Anything, in the example, it's `price.amount` |

3. Click the **Confirm** button to save the changes.

And voilà! Now, when you launch your app, it will display the product data from the Adapty paywall directly on your paywall page!
It's time to [let your users purchase this product](ff-make-purchase).

