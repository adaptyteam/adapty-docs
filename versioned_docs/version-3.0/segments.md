---
title: "Segments"
description: ""
metadataTitle: ""
---

A Segment is a group of users with common properties.


<img
  src={require('./img/3244407-Segments.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Segments are mainly used in [Placements](placements) and in [A/B tests](ab-tests) to create an Audience and target it with a paywall (or multiple paywalls). Here are some example scenarios where that can be useful:

- targeting non-subscribed users with the default paywall and offering a discount for those who have previously canceled their subscription or a trial.
- having different paywalls for different countries
- basing your segment on the Apple Search Ads attribution data
- creating segments based on your app's version, so that once you introduce a new paywall that is only supported by the recent versions of your app, the older versions would still continue to work

## Creation

To create a segment, write a segment name, and choose attributes.


<img
  src={require('./img/1af9744-new_cohort.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





## Available attributes

- Age of the user
- App User ID
- App Version
- Calculated subscription state
- Calculated total revenue USD
- Country from IP
- Country from store account
- Creation date
- Device
- Gender
- Language
- OS
- Platform
- Subscription expiration date
- Subscription product
- Attribution Source: Organic, Non-Organic, Unknown
- Attribution Channel
- Attribution Campaign
- Attribution Ad Group
- Attribution Ad Set
- Attribution Creative
- [Custom Attributes](profiles-crm#custom-attributes)

:::note
Please note that these attributes are predefined and cannot be modified, except for the **App Version** attribute, which allows for adding new values.
:::

## Custom attributes

To create even more targeted segments, you can also create custom attributes. Custom attributes allow you to create user groups based on properties that are specific to your app or business.

:::note
To create custom attributes, you can set them up in either the mobile SDK or the dashboard, and there is no specific order in which they need to be created. To set up custom attributes in the mobile SDK, please [follow this link](setting-user-attributes#limit) to learn how to set them up.
:::

:::warning
Adapty collects the **country of the store** for iOS devices with version 13 or higher.
:::

To create custom attributes from the Adapty Dashboard, select the ** Create Custom Attributes** from the Select Attribute Dropdown options.


<img
  src={require('./img/883d3b2-CleanShot_2023-03-16_at_17.20.452x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Here's how to fill the fields for custom attributes. Also, you can read more about custom attribute validation rules [here](profiles-crm#custom-attributes).

1. **Name **represents the name of the custom attribute and will be used in the Adapty dashboard only.
2. **Key **is the unique identifier for the custom attribute. This key value should match the key value used in the SDK. 
3. **Type** field has two options. If you select "String", you have to enter a list of possible values for the attribute. If you select "Number", the attribute will accept only numeric values.
4. If you selected "String" as the type, enter a list of possible **values** for the attribute. If you selected "Number", the attribute will accept only numeric values.

Complete all the required fields first, and then you can begin utilizing the custom attribute in your segment definition. Once you've created your segments, you can use them to target [A/B testing](ab-tests), among other things!