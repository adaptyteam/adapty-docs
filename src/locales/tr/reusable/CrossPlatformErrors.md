
## Sistem StoreKit Kodları \{#system-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| unknown | 0 | Bilinmeyen veya beklenmedik bir hata oluştuğunu gösterir. |
| clientInvalid | 1 | İstemcinin gerçekleştirmeye çalıştığı işlemi yapmasına izin verilmediğini gösterir. |
| paymentCancelled | 2 | <p>Kullanıcının ödeme isteğini iptal ettiğini gösterir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcınıza bir indirim sunabilir ya da daha sonra hatırlatabilirsiniz.</p> |
| paymentInvalid | 3 | Ödeme parametrelerinden birinin mağaza tarafından tanınmadığını gösterir. |
| paymentNotAllowed | 4 | <p>Kullanıcının ödeme yapmaya yetkili olmadığını gösterir. Olası nedenler:</p><p></p><p>- Ödemeler, kullanıcının ülkesinde desteklenmiyor.</p><p>- Kullanıcı reşit değil.</p> |
| storeProductNotAvailable | 5 | İstenen ürünün App Store'da bulunmadığını gösterir. Ürünün kullanılan ülkede mevcut olduğundan emin olun. |
| cloudServicePermissionDenied | 6 | Kullanıcının Cloud servis bilgilerine erişime izin vermediğini gösterir. |
| cloudServiceNetworkConnectionFailed | 7 | Cihazın ağa bağlanamadığını gösterir. |
| cloudServiceRevoked | 8 | Kullanıcının bu bulut servisini kullanma iznini iptal ettiğini gösterir. |
| privacyAcknowledgementRequired | 9 | Kullanıcının mağaza gizlilik politikasını henüz onaylamadığını gösterir. |
| unauthorizedRequestData | 10 | İsteğin hatalı oluşturulduğunu gösterir. |
| invalidOfferIdentifier | 11 | <p>Teklif tanımlayıcısı geçerli değil. Olası nedenler:</p><p></p><p>- App Store'da bu tanımlayıcıyla bir teklif oluşturmadınız.</p><p>- Teklifi iptal ettiniz.</p><p>- Teklif ID'sini yanlış yazdınız.</p> |
| invalidSignature | 12 | Ödeme indirimindeki imzanın geçerli olmadığını gösterir. **In-app purchase Key ID** alanını doldurduğunuzdan ve **In-App Purchase Private Key** dosyasını yüklediğinizden emin olun. Ayrıntılar için [App Store entegrasyonunu yapılandırma](app-store-connection-configuration) konusuna bakın. |
| missingOfferParams | 13 | <p>Bu hata, Adapty entegrasyonunda veya tekliflerde sorun olduğunu gösterir.</p><p>Nasıl kurulacağına dair ayrıntılar için [App Store entegrasyonunu yapılandırma](app-store-connection-configuration) ve [Teklifler](offers) konularına bakın.</p> |
| invalidOfferPrice | 14 | Mağazada belirttiğiniz fiyatın artık geçerli olmadığını gösterir. Teklifler her zaman indirimli bir fiyatı temsil etmelidir. |

## Özel Android Kodları \{#custom-android-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| adaptyNotInitialized | 20 | Adapty SDK'yı `activate` yöntemiyle düzgün şekilde yapılandırmanız gerekiyor. Nasıl yapacağınızı öğrenmek için [Adapty SDK'yı yükle ve yapılandır](sdk-installation-capacitor) konusuna bakın. |
| productNotFound | 22 | Satın alınmak istenen ürünün mağazada mevcut olmadığını gösterir. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | Yenilenmesi gereken orijinal abonelik bulunamadı. |
| billingServiceTimeout | 97 | İsteğin, Google Play yanıt verebilmeden önce maksimum zaman aşımına ulaştığını gösterir. Bu durum, örneğin Play Billing Library çağrısının istediği işlemin yürütülmesindeki bir gecikmeden kaynaklanabilir. |
| featureNotSupported | 98 | İstenen özellik, mevcut cihazda Play Store tarafından desteklenmiyor. |
| billingServiceDisconnected | 99 | Bu kritik hata, istemci uygulamanın `BillingClient` aracılığıyla Google Play Store hizmetiyle olan bağlantısının kesildiğini gösterir. |
| billingServiceUnavailable | 102 | Bu geçici hata, Google Play Billing hizmetinin şu anda kullanılamadığını gösterir. Çoğu durumda bu, istemci cihaz ile Google Play Billing hizmetleri arasında bir ağ bağlantısı sorunu olduğu anlamına gelir. |
| billingUnavailable | 103 | <p>Bu hata, satın alma işlemi sırasında kullanıcı faturalama hatası oluştuğunu gösterir. Bu durumun gerçekleşebileceği örnekler:</p><p></p><p>1\. Kullanıcının cihazındaki Play Store uygulaması güncel değil.</p><p>2. Kullanıcı desteklenmeyen bir ülkede.</p><p>3. Kullanıcı kurumsal bir kullanıcı ve kurumsal yöneticisi satın alma işlemlerini devre dışı bırakmış.</p><p>4. Google Play, kullanıcının ödeme yöntemini tahsil edemiyor. Örneğin, kullanıcının kredi kartının süresi dolmuş olabilir.</p><p>5. Kullanıcı Play Store uygulamasına giriş yapmamış.</p> |
| developerError | 105 | Bir API'yi hatalı kullandığınızı gösteren kritik bir hatadır. |
| billingError | 106 | Google Play'in kendisinde dahili bir sorun olduğunu gösteren kritik bir hatadır. |
| itemAlreadyOwned | 107 | Consumable ürün zaten satın alınmış. |
| itemNotOwned | 108 | İstek yapılan öğe üzerindeki işlemin başarısız olduğunu gösterir. |
| billingNetworkError | 112 | Cihaz ile Play sistemleri arasındaki ağ bağlantısında sorun yaşandığını gösterir. |


