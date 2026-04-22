Запрос завершился ошибкой, так как продукты, привязанные к указанному токену, не найдены. Убедитесь, что все необходимые продукты добавлены в нужное приложение в Adapty и что поля **Paddle Product ID** и **Paddle Price ID** заполнены корректно.

#### Body

| Параметр    | Тип     | Описание                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Всегда `non_field_errors`.</li><li> **errors**: Описание ошибки. </li></ul> |
| error_code  | String  | Краткое название ошибки. Возможное значение: `no_products_found`. |
| status_code | Integer | HTTP-статус. Всегда `400`.                                   |

#### Пример ответа

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "No products found for purchase"
      ]
    }
  ],
  "error_code": "no_products_found",
  "status_code": 400
}
```