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

:::warning
Fallback configurations require Adapty SDK v2.11 or up.
:::

Adapty automatically generates [fallback configuration files](/fallback-paywalls) in the JSON format. Download the files from Adapty's web interface to include them in your application.

Each file contains configurations for *all* your paywalls and onboardings. If a paywall participates in an A/B test, the fallback configuration will include the variation with the highest weight. Adapty updates these files whenever you modify your paywalls or onboardings.

1. Open the **[Placements](https://app.adapty.io/placements)** page.
2. Click the **Fallbacks** button.
3. Select your target platform (*iOS* or *Android*) from the dropdown.
4. Select your SDK version to start the download.

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

## After the download

Follow the setup guide for your particular platform:

* [iOS](ios-use-fallback-paywalls)
* [Android](android-use-fallback-paywalls)
* [React Native](react-native-use-fallback-paywalls)
* [Flutter](flutter-use-fallback-paywalls)
* [Unity](unity-use-fallback-paywalls)
* [Kotlin Multiplatform](kmp-use-fallback-paywalls)
* [Capacitor](capacitor-use-fallback-paywalls)