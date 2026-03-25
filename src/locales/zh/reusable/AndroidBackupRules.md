部分 SDK（包括 Adapty）会附带自己的 Android Auto Backup 配置。如果您使用了多个定义备份规则的 SDK，Android 清单合并工具可能会失败，并出现提及 `android:fullBackupContent`、`android:dataExtractionRules` 或 `android:allowBackup` 的错误。

典型错误症状：`Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/your_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

:::note
这些更改应在您的 Android 平台目录中进行（通常位于项目的 `android/` 文件夹中）。
:::

要解决此问题，您需要：

- 告知清单合并工具使用您应用的备份相关属性值。

- 创建备份规则文件，将 Adapty 的规则与其他 SDK 的规则合并。

#### 1. 在清单中添加 `tools` 命名空间 \{#1-add-the-tools-namespace-to-your-manifest\}

在您的 `AndroidManifest.xml` 文件中，确保根 `<manifest>` 标签包含 tools：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. 在 `<application>` 中覆盖备份属性 \{#2-override-backup-attributes-in-application\}

在同一个 `AndroidManifest.xml` 文件中，更新 `<application>` 标签，使您的应用提供最终值，并告知清单合并工具替换库中的值：

```xml
<application
android:name=".App"
android:allowBackup="true"
android:fullBackupContent="@xml/sample_backup_rules"           
android:dataExtractionRules="@xml/sample_data_extraction_rules"
tools:replace="android:fullBackupContent,android:dataExtractionRules">

    ...
</application>
```

如果某个 SDK 也设置了 `android:allowBackup`，请将其同样加入 `tools:replace`：

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

#### 3. 创建合并后的备份规则文件 \{#3-create-merged-backup-rules-files\}

在您 Android 项目的 `res/xml/` 目录中创建 XML 文件，将 Adapty 的规则与其他 SDK 的规则合并。Android 根据操作系统版本使用不同的备份规则格式，因此同时创建这两个文件可确保您的应用在所有支持的 Android 版本上的兼容性。

:::note
以下示例使用 AppsFlyer 作为第三方 SDK 的示例。请替换或添加您应用中实际使用的其他 SDK 的规则。
:::

**适用于 Android 12 及更高版本**（使用新的数据提取规则格式）：

```xml title="sample_data_extraction_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
    <cloud-backup>
        
        <exclude domain="sharedpref" path="appsflyer-data"/>
        <exclude domain="sharedpref" path="appsflyer-purchase-data"/>
        <exclude domain="database" path="afpurchases.db"/>
        
        <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>
    </cloud-backup>

    <device-transfer>
        
        <exclude domain="sharedpref" path="appsflyer-data"/>
        <exclude domain="sharedpref" path="appsflyer-purchase-data"/>
        <exclude domain="database" path="afpurchases.db"/>
        <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>
    </device-transfer>
</data-extraction-rules>
```

**适用于 Android 11 及更低版本**（使用旧版完整备份内容格式）：

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    
    <exclude domain="sharedpref" path="appsflyer-data"/>

    
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    