---
title: "Migrate paywalls between apps"
description: "Learn how to migrate paywalls from other apps in Adapty."
metadataTitle: "Handling Migrate Paywalls in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

With Adapty, you don't need to build a new paywall from scratch for every app. If you manage multiple apps, you can migrate the paywall builder configuration of any paywall created with the builder from one app to another.

Migration lets you copy all visual configurations:
- Layout settings for paywall and all paywall elements
- Media
- Localization

Migration applies only to builder configuration, and it doesn't copy products or remote config. 

:::note
If you migrate a paywall builder configuration with custom fonts, test them on a device as they may display incorrectly.
:::

## Migrate paywall

:::important
You can migrate only paywalls created in the **new** Adapty paywall builder. To migrate **legacy** paywall builder paywalls, you must migrate them to the new paywall builder first.
:::

To migrate a paywall builder configuration:

1. **For new paywall**: Start [paywall creation](create-paywall.md) and add products. Then, click **Build no-code paywall** to open the template library. 

    **For existing paywall**: Go to the **Layout settings** section of the **Builder & Generator** tab and click **Change template**.
2. Click **Migrate** when editing the paywall template.

<Zoom>
  <img src={require('./img/migrate-paywall-builder.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

3. Select the app and the paywall you want to copy the configuration from.

<Zoom>
  <img src={require('./img/migrate-app.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '500px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Click **Copy Selected Paywall**.

After migration, you can make any edits you need and they won't affect the original paywall.  