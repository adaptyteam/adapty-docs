# Technical writer's guide to the documentation project

Welcome to the Cassiopeia documentation project! This guide will help you understand all the available components and how to use them when writing documentation.

## Table of contents

- [Getting started](#getting-started)
- [Building and running](#building-and-running)
- [File structure](#file-structure)
- [Available components](#available-components)
- [Markdown features](#markdown-features)
- [Images](#images)
- [Code blocks](#code-blocks)
- [Best practices](#best-practices)

## Getting started

### Creating a new article

1. Create a new `.mdx` file in `src/content/docs/`
2. Add frontmatter with metadata
3. Import any components you need
4. Write your content

The URL is based on the filename (without extension), not the folder structure. For example:
- `src/content/docs/version-3.0/ios/sdk-installation.mdx` → `/sdk-installation`
- `src/content/docs/version-3.0/guides/getting-started.mdx` → `/getting-started`

### Basic article template

```mdx
---
title: "Your Article Title"
description: "Brief description for SEO"
metadataTitle: "SEO Title | Adapty Docs"
keywords: ['keyword1', 'keyword2']
rank: 100 (default — 50)
---

import ZoomImage from '@site/src/components/ZoomImage.astro';
import Tabs from '@site/src/components/Tabs.astro';
import TabItem from '@site/src/components/TabItem.astro';

Your content goes here...
```

## Building and running

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm run dev
```

Opens at `http://localhost:4321`. Changes auto-reload.

### Build for production

```bash
npm run build
```

Output goes to `build/` folder.

### Preview production build

```bash
npm run preview
```

Serves the built site locally. Use this to test before deploying.

### Check for errors

```bash
npm run build 2>&1 | grep -i error
```

## File structure

```
src/
  content/
    docs/ # All documentation articles
      version-3.0/        
        your-article.mdx
        ios/              
          ios-guide.mdx
        android/          
          android-guide.mdx
  assets/
    your-article/         # Article-specific images
      image1.png
    shared/               # Shared images
      common-image.png
  components/             # Reusable components
    reusable/             # Reusable content snippets
```

**Note:** You can organize `.mdx` files in subfolders for better organization (e.g., by platform, topic, etc.), but the URL will always be based on the filename, not the folder path. For example, `version-3.0/ios/sdk-installation.mdx` will be accessible at `/sdk-installation`, not `/ios/sdk-installation`.

## Available components

### 1. ZoomImage - Image with zoom functionality

Display images with click-to-zoom functionality. Automatically resolves images from article folders or shared folder.

**Props:**
- `id` (required): Image filename
- `width` (optional): Image width, default: "700px"
- `alt` (optional): Alt text, defaults to filename
- `className` (optional): Additional CSS classes

**Usage:**

```mdx
import ZoomImage from '@site/src/components/ZoomImage.astro';

<ZoomImage id="screenshot.png" width="700px" alt="Dashboard screenshot" />
```

**Image resolution:**
The component automatically finds images in this order:
1. `src/assets/{article-name}/image.png` (article-specific)
2. `src/assets/shared/image.png` (shared folder)
3. Legacy locations (for backward compatibility)

### 2. Tabs - Tabbed content

Create tabbed interfaces to organize platform-specific or alternative content.

**Props for Tabs:**
- `groupId` (optional): Sync tabs across the page
- `queryString` (optional): Enable URL parameter sync

**Props for TabItem:**
- `value` (required): Unique identifier for the tab
- `label` (optional): Display label (defaults to value)
- `default` (optional): Set as default tab

**Usage:**

```mdx
import Tabs from '@site/src/components/Tabs.astro';
import TabItem from '@site/src/components/TabItem.astro';

<Tabs groupId="platform">
  <TabItem value="ios" label="iOS" default>
    iOS-specific content here
  </TabItem>
  <TabItem value="android" label="Android">
    Android-specific content here
  </TabItem>
  <TabItem value="react-native" label="React Native">
    React Native content here
  </TabItem>
</Tabs>
```

**Features:**
- Synchronized tabs: Use the same `groupId` to sync tab selection across multiple tab groups on the same page
- Persistent selection: Tab selection is saved to localStorage
- Query string support: Add `queryString={true}` to enable URL parameter syncing

### 3. Details - Collapsible sections

Create expandable/collapsible sections for additional information.

**Props:**
- `summary` (required): The clickable summary text
- `defaultOpen` (optional): Start expanded, default: false

**Usage:**

```mdx
import Details from '@site/src/components/Details.astro';

<Details summary="Click to see more details">
  Additional information that can be hidden by default.
  
  - You can use any markdown here
  - Including lists
  - Code blocks
  - etc.
</Details>
```

### 4. InlineTooltip - Hover tooltips

Create hoverable tooltips that show additional information inline.

**Props:**
- `tooltip` (required): The text to show in the trigger

**Usage:**

```mdx
import InlineTooltip from '@site/src/components/InlineTooltip.astro';

This is some text with <InlineTooltip tooltip="the SDK installation guide">
[SDK documentation](sdk-installation.md)
</InlineTooltip> embedded inline.
```

**Features:**
- Appears on hover
- Can be manually closed
- Supports markdown in tooltip content

### 5. CustomDocCardList - Document card grid

Automatically generate a grid of cards linking to related documentation.

**Props:**
- `ids` (optional): Array of document IDs to display

**Usage:**

```mdx
import CustomDocCardList from '@site/src/components/CustomDocCardList.astro';

// Auto-detect child pages from sidebar
<CustomDocCardList />

// Manually specify pages
<CustomDocCardList ids={['ios-quickstart', 'android-quickstart', 'react-native-quickstart']} />
```
### 6. Button - Action button

A stylized button for primary actions or links to other articles. Matches the Adapty brand design.

**Props (at least one is required):**
- `id`: The ID of the article to link to (e.g., `ios-sdk-installation`). Links open in the **same tab**.
- `href`: A full URL for external links (e.g., `https://app.adapty.io`). Links open in a **new tab**.

**Usage:**

```mdx
// Link to another article
<Button id="ios-sdk-installation">
  Install iOS SDK
</Button>

// External link
<Button href="https://app.adapty.io/registration">
  Sign up for Free
</Button>
```

**Features:**
- **Auto-registered**: You don't need to import `Button` manually at the top of your MDX file.
- **Left-aligned**: The button always starts on a new line and is left-aligned.
- **Responsive**: Adapts styling for light and dark modes.

## Markdown features

### Callout boxes

Use special syntax for callout boxes (note, tip, info, warning, danger):

```markdown
:::note
This is a note callout with gray styling.
:::

:::tip
This is a tip callout with green styling.
:::

:::info
This is an info callout with blue styling.
:::

:::warning
This is a warning callout with yellow/amber styling.
:::

:::danger
This is a danger callout with red styling.
:::

:::important
This is an important callout (styled as warning).
:::
```

### Links

**Internal links**:

```markdown
[View Paywalls](paywalls.md)
[Get Started](sdk-installation.md)
[Documentation](../other-doc.mdx)
```

All `.md` and `.mdx` extensions are automatically removed during build.

**External links:**

```markdown
[Adapty Website](https://adapty.io)
```

**Links with anchors:**

```markdown
[Jump to section](page.md#section-name)
```

### Headings

```markdown
# H1 - Page Title (use once per page)
## H2 - Main Section
### H3 - Subsection
#### H4 - Minor Subsection
```

### Lists

**Unordered lists:**

```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

**Ordered lists:**

```markdown
1. First step
2. Second step
3. Third step
```

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |
```

### Inline formatting

```markdown
**Bold text**
*Italic text*
`inline code`
```

## Images

### Recommended: ZoomImage component

```mdx
import ZoomImage from '@site/src/components/ZoomImage.astro';

<ZoomImage id="screenshot.png" width="700px" alt="Description" />
```

### Legacy: Zoom component with require()

```mdx
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

<Zoom>
  <img src={require('./img/screenshot.png').default}
  style={{
    border: '1px solid #727272',
    width: '700px',
    display: 'block',
    margin: '0 auto'
  }}
  />
</Zoom>
```

**Note:** Both methods work, but ZoomImage is recommended for new content.

### Image organization

1. **Article-specific images** → `src/assets/{article-name}/image.png`
2. **Shared images** → `src/assets/shared/image.png`
3. **Legacy images** → Still work from `src/content/docs/version-3.0/img/`

## Code blocks

### Basic code block

````markdown
```javascript
function example() {
  return "Hello World";
}
```
````

### Code block with title

````markdown
```javascript title="app.js"
function example() {
  return "Hello World";
}
```
````

### Highlighting lines

````markdown
```javascript {2,4-6}
function example() {
  const highlighted = true;  // This line is highlighted
  const normal = true;
  const alsoHighlighted = true;  // Lines 4-6 highlighted
  const stillHighlighted = true;
  const lastHighlighted = true;
}
```
````

## Troubleshooting

### Images not showing

1. Check image exists in article folder or shared folder
2. Verify filename matches exactly (case-sensitive!)
3. Check file extension is included in `id` prop

### Build errors

1. Check all imports are at the top of file
2. Verify component syntax is correct
3. Make sure all props are valid
4. Check for unclosed tags

## Getting help

- **Component examples**: Check existing articles in `src/content/docs/version-3.0/`
- **Component source**: See `src/components/` for implementation details

