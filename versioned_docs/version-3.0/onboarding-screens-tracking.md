---
title: "Track onboarding screens"
description: "Track onboarding screens in Adapty to measure user engagement and improve retention."
metadataTitle: "Tracking Onboarding Screens | Adapty Docs"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

The onboarding stage is a very common situation in modern mobile apps. The quality of its implementation, content, and number of steps can have a rather significant influence on further user behavior, especially on his desire to become a subscriber or simply make some purchases.

In order for you to be able to analyze user behavior at this critical stage without leaving Adapty, we have implemented the ability to send dedicated events every time a user visits yet another onboarding screen.

To do this, simply call the `.logShowOnboarding` function:

<Tabs groupId="current-os" queryString>
<TabItem value="swift" label="Swift" default>

```swift showLineNumbers
do {
    try await Adapty.logShowOnboarding(
      name: "onboarding_name", 
      screenName: "first_screen", 
      screenOrder: 1
    )
} catch {
    // handle the error
}
```
</TabItem>
<TabItem value="swift-callback" label="Swift-Callback" default>

```swift showLineNumbers
Adapty.logShowOnboarding(
  name: "onboarding_name", 
  screenName: "first_screen", 
  screenOrder: 1
)
```
</TabItem>
<TabItem value="kotlin" label="Kotlin" default>
```kotlin showLineNumbers
Adapty.logShowOnboarding(name = "onboarding_name", screenName = "first_screen", screenOrder = 1)
```
</TabItem>
<TabItem value="java" label="Java" default>
```java showLineNumbers
Adapty.logShowOnboarding("onboarding_name", "first_screen", 1);
```
</TabItem>
<TabItem value="flutter" label="Flutter" default>
```javascript showLineNumbers
try {
  await Adapty().logShowOnboarding(name: 'onboarding_name', 
                                   screenName: 'first_screen', 
                                   screenOrder: 1);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
</TabItem>
<TabItem value="unity" label="Unity" default>
```csharp showLineNumbers
Adapty.LogShowOnboarding("onboarding_name", "first_screen", 1, (error) => {
    if(error != null) {
      // handle the error
    }
});
```
</TabItem>
<TabItem value="rn" label="React Native (TS)" default>
```typescript showLineNumbers
await adapty.logShowOnboarding(
	1, /* screenOrder */
	'onboarding_name', /* name */
	'first_screen' /* screenName */
);
```
</TabItem>
</Tabs>

| Parameter       | Presence | Description                                                                                                             |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| **name**        | optional | The name of your onboarding                                                                                             |
| **screenName**  | optional | The readable name of a particular screen as part of onboarding                                                          |
| **screenOrder** | required | An unsigned integer value representing the order of this screen in your onboarding sequence (it must be greater than 0) |

:::warning
Even though there is only one mandatory parameter in this function, we recommend that you think of names for all the screens, as this will make the work of analysts during the data examination phase much easier.
:::