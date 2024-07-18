---
title: "Add paywall locale in Adapty Paywall Builder"
description: "Effortlessly tailor your paywall for different markets by integrating locales within Adapty Paywall Builder. Learn how to enhance global reach and cater to specific regional needs"
metadataTitle: "Optimize Localization: Adding Locale in Adapty Paywall Builder"
---

Localizing is a tedious process that requires time and precision. When using Paywall Builder, Adapty does almost all of the work for you, as most of the things you'll need work out of the box. This page describes how it works.

Suppose you've finished configuring your paywall in the default `en` localization and you like the result. Now it's time to add another language.

## Add and set up localization

1. Switch over to the **Localizations** tab below the **Builder** title. 

   
<img
  src={require('./img/0a6100c-PB_localization.png').default}
/>



2. Click the **Add locale** button, and select all languages you want to have in your app.

   
<img
  src={require('./img/4abdb84-add_locale.png').default}
/>




      Once added, the new locale will be pre-filled with values from the default.

   
<img
  src={require('./img/0e99ddb-copy_locale.png').default}
/>




:::note
Pay attention to the locale code (`en`, `fr` and `it` on the screenshot above). You'll need to pass it to the `getViewConfiguration` method of our SDK to get the correct localization.

You can learn more about it [here](get-pb-paywalls).
:::

3. Now you can fill in the translated values for the new locale. There are a few controls in this table that can make it easier (especially if you have many locales).

   
<img
  src={require('./img/df4b331-locale_options.png').default}
/>




   Feel free to use the context menu of the English locale to fix localization issues:

   - Use the **Push this value to all locales** menu to overwrite any changes made in the row for non-English locales, replacing them with the values from the English locale.
   - Use the **Revert all row changes to original values** menu to cancel all changes made in the current session, reverting them to the last saved values.

:::note
Using tag variables

We strongly recommend using tag variables (such as `<PROD_TITLE/>`) to speed up your localization process and ensure that the text is always correct. Learn more about them [here](https://docs.adapty.io/docs/paywall-builder-tag-variables).
:::

### Preview the localization result

You can check your texts while editing by simply switching over back to the **Builder** tab and selecting another locale:


<img
  src={require('./img/2b31427-choose_localization.png').default}
/>





Once you add locales to a paywall, learn to [correctly work with locale codes in your app's code](localizations-and-locale-codes).