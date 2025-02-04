---
title: "Custom fonts in legacy Paywall Builder"
description: "Custom Fonts in Legacy Paywall Builder | Adapty Docs"
metadataTitle: "Enhance your legacy paywall builder with custom fonts for a better visual experience."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::note
Custom fonts are only available on AdaptyUI SDK v.2.1.0 and higher
:::

One of the hallmarks of great design is consistency in visuals. So when building no-code paywalls you might want to make sure you use a custom font for your paywall to match the rest of your app. Here we'll talk about how we work with customising fonts and how you can use them.

:::important

This section describes the legacy Paywall Builder, compatible with Adapty SDK v2.x or earlier. For information on the new Paywall Builder compatible with Adapty SDK v3.x or later, see [Custom fonts in new Paywall Builder](using-custom-fonts-in-paywall-builder).

:::

## What can be customized

Every text you see in Paywall Builder can have its own font and style. You can adjusted this in font controls for every text element:


<Zoom>
  <img src={require('./img/2b67da0-CleanShot_2024-02-07_at_13.27.092x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





But in some cases, it'd be more convenient to change the font on the entire paywall. This can be done in the Layout section of Paywall Builder [by adjusting the Paywall Font](paywall-layout-and-products#font-settings-of-your-paywall).

## Fonts available by default

When you create a paywall in Builder, Adapty uses a system font by default. That usually means SF Pro on iOS and Roboto on Android (though it can vary depending on the device). You can also pick one of the fonts commonly used across the apps (Arial, Times New Roman, Courier New, Georgia, Palatino and Verdana). There are also a few styles to choose from available for each of those fonts:


<Zoom>
  <img src={require('./img/8812fab-CleanShot_2024-01-12_at_19.33.072x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::note
Note that these fonts are not supplied as part of Adapty SDK and are only used in preview purposes. We can not guarantee they will work perfectly well on all of the devices.

However in our testing we observed that those fonts are typically recognised by most devices without additional effort from your side. You can also checkout which fonts are available by default on iOS here: [In Apple official documentation](https://developer.apple.com/fonts/)
:::

## How to add a custom font to the Adapty Dashboard

If you need more than what is offered by default, you will need to add a custom font. Click on "Add custom font" in any of the font dropdowns and you'll see this screen:


<Zoom>
  <img src={require('./img/89fb748-CleanShot_2024-02-07_at_13.21.552x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





From here you need to:

- Locate your font file and upload it to this form
- Provide a name to reference it in the Paywall Builder
- Specify the correct font names for both platforms
- Add the font file to your app's bundle if you haven't done it already

:::warning
We will not be sending the font file you upload to the device, it is only needed for preview purposes. Our SDK only receives the strings referencing the font to use it while rendering the paywall. So you have to make sure you include the same font file in the bundle and provide the correct platform-specific font names for everything to work smoothly. Don't worry, it's not going to take a lot of time.
:::

:::note
By uploading the font file to Adapty, you're also confirming that you have the right to use it in your app
:::

### Getting the correct font name on iOS

There are two ways to get the correct ID for a font: first involves some basic coding, second involves an app called "Font Book" available on mac OS.

If you've already added a custom font to your app's bundle — chances are you're already referencing it by the font name. To make sure simply call `UIFont.familyNames()` to get the family name of the font and then plug it into `UIFont.fontNames(forFamilyName: familyName)`. You can do this in `viewDidLoad` and then remove this code snippet:

```swift showLineNumbers title="Swift"
override func viewDidLoad() {
    super.viewDidLoad()
  	...
  	for family in UIFont.familyNames.sorted() {
    		print("Family: \(family)")
	    	let names = UIFont.fontNames(forFamilyName: family)
    		for fontName in names {
        		print("- \(fontName)")
    		}
    }
}
```

The `fontName` in the above snippet is exactly what we're looking for. It could look something like "MyFont-Regular"

Second method is way simpler: you just need to install the font on your Mac computer, open the Font Book app, find the font and use it's `PostScript name`:


<Zoom>
  <img src={require('./img/bb8a902-CleanShot_2024-01-12_at_20.32.222x.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





### Getting the correct font name on Android

If you have properly added the font file to the resource folder, you simply need to provide the name of the file. Make sure it is lowercase and only contains letters, numbers and underscores — otherwise it might not work.

You can confirm that the filename is correct by calling `ResourcesCompat.getFont(context, R.font.my_font)` with `my_font` being the filename you're using. In this case `my_font` is exactly what you should put in while creating a custom font in Adapty.

## Adding the font files to your app's bundle

Chances are you're already using a custom font in other parts of your app. But if you don't — make sure to include the font file in your app's project and bundle. Read how to do it below.

On iOS: [In Apple official documentation](https://developer.apple.com/documentation/uikit/text_display_and_fonts/adding_a_custom_font_to_your_app)

On Android: [In Android official documentation](https://developer.android.com/develop/ui/views/text-and-emoji/fonts-in-xml)