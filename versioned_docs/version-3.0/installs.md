---
title: "Installs"
description: "Track app installs and understand their impact on subscriptions with Adapty."
metadataTitle: "Tracking Installs & Attribution | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Installs chart shows the total number of app installations.


<Zoom>
  <img src={require('./img/62c4c2c-small-CleanShot_2023-04-28_at_16.24.292x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



### Calculation

The Installs chart counts how many times your app has been installed.

Incomplete installations or downloads that are canceled before completion are not counted.

You can choose how installs are defined for analytics in **App Settings** under
[**Installs definition for analytics**](general#4-installs-definition-for-analytics).
This setting determines what is considered a new install event.

The available options differ in how installs are grouped:

- **By device installations** — each app installation on a device is counted as a separate install, including reinstalls.  
  An install represents a completed app installation from the store. Profile creation (on SDK activation or user logout), user authentication, and app upgrades do not generate additional install events.
- **By unique users** — only the first installation associated with an identified user is counted; installations on additional devices are ignored. Use this setting only if you identify users in Adapty. Note that app stores and attribution platforms (such as App Store Connect, Google Play Console, and AppsFlyer) use a device-based approach to counting installs. If you count installs by customer user IDs in Adapty, install numbers may differ from these external services.

Because a single user may install the app on multiple devices, switching between these options can change install counts and conversion metrics.

If you are using the legacy option based on profiles, installs are calculated using a profile-based approach, which may result in higher install counts compared to device- or user-based definitions.

### Available filters and grouping

- ✅ Filter by: Attribution, country, and store.
- ✅ Group by: Country, store, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in [this documentation.](controls-filters-grouping-compare-proceeds)

### Installs chart usage

The Installs chart provides a useful metric to track the overall growth of the user base. By analyzing the chart, you can gain insights into the number of new users who have installed their app for the first time, as well as any reinstalls by existing users. This information can help to identify trends and patterns in user acquisition over time, and make informed decisions about marketing and promotional activities.