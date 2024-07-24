---
title: "Apple Search Ads"
description: ""
metadataTitle: ""
---

Adapty can help you get attribution data from Apple Search Ads and analyze your metrics with campaign and keyword segmentation. Adapty collects the attribution data for Apple Search Ads automatically through its SDK and AdServices Framework.

Once you've set up the Apple Search Ads integration, Adapty will start receiving attribution data from Apple Search Ads. You can easily access and view this data on the profiles page.


<img
  src={require('./img/ba4a3e9-CleanShot_2023-08-21_at_15.14.592x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





There are two ways to get attribution: with the old iAd framework and the modern AdServices framework (iOS 14.3+). 

## AdServices framework

Apple Search Ads via [AdServices](https://developer.apple.com/documentation/ad_services) does require some configuration in Adapty Dashboard, and you will also need to enable it on the app side. To set up Apple Search Ads using the AdServices framework through Adapty, follow these steps:

### Step 1: Configure Info.plist

Add `AdaptyAppleSearchAdsAttributionCollectionEnabled` to the app’s `Info.plist` file and set it to `YES` (boolean value).

### Step 2: Obtain Public Key

In the Adapty Dashboard, navigate to [Settings -> Apple Search Ads.](https://app.adapty.io/settings/apple-search-ads)  
Locate the pre-generated public key (Adapty provides a key pair for you) and copy it.


<img
  src={require('./img/baa5998-CleanShot_2023-08-21_at_14.55.542x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





:::note
Note: If you're using an alternative service or your own solution for Apple Search Ads attribution, you can upload your own private key.
:::

### Step 3: Configure User Management on Apple Search Ads

In your [Apple Search Ads account](https://searchads.apple.com/) go to Settings > User Management page. In order for Adapty to fetch attribution data you need to invite another Apple ID account and grant it API Account Manager access.


<img
  src={require('./img/ec183b2-kdjsfldsfjkdsfdfd.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





#### Step 4: Generate API Credentials

As a next step, log in to the newly added account in Apple Search Ads. Navigate to Settings -> API in the Apple Search Ads interface. Paste the previously copied public key into the designated field. Generate new API credentials.

### Step 5: Configure Adapty with Apple Search Ads Credentials

Copy the Client ID, Team ID, and Key ID fields from the Apple Search Ads settings. In the Adapty Dashboard, paste these credentials into the corresponding fields.


<img
  src={require('./img/7356113-CleanShot_2023-08-21_at_15.08.512x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





## iAd Framework

:::danger
Deprecated since iOS 14.5

This is the old way to get Search Ads attribution and it is only supported by Adapty SDK prior to version 2.8.0. For more modern approach look into AdServices Framework.
:::

Apple Search Ads via iAd Framework doesn't require any configuration in Adapty Dashboard, but you will need to enable it on the app side. Just add `AdaptyAppleSearchAdsAttributionCollectionEnabled` to the app’s `Info.plist` file and set it to `YES` (boolean value).

## Uploading your own keys

:::note
Optional

These steps are not required for Apple Search Ads attribution, only for working with other services like Asapty or your own solution.
:::

You can use your own public-private key pair if you are using other services or own solution for ASA attribution.

**Step 1**

Generate private key in Terminal

```text title="Text"
openssl ecparam -genkey -name prime256v1 -noout -out private-key.pem
```

Upload it in Adapty Settings -> Apple Search Ads (Upload private key button)

**Step 2**

Generate public key in Terminal

```text title="Text"
openssl ec -in private-key.pem -pubout -out public-key.pem
```

You can use this public key in your Apple Search Ads settings of account with API Account Manager role. So you can use generated Client ID, Team ID, and Key ID values for Adapty and other services.