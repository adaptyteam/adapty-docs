---
title: "Step 4. Enable purchase"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Congratulations! You have added logic to receive paywall product and show its title and price in the paywall page.

Now let's do the last but not the least - let the user buy your product:

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

4. In the **Select Action Trigger** window, choose **On Page Load**.
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

5. In the **No Actions Created** window, click the **Add Action** button.

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

7.  In the **Set Actions Arguments** section, choose `products` variable we've created.
8. Fill in other fields as listed below:

| Parameter | Value |
|--------------------------|----------|
| Available Options| Item as Index |
| List Index Options | First |

<Zoom>
  <img src={require('./FF_img/products-item.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

9. Click the **Confirm** button.







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
