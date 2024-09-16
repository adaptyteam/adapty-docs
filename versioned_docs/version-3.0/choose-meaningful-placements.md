---
title: "Choose meaningful placements"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

When [creating placements](create-placement), it's essential to consider the logical flow of your app and the user experience you want to create. Most apps should have no more than 5 [placements](placements) without sacrificing the ability to run experiments. Here's an example of how you can structure your placements:


<Zoom>
  <img src={require('./img/5b47c03-user-flow-placements_1.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. **Onboarding placement:** This placement represents the first interaction your users have with your app. It's an excellent opportunity to introduce your users to your app's value proposition and set the stage for a positive user experience. Over 80% of subscriptions are activated during onboarding, so it's important to focus on selling the most profitable subscriptions here. With Adapty, you can easily show different paywalls to different audiences and run A/B tests to find the best option for your app. For example, you can run an A/B test for users from the US, showing more expensive subscriptions 50% of the time.
2. **App settings placement:** If the user hasn't subscribed during onboarding, you can create a placement within your app. This can be in the app settings or after the user has completed a specific target action. Since users inside the app tend to think more thoroughly about subscribing, the products on this paywall might be slightly less expensive compared to those in the onboarding stage.
3. **Promo placement:** If the user hasn't subscribed after seeing the paywall multiple times, it could indicate that the prices are too high for them or they are hesitant about subscriptions. In this case, you can show a special offer to them with the most affordable subscription or even a lifetime product. This can help entice users who are price-sensitive or skeptical about subscriptions to make a purchase.  
   Most apps will have similar logic and placements, following the user journey and key points where paywalls or A/B tests can be displayed to drive conversions and revenue. In each placement, you can configure multiple paywalls or A/B tests to experiment and optimize your monetization strategies.