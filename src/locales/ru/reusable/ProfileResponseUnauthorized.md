<p> </p>

Запрос не выполнен из-за отсутствующей или неверной авторизации. Проверьте страницу [Авторизация](ss-authorization), уделив особое внимание **Authorization header**.

Запрос также не выполнен, так как указанный профиль не найден.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `non_field_errors`.</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Короткое название ошибки. Всегда `not_authenticated`.        |
| status_code | Integer | HTTP-статус. Всегда `401.`                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Authentication credentials were not provided."
      ]
    }
  ],
  "error_code": "not_authenticated",
  "status_code": 401
}
```