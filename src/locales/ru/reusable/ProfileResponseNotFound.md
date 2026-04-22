<p> </p>
Запрос завершился с ошибкой, так как указанный профиль не найден. Проверьте `customer_user_id` или `profile_id` на наличие опечаток.

##### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `null`.</li><li> **errors**: Описание ошибки.</li></ul> |
| error_code  | String  | Короткое название ошибки. Всегда `profile_does_not_exist`.   |
| status_code | Integer | HTTP-статус. Всегда `404`.                                   |

##### Пример ответа

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Profile not found"
            ]
        }
    ],
    "error_code": "profile_does_not_exist",
    "status_code": 404
}
```