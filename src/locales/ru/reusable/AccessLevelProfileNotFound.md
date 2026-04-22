<p> </p>

Запрос завершился ошибкой, потому что профиль из заголовка запроса не найден. Проверьте, нет ли опечаток в `profile_id` или `customer_user_id`, указанных в заголовке запроса, и убедитесь, что они относятся к правильному приложению.

#### Тело

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `non_field_errors`</li><li> **errors**: Описание ошибки. </li></ul> |
| error_code  | String  | Краткое название ошибки. Возможное значение: `profile_does_not_exist`.  |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

Профиль не найден

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile not found"
      ]
    }
  ],
  "error_code": "profile_does_not_exist",
  "status_code": 400
}
```