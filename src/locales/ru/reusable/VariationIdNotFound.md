Запрос завершился ошибкой, так как `variation_ID` для запрошенного пейвола не найден. Убедитесь, что `placement_id`, который вы запрашиваете, существует в приложении, и что в нём нет опечаток.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `bull`.</li><li> **errors**: Описание ошибки. </li></ul> |
| error_code  | String  | Краткое название ошибки. Возможное значение: `VARIATION_DOES_NOT_EXIST_ERROR`. |
| status_code | Integer | HTTP-статус. Всегда `404`.                                   |

#### Пример ответа

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Variation for example_onboarding does not exist."
            ]
        }
    ],
    "error_code": "VARIATION_DOES_NOT_EXIST_ERROR",
    "status_code": 404
}
```