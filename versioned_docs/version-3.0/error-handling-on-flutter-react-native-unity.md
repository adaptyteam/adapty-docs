---
title: "Flutter, React Native, Unity - Handle errors"
description: "Discover how to streamline error management in Fluter, React Native, and Unity development with Adapty SDK's AdaptyError, providing detailed troubleshooting capabilities for comprehensive error handling"
metadataTitle: "Fluter, React Native, and Unity Error Handling: AdaptyError Overview"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Every error is returned by the SDK is `AdaptyErrorCode`. Here is an example:

<Tabs>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
    try {
      final result = await adapty.makePurchase(product: product);
    } on AdaptyError catch (adaptyError) {
      if (adaptyError.code == AdaptyErrorCode.paymentCancelled) {
        // Cancelled
      }
    } catch (e) {
    }
```
</TabItem>
<TabItem value="Unity" label="Unity" default>
```csharp 
Adapty.MakePurchase(product, (profile, error) => {
  if (error != null && error.Code == Adapty.ErrorCode.PaymentCancelled) {
      // payment cancelled
  }
});
```

</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
  const params: MakePurchaseParamsInput = {};
  await adapty.makePurchase(product, params);
} catch (error) {
  if (
    error instanceof AdaptyError &&
    error.adaptyCode === getErrorCode(ErrorCode['2'])
  ) {
    // payment cancelled
  }
}
```
</TabItem>
</Tabs>

##  System StoreKit codes

| Error | Code | Description |
|-----|----|-----------|
| unknown | 0 | This error indicates that an unknown or unexpected error occurred. |
| clientInvalid | 1 | This error code indicates that the client is not allowed to perform the attempted action. |
| paymentCancelled | 2 | <p>This error code indicates that the user canceled a payment request.</p><p>No action is required, but in terms of the business logic, you can offer a discount to your user or remind them later.</p> |
| paymentInvalid | 3 | This error indicates that one of the payment parameters was not recognized by the store. |
| paymentNotAllowed | 4 | <p>This error code indicates that the user is not allowed to authorize payments. Possible reasons:</p><p></p><p>- Payments are not supported in the user's country.</p><p>- The user is a minor.</p> |
| storeProductNotAvailable | 5 | This error code indicates that the requested product is absent from the App Store. Make sure the product is available for the used country. |
| cloudServicePermissionDenied | 6 | This error code indicates that the user has not allowed access to Cloud service information. |
| cloudServiceNetworkConnectionFailed | 7 | This error code indicates that the device could not connect to the network. |
| cloudServiceRevoked | 8 | This error code indicates that the user has revoked permission to use this cloud service. |
| privacyAcknowledgementRequired | 9 | This error code indicates that the user has not yet acknowledged the store privacy policy. |
| unauthorizedRequestData | 10 | This error code indicates that the request is built incorrectly. |
| invalidOfferIdentifier | 11 | <p>The offer identifier is not valid. Possible reasons:</p><p></p><p>- You have not set up an offer with that identifier in the App Store.</p><p>- You have revoked the offer.</p><p>- You misprinted the offer ID.</p> |
| invalidSignature | 12 | This error code indicates that the signature in a payment discount is not valid. Make sure you've filled out the **In-app purchase Key ID**  field and uploaded the **In-App Purchase Private Key** file. Refer to the [Configure App Store integration](app-store-connection-configuration) topic for details. |
| missingOfferParams | 13 | <p>This error indicates issues with Adapty integration or with offers.</p><p>Refer to the [Configure App Store integration](app-store-connection-configuration)  and to [Offers](offers)  for details on how to set them up.</p> |
| invalidOfferPrice | 14 | This error code indicates that the price you specified in the store is no longer valid. Offers must always represent a discounted price. |


## Custom Android codes

