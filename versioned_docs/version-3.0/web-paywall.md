---
title: "Web paywall"
description: "Set up a web paywall to get paid without the App Store fees and audits."
metadataTitle: "Accept payments in web for iOS apps in the US"
keywords: ['web', 'web paywalls']
---
import Zoom from 'react-medium-image-zoom';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::important
Before you begin, make sure you have installed Adapty SDK version 3.6.1 or later.
:::

With Adapty, you can create a paywall with a button that redirects your iOS app users to Safari for payment. Then, when they return to your app after a successful purchase, the subscription activates.
This allows you to bypass App Store fees while effectively tracking user payments.

   <Zoom>
   <img src={require('./img/web_paywall.gif').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

:::tip
The App Store allows external payment options only in the USA. 

To use a paywall exclusively for the US market, duplicate your current paywall and set up a web paywall. This way, you will have two almost identical paywalls in use: one for the US and another for everybody else.
:::

## How it works

Web paywall is a unique URL for each of your in-app paywalls. It allows users to go to the browser and pay there.  It works with different payment providers (Stripe, Paddle, and others) and allows you to have either a single page with an Apple Pay button or more complex flows with upsells.

   <Zoom>
   <img src={require('./img/web-paywall-promo.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

Web paywalls work in the following way:
1. You **configure how the web paywall page will look** and work in the editor.
2. You **link the web paywall** in the paywall settings.
3. In your app paywall, you **add a button** redirecting users to the browser.
4. Once users tap the button, Adapty SDK **generates a unique URL**.
5. Users **go to the web paywall page** and **pay** for a subscription using an external payment method.
6. When they return to the app, Adapty SDK starts **tracking whether the profile has been updated** because of the purchases made.
7. Adapty gets information about the purchase event, records it as an analytics event, and monitors it for any updates. 

## Step 1. Create a web paywall

1. If you want to enable external payments for an existing paywall, you need to [duplicate](duplicate-paywalls.md) it so you can show it only to your U.S. user segment and show the old one to all the other users. If you want to start from scratch, [create](create-paywall.md) a new paywall.
2. In the Paywall, switch to the **Web paywall** tab and click **Create web paywall**. You will be redirected to a new page.   
   <Zoom>
   <img src={require('./img/web-paywall-1.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
3. Set up the web paywall itself and connect a payment method.
:::tip
Use our [quickstart guide](web-paywall-configuration.md) that will help you to launch a working web paywall.
:::
4. Return to the **Web paywall** page and paste the paywall link.
:::important
When launching your paywall to the production environment, it is **crucial** to ensure you use the correct link generated after publishing your web paywall. The link format is `paywalls-....fnlfx.com`.
:::
5. Click **Save**.
   <Zoom>
   <img src={require('./img/web-paywall-4.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

## Step 2. Trigger the paywall {#activate-the-paywall}

To use your web paywall, you need to trigger it, and the way you do it depends on your setup:

- If you are using the Paywall created in the Builder, you only need to [add a new button](#step-2a-add-a-web-purchase-button) that will use the link you've provided to track purchases and send the data back to Adapty.
- If you are using the SDK, you must set up the [`openWebPaywall`](#step-2b-set-up-the-sdk-method) method to handle web paywalls.


### Step 2a. Add a web purchase button

If you are using the **paywall from the Builder**, you need to add a web paywall button. The button will use the link you've provided to track purchases and send the data back to Adapty.

1. Open the paywall and switch to the **Builder** tab.
2. Click **Add element** and select **Web paywall button**. 
   
   If you are using a template or an existing/duplicated paywall, add the web paywall button you just added to the previous purchase button.
   You can set up the web paywall button just as you would the purchase button. 

<Zoom>
   <img src={require('./img/web-paywall-5.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

### Step 2b. Call the SDK method

If you are working with a paywall you developed yourself, you need to handle web paywalls using the SDK method. The `.openWebPaywall` method:
1. Generates a unique URL allowing Adapty to link a specific paywall shown to a particular user to the web page they are redirected to.
2. Tracks when your users return to the app and then requests `.getProfile` at short intervals to determine whether the profile access rights have been updated. 

This way, if the payment has been successful and access rights have been updated, the subscription activates in the app almost immediately.

<Tabs groupId="code-examples" queryString>
<TabItem value="swift" label="Swift" default>
```swift showLineNumbers title="Swift"
do {
    try await Adapty.openWebPaywall(for: product)
} catch {
    print("Failed to open web paywall: \(error)")
}
```
</TabItem>
<TabItem value="rn" label="React Native">
```javascript showLineNumbers title="React Native"
try {
    await adapty.openWebPaywall(product);
    // The web paywall for the product is now opened
    } catch (error) {
    // handle the error
}
```
</TabItem>
<TabItem value="flutter" label="Flutter">
```dart showLineNumbers title="Flutter"
try {
  await Adapty().openWebPaywall(product: <YOUR_PRODUCT>);
  // The web paywall will be opened
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
  // handle other errors
}
```

</TabItem>
<TabItem value="kmp" label="Kotlin Multiplatform">
```kotlin showLineNumbers title="Kotlin Multiplatform"
import com.adapty.kmp.Adapty
import com.adapty.kmp.models.AdaptyError

// Using suspend function with Result
val result: AdaptyResult<Unit> = Adapty.openWebPaywall(product = product)
when (result) {
    is AdaptyResult.Success -> {
        // Web paywall opened successfully
    }
    is AdaptyResult.Error -> {
        // Handle error
        when (result.error.code) {
            AdaptyError.Code.PAYWALL_WITHOUT_PURCHASE_URL -> {
                // Paywall doesn't have web purchase URL configured
            }
            AdaptyError.Code.PRODUCT_WITHOUT_PURCHASE_URL -> {
                // Product doesn't have web purchase URL
            }
            AdaptyError.Code.FAILED_OPENING_WEB_PAYWALL_URL -> {
                // Failed to open URL in browser
            }
            AdaptyError.Code.FAILED_DECODING_WEB_PAYWALL_URL -> {
                // Failed to encode parameters in URL
            }
        }
    }
}

// Using callback-based approach
Adapty.openWebPaywall(
    product = product,
    onError = { error ->
        error?.let { adaptyError ->
            when (adaptyError.code) {
                AdaptyError.Code.PAYWALL_WITHOUT_PURCHASE_URL -> {
                    // Paywall doesn't have web purchase URL configured
                }
                AdaptyError.Code.PRODUCT_WITHOUT_PURCHASE_URL -> {
                    // Product doesn't have web purchase URL
                }
                AdaptyError.Code.FAILED_OPENING_WEB_PAYWALL_URL -> {
                    // Failed to open URL in browser
                }
                AdaptyError.Code.FAILED_DECODING_WEB_PAYWALL_URL -> {
                    // Failed to encode parameters in URL
                }
            }
        }
    }
)
```
</TabItem>
</Tabs>


:::note
There are two versions of the `openWebPaywall` method:
1. `openWebPaywall(product)` that generates URLs by paywall and adds the product data to URLs as well.
2. `openWebPaywall(paywall)` that generates URLs by paywall without adding the product data to URLs. Use it when your products in the Adapty paywall differ from those in the web paywall.
:::

#### Handle errors

| Error                                   | Description                                            | Recommended action                                                        |
|-----------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------------|
| AdaptyError.paywallWithoutPurchaseUrl   | The paywall doesn't have a web purchase URL configured | Check if the paywall has been properly configured in the Adapty Dashboard |
| AdaptyError.productWithoutPurchaseUrl   | The product doesn't have a web purchase URL            | Verify the product configuration in the Adapty Dashboard                  |
| AdaptyError.failedOpeningWebPaywallUrl  | Failed to open the URL in the browser                  | Check device settings or provide an alternative purchase method           |
| AdaptyError.failedDecodingWebPaywallUrl | Failed to properly encode parameters in the URL        | Verify URL parameters are valid and properly formatted                    |

#### Implementation example
```swift showLineNumbers title="Swift"
class SubscriptionViewController: UIViewController {
    var paywall: AdaptyPaywall?
    
    @IBAction func purchaseButtonTapped(_ sender: UIButton) {
        guard let paywall = paywall, let product = paywall.products.first else { return }
         Task {
            await offerWebPurchase(for: product)
         }
    }
    
    func offerWebPurchase(for paywallProduct: AdaptyPaywallProduct) async {
        do {
            // Attempt to open web paywall
            try await Adapty.openWebPaywall(for: product)
        } catch let error as AdaptyError {
            
            switch error {
            case .paywallWithoutPurchaseUrl, .productWithoutPurchaseUrl:
                showAlert(message: "Web purchase is not available for this product.")
            case .failedOpeningWebPaywallUrl:
                showAlert(message: "Could not open web browser. Please try again.")
            default:
                showAlert(message: "An error occurred: \(error.localizedDescription)")
            }
        } catch {
            showAlert(message: "An unexpected error occurred.")
        }
    }
    
    // Helper methods
    private func showAlert(message: String) { /* ... */ }
}
```
:::note
After users return to the app, refresh the UI to reflect the profile updates. `AdaptyDelegate` will receive and process profile update events.
:::

## Step 3. Set up a placement

Since web paywalls are only allowed for iOS apps in the USA, add a separate user segment for the USA and set up a placement to target different paywalls at different segments:

1. [Create a new segment](segments.md) that will have the following attributes:
   - **Country from store account**: United States
   - **Platform**: iOS and iPadOS
   - **App version**: The latest one that uses our SDK version 3.6.0 or later.
     <Zoom>
     <img src={require('./img/web-paywall-6.png').default}
     style={{
     border: '1px solid #727272', /* border width and color */
     width: '700px', /* image width */
     display: 'block', /* for alignment */
     margin: '0 auto' /* center alignment */
     }}
     />
     </Zoom>
2. [Create](create-placement.md) a placement or [edit](edit-placement.md) an existing one. [Add a new audience](add-audience-paywall-ab-test.md) with the web paywall and the segment created.
   <Zoom>
   <img src={require('./img/web-paywall-7.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>