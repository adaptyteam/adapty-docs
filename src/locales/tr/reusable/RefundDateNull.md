İstek, `cancellation_reason` içerip `refunded_at` tarihi içermediği ya da `refunded_at` içerip `cancellation_reason` içermediği için başarısız oldu.

Bir iade ayarlandığında, hem iade tarihi hem de nedeni belirtilmelidir.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `refunded_at`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `refund_fields_error`.              |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği

```json showLineNumbers
{
  "errors": [
    {
      "source": "refunded_at",
      "errors": [
        "refunded_at and cancellation_reason=refund must be specified together."
      ]
    }
  ],
  "error_code": "refund_fields_error",
  "status_code": 400
}
```