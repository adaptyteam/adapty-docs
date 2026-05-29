İstekte tanımladığınız `revoke_at` değeri, mevcut access level'ın `expires_at` parametresinden daha ileri bir tarihe ayarlanmış. Access level'ı uzatmak istiyorsanız [Grant access level](https://adapty.io/docs/tr/api-adapty/operations/grantAccessLevel) isteğini kullanın.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `non_field_errors`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `revocation_date_more_than_expiration_date`. |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği

```json showLineNumbers
  {
  "errors": [
    {
      "source": "revoke_at",
      "errors": [
        "Revocation date (2029-08-29 09:33:42+00:00) is more than current expiration date (2028-08-29 09:33:42+00:00)"
      ]
    }
  ],
  "error_code": "revocation_date_more_than_expiration_date",
  "status_code": 400
}
```