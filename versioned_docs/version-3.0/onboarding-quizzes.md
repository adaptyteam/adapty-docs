---
title: "Onboarding quizzes"
description: "Add interactive quizzes to your Adapty onboardings to collect user preferences and drive personalized flows—no code needed."
metadataTitle: "Onboarding quizzes | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Turn your onboarding into a two‑way conversation: add quizzes in Adapty's no‑code builder to collect preferences, segment users, and [branch flows](onboarding-user-engagement.md#onboarding-flow-branching) based on real‑time answers. You'll be gathering insights in minutes—no code required.

## Add quizzes

You can add various quiz types—text, emoji, or image options—to gather user input:

1. Click **Add** at the top left.
2. Select **Quiz** and choose one:
- **Simple**: A single-select list of text options. Use to segment users by a primary attribute (e.g., “What’s your role?”).
- **Multiple choice**: Allows selecting more than one text option. Ideal for gathering all user interests (e.g., favorite features).
- **Emoji**: Options represented by emojis for quick reactions. Great for fast sentiment checks (e.g., “How excited are you?”).
- **Media picker**: Apload images or videos as selectable choices. Perfect for choices that rely on visuals (e.g., select your favorite theme).
- **Rating**: Users rate on a numerical or star scale. Use to measure satisfaction or confidence (e.g., rate this feature 1–5).
- **Popup question**: Displays a modal question overlay. Excellent for time-sensitive prompts.
3. Set up the quiz on the right:
- **Required**: Make an answer mandatory before users can proceed.
- **Layout**: Choose between list or image tile layouts.
- **Multiple answers**: Allow multi-select (disables navigation options for the quiz).
- **Show checkboxes**: Display checkboxes when multiple answers are enabled.
4. Set up quiz options on the right:
- **Label**: Text displayed for each choice.
- **Value**: The value sent to analytics and webhook payloads.
- **Image type**: Upload media or use emojis.
5. Configure [actions](onboarding-actions.md) to fire when the user selects an option.

Learn more in the [guide on designing quizzes](#how-to-design-quizzes) below.

<Zoom>
   <img src={require('./img/add-quiz.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

### How to design quizzes

Here's a simple quiz setup example.

Let's say you have a recipe app and want to know if your users are vegan or vegetarian, then learn more about their preferences based on their answer.

#### Step 1. Add screens

1. Add a new screen and add a **Quiz** element to it.
   <Zoom>
   <img src={require('./img/onboarding-user-engagement1.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>
2. Add screens for different user groups. In our example, these will collect additional information, so they'll also contain quizzes.
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
3. Add a final screen to indicate the onboarding is complete, allowing users to go straight to the app.
   <Zoom>
   <img src={require('./img/onboarding-user-engagement3.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '400px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

#### Step 2. Configure navigation

1. To set up dynamic navigation, select the **Options** element on the first quiz screen. In the **Behavior** section, add **Action on Option**. 

    Since we want to redirect users to different screens based on their answers, select **Navigate** as the action, choose **Dynamic** for **Data**, and select your **Options** element in **State**. Then associate each option with a screen.

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

2. On both conditional screens, configure the navigation button. Since we need to skip the second conditional screen, point the navigation button directly to the screen you want to show next.

   <Zoom>
   <img src={require('./img/onboarding-user-engagement5.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

## Quiz customization

Beyond the basic [element layout](onboarding-layout.md#element-layout), you can customize quiz appearance:

1. Select the quiz element on the left.
2. Go to **Styles** in the right menu.
3. Adjust these settings:
- **Options**: Height, padding, background, roundness, border, border color.
- **Text**: Color, font, alignment.
- **Pressed State**: Background, text color, border color.

:::tip
After customizing a quiz element, you can click **Apply styles to all options** below to apply the same styles across all onboarding screens in bulk.
:::

<Zoom>
   <img src={require('./img/quiz-customization.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>