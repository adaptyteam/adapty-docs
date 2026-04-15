Bu yanıt, isteğinizin geçerli bir JSON olmadığı veya bazı alanların eksik olduğu anlamına gelir. JSON'u düzeltin ve eksik parametreyi ekleyin.

#### Gövde

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Geçersiz JSON için `null` olur.</li><li> **errors**: Hatanın açıklaması. </li></ul> |
| error_code  | String  | Kısa hata adı. Burada: `parse_error`.                        |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "JSON parse error - Expecting ',' delimiter: line 4 column 3 (char 67)"
            ]
        }
    ],
    "error_code": "parse_error",
    "status_code": 400
}
```