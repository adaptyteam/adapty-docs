
| Paramètre                     | Type          | Requis | Nullable | Description                                                  |
| :---------------------------- | :------------ | ------ | -------- | :----------------------------------------------------------- |
| purchase_type                 | String        | Oui    | Non      | Le type de produit acheté. Valeur possible : `subscription`. |
| store                         | String        | Oui    | Non      | Store où le produit a été acheté. Options : `app_store`, `play_store`, `stripe`, ou l'ID du store de votre [store personnalisé](custom-store). |
| environment                   | String        | Non    | Non      | Environnement dans lequel la transaction a eu lieu. Options : `Sandbox` ou `Production`. `Production` est utilisé par défaut. |
| store_product_id              | String        | Oui    | Non      | ID du produit dans le store (App Store, Google Play, Stripe, etc.) qui a déverrouillé ce niveau d'accès. |
| store_transaction_id          | String        | Oui    | Non      | ID de transaction dans le store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | Oui    | Non      | <p>Pour les abonnements, cet ID est lié à la première transaction d'une chaîne de renouvellements. Chaque renouvellement est associé à cette transaction d'origine.</p><p>S'il n'y a pas de renouvellement, `store_original_transaction_id` correspond à `store_transaction_id`.</p> |
| offer                         | Object        | Non    | Oui      | L'offre utilisée lors de l'achat, fournie sous forme d'objet [Offer](server-side-api-objects#offer). |
| is_family_shared              | Boolean       | Non    | Non      | Valeur booléenne indiquant si le produit prend en charge le partage familial dans App Store Connect. iOS uniquement. Toujours `false` pour iOS en dessous de 14.0 et macOS en dessous de 11.0. `false` est utilisé par défaut. |
| price                         | Object        | Oui    | Non      | Prix de l'abonnement ou de l'achat sous forme d'objet [Price](server-side-api-objects#price). Un premier achat d'abonnement à coût zéro est un essai gratuit ; un renouvellement à coût zéro est un renouvellement gratuit. |
| purchased_at                  | ISO 8601 date | Oui    | Non      | La date et l'heure du dernier achat du niveau d'accès.       |
| refunded_at                   | ISO 8601 date | Non    | Non      | La date et l'heure du remboursement de l'abonnement, le cas échéant. |
| cancellation_reason           | String        | Non    | Non      | Raisons possibles d'annulation : `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, ou `unknown`. |
| variation_id                  | String        | Non    | Non      | L'ID de variante utilisé pour relier les achats au paywall spécifique depuis lequel ils ont été effectués. |
| originally_purchased_at       | ISO 8601 date | Oui    | Non      | Pour les chaînes d'abonnements, il s'agit de la date d'achat de la transaction d'origine, liée par `store_original_transaction_id`. |
| expires_at                    | ISO 8601 date | Oui    | Non      | La date et l'heure d'expiration du niveau d'accès. Elle peut être dans le passé et `null` pour un accès à vie. |
| renew_status                  | Boolean       | Oui    | Non      | Indique si le renouvellement automatique est activé pour l'abonnement. |
| renew_status_changed_at       | ISO 8601 date | Non    | Non      | La date et l'heure à laquelle le renouvellement automatique a été activé ou désactivé. |
| billing_issue_detected_at     | ISO 8601 date | Non    | Non      | La date et l'heure à laquelle un problème de facturation a été détecté (par ex. un échec de débit de carte). L'abonnement peut être encore actif. Cette valeur est effacée si le paiement aboutit. |
| grace_period_expires_at       | ISO 8601 date | Non    | Non      | La date et l'heure à laquelle le [délai de grâce](https://developer.apple.com/news/?id=09122019c) prend fin si l'abonnement est actuellement dans cette période. |
