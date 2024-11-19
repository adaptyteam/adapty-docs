---
title: "Paywall timer"
description: "Enhance your promotions with a customizable paywall timer, perfect for creating urgency with time-limited offers, featuring adjustable text, color, and format options."
metadataTitle: "Customizable Paywall Timer for Special Offers"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The paywall timer is a great tool for promoting special and seasonal offers with a time limit. However, it's important to note that this timer isn't connected to the offer's validity or the campaign's duration. It's simply a standalone countdown that starts from the value you set and decreases to zero. When the timer reaches zero, nothing happens—it just stays at zero.

<Zoom>
  <img src={require('./img/87de83a-Timer_withou_text.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/></Zoom>

:::warning

Paywall timers are only available in the [new Paywall Builder](adapty-paywall-builder), which is compatible with Adapty SDK v3.0 and later, available for iOS, Android, and React Native. The legacy Paywall Builder with Adapty SDK v2.x or earlier does not support paywall timer functionality.

:::

You can customize the text before and after the timer to create the desired message, such as: "Offer ends in: 10:00 sec."

<Zoom>
  <img src={require('./img/f1be626-timer_example.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Add a timer as a separate element to a paywall or to another paywall element, like a card.

2. Configure the timer's settings: format and separator, start value, text before and after (if needed), color, font, spacing, etc.

<Zoom>
  <img src={require('./img/e83e891-timer.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Timer mode

You can control how the timer behaves when users see it by using the **Timer mode** parameter. 3 standard modes work out of the box—just select the required option from the dropdown list:

| Mode                                  | Description                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| **Reset timer on every paywall view** | The timer resets every time the user sees the paywall, starting from the initial value each time. |
| **Reset timer on every app launch**   | The timer starts the first time the user sees the paywall and keeps counting in the foreground or background until the app is restarted. If the user sees the paywall multiple times in the same session, they’ll see the same timer counting down. Once the app is closed, the timer resets, and the next time the app is opened, the timer restarts from the beginning. |
| **Keep timer across app launches**    | The timer starts the first time the user sees the paywall and keeps counting in the foreground or background, even if the app is closed. The user will see the same timer every time they return to the paywall, regardless of app or paywall restarts. |

You can also create a custom timer by selecting **Custom** in the  **Timer mode** parameter and setting up the timer directly in your mobile app code:
