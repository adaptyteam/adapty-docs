---
title: "Paywall button"
description: "Customize paywall buttons in Adapty to enhance user interactions and increase conversions."
metadataTitle: "Customizing Paywall Buttons | Adapty Docs"

---

<!--- paywall-buttons.md ---> 

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A paywall button is a UI element that lets users:
- Buy products
- Sign in
- Restore purchases
- Close the paywall
- Run custom actions

:::warning

This section describes the new Paywall Builder, which works with:
- iOS, Android, and React Native SDKs version 3.0 or higher
- Flutter and Unity SDKs version 3.3.0 or higher

For information on the legacy Paywall Builder (compatible with Adapty SDK v2.x or earlier), see [Paywall texts and buttons in legacy Paywall Builder](paywall-texts-and-buttons).

:::

### Custom buttons
You need custom buttons to:
- Close the paywall (`close`)
- Open a URL (`openUrl`)
- Restore purchases (`restore`)
- Sign in (`login`)
- Run custom actions

To make buttons work, you need to [handle their action IDs in your code](handling-pb-paywall-events.md). For example, a close button needs the `close` action handler.

You can also:
- Open another paywall with [`getPaywall`](get-pb-paywalls.md)
- Run multiple actions in sequence (like close and open)

<Zoom>
  <img src={require('./img/pb-custom-button.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Purchase buttons
Purchase buttons:
- Connect to products in your paywall
- Handle product selection
- Start the purchase when tapped

<Zoom>
  <img src={require('./img/purchase-button.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::important
The purchase button has additional customization options to help you highlight your offers. If you add animation to a purchase button, update the Adapty SDK to version 3.9.0 or later to display the animation.
:::

### Links
To comply with some store requirements, you can add links to:
- Terms of service
- Privacy policy
- Purchase restoration

To add links:
1. Add a **Link** element in the paywall builder.
2. Add the [`openUrl`](handling-pb-paywall-events.md) handler to your code.


<Zoom>
  <img src={require('./img/pb-links.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>