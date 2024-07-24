---
title: "Android - Test purchases"
description: ""
metadataTitle: ""
---

The most common issue, **[ITEM_UNAVAILABLE](https://developer.android.com/reference/com/android/billingclient/api/BillingClient.BillingResponseCode#ITEM_UNAVAILABLE)** (responseCode 4), says that the product is not available for purchase, but does not explain why. Another example is when the product model returns “0.0” for price or “null” subscriptionPeriod. The reasons are very different: from testing on the wrong account or device to buying an inactive product.

1. Send an app with the Billing Library to your test track. This is a mandatory condition; at the same time, you can also test on debug builds with the same applicationId, but it is important that the app with the Billing Library is uploaded to the Play Console at least once.
2. Add Google accounts of testers to this test track, which is especially important for internal testing or closed alpha/beta. There will also be a link in the _How testers join your test_ section, where **the testers should accept the invitation.**
3. You can buy only an activated product. After creating a product, there is an **_activate_** button in the Play Console. We described the process of creating a product in more detail in [that article](https://adapty.io/blog/android-in-app-subscriptions).
4. Make sure that the testing on the device takes place from a tester's Google account (which means that it must be enrolled as a tester in this test track and must have all the necessary technical access). This point seems to be obvious but things happen, and you also need to check this if you have received such an error.
5. The applicationId of the build which is used for purchase testing must completely match the applicationId from the Play Console. This is especially important for those who have a suffix added in their debug builds.
6. Add the email addresses of testers to the _Setup → License Testing_ section in the left menu of the account (not the application), so that they buy products for free from a test card, not from a real one. Another advantage is that subscriptions in this case will have a [test duration](https://developer.android.com/google/play/billing/test#renewals). It is not related to this error, but it is also useful knowledge.
7. Make sure that the in-app you are trying to purchase is available in your region/your device’s region.

:::note
Note

This checklist is a takeaway from [this article in our blog](https://adapty.io/blog/android-in-app-purchases-part-4-billing-library-error-codes-and-how-not-to-fail-testing). If you want to learn more about error handling, make sure to check out the articles.
:::

Once the test purchase is successful, check your Adapty event feed.

Unlike iOS events, Android events mostly behave normally in Sandbox, but you may encounter some corner-cases. If you have the opportunity - kindly test the same scenario normally outside sandbox. That often helps rule-out many concerns.