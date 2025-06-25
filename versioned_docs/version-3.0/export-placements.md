---
title: "Export placement"
description: "Learn how to export placements in Adapty to optimize paywall visibility and user engagement."
metadataTitle: "How to Export Placement in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

When you work with multiple paywalls and onboardings, it's important to track which ones are shown to which users. You can export all your placement settings to a CSV file to see which paywall/onboarding appears for each audience and review your setup after making changes or running experiments.

To export paywall/onboarding placements:

1. Go to **[Placements](https://app.adapty.io/placements)** in the main menu. Switch to the **Paywalls** or **Onboardings** tab, as placements for them are exported separately.
2. Click **Export to CSV**.

<Zoom>
  <img src={require('./img/export-placement.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

The exported CSV file contains the following information about your placements:

- Placement ID
- Placement name
- Audience name
- Segment name
- Cross-placement A/B test name
- A/B test name
- Paywall name

