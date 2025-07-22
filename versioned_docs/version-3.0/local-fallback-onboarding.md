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

Typically, [onboardings](onboardings.md) are fetched from the server when a customer accesses them, and you need to get their configuration before accessing them. However, if you can't get an onboarding config URL at the moment, you can use fallbacks to get the onboarding config URL and other data. 

Adapty generates fallbacks as a JSON file in the necessary format, reflecting the default versions of the paywalls and onboardings you've configured in the Adapty Dashboard. To use the file, download it - one per app store, place it alongside your app on the user's device, and pass its contents to the `.setFallback` method, following the instructions outlined below.

:::important
Note that onboarding fallbacks won't let your users access the onboarding if they don't have an Internet connection. Onboarding fallbacks are primarily URLs you can use to download onboarding configs.

Even if you use onboarding configs, handle the [onboarding offline mode](onboarding-offline.md) in your app.
:::

<details>
   <summary>Before you start adding local fallback paywalls and onboardings (Click to Expand)</summary>

1. Create [onboardings](onboardings.md).
2. [Create placements and add paywalls and onboardings to the placements](create-placement). Placement is the location where the paywall/onboarding will be shown.
</details>

The JSON file with fallbacks contains both paywalls and onboardings at once. To download the JSON file, open **[Placements](https://app.adapty.io/placements)** in the Adapty main menu. Click the **Fallbacks** button. You will get the JSON file. Use its contents in the <InlineTooltip tooltip="setFallback">[iOS](ios-use-fallback-paywalls), [Android](android-use-fallback-paywalls), [React Native](react-native-use-fallback-paywalls), [Flutter](flutter-use-fallback-paywalls), and [Unity](unity-use-fallback-paywalls)</InlineTooltip> method in your mobile app code.

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