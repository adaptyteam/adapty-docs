---
title: "Troubleshoot purchases in iOS SDK"
description: "Troubleshoot purchases in iOS SDK"
metadataTitle: "Troubleshoot Purchases in iOS | Adapty Docs"
---

This guide helps you resolve common issues when implementing purchases manually in the iOS SDK.

## AdaptyError.cantMakePayments in observer mode

**Issue**: You're getting `AdaptyError.cantMakePayments` when using `makePurchase` in observer mode.

**Reason**: In observer mode, you should handle purchases on your side, not use Adapty's `makePurchase` method.

**Solution**: If you use `makePurchase` for purchases, turn off the observer mode. You need either to use `makePurchase` or handle purchases on your side in the observer mode. See [Implement Observer mode](implement-observer-mode) for more details.

## Not found makePurchasesCompletionHandlers

**Issue**: You're encountering issues with `makePurchasesCompletionHandlers` not being found.

**Reason**: This is typically related to sandbox testing issues.

**Solution**: Create a new sandbox user and try again. This often resolves sandbox-related purchase completion handler issues.

## Other issues

**Issue**: You're experiencing other purchase-related problems not covered above.

**Solution**: Migrate the SDK to the latest version using the [migration guides](ios-sdk-migration-guides) if needed. Many issues are resolved in newer SDK versions.
