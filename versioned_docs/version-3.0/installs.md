---
title: "Installs"
description: "Track app installs and understand their impact on subscriptions with Adapty."
metadataTitle: "Tracking Installs & Attribution | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The Installs chart shows the total number of users who have installed the app for the first time, as well as any reinstalls by existing users. This includes multiple installations by the same user on different devices. Please note that incomplete downloads or installations that are canceled before completion are not counted toward the install count.


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

Adapty’s Installs chart counts the total number of times the app has been installed, including by both new and existing users, as well as any reinstalls on different devices. However, incomplete installs or downloads canceled before finishing are not counted.

You can define what qualifies as a new install event—whether it’s an installation on a specific device or one made by a specific user. Since a single user can have more than one device, this choice may affect your results. Set this in [**App Settings**](https://app.adapty.io/settings/general) under the [Installs definition for analytics](general#4-installs-definition-for-analytics) parameter.

If you’re using the legacy **Installs definition for analytics** option based on profiles, the Installs chart might also include counts of new logged-in users who have accessed your app multiple times.

### Available filters and grouping

- ✅ Filter by: Attribution, country, and store.
- ✅ Group by: Country, store, attribution status, attribution channel, attribution campaign, attribution ad group, attribution ad set, and attribution creative.

You can find more information about the available controls, filters, grouping options, and how to use them in [this documentation.](controls-filters-grouping-compare-proceeds)

### Installs chart usage

The Installs chart provides a useful metric to track the overall growth of the user base. By analyzing the chart, you can gain insights into the number of new users who have installed their app for the first time, as well as any reinstalls by existing users. This information can help to identify trends and patterns in user acquisition over time, and make informed decisions about marketing and promotional activities.