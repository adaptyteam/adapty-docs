---
title: "Onboarding navigation & branching"
description: "Configure static and dynamic navigation in Adapty’s no-code onboarding builder to guide users through flows and branch based on their choices."
metadataTitle: "Onboarding navigation & branching | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Navigation and branching lets you guide users through every step of your onboarding: use static routes to send everyone to core screens, and dynamic navigation to adapt the flow based on user choices. All without writing a single line of code. 

## Set up navigation

You can configure static and dynamic navigation using [buttons](onboarding-buttons.md) and [quizzes](onboarding-quizzes.md). For quizzes, only single-answer quizzes are suitable for navigation.

### Static navigation

Static navigation directs users to the same target screen. To set it up:
1. Add a button or a single-answer quiz.
2. Select the button or quiz and go to the **Element** tab on the right.
3. Set up the **On Press** button section or **Behaviour** for the quiz:
- **Action on** (for quiz only): Select **Option** to unlock navigation settings for the quiz.
- **Action**: Select **Navigate**.
- **Data**: Select **Static** to direct users to the same target screen.
- **Destination**: Choose the destination screen.

:::note
With static navigation, a quiz directs users to the same screen regardless of the answer they select.
:::

<Zoom>
  <img src={require('./img/static-navigation.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Dynamic navigation

Dynamic navigation routes users based on their previous quiz answers. To set it up:
1. Add a button or a single-answer quiz that will navigate users.
2. Select the button or quiz and go to the **Element** tab on the right.
3. Set up the **On Press** button section or **Behaviour** for the quiz:
- **Action on** (for quiz only): Select **Option** to unlock navigation settings for the quiz.
- **Action**: Select **Navigate**.
- **Data**: Select **Dynamic** to direct users based on their previous quiz answers.
- **State**: Choose a quiz whose answers determine the user destination.
4. Select the destination screen for each quiz option. 

Your button or quiz will then route users to the destinations you configured.

<Zoom>
  <img src={require('./img/dynamic-navigation.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Element visibility

You can also add conditional visibility to specific elements. Conditional elements are only visible to users who gave specific quiz answers.

For example, users who answered "What's your experience level" with "Beginner" will see extra details on the next step.

To make an element conditional:
1. Go to the **Element** tab on the right.
2. Select **Conditional** in the **Visible** section.
3. Set up the condition by choosing:
- quiz ID
- operator
- quiz answer
4. (Optional) Click **Advanced condition** to add multiple conditions.

For example, if you selected 'goal' as quiz ID, 'Has' as operator, and 'Education' as quiz answer, the element will be visible only to users whose answers for that quiz include the 'Education' option.

<Zoom>
  <img src={require('./img/element-condition.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Onboarding flow branching

Branching onboarding flows let you split users into separate paths within a single onboarding, delivering tailored content based on their responses or behavior.

Adapty's onboardings offer the following features to branch flows:

- Dynamic navigation: connect quiz answers to different screens and use buttons or quizzes to lead specific users there.
- Conditional visibility: show or hide elements on the same screen without navigating away.
- Variables: personalize later screens with user inputs and quiz answers.

For example, you could branch flows in a recipe app like this:
1. Add a new screen with a quiz. Each option represents a user group.

<Zoom>
  <img src={require('./img/quiz-options.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '250px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Set up different next screens for each group. These screens may include another quiz to gather more data.

   <Zoom>
   <img src={require('./img/onboarding-user-engagement2.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
3. Set up dynamic navigation so quiz answers lead each group to the appropriate screen.

<Zoom>
  <img src={require('./img/branching-quiz.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Use conditional elements on the last screen to show different visuals for each user group.

<Zoom>
  <img src={require('./img/conditional-visual.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
