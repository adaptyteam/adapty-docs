---
title: "Capacitor - Use fallback paywalls"
description: "Use fallback paywalls in Capacitor apps with Adapty for stable revenue."
metadataTitle: "Using Fallback Paywalls in Capacitor | Adapty Docs"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Follow the instructions below to use the fallback paywalls in your mobile app code.

### For Android

1. Place the fallback file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard) to a directory on the native layer. There are 2 correct directories to put the file: `android/app/src/main/assets/` or `android/app/src/main/res/raw/`.  
   Please keep in mind that the `res/raw` folder has a special file naming convention (start with a letter, no capital letters, no special characters except for the underscore, and no spaces in the names).

   1. **For android/app/src/main/assets/**: Pass the file path relatively to the `assets` directory,  for example:
      - `{ relativeAssetPath: 'android_fallback.json' }` if you placed the file to the  root of `assets` itself
      - `{ relativeAssetPath: '<additional_folder>/android_fallback.json' }` if you placed it in a child folder of `assets`
   2. **For android/app/src/main/res/raw/**: Pass `{ rawResName: 'android_fallback' }`. Type the file name without the file extension.
2. Pass the result of step 2 to the `android` property of `FileLocation`.

### For iOS

1. In XCode, use the menu **File** -> **Add Files to "YourProjectName"** to add the fallback file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard).
2. Pass `{ fileName: 'ios_fallback.json' }` to the `ios` property of `FileLocation`.

Here's an example of retrieving fallback paywall data from locally stored JSON files named `android_fallback.json` and `ios_fallback.json`.


```typescript showLineNumbers
import { adapty } from '@adapty/capacitor';

const fileLocation = {
  ios: {
    fileName: 'ios_fallback.json'
  },
  android: {
    //if the file is located in 'android/app/src/main/assets/'
    relativeAssetPath: 'android_fallback.json'
  }
};

await adapty.setFallback(fileLocation);
```

Parameters:

| Parameter            | Description                                              |
| :------------------- | :------------------------------------------------------- |
| **fileLocation** | The object represents the location of the file resource. |