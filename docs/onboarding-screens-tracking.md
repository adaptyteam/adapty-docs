---
title: "Track onboarding screens"
description: ""
metadataTitle: ""
---

The onboarding stage is a very common situation in modern mobile apps. The quality of its implementation, content, and number of steps can have a rather significant influence on further user behavior, especially on his desire to become a subscriber or simply make some purchases.

In order for you to be able to analyze user behavior at this critical stage without leaving Adapty, we have implemented the ability to send dedicated events every time a user visits yet another onboarding screen.

To do this, simply call the `.logShowOnboarding` function:

```swift title="Swift"
Adapty.logShowOnboarding(name: "onboarding_name", screenName: "first_screen", screenOrder: 1)
```
```kotlin title="Kotlin"
Adapty.logShowOnboarding(name = "onboarding_name", screenName = "first_screen", screenOrder = 1)
```
```java title="Java"
Adapty.logShowOnboarding("onboarding_name", "first_screen", 1);
```
```javascript title="Flutter"
try {
  await Adapty().logShowOnboarding(name: 'onboarding_name', 
                                   screenName: 'first_screen', 
                                   screenOrder: 1);
} on AdaptyError catch (adaptyError) {
  // handle the error
} catch (e) {
}
```
```typescript title="React Native"
await adapty.logShowOnboarding(
	1, /* screenOrder */
	'onboarding_name', /* name */
	'first_screen' /* screenName */
);
```
```csharp title="Unity"
Adapty.LogShowOnboarding("onboarding_name", "first_screen", 1, (error) => {
    if(error != null) {
      // handle the error
    }
});
```

| Parameter       | Presence | Description                                                                                                             |
| :-------------- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| **name**        | optional | The name of your onboarding                                                                                             |
| **screenName**  | optional | The readable name of a particular screen as part of onboarding                                                          |
| **screenOrder** | required | An unsigned integer value representing the order of this screen in your onboarding sequence (it must be greater than 0) |

:::warning
Even though there is only one mandatory parameter in this function, we recommend that you think of names for all the screens, as this will make the work of analysts during the data examination phase much easier.
:::