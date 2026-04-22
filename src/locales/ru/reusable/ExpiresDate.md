Пользователь не может купить подписку, которая уже истекла. Поэтому дата `expires_at` (когда истекает подписка) всегда должна быть позже даты `purchased_at` (когда произошла транзакция).

Чтобы исправить ошибку, проверьте эти даты и убедитесь, что `expires_at` позже `purchased_at`.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `expires_at`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `expires_date_error`.        |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "expires_at",
      "errors": [
        "expires_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "expires_date_error",
  "status_code": 400
}
```