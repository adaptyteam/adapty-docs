---
title: "Handle paywall events"
description: ""
metadataTitle: ""
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Paywalls designed with the [Paywall Builder](adapty-paywall-builder) generate some events that require your attention and handling after they are raised. Among such events are paywall closure, URL opening, product selection, purchase start, purchase cancellation, successful and failed purchase, as well as successful and failed purchase restoration.

In the framework-specific sections, we'll dive into details of effective management and monitoring processes taking place on the paywall screen within your mobile app using the Adapty SDK. Explore the configuration guides for every platform below:

- [iOS](ios-handling-events)
- [Android](android-handling-events)
- [Flutter](flutter-handling-events)
- [React Native](react-native-handling-events-1)

:::warning
The new Paywall Builder is available for iOS, Android, React Native, and Flutter only and requires Adapty SDK v3.0 (v3.2.0 for Flutter) or later. For presenting paywalls in Adapty SDK v2 designed with legacy Paywall Builder, see [Handle paywall events designed with legacy Paywall Builder](handling-pb-paywall-events).
:::