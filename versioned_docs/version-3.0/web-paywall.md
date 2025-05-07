---
title: "Web paywall"
description: "Set up a web paywall to get paid without the App Store fees and audits."
metadataTitle: "Accept payments in web for iOS apps in the US"
---
import Zoom from 'react-medium-image-zoom';

:::important
Before you begin, make sure you have installed Adapty SDK version 3.6.0 or later.
:::

With Adapty, you can create a web paywall that redirects your users to their browser for payment and then brings them back to your app with the subscription activated.
This allows you to bypass App Store fees and audits while effectively tracking user payments.

:::tip
The App Store allows external payment options only in the USA. 

To use a paywall exclusively for the US market, duplicate your current paywall and establish a web paywall. This way, you will have two almost identical paywalls in use: one for the US and another for everybody else.
:::

## How it works

For web paywalls, each placement is a unique URL that allows users to go to the browser and pay there.

1. You **configure how the web paywall page will look** and work in the editor.
2. You **link the web paywall** in the paywall settings.
3. In your app paywall, you **add a button** redirecting users to the browser.
4. Once users tap the button, Adapty SDK **generates a unique URL** associating the paywall page with the placement.
5. Users **go to the web paywall page** and **pay** for a subscription using an external payment method.
6. When they return to the app, Adapty SDK starts **tracking whether the profile has been updated** because of the purchases made.

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
3. Set up how the paywall page will look and connect a payment method.
   <Zoom>
   <img src={require('./img/web-paywall-2.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
4. Publish the paywall and copy its link from the web paywall list.
5. Return to the **Web paywall** page and paste the paywall link.
6. Click **Save**.
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

## Step 2. Activate the paywall

To use your web paywall, you need to activate it, and the way you do it depends on your setup:

- If you are using the Paywall created in the Builder, you only need to [add a new button](#step-2a-add-a-web-purchase-button) that will use the link you've provided to track purchases and send the data back to Adapty.
- If you are using the SDK, you must set up the [`openWebPaywall`](#step-2b-set-up-the-sdk-method) method to handle web paywalls.


### Step 2a. Add a web purchase button

If you are using the paywall from the Builder, you need to add a web paywall button. The button will use the link you've provided to track purchases and send the data back to Adapty.

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

### Step 2b. Set up the SDK method

The `.openWebPaywall` method:
1. Generates a unique URL allowing Adapty to link a specific paywall shown to a particular user to the web page they are redirected to.
2. Track when your users return to the app and then request `.getProfile` at short intervals to determine whether the profile access rights have been updated. 

This way, if the payment has been successful and access rights have been updated, the subscription activates in the app almost immediately.

```swift showLineNumbers title="Swift"
do {
    try await Adapty.openWebPaywall(for: product)
} catch {
    print("Failed to open web paywall: \(error)")
}
```
:::note
There are two versions of the `openWebPaywall` method:
1. `openWebPaywall(product)` that generates URLs by paywall and adds the product data to URLs as well.
2. `openWebPaywall(paywall)` that generates URLs by paywall without adding the product data to URLs.
The first version is the recommended one, but, although you send the product data, it doesn't affect how your paywall works.
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
        guard let paywall = paywall else { return }
        Task {
            await offerWebPurchase(for: paywall.products.first!)
        }
    }
    
    func offerWebPurchase(for paywallProduct: AdaptyPaywallProduct) async {
        do {
            // Attempt to open web paywall
            try await Adapty.openWebPaywall(for: product)
            
            // When user returns, update the UI if the subscription status has changed
            Task {
                do {
                    let profile = try await Adapty.getProfile()
                    // Check if purchase was successful
                    updateUIBasedOnSubscriptionStatus(profile)
                } catch {
                    print("Failed to refresh profile: \(error)")
                }
            }
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
    private func updateUIBasedOnSubscriptionStatus(_ profile: AdaptyProfile) { /* ... */ }
}
```

## Step 3. Set up a placement

Since web paywalls are only allowed for iOS apps in the USA, set up a separate user segment for the USA and add a placement to target different paywalls at different segments:

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