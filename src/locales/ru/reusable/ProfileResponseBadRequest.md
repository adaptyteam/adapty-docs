Запрос завершился с ошибкой из-за некорректного значения в одном из полей.

###### Тело

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Поле, вызвавшее ошибку(и)</li><li> **errors**: (list) список ошибок.</li></ul> |
| error_code  | String  | Краткое название ошибки.                                     |
| status_code | Integer | HTTP-статус, всегда `400`.                                   |

###### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "string",
  "status_code": 0
}
```