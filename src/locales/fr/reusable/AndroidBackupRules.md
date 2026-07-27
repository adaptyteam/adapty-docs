
Certains SDKs (dont Adapty) embarquent leur propre configuration Android Auto Backup. Si vous utilisez plusieurs SDKs qui définissent des règles de sauvegarde, la fusion du manifeste Android peut échouer avec une erreur mentionnant `android:fullBackupContent`, `android:dataExtractionRules` ou `android:allowBackup`.

Symptômes typiques : `Manifest merger failed: Attribute application@dataExtractionRules value=(@xml/your_data_extraction_rules)
is also present at [com.other.sdk:library:1.0.0] value=(@xml/other_sdk_data_extraction_rules)`

:::note
Ces modifications doivent être effectuées dans votre répertoire de la plateforme Android (généralement situé dans le dossier `android/` de votre projet).
:::

Pour résoudre ce problème, vous devez :

- Indiquer au gestionnaire de fusion de manifeste d'utiliser les valeurs de votre application pour les attributs liés à la sauvegarde.

- Créer des fichiers de règles de sauvegarde qui fusionnent les règles d'Adapty avec celles des autres SDKs.

#### 1. Ajoutez l'espace de noms `tools` à votre manifeste \{#1-add-the-tools-namespace-to-your-manifest\}

Dans votre fichier `AndroidManifest.xml`, assurez-vous que la balise racine `<manifest>` inclut tools :

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
package="com.example.app">

    ...
</manifest>
```

#### 2. Remplacez les attributs de sauvegarde dans `<application>` \{#2-override-backup-attributes-in-application\}

Dans le même fichier `AndroidManifest.xml`, mettez à jour la balise `<application>` afin que votre application fournisse les valeurs finales et indique au gestionnaire de fusion de remplacer les valeurs des bibliothèques :

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

Si un SDK définit également `android:allowBackup`, incluez-le dans `tools:replace` :

```xml
tools:replace="android:allowBackup,android:fullBackupContent,android:dataExtractionRules"
```

#### 3. Créez les fichiers de règles de sauvegarde fusionnés \{#3-create-merged-backup-rules-files\}

Créez des fichiers XML dans le répertoire `res/xml/` de votre projet Android, en combinant les règles d'Adapty avec celles des autres SDKs. Android utilise des formats de règles de sauvegarde différents selon la version de l'OS, donc créer les deux fichiers garantit la compatibilité avec toutes les versions d'Android prises en charge par votre application.

:::note
Les exemples ci-dessous utilisent AppsFlyer comme exemple de SDK tiers. Remplacez ou ajoutez des règles pour tout autre SDK que vous utilisez dans votre application.
:::

**Pour Android 12 et supérieur** (utilise le nouveau format de règles d'extraction de données) :

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

**Pour Android 11 et inférieur** (utilise l'ancien format de sauvegarde complète) :

```xml title="sample_backup_rules.xml"
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    
    <exclude domain="sharedpref" path="appsflyer-data"/>

    
    <exclude domain="sharedpref" path="AdaptySDKPrefs.xml"/>

    
