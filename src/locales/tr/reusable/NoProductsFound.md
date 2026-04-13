Sağlanan token'a bağlı ürünler bulunamadığı için istek başarısız oldu. Gerekli tüm ürünlerin Adapty'de doğru uygulamaya eklendiğinden ve **Paddle Product ID** ile **Paddle Price ID** alanlarının doğru şekilde doldurulduğundan emin olun.

#### Gövde

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `non_field_errors`.</li><li> **errors**: Hatanın açıklaması. </li></ul> |
| error_code  | String  | Kısa hata adı. Olası değer: `no_products_found`.             |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "No products found for purchase"
      ]
    }
  ],
  "error_code": "no_products_found",
  "status_code": 400
}
```