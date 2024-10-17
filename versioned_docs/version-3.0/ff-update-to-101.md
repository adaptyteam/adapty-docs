---
title: " Migrate Adapty Plugin for FlutterFlow to 1.0.1"
description: ""

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Addactivationaction from './reusable/addactivationaction.md';

<!--- update-adapty-plugin-to-101.md --->

Migrating to the Adapty Plugin for FlutterFlow v1.0.1 involves three key steps:

1. Updating the plugin version in your project dependencies.
2. Adding a new activation action.
3. Calling the new `activateAdaptyAction` when the app launches.

Let’s get started.

## Update the dependency

1. In your FlutterFlow project, go to **Settings and Integrations** -> **Permissions** from the left-hand menu.

   <Zoom>  <img src={require('./FF_img/initiate.webp').default}  style={{    border: '1px solid #727272', /* border width and color */    width: '700px', /* image width */    display: 'block', /* for alignment */    margin: '0 auto' /* center alignment */  }} /> </Zoom>

2. Locate the Adapty Plugin.

3. Click **Update to latest**.

4. Wait for version 1.0.1 to finish installing.

<Zoom>
  <img src={require('./FF_img/update-dependency.webp').default}
  style={{
 border: '1px solid #727272', /* border width and color */
 width: '700px', /* image width */
 display: 'block', /* for alignment */
 margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<Addactivationaction />

## Call the new activation action at application launch

1. Navigate to `main.dart` in the **Custom Files** section.
2. Remove legacy `activate` action from the **Initial Actions** section at the right pane if needed.
3. Click the plus (**+**) button and choose `activateAdaptyAction`.

<Zoom>
  <img src={require('./FF_img/update-activation-action.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
