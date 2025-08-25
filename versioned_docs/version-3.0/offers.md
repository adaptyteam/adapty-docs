---
title: "Trials & Promo offers"
description: "Set up and manage subscription offers in Adapty to drive conversions."
metadataTitle: "Managing Subscription Offers | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Offers in the App Store and Google Play are special deals or discounts provided by these platforms for in-app purchases. 

There are the following offer types:


|  | **Introductory offers (Free trials)**                                            | **Promotional offers**                                                                        | **Win-back offers**                                                        |
|---------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| **Purpose** | Attract new subscribers with risk-free experience                            | Target specific user groups with custom promotions                                        | Re-engage lapsed subscribers automatically                             |
| **Targeting** | New subscribers only                                                         | Any user group you choose (new, existing, lapsed)                                         | Churned subscribers only (Apple-determined eligibility)                |
| **Apple App Store configuration** | Built into subscription setup in App Store Connect                           | Custom discount campaigns configured in App Store Connect                                 | Configure discount in App Store Connect, Apple handles targeting       |
| **Google Play configuration** | Built into subscription setup in Google Play Console as introductory pricing | Custom discount campaigns configured in Google Play Console                               | Not available on Google Play                                           |
| **Stripe configuration** | Configure trial period in Stripe product/price setup                         | Not available in the Adapty integration                                                   | Not applicable (Stripe doesn't have automated win-back offers)         |
| **Adapty setup** | Applied automatically to products                                            | Must be attached to product in Adapty dashboard, then added to paywall                    | Must be attached to product in Adapty dashboard, then added to paywall |
| **Control level** | Basic (set trial duration only)                                              | High (full control over targeting logic and presentation)                                 | Medium (you set discount, Apple manages delivery timing)               |
| **Discount types** | Free period only                                                             | Percentage discounts, fixed price reductions, or free periods                             | Percentage discounts or free periods                                   |

:::note
Introductory offers on iOS are applied automatically if the user is eligible. Do not create them in Adapty.
:::

These offers help attract and keep users engaged, making the app experience more rewarding. By using these special incentives, you can boost user interest and loyalty, contributing to the overall success of their apps.

## Enable offers in your app

For Adapty to successfully process offers from the App Store, Play Store, and Stripe, you need to do all the following:

1. [Create offers in the App Store Connect](app-store-offers), [create offers in the Google Play Console](google-play-offers), or add a free trial in Stripe.
2. For App Store: [Upload a special In-App Purchase Key from App Store Connect to Adapty](app-store-connection-configuration#step-4-for-trials-and-special-offers--set-up-promotional-offers).
3. [Create offers in Adapty and add them to a paywall](create-offer)