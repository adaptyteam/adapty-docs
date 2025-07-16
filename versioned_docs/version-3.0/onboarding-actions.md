---
title: "Onboarding actions"
description: "Configure actions—navigate, open paywalls, fire events, and close flows—in Adapty’s no-code onboarding builder."
metadataTitle: "Onboarding actions | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Actions are the interactive behaviors you assign to onboarding elements so they respond to user input or process events. By configuring a trigger (like a button press or loader completion) and choosing an action type, you control how users move through and interact with your onboarding flow.

:::tip
Learn more on branching onboarding flows in the detailed article.
:::

## Add actions

Action configuration flow depends on the element type you add it to. You can add actions to the following elements:
- **Buttons**: Configure actions in the [**On Press** dropdown of the **Element** tab](onboarding-buttons.md#add-buttons).
- **Quizzes**: Configure actions in the **Behaviour** section of the **Element** tab.
- **Loaders**: Configure actions in the **Complete action** section of the **Element** tab.

For example, this is where you can find it for quizzes:

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

While configuring actions, you can choose one of the following types:

#### Navigate
Used to move the user to another onboarding screen, letting you control flow based on user actions or selections. Great for chaining multiple actions for multi-step logic with quizzes.

#### Show/Hide element

Toggles visibility of a specified element for conditional content within a screen. Use to display extra content only when users needs that.

#### Open paywall

Launches your app’s paywall to present purchases or subscriptions.

#### Scroll to

Programmatically scrolls the view to a target element on the current screen. Helpful for long‑form screens when a “See details” button is pressed.

#### Custom

Allows you to [define and execute your own logic](handling-onboarding-events.md) within the onboarding process. This action can be used to trigger specific behaviors or functions that are not covered by the standard action types.

#### Close onboarding

Ends the onboarding flow and closes the interface. Use when users finish setup to immediately drop back into the main app.

## Action triggers

Actions can fire depending on the element type they are added to:

- **Button**: runs when a user clicks a button or upon a timer completion.
- **Quiz**: executes when an option is selected.
- **Loader**: triggers after a Loader or Processing finishes.