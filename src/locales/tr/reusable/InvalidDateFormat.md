İsteğin başarısız olmasının nedeni `visited_at` alanının format hatası. **ISO 8601 tarih** formatını kullanın, örneğin: `2025-01-14T14:15:22Z`.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `visited_at`.</li><li> **errors**: Hatanın açıklaması. </li></ul> |
| error_code  | String  | Kısa hata adı. Burada: `base_error`.                         |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği

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