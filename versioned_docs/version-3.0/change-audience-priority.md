---
title: "Change audience priority in placement"
description: "Adjust audience priorities in Adapty to target users with personalized offers."
metadataTitle: "Changing Audience Priority | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

When you have different user audiences in one [placement](placements), a user can belong to more than one audience. For instance, if you've defined audiences like "Beginners", "Runners", and a general audience like "All users", it's crucial to determine which specific audience to consider first when a user falls into multiple categories.

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

In this scenario, we rely on audience priority. Audience priority is a numerical order, where #1 is the highest. It guides the sequence for audiences to check. In simpler terms, audience priority helps Adapty make decisions about which audience to apply first when selecting the paywall or A/B test to display. If the audience priority for a paywall, onboarding, or A/B test is low, users who potentially qualify for the paywall or test might bypass it. Instead, they could be directed to another audience with a higher priority.

Crossplacement audiences, meaning those created for [crossplacement A/B tests](ab-tests#ab-test-types), always take priority over regular audiences.

The "All users" audience always has the lowest priority since it’s a fallback and includes everyone who doesn’t match any other audience.

To adjust audience priorities for a placement:

1. While creating a new or editing an existing placement, click **Edit priority**. The button is visible only if at least three audiences are added to a placement ("All users" and two others). If less, the order is obvious - the "All users" audience comes last.

<Zoom>
  <img src={require('./img/edit-priority.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. In the opened **Edit audience priorities** window, drag-and-drop audiences to reorder them correctly.

<Zoom>
  <img src={require('./img/reorder_audiences.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Click the **Save** button.