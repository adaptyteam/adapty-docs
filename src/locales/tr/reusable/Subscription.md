| Parametre | Tür | Zorunlu | Null Olabilir | Açıklama |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| purchase_type | String | Evet | Hayır | Satın alınan ürünün türü. Olası değer: `subscription`. |
| store | String | Evet | Hayır | Ürünün satın alındığı mağaza. Seçenekler: `app_store`, `play_store`, `stripe` veya [özel mağazanızın](custom-store) Store ID'si. |
| environment | String | Hayır | Hayır | İşlemin gerçekleştiği ortam. `Sandbox` veya `Production` olabilir. Varsayılan olarak `Production` kullanılır. |
| store_product_id | String | Evet | Hayır | Bu access level'ı açan ürünün uygulama mağazasındaki (App Store, Google Play, Stripe vb.) ID'si. |
| store_transaction_id | String | Evet | Hayır | Uygulama mağazasındaki (App Store, Google Play, Stripe vb.) işlem ID'si. |
| store_original_transaction_id | String | Evet | Hayır | <p>Abonelikler için bu ID, yenileme zincirindeki ilk işleme bağlantı sağlar. Her yenileme bu orijinal işleme bağlıdır.</p><p>Yenileme yoksa `store_original_transaction_id`, `store_transaction_id` ile aynıdır.</p> |
| offer | Object | Hayır | Evet | Satın almada kullanılan teklif; [Offer](server-side-api-objects#offer) nesnesi olarak sağlanır. |
| is_family_shared | Boolean | Hayır | Hayır | Ürünün App Store Connect'te aile paylaşımını destekleyip desteklemediğini gösteren Boolean değer. Yalnızca iOS. iOS 14.0 altı ve macOS 11.0 altında her zaman `false` döner. Varsayılan değer `false`'tur. |
| price | Object | Evet | Hayır | Aboneliğin veya satın almanın fiyatı; [Price](server-side-api-objects#price) nesnesi olarak belirtilir. Sıfır maliyetli ilk abonelik satın alımı ücretsiz deneme, sıfır maliyetli yenileme ise ücretsiz yenileme anlamına gelir. |
| purchased_at | ISO 8601 date | Evet | Hayır | En son access level satın alımının tarihi ve saati. |
| refunded_at | ISO 8601 date | Hayır | Hayır | Aboneliğin iade edildiği tarih ve saat (varsa). |
| cancellation_reason | String | Hayır | Hayır | Olası iptal nedenleri: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded` veya `unknown`. |
| variation_id | String | Hayır | Hayır | Satın alımları yapıldıkları belirli paywall'a izlemek için kullanılan varyasyon ID'si. |
| originally_purchased_at | ISO 8601 date | Evet | Hayır | Abonelik zincirlerinde, `store_original_transaction_id` ile bağlantılı orijinal işlemin satın alma tarihi. |
| expires_at | ISO 8601 date | Evet | Hayır | Access level'ın sona ereceği tarih ve saat. Geçmişte bir tarih olabilir; süresiz erişim için `null` döner. |
| renew_status | Boolean | Evet | Hayır | Abonelik için otomatik yenilemenin etkin olup olmadığını gösterir. |
| renew_status_changed_at | ISO 8601 date | Hayır | Hayır | Otomatik yenilemenin etkinleştirildiği veya devre dışı bırakıldığı tarih ve saat. |
| billing_issue_detected_at | ISO 8601 date | Hayır | Hayır | Bir ödeme sorununun (örn. başarısız kart işlemi) tespit edildiği tarih ve saat. Abonelik hâlâ aktif olabilir. Ödeme başarılı olursa bu alan temizlenir. |
| grace_period_expires_at | ISO 8601 date | Hayır | Hayır | Abonelik şu anda [ek süre](https://developer.apple.com/news/?id=09122019c) içindeyse bu sürenin sona ereceği tarih ve saat. |