| Error | Code | Description |
|-----|----|-----------|
| adaptyNotInitialized | 20 | You need to properly configure Adapty SDK by `Adapty.activate` method. Learn how to do it [for React Native](/2.0/sdk-installation-reactnative#configure-adapty-sdks). |
| productNotFound | 22 | This error indicates that the product requested for purchase is not available in the store. |
| invalidJson | 23 | The paywall JSON is not valid. Fix it in the Adapty Dashboard. Refer to the [Customize paywall with remote config](customize-paywall-with-remote-config)  topic for details on how to fix it. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | The original subscription that needs to be renewed is not found. |
| pendingPurchase | 25 | This error indicates that the purchase state is pending rather than purchased. Refer to the [Handling pending transactions](https://developer.android.com/google/play/billing/integrate#pending)  page in the Android Developer docs for details. |
| billingServiceTimeout | 97 | This error indicates that the request has reached the maximum timeout before Google Play can respond. This could be caused, for example, by a delay in the execution of the action requested by the Play Billing Library call. |
| featureNotSupported | 98 | The requested feature is not supported by the Play Store on the current device. |
| billingServiceDisconnected | 99 | This fatal error indicates that the client app’s connection to the Google Play Store service via the `BillingClient` has been severed. |
| billingServiceUnavailable | 102 | This transient error indicates the Google Play Billing service is currently unavailable. In most cases, this means there is a network connection issue anywhere between the client device and Google Play Billing services. |
| billingUnavailable | 103 | <p>This error indicates that a user billing error occurred during the purchase process. Examples of when this can occur include:</p><p></p><p>1\. The Play Store app on the user's device is out of date.</p><p>2. The user is in an unsupported country.</p><p>3. The user is an enterprise user, and their enterprise admin has disabled users from making purchases.</p><p>4. Google Play is unable to charge the user’s payment method. For example, the user's credit card might have expired.</p> |
| developerError | 105 | This is a fatal error that indicates you're improperly using an API. |
| billingError | 106 | This is a fatal error that indicates an internal problem with Google Play itself. |
| itemAlreadyOwned | 107 | The consumable product has already been purchased. |
| itemNotOwned | 108 | This error indicates that the requested action on the item failed sin |


## Custom StoreKit codes

| Error | Code | Description |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>This error indicates that none of the products in the paywall is available in the store.</p><p>If you are encountering this error, please follow the steps below to resolve it:</p><p></p><p>1. Check if all the products have been added to Adapty Dashboard.</p><p>2. Ensure that the Bundle ID of your app matches the one from the Apple Connect.</p><p>3. Verify that the product identifiers from the app stores match with the ones you have added to the Dashboard. Please note that the identifiers should not contain Bundle ID, unless it is already included in the store.</p><p>4. Confirm that the app paid status is active in your Apple tax settings. Ensure that your tax information is up-to-date and your certificates are valid.</p><p>5. Check if a bank account is attached to the app, so it can be eligible for monetization.</p><p>6. Check if the products are available in all regions.Also, ensure that your products are in **“Ready to Submit”** state.</p> |
| productRequestFailed | 1002 | <p>Unable to fetch available products at the moment. Possible reason:</p><p></p><p>- No cache was yet created and no internet connection at the same time.</p> |
| cantMakePayments | 1003 | In-App purchases are not allowed on this device. |
| noPurchasesToRestore | 1004 | This error indicates that Google Play did not find the purchase to restore. |
| cantReadReceipt | 1005 | <p>There is no valid receipt available on the device. This can be an issue during sandbox testing.</p><p>No action is required, but in terms of the business logic, you can offer a discount to your user or remind them later.</p> |
| productPurchaseFailed | 1006 | Product purchase failed. |
| refreshReceiptFailed | 1010 | This error indicates that the receipt was not received. Applicable to StoreKit 1 only. |
| receiveRestoredTransactionsFailed | 1011 | Purchase restoration failed. |


## Custom network codes

| Error                | Code    | Description                                                  |
| :------------------- | :------ | :----------------------------------------------------------- |
| notActivated         | 2002    | You need to properly configure Adapty SDK by `Adapty.activate` method. Learn how to do it [for React Native](/2.0/sdk-installation-reactnative#configure-adapty-sdks). |
| badRequest           | 2003    | Bad request.                                                 |
| serverError          | 2004    | Server error.                                                |
| networkFailed        | 2005    | The network request failed.                                  |
| decodingFailed       | 2006    | This error indicates that response decoding failed.          |
| encodingFailed       | 2009    | This error indicates that request encoding failed.           |
| analyticsDisabled    | 3000??? | We can't handle analytics events, since you've opted it out. Refer to the [Analytics integration](analytics-integration) topic for details. |
| wrongParam           | 3001    | This error indicates that some of your parameters are not correct: blank when it cannot be blank or wrong type, etc. |
| activateOnceError    | 3005    | It is not possible to call `.activate` method more than once. |
| profileWasChanged    | 3006    | The user profile was changed during the operation.           |
| fetchTimeoutError    | 3101    | This error means that the paywall could not be fetched within the set limit. To avoid this situation, [set up local fallbacks](fetch-paywalls-and-products). |
| operationInterrupted | 9000    | This operation was interrupted by the system.                |