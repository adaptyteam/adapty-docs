---
title: "Responses to server-side API requests"
description: ""
metadataTitle: ""
displayed_sidebar: APISidebar
---

<!--- api-responses.md --->

import Details from '@site/src/components/Details'; 
import AccessLevel from '@site/src/components/reusable/AccessLevel.md';  
import Subscription from '@site/src/components/reusable/Subscription.md';  
import NonSubscription from '@site/src/components/reusable/NonSubscription.md';  
import ResponseExample from '@site/src/components/reusable/responseExample.md';
import ProfileObject from '@site/src/components/reusable/ProfileObject.md';  
import ProfileResponseUnauthorized from '@site/src/components/reusable/ProfileResponseUnauthorized.md';
import ProfileResponseBadRequest from '@site/src/components/reusable/ProfileResponseBadRequest.md';
import ProfileResponseNotFound from '@site/src/components/reusable/ProfileResponseNotFound.md';
import AccessLevelProfileNotFound from '@site/src/components/reusable/AccessLevelProfileNotFound.md';
import AccessLevelDoesNotExist from '@site/src/components/reusable/AccessLevelDoesNotExist.md';
import RevocationDateIsMoreThanExpirationDate from '@site/src/components/reusable/RevocationDateIsMoreThanExpirationDate.md';
import AccessLevelNoProfileAccessLevel from '@site/src/components/reusable/AccessLevelNoProfileAccessLevel.md';
import MissingOfferID from '@site/src/components/reusable/MissingOfferID.md';
import FreeTrialPrice from '@site/src/components/reusable/FreeTrialPrice.md'; 
import FamilySharePrice from '@site/src/components/reusable/FamilySharePrice.md'; 
import RefundDateNull from '@site/src/components/reusable/RefundDateNull.md'; 
import RefundDate from '@site/src/components/reusable/RefundDate.md';
import originallyPurchasedDate from '@site/src/components/reusable/originallyPurchasedDate.md';
import StoreTransactionId from '@site/src/components/reusable/StoreTransactionId.md';
import GracePeriodBilling from '@site/src/components/reusable/GracePeriodBilling.md';
import ExpiresDate from '@site/src/components/reusable/ExpiresDate.md';
import RenewStatusChangedDate from '@site/src/components/reusable/RenewStatusChangedDate.md';
import BillingIssueDetectedDate from '@site/src/components/reusable/BillingIssueDetectedDate.md';
import GracePeriodExpiresDate from '@site/src/components/reusable/GracePeriodExpiresDate.md';
import OneTimePurchaseTrial from '@site/src/components/reusable/OneTimePurchaseTrial.md';



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

### grace_period_billing_error

<GracePeriodBilling />

### missing_offer_id

<MissingOfferID />

### one_time_purchase_trial_error

<OneTimePurchaseTrial />

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

## 401 Unauthorized

<ProfileResponseUnauthorized />

---

## 404 Not found

<ProfileResponseNotFound /> 
