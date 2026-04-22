Запрос завершился ошибкой, поскольку в нём указан `cancellation_reason` без даты `refunded_at`, либо `refunded_at` без `cancellation_reason`.

При установке возврата средств необходимо указать и дату, и причину возврата.

#### Тело ответа

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `refunded_at`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `refund_fields_error`.       |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at and cancellation_reason=refund must be specified together."
      ]
    }
  ],
  "error_code": "refund_fields_error",
  "status_code": 400
}
```