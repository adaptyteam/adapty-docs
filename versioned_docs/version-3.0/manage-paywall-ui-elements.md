---
title: "Manage paywall UI elements"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

After choosing a template, the elements of it will be displayed in the left pane. Use this pane to organize the elements on your paywall. The elements will appear on the paywall in the same order as they do in the left pane.

:::warning

This section describes the new Paywall Builder, which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. For information on the legacy Paywall Builder compatible with Adapty SDK v2.x or earlier, see [Legacy Paywall Builder](adapty-paywall-builder-legacy).

:::

## Add element

To add an element to your paywall above the layout:

1. Click the **Add Element** button in the left pane.
2. Choose the element you want to add. The new element will appear in the list above the **Footer**.


<Zoom>
  <img src={require('./img/ee68985-PB_add_new_element.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>





To add an element to a compound element:

1. Click the **Plus** button next to the compound element.
2. Select the element you want to add.


<Zoom>
  <img src={require('./img/abbf9ef-PB_add_element.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



## Rename paywall element

To rename an element:

1. Click the element in the left pane to open its details.

   

<Zoom>
  <img src={require('./img/a5b26ba-edit_element.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Click the ellipse button in the right pane and choose the **Edit** option.

3. Type the new name of the element and press **Enter**.

## Duplicate element

To duplicate an element :

1. Click the element in the left pane to open its details.

   

<Zoom>
  <img src={require('./img/07e81d6-duplicate_element.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Click the ellipse button in the right pane and choose the **Duplicate** option.

The duplicated element, with "Copy" added to its name, will appear in the left pane as a complete duplicate of the original.

## Move element

To move an element: Drag and drop the element to its new position on the layout or within a compound element.

A purple line indicates an available position for the element, while a red line shows an inaccessible position.


<Zoom>
  <img src={require('./img/3c9252a-PB_move_between_layers.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Hide element

Even though you have already created and configured an element, you can temporarily hide it from the paywall. That is convenient if you plan to add it later without losing all the configuration you made. After hiding an element, the paywall looks as though the element was never added, all alignments and spaces are recalculated and redrawn.

To hide an element:

1. Click the element in the left pane to open its details.

2. Click the ellipse button in the right pane and choose the **Hide** option.

<Zoom>
  <img src={require('./img/pb-hide-element.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

The hidden element is marked in both the main pane - as a note and in the left pane if you choose it.

<Zoom>
  <img src={require('./img/pb-hidden-element.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

To show the element again, click the ellipse button in the right pane and choose the **Show** option.

## Delete element

To delete an element from the paywall:

1. Click the element in the left pane to open its details.

   

<Zoom>
  <img src={require('./img/d6763f3-delete_element.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. Click the ellipse button in the right pane and choose the **Delete** option.
