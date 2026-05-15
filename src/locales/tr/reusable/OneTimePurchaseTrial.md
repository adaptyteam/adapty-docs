İstek, tek seferlik satın alma ile deneme süresi sağlandığı için başarısız oldu. Aboneliklerin aksine, tek seferlik satın alımların deneme süresi olamaz. Bunu düzeltmek için [One-Time Purchase](server-side-api-objects#one-time-purchase) nesnesi içindeki [Offer](server-side-api-objects#offer) nesnesindeki `offer_type` değerini kontrol edin. `offer_type` değeri `free_trial` olamaz. `offer_type` alan değerini değiştirin ya da One-Time Purchase nesnesi yerine [Subscription](server-side-api-objects#subscription) nesnesini kullanmaya geçin.

#### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman offer.type</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `one_time_purchase_trial_error`.    |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer.type",
      "errors": [
        "One-time purchase cannot have a trial."
      ]
    }
  ],
  "error_code": "one_time_purchase_trial_error",
  "status_code": 400
}
```