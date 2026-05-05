Запрос завершился ошибкой, так как **Paddle API Key** в [App Settings](https://app.adapty.io/settings/paddle) указан неверно. Проверьте правильность ключа и убедитесь, что он связан с нужным приложением.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `non_field_errors`.</li><li> **errors**: Описание ошибки. </li></ul> |
| error_code  | String  | Краткое название ошибки. Возможное значение: `paddle_api_key_not_found`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paddle API key not found"
      ]
    }
  ],
  "error_code": "paddle_api_key_not_found",
  "status_code": 400
}
```