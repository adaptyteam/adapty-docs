---
title: "React Native - Use fallback paywalls"
description: "Use fallback paywalls in React Native apps with Adapty for stable revenue."
metadataTitle: "Using Fallback Paywalls in React Native | Adapty Docs"
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
2. Pass the result of step 2 to the `android` property of `FallbackPaywallsLocation`.

### For iOS

1. In XCode, use the menu **File** -> **Add Files to "YourProjectName"** to add the fallback file you [downloaded in the Adapty Dashboard](fallback-paywalls#download-fallback-paywalls-as-a-file-in-the-adapty-dashboard).
2. Pass `{ fileName: 'ios_fallback.json' }` to the `ios` property of `FallbackPaywallsLocation`.

Here's an example of retrieving fallback paywall data from locally stored JSON files named `android_fallback.json` and `ios_fallback.json`.

<Tabs groupId="current-os" queryString> <TabItem value="current" label="Current (v2.11+)" default> 
```typescript showLineNumbers
//after v2.11
const paywallsLocation = {
  ios: {
    fileName: 'ios_fallback.json'
  },
  android: {
    //if the file is located in 'android/app/src/main/assets/'
    relativeAssetPath: 'android_fallback.json'
  }
}
await adapty.setFallbackPaywalls(paywallsLocation);
```
</TabItem> 
<TabItem value="old" label="Legacy (before v2.11)" default> 
```typescript showLineNumbers
//Legacy (before v2.11)
const fallbackPaywalls = Platform.select({
  ios: require('./ios_fallback.json'),
  android: require('./android_fallback.json'),
});
// React Native automatically parses JSON, but we do not need that
const fallbackString = JSON.stringify(fallbackPaywalls);

await adapty.setFallbackPaywalls(fallbackString);
```
</TabItem> 
</Tabs>




Parameters:

| Parameter            | Description                                              |
| :------------------- | :------------------------------------------------------- |
| **paywallsLocation** | The object represents the location of the file resource. |