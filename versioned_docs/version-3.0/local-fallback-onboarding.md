---
title: "Download fallback onboardings"
description: "Use local fallback onboardings in Adapty to ensure seamless subscription flows."
metadataTitle: "Using Local Fallback Onboardings | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';
import Contentid from '@site/src/components/InlineTooltip';
import InlineTooltip from '@site/src/components/InlineTooltip';

To load an [onboarding](onboardings.md), your application requests its configuration data from Adapty. Onboarding configs store the URLs of your onboarding flows. If a network issue disrupts the connection between your application and the Adapty servers, you cannot correctly configure and display your onboardings.

To stop Adapty from losing access to onboarding configuration data, you can store a fallback configuration file offline. Adapty automatically generates fallback files with configuration data for your onboardings and [paywalls](fallback-paywalls).

Follow the instructions below to download the file and add it to your application code.

:::important
Fallback onboardings **require an internet connection**, since onboarding content is always stored online. The fallback file only stores the onboardings' configuration.

To handle onboarding behavior for users without an internet connection, follow the steps in the [onboarding offline mode](onboarding-offline.md) article.
:::

<details>
   <summary>Before you configure fallback onboardings (Click to Expand)</summary>

1. Create an [onboarding](onboardings.md).
2. [Create a placement](create-placement) for the onboarding to determine where in the app the onboarding appears.

</details>

Adapty generates two fallback files — one per platform. Each file contains configuration data for all your onboardings and paywalls.

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

<details>
   <summary>Onboarding fallback example (Click to Expand)</summary>
```
"PLACEMENT_ID":
    {"data":
        [{"variation_id":"cb1c0ef8-aecd-4a53-a6f3-b98266e66884",
        "onboarding_id":"daf25858-3fa2-4981-8500-9c8a30e5b7e6",
        "onboarding_name":"ONBOARDING_NAME",
        "onboarding_builder":
            {"config_url":"CONFIG_URL",
            "lang":"en"},
        "remote_config":null,
        "cross_placement_info":null,
        "weight":100}],
    "meta":
        {"placement":
            {"developer_id":"DEVELOPER_ID",
            "is_tracking_purchases":true,
            "audience_name":"All Users",
            "placement_audience_version_id":"a9eb3ab8-3178-477d-84d4-ef9d3978e48b",
            "revision":0,
            "ab_test_name":"A/B_TEST_NAME"
        }
    }
},
```
</details>


## After the download

Follow the setup guide for your particular platform:

* [iOS](ios-use-fallback-paywalls)
* [Android](android-use-fallback-paywalls)
* [React Native](react-native-use-fallback-paywalls)
* [Flutter](flutter-use-fallback-paywalls)
* [Unity](unity-use-fallback-paywalls)
* [Kotlin Multiplatform](kmp-use-fallback-paywalls)
* [Capacitor](capacitor-use-fallback-paywalls)