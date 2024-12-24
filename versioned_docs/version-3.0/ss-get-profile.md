---
title: " Get profile with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---


import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/responseExample.md';


Retrieves the details of an existing end user of your app.

## Method and endpoint

```
GET https://api.adapty.io/api/v2/server-side-api/profile/
```

## Parameters

None in the JSON body. `Profile_id` or `customer_user_id`  must be set up as a header as described in [Authorization](ss-authorization).

## Successful response: 200 - Success

<ProfileResponse />

## Successful response example
<ResponseExample />  


## Errors

### 401 - Unauthorized**
<ProfileResponseUnauthorized /> 
### 404 - Not found
<ProfileResponseNotFound />  



---

**See also:**

- [Create profile](ss-create-profile)
- [Update profile](ss-update-profile)
- [Delete profile](ss-delete-profile)
