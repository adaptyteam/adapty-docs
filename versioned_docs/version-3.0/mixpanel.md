---
title: "Mixpanel"
description: ""
metadataTitle: ""
---

[Mixpanel](https://mixpanel.com/) is a powerful product analytics service. Its event-driven tracking solution empowers product teams to get valuable insights into optimal user acquisition, conversion, and retention strategies across different platforms.  

This integration enables you to bring all the Adapty events into Mixpanel. As a result, you'll gain a more comprehensive insight into your subscription business and customer actions. Adapty provides a complete set of data that lets you track [subscription events](events) from stores in one place. With Adapty, you can easily see how your subscribers are behaving, learn what they like, and use that information to communicate with them in a way that's targeted and effective.

## How to set up Mixpanel integration

To set up the integration with Mixpanel, go to [**Integrations** -> **Mixpanel**](https://app.adapty.io/integrations/mixpanel) in the Adapty Dashboard, turn on a toggle, and fill out fields.


<img
  src={require('./img/ccecc5e-CleanShot_2023-08-17_at_14.21.392x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





You need only one variable such as **Mixpanel token**. You can find the token in your Mixpanel project. If you need help, [here's](https://help.mixpanel.com/hc/en-us/articles/115004502806-Find-Project-Token-) the official docs.


<img
  src={require('./img/3178322-CleanShot_2023-08-16_at_18.09.382x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





Adapty maps some properties such as user id and revenue of the event to [Mixpanel-native properties](https://help.mixpanel.com/hc/en-us/articles/115004708186-Profile-Properties). With such mapping, Mixpanel is able to show you the correct data in the profile and events timeline.

Adapty also accumulates revenue from each user.

Another thing worth mentioning is updating [User Profile Properties](https://docs.mixpanel.com/docs/tracking/how-tos/user-profiles). Adapty sends the `subscription state` and `subscription product id`. After Mixpanel gets an event, you can see the corresponding fields updated there.

## Events and tags

Below the credentials, there are three groups of events you can send to Mixpanel from Adapty. Simply turn on the ones you need. Check the full list of the events offered by Adapty [here](events).


<img
  src={require('./img/1b0c777-CleanShot_2023-08-11_at_14.56.362x.png').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





We recommend using the default event names provided by Adapty. But you can change the event names based on your needs.

## SDK configuration

Use `Adapty.updateProfile()` method to set `mixpanelUserId`.  If not set, Adapty uses your user ID (`customerUserId`) or if it's null Adapty ID. Make sure that the user id you use to send data to Mixpanel from your app is the same one you send to Adapty.

```swift title="iOS (Swift)"
import Mixpanel

let builder = AdaptyProfileParameters.Builder()
            .with(mixpanelUserId: Mixpanel.mainInstance().distinctId)

Adapty.updateProfile(params: builder.build())
```
```kotlin title="Android (Kotlin)"
val params = AdaptyProfileParameters.Builder()
    .withMixpanelUserId(mixpanelAPI.distinctId)
    .build()
Adapty.updateProfile(params) { error ->
    if (error != null) {
        // handle the error
    }
}
```
```csharp title="Flutter (Dart)"
import 'package:mixpanel_flutter/mixpanel_flutter.dart';

final mixpanel = await Mixpanel.init("Your Token", trackAutomaticEvents: true);

final builder = AdaptyProfileParametersBuilder()
        ..setMixpanelUserId(
          await mixpanel.getDistinctId(),
        );

    try {
        await Adapty().updateProfile(builder.build());
    } on AdaptyError catch (adaptyError) {
        // handle error
    } catch (e) {}
```
```typescript title="React Native (TS)"
import { adapty } from 'react-native-adapty';
import { Mixpanel } from 'mixpanel-react-native';

// ...
try {
  await adapty.updateProfile({
    mixpanelUserId: mixpanelUserId,
  });
} catch (error) {
  // handle `AdaptyError`
}
```
```csharp title="Unity (C#)"
var builder = new Adapty.ProfileParameters.Builder();
builder.SetMixpanelUserId(Mixpanel.DistinctId);

Adapty.UpdateProfile(builder.Build(), (error) => {
    // handle error
});
```