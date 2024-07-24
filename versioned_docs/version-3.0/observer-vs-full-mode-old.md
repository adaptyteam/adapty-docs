---
title: "Observer vs Full mode"
description: ""
metadataTitle: ""
---

Adapty SDK comes with two integration modes: Observer mode and Full mode. While Observer mode is easy to set up, Full mode provides more robust functionality and useful tools. In this article, we will compare the two modes and help you choose the right one for your case.

### Observer mode

Observer mode provides you with full analytics capabilities, including:

- Integrations with attribution systems
- Advanced Analytics
- Profiles CRM

Integration of the observer mode is relatively simple, usually taking under an hour, and only requiring a few SDK methods to be implemented. You can also utilize Observer mode alongside your current purchase infrastructure. To learn more about how to use Adapty SDK in Observer mode along with your existing purchase infrastructure you can refer to our detailed guidance for every framework:

- [iOS](ios-observer-mode)
- [Android](android-observer-mode)
- [Flutter](flutter-observer-mode)
- [React Native](react-native-observer-mode) 
- [Unity](unity-observer-mode)

### Full mode

The full mode adds multiple features on top of Observer mode, including:

- Complete purchases infrastructure: managing access to the app including lifetime, handling renewals, billing retries, subscription offers, grace periods, etc.
- A/B testing

While integration with Full mode takes several hours, it is often the best option for app purchase infrastructure as it provides a complete solution. Learn more about how to set up infrastructure along with using A/B testing functionality [here](https://docs.adapty.io/docs/ab-test).

### How to choose the right mode for your case

When choosing between Observer mode and Full mode, you can consider the following factors:

1. Your app's current infrastructure: If your app already has a well-established purchase infrastructure, Observer mode may be the best option as it can be used in conjunction with your current system.
2. Analytics and data tracking needs: If you have a high need for analytics and data tracking, Observer mode will provide the necessary integrations and advanced analytics to meet these needs.
3. A/B testing: If you want to conduct A/B testing for your app, Full mode is the best option as it includes this feature.
4. Complex purchases infrastructure: If your app has a complex purchases infrastructure, or you want to manage access to the app, including lifetime access, Full mode is the best option as it provides a complete purchases infrastructure solution.

| Functionality to consider    | Observer mode                                                   | Full mode                                                                                             |
| :--------------------------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **Implementation time**      | Under an hour                                                   | Several hours                                                                                         |
| **Analytics capabilities**   | Full analytics capabilities                                     | Full analytics capabilities                                                                           |
| **Integrations**             | Attribution systems, Advanced Analytics, Profiles CRM           | Attribution systems, Advanced Analytics, Profiles CRM, Complete purchases infrastructure, A/B testing |
| **Purchases infrastructure** | Works with existing purchases infrastructure                    | Complete purchases infrastructure, no server required                                                 |
| **Subscription management**  | Not included                                                    | Included: lifetime access, renewals, billing retries, subscription offers, grace periods              |
| **A/B testing**              | Not included                                                    | Included                                                                                              |
| **Benefits**                 | Quick integration, works with existing purchases infrastructure | Complete solution for app purchase infrastructure, subscription management, and A/B testing           |

The Observer mode can be a good choice for apps that have their own purchases infrastructure, so Observer mode can be used to track user behavior and understand the impact of marketing campaigns.  
The Full Mode can be a good use case for larger apps with a subscription model and a need for A/B testing may choose Full mode as its complete solution for app purchase infrastructure. This will provide them the ability to manage their subscriptions, including handling renewals and billing retries and perform A/B testing to optimize its monetization strategies.

In addition to the mentioned points, you can check Adapty’s [pricing plans](https://adapty.io/pricing/) to evaluate the costs and benefits of each mode and make an informed decision that fits your budget and meets your business goals.

In conclusion, both Observer mode and Full mode have their own features and capabilities. Choosing the right mode is important as it will ensure that you have all the features and capabilities that you need to maximize your app's monetization and improve the user experience. Make sure to consider your requirements and use cases before making a decision.  
If you require further assistance, refer to the resources and links provided in the [Adapty documentation](https://docs.adapty.io/docs) and [QuickStarter guide](https://docs.adapty.io/docs/quickstart).