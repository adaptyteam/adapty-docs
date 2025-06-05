<!--- AddAudience.md --->

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

1. In the **Placements/ Your placement** window, add a paywall or A/B test to display for default *All users* audience. To do this, click either the **Run paywall** or **Run A/B test** button, then select the desired paywall or A/B test from the dropdown list. Please note that only [previously created paywalls](create-paywall) and [previously created A/B tests](https://adapty.io/docs/ab-tests#creating-ab-test-from-ab-test-section) are available in the lists.
2. If you want to use more than one audience in the placement to create personalized paywalls tailored to different user groups, click the **Add audience** button and choose the desired user segment from the list. Please note that only [segments you have previously created](segments#creation) are accessible in the list. These segments signify different audience groups defined and created within Adapty.

<Zoom>
  <img src={require('../../../versioned_docs/version-3.0/img/placement-add-audience.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Now add the paywall or A/B test to show for this audience.
4. Add as many audiences as you need and paywalls or A/B tests to show for them.
5. If you have more than one audience, check that the audiences have the correct priorities. When you have different user audiences, a user can belong to more than one audience. For instance, if you've defined audiences like "US users, "Facebook users", and a general audience like "All users," it's crucial to determine which specific audience to consider first when a user falls into multiple categories. [Correct the priorities](change-audience-priority) if required.
6. Click the **Save and publish button**.