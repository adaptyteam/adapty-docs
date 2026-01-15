---
title: "Apple Ads"
description: "Integrate Apple Ads with Adapty to optimize subscription conversions."
metadataTitle: "Apple Ads Integration | Adapty Docs"
keywords: ['apple ads', 'asa', 'Apple Ads']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::important
The Apple Ads integration in **App settings** is used only for basic analytics and for SplitMetrics Acquire and Asapty integrations.

[Apple Ads Manager](adapty-ads-manager.md) uses a separate connection. Connect your Apple Ads account in the [Apple Ads Manager settings](adapty-ads-manager-get-started.md).
:::

Adapty can help you get attribution data from Apple Ads and analyze your metrics with campaign and keyword segmentation. Adapty collects the attribution data for Apple Ads automatically through its SDK and AdServices Framework.

Once you've set up the Apple Ads integration, Adapty will start receiving attribution data from Apple Ads. You can easily access and view this data on the profiles page.

<Zoom>
  <img src={require('./img/ba4a3e9-CleanShot_2023-08-21_at_15.14.592x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Set up integration

### Connect Adapty to the AdServices framework

Apple Ads via [AdServices](https://developer.apple.com/documentation/ad_services) does require some configuration in Adapty Dashboard, and you will also need to enable it on the app side. To set up Apple Ads using the AdServices framework through Adapty, follow these steps:

#### Step 1: Configure Info.plist

Add `AdaptyAppleSearchAdsAttributionCollectionEnabled` to the app’s `Info.plist` file and set it to `YES` (boolean value).

#### Step 2: Obtain public key

In the Adapty Dashboard, navigate to [Settings -> Apple Ads.](https://app.adapty.io/settings/apple-search-ads)  
Locate the pre-generated public key (Adapty provides a key pair for you) and copy it.

<Zoom>
  <img src={require('./img/baa5998-CleanShot_2023-08-21_at_14.55.542x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::note
If you're using an alternative service or your own solution for Apple Ads attribution, you can upload your own private key.
:::

#### Step 3: Configure user management on Apple Ads

In your [Apple Ads account](https://searchads.apple.com/) go to **Settings > User Management** page. In order for Adapty to fetch attribution data you need to invite another Apple ID account and grant it API Account Manager access. You can use any account you have access to or create a new one just for this purpose. The important thing is that you must be able to log into Apple Ads using this Apple ID.

<Zoom>
  <img src={require('./img/ec183b2-kdjsfldsfjkdsfdfd.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

#### Step 4: Generate API credentials

As a next step, log in to the newly added account in Apple Ads. Navigate to Settings -> API in the Apple Ads interface. Paste the previously copied public key into the designated field. Generate new API credentials.

#### Step 5: Configure Adapty with Apple Ads credentials

Copy the Client ID, Team ID, and Key ID fields from the Apple Ads settings. In the Adapty Dashboard, paste these credentials into the corresponding fields.

<Zoom>
  <img src={require('./img/7356113-CleanShot_2023-08-21_at_15.08.512x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Connect your app to the AdServices network

Once you complete [the AdServices framework setup](#connect-the-adservices-framework), Adapty automatically starts collecting Apple Search Ad attribution data. You don't need to add any SDK code.

For iOS applications, this attribution data will **always** take priority over data from other sources. If this behaviour is unwanted, *disable* ASA attribution with the instructions below.

## Disable integration

To turn Apple Search Ads attribution off, open the [**App Settings** -> **Apple Search Ads** tab](https://app.adapty.io/settings/apple-search-ads), and toggle the **Receive Apple Search Ads attribution** switch.

<Zoom>
  <img src={require('./img/asa-disable.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::warning

Please note that disabling this will completely stop the reception of ASA analytics. As a result, ASA will no longer be used in analytics or sent to integrations. Additionally, SplitMetrics Acquire and Asapty will cease to function, as they rely on ASA attribution to operate correctly.

The attribution received before this change will not be affected.

:::

## Uploading your own keys

:::note
Optional

These steps are not required for Apple Ads attribution, only for working with other services like Asapty or your own solution.
:::

You can use your own public-private key pair if you are using other services or own solution for ASA attribution.

### Step 1

Generate private key in Terminal

```text showLineNumbers title="Text"
openssl ecparam -genkey -name prime256v1 -noout -out private-key.pem
```

Upload it in Adapty Settings -> Apple Ads (Upload private key button)

### Step 2

Generate public key in Terminal

```text showLineNumbers title="Text"
openssl ec -in private-key.pem -pubout -out public-key.pem
```

You can use this public key in your Apple Ads settings of account with API Account Manager role. So you can use generated Client ID, Team ID, and Key ID values for Adapty and other services.
