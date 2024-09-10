---
title: "Migration from Glassfy"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

_Glassfy services will be ending in December 2024_. We worked with them to make the transition as easy as possible for you. This guide will help you migrate your subscribers to Adapty in less than a day. Most importantly, the migration will be 100% seamless for your customers; they will continue using the app without interruptions.


<Zoom>
  <img src={require('./img/526afff-glassfy-banner.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::info
Moving from Glassfy? Get 6 months free of Pro+ plan

When you migrate from Glassfy to Adapty, you can use all our features, including Paywall Builder, A/B tests, ML predictions, and Targeting for free for the first 6 months — no strings attached. Just use [this link](https://app.adapty.io/glassfy-migration-offer) to sign up. Try it for yourself and see why thousands of apps use Adapty to grow their revenue.
:::

Here are the 3 easy steps to migrate your app from Glassfy to Adapty:

1. Learn the core differences (very few of them) and set up an Adapty account _(15 minutes)_;
2. Install Adapty SDK for your platform ([iOS](sdk-installation-ios, [Android](sdk-installation-android), [React Native](sdk-installation-reactnative), [Flutter](sdk-installation-flutter), [Unity](sdk-installation-unity))  _(1 hour)_;
3. Test and release the new version of your app _(30 minutes)._

:::info
Your subscribers will migrate automatically

All users who have ever activated a subscription will instantly move to Adapty as soon as they open a new version of your app with the Adapty SDK. Subscription status validation and premium access will be restored automatically.
:::

### Learn the core differences and set up an Adapty account

Adapty and Glassfy SDKs are similarly designed. Adapty allows you to show different paywalls to different audiences, but it's optional.

Naming is slightly different:

| Glassfy                                                          | Adapty                           |
| :--------------------------------------------------------------- | :------------------------------- |
| [SKU](https://docs.glassfy.io/docs/configure-products)           | [Product](product)           |
| [Permission](https://docs.glassfy.io/docs/configure-permissions) | [Access level](access-level) |
| [Offering](https://docs.glassfy.io/docs/configure-offerings)     | [Paywall](paywalls)          |

#### Creating an Adapty account

Create an account using a [special link ](https://app.adapty.io/glassfy-migration-offer). You can also [invite your colleagues](members-settings).

#### Set up integration with the App Store and/or Google Play

You've done it at least once already, so we'll just leave the link to the docs. You will have to provide a Bundle ID and subscription keys and set up server notifications so that Adapty can work with purchases.

- [Configuring subscription key](in-app-purchase-api-storekit-2) and [enabling Apple server notifications](app-store-server-notifications) for the App Store
- [Configuring service account key file](service-account-key-file) and [enabling Google server notifications](real-time-developer-notifications-rtdn) for the Google Play

#### Create products

To sell the product in Adapty SDK, you have to create it in the dashboard first. This process is very similar to how SKUs are created in Glassfy. Just give it a name, choose the access level (aka permission), and product IDs for the App Store / Google Play. You can read more about the products [here](product).


<Zoom>
  <img src={require('./img/5878f01-002900-August-01-BbJcEGHE.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>







#### Create paywalls

Once you created the products, you should create the paywalls (aka offerings). A paywall can have one or more products. It can also have remote configuration, which allows you to customize the paywalls without new releases, localize the paywalls and onboarding and [much more](paywalls). You can even design and create paywalls without any coding with the [Adapty paywall builder](/3.0/adapty-paywall-builder).


<Zoom>
  <img src={require('./img/aac7858-002901-August-01-5BJyKpql.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>







#### Create placements

Adapty has a concept of [placement](placements). It's a logical place inside your app where the user can make a purchase. In most cases, you have one or two placements:

- Onboarding (because 80% of all purchases take place there)
- General (you show it in settings or inside the app after the onboarding)


<Zoom>
  <img src={require('./img/2406d97-image.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





With the placements, you can dynamically change which Paywall or A/B test should be displayed in the designated place of your application. You can even show different paywalls to different [audiences](audience) in your application.


<Zoom>
  <img src={require('./img/c77c57b-002902-August-01-3AWT4LRe.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Well done, now you can integrate Adapty SDK into your app!

### Install Adapty SDK to replace Glassfy SDK

Install Adapty SDK for your platform ([iOS](sdk-installation-ios, [Android](sdk-installation-android), [React Native](sdk-installation-reactnative), [Flutter](sdk-installation-flutter), [Unity](sdk-installation-unity)).

#### SDK activation

**Glassfy**
<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

  Glassfy.initialize(apiKey: "YOUR_API_KEY", watcherMode: false)

  [...]

  // optionally login your user
  Glassfy.login(user: "youruser")

}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
class App : Application() {
  override fun onCreate() {
    super.onCreate()
    
    Glassfy.initialize(this, "YOUR_API_KEY", false, null)
  }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
public class App extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    Glassfy.initialize(this, "YOUR_API_KEY", false, null);
  }
}
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {

  await Glassfy.initialize('YOU_API_KEY',watcherMode: false);

} catch (e) {
  // error
  [...]
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {

  await Glassfy.initialize('YOU_API_KEY', false);

} catch (e) {
  // initialization error
}
```
</TabItem>
</Tabs>

**Adapty**

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  
  let configurationBuilder =
    Adapty.Configuration
      .Builder(withAPIKey: "PUBLIC_SDK_KEY")
      .with(customerUserId: "YOUR_USER_ID") // optionally add your internal user id

    Adapty.activate(with: configurationBuilder) { error in
    // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
          .withCustomerUserId(customerUserId) // optionally add your internal user id
          .build()
    ) 
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
          .withCustomerUserId(customerUserId) // optionally add your internal user id
          .build()
    );
}
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {
    Adapty().activate();
} on AdaptyError catch (adaptyError) {}
} catch (e) {}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
adapty.activate('PUBLIC_SDK_KEY', {
  customerUserId: 'YOUR_USER_ID', // optionally add your internal user id
});
```
</TabItem>
</Tabs>

#### Fetch offerings (paywalls)

**Glassfy**

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
Glassfy.offerings { (offerings, err) in
    if let offering = offerings?["premium"] {
        // display your offering's skus
        for sku in offering.skus {
            // sku.extravars
            // sku.product.localizedTitle
            // sku.product.localizedDescription
            // sku.product.price
        }
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
Glassfy.offerings() { offers, err ->
    offers?.all
        ?.firstOrNull { it.offeringId == "premium" }
        ?.also {
            // display your offering's skus
            for (sku in it.skus) {
                // sku.extravars
                // sku.product.title
                // sku.product.description
                // sku.product.price
            }
        }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Glassfy.offerings(new OfferingsCallback() {
    @Override
    public void onResult(@Nullable Offerings offers, @Nullable GlassfyError err) {
        Offering offering = null;
        if (offers != null) {
            for (Offering o : offers.getAll()) {
                if (o.getOfferingId().equals("premium")) {
                    offering = o;
                }
            }
        }
        if (offering != null) {
            // display your offering's skus
            for (Sku sku : offering.getSkus()) {
                // sku.getExtravars();
                // sku.getProduct().getTitle();
                // sku.getProduct().getDescription();
                // sku.getProduct().getPrice();
            }
        }
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {
    var offerings = await Glassfy.offerings();
    var offering = offerings.all
        ?.singleWhere((offering) => offering.offeringId == 'premium');

    offering?.skus?.forEach((sku) {
        // sku.product.description
        // sku.product.price
    });
} catch (e) {
  // initialization error
  [...]
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    let offering = Glassfy.offerings().all.find((o) => o.offeringId === 'premium');

    offering?.skus.forEach((sku) => {
      // sku.extravars
      // sku.product.description;
      // sku.product.price
    });
} catch (e) {
  [...]
}
```
</TabItem>
</Tabs>

**Adapty**

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
Adapty.getPaywall(placementId: "YOUR_PLACEMENT_ID", locale: "en") { result in
    switch result {
        case let .success(paywall):
            // the requested paywall
                // call getPaywallProducts here
        case let .failure(error):
            // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
Adapty.getPaywall("YOUR_PLACEMENT_ID", locale = "en") { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val paywall = result.value
            // the requested paywall
            // call getPaywallProducts here
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Adapty.getPaywall("YOUR_PLACEMENT_ID", "en", result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
        // the requested paywall
        // call getPaywallProducts here
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {
  final paywall = await Adapty().getPaywall(id: "YOUR_PLACEMENT_ID", locale: "en");
  // the requested paywall
  // call getPaywallProducts here
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    const id = 'YOUR_PLACEMENT_ID';
    const locale = 'en';

    const paywall = await adapty.getPaywall(id, locale);
  // the requested paywall
  // call getPaywallProducts here
} catch (error) {
    // handle the error
}
```
</TabItem>
</Tabs>

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
Adapty.getPaywallProducts(paywall: paywall) { result in    
    switch result {
    case let .success(products):
        // the requested products array
        for product in products {
            // product.localizedTitle
            // product.localizedDescription
            // product.localizedPrice
            // product.localizedSubscriptionPeriod
            // product.price 
        }
    case let .failure(error):
        // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
Adapty.getPaywallProducts(paywall) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val products = result.value
            // the requested products
            for (product in products) {
                // product.localizedTitle
                // product.localizedDescription
                // product.localizedPrice
                // product.localizedSubscriptionPeriod
                // product.price 
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Adapty.getPaywallProducts(paywall, result -> {
    if (result instanceof AdaptyResult.Success) {
        List<AdaptyPaywallProduct> products = ((AdaptyResult.Success<List<AdaptyPaywallProduct>>) result).getValue();
        // the requested products
        for (AdaptyPaywallProduct product: products) {
            // product.localizedTitle
            // product.localizedDescription
            // product.localizedPrice
            // product.localizedSubscriptionPeriod
            // product.price 
        }
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
      
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {
  final products = await Adapty().getPaywallProducts(paywall: paywall);
  // the requested products array
  for (var product in products!) {
      // product.localizedTitle
      // product.localizedDescription
      // product.price.amount
      // product.price.localizedString
      // product.subscriptionDetails.localizedSubscriptionPeriod
   }
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    // ...paywall
    const products = await adapty.getPaywallProducts(paywall);
  // the requested products list
} catch (error) {
    // handle the error
}
```
</TabItem>
</Tabs>


In Adapty, you always request the paywall via [placement id](placements). If you want to see conversions, learn how [to log paywall views](present-remote-config-paywalls#track-paywall-view-events).

#### Check permissions (access level)

**Glassfy**

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
Glassfy.permissions { permissions, err in
    guard let permissions = permissions else { return }
    for p in permissions.all {
        switch (p.permissionId) {
        case "aPermission":
            if (p.isValid) {
                // unlock aFeature
            }
            break;
        default:
            print("Permission not handled");
            break;
        }
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
Glassfy.permissions { permission, err ->
    // update app status accordingly
    permission?.all?.forEach {
        when (it.permissionId) {
            "premium" ->
                if (it.isValid) {
                    // unlock aFeature
                } 
            else -> println("Permission not handled");
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Glassfy.permissions(new PermissionsCallback() {
    @Override
    public void onResult(@Nullable Permissions permission, @Nullable GlassfyError error) {
        // update app status accondingly
        if (permission != null) {
            for (Permission p: permission.getAll()) {
                switch (p.getPermissionId()) {
                case "premium":
                    if (p.isValid()) {
                        // unlock aFeature
                    } 
                    break;
                default:
                    Log.d(TAG, "Permission not handled");
                }
            }
        }
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {
var permission = await Glassfy.permissions();
      permission.all?.forEach((p)=> {
        if (p.permissionId == "premium" && p.isValid==true) {
          // unlock aFeature
        }
      });
} catch (e) {
  // initialization error
  [...]
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    const permissions = await Glassfy.permissions();
    permissions.all.forEach((p)=>{
        switch (p.permissionId) {
            case "premium":
                if (permission.isValid) {
                    // unlock 
                }
                break;
        
            default:
                break;
        }
    });

} catch (e) {
  // initialization error
  [...]
}
```
</TabItem>
</Tabs>

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
Adapty.getProfile { result in
    if let profile = try? result.get() {
        // check the access
        profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
            // grant access to premium features
        }
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
Adapty.getProfile { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val profile = result.value
            // check the access
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Adapty.getProfile(result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
        // check the access
      
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {
  final profile = await Adapty().getProfile();
  // check the access
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    const profile = await adapty.getProfile();
} catch (error) {
  // handle the error
}
```
</TabItem>
</Tabs>
**Adapty**

#### Make a purchase

**Glassfy**

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift
Glassfy.purchase(sku: premiumSku) { (transaction, e) in
    // update app status accondingly
    if let p = transaction?.permissions["aPermission"] {
        if p.isValid {
            // unlock aFeature
        } else {
            // lock aFeature
        }
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
Glassfy.purchase(activity, sku) { transaction, err ->
    // update app status accordingly
    transaction?.permissions
        ?.all
        ?.firstOrNull { it.permissionId == "aPermission" }
        ?.also {
            if (it.isValid) {
                // unlock aFeature
            } else {
                // lock aFeature
            }
        }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Glassfy.purchase(activity, sku, new PurchaseCallback() {
    @Override
    public void onResult(@Nullable Transaction t, @Nullable GlassfyError err) {
        // update app status accordingly
        Permission permission = null;
        if (t != null) {
            for (Permission p : t.getPermissions().getAll()) {
                if (p.getPermissionId().equals("aPermission")) {
                    permission = p;
                }
            }
        }
        if (permission != null) {
            if (permission.isValid()) {
              // unlock aFeature
            } else {
              // lock aFeature
            }
        }
    }
});
```
</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {
    var transaction = await Glassfy.purchaseSku(sku);

    var p = transaction.permissions?.all?.singleWhere((permission) => permission.permissionId == 'premium');
    if (p?.isValid==true) {
        // unlock aFeature
    }
    else {
        // lock aFeature
    }
} catch (e) {
  // initialization error
  [...]
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    const transaction = await Glassfy.purchaseSku(premiumSku );
    const permission = transaction.permissions.all.find((p) => p.permissionId === "aPermission");
    if (permission && permission.isValid) {
        // unlock aFeature
    }
} catch (e) {
  // initialization error
  [...]
}
```
</TabItem>
</Tabs>

**Adapty**

<Tabs>
<TabItem value="Swift" label="Swift" default>
```swift 
Adapty.makePurchase(product: product) { result in
    switch result {
    case let .success(info):
      if info.profile.accessLevels["YOUR_ACCESS_LEVEL"]?.isActive ?? false {
        // successful purchase
      }
    case let .failure(error):
        // handle the error
    }
}
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin 
Adapty.makePurchase(activity, product) { result ->
    when (result) {
        is AdaptyResult.Success -> {
            val info = result.value
            //NOTE: info is null in case of cross-grade with DEFERRED proration mode
            val profile = info?.profile
        
            if (profile?.accessLevels?.get("YOUR_ACCESS_LEVEL")?.isActive == true) {
                // grant access to premium features
            }
        }
        is AdaptyResult.Error -> {
            val error = result.error
            // handle the error
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>
```java 
Adapty.makePurchase(activity, product, result -> {
    if (result instanceof AdaptyResult.Success) {
        AdaptyPurchasedInfo info = ((AdaptyResult.Success<AdaptyPurchasedInfo>) result).getValue();
        //NOTE: info is null in case of cross-grade with DEFERRED proration mode
        AdaptyProfile profile = info != null ? info.getProfile() : null;
        
        if (profile != null) {
            AdaptyProfile.AccessLevel premium = profile.getAccessLevels().get("YOUR_ACCESS_LEVEL");
            
            if (premium != null && premium.isActive()) {
                // successful purchase
            }
        }
    } else if (result instanceof AdaptyResult.Error) {
        AdaptyError error = ((AdaptyResult.Error) result).getError();
        // handle the error
    }
});
```

</TabItem>
<TabItem value="Flutter" label="Flutter" default>
```javascript 
try {
  final profile = await Adapty().makePurchase(product: product);
  if (profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive ?? false) {
        // successful purchase      
  }
} on AdaptyError catch (adaptyError) {
    // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="RN" label="React Native (TS)" default>
```typescript 
try {
    const profile = await adapty.makePurchase(product);
  const isSubscribed = profile?.accessLevels['YOUR_ACCESS_LEVEL']?.isActive;
  
    if (isSubscribed) {
        // grant access to features in accordance with access level
    }
} catch (error) {
    // handle the error
}
```
</TabItem>
</Tabs>


### Test and release a new version of your app

If you're reading this, you've already:

- [x] Configured integration with the App Store / Google Play
- [x] Configured Adapty Dashboard
- [x] Installed Adapty SDK
- [x] Replaced Glassfy with Adapty functions
- [ ] Made a sandbox purchase
- [ ] Made a new app release

If you checked the points above, just make a test purchase in the Sandbox and then release the app.

:::info
Go through [release checklist](release-checklist)

Make the final check using our list to validate the existing integration or add additional features such as [attribution](attribution-integration) or [analytics](analytics-integration) integrations.
:::

### FAQ

#### I successfully installed Adapty SDK and released a new app version with it. What will happen to my legacy subscribers who did not update to a version with Adapty SDK?

Most users charge their phones overnight, it's when the App Store usually auto-updates all their apps, so it shouldn't be a problem. There may still be a small number of paid subscribers who did not upgrade, but they will still have access to the premium content. You don't need to worry about it and force them to update.

#### Do I need to request historical data from Glassfy as quickly as possible, or will I lose it?

You don't need to make it super fast; make a release with Adapty SDK first, and then give us your historical data. We will restore the history of your users' payments and fill in [profiles](profiles-crm) and [charts](charts).

#### I use MMP (AppsFlyer, Adjust, etc.) and analytics (Mixpanel, Amplitude, etc.). How do I make sure that everything will work?

You first need to pass us the IDs of such 3rd party services via our SDK that you want us to send data to. Read the guide for [attribution integration](attribution-integration) and for [analytics integration](analytics-integration).