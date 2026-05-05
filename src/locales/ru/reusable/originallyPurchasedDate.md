Для продлённых подписок формируется цепочка транзакций. Первая транзакция в этой цепочке называется исходной и связывает все последующие. Каждое продление является расширением этой исходной транзакции. Если транзакция является первой покупкой, она сама выступает своей исходной транзакцией.

Временная метка `originally_purchased_at` фиксирует момент исходной покупки, а `purchased_at` — момент текущей транзакции. Поэтому `purchased_at` никогда не может быть раньше `originally_purchased_at`; в крайнем случае они совпадают — для самой первой транзакции.

Запрос завершился с ошибкой, потому что `originally_purchased_at` указан позже, чем `purchased_at`. Убедитесь, что это значение меньше или равно `purchased_at`.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `originally_purchased_at`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Всегда `originally_purchased_date_error`.  |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "originally_purchased_at",
      "errors": [
        "originally_purchased_at must be earlier than or equal to purchased_at."
      ]
    }
  ],
  "error_code": "originally_purchased_date_error",
  "status_code": 400
}
```