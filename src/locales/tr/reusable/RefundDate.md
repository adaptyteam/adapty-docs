İstek, satın alma tarihi (`purchased_at`) iade tarihine (`refunded_at`) eşit veya ondan daha sonra olduğu için başarısız oldu. İade işlemi her zaman satın almadan sonra gerçekleşir çünkü ilgili işlemi geri alır.

Bunu düzeltmek için `purchased_at` ve `refunded_at` parametrelerini kontrol edin ve iade tarihinin satın alma tarihinden daha sonra olduğundan emin olun.

#### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `refunded_at`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `refund_date_error`.                |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "refund_date_error",
  "status_code": 400
}
```