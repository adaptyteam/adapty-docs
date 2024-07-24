---
title: "Showing paywalls and running A/B tests in Observer mode"
description: ""
metadataTitle: ""
---

If you already have your own purchase infrastructure and aren't prepared to fully switch to Adapty, you can explore [Observer mode](observer-vs-full-mode). It'll provide you with the best analytics capabilities, integration with attribution and analytics systems, and a CRM with your users' profiles.

To make all this work in Observer mode, it's enough to enable it when configuring the Adapty SDK by setting the `observerMode` parameter to `true` as described in **[Configure Adapty SDK](configuring-adapty-sdk).**

If you want to also use Adapty's paywalls and A/B test functionality, it is possible, however it will require extra effort on your part in Observer mode compared to Full mode. To do this:

1. [Display paywalls in your mobile app](display-paywalls-in-observer-mode).
2. Implement the purchasing process according to your requirements. 
3. [Associate used paywalls to purchase transactions](associate-paywalls-to-transactions) for Adapty to determine the source of purchases.