---
title: "Dynamic paywall text"
description: "Modify texts in your paywall depending on the product selected"
metadataTitle: "Dynamic Paywall Text Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The dynamic paywall text feature lets you customize what users see when they switch between products on your paywall. It works with both **Text** and **Caption** elements and supports all existing [product tag variables](paywall-builder-tag-variables.md), so you can include prices, trial info, or durations directly inside the message.

For example, you can show:

- “Cancel anytime, use for `<PROD_PRICE_PER_WEEK/>` / week” when the **weekly** product is selected

- “3 days free. Then `<PROD_PRICE_PER_YEAR/>` / year” for the **yearly** product

Or keep it simple with static text that just changes between products:

- **Yearly**: “No payment due now”

- **Weekly**: “Pay every week”

## Set up variants

1. Click **Add dynamic content** next to the text field.

<Zoom>
  <img src={require('./img/add-dynamic-content.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
<br/>

2. In the **Add dynamic content** window, configure text and its formatting for all the products you want. If needed, use [tag variables](paywall-builder-tag-variables) in the text.

<Zoom>
  <img src={require('./img/dynamic-content.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '500px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
<br/>

3. Click **Add default variant** and add a text that will be used for all the products you don't have a separate variant for or when no product is selected.
4. When ready, click **Apply variants**.
