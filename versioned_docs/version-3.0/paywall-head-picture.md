---
title: "Paywall hero image"
description: ""
metadataTitle: ""
---

The hero image is the star of your paywall, setting the tone, establishing the theme, and capturing users' attention right from the start. This image plays a crucial role in shaping the look and feel of your paywall on both iOS and Android platforms.

## Hero image format and size

Your main image is the centerpiece of your paywall's design, essential for captivating users and driving them to take action. Follow these guidelines to ensure your hero image is effective and visually appealing:

- **Formats**: JPG, PNG, SVG.
- **Recommended Size**: Files up to 2 MB for faster loading.
- **Image Composition**: Photos with the main object centered and surrounded by ample space usually communicate your message effectively.
- **Impactful Visuals**: Emotional or vibrant photos work well.
- **Graphics Use**: Ideal for adding visual appeal, with separate spaces reserved for text.


<img
  src={require('./img/70000ff-PB_hero_image.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





You have control over the sizing of the main image, adjusting its proportions to achieve the desired visual balance on your paywall. Specify the image size as a percentage of the total screen area for perfect alignment.

## Hero picture layout options

The **overlay hero image** adds a layer of depth and dynamism to your paywall. Positioned as a fixed background at the bottom, it creates a stunning effect as other elements scroll over it. This makes the hero image appear stationary, providing a visually engaging experience as users scroll through the content.


<img
  src={require('./img/01c702a-overlay_head_picture.gif').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





The **transparent layout** delivers a bold, full-screen hero image that instantly captures attention. This layout is perfect for showcasing a limited selection of products or content, filling the entire screen and making a powerful, direct impact without the need for scrolling.


<img
  src={require('./img/0401532-transparent_hero_picture.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





:::note
Use the transparent layout for minimal content display, as it doesn’t involve scrolling, making your message clear and impactful.
:::

The **flat layout** mimics a seamless landing page, presenting all elements in a continuous, scrollable layer. Users enjoy a smooth, cohesive narrative as they scroll through the content, perfect for integrating your products or stories effectively in a unified flow.


<img
  src={require('./img/7c13a16-flat_hero_picture.gif').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





:::info
Ideal for storytelling or presenting a series of offerings, the flat layout lets you create a compelling sequence that captivates users.
:::

## Hero image mask

The **mask type** defines the shape of the main image, allowing you to apply creative effects that enhance the visual presentation. For flat or overlay image layouts, choose from various mask types to suit your design.


<img
  src={require('./img/b484e36-Image_mask.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Adjust the roundness of the image mask using numerical values to achieve the perfect look for your hero image.

## How to remove a hero image

To remove a hero image from a paywall:

1. Open the **Hero image** element.

   
<img
  src={require('./img/67f57af-PB_remove_hero_image.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>



2. Change its hight to zero.