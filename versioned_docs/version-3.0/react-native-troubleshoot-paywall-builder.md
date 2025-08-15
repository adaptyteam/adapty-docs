---
title: "Troubleshoot Paywall Builder in React Native SDK"
description: "Troubleshoot Paywall Builder in React Native SDK"
metadataTitle: "Troubleshoot Paywall Builder in React Native | Adapty Docs"
---
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

This guide helps you resolve common issues when using paywalls designed in the Adapty Paywall Builder in the React Native SDK.

## Getting a paywall configuration fails

**Issue**: The `getPaywallConfiguration` method fails to retrieve paywall configuration.

**Reason**: The paywall is not enabled for device display in the Paywall Builder.

**Solution**: Enable the **Show on device** toggle in the Paywall Builder.

<Zoom>
  <img src={require('./img/show-on-device.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

## The paywall view number is too big

**Issue**: The paywall view count is showing double the expected number.

**Reason**: You may be calling `logShowPaywall` in your code, which duplicates the view count. For paywalls designed with the Paywall Builder, analytics is tracked automatically, so you don't need to use this method.

**Solution**: Ensure you are not calling `logShowPaywall` in your code.

## Other issues

**Issue**: You're experiencing other Paywall Builder-related problems not covered above.

**Solution**: Migrate the SDK to the latest version using the [migration guides](react-native-sdk-migration-guides) if needed. Many issues are resolved in newer SDK versions.
