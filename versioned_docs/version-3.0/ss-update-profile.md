---
title: "  Update profile with server-side API"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---


import ProfileObject from '@site/src/components/reusable/ProfileObject.md';import CreateProfileRequestExample from '@site/src/components/reusable/CreateProfileRequestExample.md';
import ProfileRequest from '@site/src/components/reusable/ProfileRequest.md';
import ProfileResponse from '@site/src/components/reusable/ProfileResponse.md';
import ProfileResponseBadRequest from '@site/src/components/reusable/ProfileResponseBadRequest.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ResponseExample from '@site/src/components/reusable/responseExample.md';



Changes your end user profile attributes.

## Method and endpoint

```
PATCH https://api.adapty.io/api/v2/server-side-api/profile/
```

## Parameters

`Profile_id` or `customer_user_id` must be set up as a header as described in [Authorization](ss-authorization).
  <ProfileRequest /> 


## Example request

<CreateProfileRequestExample /> 

## Successful response

200 - Success

<ProfileResponse />

Successful response example
<ResponseExample />  



## Errors

### 400 - Bad request
<ProfileResponseBadRequest />  
### 401 - Unauthorized
<ProfileResponseUnauthorized />  
### 404 - Not found
<ProfileResponseNotFound />  



---

**See also:**

- [Get profile](ss-get-profile)
- [Create profile](ss-create-profile)
- [Delete profile](ss-delete-profile)