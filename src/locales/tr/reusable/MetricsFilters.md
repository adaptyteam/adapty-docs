| Ad | Tür | Zorunlu | Açıklama |
| ------------------------ | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date | dizi (String değerleri) | :heavy_plus_sign: | Grafik verilerini almak istediğiniz tarih veya dönemi girin. |
| compare_date | dizi (String değerleri) | :heavy_minus_sign: | İki tarih veya dönemi karşılaştırıyorsanız, daha erken olanı buraya, daha geç olanı ise `date` parametresine girin. |
| store | dizi (String değerleri) | :heavy_minus_sign: | Satın almanın yapıldığı uygulama mağazasına göre filtreleyin. Olası değerler: **app_store**, **play_store**, **stripe** ve özel mağaza ID'leri. Özel bir mağaza kullanıyorsanız, Adapty Kontrol Paneli'nde belirlediğiniz ID'yi girin. |
| country | dizi (String değerleri) | :heavy_minus_sign: | Satın almanın gerçekleştiği ülkeyi ISO 3166-1 standardına göre 2 harfli ülke koduyla filtreleyin. |
| store_product_id | dizi (String değerleri) | :heavy_minus_sign: | Uygulama mağazasındaki bir ürünün benzersiz tanımlayıcısı. Bu ID'yi Adapty Kontrol Paneli'nin [**Products**](https://app.adapty.io/products) bölümünde görebilirsiniz. |
| duration | dizi (String) | :heavy_minus_sign: | Abonelik süresini belirtin. Olası değerler: <ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source | dizi (String değerleri) | :heavy_minus_sign: | Attribution için kaynak entegrasyon. Olası değerler:<ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status | dizi (String değerleri) | :heavy_minus_sign: | Attribution'ın organik mi yoksa organik olmayan mı olduğunu belirtir. Olası değerler: <ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel | dizi (String değerleri) | :heavy_minus_sign: | İşleme yol açan pazarlama kanalı. |
| attribution_campaign | dizi (String değerleri) | :heavy_minus_sign: | İşlemi getiren pazarlama kampanyası. |
| attribution_adgroup | dizi (String değerleri) | :heavy_minus_sign: | İşlemi getiren attribution reklam grubu. |
| attribution_adset | dizi (String değerleri) | :heavy_minus_sign: | İşleme yol açan attribution reklam seti. |
| attribution_creative | dizi (String değerleri) | :heavy_minus_sign: | Bir reklam veya kampanyada etkinliği ölçmek amacıyla takip edilen görsel ya da metin öğeleri (ör. tıklamalar, dönüşümler). |
| offer_category | dizi (String değerleri) | :heavy_minus_sign: | Veri almak istediğiniz teklif kategorilerini belirtin. Olası değerler:<ul><li>introductory</li><li>promotional</li><li>winback</li></ul> |
| offer_type | dizi (String değerleri) | :heavy_minus_sign: | Veri almak istediğiniz teklif türlerini belirtin. Olası değerler:<ul><li>free_trial</li><li>pay_as_you_go</li><li>pay_up_front</li></ul> |
| offer_id | dizi (String değerleri) | :heavy_minus_sign: | Veri almak istediğiniz belirli teklifleri belirtin. |