---
title: "Onboarding buttons"
description: "Add buttons to navigate users between screens, close the onboarding or move to the paywall."
metadataTitle: "Onboarding buttons | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


Learn how to add and configure standard, animated, glossy, and countdown buttons in Adapty's no-code onboarding builder. Guide users, drive conversions, and close your flow—all without writing a single line of code.

## Add buttons

Use a Pulse Button to draw attention and boost click-through rates. Or add a Countdown Button on trial expiration slides to create urgency and increase upgrades.

To add a button:
1. Click **Add** at the top left.
2. Select **Buttons** and choose one:
   - **Button**
   - **Pulse Button**
   - **Glossy Button**
   - **Pulse Glossy Button**
   - **Countdown Button**
3. Choose the [button action](onboarding-actions.md) from the **On Press** dropdown on the right:
   - **Navigate**: Moves the user to a specified onboarding screen.
   - **Show/Hide element**: Shows or hides a target element.
   - **Open paywall**: Opens the paywall screen for purchases. Learn how to handle opening paywall on [iOS](ios-handling-onboarding-events.md#opening-a-paywall), [Android](android-handle-onboarding-events.md#opening-a-paywall), [React Native](react-native-handling-onboarding-events.md#opening-a-paywall), and [Flutter](flutter-handling-onboarding-events.md#opening-a-paywall).
   - **Scroll to**: Scrolls the page to a specific element.
   - **Custom**: Runs your custom event logic. For example, ut can be used for opening a login window or requesting the app permissions. Learn how to handle custom action on [iOS](ios-handling-onboarding-events.md#custom-actions), [Android](android-handle-onboarding-events.md#custom-actions), [React Native](react-native-handling-onboarding-events.md#handle-custom-actions), and [Flutter](flutter-handling-onboarding-events.md#handle-custom-actions).
   - **Close onboarding**: Closes the onboarding flow. Learn how to handle onboarding closure on [iOS](ios-handling-onboarding-events.md#closing-onboarding), [Android](android-handle-onboarding-events.md#closing-onboarding),[React Native](react-native-handling-onboarding-events.md#closing-onboarding), and [Flutter](flutter-handling-onboarding-events.md#closing-onboarding).

To edit button text, click the button preview and make your changes in WYSIWYG mode.

:::tip
[Nest a popup](onboarding-layout.md#containers) with a Pulse Glossy Button to upsell premium features mid‑flow.

<Zoom>
  <img src={require('./img/popup.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '300px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::


<Zoom>
  <img src={require('./img/add-button.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Button customization

Beyond the basic [element layout](onboarding-layout.md#element-layout), you can customize button appearance:

1. Select the button element on the left.
2. Go to **Styles** in the right menu.
3. Based on the button type, you can adjust these options:
   - **All buttons**: Width, padding, background, roundness, border, border color, shadows, next arrow and arrow size, right offset, text or countdown color, font, and line height.
   - **Pulse Button**: Animation duration and easing, shadow color and size, button grow.
   - **Glossy Button**: Glossy line color, width, angle, and animation duration.
   - **Pulse Glossy Button**: Animation duration and easing, shadow color and size, button grow, glossy line color, width, angle, and animation duration.

<Zoom>
  <img src={require('./img/button-customize.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

