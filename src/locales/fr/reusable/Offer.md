
| Paramètre | Type   | Requis dans la requête | Nullable dans la requête | Description                                                  |
| --------- | ------ | ---------------------- | ------------------------ | ------------------------------------------------------------ |
| category  | String | :heavy_plus_sign:   | :heavy_minus_sign:  | La catégorie de l'offre appliquée. Options : **introductory**, **promotional**, **offer_code**, **win_back**. |
| type      | String | :heavy_plus_sign:   | :heavy_minus_sign:  | Le type d'offre active. Options : **free_trial**, **pay_as_you_go**, **pay_up_front** et **unknown**. Si cette valeur n'est pas nulle, cela signifie que l'offre a été appliquée durant la période d'abonnement en cours. |
| id        | String | :heavy_minus_sign:  | :heavy_plus_sign:   | L'identifiant de l'offre appliquée.                          |
