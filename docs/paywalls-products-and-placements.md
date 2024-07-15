---
title: "Paywalls, products, and placements"
description: "Explore the integration of paywalls, products, and placements in Adapty, enabling tailored user experiences and optimized content delivery within your mobile app. Learn how to effectively create and manage paywalls, products, and placements for enhanced user engagement."
metadataTitle: "Adapty Paywalls, Products, and Placements: A Comprehensive Overview"
---

In Adapty, a **Product** is a term that encapsulates items or services available for purchase. These offerings vary, ranging from time-bound premium subscriptions, such as a year-long Premium subscription to virtual in-app items like sets of golden coins in games.

A **Paywall **is a screen within your mobile app dedicated to selling products. It serves as the point of interaction where users make purchasing decisions. A paywall stores information about the products, including their order, and additional visualization and localization options.

A **Placement ** is a specific location within your mobile app where a paywall can be displayed. For example, a subscription choice might appear in a Start-wizard, while golden coins could be presented when a user runs out of coins in a game. You have the flexibility to showcase the same paywall across multiple placements or different paywalls in one placement for different user segments, called audiences in Adapty.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/3a291e9-1_1.png" 
    style={{ width: '700px', border: 'none' }}
  />
</div>





In your mobile app, you get Paywalls with their Products by calling the SDK's `getPaywall()` method using the corresponding **placement ID** — for example, `getPaywall(placementId: onboarding)`. Adapty then routes the user to the corresponding paywall linked to that specific placement and returns it to the device — so you can make adjustments to your Placements without updating your app.

**Audiences** in Adapty refer to user segments, allowing you to tailor paywalls to specific groups. Configure these audiences using specialized filters, ensuring that the right users see the relevant paywalls in specific placements.

Here's a quick breakdown of how to work with paywalls:

1. In Adapty, [create products](product#create-product) that match those in the App Store and Play Store and specify their corresponding product IDs from the app stores.
2. [Create a paywall](docs:paywalls) that you want to display within your mobile app.
3. [Create a placement](docs:placements#create-a-new-placement) and set up the audiences you want to target. Assign the paywall to the audiences of the placement.
4. [Call the placement by its placement ID from the mobile app code](displaying-products) to display the paywalls in the mobile app.
5. Create more paywalls to run experiments.