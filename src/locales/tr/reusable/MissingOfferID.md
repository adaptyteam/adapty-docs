İstek, `offer_category` parametresinin `introductory` dışında bir değer içermesi ya da `offer_type` kullanılmasına rağmen `offer_id` eklenmemesi nedeniyle başarısız oldu. Bu durumda ya bir `offer_id` değeri sağlayın ya da istekten `offer_category` veya `offer_type` parametresini kaldırın.

Bir diğer olası neden, `offer_id` parametresinin eklenmiş ancak `null` bırakılmış olmasıdır; oysa bu parametre `null` olamaz. Bu durumdaysa ya `offer_id` için bir değer girin ya da parametreyi tamamen kaldırın.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `offer.category`</li><li> **errors**: Hatanın açıklaması. </li></ul> |
| error_code  | String  | Kısa hata adı. Olası değer: `missing_offer_id`.              |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Örnek yanıt

Profil bulunamadı

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_category",
      "errors": [
        "offer_id must be specified for all offer types except 'introductory'."
      ]
    }
  ],
  "error_code": "missing_offer_id",
  "status_code": 400
}
```