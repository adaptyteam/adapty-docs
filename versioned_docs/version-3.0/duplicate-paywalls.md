---
title: "Duplicate paywall"
description: "Learn how to manage duplicate paywalls and optimize paywall performance in Adapty."
metadataTitle: "Handling Duplicate Paywalls in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

If you need to make small changes to an existing paywall in Adapty, especially when it's already being used in your mobile app and you don't want to mess up your analytics, you can simply duplicate it. You can then use these duplicates to replace the original paywalls in some or all placements as needed.

This creates a copy of the paywall with all its details, like its name, products, and any promotions. The new paywall will have "Copy" added to its name so you can easily tell it apart from the original. 

To duplicate a paywall in the Adapty dashboard:

1. Open the [**Products and Paywalls**](https://app.adapty.io/paywalls) section in the Adapty main menu and click the **Paywall** tab to open it. The paywall list page in the Adapy dashboard provides an overview of all the paywalls present in your account.


<Zoom>
  <img src={require('./img/07f592d-duplicate_paywall.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. Click the **3-dot** button next to the paywall and select the **Duplicate** option.
3. Adjust the new paywall and click the **Save** button.
4. Adapty will prompt you to replace the original paywalls with their duplicates in placements if the original paywall is currently used in any placement. If you choose **Create and replace original**, the new paywalls will immediately go **Live**. Alternatively, you can create them as new paywalls in the **Draft** state and add them to placements later.