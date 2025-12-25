---
title: "Onboarding text"
description: "Add and style titles, subtitles, paragraphs, and lists in Adapty’s onboarding builder, and customize text for on-brand user experiences."
metadataTitle: "Onboarding text | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


Text elements help you create clear, personalized conversations with your users. Add titles, paragraphs, or lists with a single click, style them to match your brand, and use [dynamic variables](onboarding-variables.md) to personalize content for each user.

## Add text

You can add various text elements to your onboarding screens. To add text elements:
1. Click **Add** at the top left.
2. Go to **Typography** and choose one:
- **Title**: hero headlines or screen titles that instantly grab attention.
- **Subtitle**: a short supporting line that expands on the title.
- **Text**: body copy for feature descriptions, disclaimers, or inspirational blurbs.
- **Rich text**: mixed formatting for FAQs, terms of service, or any copy that needs links and emphasis.
3. Click the new element to edit its content.
4. (Optional) Select any part of the text to open a tooltip for quick customization—such as bold, italic, links, text color, or resetting styles.

To edit an existing text element, simply click on it and make changes in WYSIWYG mode.

:::tip
If you need to use the same text element on multiple screens, you can copy and paste it: select the element and press Ctrl+C (or ⌘+C on Mac), navigate to another screen, select the element you want to paste after, and press Ctrl+V (or ⌘+V on Mac).
:::

<Zoom>
  <img src={require('./img/onboarding-text.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Add lists

You can add numbered and bullet lists:
1. Click **Add** at the top left.
2. Go to **Typography** and choose one:
- **Numbered list**: perfect for step‑by‑step guides.
- **Bullet list**: highlight benefits or key features without implying order.
3. Go to the **Element** tab on the right to edit list items or upload an image as an item marker.

To edit an existing list element, click on it and make changes in the **Element** tab.

<Zoom>
  <img src={require('./img/onboarding-list.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Add external links

To add an external link:

1. Click **Add** at the top left.
2. In the **Typography** section, select **Title**, **Subtitle**, **Text**, or **Rich text**.
3. Enter your text. 
4. Select the text you want to turn into a link. 
5. Click the **Link** icon in the quick customization menu above the text. 
6. Paste the external URL. 
7. Click **✓** to apply the link.

:::info
In Adapty SDK versions earlier than 3.15.1, external links in onboardings open in the device’s default browser.

Starting with Adapty SDK v3.15.1, external links open in an in-app browser by default, allowing users to stay within your app without switching to another application. If needed, you can [customize this behavior](ios-present-onboardings#customize-how-links-open-in-onboardings).
:::

<Zoom>
  <img src={require('./img/onboarding-url.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Text & list customization

In addition to the basic [element layout](onboarding-layout.md#element-layout), you can customize the appearance of text and lists:

1. Select the element on the left.
2. Go to **Styles** on the right menu.
3. Based on the element type, you can adjust the following options:
    - **Text**: Paragraph color, font, alignment, and line height, links color, font, and decoration.
    - **List**: Text and marker text color and font, marker image width, height, and roundness.

:::tip
To speed things up:
- After customizing a text element, you can click **Apply styles to all paragraphs** below to apply the same styles across all onboarding screens in bulk.
- To change the font for all text elements on a specific screen, select the screen, then go to **Styles > Text** on the right menu.
:::

<Zoom>
  <img src={require('./img/onboarding-customization.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Localization

:::note
Localization for onboardings is coming soon.
:::
