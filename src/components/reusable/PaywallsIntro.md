<!--- PaywallsIntro --->

Adapty allows you to implement purchases in your app however you like. To enable any kind of in-app purchases, you need to understand two concepts in Adapty: 

- A **paywall** is a container for one or more products. It can contain a visual paywall created in the paywall builder, product information, or JSON configuration for use in your code.
- A **placement** is a rule for showing a paywall, onboarding, or A/B test at a certain point to a certain user group. One placement can contain several paywalls, so you can decide which users see which paywall.

The easiest way to enable in-app purchases in Adapty is to [create a paywall](https://adapty.io/docs/quickstart-paywalls) in the [Adapty Paywall builder](https://adapty.io/docs/adapty-paywall-builder). When you create a paywall in the no-code builder and display it in your app, Adapty **automatically handles all purchase-related logic**.

This guide will help you to display a paywall created in the Adapty Paywall builder in your app:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall**: Show the paywall container you've got in your app.
3. **Check subscription status before displaying the paywall to a specific user**: Get their current access level and don't display the paywall to your premium users.
4. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.