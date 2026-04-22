Продление — это пролонгация подписки. Пользователь может отменить автопродление, а затем снова включить его. Время обоих этих действий сохраняется в параметре `renew_status_changed_at` и не может быть раньше самой транзакции.

Чтобы исправить ошибку, убедитесь, что `renew_status_changed_at` позже времени транзакции (`purchased_at`).

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `originally_purchased_at`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Короткое название ошибки. Всегда `originally_purchased_date_error`.  |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "renew_status_changed_at",
      "errors": [
        "renew_status_changed_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "renew_status_changed_date_error",
  "status_code": 400
}
```