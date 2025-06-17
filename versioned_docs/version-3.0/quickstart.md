---
title: "Quickstart guide"
description: "Quickstart guide to setting up Adapty for in-app subscription management."
metadataTitle: "Adapty Quickstart Guide | Adapty Docs"
keywords: ['install sdk', 'sdk install', 'install sdk ios']
rank: 70
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

We’re thrilled you’ve decided to use Adapty! We want you to get the best results from the very first build. This guide will walk you through how to get started with Adapty

After you sign up for Adapty and enter your mobile app's name and category, we’ll set up the app for you on the Adapty platform. Next, you’ll need to complete the initial integration with in-app purchase platforms.

## Configuring platforms

<Tabs groupId="current-os" queryString> 

<TabItem value="swift" label="App Store" default> 

In Adapty Dashboard, go to [App settings → iOS SDK](https://app.adapty.io/settings/ios-sdk) and fill in the fields using the instructions below. 

<Zoom>
  <img src={require('./img/qs.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

To find App Bundle ID, open [App Store Connect](https://appstoreconnect.apple.com/), go to **My Apps**, and select the app whose ID you need. On the app page, in the drop-down **More** menu, select **About this App**. The app ID is displayed in the **Bundle ID** field.  
– [How to connect to In-App Purchase API? →](generate-in-app-purchase-key)  
– [How to set URL for App Store Server Notifications? →](enable-app-store-server-notifications) 

</TabItem> 

<TabItem value="kotlin" label="Google Play" default> 
1. In Google Cloud Console, [enable Developer APIs](enabling-of-devepoler-api).
2. In Adapty Dashboard, go to [App settings→ Android SDK](https://app.adapty.io/settings/android-sdk) and fill in the fields.

<Zoom>
  <img src={require('./img/qs-Android_store_configuration.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

To find Package Name, open the [Google Play Developer Console](https://play.google.com/console/u/0/developers) and select the app whose ID you need. The ID is specified next to the app's name and logo.  
– [Where to find Service account key file? → ](create-service-account)  
– [Where to find Real-time Developer Notifications (RTDN)? →](enable-real-time-developer-notifications-rtdn)  

</TabItem> 

</Tabs>

## Installing Adapty SDK

<Tabs groupId="current-os" queryString> 

<TabItem value="swift" label="iOS" default> 

This tutorial will guide you through installing the Adapty SDK, configuring it within your project, and setting up a paywall to monetize your app effectively. We will use a sample project called *Movie Mania* as an example throughout this guide.

<div style={{ textAlign: 'center' }}>
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/n401moJDZjE?si=rDSRW_zwE0It22kc" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
  </iframe>
</div>

## Prerequisites

Before continuing with this tutorial, ensure you’ve done the following:

* Installed Xcode on your Mac
* Have a basic understanding of Swift and iOS development
* Set up an Adapty account with access to the Adapty dashboard
* Set up your app in App Store Connect with at least one in-app purchase configured
* Downloaded the starter project [here](https://github.com/ferrousguy/movie-mania)
  * The *main* branch of this repo contains the finished version of the project, which is perfect for referencing as we go along. If you’d rather follow along with the steps below, switch to the *starter* branch first.

## Installing the iOS Adapty SDK

1. Open Xcode and navigate to **File > Add Package Dependencies**.
2. In the Package Manager, enter the Adapty SDK  GitHub URL: `https://github.com/adaptyteam/AdaptySDK-iOS.git`
3. Select **adapty-sdk-iOS**, then click **Add Package**.
4. Ensure you add both **Adapty** and **Adapty UI**  package products to your project. Do this by choosing your target in the **Add to Target** column of this screen. Adapty contains all the base functionality of the SDK, and Adapty UI is used if you’ll be utilizing Paywall Builder.
5. After installation, you will see the Adapty SDK under the **Package Dependencies** section of your project’s properties.

## Configuring Adapty in Your Project

The following steps will set up your app to use the Adapty SDK.

1. Create a Swift file named `Constants.swift` in the sample project. This file is used to store constants used throughout the app. Add the following Adapty-related constants:

```swift title="Swift" showLineNumbers
struct AppConstants {
   struct Adapty {
       static let apiKey = "API key goes here"
       static let accessLevelID = "premium"
       static let placementID = "on_launch"
   }
}
```


​	Be sure to change the SDK key to your actual API key, found in the **app settings** screen of the Adapty dashboard.


2. Open the main app file (e.g., `MovieManiaApp.swift`) and import the Adapty frameworks:

```swift title="Swift" showLineNumbers
import Adapty
import AdaptyUI
```

3. Add an `init` function where you’ll configure and activate the Adapty SDK:

```swift title="Swift" showLineNumbers
init() {
   let configurationBuilder = AdaptyConfiguration.builder(withAPIKey: AppConstants.Adapty.apiKey)
   Task {
       do {
           try await Adapty.activate(with: configurationBuilder.build())
       } catch {
           print("Failed to activate Adapty SDK: \(error)")
       }
   }
}
```

The `activate` method is asynchronous and can fail. In the sample project we’re only doing the most basic error handling by printing the error should it occur. In a production app, you’ll want to have more comprehensive error handling.

## Creating an Adapty Helper

We’re going to create a type that will be used throughout the app as the single-source-of-truth on the user’s status as a paying customer and what access they have purchased. Hence its definition as an `ObservableObject` with published properties.

To manage Adapty interactions, create a new Swift file called `AdaptyHelper.swift` and store it in a folder called `Utilities`.
Reference the commented numbers for explanations of each section.

```swift title="Swift" showLineNumbers
import Foundation
import OSLog
// 1
import Adapty

final class AdaptyHelper: ObservableObject {
  // 2
  @Published var customerProfile: AdaptyProfile? {
    didSet {
      subscriptionActive = customerProfile?.accessLevels[AppConstants.Adapty.accessLevelID]?.isActive == true
    }
  }
  // 3
  @Published var subscriptionActive: Bool = false

  let logger = Logger(subsystem: "io.adapty.MovieMania", category: "Adapty Helper Service")

  // 4
  var activeAccessLevel: AdaptyProfile.AccessLevel? {
		if let customerProfile,
		   let accessLevel = customerProfile.accessLevels[AppConstants.Adapty.accessLevelID],
      accessLevel.isActive == true {
		  return accessLevel
    } else { return nil }
  }

  // 5
  @MainActor
  func refreshCustomerProfile() async throws {
    customerProfile = try await Adapty.getProfile()
  }

  // 6
  func wasPurchased(with result: AdaptyPurchaseResult) {
    switch result {
      case .success(let profile, _):
        customerProfile = profile
      default:
        break
    }
  }

  // 7
  func wasRestored(with profile: AdaptyProfile) {
    customerProfile = profile
  }
}

// 8
extension AdaptyHelper: AdaptyDelegate {
  func didLoadLatestProfile(_ profile: AdaptyProfile) {
		customerProfile = profile
  }
}
```

1. Importing the Adapty framework is required in any file where you want to reference types or functionality from it.
2. The `AdaptyProfile` is the basis of understanding for your user and what access they may have paid for. This property will be updated periodically and the `didSet` will ensure that the `subscriptionActive` boolean is always up to date.
3. This boolean is really a convenience to allow you to check in other parts of your code if the user has subscribed without having to inspect the profile. It is set by the `didSet` on the previous property.
4. The `activeAccessLevel` boolean provides the current active access level, if available. Like the boolean above, this is a convenience property to avoid having to inspect the profile object.
5. The `refreshCustomerProfile` function is useful to run in your code whenever you’re about to provide access to paid features within your app. The Adapty SDK periodically refreshes the customer profile anyway, but it is good practice to run this function before providing premium feature access to ensure the user’s subscription is active.
6. The `wasPurchased(with:)` function should be run whenever you receive a successful purchase event from the Adapty SDK. In this project, the only purpose is to update the profile which contains information about the user’s new access level, but you could also have this function perform other duties to prepare the app for providing a premium experience to your user.
7. The `wasRestored(with:)` function is similar to the above, but used when a user initiates a restoration of previously purchased functionality. Use it the same way as item 6.
8. A type within your app needs to act as a delegate for the Adapty SDK so events that happen outside the context of your app can be processed (like the user purchasing a subscription from the App Store, or a updated profile being loaded). In this project, the `AdaptyHelper` acts in this capacity, and the function listed here allows profile refreshes to update the official profile stored as a published property.

In `MovieManiaApp.swift`, create an instance of `AdaptyHelper` and inject it into the environment. Also, assign this property as the delegate of the Adapty SDK:

```swift title="Swift" showLineNumbers
@ObservedObject private var adaptyHelper = AdaptyHelper()
...

init() {
   ...
   Adapty.delegate = adaptyHelper
   ...
}

var body: some Scene {
   WindowGroup {
       ContentView()
           .environmentObject(adaptyHelper)
           ...
   }
}
```

## Displaying a Paywall

Add the following to `ContentView.swift`:

```swift title="Swift" showLineNumbers
...
// 1
import Adapty
import AdaptyUI

struct ContentView: View {
	...
	// 2
	@EnvironmentObject var adaptyHelper: AdaptyHelper
	...
	// 3
	@State private var isPresentingPaywall: Bool = false
	@State private var paywallConfig: AdaptyUI.PaywallConfiguration?
	
	var body: some View {
		List {
			...
		}
		...
		// 5
		.iflet(paywallConfig) { view, unwrappedPaywallConfig in
			// 6
			view.paywall(
				// 7
				isPresented: $isPresentingPaywall,
				fullScreen: false,
				paywallConfiguration: unwrappedPaywallConfig,
				didFinishPurchase: { product, purchaseResult in
					// 8
					adaptyHelper.wasPurchased(with: purchaseResult)
					isPresentingPaywall = false
				},
				didFailPurchase: { _, error in
					// 10
					isPresentingPaywall = false
					// present error to user and offer alternative
				},
				didFinishRestore: { profile in
					// 9
					adaptyHelper.wasRestored(with: profile)
					isPresentingPaywall = false
				},
				didFailRestore: { error in
					// 10
					isPresentingPaywall = false
					// present error to user and offer alternative
				},
				didFailRendering: { error in
					// 10
					isPresentingPaywall = false
					// present error to user and offer alternative
				}
			)
		}
		// 4
		.task {
			do {
				let paywall = try await Adapty.getPaywall(placementId: AppConstants.Adapty.Placement.onLaunch)
				paywallConfig = try await AdaptyUI.getPaywallConfiguration(forPaywall: paywall)
				isPresentingPaywall = true
			} catch {
				logger.error("Error fetching paywall or paywall config: \(error.localizedDescription)")
			}
		}   
	}
}
```

1. Import the necessary frameworks.
2. Access the `AdaptyHelper` from the environment.
3. Track the presentation boolean for the paywall modal and the paywall configuration objects with `@State` properties.
4. This async task will be used to fetch the appropriate paywall data from the Adapty servers for display to the user.
   * First use the `getPaywall(placementId:)` function to fetch the paywall object based on the placement ID. You can use the constants we created earlier to make this easier to find and avoid having stringly typed magic values placed throughout your code.
   * Next, use the paywall object to fetch a paywall configuration with the `getPaywallConfiguration(forPaywall:)` function. You’ll need to persist this object for actually displaying the paywall view, so store it in the previously defined state variable.
   * In this example, we want to display the paywall as soon as it is ready, so lastly, we flip the boolean to true on `isPresentingPaywall`.
   * Note: Both of the above calls are asynchronous and can fail, so we do basic error logging to the console, but in a production app, you’d want to perform more comprehensive error handling.
5. The call to present the paywall on a SwiftUI view requires a paywall configuration object, but the view will not have one until the async task from the above step runs, and it may not receive one at all if the calls within were to fail. Thus we need a way to only apply the paywall view modifier if the config object optional is unwrapped and found to be an honest value. This `.iflet` custom view modifier references a convenient addition to the `View` type that only applies the view modifier if the optional value can be unwrapped. Reference the `View+.swift` file inside the Utilities->Extensions folder path to learn more.
6. If at runtime the code reaches this point, it’s because a paywall config object has been fetched and the optional has been unwrapped. In that case we can add the `.paywall` view modifier to the `ContentView`. This modifier takes many arguments. See the steps below for an explanation of each.
7. The first three arguments are fairly straightforward. `isPresented` takes the boolean state property that governs whether this modal is shown or not; `fullScreen` tells the SDK to display the modal in full screen or sheet mode; and `paywallConfiguration` takes a paywall config object which contains everything the SDK needs to display a remotely-configured paywall.
8. Since the paywall is shown using a remote config, all user interaction on the paywall is handled by the SDK. This and the following callbacks allow you to understand the outcome of the interaction. `didFinishPurchase` is called when the user successfully purchased a product. Perform whatever actions are necessary to record this successful outcome and unlock the purchased functionality.
9. `didFinishRestore` is much like item 8, but called when the user has successfully restored a previous purchase. Unlock that functionality for your user here.
10. `didFailPurchase`, `didFailRestore`, and `didFailRendering` are all used for the same purpose: the transaction failed in some way. Respond to these calls by performing whatever error handling is appropriate for your app.

</TabItem> 

<TabItem value="kotlin" label="Android" default> 

[Install and configure Android Adapty SDK](installation-of-adapty-sdks)  and make sure to replace the `PUBLIC_SDK_KEY` placeholder with your actual Public SDK key.

Bear in mind, that SDK calls must be made after calling **`.activate()`** method. Otherwise, we won't be able to authenticate requests and they will be canceled.

<SampleApp />

</TabItem> 

</Tabs>

<!--- ### Configuring processing of purchases

Connecting Adapty to  **In-App Purchase API** for [iOS](app-store-connection-configuration) and adding both **package name** with **service account key file** for [Android](google-play-store-connection-configuration#step-2-upload-the-account-key-file) would be necessary to allow Adapty to successfully process purchasing events.

### Subscription events

Here is what you can do to set up tracking of subscription events

|                 |                                                              |
| :-------------- | :----------------------------------------------------------- |
| **For iOS**     | **Update the App Store Server Notifications with our [link](enable-app-store-server-notifications)** |
| **For Android** | **Set up [Real-time Developer Notifications (RTDN)](enable-real-time-developer-notifications-rtdn)** |

 --->

## Configuring Paywalls in the Adapty Dashboard

1. Log in to the Adapty Dashboard and go to **App Settings** to configure the required settings.

      1. Enter your app’s *Bundle ID*.
      2. Enter your *Issuer ID* and *Key ID* from App Store Connect.
      3. Upload your private key .p8 file from App Store Connect.
      4. Add you *App Store Connect shared secret*.
      5. Copy the URL for App Store server notifications and paste it into App Store Connect. Find directions [here](enable-app-store-server-notifications).


      <Zoom>
        <img src={require('./img/app-settings.webp').default}
        style={{
          border: '1px solid #727272', /* border width and color */
          width: '700px', /* image width */
          display: 'block', /* for alignment */
          margin: '0 auto' /* center alignment */
        }}
      />
      </Zoom>

2. Navigate to the **Products** section in the left-side navigation bar and click on the tab called **Access Levels**. A default access level has been created for you (`premium`). You can also create your own here to group different sets of functionality together in your app.

3. Click the other tab called **Products** in this section, and create new products linked to App Store Connect subscriptions.

   1. Name the product whatever makes sense for you as it will be how you reference that product from now on inside Adapty’s dashboard.

   2. Choose the correct duration to match what you set in App Store Connect.

   <Zoom>
     <img src={require('./img/create-product-1.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

   3. Enter the *product ID* that matches what you set in App Store Connect.

   <Zoom>
     <img src={require('./img/create-product-2.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
     />
   </Zoom>


This is now what your products section should look like:
<Zoom>
 	<img src={require('./img/finished-product-listing.webp').default}
 	style={{
		border: '1px solid #727272', /* border width and color */
		width: '700px', /* image width */
		display: 'block', /* for alignment */
		margin: '0 auto' /* center alignment */
	}}
	/>
</Zoom>

4. Click on **Paywalls** in the left-side navigation, and create a new paywall using the button in the upper right.

   1. Give the *paywall a name*.
   2. Add the products we just created in the previous step to this paywall.
   3. Click the button at the bottom titled **Create as draft**.
      <Zoom>
       <img src={require('./img/new-paywall.webp').default}
       style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
       }}
      />
      </Zoom>

5. Click the **Builder** tab and choose from our available templates. You’ll want to pick a template with at least two product areas as we have two subscriptions to show.

6. Once chosen, you can customize the template with marketing copy, images, and style and layout changes to make it look just right for your needs. Any changes you make to the design will be reflected in the preview design to the right.
   <Zoom>
     <img src={require('./img/paywall-builder.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

7. If you’re happy with the design of the paywall, click **Save & publish** at the bottom to save all your changes.

8. Finally, click on **Placements** in the left-side navigation to create a placement and assign it to a paywall.

   1. Click **Create placement** and add a *placement name* as well as a *placement ID*. They should look as shown:

      <Zoom>
       <img src={require('./img/placement-config-name.webp').default}
       style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
       }}
      />
      </Zoom>

   2. Click **Run Paywall** and choose the paywall you created in the previous step.
      <Zoom>
       <img src={require('./img/placement-run-paywall.webp').default}
       style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
       }}
      />
      </Zoom>

   3. Lastly, click **Save & publish** at the bottom to save this placement.

## Testing Your Paywall

* Run the app in the Xcode simulator.
* Verify that the paywall appears when triggered.
* Ensure that purchases unlock the appropriate access level.
* Check the Adapty dashboard for purchase analytics and logs.

Congratulations! You have successfully integrated the Adapty SDK, configured a paywall, and set up subscriptions for your iOS app. You can further refine your implementation by experimenting with different paywall designs and analyzing conversion rates in the Adapty dashboard.

<!--- ### Integrations

[Integrations](events) with third-party analytics and attribution services require [passing identifiers](analytics-integration) to the SDK. 

|                          |                                                                                                                                                                                                           |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **.updateProfile()**     | Use this method to passing identifiers to Amplitude, Mixpanel, Facebook Ads, and AppMetrica                                                                                                               |
| **.updateAttribution()** | This method would be required for passing attribution data from AppsFlyer, Adjust, and Branch. Be sure to configure the integration of interest in Adapty Dashboard, by providing API key and event names |



### Promo campaigns and promo offers

If you want to use Adapty along with Apple Promotional Offers, adding a [subscription key](app-store-connection-configuration#step-3-upload-in-app-purchase-key-file) will allow us to sign offers. --->

### Notes

:::warning
Don't forget about Privacy Labels

[Learn more](apple-app-privacy) about the data Adapty collects and which flags you'd need to set for a review.
:::

:::danger
If you are using paywalls that were not built with [Adapty Paywall Builder](adapty-paywall-builder), make sure to [send paywall views](present-remote-config-paywalls#track-paywall-view-events) to Adapty using **.logShowPaywall()** method. Otherwise, paywall views will not be accounted for in the metrics and conversions will be irrelevant.
:::

If you have any questions about integrating Adapty SDK, feel free to contact us using [the website](https://adapty.io) (we use Intercom in the bottom right corner) or just email us at [support@adapty.io](mailto:support@adapty.io).