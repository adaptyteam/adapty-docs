İstek, `status` alanının değeri geçersiz olduğu için başarısız oldu. Lütfen yazım hatası olup olmadığını kontrol edin. Geçerli değerler: `organic`, `non_organic` ve `unknown`.

#### Gövde

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `status`.</li><li> **errors**: Hatanın açıklaması. Bu durumda: `value is not a valid enumeration member; permitted: 'organic', 'non_organic', 'unknown'`</li></ul> |
| error_code  | String  | Kısa hata adı. Burada: `enum`.                               |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği

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