Uzatılmış aboneliklerde bir abonelik zinciri oluşturulur. Orijinal işlem, bu zincirdeki ilk işlemdir ve zincir ona bağlıdır. Zincirdeki diğer işlemler ise uzatmalardır. Bir işlem abonelik zincirindeki ilk satın alma ise kendi orijinal işlemi olabilir.

Diğer bir durum ise tek seferlik satın almadır. Uzatma yapılamayacağından hiçbir zaman zincir oluşturmaz. Bu durumda `store_transaction_id` her zaman `store_original_transaction_id` ile aynıdır.

İsteğiniz başarısız oldu çünkü [Tek Seferlik Satın Alma](server-side-api-objects#one-time-purchase) nesnesindeki `store_transaction_id` değeri, `store_original_transaction_id` değerinden farklı. Sorunu gidermek için ya ikisini aynı yapın ya da nesneyi değiştirin — [Tek Seferlik Satın Alma](server-side-api-objects#one-time-purchase) yerine [Abonelik](server-side-api-objects#subscription) kullanın.

#### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `store_transaction_id`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `store_transaction_id_error`.       |
| status_code | Integer | HTTP durumu. Her zaman `400.`                                |

#### Yanıt örneği \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "store_transaction_id",
      "errors": [
        "store_transaction_id must be equal to store_original_transaction_id for purchase."
      ]
    }
  ],
  "error_code": "store_transaction_id_error",
  "status_code": 400
}
```