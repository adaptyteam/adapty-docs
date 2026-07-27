
| Paramètre                     | Type          | Requis | Nullable | Description                                                  |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| access_level_id               | String        | Oui      | Non       | ID du niveau d'accès payant configuré dans l'Adapty Dashboard. |
| store                         | String        | Oui      | Non       | Store où le produit a été acheté. Options : **app_store**, **play_store**, **stripe**, ou le nom de votre [store personnalisé](custom-store). |
| store_product_id              | String        | Oui      | Non       | ID du produit dans le store (App Store, Google Play, Stripe) qui a débloqué ce niveau d'accès. |
| store_base_plan_id            | String        | Oui      | Oui      | [ID du plan de base](https://support.google.com/googleplay/android-developer/answer/12154973) dans Google Play ou [ID de prix](https://docs.stripe.com/products-prices/how-products-and-prices-work#use-products-and-prices) dans Stripe. |
| store_transaction_id          | String        | Oui      | Non       | ID de transaction dans le store (App Store, Google Play, Stripe, etc.). |
| store_original_transaction_id | String        | Oui      | Non       | <p>Pour les abonnements, cet ID relie la transaction d'origine dans la chaîne de renouvellements. Les transactions ultérieures sont liées en tant que renouvellements.</p><p>S'il n'y a pas de renouvellement, store_original_transaction_id correspond à store_transaction_id.</p> |
| offer                         | Object | Oui      | Non       | L'objet [Offer](server-side-api-objects#offer). Peut être `null` si le client n'a aucun niveau d'accès. |
| environment                   | String        | Non       | Non       | Environnement pour la transaction ayant accordé l'accès. Options : `Sandbox`, `Production`. |
| starts_at                     | ISO 8601 date | Oui      | Oui      | Date et heure d'activation du niveau d'accès. Peut être dans le futur. |
| purchased_at                  | ISO 8601 date | Oui      | Non       | Date et heure du dernier achat pour ce niveau d'accès. |
| originally_purchased_at       | ISO 8601 date | Oui      | Non       | Pour les abonnements, date et heure du tout premier achat (d'origine) dans la chaîne, lié à `store_original_transaction_id`. |
| expires_at                    | ISO 8601 date | Oui      | Oui      | Date et heure d'expiration du niveau d'accès. Peut être dans le passé, ou `null` pour un accès à vie. |
| renewal_cancelled_at          | ISO 8601 date | Oui      | Oui      | Date et heure à laquelle le renouvellement automatique a été désactivé pour un abonnement. L'abonnement peut toujours être actif ; il ne se renouvellera simplement plus automatiquement. Mis à `null` si l'utilisateur réactive l'abonnement. |
| billing_issue_detected_at     | ISO 8601 date | Oui      | Oui      | Date et heure à laquelle un problème de facturation a été détecté (par exemple, un échec de débit de carte). L'abonnement peut toujours être actif. Ce champ est effacé si le paiement aboutit ultérieurement. |
| is_in_grace_period            | Boolean       | Oui      | Non       | Indique si l'abonnement est dans un [délai de grâce](https://developer.apple.com/news/?id=09122019c) (uniquement pour les abonnements à renouvellement automatique). |
| cancellation_reason           | String        | Oui      | Oui      | Raison de l'annulation, parmi les options suivantes : `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, `unknown`. |
