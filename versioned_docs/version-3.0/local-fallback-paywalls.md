---
title: "Download fallback paywalls"
description: "Use local fallback paywalls in Adapty to ensure seamless subscription flows."
metadataTitle: "Using Local Fallback Paywalls | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

Adapty automatically generates JSON configuration files for your [fallback paywall setup](/fallback-paywalls).

1. Open the **[Placements](https://app.adapty.io/placements)** page
2. Click the **Fallbacks** button
3. Select your target platform (*iOS* or *Android*) from the dropdown menu
4. Select your SDK version to start the download

<Zoom>
  <img src={require('./img/9c63367-placements.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Next Steps

Follow the setup guide for your particular platform:

* [iOS](ios-use-fallback-paywalls)
* [Android](android-use-fallback-paywalls)
* [Kotlin Multiplatform](kmp-use-fallback-paywalls)
* [React Native](react-native-use-fallback-paywalls)
* [Flutter](flutter-use-fallback-paywalls)
* [Capacitor](capacitor-use-fallback-paywalls)
* [Unity](unity-use-fallback-paywalls)