Запрос завершился ошибкой, так как значение поля `status` недопустимо. Проверьте наличие опечаток. Допустимые значения: `organic`, `non_organic` и `unknown`.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `status`.</li><li> **errors**: Описание ошибки. В данном случае: `value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'`</li></ul> |
| error_code  | String  | Краткое название ошибки. Здесь: `enum`.                      |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
    "errors": [
        {
            "source": "status",
            "errors": [
                "value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'"
            ]
        }
    ],
    "error_code": "enum",
    "status_code": 400
}
```