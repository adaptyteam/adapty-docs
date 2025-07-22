---
title: "Customize onboardings for different user groups"
description: "Customize onboardings for different user groups and branch flows based on their choices."
metadataTitle: "Customize Adapty Onboardings | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapty onboardings offer many options to customize experiences for different user groups:
- [Quizzes](onboarding-quizzes.md): Collect user preferences and real-time answers.
- [Dynamic navigation](onboarding-navigation-branching.md#dynamic-navigation): Route users based on their previous quiz answers or behavior.
- [Conditional visibility](onboarding-navigation-branching.md#element-visibility): Show or hide elements on the same screen without navigating away.
- [Variables](onboarding-variables.md): Personalize your communication with users based on the data they input.
- [Actions](onboarding-actions.md): Assign interactive behaviors to onboarding elements to control how users move through and interact with your flow.

These features let you adjust the same flow for different users or create branched onboarding flows.

## Onboarding flow branching

Branched onboarding flows split users into separate paths within a single onboarding, delivering tailored content based on their responses or behavior.

For example, here's how you could branch flows in a recipe app:
1. Add a new screen with a [quiz](onboarding-quizzes.md). Each option represents a user group.

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

2. Set up different next screens for each group. These screens can include another quiz to gather more data.

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
3. Set up [dynamic navigation](onboarding-navigation-branching.md#dynamic-navigation) so quiz answers direct each group to the appropriate screen.

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

4. Use [conditional elements](onboarding-navigation-branching.md#element-visibility) on the final screen to show different visuals for each user group.

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
