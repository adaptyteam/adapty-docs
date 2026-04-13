| Parametre          | Tür    | Zorunlu | Null Olabilir | Açıklama                                                  |
| :----------------- | :----- | -------- | -------- | :----------------------------------------------------------- |
| device_id          | String | Evet      | Hayır       | İstemci tarafında oluşturulan cihaz tanımlayıcısı.       |
| device             | String | Hayır       | Evet      | Son kullanıcının görebileceği cihaz modeli adı.                      |
| locale             | String | Hayır       | Evet      | Son kullanıcının kullandığı yerel ayar.                             |
| os                 | String | Hayır       | Evet      | Son kullanıcının kullandığı işletim sistemi.                   |
| platform           | String | Hayır       | Evet      | Son kullanıcının kullandığı cihaz platformu.                    |
| timezone           | String | Hayır       | Evet      | Son kullanıcının saat dilimi.                                |
| user_agent         | String | Hayır       | Evet      | Son kullanıcı ortamına ilişkin ayrıntılar: uygulamanızla etkileşime giren son kullanıcının cihaz, işletim sistemi ve tarayıcı bilgileri. |
| idfa               | String | Hayır       | Evet      | Apple'ın bir kullanıcının cihazına atadığı Reklamverenler için Tanımlayıcı. |
| idfv               | String | Hayır       | Evet      | Satıcılar için Tanımlayıcı (IDFV), bir geliştiricinin tüm uygulamalarına atanan ve o geliştiricinin cihazınızdaki tüm uygulamaları arasında paylaşılan bir koddur. |
| advertising_id     | String | Hayır       | Evet      | Advertising ID, Android İşletim Sistemi tarafından sunulan ve reklamcıların sizi benzersiz şekilde tanımlamak için kullanabileceği eşsiz bir tanımlayıcıdır. |
| android_id         | String | Hayır       | Evet      | Android 8.0 (API düzeyi 26) ve daha yüksek sürümlerde, uygulama imzalama anahtarı, kullanıcı ve cihaz kombinasyonuna özgü 64 bitlik bir sayı (onaltılık dize olarak ifade edilir). Daha fazla ayrıntı için [Android geliştirici belgelerine](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID) bakın. |
| android_app_set_id | String | Hayır       | Evet      | Bir [AppSetId](https://developer.android.com/design-for-safety/privacy-sandbox/reference/adservices/appsetid/AppSetId) - para kazanmayan reklam kullanım senaryoları için cihaz başına, geliştirici hesabı başına kullanıcı tarafından sıfırlanabilir benzersiz kimlik. |