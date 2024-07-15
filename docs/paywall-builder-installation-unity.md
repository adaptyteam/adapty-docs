---
title: "Unity – Install AdaptyUI SDK"
description: ""
metadataTitle: ""
---

Begin configuring the Adapty paywall builder by installing the [Adapty Unity SDK](unity-installation). Note that the AdaptyUI SDK is necessary only if you intend to use the paywalls created with the Paywall Builder.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/173671f-CleanShot_2023-11-01_at_14.34.05_22x.png" 
    style={{ width: 'auto', border: 'none' }}
  />
</div>





The SDK uses the "External Dependency Manager" plugin to handle iOS Cocoapods dependencies and Android gradle dependencies. After the installation you may need to invoke the dependency manager

`Assets -> External Dependency Manager -> Android Resolver -> Force Resolve`

and

`Assets -> External Dependency Manager -> iOS Resolver -> Install Cocoapods`

When building your Unity project for iOS, you would get `Unity-iPhone.xcworkspace` file, which you have to open instead of `Unity-iPhone.xcodeproj`, otherwise Cocoapods dependencies won't be used.