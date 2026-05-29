Запрос завершился ошибкой, потому что `revoke_at`, указанный в запросе, позже текущего параметра `expires_at` уровня доступа. Если вы хотите продлить уровень доступа, воспользуйтесь запросом [Grant access level](https://adapty.io/docs/ru/api-adapty/operations/grantAccessLevel).

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `non_field_errors`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `revocation_date_more_than_expiration_date`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
  {
  "errors": [
    {
      "source": "revoke_at",
      "errors": [
        "Revocation date (2029-08-29 09:33:42+00:00) is more than current expiration date (2028-08-29 09:33:42+00:00)"
      ]
    }
  ],
  "error_code": "revocation_date_more_than_expiration_date",
  "status_code": 400
}
```