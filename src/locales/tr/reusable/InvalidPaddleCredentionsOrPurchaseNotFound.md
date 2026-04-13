İstek iki nedenden biriyle başarısız oldu: [App Settings](https://app.adapty.io/settings/paddle) bölümündeki Paddle kimlik bilgileri hatalı ya da sağlanan token geçersiz. Lütfen aşağıdakileri kontrol edin:

1. [App Settings](https://app.adapty.io/settings/paddle) bölümündeki **Paddle API Key** doğru olmalı ve doğru uygulamaya ait olmalıdır.
2. Kullandığınız `paddle_token` uygulamada mevcut olmalı ve isteğinizde yazım hatası bulunmamalıdır.

#### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `non_field_errors`.</li><li> **errors**: Hatanın açıklaması. </li></ul> |
| error_code  | String  | Kısa hata adı. Olası değer: `invalid_paddle_credentials_or_purchase_not_found`. |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Invalid Paddle credentials or purchase not found"
      ]
    }
  ],
  "error_code": "invalid_paddle_credentials_or_purchase_not_found",
  "status_code": 400
}
```