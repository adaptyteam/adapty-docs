Некоторые SDK (включая Adapty) поставляются с собственной конфигурацией Android Auto Backup. Если вы используете несколько SDK, каждый из которых определяет правила резервного копирования, слияние манифестов Android может завершиться ошибкой, связанной с `android:fullBackupContent`, `android:dataExtractionRules` или `android:allowBackup`.

Типичные симптомы ошибки: `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/your_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

:::note
Эти изменения нужно вносить в директорию Android-платформы (обычно находится в папке `android/` вашего проекта).
:::

Чтобы решить проблему, необходимо:

- Указать механизму слияния манифестов использовать значения вашего приложения для атрибутов, связанных с резервным копированием.

- Создать файлы правил резервного копирования, объединяющие правила Adapty с правилами других SDK.

#### 1. Добавьте пространство имён `tools` в манифест

В файле `AndroidManifest.xml` убедитесь, что корневой тег `<manifest>` включает tools:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. Переопределите атрибуты резервного копирования в `<application>`

В том же файле `AndroidManifest.xml` обновите тег `<application>`, чтобы ваше приложение предоставляло итоговые значения и указывало механизму слияния манифестов заменять значения библиотек:

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

Если какой-либо SDK также задаёт `android:allowBackup`, включите его в `tools:replace`:

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

#### 3. Создайте объединённые файлы правил резервного копирования

Создайте XML-файлы в директории `res/xml/` вашего Android-проекта, объединяющие правила Adapty с правилами других SDK. Android использует разные форматы правил резервного копирования в зависимости от версии ОС, поэтому создание обоих файлов обеспечивает совместимость со всеми версиями Android, которые поддерживает ваше приложение.

:::note
В примерах ниже в качестве стороннего SDK используется AppsFlyer. Замените или добавьте правила для других SDK, которые используются в вашем приложении.
:::

**Для Android 12 и выше** (используется новый формат правил извлечения данных):

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

**Для Android 11 и ниже** (используется устаревший формат полного резервного копирования):

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    
    <exclude domain="sharedpref" path="appsflyer-data"/>

    
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    