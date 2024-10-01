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
import FamilySharePrice from './reusable/FamilySharePrice.md'; 
import RefundDateNull from './reusable/RefundDateNull.md'; 
import RefundDate from './reusable/RefundDate.md';
import originallyPurchasedDate from './reusable/originallyPurchasedDate.md';
import StoreTransactionId from './reusable/StoreTransactionId.md';
import GracePeriodBilling from './reusable/GracePeriodBilling.md';
import ExpiresDate from './reusable/ExpiresDate.md';
import RenewStatusChangedDate from './reusable/RenewStatusChangedDate.md';
import BillingIssueDetectedDate from './reusable/BillingIssueDetectedDate.md';
import GracePeriodExpiresDate from './reusable/GracePeriodExpiresDate.md';







## 200 Success


The request is successful, the response will have the following data:

#### 	Response object

<ProfileObject />	

#### 	Response example

<ResponseExample />

---

## 400 Bad request

### billing_issue_detected_at_date_comparison_error

<BillingIssueDetectedDate />

### expires_date_error

<ExpiresDate />

### family_share_price_error

<FamilySharePrice />

### free_trial_price_error

<FreeTrialPrice />

### grace_period_expires_date_error

<GracePeriodExpiresDate />

### missing_offer_id

<MissingOfferID />

### originally_purchased_date_error

<originallyPurchasedDate />

### paid_access_level_does_not_exist

<AccessLevelDoesNotExist />

### profile_paid_access_level_does_not_exist

<AccessLevelNoProfileAccessLevel />

### profile_does_not_exist

<AccessLevelProfileNotFound /> 

### refund_date_error

<RefundDate />

### refund_fields_error

<RefundDateNull />

### renew_status_changed_date_error

<RenewStatusChangedDate />

### revocation_date_more_than_expiration_date

<RevocationDateIsMoreThanExpirationDate />

### store_transaction_id_error

<StoreTransactionId />



---

## 401 Unauthorised

<ProfileResponseUnauthorized />

---

## 404 Not found

<ProfileResponseNotFound /> 

