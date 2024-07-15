---
title: "Audiences"
description: "Enhance user engagement by creating personalized segments with Adapty's Audiences feature, enabling tailored paywalls or A/B tests for specific user groups based on various filters. Learn how to target users effectively and optimize content delivery"
metadataTitle: "Customized User Targeting: Using Audiences in Adapty"
---

**Audiences** in Adapty are [user segments](segments), helping you customize paywalls or A/B tests for specific groups of your users. You can set up these segments using special filters to make sure the right users see the right paywalls in your mobile app.

In Adapty, a **Placement** is where you can show paywalls or A/B tests. When you add an audience to a placement, you're targeting specific user groups with personalized content. For instance, you might show different paywalls based on a user's age, device, or subscription status. If a user falls into multiple groups, you can choose which group gets the priority, deciding which paywall they'll see.

In the example below, we have a placement with the identifier `Onboarding`. In your app code, you will access the placement using this identifier. If the user belongs to the "Yoga beginners" audience, they will see the first paywall Those who do not fit the "Yoga beginners" audience will see the second paywall.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/6bf7797-1_1.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





To display a paywall or A/B test to a specific audience, do the following:

1. [Create a user segment](segments#creation). You can skip this step if you want to show the paywall or A/B test to all users. In such a case, use the "All users" audience created by default.
2. [Add this segment as an audience to placement and define which paywall or A/B test should be shown to it](add-audience-paywall-ab-test). The "All users" audience is automatically added to every placement; you only need to specify which paywall or A/B test should be displayed.
3. [Set the right priorities](change-audience-priority) if you have more than one audience in a placement. This ensures that users who belong to more than one audience will see the most relevant content. When a user is part of several audiences, the paywall for the highest-priority audience will be displayed.
4. [In your mobile app code, show the paywall associated with this placement in the mobile app code](displaying-products).