---
title: "Unity – Install Adapty SDK"
description: ""
metadataTitle: ""
---

To install the SDK, download`adapty-unity-plugin-*.unitypackage` from GitHub and import it into your project. Please also download and import the [External Dependency Manager plugin](https://github.com/googlesamples/unity-jar-resolver).


<img
  src={require('./img/156ca86-add_adapty_plugin.png').default}
/>





The SDK uses the "External Dependency Manager" plugin to handle iOS Cocoapods dependencies and Android gradle dependencies. After the installation, you may need to invoke the dependency manager:

`Assets -> External Dependency Manager -> Android Resolver -> Force Resolve`

and

`Assets -> External Dependency Manager -> iOS Resolver -> Install Cocoapods`

When building your Unity project for iOS, you would get `Unity-iPhone.xcworkspace` file, which you have to open instead of `Unity-iPhone.xcodeproj`, otherwise, Cocoapods dependencies won't be used.

:::danger
Read Checklist before releasing your app

Be sure to carefully read [Release Checklist](release-checklist) when releasing your app. It's critical to make things right from the first attempt!
:::