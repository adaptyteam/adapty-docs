---
title: "Step 2. Add data to paywall page"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Once you created all variables we will need, let's add them to the beautiful paywall you have designed in FlutterFlow.

In order to show data, we will need to add the following variables to your paywall:

- **getPaywallProductResult**: Link it to the product text.

## Step 2.1. Add product title to paywall page

1. Double-click the product text in your paywall page. 

<Zoom>
  <img src={require('./FF_img/product-text.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the **Set from Variable** window, search for `getPaywallProductResult`variable and choose it.

<Zoom>
  <img src={require('./FF_img/add-product-title-to-page.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Fill in the fields in the following way:

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
  <img src={require('./FF_img/product.title.png').default}
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

Repeat the actions from Step 2.1 for price text, but as shown below:

1. Double-click the price text in your paywall page. 

<Zoom>
  <img src={require('./FF_img/price-text.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Fill in the fields in the following way:

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

1. Double-click the price in your paywall page. 

2. Fill in the fields in the following way:

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

