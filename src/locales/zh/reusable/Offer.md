| 参数 | 类型 | 请求中是否必填 | 请求中是否可为空 | 描述 |
| --------- | ------ | ------------------- | ------------------- | ------------------------------------------------------------ |
| category  | String | :heavy_plus_sign:   | :heavy_minus_sign:  | 已应用优惠的类别。可选项为：**introductory**、**promotional**、**offer_code**、**win_back**。 |
| type      | String | :heavy_plus_sign:   | :heavy_minus_sign:  | 当前有效优惠的类型。可选项为：**free_trial**、**pay_as_you_go**、**pay_up_front** 和 **unknown**。若该值不为空，表示该优惠已在当前订阅周期内生效。 |
| id        | String | :heavy_minus_sign:  | :heavy_plus_sign:   | 已应用优惠的 ID。 |