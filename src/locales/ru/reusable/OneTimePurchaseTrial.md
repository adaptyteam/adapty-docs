Запрос завершился ошибкой, так как к разовой покупке был привязан пробный период. В отличие от подписок, разовые покупки не поддерживают пробный период. Чтобы исправить это, проверьте значение `offer_type` в объекте [Offer](server-side-api-objects#offer) внутри объекта [One-Time Purchase](server-side-api-objects#one-time-purchase). Значение `offer_type` не может быть `free_trial`. Измените значение поля `offer_type` или используйте объект [Subscription](server-side-api-objects#subscription) вместо One-Time Purchase.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда offer.type</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `one_time_purchase_trial_error`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer.type",
      "errors": [
        "One-time purchase cannot have a trial."
      ]
    }
  ],
  "error_code": "one_time_purchase_trial_error",
  "status_code": 400
}
```