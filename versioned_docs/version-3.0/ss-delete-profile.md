---
title: "   Delete profile with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---


import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';

Deletes an end user of your app in Adapty.

Calling this endpoint enables the deletion of a user's profile and all related data, rendering it inaccessible to the client. Any profile history linked to the deleted profile will be detached, and integration events previously sent to integrations will be deleted from the event feed. 

Should another profile make a purchase from the device with the same Apple ID (or when the subscription is restored), the profile history will be reassigned to the new profile, and integration events will be reissued.

Please be aware that this endpoint does not support bulk deletion, therefore each request must be handled individually. For managing a substantial number of users, it is advisable to execute requests concurrently.

## Method and endpoint

```
DELETE https://api.adapty.io/api/v2/server-side-api/profile/
```

## Parameters

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](ss-authorization).

## Successful response

##### Header:

| Name       | Type   | Description                                                  |
| :--------- | ------ | :----------------------------------------------------------- |
| Request-Id | String | Request ID, all backend logs have this id Example: 758f01dfd9e74ccfbabb4934241c4966 |

---

## Errors

### 401 - Unauthorized

<ProfileResponseUnauthorized />  

---

### 404 - Not found

<ProfileResponseNotFound />  



---

**See also:**

- [Get profile](ss-get-profile)
- [Create profile](ss-create-profile)
- [Update profile](ss-update-profile)
