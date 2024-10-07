---
title: "Display legacy Paywall Builder paywalls"
description: ""
metadataTitle: ""
---

<!--- display-legacy-pb-paywalls.md --->

With Adapty, you can configure paywalls remotely and define which products to display in your app, eliminating the need to hardcode products.

here are two ways to customize a paywall in the Adapty Dashboard: 

- The simple, no-code tool called the [**Paywall Builder**](adapty-paywall-builder) which is presented in 2 versions:  
  - **new Paywall Builder** which is currently supported only on iOS, Android, and React Native, as it requires SDK v3.0, which is available for iOS, Android, and React Native only. 
  - **legacy Paywall Builder** which is supported in all platforms as it requires SDK v2.x. 

- The flexible [**remote config**](customize-paywall-with-remote-config), a JSON file containing the data needed to render the paywall on the device

:::warning
This guide covers the process for **legacy Paywall Builder paywalls** only. The process for displaying and handling interactive paywall elements differs for paywalls designed with different versions of Paywall Builder and remote config paywalls. 

For displaying:

- new Paywall Builder paywalls, please read [Display paywalls designed with new Paywall Builder](display-pb-paywalls)
- remote config paywalls, please read [Display paywalls designed with new Paywall Builder](display-remote-config-paywalls)

:::