Ek süre, müşterilere aboneliklerini zamanında yenilememeleri durumunda—örneğin kredi kartlarının işleme alınamaması gibi—aboneliklerini uzatmaları için tanınan ekstra süredir. Bu sayede müşteriler sorunu çözerken ayarları korunmuş olur. Ek süre sunmak isteğe bağlıdır.

Ek süre sunuyorsanız, ek süre bitiş tarihi (`grace_period_expires_at`) abonelik bitiş tarihinden (`expires_at`) sonra olmalıdır. Aksi takdirde ek süre bitiş zamanı, abonelik bitiş zamanıyla aynı olur. Her durumda, ek süre bitişi abonelik bitişinden önce olamaz.

Bunu düzeltmek için ek süre bitiş tarihinin (`grace_period_expires_at`), abonelik bitiş tarihinden (`expires_at`) sonra olduğundan emin olun.

#### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `grace_period_expires_at`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `grace_period_expires_date_error`.  |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "grace_period_expires_at",
      "errors": [
        "grace_period_expires_at must be later or equal to expires_at."
      ]
    }
  ],
  "error_code": "grace_period_expires_date_error",
  "status_code": 400
}
```