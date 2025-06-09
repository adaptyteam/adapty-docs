---
title: "Paywall device compatibility preview"
description: "Preview paywall compatibility across devices for an optimized experience."
metadataTitle: "Previewing Paywall Device Compatibility | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

:::warning

This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Legacy Paywall Builder device compatibility preview](paywall-layout-and-products-legacy#device-compatibility-preview).

:::


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

