---
title: "Paywall button"
description: ""
metadataTitle: ""

---

<!--- paywall-buttons.md ---> 

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs'; 
import TabItem from '@theme/TabItem'; 

A paywall button is a UI element that lets users do things like login, restore a purchase, or close the paywall. It can also trigger custom actions and start custom flows, like taking users to a different page, giving you a lot of flexibility. For example, a button could close the current paywall and open a new one, allowing you to link paywalls together.

:::warning

This section describes the new Paywall Builder, compatible with Adapty SDK v3.0 (3.2.0 for Flutter) and later which is now available for iOS, Android, Flutter, and React Native only. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Paywall texts and buttons in legacy Paywall Builder](paywall-texts-and-buttons).

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

## Example

For example, if you need to add the **Restore** and **Login** button as well as links to open **Terms of service** and **Provacy Policy**. Here is how you can do that:

1. Add an element called **Links**.

   <Zoom>
     <img src={require('./img/add-links.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Enable those buttons and links you need by toggling and entering Link URLs for terms of service and privacy policy if you enabled them. IDs for the **Restore** and **Login** buttons are added automatically.

   <Zoom>
     <img src={require('./img/auxiliary-buttons.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

Now let's configure them in your mobile app code.

<Tabs> <TabItem value="Swift" label="Swift" default>

    ...
</TabItem> 

<TabItem value="swiftui" label="SwiftUI" default>

 Text 

</TabItem> 

<TabItem value="kotlin" label="Kotlin" default>

 Text 

</TabItem> 

<TabItem value="java" label="Java" default>

 Text 

</TabItem> 

<TabItem value="Flutter" label="Flutter" default>

 Text 

</TabItem> 

<TabItem value="Unity" label="Unity" default>

 Text

</TabItem> 

<TabItem value="RN" label="React Native (TS)" default> 

Text 

</TabItem>

 </Tabs>



```

```



**What's next:**

- [Handle paywall actions in iOS](ios-handling-events#actions) 
- [Handle paywall actions in Android](android-handling-events#actions) 

