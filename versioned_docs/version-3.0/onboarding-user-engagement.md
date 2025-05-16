---
title: "Customize onboardings for different user groups"
description: "Customize onboardings using questionnaires."
metadataTitle: "Customize Adapty Onboardings | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Onboardings in Adapty offer you two main options to customize onboardings for different user groups:

- [Adding quizzes](#add-quizzes): Redirect your users to different screens based on how they answer your questions.
- [Using variables](#use-variables): Personalize your communication with users based on the data they input.

## Add quizzes 

If you want to make onboarding more engaging, add quizzes to your onboarding and tailor the onboarding experience based on what users answer. In this guide, we will show you a simple setup example.

Let's say in your recipe app, you want to know whether your users are vegan/vegetarian and then learn more about their preferences, considering the answer.

### Step 1. Add screens   

1. Add a new screen. Then, add a **Quiz** element to it. You can select any quiz type – with or without emojis or images.
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
2. Add the screens you will display to different user groups. In our example, they will collect additional info, so they will also contain quizzes.
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
3. Add a final screen. It will indicate that the onboarding has ended, so users can go straight to the app.
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

### Step 2. Configure navigation

1. To set up conditional navigation, select the **Options** element on the first quiz screen. In the **Behavior** section, add **Action on Option**. Since we want to redirect users to different screens based on their answers, select **Navigate** as an action and select **Dynamic** for **Data** and your **Options** element in **State**. Associate each option with a screen.

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

2. On both conditionally displayed screens, configure the navigation button. Since we need to skip the second conditional screen we've added, point the navigation button specifically to the screen you want to show next.

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

   
## Use variables

Variables are values set based on user input or environmental data. They play a key role in creating a more personalized and improved onboarding experience.

This is how you can use variables:

1. Create a text input field, date picker or options element and set its ID.



2. Use the element ID in onboarding texts in the `{{element-id}}` format. For example, you 