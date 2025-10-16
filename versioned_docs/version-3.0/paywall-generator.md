---
title: "Paywall generator"
description: "Generate paywalls with AI and launch them quickly."
metadataTitle: "Paywall Generator | Adapty Docs"
---
import ZoomImage from '@site/src/components/ZoomImage';

:::info
The Paywall AI generator is only available for apps published on the Apple App Store.
:::

You can create a unique, high-converting paywall tailored to your app in just seconds using our built-in AI generator. 

This way, you can launch your paywalls quicker and stop wasting time thinking where to start.

:::note
You can't prompt which elements will be inside the paywall. Mainly, the paywall generator is your way to get perfect visuals by creating text and images.
:::

## Generate paywalls

To generate a paywall:

1. [Add **Apple App ID** in the **App settings > iOS SDK**](app-store-connection-configuration#step-1-provide-bundle-id-and-apple-app-id) if you haven't done it yet.
2. In the **Layout settings** of the paywall, click **Change template > Generate template**. Or, for a new paywall, click **Generate paywall** from the **Builder & Generator tab**.
3. Write your prompt in the input field. Or, select one of the predefined prompts to test what the paywall generator can create for your app. See [the tips below](#how-to-write-prompts-for-paywall-generator) to learn how to write the most effective prompt to get a nice-looking production-ready paywall.
   <ZoomImage id="prompt.webp" width="700px" />

4. The paywall generator will pull information about your app from the App Store a generate a relevant paywall with the products you've added.
5. Choose one of the five generated templates and click **Pick & Open in Builder**, or chat with the generator like you do with your favorite AI agents to improve the generation result. You can get back to the chat anytime later and try other templates from the thread. 

:::important
You can generate up to 10 sets of templates per day for an app. Each chat can contain up to 10 generations. If you reach this limit, create a new chat and use context from the previous chat to write a detailed prompt.
:::

<ZoomImage id="chat.webp" width="700px" />

## How to write prompts for paywall generator

These tips will help you write prompts for generating a production-ready paywall:

- The more details you specify in the prompt, the better.
  - **Bad**: Make my paywall look modern
  - **Good**: Create a modern, minimalistic paywall with a light background, rounded buttons, and subtle gradients. Include a bold headline and clear pricing for monthly and yearly plans.
- Don't describe your app in detail – Adapty pulls this automatically from the App Store:
  - **Bad**: Create a Christmas paywall for my app that teaches people how to draw.
  - **Good**: Create a festive Christmas-themed paywall with warm colors, hand-drawn snowflakes, and a cheerful “Unlock all lessons” headline.
- Describe visuals and text, not layout or structure:
  - **Bad**: Add user reviews to the carousel.
  - **Good**: Include a short quote from a happy user, like “This app completely improved my drawing skills!”, near the bottom of the screen.
- Specify the image or illustration style clearly. 
  - **Bad**: Add an image of people exercising. 
  - **Good**: Add a flat-style illustration of two people doing yoga on mats in a bright, minimal studio. Use soft pastel colors to match a wellness theme.