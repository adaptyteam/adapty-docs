Запрос завершился с ошибкой, поскольку дата покупки (`purchased_at`) оказалась раньше или равна дате возврата (`refunded_at`). Возврат всегда происходит после покупки, так как является её отменой.

Чтобы исправить ошибку, проверьте параметры `purchased_at` и `refunded_at` и убедитесь, что дата возврата позже даты покупки.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `refunded_at`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `refund_date_error`.         |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "refund_date_error",
  "status_code": 400
}
```