---
title: "Design onboardings"
description: "Create meaningful onboardings."
metadataTitle: "Using Adapty Onboarding Builder | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The no-code mobile app onboarding builder is a powerful and customizable tool that will help you provide your users with the best onboarding experience. You don't even need to be a developer or designer to get a great result.

## Onboarding screens

The onboarding flow consists of several screens that you add and design.

Users will tap the button to navigate between them.

:::tip
If some of your users need a slightly different flow (for example, in your fitness app, you might want to show different 'goal' pictures based on the user's gender), you don't need to create separate onboardings. 

Instead, you can [make some screens hidden by default and displayed only for some scenarios](onboarding-user-engagement.md).
:::

## Onboarding elements

The onboarding elements are displayed on the left in the order they are displayed. Click **Add** at the top right to add a new element.

There are the following groups of elements you can add:

- **Containers**: Containers allow you to set up a flexible layout. For example, if you want to add a two-column text, you need to add **Columns** and then drag two text blocks into **Columns** on the left pane. Or, if you are adding a carousel, you'll need to add images to the **Media** elements inside.
- **Typography**: Add pre-formatted text blocks and configure their look as needed.
- **Media & Display**: Except for images and videos, you can add animated charts that demonstrate your app value and encourage users.
- **Quiz**: Create short questionnaires with text and image options to customize the onboarding experience and get to know your users better.
- **Inputs**: Collect your users' data.
- **Buttons**: Buttons let your users navigate between screens, close the onboarding or move to the paywall. You can also add glossy or moving buttons to attract user's attention and convert their install to a purchase.
- **Loaders**: Animated loaders keep users engaged during the process.
- **User engagement**: Add testimonials, user email lists and countdowns.

:::tip
As a part of the **Media & Display** group, you can also add custom HTML code if the provided customization options are not enough.
:::

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

### Element ID and action ID

If you want to use a button for custom actions, [assign it an **action ID** and then use it in your source code](http://adapty.io/docs/ios-handling-onboarding-events#custom-actions). Action IDs let you handle different buttons with the same action ID in the same way.

  <Zoom>
  <img src={require('./img/ios-events-1.webp').default}
  style={{
  border: '1px solid #727272', /* border width and color */
  width: '700px', /* image width */
  display: 'block', /* for alignment */
  margin: '0 auto' /* center alignment */
  }}
  />
  </Zoom>

If you want to [process user input in a specific field](http://adapty.io/docs/ios-handling-onboarding-events) (e.g., save their age or email), assign it an **element ID** and then use it in your source code to associate questions with answers. Element IDs can be used only once in your onboarding.

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

You have the following customization options in the builder:
- **Styles** tab: Adjust the element's look.
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
- **Element** tab: Set the element’s attributes, such as visibility, actions for pressing buttons or other properties unrelated to the element's look.
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
- **Screen** tab: Set up the general screen configuration, such as a header or displaying a screen counter.
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

:::tip
If you use a background image, you can also set a background color similar to the image's primary color, so that transitions between screens are as smooth as possible.
:::