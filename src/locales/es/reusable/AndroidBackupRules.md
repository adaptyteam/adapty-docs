Algunos SDKs (incluido Adapty) incluyen su propia configuración de Android Auto Backup. Si utilizas varios SDKs que definen reglas de copia de seguridad, el fusionador de manifiestos de Android puede fallar con un error relacionado con `android:fullBackupContent`, `android:dataExtractionRules` o `android:allowBackup`.

Síntomas típicos del error: `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/your_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

:::note
Estos cambios deben realizarse en el directorio de la plataforma Android (normalmente en la carpeta `android/` de tu proyecto).
:::

Para resolverlo, necesitas:

- Indicar al fusionador de manifiestos que use los valores de tu app para los atributos relacionados con la copia de seguridad.

- Crear archivos de reglas de copia de seguridad que combinen las reglas de Adapty con las de otros SDKs.

#### 1. Añade el namespace `tools` a tu manifiesto \{#1-add-the-tools-namespace-to-your-manifest\}

En tu archivo `AndroidManifest.xml`, asegúrate de que la etiqueta raíz `<manifest>` incluya tools:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. Sobreescribe los atributos de copia de seguridad en `<application>` \{#2-override-backup-attributes-in-application\}

En el mismo archivo `AndroidManifest.xml`, actualiza la etiqueta `<application>` para que tu app proporcione los valores definitivos e indique al fusionador de manifiestos que reemplace los valores de las librerías:

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

Si algún SDK también define `android:allowBackup`, inclúyelo en `tools:replace`:

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

#### 3. Crea los archivos de reglas de copia de seguridad combinadas \{#3-create-merged-backup-rules-files\}

Crea archivos XML en el directorio `res/xml/` de tu proyecto Android que combinen las reglas de Adapty con las de otros SDKs. Android utiliza distintos formatos de reglas de copia de seguridad según la versión del sistema operativo, por lo que crear ambos archivos garantiza la compatibilidad con todas las versiones de Android que admite tu app.

:::note
Los ejemplos a continuación usan AppsFlyer como SDK de terceros de muestra. Reemplaza o añade reglas para cualquier otro SDK que uses en tu app.
:::

**Para Android 12 y superior** (usa el nuevo formato de reglas de extracción de datos):

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

**Para Android 11 e inferior** (usa el formato legado de contenido de copia de seguridad completa):

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    
    <exclude domain="sharedpref" path="appsflyer-data"/>

    
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    