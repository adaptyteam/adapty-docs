
| Parameter                     | Type          | Required | Nullable | Description                                                  |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type                 | String        | Oui      | Non      | Le type de produit acheté. Valeur possible : `one_time_purchase`. |
| store                         | String        | Oui      | Non      | Store où le produit a été acheté. Valeurs possibles : `app_store`, `play_store`, `stripe`, ou l'ID de votre [store personnalisé](custom-store). |
| environment                   | String        | Non      | Non      | Environnement de transaction qui a fourni le niveau d'accès. Options : `Sandbox`, `Production`. `Production` est utilisé par défaut. |
| store_product_id              | String        | Oui      | Non      | L'ID du produit dans le store (App Store, Google Play, Stripe, etc.) qui a déverrouillé ce niveau d'accès. |
| store_transaction_id          | String        | Oui      | Non      | ID de transaction dans le store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | Oui      | Non      | <p>Pour les abonnements récurrents, il s'agit de l'ID de transaction d'origine qui relie la chaîne de renouvellements. La transaction d'origine est la première de la chaîne ; les transactions suivantes sont des renouvellements.</p><p>S'il n'y a pas de renouvellement, `store_original_transaction_id` correspond à `store_transaction_id`.</p> |
| offer                         | Object        | Non      | Oui      | L'offre utilisée pour l'achat, sous forme d'objet [Offer](server-side-api-objects#offer). |
| is_family_shared              | Boolean       | Non      | Non      | Valeur booléenne indiquant si le produit prend en charge le partage familial dans App Store Connect. iOS uniquement. Toujours `false` pour iOS en dessous de 14.0 et macOS en dessous de 11.0. `false` est utilisé par défaut. |
| price                         | Object        | Oui      | Non      | Prix de l'achat unique sous forme d'objet [Price](server-side-api-objects#price). Un premier achat d'abonnement à coût zéro est un essai gratuit ; un renouvellement à coût zéro est un renouvellement gratuit. |
| purchased_at                  | ISO 8601 date | Oui      | Non      | La date et l'heure du dernier achat du niveau d'accès.       |
| refunded_at                   | ISO 8601 date | Non      | Non      | En cas de remboursement, indique la date et l'heure du remboursement. |
| cancellation_reason           | String        | Non      | Non      | Raisons possibles d'annulation : `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `cancelled_by_developer`, `new_subscription`, `unknown`. |
| variation_id                  | String        | Non      | Non      | L'ID de variante utilisé pour relier les achats au paywall spécifique depuis lequel ils ont été effectués. |
