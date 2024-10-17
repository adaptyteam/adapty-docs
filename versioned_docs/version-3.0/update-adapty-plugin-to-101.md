---
title: " Migrate Adapty Plugin for FlutterFlow to 1.0.1"
description: ""

---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Addactivationaction from './reusable/addactivationaction.md';

<!--- update-adapty-plugin-to-101.md --->

Migration to the Adapty Plugin for FlutterFlow v.1.0.1 is comprised of 2 major steps:

1. Update of the plugin version in the project dependency
2. Addition of a new activation action.
3. Call of the new `activateAdaptyAction` at application launch.

Let's start.

## Update the dependency

For the Adapty Dashboard to recognize your app, you’ll need to provide a special key in FlutterFlow.

1. In your FlutterFlow project, open **Settings and Integrations** -> **Permissions** from the left menu.

<Zoom>
  <img src={require('./FF_img/initiate.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Find Adapty Plugin.

3. Click **Update to latest**.

4. Wait for version 1.0.1 to install.

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
