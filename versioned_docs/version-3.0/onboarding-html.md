---
title: "Custom HTML"
description: "Embed small, lightweight HTML snippets in Adapty's no-code onboarding builder to create interactive widgets and third-party embeds."
metadataTitle: "Onboarding custom HTML | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';



Custom HTML lets you create unique interactions, embed third-party widgets, or quickly test experimental elements without app updates.

:::note
Custom HTML elements are not preloaded or cached, so we recommend using raw HTML only for small, lightweight elements.
:::

To insert custom HTML code:

1. Click **Add** at the top left.
2. Go to **Media & Display** and choose **Raw HTML**.
3. Insert or edit your HTML code on the right.

<Zoom>
  <img src={require('./img/onboarding-html.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>