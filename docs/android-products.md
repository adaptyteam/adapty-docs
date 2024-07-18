---
title: "Product in Play Store"
description: ""
metadataTitle: ""
---

This page provides guidance on creating a product in Play Store. While this information may not directly pertain to Adapty's functionality, it serves as a valuable resource if you encounter challenges while creating products in Google Play console.

Product refers to a digital item or service that you offer within your app in Play Store, typically available for purchase. These can include in-app products such as one-time purchases, subscriptions, or other digital goods that users can acquire while using your application.

In the [Google’s billing system](https://developer.android.com/google/play/billing/compatibility), subscriptions can incorporate multiple base plans, each providing various discounts or offers. This structure is comprised of three main components:

- **Subscriptions:** These represent sets of benefits that users can enjoy for a specific period (the items being sold). For instance, a "Gold tier" providing premium features for subscribers.
- **Base plans: ** These represent specific configurations of billing periods, renewal types, and prices (how the items are sold). Examples include "annual with auto-renewal" or "prepaid monthly."
- **Offers:** These entail discounts available to eligible users, modifying the base plan's price. For instance, a "free 14-day trial for new users."

:::note
Adapty SDK 2.6.0 already supports Google Billing Library v5 and v6 as well as the modern Google Play subscriptions structure such as multiple base plans per subscription, multiple offers per base plan, and multiple phases per offer.

Please refer to our [documentation](https://docs.adapty.io/docs/whats-new-in-adapty-sdk-20) for more details about how to migrate to Adapty SDK 2.6.0.
:::

## How to create a product in Play Store?

Product refers to a digital item or service that you offer within your app, typically available for purchase. These can include in-app products such as one-time purchases, subscriptions, or other digital goods that users can acquire while using your application.

To set up a product for Android devices:

1. Open [**Monetize** -> **Subscriptions**](https://console.cloud.google.com/iam-admin/serviceaccounts) or  [**Monetize** -> **In-app products**](https://console.cloud.google.com/iam-admin/serviceaccounts) section in the left menu of the Google Play Console.

   
<img
  src={require('./img/6eff1d1-subscription_GP.png').default}
/>




2. Click the **Create subscription** button.

   
<img
  src={require('./img/af7fe02-create_subscription_GP.png').default}
/>




3. In the opened **Create subscription** window, enter the subscription ID in the **Product ID** field and the subscription name in the **Name **field.

   Product ID has to be unique and must start with a number or lowercase letter, and can also contain underscores (\_), and periods (.). It is used to access your product during development and synchronize it with Adapty. Once a Product ID is assigned to a product in the Google Play Console, it cannot be reused for any other apps, even if the product is deleted.

   When naming your product ID, it is advisable to follow a standardized format. We recommend using a more concise approach and naming the product`<subscription name>.<access level>`. Then, you can control the duration and billing frequency through the use of base plans, such as weekly, monthly, and so on.

   The Name is used for your reference only, it will be visible on your Google Play Store listing, so feel free to use any descriptive name you need. It is limited to 55 characters. 

4. Click the **Create** button to confirm the subscription creation.

:::note
Google Play subscription products in Adapty

Adapty products correspond to Base Plans for Google Play subscriptions since those are the products available for customers to purchase. Adapty seamlessly handles the migration of existing Google Play subscriptions along with their corresponding base plans in products, requiring no additional action from you. However, when you add a new product in Adapty, you will be responsible for providing both the base plan ID and the product ID.
:::

### Create a base plan

For subscription products, you'll need to add a base plan. Base plans determine the billing period, price, and renewal type for customers to purchase your subscription. Please note that customers do not directly purchase a subscription product. Instead, they always buy a base plan within a subscription.

To create a base plan:

1. Open [**Monetize** -> **Subscriptions**](https://console.cloud.google.com/iam-admin/serviceaccounts) section in the left menu of the Google Play Console. Once there, locate the subscription to which you'd like to add a base plan.

2. Click the **View subscription** button next to the subscription.

   
<img
  src={require('./img/4072a2a-subscriptions_GP.png').default}
/>




3. After the subscription details open. click on the **Add base plan** button under the **Base plans and offers** title. You may need to scroll down to find it.

   
<img
  src={require('./img/b493b60-add_base_plan.png').default}
/>




4. In the opened **Add base plan** window, enter a unique identifier for the base plan in the Base **Plan ID** field. It must start with a number or lowercase letter, and can contain numbers (0-9), lowercase letters (a-z) and hyphens (-). and complete the required fields. 

   
<img
  src={require('./img/8146763-CleanShot_2023-07-20_at_16.51.412x.png').default}
/>




5. Specify the prices per region.

   
<img
  src={require('./img/8b26e1d-prices.png').default}
/>




6. Сlick the **Save** button to finalize the setup. 

7. Сlick the **Activate** button to make the baseline active.

Keep in mind that subscription products can only have a single base plan with consistent duration and renewal type in Adapty. 

### Fallback products

:::warning
Support for non backwards-compatible base plans

Older versions of Adapty SDKs do not support Google Billing Library v5+ features, specifically multiple base plans per subscription product and offers. Only base plans marked as **[backwards compatible](https://support.google.com/googleplay/android-developer/answer/12124625?hl=en#backwards_compatible)** in the Google Play Console are accessible with these SDK versions.  Note that only one base plan per subscription can be marked as backwards compatible.
:::


<img
  src={require('./img/b5e70cb-CleanShot_2023-07-20_at_17.03.252x.png').default}
/>





To fully leverage the enhanced Google subscription configurations and features in Adapty, we offer the capability to set up a backward compatible fallback product. This fallback product is exclusively utilized for apps using older versions of the Adapty SDK. When creating Google Play products, you now have the option to indicate whether the product should be marked as backward compatible in the Play Console. Adapty utilizes this information to determine whether the product can be purchased by older versions of the SDK (versions 2.5 and below).

Suppose you have a subscription named `subscription.premium` that offers two base plans: weekly (backward compatible) and monthly. If you add `subscription.premium:weekly` product to Adapty, you don't need to indicate a backward compatible product. However, in the case of `subscription.premium:monthly` product, you will need to specify a backward compatible product. Failing to do so could result in an unintended purchase of `subscription.premium:weekly` product in Google 4th billing library. To address this scenario, you should create a separate product where the base plan is also monthly and marked as backward compatible. This ensures that users who select the `subscription.premium:monthly` option will be billed correctly at the intended frequency.

## Add products to Adapty

Once you have completed adding your in-app purchases, subscriptions, and offers in App Store Connect, the next step is to [add these products to Adapty](create-product).