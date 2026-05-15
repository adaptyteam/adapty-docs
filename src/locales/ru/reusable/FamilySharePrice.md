Запрос завершился ошибкой, потому что параметр `is_family_shared` установлен в `true`, то есть уровень доступа предоставляется члену семьи бесплатно. При этом параметр `value` объекта [Price](server-side-api-objects#price) не равен нулю.

Если `is_family_shared` должен быть `true`, убедитесь, что параметр `value` объекта [Price](server-side-api-objects#price) установлен в `0`.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `is_family_shared`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Короткое название ошибки. Всегда: `family_share_price_error`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

Профиль не найден

```json showLineNumbers
{
  "errors": [
    {
      "source": "is_family_shared",
      "errors": [
        "If is_family_shared is true, price.value must be 0."
      ]
    }
  ],
  "error_code": "family_share_price_error",
  "status_code": 400
}
```