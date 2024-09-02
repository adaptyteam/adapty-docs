---
title: "Custom tags in paywall builder"
description: ""
metadataTitle: ""
---

:::note
Custom tags are only available on AdaptyUI SDK v.2.1.0 and higher
:::

Custom tags let you avoid creating separate paywalls for different scenarios. Imagine a single paywall that adapts dynamically based on user data. For example, instead of a generic "Hello!", you could greet users personally with "Hello, John!" or "Hello, Ann!"

Here are some ways you can use custom tags:

- Display the user’s name or email on the paywall.
- Show the current day of the week to boost sales (e.g., “Happy Thursday”).
- Add personalized details about the products you're selling (like the name of a fitness program or a phone number in a VoIP app).

Custom tags help you create a flexible paywall that adapts to various situations, making your app's interface more personalized and engaging.

:::warning
Make sure to add fallbacks for every line with custom tags

Remember to include fallbacks for every line with custom tags.

In some cases, your app might not know what to replace a custom tag with—especially if users are on an older version of the AdaptyUI SDK. To prevent this, always add fallback text that will replace lines containing unknown custom tags. Without this, users might see the tags displayed as code (`<USERNAME/>`).
:::

## How to add a custom tag to a paywall

You can add one or more custom tags to any text line in Paywall Builder.

To add a custom tag:

1. Enter the custom tag in the format `<CUSTOM_TAG/>` or type an opening angle bracket (\<) in the text line. The system will then suggest the tag in the correct format.

   A few things to keep in mind:

   - In the Adapty Paywall Builder, custom tags are wrapped in angle brackets (`<CUSTOM_TAG/>`), but in your app’s code, they should be referenced directly (CUSTOM_TAG).
   - Custom tags are case-sensitive.  
   - Custom tags can’t overlap with any of the  [Tag Variables](paywall-builder-tag-variables) reserved for product info in Adapty.


<img
  src={require('./img/1ea0b95-adding_custom_tag.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>






<img
  src={require('./img/6f97bd0-custom_tag.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





2. After adding the custom tag, make sure to enter a fallback line. This fallback text will appear in your app if it doesn’t recognize a particular custom tag, ensuring users won’t see the tag displayed as code. The fallback text replaces the entire line containing the custom tag.

   
<img
  src={require('./img/4d43874-custom_tag_fallback.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




## How to use custom tags in your mobile app

To use custom tags in your mobile app, create a tagResolver object—a dictionary or map that pairs custom tags with the string values that will replace them when the paywall is rendered. Here's an example:

```swift title="Swift"
let tagResolver = [
    "USERNAME": "John",
]                           
```
```kotlin title="Kotlin"
val customTags = mapOf("USERNAME" to "John")
val tagResolver = AdaptyUiTagResolver { tag -> customTags[tag] }
```
```java title="Java"
Map<String, String> customTags = new HashMap<>();
customTags.put("USERNAME", "John");
AdaptyUiTagResolver tagResolver = customTags::get;
```

In this example, `USERNAME` is a custom tag you entered in the Adapty dashboard as `<USERNAME/>`. The `tagResolver` ensures that your app dynamically replaces this custom tag with the specified value—like `John`.

We recommend creating and populating the tagResolver right before presenting your paywall. Once it's ready, pass it to the AdaptyUI method you use for presenting the paywall. You can read more about presenting paywalls on  [iOS](ios-present-paywalls),  [Android](android-present-paywalls), [Flutter](flutter-present-paywalls), [React Native](react-native-present-paywalls), or [Unity](unity-present-paywalls).