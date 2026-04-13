| Parametre | Tür | Zorunlu | Boş Olabilir | Açıklama |
| :----------------- | :------------ | -------- | -------- | :----------------------------------------------------------- |
| first_name | String | Hayır | Evet | Son kullanıcınızın adı. |
| last_name | String | Hayır | Evet | Son kullanıcınızın soyadı. |
| gender | String | Hayır | Evet | Son kullanıcınızın cinsiyeti. |
| email | String | Hayır | Evet | Son kullanıcınızın e-posta adresi. |
| phone_number | String | Hayır | Evet | Son kullanıcınızın telefon numarası. |
| birthday | ISO 8601 date | Hayır | Hayır | Son kullanıcınızın doğum tarihi. |
| ip_country | String | Hayır | Hayır | Son kullanıcının ISO 3166-2 formatındaki ülkesi. İstek istemci tarafından değil sunucu tarafından yapılıyorsa mevcut ülkeyi belirlemek için bu alanın iletilmesi gerekir. Aksi takdirde ülkeyi isteğin IP adresine göre belirleriz. |
| store_country | String | Hayır | Evet | Son kullanıcının uygulama mağazasının ülkesi. |
| store | String | Hayır | Evet | Kullanıcının uygulamanızda satın alma yaparken kullandığı platform. Olası değerler: `app_store`, `play_store` veya `stripe`. |
| analytics_disabled | Boolean | Hayır | Hayır | <p>Harici analitiği devre dışı bırakma seçeneği. Analitik devre dışı bırakıldığında olaylar entegrasyonlara gönderilmez ve `idfa`, `idfv` ile `advertising_id` alanları boş olabilir hale gelir.</p><p>AÇIK: Bu kullanıcı için harici analitik devre dışı bırakılmıştır.</p><p>KAPALI: Analitik varsayılan olarak aktiftir.</p> |
| custom_attributes | Array | Hayır | Hayır | <p>Profil için 30'a kadar özel özellik tanımlamanıza olanak tanır. `custom_attributes` dizisini kullanıyorsanız en az bir anahtar-değer çifti zorunludur.</p><p>**Anahtar:** Yalnızca harf, rakam, tire, nokta ve alt çizgi içeren, en fazla 30 karakterlik bir string olmalıdır.</p><p>**Değer:** En fazla 30 karakterlik bir string veya float olmalıdır. Boolean ve integer değerler float'a dönüştürülür. Bir özelliği silmek için boş değer veya `null` gönderin.</p> |
| installation_meta | Object | Hayır | Hayır | Belirli bir cihazdaki belirli bir uygulamaya ait bilgileri içerir; [Installation Meta](server-side-api-objects#installation-meta) nesnesi olarak yapılandırılmıştır. |