Запрос завершился ошибкой, потому что параметр `offer_category` имеет значение, отличное от `introductory` или `offer_type`, но при этом не содержит `offer_id`. В таком случае нужно либо указать `offer_id`, либо убрать `offer_category` или `offer_type` из запроса.

Другая возможная причина: параметр `offer_id` добавлен, но задан как `null`, хотя он не может быть `null`. В этом случае нужно либо указать значение для `offer_id`, либо полностью убрать этот параметр.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `offer.category`</li><li> **errors**: Описание ошибки. </li></ul> |
| error_code  | String  | Короткое название ошибки. Возможное значение: `missing_offer_id`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

Профиль не найден

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_category",
      "errors": [
        "offer_id must be specified for all offer types except 'introductory'."
      ]
    }
  ],
  "error_code": "missing_offer_id",
  "status_code": 400
}
```