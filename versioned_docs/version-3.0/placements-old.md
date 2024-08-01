---
title: "Placements"
description: ""
metadataTitle: ""
---

Adapty's placements feature allows you to show paywalls at various stages of the user journey within an app. By linking specific paywalls or A/B tests to each placement, Adapty provides the flexibility to adjust displayed content remotely, eliminating the need for any code modifications.

\<Тут прям большой упор на то, что пэйволлы нужны для того, чтобы таргетить на разные аудитории. А на самом деле это скорее фишка плейсмента — и собственно на картинке ниже плейсмент.

Вводная часть про пэйволлы, как мне кажется, должна быть скорее про то, что их можно менять удаленно без релизов — как состав продуктов на них, так и визуальную часть. Остальное — уже где-то в районе плейсментов>

In the example below, we showcase two distinct paywalls: Paywall A and Paywall B. Paywall A targets audiences identified as "Yoga beginners," while Paywall B is intended for the broader "Other users" audience. 


<img
  src={require('./img/14679a8-Placement-2audiences-paywalls.jpg').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





\<То есть, по большому счету почти все что выше про аудитории лучше отнести в статью с плейсментами, а не с пэйволлами>

To begin working with placements in Adapty:

1. Open the **Placements** section in Adapty main menu.  
      The **Placements** list provides a clear overview of all the different locations within the user journey where paywalls or A/B tests can be displayed. Each item in the list represents a specific placement, and you can easily manage and modify them as needed. You can edit the details of each placement, associate it with the desired paywall or A/B test for a specified audience, or remove unnecessary placements. 

   
<img
  src={require('./img/dfc4a1c-CleanShot_2023-07-26_at_14.51.342x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




### Create a new placement

To create a new placement:

1. Open the **Placements** section in Adapty main menu.
2. In the **Placements** window, click the **Create placement** button.

   
<img
  src={require('./img/d0e41c3-CleanShot_2023-07-13_at_15.13.272x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




In the **Placements / New placement** window, enter the following information for the new placement:

- **Placement Name ** is used for your reference to clearly describe the exact place in your mobile app. This name serves as a means of identification and helps you organize and manage your placements effectively. You have the flexibility to edit the placement name even after it has been created, allowing you to refine and update the name as needed.
- **Placement ID** is automatically generated from the Adapty SDK and cannot be modified once it has been created. It guarantees the uniqueness and integrity of each placement. To ensure accurate identification and avoid conflicts, each placement ID must be unique and not already exist in the system. By enforcing this requirement, Adapty maintains the integrity of placement and enables precise tracking and management within the system.  
  Placement ID is used in your mobile app to call the paywalls and A/B tests created in Adapty for this placement

### Add audience

In the context of placement within Adapty, adding an audience to a placement allows you to target specific user segments with tailored content, such as paywalls or A/B tests. By associating an audience with a placement, you can ensure that the right content is displayed to the right users at the appropriate stages of their user journey.


<img
  src={require('./img/d0d720f-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Clicking the **Add audience** button triggers the display segments of a dropdown menu. These segments represent different audience groups that have been defined and created within Adapty.

To associate a specific audience with the placement, users can simply select the desired segment from the dropdown list. Once an audience is selected, it is immediately reflected in the designated audience selection field on the placement page. This clear association allows to precisely align the placement with the chosen audience, ensuring that the right paywalls or A/B tests are displayed to the intended users.

Furthermore, you can add paywalls or set up A/B tests for the selected audience by navigating to the appropriate section on the placement page. This enables the creation of targeted experiences tailored to specific audience segments.  In cases where multiple audiences are associated with the same placement, you can easily manage their priority. By leveraging a simple drag-and-drop functionality, audiences can be repositioned in the desired order, reflecting the priority in which the placements should be displayed.

### Change audience priority

When you have different user audiences, a user can belong to more than one audience. For instance, if you've defined audiences like "American men," "American women," "European men," "European women," and a general audience like "All users," it's crucial to determine which specific audience to consider first when a user falls into multiple categories.

In this scenario, we rely on audience priority. Audience priority is a numerical order, where #1 is the highest. It guides the sequence for audiences to check. In simpler terms, audience priority helps Adapty make decisions about which audience to apply first.

Audience priorities play a crucial role, especially in two key aspects:

- Paywalls: For determining which paywall to show to a specific user. If a user qualifies for multiple paywalls, the system uses audience priority to decide which one to display first.
- A/B Tests: When conducting A/B tests, the audience priority influences the order in which audiences are considered. If the audience priority for an A/B test is low, users who potentially qualify for the test might bypass it. Instead, they could be directed to another audience with a higher priority.

To adjust audience priorities for a placement:

1. Open the [Placements](https://app.adapty.io/placements) item from the Adapty main menu.
2. Click the placement for which you want to change the audience priority.

   
<img
  src={require('./img/cd0f0e1-2024-02-13_16-36-33.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>



3. Click the **Edit placement** button.

   
<img
  src={require('./img/3b8d8e3-edit_audience.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>



4. After the chosen placement opens with the list of its audiences, hover over any audience and click the **Edit** button once it shows.

   
<img
  src={require('./img/2babfc8-reorder_audiences.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>



5. In the opened **Edit audience priorities** window, drag-and-drop audiences to reorder them correctly.
6. Click the **Save** button.

### Run paywall

The **Run paywall** option allows you to display a specific paywall exclusively for a certain placement, ensuring that all users within the associated audience segment see the same paywall. This option is particularly useful when you have already identified the best-performing paywall and want to consistently deliver it to your targeted audience.


<img
  src={require('./img/f23da25-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





To learn more about running paywalls in Adapty and optimizing their performance, you can refer to our documentation on [paywall functionality](paywalls).

### Run A/B test


<img
  src={require('./img/fddf85a-Area.gif').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





The **Run A/B test** option allows you to show different paywalls to app users within a specific audience. By running an A/B test, you can compare different options and determine the most effective paywall for that audience segment. You can select an existing paywall bundle or create a new A/B test from scratch. The selected paywalls will be displayed on the placement detail page, with significant results highlighted in green. Running an A/B test helps you optimize conversions and find the best paywall option for your audience.

 You can refer to the [documentation](ab-tests#how-to-create-an-ab-test) on creating and running A/B tests for more detailed instructions. This documentation will provide step-by-step information on setting up A/B tests and leveraging them effectively within the Adapty dashboard.

### Placement metrics


<img
  src={require('./img/5db0f05-CleanShot_2023-07-13_at_17.55.512x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Adapty provides robust metrics and tracking capabilities for placement, allowing you to gain valuable insights into the performance of your paywalls and A/B tests. These metrics enable you to measure the effectiveness of your monetization strategy. To learn more about the placement metrics and how to interpret them, you can refer to the [documentation](placement-metrics).

### Simplifying changes without App Store releases

With the new placements system, you can create and run paywalls without requiring a release in the app stores. This applies when the paywalls are created within existing placements that have already passed moderation and are live in the store. Similarly, for A/B testing, you can create any number of new variants without the need for a release in the existing placement.

Regarding audiences, the same logic applies. You can make changes to the audience targeting without requiring a new release in the app stores.

However, it's important to note that if you add another placement for the paywall display location, a new release in the stores will be necessary.

### Fallback paywalls

Adapty allows you to provide fallback paywalls that will be used when a user opens the app and there's no connection with Adapty backend (e.g. no internet connection or in the rare case when the backend is down) and there's no cache on the device.


<img
  src={require('./img/5608de9-CleanShot_2023-08-09_at_18.02.05_22x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





The fallbacks are available in the JSON representation of your paywalls/products list, following the exact same format as provided by the Adapty backend. To learn how to set up fallback paywalls using Adapty, please consult our detailed [documentation](displaying-products#fallback-paywalls).