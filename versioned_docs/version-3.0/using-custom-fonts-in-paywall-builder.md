---
title: "Custom fonts in paywall builder"
description: "Custom Fonts in Paywall Builder | Adapty Docs"
metadataTitle: "Enhance Adapty’s Paywall Builder with custom fonts to improve design."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Consistency in visuals is key to great design. When building no-code paywalls, you might want to use a custom font to match the rest of your app. Here, we'll discuss how to customize fonts and how you can use them.

:::warning
This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Custom fonts in legacy Paywall Builder](using-custom-fonts-in-legacy-paywall-builder).
:::

##

## What can be customized

Every text element in Paywall Builder can have its own font and style. You can adjust this in the font controls for each text element:

<Zoom>
  <img src={require('./img/56a8845-choose_font.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

In some cases, it’s more convenient to change the font for the entire paywall. You can do this in the Layout section of the Paywall Builder by adjusting the [by adjusting the Paywall Font](paywall-layout-and-products#font-settings-of-your-paywall).

## Fonts available by default

When you create a paywall in the Builder, Adapty uses a system font by default. This usually means SF Pro on iOS and Roboto on Android, though it can vary depending on the device. You can also choose from commonly used fonts like Arial, Times New Roman, Courier New, Georgia, Palatino, and Verdana. Each of these fonts comes with a few style options:


<Zoom>
  <img src={require('./img/f9d87dc-default_fonts.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





:::note
These fonts are not supplied as part of the Adapty SDK and are only used for preview purposes. We cannot guarantee they will work perfectly on all devices. However, in our testing, these fonts are typically recognized by most devices without any additional effort on your part. You can also [checkout which fonts are available by default on iOS](https://developer.apple.com/fonts/system-fonts/).
:::

## How to add a custom font to the Adapty Dashboard

If you need more than what’s offered by default, you can add a custom font. Once added, the custom font will be available throughout the app, and you can use it for any text line on any paywall.

1. Choose **Add custom font** in any of the font dropdowns:


<Zoom>
  <img src={require('./img/7498a5a-add_custom_font.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





2. In the **Add custom font** window:
   1. Locate your font file and upload it to this form.
   2. Provide a name to reference it in the Paywall Builder.
   3. Specify the correct font names for both platforms.
   4. Add the font file to your app's bundle if you haven't done it yet.


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





:::warning
The font file you upload is not sent to the device; it’s only used for preview purposes. Our SDK receives only the strings referencing the font to use while rendering the paywall. Therefore, you must include the same font file in the app bundle and provide the correct platform-specific font names for everything to work smoothly. Don’t worry, it won’t take much time.
:::

:::note
By uploading the font file to Adapty, you’re confirming that you have the right to use it in your app.
:::

## Getting the correct font name on iOS

There are two ways to get the correct ID for a font: the first involves some basic coding, and the second involves using an app called "Font Book," available on macOS.

If you’ve already added a custom font to your app’s bundle, you’re likely already referencing it by the font name. To confirm, call `UIFont.familyNames()` to get the family name of the font and then plug it into `UIFont.fontNames(forFamilyName: familyName)`. You can do this in `viewDidLoad` and then remove the code snippet:

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

The `fontName` in the above snippet is what you’re looking for. It might look something like "MyFont-Regular."

The second method is simpler: Install the font on your Mac, open the **Font Book** app, find the font, and use its `PostScript name`:


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





## Getting the correct font name on Android

If you’ve properly added the font file to the resource folder, simply provide the name of the file. Make sure it’s lowercase and contains only letters, numbers, and underscores—otherwise, it might not work.

You can confirm the filename is correct by calling `ResourcesCompat.getFont(context, R.font.my_font)`, with `my_font` being the filename you’re using. In this case, `my_font` is exactly what you should input when creating a custom font in Adapty.

## Adding the font files to your app's bundle

If you’re already using a custom font elsewhere in your app, you’re likely all set. But if not, make sure to include the font file in your app's project and bundle. Read how to do it below:

- On iOS: [In Apple official documentation](https://developer.apple.com/documentation/uikit/text_display_and_fonts/adding_a_custom_font_to_your_app)
- On Android: [In Android official documentation](https://developer.android.com/develop/ui/views/text-and-emoji/fonts-in-xml)