Запрос завершился ошибкой, поскольку параметр `offer_type` имеет значение `free_trial`, но параметр `value` объекта [Price](server-side-api-objects#price) не равен нулю.

Ещё одна возможная причина: параметр `offer_id` был указан, но оставлен `null`, хотя он не может быть null. В этом случае либо укажите значение для `offer_id`, либо удалите параметр полностью.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `offer.type`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда: `free_trial_price_error`.   |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

Профиль не найден

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_type",
      "errors": [
        "If offer_type is 'free_trial', price.value must be 0."
      ]
    }
  ],
  "error_code": "free_trial_price_error",
  "status_code": 400
}
```