Запрос не выполнен, так как поле `visited_at` имеет неверный формат. Используйте формат **даты ISO 8601**, например `2025-01-14T14:15:22Z`.

#### Тело ответа

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `visited_at`.</li><li> **errors**: Описание ошибки. </li></ul> |
| error_code  | String  | Краткое название ошибки. Здесь: `base_error`.                |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
    "errors": [
        {
            "source": "visited_at",
            "errors": [
                "invalid datetime format"
            ]
        }
    ],
    "error_code": "datetime",
    "status_code": 400
}
```