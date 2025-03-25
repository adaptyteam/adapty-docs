---
title: "Custom images and video in new Paywall Builder"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; 

You can set up any image or video on a paywall, but sometimes you might want to display a custom image or video that’s personalized for the user — for example, a video with their chosen avatar. That’s where custom media comes in.

Custom media is an image or video that your app calls by ID from your code. It replaces a standard media file you’ve added to the paywall in the Paywall Builder.

## Where can I use custom media?

Anywhere you’d normally use a regular image or video:

- As a hero image
- As a hero video
- As a regular icon
- In a card background
- In a carousel background

## How to use custom media?

1. Enable it with a toggle under the upload area. The toggle name depends on the media type you’re replacing. For example:  

      - **Use custom media ID**  
      - **Background custom image ID**

   <Zoom>
     <img src={require('./img/custom-image.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Enter the media ID. Some fields (like the hero image or hero video) already have a predefined ID. If that's the case, you can skip this step. Here’s an example of a predefined custom media ID:

   <Zoom>
     <img src={require('./img/custom-media-predefined-id.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

3. (optional) Upload a fallback image or video. This will be shown if, for any reason, the custom media can’t be loaded — like if the Adapty SDK version is below 3.5 or you forget to define the custom media ID in your code.

4. Call the media by its ID in your code. Use the example below to load and display custom media by ID:

<Tabs groupId="current-os" queryString> 
<TabItem value="swift" label="Swift" default>   

```swift showLineNumbers 
code   
```

</TabItem> 
<TabItem value="kotlin" label="Kotlin" default>  

 ```kotlin showLineNumbers 
 code   
 ```

</TabItem> 
<TabItem value="java" label="Java" default> 

```java showLineNumbers 
code   
```

</TabItem>
</Tabs> 