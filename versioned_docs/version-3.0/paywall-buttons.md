---
title: "Paywall button"
description: ""
metadataTitle: ""

---

<!--- paywall-buttons.md ---> 

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A paywall button is a UI element that lets users do things like login, restore a purchase, or close the paywall. It can also trigger custom actions, like taking users to a different page, giving you a lot of flexibility. You can even create custom flows. For example, a button could close the current paywall and open a new one, allowing you to link paywalls together.

<Zoom>
  <img src={require('./img/paywall_button.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

You can add as many buttons as you want. Just be sure to [handle the actions](handling-pb-paywall-events) in your app’s code. Each button has a **Button action ID** you’ll use for this. For default buttons (like close, restore, or login), the IDs are already set, so you just need to copy and paste them into your code. For custom actions, you can create your own.

When opening another paywall, it’s done the usual way. That means fetching the paywall by `placement_id`, grabbing its configuration, and then showing it. You can also chain actions, like closing the current paywall and then opening another one in the same sequence.

**What's next:**

- [Handle paywall actions](ios-handling-events#actions) 
