---
title: "Onboarding actions"
description: "Configure actions—navigate, open paywalls, fire events, and close flows—in Adapty’s no-code onboarding builder."
metadataTitle: "Onboarding actions | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Actions are the interactive behaviors you assign to onboarding elements, allowing them to respond to user input or handle events. By setting a trigger (like a button press or loader completion) and selecting an action type, you control how users move through and interact with your onboarding flow.

:::tip
Learn more about branching onboarding flows in the detailed article.
:::

## Add actions

The configuration process depends on the element you attach the action to. You can add actions to the following elements:
- **Buttons**: Configure actions in the [**On Press** dropdown of the **Element** tab](onboarding-buttons.md#add-buttons).
- **Quizzes**: Configure actions in the [**Behaviour** section of the **Element** tab](onboarding-quizzes.md#step-2-configure-navigation).
- **Loaders**: Configure actions in the **Complete action** section of the **Element** tab.

For example, here's where to find it for quizzes:

<Zoom>
<img src={require('./img/onboarding-user-engagement4.png').default}
style={{
border: '1px solid #727272', /* border width and color */
width: '700px', /* image width */
display: 'block', /* for alignment */
margin: '0 auto' /* center alignment */
}}
/>
</Zoom>

## Action types

When configuring actions, choose one of the following types:

#### Navigate
Moves the user to another onboarding screen, letting you control flow based on user actions or selections. Ideal for chaining multiple actions for multi-step logic with quizzes.

#### Show/Hide element
Toggles the visibility of a specified element for conditional content within a screen. Use this to display extra content only when users need it.

#### Open paywall
Launches your app’s paywall to present purchases or subscriptions. Learn how to handle opening paywall on [iOS](ios-handling-onboarding-events.md#opening-a-paywall), [Android](android-handle-onboarding-events.md#opening-a-paywall), [Flutter](flutter-handling-onboarding-events.md#opening-a-paywall), and [React Native](react-native-handling-onboarding-events.md#opening-a-paywall).

#### Scroll to
Programmatically scrolls the view to a target element on the current screen. Helpful for long-form screens when a “See details” button is pressed.

#### Custom
Allows you to define and execute your own logic based on the [action ID](#action-id). Use this action to trigger behaviors not covered by the standard action types.

Learn how to handle custom action on [iOS](ios-handling-onboarding-events.md#custom-actions), [Android](android-handle-onboarding-events.md#custom-actions), [Flutter](flutter-handling-onboarding-events.md#handle-custom-actions), and [React Native](react-native-handling-onboarding-events.md#handle-custom-actions).

#### Close onboarding
Ends the onboarding flow and closes the interface. Use when users finish setup to immediately drop back into the main app.

Learn how to handle onboarding closure on [iOS](ios-handling-onboarding-events.md#closing-onboarding), [Android](android-handle-onboarding-events.md#closing-onboarding), [Flutter](flutter-handling-onboarding-events.md#closing-onboarding), and [React Native](react-native-handling-onboarding-events.md#closing-onboarding).

## Action triggers

Actions fire depending on the element they’re attached to:

- **Button**: Runs when a user clicks a button or when a timer completes.
- **Quiz**: Executes when an option is selected.
- **Loader**: Triggers after a Loader or Processing finishes.

## Action ID

When setting up custom actions for buttons, you may want to handle different buttons the same way using action IDs:

1. When [adding a button](onboarding-buttons.md#add-buttons), assign it an ID in the **On Press** section of the **Element** tab.
2. [Use the assigned action ID in your source code](ios-handling-onboarding-events.md#custom-actions).

:::note
Action ID is not the same as the [element ID](onboarding-variables.md) used for inserting dynamic data with variables. Be sure not to mix them up.
:::


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