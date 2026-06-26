一部のSDK（Adaptyを含む）には、独自のAndroid Auto Backup設定が含まれています。バックアップルールを定義する複数のSDKを使用している場合、Androidのマニフェストマージャーが `android:fullBackupContent`、`android:dataExtractionRules`、または `android:allowBackup` に関するエラーで失敗することがあります。

よくあるエラーの症状: `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/your_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

:::note
これらの変更は、Androidプラットフォームのディレクトリ（通常はプロジェクトの `android/` フォルダー内）で行う必要があります。
:::

この問題を解決するには、以下が必要です：

- バックアップ関連の属性に対して、アプリの値を使用するようマニフェストマージャーに指示する。

- AdaptyのルールとほかのSDKのルールをマージしたバックアップルールファイルを作成する。

#### 1. マニフェストに `tools` 名前空間を追加する \{#1-add-the-tools-namespace-to-your-manifest\}

`AndroidManifest.xml` ファイルのルートの `<manifest>` タグに tools が含まれていることを確認してください：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. `<application>` でバックアップ属性を上書きする \{#2-override-backup-attributes-in-application\}

同じ `AndroidManifest.xml` ファイルで、`<application>` タグを更新して、アプリが最終的な値を提供し、マニフェストマージャーにライブラリの値を置き換えるよう指示します：

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

いずれかのSDKが `android:allowBackup` も設定している場合は、`tools:replace` に含めてください：

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

#### 3. マージしたバックアップルールファイルを作成する \{#3-create-merged-backup-rules-files\}

AndroidプロジェクトのAdaptyのルールとほかのSDKのルールを組み合わせた `res/xml/` ディレクトリにXMLファイルを作成します。AndroidはOSのバージョンによって異なるバックアップルール形式を使用するため、両方のファイルを作成することで、アプリがサポートするすべてのAndroidバージョンとの互換性が確保されます。

:::note
以下の例では、サンプルのサードパーティSDKとしてAppsFlyerを使用しています。アプリで使用しているほかのSDKのルールに置き換えるか、追加してください。
:::

**Android 12以降**（新しいデータ抽出ルール形式を使用）：

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

**Android 11以前**（従来のフルバックアップコンテンツ形式を使用）：

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    
    <exclude domain="sharedpref" path="appsflyer-data"/>

    
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    