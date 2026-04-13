Yenileme, bir aboneliğin uzatılmasıdır. Kullanıcı abonelik uzatmayı iptal edebilir ve ardından tekrar uzatabilir. Bu iki işlemin zamanı `renew_status_changed_at` parametresinde saklanır. Ve bu, işlemin kendisinden daha erken bir zamanda gerçekleşemez.

Sorunu düzeltmek için `renew_status_changed_at` değerinin işlem zamanından (`purchased_at`) daha sonra olduğundan emin olun.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `originally_purchased_at`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `originally_purchased_date_error`.  |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği

```json showLineNumbers
{
  "errors": [
    {
      "source": "renew_status_changed_at",
      "errors": [
        "renew_status_changed_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "renew_status_changed_date_error",
  "status_code": 400
}
```