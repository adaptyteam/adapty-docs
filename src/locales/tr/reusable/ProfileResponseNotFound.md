<p> </p>
İstek başarısız oldu çünkü belirtilen profil bulunamadı. `customer_user_id` veya `profile_id` değerini yazım hatası açısından kontrol edin.

##### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `null`.</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `profile_does_not_exist`.           |
| status_code | Integer | HTTP durum kodu. Her zaman `404`.                            |

##### Yanıt örneği

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