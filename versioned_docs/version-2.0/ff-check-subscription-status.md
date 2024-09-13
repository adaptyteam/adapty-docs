---
title: "Step 5. Check subscription"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

When you need to decide if a user has access to some paid content, you actually need to check if the user has a specific access level. Therefore, we will check the user has at least one access level and this level is the required one. 

And this can be done by looking into user profile as the user profile contains information on all available access levels.

Now let's do the last but not the least - let the user buy your product:

1. Double-click the button that should show the paid content.
2. Open the **Actions** section in the right pane if it's not open.
3. Open the **Action Flow Editor**.
4. In the **Select Action Trigger** window, choose **On Tap**.
5. In the **No Actions Created** window, click the **Add Conditional Action** button.
6. In the **Actions Flow Editor** window, choose **Combine Conditions**.
<Zoom>
  <img src={require('./FF_img/combined-condition.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

7. In the **Set Actions Arguments** section, choose `currentProfile` variable.
8. Fill in other fields as listed below:

  | Parameter | Value |
  |--------------------------|----------|
  | Available Options| Data Structure Field |
  | Select Field | accessLevels |
  | Available Options | List Contains Items |
 

9. And click **UNSET**.
10. In the new **Set Variable** window, fill in the fields as listed below:

  | Parameter | Value |
  |--------------------------|----------|
  | Available Options| Data Structure Field |
  | Select Field | accessLevels |
  | Available Options | Is Set and Not Empty |

11. Click the **Confirm** button.
12. Click **UNSET** for the second condition.
13. In the new **Set Variable** window, fill in the fields as listed below:

  | Parameter | Value |
  |--------------------------|----------|
  | Available Options| Data Structure Field |
  | Select Field | accessLevels |
  | List Index Options | First |
  | Available Options| Data Structure Field |
  | Select Field | accessLevels |
  | Available Options| Data Structure Field |
  | Select Field | isActive |


<Zoom>
  <img src={require('./FF_img/check-subscription-end.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
14. Click the **Confirm** button twice.

Now, continue adding actions that should be done if the user has or does not have the required subscription - open the next page or show a paywall to buy the access.

	