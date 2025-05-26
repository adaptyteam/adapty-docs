---
title: "Handle paywall events"
description: "Track and handle PB paywall events efficiently in Adapty."
metadataTitle: "Handling PB Paywall Events | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SampleApp from '@site/src/components/reusable/SampleApp.md'; 

Paywalls designed with the [Paywall Builder](adapty-paywall-builder) generate some events that require your attention and handling after they are raised. Among such events are paywall closure, URL opening, product selection, purchase start, purchase cancellation, successful and failed purchase, as well as successful and failed purchase restoration.
<SampleApp /> 

In the framework-specific sections, we'll dive into details of effective management and monitoring processes taking place on the paywall screen within your mobile app using the Adapty SDK. Explore the configuration guides for every platform below:

- [iOS](ios-handling-events)
- [Android](android-handling-events)
- [Flutter](flutter-handling-events)
- [React Native](react-native-handling-events-1)
- [Unity](unity-handling-events)

:::warning
The new Paywall Builder works with iOS, Android, and React Native SDKs version 3.0 or higher, and Flutter and Unity SDKs version 3.3.0 or higher. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Handle paywall events designed with legacy Paywall Builder](handling-pb-paywall-events).
:::