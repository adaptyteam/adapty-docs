Запрос завершился неудачно по одной из двух причин: либо учётные данные Paddle в [App Settings](https://app.adapty.io/settings/paddle) указаны неверно, либо переданный токен недействителен. Проверьте следующее:

1. **Paddle API Key** в [App Settings](https://app.adapty.io/settings/paddle) указан правильно и принадлежит нужному приложению.
2. `paddle_token`, который вы используете, существует в приложении и введён без опечаток в вашем запросе.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `non_field_errors`.</li><li> **errors**: Описание ошибки. </li></ul> |
| error_code  | String  | Краткое название ошибки. Возможное значение: `invalid_paddle_credentials_or_purchase_not_found`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Invalid Paddle credentials or purchase not found"
      ]
    }
  ],
  "error_code": "invalid_paddle_credentials_or_purchase_not_found",
  "status_code": 400
}
```