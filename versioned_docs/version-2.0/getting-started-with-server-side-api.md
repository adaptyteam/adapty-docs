---
title: "Getting started with server-side API"
description: ""
metadataTitle: ""
---

With API you can:

1. Get user's subscription status.
2. Activate a subscription for a user with an [access level](access-level).
3. Get user's attributes.
4. Set user's attributes.

:::note
You can't get subscription events via API, but you can use [Webhook](webhook) or direct integration with a service that you're using.
:::

To correctly work with API you need to use a unique ID for your users. This may be an email, a phone number, your internal ID. Without such an ID it's impossible to identify the same user on multiple platforms.

## Case 1: Syncing subscribers between web and mobile

Whenever Web payment providers you use such as Stripe, ChargeBee, or any other, you can sync subscribers. For that:

1. _Use a unique ID for your users_. For example, email or phone number.
2. Check subscription status via API.
3. If a user is freemium, show him a paywall on the Web.
4. After successful payment, update subscription status in Adapty via API.
5. Your subscribers will be automatically in sync with mobile. 

## Case 2: Grant a subscription

:::note
Due to security reasons, you can't grant a subscription via mobile SDK.
:::

Imagine a case, when you run a promotional campaign with offers 7 days of a trial and you want to sync in with mobile experience. To do that:

1. Get a unique ID for a user.
2. Set premium access via paid access level with API with a duration of 7 days.

After 7 days users who won't subscribe will be downgraded to the free tier.

## Case 3: Syncing users' attributes and custom properties

You may have custom attributes for your users, other than defaults such as IDFA, device model, etc. For example, in a language learning service, you may want to save the number of words a student has learned. To do that:

1. Get a unique ID for a user.
2. Update attribute with API or SDK.

With such attributes you can, for example, create a segment and run an A/B test. 

To learn more about S2S API go to [API Specs](server-side-api-specs).