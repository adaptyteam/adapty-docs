Một số SDK (bao gồm Adapty) đi kèm với cấu hình Android Auto Backup riêng. Nếu bạn sử dụng nhiều SDK có định nghĩa backup rules, quá trình merge Android manifest có thể thất bại với lỗi liên quan đến `android:fullBackupContent`, `android:dataExtractionRules`, hoặc `android:allowBackup`.

Triệu chứng lỗi thường gặp: `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/your_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

:::note
Những thay đổi này cần được thực hiện trong thư mục platform Android của bạn (thường nằm trong thư mục `android/` của dự án).
:::

Để khắc phục, bạn cần:

- Yêu cầu manifest merger sử dụng các giá trị của ứng dụng cho các thuộc tính liên quan đến backup.

- Tạo các file backup rule kết hợp rules của Adapty với rules từ các SDK khác.

#### 1. Thêm namespace `tools` vào manifest \{#1-add-the-tools-namespace-to-your-manifest\}

Trong file `AndroidManifest.xml`, hãy đảm bảo thẻ gốc `<manifest>` có chứa tools:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. Ghi đè các thuộc tính backup trong `<application>` \{#2-override-backup-attributes-in-application\}

Trong cùng file `AndroidManifest.xml`, cập nhật thẻ `<application>` để ứng dụng của bạn cung cấp các giá trị cuối cùng và yêu cầu manifest merger thay thế các giá trị từ thư viện:

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

Nếu có SDK nào cũng đặt `android:allowBackup`, hãy thêm nó vào `tools:replace`:

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

#### 3. Tạo các file backup rules đã merge \{#3-create-merged-backup-rules-files\}

Tạo các file XML trong thư mục `res/xml/` của dự án Android, kết hợp rules của Adapty với rules từ các SDK khác. Android sử dụng các định dạng backup rule khác nhau tùy theo phiên bản OS, vì vậy việc tạo cả hai file đảm bảo tương thích với tất cả các phiên bản Android mà ứng dụng hỗ trợ.

:::note
Các ví dụ dưới đây sử dụng AppsFlyer làm SDK bên thứ ba mẫu. Hãy thay thế hoặc bổ sung rules cho các SDK khác mà bạn đang dùng trong ứng dụng.
:::

**Dành cho Android 12 trở lên** (sử dụng định dạng data extraction rules mới):

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

**Dành cho Android 11 trở xuống** (sử dụng định dạng full backup content cũ):

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    
    <exclude domain="sharedpref" path="appsflyer-data"/>

    
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    