Запрос завершился ошибкой, потому что указанный в запросе уровень доступа не найден. Проверьте, нет ли опечаток в `access_level_id`, и убедитесь, что он соответствует нужному приложению.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `non_field_errors`</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Краткое название ошибки. Возможное значение: `paid_access_level_does_not_exist`. |
| status_code | Integer | HTTP-статус. Всегда `404`.                                   |

#### Пример ответа

Уровень доступа не найден.

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paid access level `premium` does not exist"
      ]
    }
  ],
  "error_code": "paid_access_level_does_not_exist",
  "status_code": 400
}
```