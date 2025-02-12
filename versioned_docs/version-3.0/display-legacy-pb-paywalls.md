---
title: "Display legacy Paywall Builder paywalls"
description: "Displaying Legacy PB Paywalls | Adapty Docs"
metadataTitle: "Learn how to display legacy PB paywalls effectively for subscription optimization."
---

<!--- display-legacy-pb-paywalls.md --->

With Adapty, you can configure paywalls remotely and define which products to display in your app, eliminating the need to hardcode products.

There are two ways to customize a paywall in the Adapty Dashboard: 

- The simple, no-code tool called the [**Paywall Builder**](adapty-paywall-builder) which is presented in 2 versions:  
  - **New Paywall Builder,** which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. 
  - **Legacy Paywall Builder**, which is supported in all platforms as it requires SDK v2.x. 

- The flexible [**remote config**](customize-paywall-with-remote-config), a JSON file containing the data needed to render the paywall on the device

:::warning
This guide covers the process for **legacy Paywall Builder paywalls** only. The process for displaying and handling interactive paywall elements differs for paywalls designed with different versions of Paywall Builder and remote config paywalls. 

For displaying:

- **New Paywall Builder paywalls**, check out [Display paywalls designed with new Paywall Builder](display-pb-paywalls).
- **Remote config paywalls**, see [Display remote config paywalls](display-remote-config-paywalls).

:::

**Next step:**

- [Fetch legacy Paywall Builder paywalls and their configuration](get-legacy-pb-paywalls)