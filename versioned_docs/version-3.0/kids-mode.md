---
title: "Kids Mode in iOS SDK"
description: "Easily enable Kids Mode to comply with Apple policies. No IDFA or ad data collected in iOS SDK."
metadataTitle: "Kids Mode in iOS SDK | Adapty Docs"
---

If your iOS application is intended for kids, you must follow the policies of [Apple](https://developer.apple.com/app-store/kids-apps/). If you're using the Adapty SDK, a few simple steps will help you configure it to meet these policies and pass app store reviews.

## What's required?

You need to configure the Adapty SDK to disable the collection of:

- [IDFA (Identifier for Advertisers)](https://en.wikipedia.org/wiki/Identifier_for_Advertisers)
- [IP address](https://www.ftc.gov/system/files/ftc_gov/pdf/p235402_coppa_application.pdf)

In addition, we recommend using customer user ID carefully. User ID in format `<FirstName.LastName>` will be definitely treated as gathering personal data as well as using email. For Kids Mode, a best practice is to use randomized or anonymized identifiers (e.g., hashed IDs or device-generated UUIDs) to ensure compliance.

## Enabling Kids Mode

### Updates in the Adapty Dashboard

In the Adapty Dashboard, you need to disable the IP address collection. To do this, go to [App settings](https://app.adapty.io/settings/general) and click **Disable IP address collection** under **Collect users' IP address**.

### Updates in your mobile app code

You can only enable the Kids Mode with Cocoa Pods.

In order to comply with policies, disable the collection of the user's IDFA and IP address:

1. Update your Podfile:

   - If you **don't** have a `post_install` section, add the entire code block below.
   - If you **do** have a `post_install` section, merge the highlighted lines into it.

   ```ruby showLineNumbers title="Podfile"
   post_install do |installer|
     installer.pods_project.targets.each do |target|
       // highlight-start
       if target.name == 'Adapty'
         target.build_configurations.each do |config|
           config.build_settings['OTHER_SWIFT_FLAGS'] ||= ['$(inherited)']
           config.build_settings['OTHER_SWIFT_FLAGS'] << '-DADAPTY_KIDS_MODE'
         end
       end
       // highlight-end
     end
   end
   ```

2. Run the following command to apply the changes:

   ```sh showLineNumbers title="Shell"
   pod install 
   ```
