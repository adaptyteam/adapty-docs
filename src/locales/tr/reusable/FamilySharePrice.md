İstek başarısız oldu çünkü `is_family_shared` parametresi `true` olarak ayarlanmış, yani access level bir aile üyesiyle ücretsiz paylaşılıyor. Ancak [Price](server-side-api-objects#price) nesnesinin `value` parametresi sıfır olarak ayarlanmamış.

`is_family_shared` değeri `true` olacaksa, [Price](server-side-api-objects#price) nesnesinin `value` parametresini `0` olarak ayarladığınızdan emin olun.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `is_family_shared`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman: `family_share_price_error`.        |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği

Profil bulunamadı

```json showLineNumbers
{
  "errors": [
    {
      "source": "is_family_shared",
      "errors": [
        "If is_family_shared is true, price.value must be 0."
      ]
    }
  ],
  "error_code": "family_share_price_error",
  "status_code": 400
}
```