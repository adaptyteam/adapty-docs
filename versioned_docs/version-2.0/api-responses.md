---
title: "Responses to server-side API requests"
description: ""
metadataTitle: ""
toc: false
---

<!--- api-responses.md --->

import Details from '@site/src/components/Details'; 
import AccessLevel from './reusable/AccessLevel.md';  
import Subscription from './reusable/Subscription.md';  
import NonSubscription from './reusable/NonSubscription.md';  
import ResponseExample from './reusable/responseExample.md';
import ProfileObject from './reusable/ProfileObject.md';  
import ProfileResponseUnauthorized from './reusable/ProfileResponseUnauthorized.md';
import ProfileResponseBadRequest from './reusable/ProfileResponseBadRequest.md';
import ProfileResponseNotFound from './reusable/ProfileResponseNotFound.md';
import AccessLevelProfileNotFound from './reusable/AccessLevelProfileNotFound.md';
import AccessLevelDoesNotExist from './reusable/AccessLevelDoesNotExist.md';
import RevocationDateIsMoreThanExpirationDate from './reusable/RevocationDateIsMoreThanExpirationDate.md';

## 200 Success


The request is successful, the response will have the following data:
#### 	Response objects

<ProfileObject />	

#### 	Response example

<responseExample />

## 400 Bad request

<ProfileResponseBadRequest /> 

#### Profile not found
<AccessLevelProfileNotFound /> 

#### Access level does not exist
<AccessLevelDoesNotExist />

####  No profile access level

<AccessLevelNoProfileAccessLevel />

#### Revocation date is more than current expiration date
<RevocationDateIsMoreThanExpirationDate />

## 401 Unauthorised

<ProfileResponseUnauthorized />

## 404 Not found

<ProfileResponseNotFound /> 

