---
title: "Paywall timer"
description: "Enhance your promotions with a customizable paywall timer, perfect for creating urgency with time-limited offers, featuring adjustable text, color, and format options."
metadataTitle: "Customizable Paywall Timer for Special Offers"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

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

Paywall timers are only available in the [new Paywall Builder](adapty-paywall-builder), which is compatible with Adapty SDK v3.0 and later, available for iOS, Android, and React Native. The legacy Paywall Builder with Adapty SDK v2.x or earlier does not support paywall timer functionality.

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

You can also create a custom timer by selecting **Custom** in the  **Timer mode** parameter and setting up the timer directly in your mobile app code as described below.

## How to use custom timers in your mobile app

To use custom timers in your mobile app, create a `timerResolver` object—a dictionary or map that pairs custom timers with the string values that will replace them when the paywall is rendered. Here's an example:



<Tabs> <TabItem value="Swift" label="Swift" default>

```Swift
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

</TabItem> <TabItem value="kotlin" label="Kotlin" default> 

```kotlin
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

</TabItem> <TabItem value="java" label="Java" default> 

```JAVA

```

</TabItem> <TabItem value="Flutter" label="Flutter" default> 

```
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

 </TabItem> <TabItem value="Unity" label="Unity" default> Text </TabItem> <TabItem value="RN" label="React Native (TS)" default> 

```

```

 </TabItem> </Tabs>

In this example, `CUSTOM_TIMER_NY` is the ID of the custom timer you set in the Adapty dashboard. The `timerResolver` ensures your app dynamically updates the timer with the correct value—like `13d 09h 03m 34s` (calculated as the timer’s end time, such as New Year’s Day, minus the current time).
