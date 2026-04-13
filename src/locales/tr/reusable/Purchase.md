| Parametre | Tür | Zorunlu | Null Olabilir | Açıklama |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type | String | Evet | Hayır | Satın alınan ürünün türü. Olası değer: `one_time_purchase`. |
| store | String | Evet | Hayır | Ürünün satın alındığı mağaza. Olası değerler: `app_store`, `play_store`, `stripe` veya [özel mağazanızın](custom-store) Store ID'si. |
| environment | String | Hayır | Hayır | Access level'ı sağlayan işlem ortamı. Seçenekler: `Sandbox`, `Production`. Varsayılan olarak `Production` kullanılır. |
| store_product_id | String | Evet | Hayır | Bu access level'ı açan ürünün uygulama mağazasındaki (App Store, Google Play, Stripe vb.) ürün ID'si. |
| store_transaction_id | String | Evet | Hayır | Uygulama mağazasındaki (App Store, Google Play, Stripe vb.) işlem ID'si. |
| store_original_transaction_id | String | Evet | Hayır | <p>Yinelenen abonelikler için, yenileme zincirini birbirine bağlayan orijinal işlem ID'si. Orijinal işlem zincirdeki ilk işlemdir; sonraki işlemler yenilemelerdir.</p><p>Yenileme yoksa `store_original_transaction_id`, `store_transaction_id` ile aynıdır.</p> |
| offer | Object | Hayır | Evet | Satın alma için kullanılan teklif; bir [Offer](server-side-api-objects#offer) nesnesi olarak. |
| is_family_shared | Boolean | Hayır | Hayır | Ürünün App Store Connect'te aile paylaşımını destekleyip desteklemediğini gösteren Boolean değer. Yalnızca iOS. iOS 14.0 altı ve macOS 11.0 altında her zaman `false`'tur. Varsayılan olarak `false` kullanılır. |
| price | Object | Evet | Hayır | Tek seferlik satın almanın fiyatı; bir [Price](server-side-api-objects#price) nesnesi olarak. Sıfır maliyetli ilk abonelik satın alımı ücretsiz deneme, sıfır maliyetli yenileme ise ücretsiz yenilemedir. |
| purchased_at | ISO 8601 date | Evet | Hayır | Access level'ın en son satın alındığı tarih ve saat. |
| refunded_at | ISO 8601 date | Hayır | Hayır | İade edilmişse, iadenin tarih ve saatini gösterir. |
| cancellation_reason | String | Hayır | Hayır | Olası iptal nedenleri: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `cancelled_by_developer`, `new_subscription`, `unknown`. |
| variation_id | String | Hayır | Hayır | Satın almaları yapıldıkları belirli paywall'a kadar izlemek için kullanılan varyasyon ID'si. |