| Parametre | Tür | Zorunlu | Null Olabilir | Açıklama |
| :---------------------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| access_level_id | String | Evet | Hayır | Adapty Kontrol Paneli'nde ayarlanan Ücretli Access Level için ID. |
| store | String | Evet | Hayır | Ürünün satın alındığı mağaza. Seçenekler: **app_store**, **play_store**, **stripe** veya [özel mağazanızın](custom-store) adı. |
| store_product_id | String | Evet | Hayır | Bu access level'ı açan ürünün uygulama mağazasındaki (App Store, Google Play, Stripe gibi) ID'si. |
| store_base_plan_id | String | Evet | Evet | Google Play'deki [base plan ID](https://support.google.com/googleplay/android-developer/answer/12154973) veya Stripe'taki [fiyat ID'si](https://docs.stripe.com/products-prices/how-products-and-prices-work#use-products-and-prices). |
| store_transaction_id | String | Evet | Hayır | Uygulama mağazasındaki (App Store, Google Play, Stripe vb.) işlem ID'si. |
| store_original_transaction_id | String | Evet | Hayır | <p>Abonelikler için bu ID, yenileme zincirindeki orijinal işlemi bağlar. Sonraki işlemler yenileme olarak ilişkilendirilir.</p><p>Yenileme yoksa store_original_transaction_id, store_transaction_id ile aynıdır.</p> |
| offer | Object | Evet | Hayır | [Offer](server-side-api-objects#offer) nesnesi. Müşterinin access level'ı yoksa `null` olabilir. |
| environment | String | Hayır | Hayır | Erişim izni veren işlemin ortamı. Seçenekler: `Sandbox`, `Production`. |
| starts_at | ISO 8601 date | Evet | Evet | Access level'ın aktif hale geldiği tarih ve saat. Gelecekte bir tarih olabilir. |
| purchased_at | ISO 8601 date | Evet | Hayır | Access level için en son satın alma işleminin tarih ve saati. |
| originally_purchased_at | ISO 8601 date | Evet | Hayır | Abonelikler için `store_original_transaction_id` ile ilişkili zincirdeki ilk (orijinal) satın almanın tarih ve saati. |
| expires_at | ISO 8601 date | Evet | Evet | Access level'ın sona erdiği tarih ve saat. Geçmişte bir tarih olabilir ya da süresiz erişim için `null` olabilir. |
| renewal_cancelled_at | ISO 8601 date | Evet | Evet | Bir abonelik için otomatik yenilemenin kapatıldığı tarih ve saat. Abonelik hâlâ aktif olabilir; yalnızca otomatik olarak yenilenmez. Kullanıcı aboneliği yeniden etkinleştirirse `null` olarak ayarlanır. |
| billing_issue_detected_at | ISO 8601 date | Evet | Evet | Bir ödeme sorununun tespit edildiği tarih ve saat (örneğin başarısız kart ödemesi). Abonelik hâlâ aktif olabilir. Ödeme daha sonra gerçekleşirse bu alan temizlenir. |
| is_in_grace_period | Boolean | Evet | Hayır | Aboneliğin [ek sürede](https://developer.apple.com/news/?id=09122019c) olup olmadığını gösterir (yalnızca otomatik yenilenen abonelikler için). |
| cancellation_reason | String | Evet | Evet | İptal nedeni. Seçenekler: `voluntarily_cancelled`, `billing_error`, `price_increase`, `product_was_not_available`, `refund`, `upgraded`, `unknown`. |