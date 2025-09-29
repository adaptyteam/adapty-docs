---
title: "Paywall product list"
description: "Discover how to configure paywall product blocks in Adapty to optimize in-app purchases."
metadataTitle: "Paywall Product Block Guide | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The product list is a key element of your paywall that showcases your offerings in an organized, attractive manner. This list is crucial for guiding users toward making a purchase.


The **Content** tab contains the products that will be displayed in the paywall. These are the same products you added to the paywall when you created it.

You can adjust the list of products. This will affect the product list in the **General** tab of the paywall.

After you review the list of products:

1. Choose which product should be preselected by default in the **Selected product** field. 
2. Define how a product should look if it is selected or not in the **Style** tab of the **Products** section.
3. Configure the overall view of the block in the **Layout** tab or [add products groups](#add-products-group) to combine layouts.

:::warning

This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Legacy Paywall Builder paywall products](paywall-layout-and-products-legacy#products).

:::

## Product view customisation

Enhancing the visual appeal of specific products can significantly rebalance user attention. Highlighting a product or special offer can encourage users to focus on it. Let’s look at some powerful customization options.

### Product badge

A product badge is a small label that can be added to a product. This badge can provide additional promotional information and direct user choice. The badge size automatically adjusts to fit the text, and its position is optimized for your paywall layout.

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

If you add several [product groups](#add-products-group), the same **Selected product** option will be applied to all groups.

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

For the **Products as purchase buttons** purchase flow, you can **highlight** a preferred product to make it the primary choice, drawing immediate user attention.

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

1. In the left pane, choose the product you want to highlight.

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

2. In the **Style** subsection, adjust the design to make the product stand out more.

### Product offers

Each product can feature different text for offers in the **Text** subsection. The **Default** tab contains the text displayed without an offer.

This is a good place to use:
- [tag variables](paywall-builder-tag-variables) for dynamic, localized content
- [custom tags](custom-tags-in-paywall-builder) for your own dynamic content

Start typing with a triangle bracket, and Adapty will suggest available tag variables to insert localized data from the stores.

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

## Switch between 2 product sets by trial toggle

To create a versatile user experience, you can allow users to switch between two sets of products using a toggle. This is especially useful for differentiating between standard products and trials.

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
3. In the **Toggle** element, set the **Default state** to choose whether the toggle should start as on or off in the paywall.

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

## Switch between product sets by tab

Paywall tabs let you group your products into categories, highlighting all possible options for your users. They're especially helpful if:

- Your app offers multiple weekly, monthly, or yearly plans
- You have different tiers like Plus, Gold, or Premium

You can also add elements like feature lists in tabs to help users see the differences between tiers.

To add tabs:

1. In the **Products** element, set **Products grouping** to **Tabs (for comparing plan groups)**. This will split your products into two initial tab groups.

   <Zoom>
     <img src={require('./img/paywall-tabs.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. If you need more tabs, click **Add tab group**. 

   <Zoom>
     <img src={require('./img/add-tab-group.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. Organize your products within these tabs. 

   <Zoom>
     <img src={require('./img/tabs-divided.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

4. Open the first tab group, and in the **Tab title**, enter the name that will appear on the paywall.

   <Zoom>
     <img src={require('./img/tab-rename.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

5. Give an internal tab name in a separate field for easy reference. This name won’t be visible on the paywall but can help you identify the tab in lists.

   <Zoom>
     <img src={require('./img/tab-internal-rename.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

6. Repeat steps 4-5 for each tab.

7. Choose which tab will be active when the user opens the paywall. Go to **Tab control** and select the default tab from the **Selected tab** list.

   <Zoom>
     <img src={require('./img/tab-selected.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

## Show extra products under a button

To keep your paywall simple, you can hide some products or product groups under a button (like "View more plans" or any label you prefer).

This helps users focus on your top options first while still allowing them to explore other plans if they want.

It's a great way to make the paywall cleaner and improve conversions.

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

2. Distribute your products between these groups. **Shown** is for products you want displayed immediately. **More plans** is for products hidden behind the button, shown only when users click it.

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

These options help you build a clear, visually appealing product list that guides users toward purchase.
## Show extra plans in a bottom sheet

To simplify your paywall, you can hide some products and display them only when users click a button (like "View More Plans" or any label you choose).

This action opens a sliding bottom sheet with the hidden products.

This setup helps users focus on your main options first while still giving them the flexibility to explore additional plans if they're interested.

It's an effective way to declutter the paywall and potentially boost conversions.

Here’s how:

1. In the **Products** element, set the **Products grouping** option to **Bottom Sheet (for more alternative plans)**. This will split your products into two groups: **Shown** and **More plans**.

<Zoom>
  <img src={require('./img/bottom-sheet.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Distribute your products between these groups. **Shown** is for products you want displayed immediately. **More plans** is for products that are initially hidden and shown only when users click the button.

   <Zoom>
     <img src={require('./img/bottom-sheet-divided-plans.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. Customize the text and layout of the button in the **View More Plans** element to fit your design and messaging.

   <Zoom>
     <img src={require('./img/bottom-sheet-button.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

4. The bottom sheet will automatically use the same product list display format as your main paywall, whether products are separate purchase buttons or each product acts as a button. You can customize the bottom sheet layout, text, style, and default product selection.

<Zoom>
  <img src={require('./img/bottom-sheet-layout.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

These options help you create a simple, user-friendly product list.

## Add products group

If you want to apply both vertical and horizontal layouts to different products or add text between products, you can add another products group.

:::note
Adding a products group disables the [Products grouping](#switch-between-2-product-sets-by-trial-toggle) option. Choose between adding another products group or grouping products inside the same block.
:::

To add a products group:

1. Click **Add element** or **+** on the **Footer**.
2. Select **Products**.
3. Add products. Since you can't have the same product in different groups, you need to first delete it from another group.

<Zoom>
  <img src={require('./img/product-group.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>
