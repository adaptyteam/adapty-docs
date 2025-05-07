---
title: "Web paywall"
description: "Set up a web paywall to get paid without the App Store fees and audits."
metadataTitle: "Accept payments in web for iOS apps in the US"
---

With Adapty, you can create a web paywall that redirects your users to their browser for payment and then brings them back to your app with the subscription activated.
This allows you to bypass App Store fees and audits while effectively tracking user payments.

:::tip
The App Store allows external payment options only in the USA. Duplicate your current paywall and establish a web paywall to utilize the new paywall for the US market exclusively. For details, see [Step 3](#step-3-set-up-a-placement). 
:::

Before you begin, make sure you have installed Adapty SDK version 3.6.0 or later. 

## How it works

For web paywalls, each placement is a unique URL that allows users to go to the browser and pay there.

1. You configure how the web paywall page will look and work in the editor.
2. You link the web paywall in the paywall settings.
3. In your app paywall, you add a button redirecting users to the browser.
4. Once users tap the button, Adapty SDK generates a unique URL associating the paywall page with the placement.
5. Users go to the web paywall page and pay for a subscription using an external payment method.
6. When they return to the app, Adapty SDK gets information on whether the profile has been updated because of the purchases made.

## Step 1. Create a web paywall

1. If you want to enable external payments for an existing paywall, you need to [duplicate](duplicate-paywalls.md) it so you can show it only to your U.S. users. If you want to start from scratch, [create](create-paywall.md) a new paywall.
2. In the Paywall, switch to the **Web paywall** tab and click **Create web paywall**. You will be redirected to a new page.   
3. Set up how the paywall page will look and connect a payment method.
4. Publish the paywall and copy its link from the web paywall list.
5. Return to the **Web paywall** page and paste the paywall link.
6. Click **Save**. 

## Step 2. Activate the paywall

To use your web paywall, you need to activate it, and the way do it depends on your setup:

- If you are using the Paywall created in the Builder, you only need to [add a new button](#step-2a-add-a-web-purchase-button) that will use the link you've provided to track purchases and send the data back to Adapty.
- If you are using the SDK, you will need to [set up two methods to handle web paywalls](#step-2b-set-up-the-sdk-method):
  - `.createWebPaywallUrl` to create a web paywall URL for a specific user session.
  - `.openWebPaywall` to update the user profile based on the purchases made when they return to the app.


### Step 2a. Add a web purchase button

If you are using the paywall from the Builder, you need to add a web paywall button. The button will use the link you've provided to track purchases and send the data back to Adapty.

1. Open the paywall and switch to the **Builder** tab.
2. Click **Add element** and select **Web paywall button**. 
   If you are using a template or an existing/duplicated paywall, add the web paywall button you just added the previous purchase button .
   You can set up the web paywall button just as you would the purchase button. 

### Step 2b. Set up the SDK method

#### Create a web payment URL for the variation
Although you have already created a general URL, you need to set up a method called `.createWebPaywallUrl` that will allow Adapty to link a specific paywall shown to a particular user to the web page they are redirected to.

When creating web paywall URLs, Adapty SDK **automatically** adds the following parameters to ensure proper tracking and user experience:

| Parameter           | Description                                                 |
|---------------------|-------------------------------------------------------------|
| adapty_profile_id   | Unique identifier for the user's profile in Adapty's system |
| adapty_variation_id | Variation ID of the paywall                                 |

```swift showLineNumbers title="Swift"
do {
    let url = try await Adapty.createWebPaywallUrl(for: paywall)
} catch {
    print("Failed to create web paywall URL: \(error)")
}
```

:::note
You can call not only `.createWebPaywallUrl(paywall)` but also `.createWebPaywallUrl(product)` if you want to do it for a specific product.
:::

#### Update the user profile based on the purchases made
Use `.openWebPaywall` when you have the URL. 
This method will track when your users return to the app and then request `.getProfile` at short intervals to determine whether the profile access rights have been updated. 

This way, if the access rights have been updated, the subscription activates in the app almost immediately.

Implementation example:
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
            try await Adapty.openWebPaywall(for: paywallProduct)
            
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

1. [Create a new segment](segments.md) that will have the following settings:
   - **Country from store account**: United States
   - **Platform**: iOS
   - **App version**: The latest one that uses our SDK version 3.6.0 or later.
2. [Create](create-placement.md) a placement or [edit](edit-placement.md) an existing one. [Add a new audience](add-audience-paywall-ab-test.md) with the web paywall and the segment created.