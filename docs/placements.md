---
title: "Placements"
description: "Enhance user experience and maximize conversions by strategically deploying paywalls and A/B tests at various points in your app journey with Adapty's placement system. Learn how to manage, modify, and analyze placements effortlessly for improved engagement"
metadataTitle: "Optimize Engagement: Utilizing Adapty's Placements for Paywalls and A/B Tests"
---

With Adapty's placement system, you can create and run [paywalls](paywalls) and [A/B tests](ab-tests) at different points in your app user's journey, such as Onboarding, Settings, etc. These points are called Placements. 

A placement in your app can manage multiple paywalls or A/B tests at a time, each made for a certain group of users, which we call  [Audiences](audience). Moreover, you can experiment with paywalls, replacing one with another over time without releasing a new app version. 

The only thing you hardcode in the mobile app is the placement ID.

To see the list of placements in Adapty, open the **Placements** section in the Adapty main menu.

The **Placements** list offers a comprehensive view of various locations in the user journey where paywalls or A/B tests can appear. Each item in the list corresponds to a specific placement, allowing easy management and modification. You can edit placement details, associate them with the desired paywall or A/B test for a specified audience, or remove unnecessary placements. The numbers in the table reflect the analytics for placements since their activation.


<img
  src={require('./img/dfc4a1c-CleanShot_2023-07-26_at_14.51.342x.png').default}
/>





From here you can: 

- [Create a new placement](create-placement)
- [Edit an existing placement](edit-placement)
- [Delete an existing placement](delete-placement)
- [Download local fallback paywalls](fallback-paywalls), those are the paywalls that will be used when a user opens the app and there's no connection with Adapty backend (e.g. no internet connection or in the rare case when the backend is down) and there's no cache on the device.