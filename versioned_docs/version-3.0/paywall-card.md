---
title: "Paywall card"
description: "Design and implement paywall cards in Adapty for better engagement."
metadataTitle: "Using Paywall Cards in Adapty | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A card is a paywall element that combines several other elements into a single block. The card itself may or may not be visible if this is not needed. To make it visible, add it a background or background picture, frame, etc.

<Zoom>
  <img src={require('./img/16fd800-PB_card_example.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::warning

Paywall cards are only available in the [new Paywall Builder](adapty-paywall-builder), which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. The legacy Paywall Builder with Adapty SDK v2.x or earlier does not support paywall card functionality.

:::

1. Add a card as a separate element to a paywall or to another paywall element, for example, to a carousel.
2. Add element you need in the card.
3. Configure the card's view: background, shape, frame, etc.


<Zoom>
  <img src={require('./img/66d9877-PB_card.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

