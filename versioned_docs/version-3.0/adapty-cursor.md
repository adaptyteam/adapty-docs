---
title: "Use Adapty with Cursor"
description: "Install and configure Adapty SDK in your project using Cursor."
metadataTitle: "Use Adapty with Cursor | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

**Cursor**, the AI code editor, makes it easier to integrate and maintain apps with Adapty's infrastructure. This guide shows you how to configure Cursor for better results when working with Adapty's SDK.

## Add Adapty documentation to Cursor

Adding Adapty's documentation directly to Cursor means you don't have to switch between your code editor and browser. This setup gives you quick access to the latest implementation guides and best practices while coding.

To add Adapty documentation to Cursor:

1. In Cursor, go to **Settings > Cursor settings**. Switch to **Indexing & Docs**.
2. Click **Add doc**.
3. Enter the URL `https://adapty.io/docs`.
4. Name the documentation `Adapty Docs` and click **Confirm** to save it.

<Zoom>
  <img src={require('./img/adapty-cursor.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Add Adapty SDKs to Cursor

For platform-specific development, we recommend adding the GitHub repositories for the Adapty SDKs you're using. This gives you access to the latest code examples, changelogs, and implementation details.

Follow the same process as above, but use the relevant SDK repository URL:

- **iOS SDK**: `https://github.com/adaptyteam/AdaptySDK-iOS`
- **Android SDK**: `https://github.com/adaptyteam/AdaptySDK-Android`
- **Flutter SDK**: `https://github.com/adaptyteam/AdaptySDK-Flutter`
- **React Native SDK**: `https://github.com/adaptyteam/AdaptySDK-React-Native`
- **Unity SDK**: `https://github.com/adaptyteam/AdaptySDK-Unity`

Name each doc `Adapty <Platform> SDK` (e.g., `Adapty Flutter SDK`).

## Reference Adapty in your prompts

Once configured, you can reference Adapty documentation and SDKs using the `@` symbol in your prompts. This makes sure Cursor uses current and accurate information when generating code.

**Example prompts:**

- `@Adapty Docs help me install the Adapty SDK`
- `Using @Adapty Flutter SDK, show me how to handle purchase restoration with proper error handling`
- `@Adapty Docs @Adapty iOS SDK help me show a paywall created in the paywall builder`

