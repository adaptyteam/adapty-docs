---
title: "Delete placement"
description: "Optimize app organization by effortlessly removing unused or mistakenly created placements with Adapty's deletion feature. Learn how to maintain a tidy environment and improve efficiency"
metadataTitle: "Efficient Placement Cleanup: Deleting Unused Placements in Adapty"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A [Placement](placements) designates a specific location within your mobile app where a paywall or A/B test can be displayed. 

:::danger
Although you have the option to delete any placement, it is critical to ensure that you don't delete a placement that is actively used in your mobile app. Deleting such a placement will result in a local fallback paywall being permanently shown if you've [set it up](fallback-paywalls), and you won't be able to ever replace it with a dynamic paywall in released app versions.
:::

To delete an existing placement:

1. Open the **[Placements](https://app.adapty.io/placements)** section in Adapty main menu.

2. In the **Placements** window, click the **3-dot** button next to the placement and select the **Delete** option.  

   
<Zoom>
  <img src={require('./img/6b971ea-delete_placement_list.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. In the opened **Delete placement** window, enter the product name you're about to delete.

   
<Zoom>
  <img src={require('./img/8177c51-delete_placement.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




4. Click the **Delete forever** button to confirm the deletion.