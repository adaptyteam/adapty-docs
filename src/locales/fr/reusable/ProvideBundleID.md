---
no_index: true 
---

1. Ouvrez [App Store Connect](https://appstoreconnect.apple.com/apps). Sélectionnez votre application et accédez à la section **General** → **App Information**.

2. Copiez le **Bundle ID** dans la sous-section **General Information**.

   Copiez uniquement l'identifiant — au format DNS inversé sans espaces, par exemple `com.company.app`. App Store Connect affiche le nom de l'application à côté dans d'autres vues, comme la liste des applications ; coller ce nom au lieu de l'identifiant entraînera l'échec de la validation de la connexion.

   

<Zoom>
  <img src="/docs/img/afd5012-bundle_id_apple.webp"
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>




3. Ouvrez l'onglet [**App settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk) depuis le menu supérieur d'Adapty et collez la valeur copiée dans le champ **Bundle ID**.

   

<Zoom>
  <img src="/docs/img/2d64163-bundle_id.webp"
  style={{
    border: '1px solid #727272', /* border width and color */
    width: '700px', /* image width */
    display: 'block', /* for alignment */
    margin: '0 auto' /* center alignment */
  }}
/>
</Zoom>

4. Revenez à la page **App information** dans App Store Connect et copiez l'**Apple ID** qui s'y trouve.
5. Sur la page [**App settings** -> **iOS SDK**](https://app.adapty.io/settings/ios-sdk) dans l'Adapty Dashboard, collez l'ID dans le champ **Apple app ID**.