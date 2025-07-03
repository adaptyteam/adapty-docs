---
title: "Localize paywalls"
description: "Learn how to localize paywalls in your React Native app with Adapty SDK."
metadataTitle: "Localize Paywalls | React Native SDK | Adapty Docs"
slug: /react-native-localizations-and-locale-codes
displayed_sidebar: sdkreactnative
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Set locale

To set the locale for paywall localization:

```javascript
import { Adapty } from 'react-native-adapty';

// Set locale for paywalls
await Adapty.setLocale('en_US');
```

## Get paywalls with locale

You can specify locale when getting paywalls:

```javascript
const paywalls = await Adapty.getPaywalls({
  locale: 'en_US'
});
```

## Supported locale codes

Adapty supports the following locale codes:

### English
- `en_US` - English (United States)
- `en_GB` - English (United Kingdom)
- `en_CA` - English (Canada)
- `en_AU` - English (Australia)

### Spanish
- `es_ES` - Spanish (Spain)
- `es_MX` - Spanish (Mexico)
- `es_AR` - Spanish (Argentina)

### French
- `fr_FR` - French (France)
- `fr_CA` - French (Canada)

### German
- `de_DE` - German (Germany)
- `de_AT` - German (Austria)
- `de_CH` - German (Switzerland)

### Italian
- `it_IT` - Italian (Italy)

### Portuguese
- `pt_BR` - Portuguese (Brazil)
- `pt_PT` - Portuguese (Portugal)

### Russian
- `ru_RU` - Russian (Russia)

### Japanese
- `ja_JP` - Japanese (Japan)

### Korean
- `ko_KR` - Korean (South Korea)

### Chinese
- `zh_CN` - Chinese (Simplified)
- `zh_TW` - Chinese (Traditional)
- `zh_HK` - Chinese (Hong Kong)

## Auto-detect locale

You can auto-detect the device locale:

```javascript
import { getLocales } from 'react-native-localize';

const deviceLocales = getLocales();
const primaryLocale = deviceLocales[0];

// Set locale based on device
await Adapty.setLocale(primaryLocale.languageTag);
```

## Fallback locale

If a locale is not available, Adapty will fall back to the default locale:

```javascript
// Try to set Spanish, fall back to English if not available
try {
  await Adapty.setLocale('es_ES');
} catch (error) {
  console.log('Spanish not available, using default');
  await Adapty.setLocale('en_US');
}
```

## Check available locales

You can check which locales are available for a paywall:

```javascript
const paywalls = await Adapty.getPaywalls();

paywalls.forEach(paywall => {
  if (paywall.visualPaywall) {
    console.log('Available locales for', paywall.developerId, ':', 
      paywall.visualPaywall.localizations.map(l => l.locale));
  }
});
``` 