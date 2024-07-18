---
title: "Change audience priority in placement"
description: "Refine user engagement by adjusting audience priority levels within Adapty placements, guiding content selection for users belonging to multiple audiences. Learn how to optimize audience targeting and enhance content delivery efficiency"
metadataTitle: "Fine-Tune Audience Targeting: Changing Priority in Adapty Placements"
---

When you have different user audiences in one [placement](placements), a user can belong to more than one audience. For instance, if you've defined audiences like "Female", "Runners", and a general audience like "All users," it's crucial to determine which specific audience to consider first when a user falls into multiple categories.


<img
  src={require('./img/afee54f-2.png').default}
/>





In this scenario, we rely on audience priority. Audience priority is a numerical order, where #1 is the highest. It guides the sequence for audiences to check. In simpler terms, audience priority helps Adapty make decisions about which audience to apply first when selecting the paywall or A/B test to display. If the audience priority for a paywall or A/B test is low, users who potentially qualify for the paywall or test might bypass it. Instead, they could be directed to another audience with a higher priority.

To adjust audience priorities for a placement:

1. Open the **[Placements](https://app.adapty.io/placements)** section from the Adapty main menu.
2. Click the placement for which you want to change the audience priority.

   
<img
  src={require('./img/cd0f0e1-2024-02-13_16-36-33.png').default}
/>



3. Click the **Edit placement** button.

   
<img
  src={require('./img/3b8d8e3-edit_audience.png').default}
/>



4. After the chosen placement opens with the list of its audiences, hover over any audience and click the **Edit** button once it shows.

   
<img
  src={require('./img/2babfc8-reorder_audiences.png').default}
/>



5. In the opened **Edit audience priorities** window, drag-and-drop audiences to reorder them correctly.
6. Click the **Save** button.