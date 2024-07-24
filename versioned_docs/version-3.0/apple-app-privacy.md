---
title: "Apple app privacy"
description: ""
metadataTitle: ""
---

Apple requires a privacy disclosure for all new apps and app updates both in the [**App Privacy**](https://appstoreconnect.apple.com/apps/6477523342/distribution/privacy) section of the App Store Connect and as the app manifest file.  Adapty is a third-party dependency to your app, therefore you’ll need to properly disclose the ways you are using Adapty in regards to user's data.

## Apple app privacy manifest

The [privacy manifest file](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests), named `PrivacyInfo.xcprivacy`, describes what private data your app uses and why. You as every app owner must create a manifest file for your app. Additionally, if you're integrating any extra SDKs, ensure the manifest files for those of them included in the [SDKs that require a privacy manifest and signature](https://developer.apple.com/support/third-party-SDK-requirements/) list are included. When you build your app, Xcode will take all these manifest files and merge them into one.

Even though Adapty isn't on the list of [SDKs that require a privacy manifest and signature](https://developer.apple.com/support/third-party-SDK-requirements/), versions 2.10.2 and higher of the Adapty SDK include it for your convenience. Make sure to update the SDK to get the manifest.

While Adapty doesn't require any data to be included in the manifest file also called app privacy report, if you're using Adapty's ` customerUserId` for tracking, it's necessary to specify it in your manifest file like so: 

1. Add a dictionary to the `NSPrivacyCollectedDataTypes` array in your privacy information file. 
2. Add the `NSPrivacyCollectedDataType`, `NSPrivacyCollectedDataTypeLinked`, and `NSPrivacyCollectedDataTypeTracking` keys to the dictionary.
3. Add string `NSPrivacyCollectedDataTypeUserID` (identifier of the `UserID` data type in the [List of data categories and types to be reported in the manifest file](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests#4250555)) for the `NSPrivacyCollectedDataType` key in your `NSPrivacyCollectedDataTypes` dictionary.
4. Add `true` for the `NSPrivacyCollectedDataTypeTracking` and `NSPrivacyCollectedDataTypeLinked` keys in your `NSPrivacyCollectedDataTypes` dictionary.
5. Use the `NSPrivacyCollectedDataTypePurposeProductPersonalization` string as the value for the `NSPrivacyCollectedDataTypePurposes` key in your `NSPrivacyCollectedDataTypes` dictionary.

If you target your paywalls to audiences with custom attributes, consider carefully what custom attributes you use and if they match the [data categories and types to be reported in the manifest file](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests#4250555). If so, repeat the steps above for every data type.

After you report all data types and categories you collect, create your app's privacy report as described in [Apple documentation](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_data_use_in_privacy_manifests#4239187).

## Apple app privacy disclosure in App Store Connect

In the [**App Privacy**](https://appstoreconnect.apple.com/apps/6477523342/distribution/privacy) section of the App Store Connect, make sure to clearly explain how you're using Adapty in relation to user data.

### Data types

✅ = Required  
👀 = May be required \(see details below\)  
❌ = Not required

| Data type | Required | Note |
|---------|--------|----|
| Identifiers | ✅ | <p>If you are identifying users with a customerUserId, select 'User ID'.</p><p></p><p>Adapty collects IDFA, so you have to select 'Device ID'.</p> |
| Purchases | ✅ | Adapty collects purchase history from users. |
| Contact Info, including name, phone number, or email address | 👀 | Required if you pass personal data like name, phone number, or email address using **`updateProfile`** method. |
| Usage Data | 👀 | If you are using analytics SDKs such as Amplitude, Mixpanel, AppMetrica, or Firebase, this may be required. |
| Location | ❌ | Adapty does not collect precise location data. |
| Health & Fitness | ❌ | Adapty does not collect health or fitness data from users. |
| Sensitive Info | ❌ | Adapty does not collect sensitive information. |
| User Content | ❌ | Adapty does not collect content from users. |
| Diagnostics | ❌ | Adapty does not collect device diagnostic information. |
| Browsing History | ❌ | Adapty does not collect browsing history from users. |
| Search History | ❌ | Adapty does not collect search history from users. |
| Contacts | ❌ | Adapty does not collect contact lists from users. |
| Financial Info | ❌ | Adapty does not collect financial info from users. |


### Required data types

#### Purchases

When using Adapty, you must disclose that your app collects ‘Purchases’ information.


<img
  src={require('./img/feb3b9f-CleanShot_2023-08-25_at_12.32.552x.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





#### Identifiers

If you are identifying users with **`customerUserId`**, you'll need to select 'User ID'.

Adapty collects IDFA, so you'll need to select 'Device ID'.


<img
  src={require('./img/93f3daa-CleanShot_2023-08-25_at_12.35.272x.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





After making your selections, you'll need to indicate how the data is used similar to the Purchases section.

After making your privacy selections, Apple will show a preview of your app's privacy section. If you have chosen Purchases and Identifiers as described above, your app's privacy details should look something like this:


<img
  src={require('./img/17e4ba7-CleanShot_2023-08-25_at_12.36.442x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>


