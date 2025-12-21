---
title: "Design paywall with remote config"
description: "Customize your paywall with remote config in Adapty for better targeting."
metadataTitle: "Customizing Paywall with Remote Config | Adapty Docs"
keywords: ['remote config', 'remote']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 
import Details from '@site/src/components/Details';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

The Paywall Remote Config is a powerful tool that provides flexible configuration options. It allows the use of custom JSON payloads to tailor your paywalls precisely. With it, you can define various parameters such as titles, images, fonts, colors, and more.

<details>
   <summary>Before you start customizing a paywall (Click to Expand)</summary>

   1. [Create a product](create-product).
2. [Create a paywall and add the product to it](create-paywall).
</details>

To start customizing a paywall using the remote config:

1. Open the [**Paywalls**](https://app.adapty.io/paywalls) section in the Adapty main menu. 

2. Click the paywall to open it.

<Zoom>
  <img src={require('./img/remote-config.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Switch to the **Remote config** tab.

<Zoom>
  <img src={require('./img/remote-config-3.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Remote config has 2 views: 

- [Table](customize-paywall-with-remote-config#table-view-of-the-remote-config)
- [JSON](customize-paywall-with-remote-config#json-view-of-the-remote-config)

Both the **Table** and **JSON** views include the same configuration elements. The only distinction is a matter of preference, with the sole difference being that the table view offers a context menu, which can be helpful for correcting localization errors.  
You can switch between views by clicking on the **Table** or **JSON** tab whenever necessary.

Whatever view you've chosen to customize your paywall, you can later access this data from SDK using the`remoteConfig` or `remoteConfigString` properties of `AdaptyPaywall`, and make some adjustments to your paywall. You can also programmatically update remote config values using the [server-side API](api-adapty#/operations/updatePaywall) to dynamically modify paywall configurations without manual dashboard updates. Here are some examples of how you can use a remote config.

<Tabs groupId="current-os" queryString>
  <TabItem value="Titles" label="Titles" default>
```json showLineNumbers
{
    "screen_title": "Today only: Subscribe, and get 7 days for free!"
}

# Test titles or others texts
```
</TabItem>
<TabItem value="Images" label="Images" default>
```json showLineNumbers
{
    "background_image": "https://adapty.io/media/paywalls/bg1.webp"
}

# Test images on your paywall
```
</TabItem>
<TabItem value="Fonts" label="Fonts" default>
```json showLineNumbers
{
    "font_family": "San Francisco",
    "font_size": 16
}

# Test fonts
```
</TabItem>
<TabItem value="Color" label="Color" default>
```json showLineNumbers
{
    "subscribe_button_color": "purple"
}

# Test colors of buttons, texts etc.
```
</TabItem>
<TabItem value="HTML" label="HTML" default>
```json showLineNumbers
{
    "photo_gallery": "https://adapty.io/media/paywalls/link-to-html-snippet.html"
}

# Any HTML code that can be displayed on the paywall
```
</TabItem>
<TabItem value="Soft/Hard Paywall" label="Soft/Hard Paywall" default>
```json showLineNumbers
{
    "hard_paywall": true
}

# By setting it to true, you disalow skipping paywall without subscribing
# You have to handle this logic in your app
```
</TabItem>
<TabItem value="Translations" label="Translations" default>
```json showLineNumbers
{
    "title": {
        "en": "Try for free!",
        "es": "¡Prueba gratis!",
        "ru": "Попробуй бесплатно!"
    }
}
```
</TabItem>
</Tabs>

You can combine different options, and make up your own. This way you can test different titles, texts, images, fonts, colors, and so on.

### JSON view of the remote config

In the **JSON** view of the remote config, you can enter any JSON-formatted data:


<Zoom>
  <img src={require('./img/3356ff5-remote_config_JSON.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Table view of the remote config

If it's not common for you to work with code and there is a need to correct some values of the JSON, Adapty has the **Table** view for you.


<Zoom>
  <img src={require('./img/4c27b2f-remote_config_table.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





It is a copy of your JSON in the format of a table that is easy to read and understand. Color coding helps to recognize different data types. 

To add a key, click the **Add row** button. We automatically check the values and types mapping and show an alert if your corrections may lead to an invalid JSON.


<Zoom>
  <img src={require('./img/ef682d8-add_raw.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Additional row options are mostly useful for [paywall localisations](add-remote-config-locale):


<Zoom>
  <img src={require('./img/17bcf80-remote_config_table_options.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





Now it's time to [create a placement](create-placement) and add the paywall to it. After that, you can <InlineTooltip tooltip="display your remote config paywalls">[iOS](present-remote-config-paywalls.md), [Android](present-remote-config-paywalls-android.md), [React Native](present-remote-config-paywalls-react-native.md), [Flutter](present-remote-config-paywalls-flutter.md), and [Unity](present-remote-config-paywalls-unity.md)</InlineTooltip> in your mobile app.