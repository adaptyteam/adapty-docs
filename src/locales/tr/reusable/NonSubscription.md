| Parametre | Tür | Zorunlu | Null Olabilir | Açıklama |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_id | String | Evet | Hayır | Adapty'deki satın alma tanımlayıcısı. Bu satın almayı daha önce işleyip işlemediğinizi doğrulamak için kullanabilirsiniz; örneğin tek seferlik ürünleri takip ederken. |
| store | String | Evet | Hayır | Ürünün satın alındığı mağaza. Olası değerler: **app_store**, **play_store**, **stripe**, [özel mağazanızın](custom-store) adı. |
| store_product_id | String | Evet | Hayır | Bu access level'ı açan ürünün uygulama mağazasındaki (App Store/Google Play/Stripe vb.) tanımlayıcısı. |
| store_base_plan_id | String | Evet | Evet | Google Play Store'daki [temel plan ID'si](https://support.google.com/googleplay/android-developer/answer/12154973) veya Stripe'taki [fiyat ID'si](https://docs.stripe.com/products-prices/how-products-and-prices-work#use-products-and-prices). |
| store_transaction_id | String | Evet | Hayır | Uygulama mağazasındaki (App Store/Google Play/Stripe vb.) işlem ID'si. |
| store_original_transaction_id | String | Evet | Hayır | <p>Uzayan aboneliklerde bir abonelik zinciri oluşturulur. Orijinal işlem bu zincirdeki ilk işlemdir ve zincir bu işlem üzerinden bağlanır. Zincirdeki diğer işlemler ise uzatmalardır.</p><br /><p>Uzatma yoksa `store_original_transaction_id`, `store_transaction_id` ile aynı olur.</p> |
| purchased_at | ISO 8601 date | Evet | Hayır | Access level'ın en son satın alındığı tarih ve saat. |
| environment | String | Hayır | Hayır | Access level'ı sağlayan işlemin ortamı. Olası değerler: `Sandbox`, `Production.` |
| is_refund | Boolean | Evet | Hayır | Ürünün iade edilip edilmediğini gösterir. |
| is_consumable | Boolean | Evet | Hayır | Ürünün consumable olup olmadığını gösterir. |