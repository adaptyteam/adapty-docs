---
title: "Paywall button"
description: "Customize paywall buttons in Adapty to enhance user interactions and increase conversions."
metadataTitle: "Customizing Paywall Buttons | Adapty Docs"

---

<!--- paywall-buttons.md ---> 

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A paywall button is a UI element that lets users do things like login, restore a purchase, or close the paywall. It can also trigger custom actions and start custom flows, like taking users to a different page, giving you a lot of flexibility. For example, a button could close the current paywall and open a new one, allowing you to link paywalls together.

:::warning

This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Paywall texts and buttons in legacy Paywall Builder](paywall-texts-and-buttons).

:::

<Zoom>
  <img src={require('./img/paywall_button.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

You can add as many buttons as you want. Just be sure to [handle the actions](/docs/handling-pb-paywall-events) in your app’s code. Each button has a **Button action ID** you’ll use for this. For default buttons (like close, restore, or login), the IDs are already set, so you just need to copy and paste them into your code. For custom actions, you can define your own.

If you'd like your custom button to open another paywall, it can be done by triggering `getPaywall` yourself. That means fetching the paywall by `placement_id`, grabbing its configuration, and then showing it. You can also chain actions, like closing the current paywall and then opening another one in the same sequence.

**What's next:**

- [Handle paywall actions in iOS](ios-handling-events#actions) 
- [Handle paywall actions in Android](android-handling-events#actions) 

