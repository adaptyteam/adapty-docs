---
title: "Onboarding variables"
description: "Use dynamic variables in Adapty’s no-code onboarding builder to personalize content, capture user data, and drive tailored user flows."
metadataTitle: "Onboarding variables | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Variables are values set based on user input or environmental data. They're essential for creating personalized and engaging onboarding experiences.

## What variables are for

Variables let you insert dynamic data—like quiz responses or user text inputs—directly into your onboarding screens. Each user sees personalized content without any coding required. For example, greet users by name using text inputs, or route quiz responders to custom follow-up screens.

You use variables by placing the element ID of the data source between double braces, like this: `{{element_id}}`.

As variables, you can use the data collected on previous screens:
- **Inputs**: The variable contains data entered by the user.
- [**Quizzes**](onboarding-quizzes.md): The variable contains the label data of selected options. If multiple answers are allowed, the variable will contain all selected options, separated by a comma and space.

:::note
Element ID is not the same as the [action ID](onboarding-actions.md#action-id) used for custom actions logic. Be sure not to mix them up.
:::

## Use variables

Here's how to use variables:

1. Create an Input element or quiz option and set its ID.

   <Zoom>
   <img src={require('./img/onboarding-user-engagement6.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '700px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

2. Use the element ID in onboarding texts in the `{{element-id}}` format. For example, you can personalize your text using the user's name.

   <Zoom>
   <img src={require('./img/onboarding-user-engagement7.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '400px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>

3. When users enter their data during onboarding, it will appear dynamically wherever you've placed variables.

   <Zoom>
   <img src={require('./img/onboarding-user-engagement8.png').default}
   style={{
   border: '1px solid #727272', /* border width and color */
   width: '400px', /* image width */
   display: 'block', /* for alignment */
   margin: '0 auto' /* center alignment */
   }}
   />
   </Zoom>