
##  Codes StoreKit système \{#system-storekit-codes\}

| Erreur | Code | Description |
|-----|----|-----------|
| unknown | 0 | Cette erreur indique qu'une erreur inconnue ou inattendue s'est produite. |
| clientInvalid | 1 | Ce code d'erreur indique que le client n'est pas autorisé à effectuer l'action tentée. |
| paymentCancelled | 2 | <p>Ce code d'erreur indique que l'utilisateur a annulé une demande de paiement.</p><p>Aucune action n'est requise, mais d'un point de vue métier, vous pouvez proposer une remise à votre utilisateur ou lui rappeler plus tard.</p> |
| paymentInvalid | 3 | Cette erreur indique que l'un des paramètres de paiement n'a pas été reconnu par le store. |
| paymentNotAllowed | 4 | <p>Ce code d'erreur indique que l'utilisateur n'est pas autorisé à valider des paiements. Raisons possibles :</p><p></p><p>- Les paiements ne sont pas pris en charge dans le pays de l'utilisateur.</p><p>- L'utilisateur est mineur.</p> |
| storeProductNotAvailable | 5 | Ce code d'erreur indique que le produit demandé est absent de l'App Store. Vérifiez que le produit est disponible pour le pays concerné. |
| cloudServicePermissionDenied | 6 | Ce code d'erreur indique que l'utilisateur n'a pas autorisé l'accès aux informations du service Cloud. |
| cloudServiceNetworkConnectionFailed | 7 | Ce code d'erreur indique que l'appareil n'a pas pu se connecter au réseau. |
| cloudServiceRevoked | 8 | Ce code d'erreur indique que l'utilisateur a révoqué l'autorisation d'utiliser ce service cloud. |
| privacyAcknowledgementRequired | 9 | Ce code d'erreur indique que l'utilisateur n'a pas encore accepté la politique de confidentialité du store. |
| unauthorizedRequestData | 10 | Ce code d'erreur indique que la requête est mal construite. |
| invalidOfferIdentifier | 11 | <p>L'identifiant de l'offre n'est pas valide. Raisons possibles :</p><p></p><p>- Vous n'avez pas configuré d'offre avec cet identifiant dans l'App Store.</p><p>- Vous avez révoqué l'offre.</p><p>- Vous avez mal saisi l'identifiant de l'offre.</p> |
| invalidSignature | 12 | Ce code d'erreur indique que la signature dans une remise de paiement n'est pas valide. Assurez-vous d'avoir renseigné le champ **In-app purchase Key ID** et téléversé le fichier **In-App Purchase Private Key**. Consultez la rubrique [Configure App Store integration](app-store-connection-configuration) pour plus de détails. |
| missingOfferParams | 13 | <p>Cette erreur indique des problèmes avec l'intégration Adapty ou avec les offres.</p><p>Consultez [Configure App Store integration](app-store-connection-configuration) et [Offers](offers) pour savoir comment les configurer.</p> |
| invalidOfferPrice | 14 | Ce code d'erreur indique que le prix que vous avez spécifié dans le store n'est plus valide. Les offres doivent toujours correspondre à un prix réduit. |

## Codes Android personnalisés \{#custom-android-codes\}

| Erreur | Code | Description |
|-----|----|-----------|
| adaptyNotInitialized | 20 | Vous devez configurer correctement le SDK Adapty via la méthode `activate`. Découvrez comment procéder dans [Install & configure Adapty SDK](sdk-installation-capacitor). |
| productNotFound | 22 | Cette erreur indique que le produit demandé pour l'achat n'est pas disponible dans le store. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | L'abonnement d'origine à renouveler est introuvable. |
| billingServiceTimeout | 97 | Cette erreur indique que la requête a atteint le délai d'attente maximal avant que Google Play puisse répondre. Cela peut être causé, par exemple, par un retard dans l'exécution de l'action demandée par l'appel à la bibliothèque Play Billing. |
| featureNotSupported | 98 | La fonctionnalité demandée n'est pas prise en charge par le Play Store sur l'appareil actuel. |
| billingServiceDisconnected | 99 | Cette erreur fatale indique que la connexion de l'application cliente au service Google Play Store via le `BillingClient` a été interrompue. |
| billingServiceUnavailable | 102 | Cette erreur transitoire indique que le service Google Play Billing est actuellement indisponible. Dans la plupart des cas, cela signifie qu'il y a un problème de connexion réseau entre l'appareil client et les services Google Play Billing. |
| billingUnavailable | 103 | <p>Cette erreur indique qu'une erreur de facturation utilisateur s'est produite lors du processus d'achat. Exemples de situations où cela peut se produire :</p><p></p><p>1\. L'application Play Store sur l'appareil de l'utilisateur est obsolète.</p><p>2. L'utilisateur se trouve dans un pays non pris en charge.</p><p>3. L'utilisateur est un utilisateur entreprise et son administrateur a désactivé la possibilité d'effectuer des achats.</p><p>4. Google Play ne peut pas débiter le moyen de paiement de l'utilisateur. Par exemple, la carte bancaire de l'utilisateur a peut-être expiré.</p><p>5. L'utilisateur n'est pas connecté à l'application Play Store.</p> |
| developerError | 105 | Il s'agit d'une erreur fatale indiquant que vous utilisez incorrectement une API. |
| billingError | 106 | Il s'agit d'une erreur fatale indiquant un problème interne à Google Play. |
| itemAlreadyOwned | 107 | Le produit consommable a déjà été acheté. |
| itemNotOwned | 108 | Cette erreur indique que l'action demandée sur l'article a échoué car |
| billingNetworkError | 112 | Cette erreur indique qu'il y a eu un problème de connexion réseau entre l'appareil et les systèmes Play. |


