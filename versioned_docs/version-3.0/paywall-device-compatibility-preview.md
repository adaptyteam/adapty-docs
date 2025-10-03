---
title: "Preview paywalls"
description: "Preview paywall compatibility across devices for an optimized experience."
metadataTitle: "Previewing Paywall Device Compatibility | Adapty Docs"
keywords: ['ipad', 'ipad view', 'preview']
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::important
This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Legacy Paywall Builder device compatibility preview](paywall-layout-and-products-legacy#device-compatibility-preview).
:::

You have two ways to preview your paywall on different screen types:
- **Preview on devices**: Ensure everything looks as intended on real devices at any stage of development.
- **Preview in the Adapty dashboard**: Preview your paywall while designing it.

## Preview on devices

To preview your paywall on a real device:

1. [Download the Adapty app from the App Store](https://apps.apple.com/app/adapty/id6739359219).
2. In the paywall builder, click **Test on device**.

<Zoom>
  <img src={require('./img/test-on-device.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<br/>

3. Select the paywall locale.
4. Scan the QR code with the device camera or open the link. This will open your paywall in the Adapty mobile app.

:::note
In the test mode, Adapty can't access your products in stores, so the prices displayed in the paywall are not real.
:::

<Zoom>
  <img src={require('./img/qr-code.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '400px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Preview in the Adapty dashboard

You can preview your paywall on different screen types using the panel on the right side of the paywall builder. This helps ensure your paywall looks great across various devices and screen sizes.

From here, you can:
- Select the device to preview your paywall on.
- Switch between horizontal and vertical preview modes — especially useful for paywalls designed for iPad.
- Zoom in or out of the preview.
- Preview [tags variables for product info](https://adapty.io/docs/paywall-builder-tag-variables#how-to-use-tag-variables).

:::tip
Set the [maximum width](https://adapty.io/docs/paywall-layout-and-products#content-layout) of elements to optimize layout on iPads.
:::

<Zoom>
  <img src={require('./img/paywall-preview.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

