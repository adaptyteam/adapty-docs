---
title: "Customize onboarding with remote config"
description: "Customize your onboarding with remote config in Adapty for better targeting."
metadataTitle: "Customizing onboarding with Remote Config | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The onboarding remote config is a tool that provides flexible configuration options. It allows the use of custom JSON payloads to tailor your onboardings precisely. With it, you can define various parameters such as titles, images, fonts, colors, and more. For example, you can use remote configs to send additional metadata.

Before you start customizing an onboarding, [create an onboarding](create-onboarding.md).

To start customizing an onboarding using the remote config:

1. Open the onboarding from the **Onboardings** and click **Edit onboarding**.

<Zoom>
  <img src={require('./img/customize-onboarding-remote-config1.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


2. Switch to the **Remote config** tab.

Remote config has two views:

- [Table](customize-paywall-with-remote-config#table-view-of-the-remote-config)
- [JSON](customize-paywall-with-remote-config#json-view-of-the-remote-config)

Both the **Table** and **JSON** views include the same configuration elements. The only distinction is a matter of preference, with the sole difference being that the table view offers a context menu, which can be helpful for correcting localization errors.  
You can switch between views by clicking on the **Table** or **JSON** tab whenever necessary.

<Zoom>
  <img src={require('./img/customize-onboarding-remote-config2.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


Whatever view you've chosen to customize your onboarding, you can later access this data from SDK using the `remoteConfig` property of `AdaptyOnboarding`, and make some adjustments to your onboarding. 

You can combine different options and create your own. 

### JSON view of the remote config

In the **JSON** view of the remote config, you can enter any JSON-formatted data:


<Zoom>
  <img src={require('./img/customize-onboarding-remote-config3.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


### Table view of the remote config

If you don't often work with code and need to correct some JSON values, Adapty has the **Table** view for you.


<Zoom>
  <img src={require('./img/customize-onboarding-remote-config4.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


It is a copy of your JSON in a table format that is easy to read and understand. Color coding helps to recognize different data types.

To add a key, click **Add row**. We automatically check the values and types mapping and show an alert if your corrections may lead to an invalid JSON.


<Zoom>
  <img src={require('./img/customize-onboarding-remote-config5.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

