<p> </p>

İstek, eksik veya hatalı yetkilendirme nedeniyle başarısız oldu. **Authorization header**'a özellikle dikkat ederek [Yetkilendirme](ss-authorization) sayfasını inceleyin.

İstek aynı zamanda belirtilen profil bulunamadığı için de başarısız oldu.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `non_field_errors`.</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `not_authenticated`.                |
| status_code | Integer | HTTP durum kodu. Her zaman `401.`                            |

#### Yanıt örneği

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