
| Paramètre                     | Type          | Requis | Nullable | Description                                                  |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_id                   | String        | Oui      | Non       | Identifiant de l'achat dans Adapty. Vous pouvez l'utiliser pour vérifier que vous avez déjà traité cet achat, par exemple pour le suivi des produits à achat unique. |
| store                         | String        | Oui      | Non       | Store où le produit a été acheté. Valeurs possibles : **app_store**, **play_store**, **stripe**, nom de votre [store personnalisé.](custom-store) |
| store_product_id              | String        | Oui      | Non       | Identifiant du produit dans le store (App Store/Google Play/Stripe, etc.) qui a débloqué ce niveau d'accès. |
| store_base_plan_id            | String        | Oui      | Oui      | [ID de plan de base](https://support.google.com/googleplay/android-developer/answer/12154973) dans le Google Play Store ou [ID de prix](https://docs.stripe.com/products-prices/how-products-and-prices-work#use-products-and-prices) dans Stripe. |
| store_transaction_id          | String        | Oui      | Non       | L'ID de la transaction dans le store (App Store/Google Play/Stripe, etc.). |
| store_original_transaction_id | String        | Oui      | Non       | <p>Dans le cas d'abonnements prolongés, une chaîne d'abonnements est générée. La transaction d'origine est la toute première transaction de cette chaîne, qui sert de lien entre toutes les transactions. Les autres transactions de la chaîne sont des prolongations.</p><br /><p>Sans prolongation, `store_original_transaction_id` coïncide avec `store_transaction_id`.</p> |
| purchased_at                  | ISO 8601 date | Oui      | Non       | La date et l'heure du dernier achat du niveau d'accès. |
| environment                   | String        | Non       | Non       | Environnement de la transaction ayant fourni le niveau d'accès. Valeurs possibles : `Sandbox`, `Production.` |
| is_refund                     | Boolean       | Oui      | Non       | Indique si le produit a été remboursé.                  |
| is_consumable                 | Boolean       | Oui      | Non       | Indique si le produit est consommable.                 |