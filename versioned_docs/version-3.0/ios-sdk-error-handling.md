---
title: "iOS - Handle errors"
description: "Handle iOS SDK errors efficiently with Adapty’s troubleshooting guide."
metadataTitle: "iOS SDK Error Handling Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty SDK has its own wrapper for all kinds of errors, called `AdaptyError`. Basically, every error returned by an SDK is `AdaptyError`. It has two useful properties: `originalError` and `adaptyErrorCode`, described below.

**originalError** contains an original error in case you need the original one to work with. Can be [SKError](https://developer.apple.com/documentation/storekit/skerror), [NSError](https://developer.apple.com/documentation/foundation/nserror) or just general Swift [Error](https://developer.apple.com/documentation/swift/error). This property is optional since some errors can be generated directly by SDK, like inconsistent or missing data, and won't have the original error around which the wrapper was initially built.

**adaptyErrorCode** can be used to handle common issues, like:

- invalid credentials
- network errors
- cancelled payments
- billing issues
- invalid receipt
- and much more

It's pretty easy to check the error for specific codes and react to them accordingly.

```swift showLineNumbers title="Swift"
do {
    let info = try await Adapty.makePurchase(product: product)
} catch {
    if error.adaptyErrorCode == .paymentCancelled {
        // purchase was cancelled
        // you can offer discount to your user or remind them later
    }
}
```

## StoreKit errors

| Error | Code | Description |
|-----|----|-----------|
| [unknown](https://developer.apple.com/documentation/storekit/skerror/code/unknown) | 0 | Error code indicating that an unknown or unexpected error occurred. |
| [clientInvalid](https://developer.apple.com/documentation/storekit/skerror/code/clientinvalid) | 1 | This error code indicates that the client is not allowed to perform the attempted action. |
| [paymentCancelled](https://developer.apple.com/documentation/storekit/skerror/code/paymentcancelled) | 2 | <p>This error code indicates that the user canceled a payment request.</p><p>No action is required, but in terms of the business logic, you can offer a discount to your user or remind them later.</p> |
| [paymentInvalid](https://developer.apple.com/documentation/storekit/skerror/code/paymentinvalid) | 3 | This error indicates that one of the payment parameters was not recognized by the App Store. |
| [paymentNotAllowed](https://developer.apple.com/documentation/storekit/skerror/code/paymentnotallowed) | 4 | This error code indicates that the user is not allowed to authorize payments. |
| [storeProductNotAvailable](https://developer.apple.com/documentation/storekit/skerror/code/storeproductnotavailable) | 5 | This error code indicates that the requested product is not available in the store. |
| [cloudServicePermissionDenied](https://developer.apple.com/documentation/storekit/skerror/code/cloudservicepermissiondenied) | 6 | This error code indicates that the user has not allowed access to Cloud service information. |
| [cloudServiceNetworkConnectionFailed](https://developer.apple.com/documentation/storekit/skerror/code/cloudservicenetworkconnectionfailed) | 7 | This error code indicates that the device could not connect to the network. |
| [cloudServiceRevoked](https://developer.apple.com/documentation/storekit/skerror/code/cloudservicerevoked/) | 8 | This error code indicates that the user has revoked permission to use this cloud service. |
| [privacyAcknowledgementRequired](https://developer.apple.com/documentation/storekit/skerror/code/privacyacknowledgementrequired) | 9 | This error code indicates that the user has not yet acknowledged Apple’s privacy policy. |
| [unauthorizedRequestData](https://developer.apple.com/documentation/storekit/skerror/code/unauthorizedrequestdata) | 10 | This error code indicates that the app is attempting to use a property for which it does not have the required entitlement. |
| [invalidOfferIdentifier](https://developer.apple.com/documentation/storekit/skerror/code/invalidofferidentifier) | 11 | <p>The offer [`identifier`](https://developer.apple.com/documentation/storekit/skpaymentdiscount/3043528-identifier)   is not valid. For example, you have not set up an offer with that identifier in the App Store, or you have revoked the offer.</p><p>Make sure you set up desired offers in AppStore Connect and pass a valid offer identifier.</p> |
| [invalidSignature](https://developer.apple.com/documentation/storekit/skerror/code/invalidsignature) | 12 | This error code indicates that the signature in a payment discount is not valid. |
| [missingOfferParams](https://developer.apple.com/documentation/storekit/skerror/code/missingofferparams) | 13 | This error code indicates that parameters are missing in a payment discount. |
| [invalidOfferPrice](https://developer.apple.com/documentation/storekit/skerror/code/invalidofferprice/) | 14 | This error code indicates that the price you specified in App Store Connect is no longer valid. Offers must always represent a discounted price. |
| noProductIDsFound | 1000 | <p>This error indicates that none of the products you requested on the paywall are available for purchase in the App Store, even though they’re listed there. This error may sometimes come with an `InvalidProductIdentifiers` warning. If the warning appears without an error, ignore it.</p><p>If you’re encountering this error, follow the steps in the [Fix for Code-1000 `noProductIDsFound` error](https://dev-docs.adapty.io/docs/InvalidProductIdentifiers) section.</p> |
| noProductsFound | 1001 | This error indicates that the product requested for purchase is not available in the store. |
| productRequestFailed | 1002 | Unable to fetch available products at the moment. |
| cantMakePayments | 1003 | In-app purchases are not allowed on this device. |
| noPurchasesToRestore | 1004 | This error indicates that Google Play did not find the purchase to restore. |
| [cantReadReceipt](https://developer.apple.com/documentation/storekit/skerror/code/paymentcancelled) | 1005 | <p>There is no valid receipt available on the device. This can be an issue during sandbox testing.</p><p>In the sandbox, you won't have a valid receipt file until you actually make a purchase, so make sure you do one before accessing it. During sandbox testing also make sure you signed in on a device with a valid Apple sandbox account.</p> |
| productPurchaseFailed | 1006 | Product purchase failed. |
| missingOfferSigningParams | 1007 | <p>This error indicates issues with Adapty integration or with offers.</p><p>Refer to the [Configure App Store integration](app-store-connection-configuration) and to [Offers](offers) for details on how to set them up.</p> |


## Network errors

| Error          | Code | Description                                                                                                               |
| :------------- | :--- | :------------------------------------------------------------------------------------------------------------------------ |
| notActivated   | 2002 | You need to properly [configure Adapty SDK](sdk-installation-ios#configure-adapty-sdk)   by `Adapty.activate` method. |
| badRequest     | 2003 | Bad request.                                                                                                              |
| serverError    | 2004 | Server error.                                                                                                             |
| networkFailed  | 2005 | The error indicates issues with the network connection.                                                                   |
| decodingFailed | 2006 | This error indicates that response decoding failed.                                                                       |
| encodingFailed | 2009 | This error indicates that request encoding failed.                                                                        |
| missingURL     | 2010 | The requested URL is nil.                                                                                                 |

## General errors

| Error                | Code | Description                                                                                                                                    |
| :------------------- | :--- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| analyticsDisabled    | 3000 | We can't handle analytics events, since you've [opted it out](analytics-integration#disabling-external-analytics-for-a-specific-customer). |
| wrongParam           | 3001 | This error indicates that some of your parameters are not correct do match the constraints.                                                    |
| activateOnceError    | 3005 | It is not possible to call `.activate` method more than once.                                                                                  |
| profileWasChanged    | 3006 | The user profile was changed during the operation.                                                                                             |
| persistingDataError  | 3100 | It was an error while saving data.                                                                                                             |
| operationInterrupted | 9000 | This operation was interrupted by the system.                                                                                                  |

## Warnings

Warnings don’t need to be fixed unless they lead to errors. 

<!--- | Warning                   | Solution                                                     |
| ------------------------- | ------------------------------------------------------------ |
| InvalidProductIdentifiers | <p>This warning means that some products on the paywall are available in the store but aren’t ready for purchase. This usually happens if you haven’t completed the configuration of your products in the App Store.</p><p>If this doesn’t cause any errors, you can ignore the warning. However, if you want to remove it, follow the steps in the [Fix for Code-1000 `noProductIDsFound` error and `InvalidProductIdentifiers` warning](https://dev-docs.adapty.io/docs/InvalidProductIdentifiers) section.</p> |--->
| operationInterrupted | 9000 | This operation was interrupted by the system.                                                                                                  |