## Özel StoreKit Kodları \{#custom-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>Bu hata, paywall'daki ürünlerin hiçbirinin mağazada mevcut olmadığını gösterir.</p><p>Bu hatayla karşılaşıyorsanız lütfen çözmek için aşağıdaki adımları izleyin:</p><p></p><p>1. Tüm ürünlerin Adapty Kontrol Paneli'ne eklenip eklenmediğini kontrol edin.</p><p>2. Uygulamanızın Bundle ID'sinin Apple Connect'tekiyle eşleştiğinden emin olun.</p><p>3. Uygulama mağazalarındaki ürün tanımlayıcılarının Kontrol Paneli'ne eklediğinizlerle eşleştiğini doğrulayın. Tanımlayıcıların, mağazada zaten dahil değilse Bundle ID içermemesi gerektiğine dikkat edin.</p><p>4. Apple vergi ayarlarınızda uygulama ücretli durumunun aktif olduğunu onaylayın. Vergi bilgilerinizin güncel olduğundan ve sertifikalarınızın geçerli olduğundan emin olun.</p><p>5. Uygulamaya para kazanmaya uygun olması için bir banka hesabının bağlı olup olmadığını kontrol edin.</p><p>6. Ürünlerin tüm bölgelerde mevcut olup olmadığını kontrol edin. Ayrıca ürünlerinizin **"Ready to Submit"** durumunda olduğundan emin olun.</p> |
| productRequestFailed | 1002 | <p>Şu anda mevcut ürünler getirilemiyor. Olası neden:</p><p></p><p>- Henüz önbellek oluşturulmamış ve aynı anda internet bağlantısı yok.</p> |
| cantMakePayments | 1003 | Bu cihazda Uygulama İçi Satın Almalar'a izin verilmiyor. |
| noPurchasesToRestore | 1004 | Google Play'in geri yüklenecek satın alma bulamadığını gösterir. |
| cantReadReceipt | 1005 | <p>Cihazda geçerli bir makbuz yok. Bu, sandbox testleri sırasında sorun oluşturabilir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcınıza bir indirim sunabilir ya da daha sonra hatırlatabilirsiniz.</p> |
| productPurchaseFailed | 1006 | Ürün satın alma başarısız oldu. Bu, temel alınan bir StoreKit hatasını kapsar — gerçek nedeni görmek için sarmalanan hatayı okuyun (veya konsolda görmek için ayrıntılı günlükleri etkinleştirin). Sarmalanan hata genellikle yukarıdaki tablodaki 0–14 arası StoreKit kodlarından biridir; en sık karşılaşılanlar `paymentCancelled`, `paymentInvalid`, `paymentNotAllowed` veya `invalidOfferPrice`'tır. Belirli bir neden tespit edemiyorsanız yeni bir [sandbox profili](test-purchases-in-sandbox) deneyin; hâlâ başarısız olursa Apple desteğiyle iletişime geçin. |
| refreshReceiptFailed | 1010 | Makbuzun alınamadığını gösterir. Yalnızca StoreKit 1 için geçerlidir. |
| receiveRestoredTransactionsFailed | 1011 | Satın alma geri yükleme başarısız oldu. |


## Özel Ağ Kodları \{#custom-network-codes\}

| Hata                | Kod | Açıklama                                                  |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | Adapty SDK'yı `activate` yöntemiyle düzgün şekilde yapılandırmanız gerekiyor. Nasıl yapacağınızı öğrenmek için [Adapty SDK'yı yükle ve yapılandır](sdk-installation-capacitor) konusuna bakın. |
| badRequest           | 2003 | Hatalı istek.                                                 |
| serverError          | 2004 | Sunucu hatası.                                                |
| networkFailed        | 2005 | Ağ isteği başarısız oldu.                                  |
| decodingFailed       | 2006 | Yanıt kod çözümünün başarısız olduğunu gösterir.          |
| encodingFailed       | 2009 | İstek kodlamasının başarısız olduğunu gösterir.           |
| analyticsDisabled    | 3000 | Analytics olaylarını işleyemiyoruz çünkü bunu devre dışı bıraktınız. Ayrıntılar için [Analytics entegrasyonu](analytics-integration) konusuna bakın. |
| wrongParam           | 3001 | Bazı parametrelerinizin doğru olmadığını gösterir: boş olamayacakken boş veya yanlış tür vb. |
| activateOnceError    | 3005 | `.activate` yöntemi birden fazla kez çağrılamaz. |
| profileWasChanged    | 3006 | İşlem sırasında kullanıcı profili değiştirildi.           |
| unsupportedData      | 3007 | Veri formatının SDK tarafından desteklenmediğini gösterir. |
| persistingDataError  | 3100 | Veri kaydedilirken hata oluştu.                           |
| fetchTimeoutError    | 3101 | Paywall'ın belirlenen süre içinde getirilemediği anlamına gelir. Bu durumu önlemek için [yerel yedekler ayarlayın](fetch-paywalls-and-products). |
| operationInterrupted | 9000 | Bu işlem sistem tarafından kesintiye uğratıldı.                |