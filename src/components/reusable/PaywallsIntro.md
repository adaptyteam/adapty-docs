<!--- PaywallsIntro --->

To enable any kind of in-app purchases, you need to understand how Adapty structures purchases:

- **Products** are anything available for purchase – subscriptions, consumables, or lifetime access.
- **Paywalls** are configurations that define which products to offer. In Adapty, paywalls are the only way to retrieve products, but this design lets you modify offerings, pricing, and product combinations without touching your app code.

**The fastest way to get started** is with Adapty's no-code [Paywall Builder](adapty-paywall-builder). You can [create a complete, purchase-ready paywall in minutes](quickstart-paywalls) – no design work, no purchase logic coding, and no payment handling required. Just configure your products, customize the look, and display it in your app with a few lines of code.

Adapty automatically handles all the complex purchase flow, receipt validation, and subscription management behind the scenes.

This guide will help you to display a paywall created in the Adapty Paywall builder in your app:

1. **Get the paywall**: Get the paywall from Adapty.
2. **Display the paywall**: Show the paywall container you've got in your app.
3. **Handle button actions**: Associate user interactions with the paywall with your app's response to them. For example, open links or close the paywall when users click buttons.