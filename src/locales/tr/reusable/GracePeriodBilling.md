Ek sürenin başlangıcı bir ödeme sorunu olarak kabul edilir. Dolayısıyla ek süre başladıysa (`grace_period_expires_at` parametresi doluysa), başlangıç tarihi `billing_issue_detected_at` parametresine kaydedilmelidir.

Bunu düzeltmek için ya ek sürenin başlangıcını `billing_issue_detected_at` alanına girin ya da ek süre henüz başlamadıysa `grace_period_expires_at` parametresini kaldırın.

#### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `grace_period_billing_error`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `grace_period_billing_error`.       |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_billing_error",
      "errors": [
        "If grace_period_expires_at is specified, billing_issue_detected_at must also be specified."
      ]
    }
  ],
  "error_code": "grace_period_billing_error",
  "status_code": 400
}
```