Bazı SDK'lar (Adapty dahil) kendi Android Auto Backup yapılandırmasını içerir. Yedekleme kurallarını tanımlayan birden fazla SDK kullanıyorsanız, Android manifest birleştirme işlemi `android:fullBackupContent`, `android:dataExtractionRules` veya `android:allowBackup` ile ilgili bir hatayla başarısız olabilir.

Tipik hata belirtileri: `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/your_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

:::note
Bu değişiklikler Android platform dizininizde yapılmalıdır (genellikle projenizin `android/` klasöründe bulunur).
:::

Sorunu çözmek için şunları yapmanız gerekir:

- Manifest birleştirme işlemine, yedeklemeyle ilgili özellikler için uygulamanızın değerlerini kullanmasını söyleyin.

- Adapty'nin kurallarını diğer SDK'ların kurallarıyla birleştiren yedekleme kuralı dosyaları oluşturun.

#### 1. Manifestinize `tools` ad alanını ekleyin \{#1-add-the-tools-namespace-to-your-manifest\}

`AndroidManifest.xml` dosyanızda, kök `<manifest>` etiketinin tools içerdiğinden emin olun:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. `<application>` içinde yedekleme özelliklerini geçersiz kılın \{#2-override-backup-attributes-in-application\}

Aynı `AndroidManifest.xml` dosyasında, `<application>` etiketini güncelleyerek uygulamanızın nihai değerleri sağlamasını ve manifest birleştirme işlemine kütüphane değerlerini değiştirmesini söyleyin:

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

Herhangi bir SDK de `android:allowBackup` ayarlıyorsa, bunu `tools:replace` içine ekleyin:

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

#### 3. Birleştirilmiş yedekleme kuralı dosyaları oluşturun \{#3-create-merged-backup-rules-files\}

Android projenizin `res/xml/` dizininde, Adapty'nin kurallarını diğer SDK'ların kurallarıyla birleştiren XML dosyaları oluşturun. Android, işletim sistemi sürümüne bağlı olarak farklı yedekleme kuralı formatları kullandığından, her iki dosyayı da oluşturmak uygulamanızın desteklediği tüm Android sürümleriyle uyumluluk sağlar.

:::note
Aşağıdaki örneklerde örnek bir üçüncü taraf SDK olarak AppsFlyer kullanılmaktadır. Uygulamanızda kullandığınız diğer SDK'lar için kuralları değiştirin veya ekleyin.
:::

**Android 12 ve üzeri için** (yeni veri çıkarma kuralları formatını kullanır):

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

**Android 11 ve altı için** (eski tam yedekleme içeriği formatını kullanır):

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    
    <exclude domain="sharedpref" path="appsflyer-data"/>

    
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    