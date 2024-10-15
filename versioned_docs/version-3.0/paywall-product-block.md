---
title: "Paywall product list"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The product list is a key element of your paywall, showcasing your offerings and products in an organized, attractive manner. This list is crucial in guiding users towards making a purchase. Let’s explore how to configure and enhance the product list to maximize its effectiveness.

The **Content** tab contains the products that will be displayed in the paywall. Those are absolutely the same products, you've added to the paywall when created it. You can adjust the list of products, and this will affect the list of products in the **General** tab of the paywall.

After you reviewed the list of products:

1. Choose which product should be preselected by default in the **Selected product** field. 
2. Define how a product should look if it is selected or not in the **Style** tab of the **Products** section.
3. Configure the overall view of the block in the **Layout** tab.

## Product view customisation

Enhancing the visual appeal of specific products can significantly rebalance user attention. Highlighting a product or special offer can encourage users to focus on it. Let’s look at some powerful customization options.

### Product badge

A product badge is a small label that can be added to a product. This badge can provide additional promotional info  and direct users choice. The badge size automatically adjusts to fit the text, and its position is optimized for your paywall layout.

<Zoom>
  <img src={require('./img/eedb135-PB_product_badge.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

To add a product badge:

1. Turn on the **Product badge** toggle in the setting of a specific product.

<Zoom>
  <img src={require('./img/2a5779d-PB_product_badge_config.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Customize the badge view and text to suit your design needs.

### Selected product

For the **Products as list + purchase button** purchase flow, you can **preselect** a product to gently nudge users towards it. This can be especially effective in directing user choice.

<Zoom>
  <img src={require('./img/3f37969-PB_preselected_product.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

To preselect a product: 

1. Open the **Products** element.

<Zoom>
  <img src={require('./img/da4e4c4-PB_preselect_product.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the **Content** tab, choose the product you want to preselect from the **Selected product** drop-down list.
3. Adjust the view of the selected product as well as the default view of other products in the **Style** tab if necessary.

<Zoom>
  <img src={require('./img/ac7411e-PB_setup_selected_default_button.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

### Highlighted product

For the **Products as purchase buttons** purchase flow, you can **highlight** a preferred product to make it the primary choice, drawing immediate user attention..

<Zoom>
  <img src={require('./img/afc2882-PB_highlighted_product.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

To highlight a product:

1. In the left pane, choose the product you want  to highlight.

<Zoom>
  <img src={require('./img/a630507-PB_highlight_product.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. In the **Style** subsection, adjust the design to make the product stand out more..

### Product offers

Each product can feature different text for offers in the **Text** subsection. The **Default** tab contains the text displayed without an offer. This is the perfect place to use [tag variables](paywall-builder-tag-variables) or [custom tags](custom-tags-in-paywall-builder) for dynamic, localized content. Start typing with a triangle bracket, and Adapty will suggest available tag variables to insert localized data from the stores

<Zoom>
  <img src={require('./img/0de6871-PB_text.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Switching between 2 product sets by trial toggle

For a versatile user experience, you can allow users to switch between two sets of products using a toggle. This is especially useful for differentiating between standard products and trials.

To add a toggle:

1. In the **Products** element, change the **Products grouping** option to **Toggle (for free trials and other offers)**. This will add two subsections: **Toggle on** and **Toggle off**.

<Zoom>
  <img src={require('./img/d859a58-PB_turn_on_toggle.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Add products to both subsections to create views for when the toggle is on or off.
3. In the **Toggle** element, define whether the toggle should be on or off by default in the paywall by the **Default state** toggle.

<Zoom>
  <img src={require('./img/4127a67-PB_toggle_default_state.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Showing extra plans under a button

To keep things simple on your paywall, you can hide some products under a button (like "View more plans" or any label you prefer). This helps users focus on your top options first, while still allowing them to explore other plans if they want. It's a great way to make the paywall cleaner and improve conversions.

Here’s how:

1. In the **Products** element, set the **Products grouping** option to **Button (for more alternative plans)**. This will split your products into two groups: **Shown** and **More plans**.

<Zoom>
  <img src={require('./img/view-more-plans.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Distribute your products between these groups. **Shown** is for products you want displayed right away. **More plans** is for products hidden behind the button, shown only when users click it.

   <Zoom>
     <img src={require('./img/divided-plans.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. Customize the text and layout of the button in the **View more plans** element to suit your needs.

   <Zoom>
     <img src={require('./img/view-more-plans-button.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

By mastering these customization options, you can create a compelling, visually appealing product list that guides users towards making a purchase effortlessly.
