---
title: "Remote config paywall localization"
description: "Expand your paywall's reach across diverse markets by configuring locales in remote config. Learn how to optimize localization and cater to specific regional preferences"
metadataTitle: "Implement Multi-Language Support: Adding Paywall Locale in Remote Config"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

In a world with many cultures, it's important to adapt your product for each country. You can do this by using paywall localizations. For each paywall, make versions in different languages —each one catering to a specific language—to match the needs of specific local markets.

If you've [designed a paywall with the remote config](customize-paywall-with-remote-config), use the remote config as well to add localizations. Whether you're using a table view or JSON format, you can easily tweak settings for different languages. For example, you can translate String keys from English to Italian or set different Boolean values like TRUE for English and FALSE for Italian. You can even change background images based on the language. Basically, you keep the same setup but customize values for each language, making sure users get a personalized experience.

How to set up a localization for a paywall customized using remote config:

1. Open the [**Products and Paywalls**](https://app.adapty.io/paywalls) section in the Adapty main menu and click the **Paywall** tab to open it and click the **3-dot** button next to the product and select the **Edit** option.

   

<Zoom>
  <img src={require('./img/deaa5f0-paywalls_edit.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




2. In the **Paywalls / Your paywall** window, switch to the **Remote config** tab.

   

<Zoom>
  <img src={require('./img/68e80c5-switch_to_remote_config.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. In the **Remote config** tab, click the **Add locale** button and select all languages you want to have in your app in the **Locales** window.

   

<Zoom>
  <img src={require('./img/eea8027-add_locale.webp').default}
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

After you click **Save**, the **Locales** window closes, and the chosen languages are added to the paywall. Now you can translate the content. This can be done manually, or automatically with ChatGPT or you can export the localization file and pass them to external translators or translating agencies.

## Translating paywalls with AI

With the current development level of AI, AI translation is a perfect option to get a fast, qualitative localization fast and free.

:::note

To use the paywall automatic translation with ChatGPT, you’ll need a paid plan: Pro, Pro+, or Enterprise.

:::

You can both translate **String** and **List** values, all of them are selected by default (you can see them marked violet). If some lines have been already translated, they are marked green and will not be added to the new localization by default. Not translated and not chosen for translation lines are grey.

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

1. Choose which lines should or should not be translated. If some lines should not be translated, unselect them by clicking the violet mark. A violet mark above all lines works as select/clear all. 
   We recommend unchecking lines with IDs, URLs, and variables, otherwise ChatGPT may translate them as well.

3. Choose the languages to which you want to translate automatically.

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

4. After you finalized what to translate, click Translate. Translation for the selected lines will be added to the remote config. The translated lines will be marked green. 

Sometimes localization is nopt only the translation of lines, but also using different pictures or even design for different locations. Do not forget to make additional changes if required.

## Export of localization files for external translation

Although the AI is a modenrn tendency in localization, you may prefer a proven-qualitative way to translate your app and paywalls in it - human professional translators or a translation agency with translation base. In this case, you may export the localization files to transfer them to your translators and then import the result.

Export extracts all languages as separate .json files joined to a single archve file. If you want to extract one file, you can do that from the language personal menu.

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

After you receive the translated files, import them with the **Import** button in a balk or one by one. Adapty will validate the imported files to make sure they match the format and paywall remote config structure.

### Import file format

For successful import, the import file should match several requirements:

- It should be named as the locale it belongs to and have .json extension. You can always check and copy the locale name in the Adapty Dashboard. If the name id not recognized, the import will fail.

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

- It should be a valid JSON. If it is not, the import will fail.

- It should not contain any additional keys that are not in the current remote config.

- It should contain all elements of the current remote config. If it does not, the import will succeed with some errors which will be shown in the table view of the remote config. Hover over it to learn the issue and refer to the table below for recomendations on how to solve.

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

| Issue                                      | Solution                                                     |
| ------------------------------------------ | ------------------------------------------------------------ |
| Invalid JSON file                          | The import file is not a valid JSON. Validate it, make su not comma is missed and extra, etc. |
| Some of the languages are not in the table | <p>This means that at least one of the import files have the name that does not correcpond the locale name. To fix it, check that all files are called with the locale name. The locale names are shown in the remote config..</p><p>Another reason is that you try to import an absolutely different file.</p> |
| Some of the keys are not in the table      | <p>This means that the import file contains at least one key that is not present in the currecnt remote config. This may happen if you removed some keys from the remote config after you exported it for the localization or if there is a typo in them. In this case, review the import file and remove any extra keys.</p><p>Another reason is that you try to import an absolutely incorrect file. Open it and check.</p> |



## Manual translation

Although the AI is a great way to translate your paywall, you still may want to tune the AI-translations or make them from scratch. In this case, 

1. Click on the element you want to translate and enter a new value. You can both translate **String** and **List** values and replace pictures with those more appropriate for the locale. 



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




Feel free to use the context menu of the English locale to fix localization issues:

- Use the **Push this value to all locales** menu to overwrite any changes made in the row for non-English locales, replacing them with the values from the English locale.
- Use the **Revert all row changes to original values** menu to cancel all changes made in the current session, reverting them to the last saved values.

  

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




Once you add locales to a paywall, learn to [correctly work with locale codes in your app's code](localizations-and-locale-codes).