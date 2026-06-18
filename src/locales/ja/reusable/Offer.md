| パラメータ | タイプ | リクエストで必須 | リクエストでNullable | 説明 |
| --------- | ------ | ------------------- | ------------------- | ------------------------------------------------------------ |
| category  | String | :heavy_plus_sign:   | :heavy_minus_sign:  | 適用されたオファーのカテゴリ。オプション: **introductory**、**promotional**、**offer_code**、**win_back**。 |
| type      | String | :heavy_plus_sign:   | :heavy_minus_sign:  | アクティブなオファーのタイプ。オプション: **free_trial**、**pay_as_you_go**、**pay_up_front**、**unknown**。nullでない場合、現在のサブスクリプション期間にオファーが適用されていることを意味します。 |
| id        | String | :heavy_minus_sign:  | :heavy_plus_sign:   | 適用されたオファーのID。                                 |