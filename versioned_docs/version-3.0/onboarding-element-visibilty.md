---
title: "Onboarding element visibility"
description: "Configure static and dynamic navigation in Adapty’s no-code onboarding builder to guide users through flows."
metadataTitle: "Onboarding element visibility | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can also add conditional visibility to specific elements. Conditional elements are only visible to users who gave specific quiz answers.

For example, users who answered "What's your experience level" with "Beginner" will see extra details on the next step.

To make an element conditional:
1. Go to the **Element** tab on the right.
2. Select **Conditional** in the **Visible** section.
3. Set up the condition by choosing:
- quiz ID
- operator
- quiz answer
4. (Optional) Click **Advanced condition** to add multiple conditions.

For example, if you selected 'goal' as quiz ID, 'Has' as operator, and 'Education' as quiz answer, the element will be visible only to users whose answers for that quiz include the 'Education' option.

<Zoom>
  <img src={require('./img/element-condition.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

