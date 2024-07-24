---
title: "Unity – Install AdaptyUI SDK"
description: ""
metadataTitle: ""
---

Begin configuring the Adapty paywall builder by installing the [Adapty Unity SDK](unity-installation). Note that the AdaptyUI SDK is necessary only if you intend to use the paywalls created with the Paywall Builder.


<img
  src={require('./img/173671f-CleanShot_2023-11-01_at_14.34.05_22x.png').default}
  style={{
    border: 'none', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>





The SDK uses the "External Dependency Manager" plugin to handle iOS Cocoapods dependencies and Android gradle dependencies. After the installation you may need to invoke the dependency manager

`Assets -> External Dependency Manager -> Android Resolver -> Force Resolve`

and

`Assets -> External Dependency Manager -> iOS Resolver -> Install Cocoapods`

When building your Unity project for iOS, you would get `Unity-iPhone.xcworkspace` file, which you have to open instead of `Unity-iPhone.xcodeproj`, otherwise Cocoapods dependencies won't be used.