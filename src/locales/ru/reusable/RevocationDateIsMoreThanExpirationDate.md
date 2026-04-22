Запрос завершился ошибкой, потому что указанный в запросе параметр `revoke_at` позже текущего значения `expires_at` для данного уровня доступа. Если вы хотите продлить уровень доступа, используйте запрос [Предоставление уровня доступа](ss-grant-access-level).

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `non_field_errors`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Короткое название ошибки. Всегда `revocation_date_more_than_expiration_date`. |
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