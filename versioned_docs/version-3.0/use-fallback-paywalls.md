---
title: "Use fallback paywalls"
description: "Learn how to use fallback paywalls to improve user retention."
metadataTitle: "How to Use Fallback Paywalls | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

A paywall is an in-app storefront where customers can see and purchase products within your mobile app. Typically, paywalls are fetched from the server when a customer accesses them. However, Adapty allows you to have fallback paywalls for situations when a user opens the app without a connection to the Adapty backend (e.g., no internet connection or in the rare case of backend unavailability) and there's no cache on the device.

Adapty generates fallbacks as a JSON file in the necessary format, reflecting English versions of the paywalls you've configured in the Adapty Dashboard. Download it and pass it or its contents to the `Adapty.setFallbackPaywalls` method, following the instructions specific per framework:

- [iOS](ios-use-fallback-paywalls)
- [Android](android-use-fallback-paywalls)
- [Flutter](flutter-use-fallback-paywalls)
- [React Native](react-native-use-fallback-paywalls)
- [Unity](unity-use-fallback-paywalls)

