---
title: "Responses to server-side API requests"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
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
import AccessLevelNoProfileAccessLevel from './reusable/AccessLevelNoProfileAccessLevel.md';
import MissingOfferID from './reusable/MissingOfferID.md';
import FreeTrialPrice from './reusable/FreeTrialPrice.md'; 



## 200 Success


The request is successful, the response will have the following data:

#### 	Response object

<ProfileObject />	

#### 	Response example

<ResponseExample />

---

## 400 Bad request

### Access level does not exist

<AccessLevelDoesNotExist />

### Free trial price must be 0

<FreeTrialPrice />

### Missing offer ID for promotional offer or offer code

<MissingOfferID />

### No profile access level

<AccessLevelNoProfileAccessLevel />

### Profile not found

<AccessLevelProfileNotFound /> 

### Revocation date is more than current expiration date

<RevocationDateIsMoreThanExpirationDate />

---

## 401 Unauthorised

<ProfileResponseUnauthorized />

---

## 404 Not found

<ProfileResponseNotFound /> 

