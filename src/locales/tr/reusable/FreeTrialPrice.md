İstek başarısız oldu çünkü `offer_type` parametresi `free_trial` olarak ayarlanmış, ancak [Price](server-side-api-objects#price) nesnesinin `value` parametresi sıfıra ayarlanmamış.

Bir diğer olası neden, `offer_id` parametresinin dahil edilmiş ancak `null` bırakılmış olmasıdır; oysa bu parametre null olamaz. Bu durumda ya `offer_id` için bir değer sağlayın ya da parametreyi tamamen kaldırın.

#### Body \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `offer.type`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman: `free_trial_price_error`.          |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği \{#response-example\}

Profil bulunamadı

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_type",
      "errors": [
        "If offer_type is 'free_trial', price.value must be 0."
      ]
    }
  ],
  "error_code": "free_trial_price_error",
  "status_code": 400
}
```