---
title: "Migrate to Google Billing Library v5+"
description: ""
metadataTitle: ""
---

With the release of Adapty SDK version 2.6.1, we are excited to announce support for [Google Billing Library v5+](https://developer.android.com/google/play/billing/compatibility). This update includes several improvements and additions to the public API for the native [Android](https://docs.adapty.io/docs/android-installation), [Flutter](https://docs.adapty.io/docs/flutter-installation), and [React Native](https://docs.adapty.io/docs/react-native-installation) SDKs.

Here are the key changes and enhancements:

1. **Unified subscription details:** We have removed separate properties for free trials on Android to provide a more streamlined experience.** Instead, we have introduced an optional `subscriptionDetails` [property](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-paywall-product/subscription-details)  that consolidates  all subscription-related properties. **It includes an `introductoryOfferPhases` [property](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-product-subscription-details/introductory-offer-phases), which is a list that can contain up to two phases: the free trial phase and the introductory price phase.

   |                                     | Before (Kotlin)                                                      | After (Kotlin)                                                                                                                                       |
   | :---------------------------------- | :------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Checking discount offer eligibility | `product.introductoryOfferEligibility == AdaptyEligibility.ELIGIBLE` | `product.subscriptionDetails?.introductoryOfferEligibility == AdaptyEligibility.ELIGIBLE`                                                            |
   | Introductory price info             | `product.introductoryDiscount`                                       | `product.subscriptionDetails?.introductoryOfferPhases?.firstOrNull { it.paymentMode in listOf(PaymentMode.PAY_UPFRONT, PaymentMode.PAY_AS_YOU_GO) }` |
   | Free trial info                     | `product.freeTrialPeriod`                                            | `product.subscriptionDetails?.introductoryOfferPhases?.firstOrNull { it.paymentMode == PaymentMode.FREE_TRIAL }?.subscriptionPeriod`                 |
   | Free trial info (localized)         | `product.localizedFreeTrialPeriod`                                   | `product.subscriptionDetails?.introductoryOfferPhases?.firstOrNull { it.paymentMode == PaymentMode.FREE_TRIAL }?.localizedSubscriptionPeriod`        |

2. **Payment mode for discounts:** To align with iOS, we have added the `paymentMode` property to the `AdaptyProductDiscountPhase` [entity](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-product-discount-phase/).

3. **Renewal type for subscriptions:** We have introduced the `renewalType` property in the `AdaptyProductSubscriptionDetails` [entity](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-product-subscription-details/) to accommodate the two types of subscriptions available on Google Play: auto-renewable and prepaid.

4. **Price entity updates:** The `price`, `localizedPrice`, `currencyCode` and `currencySymbol` properties have been moved from `AdaptyPaywallProduct` to a new [entity](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-paywall-product/-price/) called `Price`.

5. **SKU details update:** The `skuDetails` property in `AdaptyPaywallProduct` has been renamed to `productDetails` to reflect the use of original product entities from Google.

6. **Eligibility status update:** In `AdaptyEligibility`, we have replaced the `UNKNOWN `value with `NOT_APPLICABLE`. The latter is used for products that cannot contain offers, such as `prepaid` products in the Google Play console.

7. **Personalized offers**: We have added a boolean parameter `isOfferPersonalized` to `makePurchase()`, with a default value of false. For more information, refer to the following [documentation](https://developer.android.com/google/play/billing/integrate#personalized-price).

8. **Offer identification:** The `offerId` property has been added to the `AccessLevel` and `Subscription` entities in `AdaptyProfile`. It is an optional field that represents the discount offer ID from Google Play. Additionally, we want to draw your attention to the fact that the `vendorProductId` in these entities may contain either `productId` only or `productId:basePlanId`.

9. **Replacement mode:** We have renamed `ProrationMode` to `ReplacementMode`, and the [constants](https://kotlin.adapty.io/adapty/com.adapty.models/-adapty-subscription-update-parameters/-replacement-mode/) have been adjusted to align with Google's standards.

For more detailed information and step-by-step guides on adding products and base plans to the Google Play Store, refer to our [documentation](https://docs.adapty.io/docs/android-products).

We hope these updates enhance your experience with Adapty SDK and the integration with Google's new billing system.