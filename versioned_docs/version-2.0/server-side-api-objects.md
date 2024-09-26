---
title: "API objects"
description: ""
metadataTitle: ""
---

import ProfileObject from './reusable/ProfileObject.md';
import AccessLevel from './reusable/AccessLevel.md';
import Purchase from './reusable/Purchase.md';
import Subscription from './reusable/Subscription.md';
import NonSubscription from './reusable/NonSubscription.md';

## Objects

Adapty API has JSON objects so you can understand a response structure and wrap it into your code.

All datetime values are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), for example, "2020-01-15T15:10:36.517975+0000".

### Profile

Info about the [customer and his subscription.  ](server-side-api-objects#profile)

<ProfileObject />

### CustomerAccessLevel

Info about customer’s [access level](access-level).

Configure which products unlock premium \(paid\) features in your app using the Adapty Dashboard. Then, check in the app for the access level available for a user, for example  in the way below \(in Swift \)

```swift title="Swift"
if (profile.paidAccessLevels["premium"]?.isActive == true) {
    /* Grant user access to paid functions of the app */
}
```

You can do the following action via Adapty server-side API:

- Ggrant access level to your end user without providing transaction
- Set transaction and grant access level to your end user
- Revoke access level from your end user

<CustomerAccessLevel />

### Subscription

Info about vendor subscription. You don’t have to use this object in most cases, **CustomerPaidAccessLevel** is the preferred way to work with access to the app. When using this object, you need to implement processing logic for each subscription period \(a week, a month, a year, lifetime\).  

<Subscription />

### Non Subscription

Info about non-subscription purchases. These can be one-time \(consumable\) products, unlocks \(like new map unlock in the game\), etc.  

<NonSubscription />