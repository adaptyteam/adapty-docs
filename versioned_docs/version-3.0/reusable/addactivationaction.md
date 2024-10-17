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

2. Click the **Add** button.

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

3. Choose **Action**.

4. Enter the name of the new action as `activateAdaptyAction`.

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

5. Paste to the bottom of the created file the next code snipped:

```swift
import 'package:adapty_xtuel0/custom_code/actions/index.dart'
    as adapty_xtuel0_actions;

Future activateAdaptyAction() async {
  await adapty_xtuel0_actions.activate("YOUR_API_KEY");
}
```

6. For  `YOUR_API_KEY`, copy the **Public SDK key** from the [**App Settings** -> **General** tab](https://app.adapty.io/settings/general) in the Adapty Dashboard. Each app has its own SDK key, so if you have multiple apps, make sure you grab the right one. 

7. Click **Save Action**.
