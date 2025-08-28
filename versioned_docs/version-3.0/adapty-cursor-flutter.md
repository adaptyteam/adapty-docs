---
title: "Use LLMs to implement Adapty"
description: "Install and configure Adapty SDK in your Flutter project using Cursor, ChatGPT, Claude, or other AI tools."
metadataTitle: "Use Adapty with LLMs | Flutter SDK | Adapty Docs"
displayed_sidebar: sdkflutter
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

You can use large language models (LLMs) to help you integrate Adapty into your Flutter app. We provide a set of tools and best practices if you use LLMs during development.

## Plain text docs

You can access all of our documentation as plain text markdown files by adding `.md` to the end of any URL or clicking **View as Markdown** under article titles. To copy the whole Markdown content immediately, click **Copy for LLM**. For example, you can find the plain text version of this page itself at [https://adapty.io/docs/adapty-cursor-flutter.md](https://adapty.io/docs/adapty-cursor-flutter.md).

This helps AI tools and agents consume our content and allows you to copy and paste the entire contents of a doc into an LLM. This format is preferable to scraping or copying from our HTML and JavaScript-rendered pages because:

* Plain text contains fewer formatting tokens.
* Content that isn't rendered in the default view (for example, it's hidden in a tab) of a given page is rendered in the plain text version.
* LLMs can parse and understand markdown hierarchy.

We also host the [`llms.txt` file](https://adapty.io/docs/llms.txt) which instructs AI tools and agents how to retrieve the plain text versions of our pages. The `/llms.txt` file is an [emerging standard](https://llmstxt.org/) for making websites and content more accessible to LLMs. Note that for some AI agents (e.g., ChatGPT) you will need to download llms.txt and upload it to the chat as a file.

:::tip
Additionally, we host [`llms-full.txt`](https://adapty.io/docs/llms-full.txt). The `llms-full.txt` file combines the entire Adapty documentation site into a single file as context for AI tools and is indexed by LLM traffic.
:::

## Use with Cursor

**Cursor**, the AI code editor, makes it easier to integrate and maintain Flutter apps with Adapty's infrastructure. This guide shows you how to configure Cursor for better results when working with Adapty's Flutter SDK.

### Add Adapty documentation to Cursor

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

### Add Adapty SDKs to Cursor

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

- `@Adapty Docs help me install the Adapty Flutter SDK`
- `Using @Adapty Flutter SDK, show me how to handle purchase restoration with proper error handling`
- `@Adapty Docs @Adapty Flutter SDK help me show a paywall created in the paywall builder` 