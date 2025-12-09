<!--- AndroidBackupRules.md --->

Some SDKs (including Adapty) ship their own Android Auto Backup configuration. If you use multiple SDKs that define backup rules, the Android manifest merger can fail with an error mentioning `android:fullBackupContent`, `android:dataExtractionRules`, or `android:allowBackup`.

Typical error symptoms: `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/your_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

:::note
These changes should be made in your Android platform directory (typically located in your project's `android/` folder).
:::

To resolve this, you need to:

- Tell the manifest merger to use your app's values for backup-related attributes.

- Create backup rule files that merge Adapty's rules with rules from other SDKs.

#### 1. Add the `tools` namespace to your manifest

In your `AndroidManifest.xml` file, ensure the root `<manifest>` tag includes tools:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. Override backup attributes in `<application>`

In the same `AndroidManifest.xml` file, update the `<application>` tag so that your app provides the final values and tells the manifest merger to replace library values:

```xml
<application
android:name=".App"
android:allowBackup="true"
android:fullBackupContent="@xml/sample_backup_rules"           <!-- Android 11 and lower -->
android:dataExtractionRules="@xml/sample_data_extraction_rules"<!-- Android 12+ -->
tools:replace="android:fullBackupContent,android:dataExtractionRules">

    ...
</application>
```

If any SDK also sets `android:allowBackup`, include it in `tools:replace` as well:

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

#### 3. Create merged backup rules files

Create XML files in your Android project's `res/xml/` directory that combine Adapty's rules with rules from other SDKs. Android uses different backup rule formats depending on the OS version, so creating both files ensures compatibility across all Android versions your app supports.

:::note
The examples below show AppsFlyer as a sample third-party SDK. Replace or add rules for any other SDKs you're using in your app.
:::

**For Android 12 and higher** (uses the new data extraction rules format):

```xml title="sample_data_extraction_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
    <cloud-backup>
        <!-- AppsFlyer backup rules -->
        <exclude domain="sharedpref" path="appsflyer-data"/>
        <exclude domain="sharedpref" path="appsflyer-purchase-data"/>
        <exclude domain="database" path="afpurchases.db"/>
        <!-- Adapty backup rules -->
        <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>
    </cloud-backup>

    <device-transfer>
        <!-- Usually the same rules as cloud-backup -->
        <exclude domain="sharedpref" path="appsflyer-data"/>
        <exclude domain="sharedpref" path="appsflyer-purchase-data"/>
        <exclude domain="database" path="afpurchases.db"/>
        <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>
    </device-transfer>
</data-extraction-rules>
```

**For Android 11 and lower** (uses the legacy full backup content format):

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    <!-- AppsFlyer backup rules -->
    <exclude domain="sharedpref" path="appsflyer-data"/>

    <!-- Adapty backup rules -->
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    <!-- Your own app-specific rules (if any) -->
    <!-- <exclude domain="database" path="your_database_name" /> -->
</full-backup-content>
```

With this setup:

- Adapty's backup exclusions (`AdaptySDKPrefs.xml`) are preserved.

- Other SDKs' exclusions (for example, `appsflyer-data`) are also applied.

- The manifest merger uses your app's configuration and no longer fails on conflicting backup attributes.

