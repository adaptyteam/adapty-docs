---
title: "Android - Handle errors"
description: "Discover how to streamline error management in Android development with Adapty SDK's AdaptyError, providing detailed troubleshooting capabilities for comprehensive error handling."
metadataTitle: "Android Error Handling: AdaptyError Overview"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Every error is returned by the SDK is `AdaptyError`.

| Error | Description |
|-----|-----------|
| UNKNOWN | This error indicates that an unknown or unexpected error occurred. |
| [ITEM_UNAVAILABLE](https://developer.android.com/reference/com/android/billingclient/api/BillingClient.BillingResponseCode#ITEM_UNAVAILABLE()) | This error mostly happens at the testing stage. It may mean that the products are absent from production or that the user does not belong to the Testers group in Google Play. |
| ADAPTY_NOT_INITIALIZED | You need to properly [configure Adapty SDK](sdk-installation-android#configure-adapty-sdk)   by `Adapty.activate` method. |
| PRODUCT_NOT_FOUND | This error indicates that the product requested for purchase is not available in the store. |
| INVALID_JSON | <p>The local fallback paywall JSON is not valid.</p><p>Fix your default English paywall, after that replace invalid local paywalls. Refer to the [Customize paywall with remote config](customize-paywall-with-remote-config) topic for details on how to fix a paywall and to the [Define local fallback paywalls](fallback-paywalls) for details on how to replace the local paywalls.</p> |
| <p>CURRENT_SUBSCRIPTION_TO_UPDATE</p><p>\_NOT_FOUND_IN_HISTORY</p> | The original subscription that needs to be replaced is not found in active subscriptions. |
| [BILLING_SERVICE_TIMEOUT](https://developer.android.com/google/play/billing/errors#service_timeout_error_code_-3) | This error indicates that the request has reached the maximum timeout before Google Play can respond. This could be caused, for example, by a delay in the execution of the action requested by the Play Billing Library call. |
| [FEATURE_NOT_SUPPORTED](https://developer.android.com/reference/com/android/billingclient/api/BillingClient.BillingResponseCode#FEATURE_NOT_SUPPORTED()) | The requested feature is not supported by the Play Store on the current device. |
| [BILLING_SERVICE_DISCONNECTED](https://developer.android.com/google/play/billing/errors#service_disconnected_error_code_-1) | This error indicates that the client app’s connection to the Google Play Store service via the `BillingClient` has been severed. |
| [BILLING_SERVICE_UNAVAILABLE](https://developer.android.com/google/play/billing/errors#service_unavailable_error_code_2) | This error indicates the Google Play Billing service is currently unavailable. In most cases, this means there is a network connection issue anywhere between the client device and Google Play Billing services. |
| [BILLING_UNAVAILABLE](https://developer.android.com/google/play/billing/errors#billing_unavailable_error_code_3) | <p>This error indicates that a user billing error occurred during the purchase process. Examples of when this can occur include:</p><p></p><p>1\. The Play Store app on the user's device is out of date.</p><p>2. The user is in an unsupported country.</p><p>3. The user is an enterprise user, and their enterprise admin has disabled users from making purchases.</p><p>4. Google Play is unable to charge the user’s payment method. For example, the user's credit card might have expired.</p> |
| [DEVELOPER_ERROR](https://developer.android.com/google/play/billing/errors#developer_error) | This error indicates you're improperly using an API. |
| [BILLING_ERROR](https://developer.android.com/google/play/billing/errors#error_error_code_6) | This error indicates an internal problem with Google Play itself. |
| [ITEM_ALREADY_OWNED](https://developer.android.com/reference/com/android/billingclient/api/BillingClient.BillingResponseCode#ITEM_ALREADY_OWNED()) | The product has already been purchased. |
| [ITEM_NOT_OWNED](https://developer.android.com/reference/com/android/billingclient/api/BillingClient.BillingResponseCode#ITEM_NOT_OWNED()) | This error indicates that the requested action on the item failed since it is not owned by the user. |
| [BILLING_NETWORK_ERROR](https://developer.android.com/google/play/billing/errors#network_error_error_code_12) | This error indicates that there was a problem with the network connection between the device and Play systems. |
| NO_PRODUCT_IDS_FOUND | <p>This error indicates that none of the products in the paywall is available in the store.</p><p>If you are encountering this error, please follow the steps below to resolve it:</p><p></p><p>1. Check if all the products have been added to Adapty Dashboard.</p><p>2. Ensure that the Package name of your app matches the one from the Google Play Console.</p><p>3. Verify that the product identifiers from the app stores match with the ones you have added to the Dashboard. Please note that the identifiers should not contain Bundle ID, unless it is already included in the store.</p><p>4. Confirm that the app paid status is active in your Google tax settings. Ensure that your tax information is up-to-date and your certificates are valid.</p><p>5. Check if a bank account is attached to the app, so it can be eligible for monetization.</p><p>6. Check if the products are available in all regions.Also, ensure that your products are in **“Ready to Submit”** state.</p> |
| NO_PURCHASES_TO_RESTORE | This error indicates that Google Play did not find the purchase to restore. |
| AUTHENTICATION_ERROR | You need to properly [configure Adapty SDK](sdk-installation-android#configure-adapty-sdk)  by `Adapty.activate` method. |
| BAD_REQUEST | Bad request. |
| SERVER_ERROR | Server error. |
| REQUEST_FAILED | This error indicates a network issue that cannot be properly defined. |
| DECODING_FAILED | We could not decode the response. |
| ANALYTICS_DISABLED | We can't handle analytics events, since you've opted it out. |
| WRONG_PARAMETER | This error indicates that some of your parameters are not correct: blank when it cannot be blank or wrong type, etc. |