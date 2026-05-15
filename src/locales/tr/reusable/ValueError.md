İstek başarısız oldu çünkü belirtilen iptal tarihi geçmişte kalıyor. `revoke_at` değerini gelecekteki bir tarih olarak ayarlayın ya da erişimi hemen iptal etmek için `null` olarak belirtin.

##### Body

| Parametre   | Tip     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `revoke_at`.</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `value_error`.                      |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

##### Yanıt örneği

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Must be greater than the current time or null"
            ]
        }
    ],
    "error_code": "value_error",
    "status_code": 400
}
```