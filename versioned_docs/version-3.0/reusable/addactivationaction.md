---
no_index: true 
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Add plugin activation action

To get the Adapty plugin up and running, you'll need to activate it.

1. In your FlutterFlow project, open **Custom Code** from the left menu.

   <Zoom>
     <img src={require('../FF_img/custom_code.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Under **Custom Files**, select `main.dart`.

3. In the right pane, click the **plus** button next to **Initial Actions**.

   <!--- <Zoom>
     <img src={require('../FF_img/activate.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom> --->

4. Enter the name of the new action as `activateAdaptyAction`.

5. Paste to the bottom of the created file the next code snipped:

```swift
import 'package:adapty_xtuel0/custom_code/actions/index.dart'
    as adapty_xtuel0_actions;

Future activateAdaptyAction() async {
  await adapty_xtuel0_actions.activate("YOUR_API_KEY");
}
```

6. Replace `YOUR_API_KEY` with your real value.

<Zoom>
  <img src={require('../FF_img/add-activateAdaptyAction.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. Click **Save Action**.

## Call the new activation action at application launch

1. Navigate to `main.dart` in the **Custom Files** section.
2. Remove legacy `activate` action from the Initial Actions section at the right pane if needed.
3. Click the plus (**+**) button and choose `activateAdaptyAction`.

<Zoom>
  <img src={require('../FF_img/update-activation.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>