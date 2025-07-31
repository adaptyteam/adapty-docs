---
title: "Paywall button"
description: "Customize paywall buttons in Adapty to enhance user interactions and increase conversions."
metadataTitle: "Customizing Paywall Buttons | Adapty Docs"

---

<!--- paywall-buttons.md ---> 

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::warning
**Only purchases and restorations are handled automatically.** All the other button actions, such as closing paywalls or opening links, require [implementing proper responses in the app code](handle-paywall-actions.md).
:::

A paywall button is a UI element that lets users:
- Buy products
- Sign in
- Restore purchases
- Close the paywall
- Trigger custom actions (e.g., open another paywall)

:::info

This section describes the new Paywall Builder, which works with:
- iOS, Android, and React Native SDKs version 3.0 or higher
- Flutter and Unity SDKs version 3.3.0 or higher

:::

### Purchase buttons
Purchase buttons:
- Connect to selected products in your paywall
- Start the purchase when tapped

When you add a purchase button to your paywall, it automatically processes purchases your users make. So, you don't need to handle purchases in the app code.

:::note
You can attract more attention to purchase buttons by animating them. The Paywall builder currently supports **Arrow** and **Pulse** animation types. Note, that, to add the **Arrow** animation, first, you need to configure the **Arrow icon** in the **Content** section.

Each animation lets you choose an easing option (Linear, Ease In, Ease Out, Ease In Out) to control how it speeds up or slows down.

Animations are available in the Adapty iOS, Android, Flutter, and React Native SDKs starting from version 3.10.0.
:::

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

### Custom buttons
You need custom buttons to:
- Close the paywall (`close`)
- Open a URL (`openUrl`)
- Restore purchases (`restore`)
- Sign in (`login`)
- Trigger custom actions (e.g., open another paywall)

To make most buttons work, you need to [**handle their action IDs in your code**](handle-paywall-actions.md). For example, a close button needs the `close` action handler.

:::important
`close` is handled automatically in the iOS, Android, and React Native SDKs. `openUrl` is handled automatically in the iOS and Android SDKs. However, if needed, you can override the default behavior.

`restore` is always handled automatically.
:::

When handling custom actions in your code, you can implement scenarios like:

- Opening another paywall
- Running multiple actions in sequence (like close and open)

Note that you would need to build these scenarios using the action handling system - they're not built-in features.

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