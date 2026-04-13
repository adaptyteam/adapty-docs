İstenen paywall için `variation_ID` bulunamadığından istek başarısız oldu. İstediğiniz `placement_id`'nin uygulamada mevcut olduğunu ve istekte yazım hatası olmadığını kontrol edin.

#### Gövde

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `bull`.</li><li> **errors**: Hatanın açıklaması. </li></ul> |
| error_code  | String  | Kısa hata adı. Olası değer: `VARIATION_DOES_NOT_EXIST_ERROR`. |
| status_code | Integer | HTTP durumu. Her zaman `404`.                                |

#### Yanıt örneği

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Variation for example_onboarding does not exist."
            ]
        }
    ],
    "error_code": "VARIATION_DOES_NOT_EXIST_ERROR",
    "status_code": 404
}
```