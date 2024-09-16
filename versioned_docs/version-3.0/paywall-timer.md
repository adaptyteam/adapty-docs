---
title: "Paywall timer"
description: "Enhance your promotions with a customizable paywall timer, perfect for creating urgency with time-limited offers, featuring adjustable text, color, and format options."
metadataTitle: "Customizable Paywall Timer for Special Offers"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The paywall timer is a great tool for promoting special and seasonal offers with a time limit. However, it's important to note that this timer isn't connected to the offer's validity or the campaign's duration. It's simply a standalone countdown that starts from the value you set and decreases to zero. When the timer reaches zero, nothing happens—it just stays at zero.

You can customize the text before and after the timer to create the desired message, such as: "Offer ends in: 10:00 sec."


<Zoom>
  <img src={require('./img/87de83a-Timer_withou_text.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>






<Zoom>
  <img src={require('./img/f1be626-timer_example.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





1. Add a timer as a separate element to a paywall or to another paywall element, like a card.

2. Configure the timer's settings: format and separator, start value, text before and after (if needed), color, font, spacing, etc.


<Zoom>
  <img src={require('./img/e83e891-timer.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>


