---
title: "Onboarding version control"
description: "Revert back to previous versions of your onboardings."
metadataTitle: "Onboarding versioning | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Whenever you **Save**, **Preview**, or **Publish** your onboarding, Adapty saves its state, and adds a new entry to your onboarding's **version history**. If you want to return to this state in the future, you can simply click the associated version history entry.

:::warning
Adapty doesn't autosave your onboardings during the [editing process](design-onboarding). **Save** your onboarding if you want to add it to your version history.
:::

Open the "versions" menu in the top right corner of the page to view your version history. Each version contains a timestamp to let you know when it was saved. Click the arrows button on one of the entries to revert to this state.

:::important
Remember to **publish** the changes after you revert to an earlier version.
:::

<Zoom>
  <img src={require('./img/version-history.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>