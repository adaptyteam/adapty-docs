---
title: "Use localizations and locale codes"
description: "Managing Localizations & Locale Codes | Adapty Docs"
metadataTitle: "Manage app localizations and locale codes to reach a global audience."
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

## Why this is important

There are a few scenarios when locale codes come into play — for example, when you're trying to fetch the correct paywall for the current localization of your app.

As locale codes are complicated and can vary from platform to platform, we rely on an internal standard for all the platforms we support. However, because these codes are complicated, it is really important for you to understand what exactly are you sending to our server to get the correct localization, and what happens next — so you will always receive what you expect.

## Locale code standard at Adapty

For locale codes, Adapty uses a slightly modified [BCP 47 standard](https://en.wikipedia.org/wiki/IETF_language_tag): every code consists of lowercase subtags, separated by hyphens. Some examples: `en` (English), `pt-br` (Portuguese (Brazil)), `zh` (Simplified Chinese), `zh-hant` (Traditional Chinese).

## Locale code matching

When Adapty receives a call from the client-side SDK with the locale code and starts looking for a corresponding localization of a paywall, the following happens:

1. The incoming locale string is converted to lowercase and all the underscores (`_`) are replaced with hyphens (`-`)
2. We then look for the localization with the fully matching locale code
3. If no match was found, we take the substring before the first hyphen (`pt` for `pt-br`) and look for the matching localization
4. If no match was found again, we return the default `en` localization

This way an iOS device that sent `'pt_BR'`, an Android device that sent `pt-BR`, and another device that sent `pt-br` will get the same result.

## Implementing localizations: recommended way

If you're wondering about localizations, chances are you're already dealing with the localized string files in your project. If that's the case, we recommend placing some key-value with the intended Adapty locale code in each of your files for the corresponding localizations. And then extract the value for this key when calling our SDK, like so:

<Tabs>
<TabItem value="Swift" label="iOS" default>
```swift showLineNumbers
// 1. Modify your Localizable.strings files

/*
Localizable.strings - Spanish
*/
adapty_paywalls_locale = "es";
/*
Localizable.strings - Portuguese (Brazil)
*/
adapty_paywalls_locale = "pt-br";
// 2. Extract and use the locale code
let locale = NSLocalizedString("adapty_paywalls_locale", comment: "")
// pass locale code to AdaptyUI.getViewConfiguration or Adapty.getPaywall method
```
</TabItem>
<TabItem value="kotlin" label="Android" default>
```kotlin showLineNumbers
// 1. Modify your strings.xml files

/*
strings.xml - Spanish
*/
<string name="adapty_paywalls_locale">es</string>

/*
strings.xml - Portuguese (Brazil)
*/
<string name="adapty_paywalls_locale">pt-br</string>

// 2. Extract and use the locale code

val localeCode = context.getString(R.string.adapty_paywalls_locale)
// pass locale code to AdaptyUI.getViewConfiguration or Adapty.getPaywall method
```
</TabItem>
</Tabs>



That way you can ensure you're in full control of what localization will be retrieved for every user of your app.

## Implementing localizations: the other way

You can get similar (but not identical) results without explicitly defining locale codes for every localization. That would mean extracting a locale code from some other objects that your platform provides, like this:

<Tabs>
<TabItem value="Swift" label="iOS" default>
```swift showLineNumbers
let locale = Locale.current.identifier
// pass locale code to AdaptyUI.getViewConfiguration or Adapty.getPaywall method
```
</TabItem>
<TabItem value="kotlin" label="Android" default>
```kotlin showLineNumbers
val locale = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N)
    context.resources.configuration.locales[0]
else
    context.resources.configuration.locale

val localeCode = locale.toLanguageTag()
// pass locale code to AdaptyUI.getViewConfiguration or Adapty.getPaywall method
```
</TabItem>
</Tabs>

Note that we don't recommend this approach due to few reasons:

1. On iOS preferred languages and current locale are not identical. If you want the localization to be picked correctly you'll have to either rely on Apple's logic, which works out of the box if you're using the recommended approach with localized string files, or re-create it.
2. It's hard to predict what exactly will Adapty's server get. For example, on iOS, it is possible to obtain a locale like `ar_OM@numbers='latn'` on a device and send it to our server. And for this call you will get not the `ar-om` localization you were looking for, but rather `ar`, which is likely unexpected.

Should you decide to use this approach anyway — make sure you've covered all the relevant use cases.