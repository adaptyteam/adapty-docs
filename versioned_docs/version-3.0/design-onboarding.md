---
title: "Design onboardings"
description: "Create meaningful onboardings."
metadataTitle: "Using Adapty Onboarding Builder | Adapty Docs"
rank: 80
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The no-code mobile app onboarding builder is a powerful, customizable tool that helps you provide users with the best onboarding experience. You don't need to be a developer or designer to get great results.

## Onboarding screens

An onboarding flow consists of several screens that you add and design to [navigate users](onboarding-navigation-branching.md) through the experience.

If some users need a slightly different flow (for example, in a fitness app, you might want to show different 'goal' images based on the user's gender), you don't need to create separate onboardings. 

Instead, you can [personalize onboarding for different user groups](onboarding-user-engagement.md) using flows based on user choices.

:::tip
For smooth screen transitions, choose a [background color](onboarding-media.md#background-customization) that matches your overall onboarding design (e.g., use grey or black for onboardings with mostly dark screens) or customize the [splash screen](ios-present-onboardings#add-smooth-transitions-between-the-splash-screen-and-onboarding).
:::


## Onboarding elements

Onboarding elements are displayed on the left. Click **Add** at the top left to add a new element, then adjust its [layout](onboarding-layout.md).

You can add the following groups of elements:

- [**Containers**](onboarding-layout.md): Containers let you set up flexible layouts. For example, to add two-column text, you need to add **Columns** and then drag two text blocks into **Columns** on the left pane.
- [**Typography**](onboarding-text.md): Add pre-formatted text blocks and configure their appearance as needed.
- [**Media & Display**](onboarding-media.md): In addition to images and videos, you can add animated charts and [custom HTML code](onboarding-html.md) to create unique interactions or embed third-party widgets. 
  
  Learn more about [supported media formats](onboarding-media.md#supported-formats-and-size).

- [**Quiz**](onboarding-quizzes.md): Create short questionnaires with text and image options to customize the onboarding experience and learn more about your users.
- **Inputs**: Collect user data.
- [**Buttons**](onboarding-buttons.md): Buttons let users navigate between screens, close the onboarding, or move to the paywall. You can also add glossy or animated buttons to attract user attention and convert installs to purchases.
- **Loaders**: Animated loaders keep users engaged during processing.
- **User engagement**: Add testimonials, user email lists, and countdowns.

  <Zoom>
  <img src={require('./img/design-onboarding4.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

### Element ID

To process user input in a specific field (e.g., save their age or email), assign it an **element ID** and then [use it in your source code](ios-handling-onboarding-events.md) to associate questions with answers. Element IDs can only be used once in your onboarding.

  <Zoom>
  <img src={require('./img/design-onboarding5.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

## Customization options

The builder offers the following customization options:

- **Screens** & **Elements** tabs: Drag and drop screens and elements to manage their order, or right-click on them to copy, duplicate, paste, or delete.
  <Zoom>
  <img src={require('./img/onboarding-elements.gif').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>
- **Styles** tab: Adjust [layout](onboarding-layout.md) and appearance for screens or elements.
  <Zoom>
  <img src={require('./img/design-onboarding1.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>
- **Element** tab: Set element attributes, such as [visibility](onboarding-navigation-branching.md#element-visibility), [actions](onboarding-actions.md) for button presses, or other properties unrelated to the element's appearance.
  <Zoom>
  <img src={require('./img/design-onboarding2.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>
- **Screen** tab: Set up general screen configuration, such as headers or screen counter display.
  <Zoom>
  <img src={require('./img/design-onboarding3.png').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>
