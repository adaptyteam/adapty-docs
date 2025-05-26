---
title: "Step 5. Check access to paid content"
description: "Learn how to check subscription status using Adapty's feature flags for better user segmentation."
metadataTitle: "Checking Subscription Status | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

When determining if a user has access to specific paid content, you'll need to verify their access level. This means checking if the user has at least one access level, and if that level is the required one.

You can do this by looking at the user profile, which contains all available access levels.

Now, let’s allow users to purchase your product:

1. Double-click the button that should show the paid content.

2. Open the **Actions** section in the right pane if it’s not already open.

3. Open the **Action Flow Editor**.

4. In the **Select Action Trigger** window, choose **On Tap**.

5. In the **No Actions Created** window, click the **Add Conditional Action** button.

6. In the **Actions Flow Editor** window, choose **Combine Conditions**.
    <Zoom>
    <img src={require('./FF_img/combined-condition.webp').default}
    style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
    }}
    />
    </Zoom>

7. In the **Set Actions Arguments** section, choose `currentProfile` variable. This is the Adapty variable that holds data about the current user's profile.

   <Zoom>
     <img src={require('./FF_img/current-profile.webp').default}
     style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

9. Fill in the fields as follows:

| Parameter | Value |
|--------------------------|----------|
| Available Options| Data Structure Field |
| Select Field | accessLevels |
| Available Options | Filter List Items |
| Filter Conditions | Conditions -> Single Condition |

<Zoom>
  <img src={require('./FF_img/filter-list-items.webp').default}
  style={{
 border: '1px solid #727272', /* border width and color */
 width: '700px', /* image width */
 display: 'block', /* for alignment */
 margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


9. In the **Filter Conditions** field, click **UNSET**. 

10. In the **Set Variable** window, click **Conditions** -> **Single Condition**.

    <Zoom>
      <img src={require('./FF_img/single-condition.webp').default}
      style={{
     border: '1px solid #727272', /* border width and color */
     width: '700px', /* image width */
     display: 'block', /* for alignment */
     margin: '0 auto' /* center alignment */
      }}
    />
    </Zoom>

11. In the new **Set Variable** window, click **UNSET** next to **First value**.

    <Zoom>
      <img src={require('./FF_img/first-value.webp').default}
      style={{
     border: '1px solid #727272', /* border width and color */
     width: '700px', /* image width */
     display: 'block', /* for alignment */
     margin: '0 auto' /* center alignment */
      }}
    />
    </Zoom>

| Parameter         | Value                 |
| ----------------- | --------------------- |
| First Value       | Item in List          |
| Available Options | Data Structure Field  |
| Select Field      | accessLevelIdentifier |


9. Click **Confirm**.

10. In the **Set Variable** window, click **UNSET** next to **Second value**.

11. In the **Value** field, enter the ID of your access level, in our example we use `premium`.

    <Zoom>
      <img src={require('./FF_img/second-value.webp').default}
      style={{
     border: '1px solid #727272', /* border width and color */
     width: '700px', /* image width */
     display: 'block', /* for alignment */
     margin: '0 auto' /* center alignment */
      }}
    />
    </Zoom>

12. Click **Confirm**.

    

13. In the new **Set Variable** window where you returned, fill in the fields as follows:

| Parameter | Value |
|--------------------------|----------|
| Available Options| Item at Index |
| List Index Options | First |
| Available Options| Data Structure Field |
| Select Field | accessLevels |
| Available Options| Data Structure Field |
| Select Field | isActive |

<Zoom>
  <img src={require('./FF_img/check-subscription-end.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

14. Click the **Confirm** button twice.

Now, add the actions for what happens next — if the user has the right subscription or not. Either take them to the next page or show the paywall so they can buy access.