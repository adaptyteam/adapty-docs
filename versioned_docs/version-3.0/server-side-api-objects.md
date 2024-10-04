---
title: "API objects"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

import ProfileObject from './reusable/ProfileObject.md';
import AccessLevel from './reusable/AccessLevel.md';
import Purchase from './reusable/Purchase.md';
import Subscription from './reusable/Subscription.md';
import NonSubscription from './reusable/NonSubscription.md';
import Offer from './reusable/Offer.md';
import Price from './reusable/Price.md';

## Objects

Adapty API has JSON objects so you can understand a response structure and wrap it into your code.

All datetime values are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), for example, "2020-01-15T15:10:36.517975+0000".

### Profile

Info about the [customer and their subscription](server-side-api-objects#profile)

You can do the following actions with user profiles via Adapty server-side API:

- [Retrieve/get end user's profile](server-side-api-specs#retrieve-profile) with their access levels, subscriptions, non-subscriptions, etc.
- [Create a new end user profile](server-side-api-specs#create-profile)
- [Update your end-user profile](server-side-api-specs#update-profile)
- [Delete your end user](server-side-api-specs#delete-profile)

<ProfileObject />

### Access level

Info about customer’s [access level](access-level). 

Access levels let you control what your app's users can do in your mobile app without hardcoding specific product IDs. Each product defines how long the user gets a certain access level. So, whenever a user makes a purchase, Adapty grants access to the app for a specific period (for subscriptions) or forever (for lifetime purchases). Alternatively, you can [grant specific access](server-side-api-specs#grant-access-level) for a specified time to a user via server-side API.

You can do the following action via Adapty server-side API:

- [Check users's access level](server-side-api-specs#retrieve-profile) by retrieving their profile details
- [Grant specific access](server-side-api-specs#grant-access-level) to your end user without providing a transaction
- [Set transaction and grant access level](server-side-api-specs#set-transaction) to your end user
- [Revoke access level](server-side-api-specs#revoke-access-level) from your end user

<AccessLevel />

### Subscription

Info about your end user subscription.  You can do the following action via Adapty server-side API:

- [Check user's current subscription](server-side-api-specs#retrieve-profile) by retrieving their profile details
- [Set transaction to your user](server-side-api-specs#set-transaction) and grant a subscription to them

<Subscription />

### Non Subscription

Info about non-subscription purchases. These can be one-time \(consumable\) products, unlocks \(like new map unlock in the game\), etc.  

You can do the following action via Adapty server-side API:

- [Check user's current non-subscriptions](server-side-api-specs#retrieve-profile) by retrieving their profile details

<NonSubscription />

### Purchase

<Purchase />

### Offer

Information on the applied offer. The Offer object is a part of the  [Subscription](server-side-api-objects#subscription), [Access level](server-side-api-objects#access-level) objects.

You can do the following actions with offers via Adapty server-side API:

- [Apply offer](server-side-api-specs#set-transaction) when setting a transaction to your user

<Offer />

### Price

Information about the cost of your product in local currency. The Price object is a part of the  [Subscription](server-side-api-objects#subscription) and Purchase objects.

You can do the following actions with product price via Adapty server-side API:

- [Set transaction to your user](server-side-api-specs#set-transaction) and specify its price

<Price />
