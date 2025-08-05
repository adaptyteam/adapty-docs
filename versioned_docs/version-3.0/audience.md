---
title: "Audiences"
description: "Learn how to segment and manage audiences in Adapty for targeted subscription offers."
metadataTitle: "Managing Audience Segments | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

**Audiences** in Adapty are groups of users based on [segments](segments), helping you customize paywalls, onboardings, or A/B tests for specific user groups. You can define these segments using filters to ensure the right users see the right paywall or onboarding in your app.


In Adapty, a **Placement** is where you can show paywalls, onboardings, or A/B tests. When you add an audience to a placement, you're targeting specific user groups with personalized content. For instance, you might show different paywalls based on a user's age, device, or subscription status. If a user falls into multiple groups, you can choose which group gets the priority, deciding which paywall they'll see.

In the example below, we have an onboarding flow to display your placement with the `Onboarding` identifier. In your app code, you will access the placement using this identifier. If the user belongs to the "Yoga beginners" audience, they will see the first paywall. Those who do not fit the "Yoga beginners" audience will see the second paywall.


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





To display a paywall, onboarding, or A/B test to a specific audience, do the following:

1. [Create a user segment](segments#creation). You can skip this step if you want to show the paywall, onboarding, or A/B test to all users. In such a case, use the "All users" audience created by default.
2. [Add this segment as an audience to placement and define which paywall, onboarding, or A/B test should be shown to it](add-audience-paywall-ab-test). The "All users" audience is automatically added to every placement; you only need to specify which paywall, onboarding, or A/B test should be displayed.
3. [Set the right priorities](change-audience-priority) if you have more than one audience in a placement. This ensures that users who belong to more than one audience will see the most relevant content. When a user is part of several audiences, the paywall or onboarding for the highest-priority audience will be displayed.
4. [In your mobile app code, show the paywall associated with this placement in the mobile app code](display-pb-paywalls).