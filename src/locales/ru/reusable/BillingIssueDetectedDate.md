Проблема с оплатой возникает при неудачной попытке продления подписки, поэтому она всегда происходит после даты транзакции (`purchased_at`).

Убедитесь, что дата проблемы с оплатой (`billing_issue_detected_at`) позже даты транзакции (`purchased_at`).

#### Тело ответа \{#body\}

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `billing_issue_detected_at`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `billing_issue_detected_at_date_comparison_error`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "billing_issue_detected_at",
      "errors": [
        "billing_issue_detected_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "billing_issue_detected_at_date_comparison_error",
  "status_code": 400
}
```