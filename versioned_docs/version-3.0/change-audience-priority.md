---
title: "Change audience priority in placement"
description: "Adjust audience priorities in Adapty to target users with personalized offers."
metadataTitle: "Changing Audience Priority | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

When you have different user audiences in one [placement](placements), a user can belong to more than one audience. For instance, if you've defined audiences like "Female", "Runners", and a general audience like "All users," it's crucial to determine which specific audience to consider first when a user falls into multiple categories.


<Zoom>
  <img src={require('./img/afee54f-2.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

In this scenario, we rely on audience priority. Audience priority is a numerical order, where #1 is the highest. It guides the sequence for audiences to check. In simpler terms, audience priority helps Adapty make decisions about which audience to apply first when selecting the paywall or A/B test to display. If the audience priority for a paywall or A/B test is low, users who potentially qualify for the paywall or test might bypass it. Instead, they could be directed to another audience with a higher priority.

To adjust audience priorities for a placement:

1. Open the **[Placements](https://app.adapty.io/placements)** section from the Adapty main menu.
2. Click the placement for which you want to change the audience priority.

   

<Zoom>
  <img src={require('./img/cd0f0e1-2024-02-13_16-36-33.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



3. Click the **Edit placement** button.

   

<Zoom>
  <img src={require('./img/3b8d8e3-edit_audience.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



4. After the chosen placement opens with the list of its audiences, hover over any audience and click the **Edit** button once it shows.

   

<Zoom>
  <img src={require('./img/2babfc8-reorder_audiences.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



5. In the opened **Edit audience priorities** window, drag-and-drop audiences to reorder them correctly.
6. Click the **Save** button.