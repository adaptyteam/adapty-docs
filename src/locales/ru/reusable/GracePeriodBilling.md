Начало льготного периода считается проблемой с выставлением счёта. Поэтому если льготный период начался (на это указывает заполненный параметр `grace_period_expires_at`), его дата начала должна быть записана в параметр `billing_issue_detected_at`.

Чтобы исправить ошибку, либо укажите дату начала льготного периода в `billing_issue_detected_at`, либо, если льготный период ещё не начался, удалите параметр `grace_period_expires_at`.

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `grace_period_billing_error`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `grace_period_billing_error`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_billing_error",
      "errors": [
        "If grace_period_expires_at is specified, billing_issue_detected_at must also be specified."
      ]
    }
  ],
  "error_code": "grace_period_billing_error",
  "status_code": 400
}
```