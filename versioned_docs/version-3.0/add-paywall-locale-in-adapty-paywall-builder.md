---
title: "Add paywall locale in Adapty Paywall Builder"
description: "Add localized paywalls in Adapty’s Paywall Builder to improve user experience worldwide."
metadataTitle: "Add Paywall Locale in Adapty Builder | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Localizing is a tedious process that requires time and precision. When using Paywall Builder, Adapty does almost all of the work for you, as most of the things you'll need work out of the box. This page describes how it works.

Suppose you've finished configuring your paywall in the default `en` localization and you like the result. Now it's time to add another language.

## Add and set up localization

1. Click **Add locale** and select all the languages you want to include in your app.



<Zoom>
  <img src={require('./img/add-PB-locale.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

2. Open the **Localization** menu to view all added locales. New locales will be pre-filled with values from the default language.

<Zoom>
  <img src={require('./img/localization.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Now, you can translate the content manually, use AI, or export the localization file for external translators.

## Translating paywalls with AI

AI-powered translation is a quick and efficient way to localize your paywall.

:::note

To use AI for paywall translation, you’ll need a Pro+ or Enterprise plan.

:::

We automatically detect which lines have never been translated or have changed in English since their last translation and mark them as needing an update. Lines that were already translated and haven't changed will keep their original translation and won’t be re-translated.

Rich text formatting (bold, italic, colored text, etc.) won’t be preserved in the translated version. Please adjust the translated text manually as needed.

1. Select the languages for translation.

   <Zoom>
     <img src={require('./img/localization-table-language-PB.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

2. Click **AI Translate** to apply translations. The paywall lines will be translated and added to the table.

## Exporting localization files for external translation

You can export localization files to share with your translators and then import the translated results back into Adapty.

Exporting by the **Export** button creates individual `.csv` files for each language, bundled into a single archive. If you only need one file, you can export it directly from the language-specific menu.

<Zoom>
  <img src={require('./img/localization-single-export-pb.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Once you’ve received the translated files, use the **Import** button to upload them all at once or individually. Adapty will automatically validate the files to ensure they match the correct format and paywall configuration structure.

### Import file format

To ensure a successful import, the import file must meet the following requirements:

- **File Name and Extension:**
  The file name must match the locale it represents and have a `.csv` extension. You can verify and copy the locale name in the Adapty Dashboard. If the name is not recognized, the import will fail.

<Zoom>
  <img src={require('./img/copy_locale.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

- **Valid CSV:**
  The file must be a valid CSV format. Invalid files will fail to import

- **Only Commas as Separators**:
  Use commas as separators. Other separators will result in errors.

- **Header Line**:
  The file must include a header line.

- **Correct Column Names:**
  The column names must be **id** and **value**.

- **No Additional Entities:**
  Ensure the file doesn’t include entities not present in the current paywall configuration. Extra entities will result in errors.

- **Partial import:**
  The file can include all or just some entities from the current paywall configuration.

  | **Issue**                                      | **Solution**                                                 |
  | ---------------------------------------------- | ------------------------------------------------------------ |
  | **Imported .csv files are invalid**            | Validate the file to ensure it adheres to CSV standards. Check for missing or extra commas, incorrect separators, missing header lines, and ensure the column names are **id** and **value**. |
  | **Some of the languages are not in the table** | Ensure file names match the locale names exactly as shown in the localization table. If they don’t match, rename them accordingly. Also, verify the file’s content to ensure it relates to the paywall configuration. |

## Manual localization

Sometimes, you might want to tweak translations, add different images for specific locales, or even adjust remote configurations directly.

1. Choose the element you want to translate and type in a new value. You can update both **String** and **List** values or replace images with those better suited for the locale.



<Zoom>
  <img src={require('./img/pb_localization.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>



2. Take advantage of the context menu in the English locale to resolve localization issues efficiently:

   - **Copy this value to all locales**: Overwrites any changes made in non-English locales for the selected row, replacing them with the value from the English locale.

   - **Revert all row changes to original values**: Discards any changes made during the current session and restores the values to their last saved state.

<Zoom>
  <img src={require('./img/locale_options.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

After adding locales to a paywall, make sure to [implement locale codes correctly in your app's code](localizations-and-locale-codes).

### Preview the localization result

You can check your texts while editing by simply switching over back to the **Builder** tab and selecting another locale:

<Zoom>
  <img src={require('./img/choose_localization.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

:::note
Pay attention to the locale code (`en`, `fr` and `it` ). You'll need to pass it to the `getViewConfiguration` method of our SDK to get the correct localization.
<Zoom>
  <img src={require('./img/copy_locale.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

You can learn more about it [here](get-pb-paywalls).
:::



Once you add locales to a paywall, learn to [correctly work with locale codes in your app's code](localizations-and-locale-codes).