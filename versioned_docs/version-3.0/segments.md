---
title: "Segments"
description: "Create and manage user segments for better targeting in Adapty."
metadataTitle: "Managing User Segments | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A **Segment** is a set of filtering criteria used to group users with common properties. You can use segments to target paywalls and A/B tests more effectively.

Once you've created a segment, you can [use it as an **audience** in Placements and A/B tests](audience) to control which paywall (or multiple paywalls) users see. Here are some ways you might use segments:

- Show a standard paywall to non-subscribers while offering a discount to users who previously canceled a subscription or trial.
- Display different paywalls to users from different countries.
- Target users based on Apple Search Ads attribution data.
- Ensure users on older app versions continue seeing an existing paywall while newer versions get an updated one.
- [In Analytics](controls-filters-grouping-compare-proceeds.md#filtering-and-grouping), filter by user segments to view specific user group performance. Group by segment to compare segment performance or contribution within **All users**.

<Zoom>
  <img src={require('./img/3244407-Segments.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Creation

To create a segment, enter a name and select the attributes that define its filtering criteria.

<Zoom>
  <img src={require('./img/1af9744-new_cohort.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Available attributes

:::note
While many user attributes are set automatically (like **Country** or **Calculated total revenue USD**), **Age**, **App user ID**, **Attribution** data, **Gender**, and **Custom attributes** are not defined automatically. You must [set user attributes](setting-user-attributes.md) or [pass the attribution data](attribution-integration.md) if you want to use it for segmentation.
:::

| Attribute                                               | Filter by                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Age**                                                 | The user's age. Note that age is calculated when Adapty first receives it and is not updated later.                                                                                                                                                                                                                                                                                                                                                        |
| **App User ID**                                         | The user's identifier in your app ([customer_user_id](profiles-crm#user-properties)). You can filter by its presence or absence, for example, to show a paywall only to users who haven’t logged in.                                                                                                                                                                                                                                                       |
| **App Version (current)**                               | The current version of the app installed on the user's device where Adapty last received event data. Even if your app version is not yet in production, you can set up custom logic for it. When creating a segment, select a pencil icon next to **App version** and add a new version so you can use it right away.                                                                                                                                      |
| **Attribution: Ad Group**                               | The attribution ad group.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Attribution: Ad Set**                                 | The attribution ad set.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Attribution: Campaign**                               | The name of the marketing campaign.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Attribution: Creative**                               | The attribution creative keyword.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Attribution: Channel**                                | The name of the marketing channel.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Attribution: Source**                                 | Where the attribution originated.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Attribution: Status**                                 | The attribution status. Possible values: <ul><li> **Organic** – The user installed the app without any paid marketing influence (e.g., direct search in the App Store/Google Play, word of mouth, or organic social media reach).</li><li> **Non-organic** – The user was acquired through a paid marketing channel (e.g., ads, influencer campaigns, referral programs).</li><li> **Unknown** – No attribution data is available for this user.</li></ul> |
| **Calculated subscription state**                       | The user’s [current subscription status](profiles-crm#subscription-state), indicating if the subscription is active or canceled or if there was a billing issue that remains unresolved.                                                                                                                                                                                                                                                                   |
| **Calculated total revenue USD**                        | The total revenue generated by this user.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Country**                                             | The customer’s country, determined by their most recent IP address.                                                                                                                                                                                                                                                                                                                                                                                        |
| **Country from store account**                          | The country associated with the user’s iOS or Android store account. Note that Adapty collects the country of the store only for iOS devices running version 13 or later.                                                                                                                                                                                                                                                                                  |
| **Creation date**                                       | The date the profile was created (when the app was first installed on the user's device).                                                                                                                                                                                                                                                                                                                                                                  |
| **Device**                                              | Device type based on metadata. For example, 'Samsung Galaxy' or 'iPhone 13'                                                                                                                                                                                                                                                                                                                                                                                 |
| **Gender**                                              | The user's gender. Note that you set the value yourself.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Language**                                            | The language of the user's device.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Last seen**                                           | The latest date the user opened the app.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **OS**                                                  | The operating system version of the user's device.                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Platform**                                            | The user’s device platform. Possible values: `iOS`, `macOS`, `iPadOS`, `visionOS`, `Android`. <br/> If users access your app from multiple platforms (e.g., iOS and Android), segment membership is evaluated separately for each platform using the latest data from that specific device. This allows for platform-specific targeting even for the same user profile.                                                                                    |
| **Subscription expiration date**                        | The subscription’s expiration date or its presence/absence. It shows `none` for lifetime purchases and remains empty if the user has a profile but has never had a trial, subscription, or lifetime purchase.                                                                                                                                                                                                                                              |
| **Subscription product**                                | The latest product ID of the customer’s active subscription.                                                                                                                                                                                                                                                                                                                                                                                               |
| **[Custom attributes](profiles-crm#custom-attributes)** | Define your own attributes to create highly targeted segments based on properties unique to your app or business.                                                                                                                                                                                                                                                                                                                                          |


## Custom attributes

To create even more targeted segments, you can define custom attributes. These attributes let you group users based on properties unique to your app or business.

:::note
- You can set up custom attributes either in the mobile SDK or the Adapty Dashboard. To configure them in the SDK, follow the instructions [here](setting-user-attributes#custom-user-attributes).
- Changing a custom attribute after it's used in a segment may unsync the user from that segment in [analytics](controls-filters-grouping-compare-proceeds.md#filtering-and-grouping). Data will reflect the previous value.
:::

### How to configure a custom attribute

To create a custom attribute in the Adapty Dashboard, select **Create custom attributes** from the attribute dropdown menu.

<Zoom>
  <img src={require('./img/883d3b2-CleanShot_2023-03-16_at_17.20.452x.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

| Field  | Description                                                                                                                          |
| ------ |--------------------------------------------------------------------------------------------------------------------------------------|
| **Name**   | A label for the custom attribute, used only in the Adapty Dashboard.                                                                 |
| **Key**    | A unique identifier for the attribute. This must match the key used in the SDK.                                                      |
| **Type**   | Choose between:<ul><li>String: Requires a predefined list of possible values.</li><li>Number: Accepts only numeric values.</li></ul> |
| **Values** | If you select `String`, enter the list of possible values. If you choose `Number`, the attribute will only accept numeric input. Numeric attributes support decimal values and can be used with comparison operators.    |

Once you've filled in all the required fields, you can start using custom attributes in your segment definitions. These segments can be used to target [A/B tests](ab-tests) and more! 

Each profile can have up to 30 custom attributes.

## Total number and random sample

After you create a segment, Adapty displays the total number of users that match the segment's criteria.

Additionally, a random sample of 40 users who fit the criteria is shown in a table. This sample is completely random and can be used to test your segment and ensure it’s configured correctly.

<Zoom>
  <img src={require('./img/segment-random-set.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>