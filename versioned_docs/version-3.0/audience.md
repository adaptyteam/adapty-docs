---
title: "Audiences"
description: "Learn how to segment and manage audiences in Adapty for targeted subscription offers."
metadataTitle: "Managing Audience Segments | Adapty Docs"
keywords: ['audience']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';
import CustomDocCardList from '@site/src/components/CustomDocCardList';

<CustomDocCardList />

In Adapty, **audiences** are groups of users that you define using **[segments](segments.md)**. Segments are built with filters like country, subscription status, device type, or custom attributes. Audiences let you decide which of those users should see a particular [paywall](paywalls.md) or [onboarding](onboardings.md).

Audiences work inside **[placements](placements.md)**: a placement is the point in your app where a paywall or onboarding is shown. By attaching audiences to a placement, you can personalize what different user groups see and run experiments to optimize conversions.

For example, imagine you have a placement with the identifier `Onboarding`. In your app code, you call this placement by its ID. If the user belongs to the “Yoga beginners” audience, they’ll see the first paywall. Everyone else will see the second paywall.

<Zoom>
  <img src={require('./img/6bf7797-1_1.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
