İstek, istekte belirtilen access level bulunamadığı için başarısız oldu. `access_level_id` değerinde yazım hatası olmadığını ve doğru uygulamayla eşleştiğini kontrol edin.

#### Gövde

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `non_field_errors`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Olası değer: `paid_access_level_does_not_exist`. |
| status_code | Integer | HTTP durumu. Her zaman `404`.                                |

#### Yanıt örneği

Access level bulunamadı.

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