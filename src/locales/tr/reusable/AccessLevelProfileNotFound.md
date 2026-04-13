<p> </p>

İstek başlığındaki profil bulunamadığı için istek başarısız oldu. İstek başlığına girdiğiniz `profile_id` veya `customer_user_id` değerinde yazım hatası olmadığından emin olun ve doğru uygulama için olduğunu kontrol edin.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `non_field_errors`</li><li> **errors**: Hatanın açıklaması. </li></ul> |
| error_code  | String  | Kısa hata adı. Olası değer: `profile_does_not_exist`.        |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği

Profil bulunamadı

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile not found"
      ]
    }
  ],
  "error_code": "profile_does_not_exist",
  "status_code": 400
}
```