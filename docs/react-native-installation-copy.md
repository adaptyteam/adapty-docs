---
title: "React Native — Installation (COPY)"
description: ""
metadataTitle: ""
---

:::note
Read Checklist before releasing your app

Be sure to carefully read [Release Checklist](release-checklist) when releasing your app. It's critical to make things right from the first attempt!
:::

Currently, React Native offers two ways of development flows: Expo and "pure". Adapty can work with both. Please, refer to the only one section below that matches your setup.

### Expo (managed)

You can avoid local builds with EAS, configuration may vary depending on your setup, but here you can find the most common and simple setup.

0.1. If you don't have EAS CLI yet, install it with following command

```sh
npm install -g eas-cli
```

0.2. Then in the root of your project install dev client to make a development build

```sh
expo install expo-dev-client
```

1. Run the installation command:

```sh
expo install react-native-adapty
```

2. iOS: Make an iOS build with EAS CLI. This command may prompt you for an additional info. You can refer to [official documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) to find out more.

```sh
eas build --profile development --platform ios
```

3. Android: Make an Android with EAS CLI. This command may prompt you for an additional info. You can refer to [official documentation](https://docs.expo.dev/develop/development-builds/create-a-build/) to find out more.

```sh
eas build --profile development --platform android
```

4. Start a development server with the following command.

```sh
expo start --dev-client
```

This should result into the working app with react-native-adapty.

:::warning
Failed to start (Invariant Violation: Native module cannot be null)

if you scan QR code from CLI dev client it might lead you to this error. To resolve it  you can try the following:
On your device open EAS built app (it should provide some Expo screen) and manually insert URL that Expo provides (screenshot below). You can unescape special characters in URL with JS function `unescape(“string”)`, which should result into something like `http://192.168.1.35:8081`
:::

### Pure React Native

If you prefer a pure workflow. refer to following instructions:

1. In your project run the installation command:

```sh
yarn add react-native-adapty
```

2. iOS: Install required pods:

```sh
pod install --project-directory=ios
```

3. Android: Update `/android/build.gradle` file. Make sure there is a `kotlin-gradle-plugin:1.8.0` dependency or newer:

```groovy /android/build.gradle
...
buildscript {
  ...
  dependencies {
    ...
    classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.6.21"
  }
}
...
```