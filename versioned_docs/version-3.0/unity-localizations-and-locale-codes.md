---
title: "Localize paywalls"
description: "Learn how to localize paywalls in your Unity app with Adapty SDK."
metadataTitle: "Localize Paywalls | Unity SDK | Adapty Docs"
slug: /unity-localizations-and-locale-codes
displayed_sidebar: sdkunity
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

## Set locale

To set the locale for paywall localization:

```csharp
using Adapty;

// Set locale for paywalls
await Adapty.SetLocale("en_US");
```

## Get paywalls with locale

You can specify locale when getting paywalls:

```csharp
var paywalls = await Adapty.GetPaywalls(new AdaptyPaywallOptions
{
    Locale = "en_US"
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

```csharp
// Get system locale
var systemLocale = Application.systemLanguage.ToString();

// Set locale based on device
await Adapty.SetLocale(systemLocale);
```

## Fallback locale

If a locale is not available, Adapty will fall back to the default locale:

```csharp
try
{
    await Adapty.SetLocale("es_ES");
}
catch (Exception error)
{
    Debug.Log("Spanish not available, using default");
    await Adapty.SetLocale("en_US");
}
```

## Check available locales

You can check which locales are available for a paywall:

```csharp
var paywalls = await Adapty.GetPaywalls();

foreach (var paywall in paywalls)
{
    if (paywall.VisualPaywall != null)
    {
        var availableLocales = paywall.VisualPaywall.Localizations.Select(l => l.Locale);
        Debug.Log($"Available locales for {paywall.DeveloperId}: {string.Join(", ", availableLocales)}");
    }
}
``` 