---
title: "Custom tags in paywall builder"
description: ""
metadataTitle: ""
---

:::note
Custom tags are only available on AdaptyUI SDK v.2.1.0 and higher
:::

Custom tags are a feature designed to avoid creating separate paywalls for different situations. Imagine having a single paywall that adapts to different scenarios by incorporating specific user data. For instance, a simple greeting like "Hello!" can transform into a personalized message, such as "Hello, John!" or "Hello, Ann!"

Various ways to use:

- User’s email/name on the paywall
- Current day of the week on the paywall to increase sales (as in “Happy Thursday“)
- Custom properties of the products you're selling (name of the personalized fitness program, phone number in the VoIP app, etc)

Custom tags enable you to create a consistent paywall for various situations, allowing your app's user interface to dynamically incorporate the relevant information. It's a practical solution for tailoring a paywall design for each specific user.

:::warning
Make sure to add fallbacks for every line with custom tags

In some cases your app might not know what to replace a custom tag with: for example, if your Paywall is delivered to users on the older versions of AdaptyUI SDK.

So when using custom tags, make sure to add fallback lines — they will be used to replace the lines containing unknown custom tags. Otherwise the user will see custom tags as code (`<USERNAME/>`).
:::

## How to add a custom tag to a paywall

Every text line you see in Paywall Builder can have one or more custom tags. 

To add a custom tag to a line:

1. Enter the custom tag you want in the format `<CUSTOM_TAG/>` or simply type an opening angle bracket (\<) in the text line followed by the custom tag you need. The system will then offer you the tag in the correct format.

   Please pay attention that:

   - In the Adapty paywall builder, custom tags are wrapped in angle brackets (`<CUSTOM_TAG/>`) while in mobile app code, you should refer to them directly (`CUSTOM_TAG`).
   - Custom tags are case-sensitive.
   - Custom tags can't overlap with any of the [Tag Variables](paywall-builder-tag-variables) reserved for product info in Adapty.


<img
  src={require('./img/7ec0e4f-custom_tag.png').default}
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





2. After entering the custom tag, make sure to enter the fallback line. The fallback is the text displayed in your app if it does not know about a particular custom tag. This ensures that users won't see the custom tag as code; instead, they'll see the designated fallback text. Please note that the fallback replaces the entire line containing the custom tag

   
<img
  src={require('./img/36b8480-fallback_for_custom_tag.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>




## How to use custom tags in your mobile app

To use custom tags in your mobile app, you need to create a `tagResolver` object. This is a dictionary/map containing custom tags and the string values to replace them with when rendering the paywall in your app. Here's an example:

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

In this example, `USERNAME` is a custom tag that you entered in the Adapty dashboard while designing a paywall as `<USERNAME/>`. The `tagResolver` ensures that when your app encounters this custom tag, it dynamically replaces it with the specified value, in this case, `John`.

We recommend to create and populate the `tagResolver` right before presenting your paywall. Once it is created, pass it over to the AdaptyUI method used for presenting. Read more on how to present paywalls on [iOS](ios-present-paywalls),  [Android](android-present-paywalls), [Flutter](flutter-present-paywalls), [React Native](react-native-present-paywalls), or [Unity](unity-present-paywalls).