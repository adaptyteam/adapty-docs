---
title: "Test & release"
description: "Learn how to test and release your Unity app with Adapty SDK."
metadataTitle: "Test & Release | Unity SDK | Adapty Docs"
slug: /unity-test
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Testing your integration

Before releasing your app, thoroughly test your Adapty integration:

### Test purchases

1. Use sandbox accounts for testing
2. Test all purchase flows
3. Test restore purchases
4. Test subscription upgrades/downgrades
5. Test paywall presentation

### Test paywalls

1. Test paywall loading
2. Test paywall presentation
3. Test paywall events
4. Test offline fallback paywalls
5. Test localization

### Test onboardings

1. Test onboarding presentation
2. Test onboarding actions
3. Test onboarding completion
4. Test onboarding events

## Release checklist

Before releasing to production:

- [ ] All purchase flows tested
- [ ] Paywalls working correctly
- [ ] Onboardings functioning
- [ ] Error handling implemented
- [ ] Analytics tracking configured
- [ ] App Store Connect configured
- [ ] Google Play Console configured

## Common issues

### Purchase issues

- Ensure sandbox accounts are properly configured
- Check product IDs match App Store/Google Play
- Verify app bundle ID matches store configuration

### Paywall issues

- Check paywall configuration in Adapty dashboard
- Verify network connectivity
- Test fallback paywalls

### Integration issues

- Ensure SDK is properly initialized
- Check API keys are correct
- Verify platform-specific setup 