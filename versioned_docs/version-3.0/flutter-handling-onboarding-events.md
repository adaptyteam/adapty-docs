---
title: "Flutter - Handle onboarding events"
description: "Handle onboarding-related events in Flutter using Adapty."
metadataTitle: "Handling Onboarding Events in Flutter | Adapty Docs"
toc_max_heading_level: 4
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Details from '@site/src/components/Details';

Onboardings configured with the builder generate events your app can respond to. Learn how to respond to these events below.

To control or monitor processes occurring on the onboarding screen within your mobile app, implement the `AdaptyUIObserver` methods and set the observer before presenting any screen:

```javascript showLineNumbers title="Flutter"
AdaptyUI().setObserver(this);
```
## Closing onboarding

Onboarding is considered closed when a user taps a button with the **Close** action assigned.

<Zoom>
  <img src={require('./img/ios-events-2.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::important
Note that you need to manage what happens when a user closes the onboarding. For instance, you need to stop displaying the onboarding itself.
:::
For example:

```javascript showLineNumbers
some code sample
```

### Updating field state

When your users respond to a quiz question or input their data into an input field, the `onStateUpdatedAction` method will be invoked. You can save or process the field type in your code.

For example:

```javascript showLineNumbers title="Flutter"
some code sample
```

:::note
If you want to save or process data, you need to implement the methods yourself.
:::

The `action` object contains:
- `elementId`: A unique identifier for the input element. You can use it to associate questions with answers when saving them.
- `params`: The user's input data, which can be one of the following types:
- `select`: Single selection from a list of options.
- `multiSelect`: Multiple selections from a list of options.
- `input`: Text input from the user.
- `datePicker`: Date selected by the user.


### Opening a paywall

:::tip
Handle this event to open a paywall if you want to open it inside the onboarding. If you want to open a paywall after it is closed, there is a more straightforward way to do it – handle [`AdaptyOnboardingsCloseAction`](#closing-onboarding) and open a paywall without relying on the event data.
:::

If a user clicks a button that opens a paywall, you will get a button action ID that you [set up manually](get-paid-in-onboardings.md). The most seamless way to work with paywalls in onboardings is to make the action ID equal to a paywall placement ID. This way, after the `AdaptyOnboardingsOpenPaywallAction`, you can use the placement ID to get and open the paywall right away:

```javascript showLineNumbers title="Flutter"
some code snippet
```

### Finishing loading onboarding

When an onboarding finishes loading, this method will be invoked:

```javascript showLineNumbers title="Flutter"
some code snippet
```

### Tracking navigation

You receive an analytics event when various navigation-related events occur during the onboarding flow.

The `event` object can be one of the following types:
|Type | Description |
|------------|-------------|
| `onboardingStarted` | When the onboarding has been loaded |
| `screenPresented` | When any screen is shown |
| `screenCompleted` | When a screen is completed. Includes optional `elementId` (identifier of the completed element) and optional `reply` (response from the user). Triggered when users perform any action to exit the screen. |
| `secondScreenPresented` | When the second screen is shown |
| `userEmailCollected` | Triggered when the user's email is collected via the input field |
| `onboardingCompleted` | Triggered when a user reaches a screen with the `final` ID. If you need this event, [assign the `final` ID to the last screen](design-onboarding.md). |
| `unknown` | For any unrecognized event type. Includes `name` (the name of the unknown event) and `meta` (additional metadata) |

Each event includes `meta` information containing:
| Field | Description |
|------------|-------------|
| `onboardingId` | Unique identifier of the onboarding flow |
| `screenClientId` | Identifier of the current screen |
| `screenIndex` | Current screen's position in the flow |
| `screensTotal` | Total number of screens in the flow |



Here's an example of how you can use analytics events for tracking:

```javascript showLineNumbers title="Flutter"
some code snippet
```