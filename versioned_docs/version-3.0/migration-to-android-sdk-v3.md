---
title: "Migrate Adapty Android SDK to v. 3.0"
description: "Migrate to Adapty Android SDK v3.0 for better performance and new monetization features."
metadataTitle: "Migrating to Adapty Android SDK v3.0 | Adapty Docs"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Adapty SDK v.3.0 brings support for the new exciting [Adapty Paywall Builder](adapty-paywall-builder), the new version of the no-code user-friendly tool to create paywalls. With its maximum flexibility and rich design capabilities, your paywalls will become most effective and profitable.

Adapty SDKs are delivered as a BoM (Bill of Materials), ensuring that the Adapty SDK and AdaptyUI SDK versions in your app remain consistent.

To migrate to v3.0, update your code as follows:

<Tabs groupId="current-os" queryString>
  <TabItem value="module-level build.gradle" label="module-level build.gradle" default>

```diff showLineNumbers
dependencies {
    ...
-   implementation 'io.adapty:android-sdk:2.11.5'
-   implementation 'io.adapty:android-ui:2.11.3'
+   implementation platform('io.adapty:adapty-bom:3.0.4')
+   implementation 'io.adapty:android-sdk'
+   implementation 'io.adapty:android-ui'
}
```

</TabItem>
<TabItem value="module-level build.gradle.kts" label="module-level build.gradle.kts" default>

```diff showLineNumbers
dependencies {
    ...
-   implementation("io.adapty:android-sdk:2.11.5")
-   implementation("io.adapty:android-ui:2.11.3")
+   implementation(platform("io.adapty:adapty-bom:3.0.4"))
+   implementation("io.adapty:android-sdk")
+   implementation("io.adapty:android-ui")
}
```

</TabItem>
<TabItem value="version catalog" label="version catalog" default>

```diff showLineNumbers
//libs.versions.toml

[versions]
..
- adapty = "2.11.5"
- adaptyUi = "2.11.3"
+ adaptyBom = "3.0.4"

[libraries]
..
- adapty = { group = "io.adapty", name = "android-sdk", version.ref = "adapty" }
- adapty-ui = { group = "io.adapty", name = "android-ui", version.ref = "adaptyUi" }
+ adapty-bom = { module = "io.adapty:adapty-bom", version.ref = "adaptyBom" }
+ adapty = { module = "io.adapty:android-sdk" }
+ adapty-ui = { module = "io.adapty:android-ui" }


//module-level build.gradle.kts

dependencies {
    ...
+   implementation(libs.adapty.bom)    
    implementation(libs.adapty)
    implementation(libs.adapty.ui)
}
```

</TabItem>
</Tabs> 