Это означает, что ваш запрос не является валидным JSON или в нём отсутствует обязательное поле. Исправьте JSON, чтобы он стал валидным, и добавьте недостающий параметр.

#### Тело ответа

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Для невалидного JSON будет `null`.</li><li> **errors**: Описание ошибки. </li></ul> |
| error_code  | String  | Краткое название ошибки. Здесь: `parse_error`.               |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting ',' delimiter: line 4 column 3 (char 67)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```