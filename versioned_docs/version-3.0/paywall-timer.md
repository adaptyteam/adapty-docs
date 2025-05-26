---
title: "Paywall timer"
description: "Use Adapty’s paywall timer feature to increase conversions and create urgency."
metadataTitle: "Using Paywall Timer for Conversions | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

The paywall timer is a great tool for promoting special and seasonal offers with a time limit. However, it's important to note that this timer isn't connected to the offer's validity or the campaign's duration. It's simply a standalone countdown that starts from the value you set and decreases to zero. When the timer reaches zero, nothing happens—it just stays at zero.

<Zoom>
  <img src={require('./img/87de83a-Timer_withou_text.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/></Zoom>

:::warning

Paywall timers are only available in the [new Paywall Builder](adapty-paywall-builder), which works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. The legacy Paywall Builder with Adapty SDK v2.x or earlier does not support paywall timer functionality.

:::

You can customize the text before and after the timer to create the desired message, such as: "Offer ends in: 10:00 sec."

<Zoom>
  <img src={require('./img/f1be626-timer_example.webp').default}
  style={{
    border: 'none', /* border width and color */
    width: '200px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Add a timer as a separate element to a paywall or to another paywall element, like a card.

2. Configure the timer's settings: format and separator, start value, text before and after (if needed), color, font, spacing, etc.

<Zoom>
  <img src={require('./img/e83e891-timer.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## Timer mode

You can control how the timer behaves when users see it by using the **Timer mode** parameter. 3 standard modes work out of the box—just select the required option from the dropdown list:

| Mode                                  | Description                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| **Reset timer on every paywall view** | The timer resets every time the user sees the paywall, starting from the initial value each time. |
| **Reset timer on every app launch**   | The timer starts the first time the user sees the paywall and keeps counting in the foreground or background until the app is restarted. If the user sees the paywall multiple times in the same session, they’ll see the same timer counting down. Once the app is closed, the timer resets, and the next time the app is opened, the timer restarts from the beginning. |
| **Keep timer across app launches**    | The timer starts the first time the user sees the paywall and keeps counting in the foreground or background, even if the app is closed. The user will see the same timer every time they return to the paywall, regardless of app or paywall restarts. |
| **Developer defined**                 | You can set up any timer you need directly in your mobile app code. Start by entering a **Timer ID**, then use it in your code as explained in the [How to set up developer-defined timers in your mobile app](paywall-timer#how-to-set-up-developer-defined-timers-in-your-mobile-app) section to configure the timer however you like. |

## What happens when the timer ends?

You can customize what happens when the timer runs out. Should it display another screen with a new opportunity? Or maybe show a different paywall? It requires some coding, but with our docs, you'll handle it.

1. Turn on the **Trigger custom action when the timer runs out** toggle.

   <Zoom>
     <img src={require('./img/timer-action-on.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Enter the ID of the action you want to trigger in the **Timer action ID** field.

   <Zoom>
     <img src={require('./img/timer-action-id.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>
   
3. Use this action ID in your app to define what should happen when the timer ends. Treat it like any other custom action, as explained in our **Handling Events: Actions** guide for [iOS](ios-handling-events#actions) and [Android](android-handling-events#actions).

## How to set up developer-defined timers in your mobile app?

To use custom timers in your mobile app, create an object that follows the `AdaptyTimerResolver` protocol. This object defines how each custom timer should be rendered. If you prefer, you can use a `[String: Date]` dictionary directly, as it already conforms to this protocol. Here is an example:

<Tabs groupId="current-os" queryString> <TabItem value="swift" label="Swift" default>

```Swift showLineNumbers
@MainActor
struct AdaptyTimerResolverImpl: AdaptyTimerResolver {
    func timerEndAtDate(for timerId: String) -> Date {
        switch timerId {
        case "CUSTOM_TIMER_6H":
            Date(timeIntervalSinceNow: 3600.0 * 6.0) // 6 hours
        case "CUSTOM_TIMER_NY":
            Calendar.current.date(from: DateComponents(year: 2025, month: 1, day: 1)) ?? Date(timeIntervalSinceNow: 3600.0)
        default:
            Date(timeIntervalSinceNow: 3600.0) // 1 hour
        }
    }
}
```

In this example, `CUSTOM_TIMER_NY` and `CUSTOM_TIMER_6H` are the **Timer ID**s of developer-defined timers you set in the Adapty Dashboard. The `timerResolver` ensures your app dynamically updates each timer with the correct value. For example:

- `CUSTOM_TIMER_NY`: The time remaining until the timer’s end, such as New Year’s Day.
- `CUSTOM_TIMER_6H`: The time left in a 6-hour period that started when the user opened the paywall.

</TabItem> <TabItem value="kotlin" label="Kotlin" default> 

```kotlin showLineNumbers
import java.util.Calendar
import java.util.Date
import java.util.TimeZone

...

val customTimers = mapOf(
    "CUSTOM_TIMER_NY" to Calendar.getInstance(TimeZone.getDefault()).apply { set(2025, 0, 1) }.time, // New Year 2025
)
val timerResolver = AdaptyUiTimerResolver { timerId ->
    customTimers.getOrElse(timerId, { Date(System.currentTimeMillis() + 3600 * 1000L) /* in 1 hour */ } )
}
```

In this example, `CUSTOM_TIMER_NY` is the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. The `timerResolver` ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer’s end time, such as New Year’s Day, minus the current time).

</TabItem> <TabItem value="java" label="Java" default> 

```JAVA showLineNumbers
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

...

Map<String, Date> customTimers = new HashMap<>();
customTimers.put(
        "CUSTOM_TIMER_NY",
        new Calendar.Builder().setTimeZone(TimeZone.getDefault()).setDate(2025, 0, 1).build().getTime()
);
AdaptyUiTimerResolver timerResolver = new AdaptyUiTimerResolver() {
    @NonNull
    @Override
    public Date timerEndAtDate(@NonNull String timerId) {
        Date date = customTimers.get(timerId);
        return date != null ? date : new Date(System.currentTimeMillis() + 3600 * 1000L); /* in 1 hour */
    }
};
```

In this example, `CUSTOM_TIMER_NY` is the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. The `timerResolver` ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer’s end time, such as New Year’s Day, minus the current time).

</TabItem> <TabItem value="flutter" label="Flutter" default> 

```dart showLineNumbers
try {
      final view = await AdaptyUI().createPaywallView(
        paywall: paywall,
        customTags: ...,
        customTimers: {
          'CUSTOM_TIMER_6H': DateTime.now().add(const Duration(seconds: 3600 * 6)),
          'CUSTOM_TIMER_NY': DateTime(2025, 1, 1), // New Year 2025
        },
        preloadProducts: ...,
      );
    } on AdaptyError catch (e) {
      // handle the error
    } catch (e) {
      // handle the error
    }
```

 In this example, `CUSTOM_TIMER_NY` and `CUSTOM_TIMER_6H` are the **Timer ID**s of developer-defined timers you set in the Adapty Dashboard. The `timerResolver` ensures your app dynamically updates each timer with the correct value. For example:

- `CUSTOM_TIMER_NY`: The time remaining until the timer’s end, such as New Year’s Day.
- `CUSTOM_TIMER_6H`: The time left in a 6-hour period that started when the user opened the paywall.

</TabItem> 

<TabItem value="unity" label="Unity (C#)" default> 

```csharp showLineNumbers
var parameters = new AdaptyUICreateViewParameters()
  .SetCustomTimers(
    new Dictionary<string, DateTime> {
      { "CUSTOM_TIMER_6H", DateTime.Now.AddHours(6) }, // 6 hours
      { "CUSTOM_TIMER_NY", new DateTime(2025, 1, 1) } // New Year 2025
    }
  )

AdaptyUI.CreateView(paywall, parameters, (view, error) => {
  // handle the result
});
```

-  In this example, `CUSTOM_TIMER_NY` and `CUSTOM_TIMER_6H` are the **Timer ID**s of developer-defined timers you set in the Adapty Dashboard. The `timerResolver` ensures your app dynamically updates each timer with the correct value. For example:

  - `CUSTOM_TIMER_NY`: The time remaining until the timer’s end, such as New Year’s Day.
  - `CUSTOM_TIMER_6H`: The time left in a 6-hour period that started when the user opened the paywall.

</TabItem> 

 <TabItem value="rn" label="React Native (TS)" default> 

```typescript showLineNumbers
let timerInfo = { 'CUSTOM_TIMER_NY': new Date(2025, 0, 1) }
//and then you can pass it to createPaywallView as follows:
view = await createPaywallView(paywall, { timerInfo })
```

In this example, `CUSTOM_TIMER_NY` is the **Timer ID** of the developer-defined timer you set in the Adapty dashboard. The `timerResolver` ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer’s end time, such as New Year’s Day, minus the current time).

 </TabItem> 
 </Tabs>

