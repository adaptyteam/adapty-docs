---
title: "Android - Adapty SDK Installation and configuration"
description: ""
metadataTitle: ""
---

Adapty comprises two crucial SDKs for seamless integration into your mobile app:

- Core **AdaptySDK**: This is a fundamental, mandatory SDK necessary for the proper functioning of Adapty within your app.
- **AdaptyUI SDK**: This optional SDK becomes necessary if you use the Adapty Paywall builder: a user-friendly, no-code tool for easily creating cross-platform paywalls. These paywalls are built in a visual constructor right in our dashboard, run entirely natively on the device, and require minimal effort from you to create something that performs well.

You can install Adapty SDK via Gradle.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](https://docs.adapty.io/docs/release-checklist) thoroughly. This checklist ensures that you've completed all necessary steps and provides criteria for evaluating the success of your integration.
:::

## Install via Gradle

```groovy title="module-level build.gradle"
dependencies {
    ...
    implementation 'io.adapty:android-sdk:2.11.1'
    implementation 'io.adapty:android-ui:2.11.0'
}
```
```kotlin title="module-level build.gradle.kts"
dependencies {
    ...
    implementation("io.adapty:android-sdk:2.11.1")
    implementation("io.adapty:android-ui:2.11.0")
}
```
```toml title="version catalog"
//libs.versions.toml

[versions]
..
adapty = "2.11.1"
adaptyUi = "2.11.0"

[libraries]
..
adapty = { group = "io.adapty", name = "android-sdk", version.ref = "adapty" }
adapty-ui = { group = "io.adapty", name = "android-ui", version.ref = "adaptyUi" }



//module-level build.gradle.kts

dependencies {
    ...
    implementation(libs.adapty)
    implementation(libs.adapty.ui)
}
```

If the dependency is not being resolved, please make sure that you have `mavenCentral()` in your Gradle scripts. 

<details>
   <summary>The instruction on how to add it</summary>

   If your project doesn't have `dependencyResolutionManagement` in your `settings.gradle`, add the following to your top-level `build.gradle` at the end of repositories:

```groovy title="top-level build.gradle"
allprojects {
    repositories {
        ...
        mavenCentral()
    }
}
```

Otherwise, add the following to your `settings.gradle` in `repositories` of `dependencyResolutionManagement` section: 

```groovy title="settings.gradle"
dependencyResolutionManagement {
    ...
    repositories {
        ...
        mavenCentral()
    }
}
```
</details>

## Configure Proguard

You should add `-keep class com.adapty.** { *; }` to your Proguard configuration.

## Configure Adapty SDK

Add the following to your `Application` class:

```kotlin title="Kotlin"
override fun onCreate() {
    super.onCreate()
    Adapty.activate(
      applicationContext,
      AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    	  .withObserverMode(false) //default false
    	  .withCustomerUserId(customerUserId) //default null
    	  .withIpAddressCollectionDisabled(false) //default false
    	  .build()
    )  
      
    //OR 
    //the method is deprecated since Adapty SDK v2.10.5
    
    Adapty.activate(applicationContext, "PUBLIC_SDK_KEY", observerMode = false, customerUserId = "YOUR_USER_ID")
}
```
```java title="Java"
@Override
public void onCreate() {
    super.onCreate();
    Adapty.activate(
      applicationContext,
      new AdaptyConfig.Builder("PUBLIC_SDK_KEY")
    	  .withObserverMode(false) //default false
    	  .withCustomerUserId(customerUserId) //default null
    	  .withIpAddressCollectionDisabled(false) //default false
    	  .build()
    );
  
    //OR
    //the method is deprecated since Adapty SDK v2.10.5
  
    Adapty.activate(getApplicationContext(), "PUBLIC_SDK_KEY", false, "YOUR_USER_ID");
}
```

Configurational options:

| Parameter | Presence | Description |
|---------|--------|-----------|
| **PUBLIC_SDK_KEY** | required | <p>The key you can find in the **Public SDK key** field of your app settings in Adapty: [**App settings**-> **General** tab -> **API keys** subsection](https://app.adapty.io/settings/general).</p><p>Make sure you use the **Public SDK key** for Adapty initialization, the **Secret key** should be used for [server-side API](getting-started-with-server-side-api)  only.</p> |
| **observerMode** | optional | <p>A boolean parameter.</p><p></p><p>1. First item</p><p>2. Second item</p><p>3. Third item</p> |
| **customerUserId** | optional | An identifier of the user in your system. We send it in subscription and analytical events, to attribute events to the right profile. You can also find customers by `customerUserId` in the [**Profiles and Segments**](https://app.adapty.io/profiles/users) menu. If you don't have a user ID at the time of Adapty initialization, you can set it later using `.identify()` method. Read more in the [Identifying users](android-identifying-users) section. |
| **IpAddressCollectionDisabled** | optional | <p>A boolean parameter. Set to `true` to disable the collection of the user IP address. The default value is `false`.</p><p>Parameter works with `AdaptyConfig.Builder` only.</p> |


:::note
**SDK keys** are unique for every app, so if you have multiple apps make sure you choose the right one.
:::

## Set up the logging system

Adapty logs errors and other important information to help you understand what is going on. There are the following levels available:

| Level                    | Description                                                                                                               |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `AdaptyLogLevel.NONE`    | Nothing will be logged. Default value                                                                                     |
| `AdaptyLogLevel.ERROR`   | Only errors will be logged                                                                                                |
| `AdaptyLogLevel.WARN`    | Errors and messages from the SDK that do not cause critical errors, but are worth paying attention to will be logged.     |
| `AdaptyLogLevel.INFO`    | Errors, warnings, and various information messages will be logged.                                                        |
| `AdaptyLogLevel.VERBOSE` | Any additional information that may be useful during debugging, such as function calls, API queries, etc. will be logged. |

You can set the log level in your app before configuring Adapty.

```kotlin title="Kotlin"
Adapty.logLevel = AdaptyLogLevel.VERBOSE
```
```java title="Java"
Adapty.setLogLevel(AdaptyLogLevel.VERBOSE);
```

## Redirect the logging system messages

If you for some reason need to send messages from Adapty to your system or save them to a file, you can override the default behavior:

```kotlin title="Kotlin"
Adapty.setLogHandler { level, message ->
    //handle the log
}
```
```java title="Java"
Adapty.setLogHandler((level, message) -> {
    //handle the log
});
```

## Key Features of the New Paywall Builder

- **Expanded Template Selection**: Choose from a vast array of professionally designed templates to kickstart your paywall creation. These templates offer various styles and layouts to suit different needs and preferences.
- **Enhanced Flexibility**: Enjoy greater flexibility with the ability to use design layers and new elements such as carousels, cards, product list, and footer. These enhancements give you the creative freedom to build any type of paywall you envision.
- **Revamped Existing Elements**: Existing elements have been significantly improved, providing more options and capabilities to bring your paywall ideas to life.

:::note
This section describes the new Paywall Builder (Beta). For information on legacy Paywall Builder, see [Design paywalls with legacy Paywall Builder](https://docs.adapty.io/docs/adapty-paywall-builder-legacy).
:::

## Structure of a paywall

In the new Adapty Paywall Builder, a paywall is composed of the following:

- [**Layout**](paywall-layout): This is the foundational layer of the paywall, setting the background color and defining how products are displayed and top buttons positioned.
- [**Hero Image**](paywall-head-picture): The main picture of the paywall.
- **Main Area**: Here, you can place various elements like a product block, carousels, images, cards, texts, buttons, and lists.
- **Footer**: Similar to the main area but it's a container that's always sticking to the bottom of the paywall on top of the main area. You can add as many elements as needed, and they will be arranged from top to to bottom inside a footer in the same order shown in the left pane.
- [**Elements**](adapty-paywall-builder#paywall-elements): The building blocks placed in the main area or footer to create your paywall. They are stacked in the order they appear in the left pane, from top to bottom. You can nest elements within each other, combine them into cards, or display them in a carousel.

## How to start designing a paywall with new Paywall Builder

:::warning
The new Paywall Builder is available for iOS only and requires Adapty SDK v3.0 or later. Please make sure you've [upgraded to Adapty SDK v3.0 or later](migration-guide-to-adapty-sdk-v3x-or-later) for your new paywalls to function properly!
:::

To use the Adapty Paywall Builder:

1. Open the [**Products and Paywalls**](https://app.adapty.io/paywalls) section in the Adapty main menu and click the **Paywall** tab to open it.

2. Click the **Builder** tab to open it.

3. Depending on whether you've added the products to the paywall in the **General** tab or not, Adapty will offer you to add products or build your paywall with the new Paywall Builder. We continue with the case when products are already added. Click the **Build no-code paywall** button to start designing your paywall.

4. In the **Choose a template** window, you'll find a selection of paywall templates designed by professionals, ready for you to pick the one that best suits your needs. We have both templates that require a couple of minor adjustments like your logo to launch as well as as well as templates with a minimal design that give full scope for your creativityю Choose the template that fits your design the most. 

   
<img
  src={require('./img/cdca1ee-builder_templates.png').default}
/>




5. Click the **Choose** button to confirm your choice.

   
<img
  src={require('./img/795b91b-builder_main_window.png').default}
/>




6. By leveraging the Adapty Paywall Builder, you can create persuasive paywalls that seamlessly align with your app's branding and purpose based on the selected template.

## How to migrate your paywalls

Currently, in Adapty two versions of the Paywall Builder work in parallel:

- The new version is located in the **Builder** tab of the Paywall functionality in the Adapty Dashboard. That is the most recent and flexible version that provides you with many design features to build your perfect paywalls.  
  The paywalls designed with this Paywall Builder version require Adapty SDK v3.0 or later.
- The legacy version is located in the **Legacy Builder** tab of the Paywall functionality in the Adapty Dashboard. This version is outdated and should be used only to support app versions with installed SDK below v.3.х.х. We do not recommend using it for new paywalls as it will be deprecated soon.

The migration of a paywall from the lagacy Paywall Builder to the new one means that a new version of your paywall will be created in the **Builder** tab of the paywall. This version can be edited with the new Paywall Builder and will be displayed in the apps with installed Adapty SDK v3.0 or later. See [Migration guide to Adapty SDK v.3.x or later](migration-to-adapty-sdk-v3) for detailed reference for upgrading to Adapty SDK v3.0.

The existing version of your paywall will stay in the Legacy Builder tab, you will be able to continue adjust it with legacy Paywall Builder and it will be displayed in the apps with the installed Adapty SDK version 2.x or earlier.

Therefore, you will have paywalls in both Paywall Builder formats in parallel and separately until you need them. Changes made with the paywall configuration made for one version will not affect the configuration build for another one.

To migrate a paywall to new Paywall Builder:

1. Open the paywall you want to migrate.
2. Open the **Builder** tab.

   
<img
  src={require('./img/3f4d4c2-PB_migrate_paywall.png').default}
/>



3. Click the **Migrate paywall** button.
4. After the migration is done, review the result, make sure the paywall looks as it should. If not, correct it.
5. Click the **Save** button. 
6. If there are some issues, they will be highlighted red and you will see them at once. Fix them and save the paywall again.

   
<img
  src={require('./img/78f63f0-PB_hughlighted_issues.png').default}
/>




You can migrate your paywalls one by one so that you could review and fix if necessary.

## Paywall elements

The elements you add to your paywall appear in the left pane of the Paywall window. Their order in this pane reflects their order on the paywall.

**Paywall elements** in Adapty are categorized as simple or compound:

- **Simple Elements**: These are individual items that cannot contain other elements. Examples include text, images, and buttons.. 


<img
  src={require('./img/210c8e2-simple_elements.png').default}
/>





- **Compound Elements**: These can contain other elements or have their own structure. Examples include:
  - [Product lists](paywall-product-block) with  products
  - [Carousels](paywall-carousel) with child elements
  - [Cards](paywall-card) with child elements
  - Lists with its list items
  - Link blocks with links inside


<img
  src={require('./img/8a23be4-compound_elements.png').default}
/>





**Enhancements** you can add include:

1. [Predefined tag variables for product info](paywall-builder-tag-variables)
2. [Custom tags](custom-tags-in-paywall-builder)
3. [Custom fonts](using-custom-fonts-in-paywall-builder)
4. [Localization](add-paywall-locale-in-adapty-paywall-builder)

Once configured, you can  [add paywalls to placements](add-audience-paywall-ab-test) to display them in your mobile app. For more details on displaying paywalls, see [Display Paywall Builder paywalls](display-pb-paywalls).

## Customization Options

You can set up each element flexibly:

- **Style** tab: Adjust the element's size, appearance, background color or image, frame, and transparency. Additional options like page control and slideshow settings are available for certain elements, such as carousels.
- **Layout** tab: Set the element’s position and its child elements' positions using offset (moving an element without changing its size or the parent’s size) or padding (moving the element with possible resizing of the parent to fit the child’s size and position).
- **Contents** tab: Configure the content of compound elements.

## We Value Your Feedback

As we’re in the Beta phase, your feedback is invaluable to us. If you encounter any issues or have suggestions for improvements, please reach out to us. We’re here to support you and enhance your experience with the new Paywall Builder.

📧 **Contact Us**: [Adapty Support](mailto:support@adapty.io)

Enjoy building with the new Paywall Builder, and take your monetization strategy to the next level with our enhanced tools and features!

## Integration event sending failure issues and solutions

Please be aware that we determine the deliverability based on HTTP status and consider everything **outside the 200-399 range** to be a fail. 

| Issue | Possible reason | Solution |
|-----|---------------|--------|
| Failed to send the event for integration due to a network error | No internet connection | Restore your internet connection. Adapty will resend the event. |
| Integration server failed to process the event | <p>1. The integration is set up incorrectly, for example:</p><p>1.1. Webhook integration URL is incorrect</p><p>1.2. Dev Keys are incorrect</p><p>2. Receiving server is set up incorrectly and cannot receive/ accept the event notification</p> | Refer to the corresponding documentation topic on the failed integration in our documentation and recheck integration configuration steps: |


## Before you start testing

Before you start testing in-app purchases, make sure that:

1. Your Apple Developer Program account is active. For more information, see Apple's [What you need to enroll](https://developer.apple.com/programs/enroll).
2. Your membership Account Holder has signed the Paid Applications Agreement, as described in Apple's [Sign and update agreements](https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements).
3. You set up the product information in App Store Connect for the app you’re testing. At a minimum, set up a product reference name, product ID, a localized name, and a price.
4. The **Keychain Sharing** capability is disabled. For more information, see Apple's article [Configuring keychain sharing](https://developer.apple.com/documentation/xcode/configuring-keychain-sharing).
5. You’re running a development-signed rather than a production-signed build of your app. 
6. You have completed all the steps outlined in the [release checklist](release-checklist).

## Prepare for Sandbox testing

Testing in-app purchases in the sandbox environment doesn’t involve uploading your app binary to App Store Connect. Instead, you build and run your app directly from Xcode. However, it does require a special test account -  Sandbox Apple ID.

### Step 1. Create a Sandbox test account  (Sandbox Apple ID) in the App Store Connect

:::warning
Create a new sandbox test account

When testing your purchases, it's crucial to create a new sandbox test account each time. This ensures a clean purchase history, optimal performance, and smooth functionality.
:::

To create a Sandbox Apple ID:

1. Open **App Store Connect**. Proceed to [**Users and Access** → **Sandbox**  → **Test Accounts**](https://appstoreconnect.apple.com/access/users/sandbox) section.

   
<img
  src={require('./img/7c1fdd0-apple_test_account.png').default}
/>



2. Click the add button  **(+)** button next to the **Test Accounts** title.

   
<img
  src={require('./img/57c3a7c-apple_new_test_account.png').default}
/>



3. In the **New Tester** window, enter the data of the test user.

   > 🚧 - Make sure to provide a valid email you can verify.
   > - Make sure to define the **Country or Region** which you plan to test.
4. Click the **Create** button to confirm the creation

### Step 3. Add the Sandbox test account to your device

The first time you run an app from XCode on your device, there's no need to manually add a Sandbox account. Upon building the app in XCode and running it on your device, when you initiate a purchase, the device prompts you to enter the Apple ID for the purchase. Simply enter your Sandbox Apple ID and password at this juncture, and the Sandbox test account will be automatically added to your device.

If you need to change the Sandbox Apple ID associated with your device, you can do so directly on the device by following these steps:

1. On iOS 12, navigate to **Settings > [Your Account] > App Store > Sandbox Account**.  
   On iOS 13 or greater, navigate to **Settings > App Store > Sandbox Account**.
2. Tap the current Sandbox Apple ID in the **Sandbox Account** section.
3. Tap the **Sign Out** button.
4. Tap the **Sign In** button.
5. In the **Use the Apple IS for Apple Media Services** window, tap the **Use Other Apple ID** button.
6. In the **Apple ID Sign-In Requested** window, enter the new sandbox account credentials that you previously created. 
7. Tap the **Done** button.
8. In the **Apple ID Security** window, tap the **Other options** button.
9. In the **Protect your account** window, tap the **Do not upgrade** button.

The added sandbox account is shown in the **Sandbox Account** section of your iOS device **Settings**.

### Step 4. Connect the device to your Mac with XCode

To execute the built app version on your real device, include the device as a run destination in the Xcode project

1. Connect your real device to the Mac with XCode using a cable or using the same Wi-Fi.
2. Choose the **Windows** -> **Devices and Simulators** from the XCode main menu.
3. In the **Devices** tab, choose your device.
4. Tap the **Trust** button on your mobile phone.

Your device is connected to the XCode and can be used for sandbox testing.

### Step 5. Build the app and run it

Click the **Run** button in the toolbar or choose **Product -> Run** to build and run the app on the connected real device. If the build is successful, Xcode runs the app on your iOS device and opens a debugging session in the debug area of the XCode. 

The app is ready for testing on the device.

:::note
When you’re done testing the app, click the **Stop** button in the XCode toolbar.
:::

### Step 6. Make purchase

Make a purchase in your mobile app via paywall.

:::info
Now you can [validate that the test purchase is successful](validate-test-purchases).
:::

#### Guide for the initial integration

- [ ] Once you create an account in Adapty and provide your mobile app name and category, we set up the app for you within our Adapty platform. If you need to set up an additional app, you can easily [add your mobile app to Adapty](register-your-mobile-application-in-adapty) yourself.
- [ ] [Generate In-App Purchase Key](generate-in-app-purchase-key) in the App Store Connect
- [ ] [Configure App Store integration](app-store-connection-configuration) itself in the Adapty dashboard and App Store Connect
- [ ] [Enable App Store server notifications](enable-app-store-server-notifications)  in the App Store Connect
- [ ] Install AdaptySDKs for the frameworks you're using: 
  - [ ] [Install Adapty SDKs for native iOS](sdk-installation-ios)
- [ ] Build your application and run it in sandbox mode.

:::warning
Adapty SDK v3.0 is now available for iOS only. For installation guidance on Flutter, React Native, and Unity, see [Installation of Adapty SDKs v.2](installation-of-adapty-sdks).
:::

After the initial integration is complete, you [can begin using Adapty's features](paywalls-products-and-placements). 

Please keep in mind that for paywalls and products to be displayed in your mobile application, and for analytics to work, you need to make changes to your app's code. Specifically, you need to [display the paywalls](display-pb-paywalls) at least and, if you're using paywalls not created with the Paywall Builder, [handle the purchase process](making-purchases) within your app.

:::danger
Go through release checklist before releasing your app

Before releasing your application, make sure to carefully review the [Release Checklist](https://docs.adapty.io/docs/release-checklist) . This will ensure that you've completed all the necessary steps  before your app goes live with Adapty SDK onboard.
:::

## Webhook event structure

Adapty will send you those events you've chosen in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page.

Each event except for the [access_level_update](webhook#event-access-level-updated) is wrapped into the following structure:

```json title="Json"
{
  "profile_id": "772204ce-ebf6-4ed9-82b0-d8688ab62b01",
  "customer_user_id": "john.doe",
  "idfv": "00000000-0000-0000-0000-000000000000",
  "idfa": "00000000-0000-0000-0000-000000000000",
  "advertising_id": "00000000-0000-0000-0000-000000000000",
  "profile_install_datetime": "2020-02-18T18:40:22.000000+0000",
  "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  "email": "john.doe@company.com",
  "event_type": "non_subscription_purchase",
  "event_datetime": "2023-02-18T18:40:22.000000+0000",
  "event_properties": <event-specific properties>,
  "event_api_version": 1,
  "attributions": {"attribution_source1": <attribution_data>, "attribution_source2": <attribution_data>, ...},
  "user_attributes": {"attribute_name1": "attribute_value1", "attribute_name2": "attribute_value2", ...}
  "integration_ids": {"firebase_app_instance_id": "val1", "branch_id": "val2", "one_signal_player_id": "val3", ... }
}
```

Where

| Property                     | Type                 | Description                                                                                                                                                                                                                                                                                                 |
| :--------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **profile_id**               | String               | The Сustomer user ID of the profile in Adapty.                                                                                                                                                                                                                                                              |
| **customer_user_id**         | String               | User ID you use in your app to identify the user. For example, it can be your user UUID, email, or any other ID. Null if you didn't set it.                                                                                                                                                                 |
| **idfv**                     | String               | The identifier for vendors (IDFV) is a unique code assigned to all apps developed by a single developer, which in this case refers to your apps                                                                                                                                                             |
| **idfa**                     | String               | The identifier for advertisers (IDFA) is a random device identifier assigned by Apple to a user's device.                                                                                                                                                                                                   |
| **advertising_id**           | String               | The Advertising ID is a unique code assigned by the Android Operating System that advertisers might use to uniquely identify a user's device.                                                                                                                                                               |
| **profile_install_datetime** | ISO 8601 date & time | Installation date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html): starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m. |
| **user_agent**               | String               | User-agent used by the browser on the device.                                                                                                                                                                                                                                                               |
| **email**                    | String               | E-mail of your user.                                                                                                                                                                                                                                                                                        |
| **event_type**               | String               | Event name as set up in the in the **Events names** section of the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook)  page in lowercase.                                                                                                                                |
| **event_datetime**           | ISO 8601 date & time | Event date and time in format [IOS 8601](https://www.iso.org/iso-8601-date-and-time-format.html) : starting with the year, followed by the month, the day, the hour, the minutes, seconds, and milliseconds. For example, 2020-07-10T15:00:00.000000+0000, represents the 10th of July 2020 at 3 p.m.       |
| **event_properties**         | JSON                 | JSON of [event properties](events#properties).                                                                                                                                                                                                                                                          |
| **event_api_version**        | Integer              | Adapty API version. The current value is `1`.                                                                                                                                                                                                                                                               |
| **attributions**             | JSON                 | JSON of [attribution data](webhook#attribution-data).                                                                                                                                                                                                                                                   |
| **user_attributes**          | JSON                 | JSON of [custom user attributes](setting-user-attributes#custom-user-attributes).                                                                                                                                                                                                                       |
| **integration_ids**          | JSON                 | JSON of user integration identifiers. If a user doesn't have any identifier or integrations are disabled, then a null is sent.                                                                                                                                                                              |

:::warning
Note that this structure may grow over time — with new data being introduced by us or by the 3rd parties we work with. Make sure that your code that processes it is robust enough and relies on the specific fields, but not on the structure as a whole.
:::

Webhook integration enables the control of sending attribution and user attributes. 

- Enable the **Send Attribution** option in the [**Integrations** ->  **Webhooks**](https://app.adapty.io/integrations/customwebhook) page to send the information about the source of app installs from data providers. 
- Enable the **Send User Attributes** option to send custom user attributes set up from the Adapty SDK, such as user preferences and app usage data.

## Event Access level updated

Adapty has a special event `access_level_updated`. It is sent only to webhook integration every time the access level is updated/set for a specific customer. Use this event to update a customer's subscription in your database/system. No matter what was the source of access level changes, you will always receive a dedicated event for that, therefore it's more precise and has more details than `subscription_renewed`, `trial_started`, `entered_grace_period`, etc.


<img
  src={require('./img/6375cb2-CleanShot_2022-05-03_at_14.22.56.png').default}
/>





| Property | Type | Description |
|--------|----|-----------|
| **store** | str | Could be app_store, play_store, or stripe. |
| **currency** | str | The 3-letter currency code (ISO-4217) of the transaction. |
| **is_active** | bool | Boolean indicating whether paid access level is active for the profile. |
| **is_refund** | bool | Boolean indicating whether transaction is refunded. |
| **expires_at** | ISO 8601 date | Date and time when paid access will expire. |
| **starts at** | ISO 8601 date | Date and time when paid access level starts for the user. |
| **profile_id** | str | Adapty user ID. |
| **renewed_at** | ISO 8601 date | Date and time when paid access will be renewed. |
| **will_renew** | bool | Boolean indicating whether paid access level will be renewed. |
| **environment** | str | <p>Indicates whether the user is operating in a sandbox or production environment.</p><p></p><p>Values are either Sandbox or Production.</p> |
| **is_lifetime** | bool | Boolean indicating whether paid access level is lifetime. |
| **activated_at** | ISO 8601 date | Date and time when paid access was activated. |
| **purchase_date** | ISO 8601 date | <p>Contains the date of the last transaction (original purchase or renewal).</p><p></p><p>Value format is:</p><p>year-month dayThour:minute:second</p><p>e.g., 2023-02-10T17:22:03.000000+0000</p> |
| **store_country** | str | The country sent to Adapty by the store. |
| **event_datetime** | ISO 8601 date | The date and time of the event. |
| **transaction_id** | str | A unique identifier for a transaction such as a purchase or renewal. |
| **access_level_id** | str | Paid access level ID |
| **profile_country** | str | Profile Country determined by Apple/Google store. |
| **profile_event_id** | str | Unique event ID that can be used for deduplication. |
| **vendor_product_id** | str | <p>Contains the value of Product Id in Apple/Google store.</p><p></p><p>e.g., org.locals.12345</p> |
| **is_in_grace_period** | bool | Boolean indicating whether profile is in grace period. |
| **original_purchase_date** | ISO 8601 date | The date and time of the original purchase. |
| **original_transaction_id** | str | The transaction identifier of the original purchase. |
| **subscription_expires_at** | ISO 8601 date | <p>Contains the expiration date of the latest subscription.</p><p></p><p>Value format is:</p><p>year-month dayThour:minute:second</p><p>e.g., 2023-02-10T17:22:03.000000+0000</p> |
| **profile_total_revenue_usd** | float | Total revenue for the profile, refunds included. |
| **billing_issue_detected_at** | ISO 8601 date | Date and time of billing issue. |
| **cancellation_reason** | str | <p>A reason why the user canceled a subscription.</p><p></p><p>Can be</p><p>**iOS & Android**:</p><p></p><p>- voluntarily_cancelled</p><p>- billing_error</p><p>- refund</p><p>**iOS**:</p><p>- price_increase</p><p>- product_was_not_available</p><p>- unknown</p><p>**Android**:</p><p>- new_subscription_replace</p><p>- cancelled_by_developer</p> |
| **active_introductory_offer_type** | str | Type of the active introductory offer. |
| **active_promotional_offer_type** | str | Type of the active promotional offer. |
| **active_promotional_offer_id** | str | ID of the active promotional offer as indicated in the Product section of the Adapty Dashboard |