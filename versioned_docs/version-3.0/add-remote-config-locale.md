---
title: "Remote config paywall localization"
description: "Expand your paywall's reach across diverse markets by configuring locales in remote config. Learn how to optimize localization and cater to specific regional preferences"
metadataTitle: "Implement Multi-Language Support: Adding Paywall Locale in Remote Config"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

Adapting your paywalls for different languages is essential in a world with diverse cultures. Localization allows you to create tailored experiences for users in specific regions. For each paywall, you can add versions in various languages, ensuring that your product resonates with local audiences.

If you’ve [designed a paywall using remote config](customize-paywall-with-remote-config), you can use the same remote config to set up localizations. Whether in table view or JSON format, you can easily adjust settings for each language. For example, translate string keys, toggle Boolean values (e.g., `TRUE` for English, `FALSE` for Italian), or even swap out background images. With this flexibility, you keep your core setup while tailoring the user experience for different languages.

## Setting up localization for remote configured paywalls

1. Go to the [**Products and Paywalls**](https://app.adapty.io/paywalls) section in Adapty, select the **Paywall** tab, and click the **3-dot** button next to the paywall to choose **Edit**.



2. In the paywall editor, navigate to the **Remote config** tab.

   

<Zoom>
  <img src={require('./img/switch_to_remote_config.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Click **Locales** and select the languages you want to support. Save your changes to add these locales to the paywall.

   

<Zoom>
  <img src={require('./img/add_locale.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Now, you can translate the content manually, use AI like ChatGPT, or export the localization file for external translators.

## Translating paywalls with AI

AI-powered translation is a quick and efficient way to localize your paywall.

:::note

To use AI for paywall translation, you’ll need a Pro, Pro+, or Enterprise plan.

:::

You can translate both **String** and **List** values. By default, all lines are selected (highlighted in violet). Lines that have already been translated are marked in green and won’t be included in the new translation by default. Lines that are not selected or translated appear in gray.

<Zoom>
  <img src={require('./img/localization-table.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

<Zoom>
  <img src={require('./img/localization-json.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

1. Select the lines to translate. It's a good idea to uncheck lines with IDs, URLs, and variables to prevent AI from translating them.
   
3. Select the languages for translation.

   <Zoom>
     <img src={require('./img/localization-table-language.webp').default}
     style={{
       border: '1px solid #727272', /* border width and color */
       width: '700px', /* image width */
       display: 'block', /* for alignment */
       margin: '0 auto' /* center alignment */
     }}
   />
   </Zoom>

4. Click **Translate** to apply translations. The selected lines will be translated and added to the remote config, with the translated lines marked green.. 

## Exporting localization files for external translation

While AI-powered localization is becoming a popular trend, you might prefer a more reliable method, like using professional human translators or a translation agency with a strong track record. If that’s the case, you can export localization files to share with your translators and then import the translated results back into Adapty.

Exporting creates individual `.json` files for each language, bundled into a single archive. If you only need one file, you can export it directly from the language-specific menu.

<Zoom>
  <img src={require('./img/localization-table-language.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

Once you’ve received the translated files, use the **Import** button to upload them all at once or individually. Adapty will automatically validate the files to ensure they match the correct format and paywall remote config structure.

### Import file format

- To ensure a successful import, the import file must meet the following requirements:

  - **File Name and Extension:**
    The file name must match the locale it represents and have a `.json` extension. You can verify and copy the locale name in the Adapty Dashboard. If the name is not recognized, the import will fail.

  <Zoom>
    <img src={require('./img/locale-name.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

- **Valid JSON:**
  The file must be a valid JSON. If it is not, the import will fail.

  **No Additional Keys:**
  The file should not contain any keys that are not in the current remote config. Extra keys will result in errors.

  **All Required Elements:**
  The file must include all elements present in the current remote config. If any are missing, the import will succeed with errors, which will be displayed in the remote config table view. Hover over the error to see the issue, and refer to the table below for recommendations on resolving it.

  <Zoom>
    <img src={require('./img/localization-error.webp').default}
    style={{
      border: '1px solid #727272', /* border width and color */
      width: '700px', /* image width */
      display: 'block', /* for alignment */
      margin: '0 auto' /* center alignment */
    }}
  />
  </Zoom>

  | **Issue**                               | **Solution**                                                 |
  | --------------------------------------- | ------------------------------------------------------------ |
  | **Invalid JSON file**                   | The file is not a valid JSON. Validate it to ensure it meets JSON formatting standards (e.g., check for missing or extra commas). |
  | **Some languages are not in the table** | <p>At least one file name does not match a locale name. Ensure all files are named correctly, as shown in the localization table. Locale names must match exactly.</p><p>Another possible reason is attempting to import an unrelated file. Verify the file’s contents.</p> |
  | **Some keys are not in the table**      | The file contains keys not present in the current remote config. This may occur if keys were removed from the remote config after exporting for localization or if there are typos in the file. Review the file and remove any extra. |

## Manual localization

Sometimes, you might want to tweak translations, add different images for specific locales, or even adjust remote configurations directly.

1. Select the element you want to translate and enter a new value. You can update both **String** and **List** values or replace images with those better suited for the locale.



<Zoom>
  <img src={require('./img/032b429-remote_config_localization.webp').default}
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
  <img src={require('./img/d7e70f1-remote_confi_loc_table_options.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

After adding locales to a paywall, make sure to [implement locale codes correctly in your app's code](localizations-and-locale-codes).
