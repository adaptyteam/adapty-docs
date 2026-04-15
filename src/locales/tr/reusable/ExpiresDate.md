Süresi dolmuş bir aboneliği kullanıcı satın alamaz. Bu nedenle `expires_at` tarihi (aboneliğin sona erdiği tarih) her zaman `purchased_at` tarihinden (işlemin gerçekleştiği tarih) sonra olmalıdır.

Bunu düzeltmek için bu tarihleri kontrol edin ve `expires_at` değerinin `purchased_at` değerinden sonra olduğundan emin olun.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `expires_at`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `expires_date_error`.               |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Örnek yanıt

```json showLineNumbers
{
  "errors": [
    {
      "source": "expires_at",
      "errors": [
        "expires_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "expires_date_error",
  "status_code": 400
}
```