## Codes StoreKit personnalisés \{#custom-storekit-codes\}

| Erreur | Code | Description |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>Cette erreur indique qu'aucun des produits du paywall n'est disponible dans le store.</p><p>Si vous rencontrez cette erreur, suivez les étapes ci-dessous pour la résoudre :</p><p></p><p>1. Vérifiez que tous les produits ont été ajoutés à l'Adapty Dashboard.</p><p>2. Assurez-vous que le Bundle ID de votre application correspond à celui d'Apple Connect.</p><p>3. Vérifiez que les identifiants de produits des stores correspondent à ceux que vous avez ajoutés au tableau de bord. Notez que les identifiants ne doivent pas contenir le Bundle ID, sauf s'il est déjà inclus dans le store.</p><p>4. Confirmez que le statut de paiement de l'application est actif dans vos paramètres fiscaux Apple. Assurez-vous que vos informations fiscales sont à jour et que vos certificats sont valides.</p><p>5. Vérifiez qu'un compte bancaire est associé à l'application pour qu'elle soit éligible à la monétisation.</p><p>6. Vérifiez que les produits sont disponibles dans toutes les régions. Assurez-vous également que vos produits sont à l'état **"Ready to Submit"**.</p> |
| productRequestFailed | 1002 | <p>Impossible de récupérer les produits disponibles pour le moment. Raison possible :</p><p></p><p>- Aucun cache n'a encore été créé et il n'y a pas de connexion internet en même temps.</p> |
| cantMakePayments | 1003 | Les achats intégrés ne sont pas autorisés sur cet appareil. |
| noPurchasesToRestore | 1004 | Cette erreur indique que Google Play n'a trouvé aucun achat à restaurer. |
| cantReadReceipt | 1005 | <p>Aucun reçu valide n'est disponible sur l'appareil. Cela peut poser problème lors des tests en sandbox.</p><p>Aucune action n'est requise, mais d'un point de vue métier, vous pouvez proposer une remise à votre utilisateur ou lui rappeler plus tard.</p> |
| productPurchaseFailed | 1006 | L'achat du produit a échoué. Cette erreur encapsule une erreur StoreKit sous-jacente — lisez l'erreur encapsulée (ou activez les logs verbeux pour la voir dans la console) pour en connaître la raison réelle. L'erreur encapsulée est généralement l'un des codes StoreKit 0–14 du tableau ci-dessus — le plus souvent `paymentCancelled`, `paymentInvalid`, `paymentNotAllowed` ou `invalidOfferPrice`. Si vous ne parvenez pas à identifier une raison précise, essayez un nouveau [profil sandbox](test-purchases-in-sandbox) ; si l'échec persiste, contactez le support Apple. |
| refreshReceiptFailed | 1010 | Cette erreur indique que le reçu n'a pas été reçu. Applicable à StoreKit 1 uniquement. |
| receiveRestoredTransactionsFailed | 1011 | La restauration des achats a échoué. |


## Codes réseau personnalisés \{#custom-network-codes\}

| Erreur                | Code | Description                                                  |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | Vous devez configurer correctement le SDK Adapty via la méthode `activate`. Découvrez comment procéder dans [Install & configure Adapty SDK](sdk-installation-capacitor). |
| badRequest           | 2003 | Requête incorrecte.                                                 |
| serverError          | 2004 | Erreur serveur.                                                |
| networkFailed        | 2005 | La requête réseau a échoué.                                  |
| decodingFailed       | 2006 | Cette erreur indique que le décodage de la réponse a échoué.          |
| encodingFailed       | 2009 | Cette erreur indique que l'encodage de la requête a échoué.           |
| analyticsDisabled    | 3000 | Nous ne pouvons pas traiter les événements d'analytics, car vous les avez désactivés. Consultez la rubrique [Analytics integration](analytics-integration) pour plus de détails. |
| wrongParam           | 3001 | Cette erreur indique que certains de vos paramètres sont incorrects : vide alors qu'il ne peut pas l'être, mauvais type, etc. |
| activateOnceError    | 3005 | Il n'est pas possible d'appeler la méthode `.activate` plus d'une fois. |
| profileWasChanged    | 3006 | Le profil utilisateur a été modifié pendant l'opération.           |
| unsupportedData      | 3007 | Cette erreur indique que le format de données n'est pas pris en charge par le SDK. |
| persistingDataError  | 3100 | Une erreur s'est produite lors de l'enregistrement des données.                           |
| fetchTimeoutError    | 3101 | Cette erreur signifie que le paywall n'a pas pu être récupéré dans le délai imparti. Pour éviter cette situation, [configurez des fallbacks locaux](fetch-paywalls-and-products). |
| operationInterrupted | 9000 | Cette opération a été interrompue par le système.                |