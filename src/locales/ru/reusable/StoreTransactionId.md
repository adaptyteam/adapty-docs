В случае продлевающихся подписок формируется цепочка транзакций. Исходная транзакция — это самая первая транзакция в этой цепочке, и все остальные транзакции связаны через неё. Остальные транзакции в цепочке являются продлениями. Если транзакция является самой первой покупкой в цепочке подписок, она может быть своей собственной исходной транзакцией.

Другой случай — разовая покупка. Она никогда не создаёт цепочек, так как не может иметь продлений. Для неё `store_transaction_id` всегда совпадает с `store_original_transaction_id`.

Ваш запрос завершился с ошибкой, потому что значение `store_transaction_id` объекта [Разовая покупка](server-side-api-objects#one-time-purchase) отличается от его `store_original_transaction_id`. Чтобы исправить это, либо сделайте их одинаковыми, либо измените объект — используйте [Подписку](server-side-api-objects#subscription) вместо [Разовой покупки](server-side-api-objects#one-time-purchase).

#### Тело \{#body\}

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `store_transaction_id`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `store_transaction_id_error`. |
| status_code | Integer | HTTP-статус. Всегда `400.`                                   |

#### Пример ответа \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "store_transaction_id",
      "errors": [
        "store_transaction_id must be equal to store_original_transaction_id for purchase."
      ]
    }
  ],
  "error_code": "store_transaction_id_error",
  "status_code": 400
}
```