## Sistem StoreKit Kodları \{#system-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| unknown | 0 | Bilinmeyen veya beklenmedik bir hata oluştuğunu belirtir. |
| clientInvalid | 1 | İstemcinin denenen işlemi gerçekleştirmesine izin verilmediğini belirtir. |
| paymentCancelled | 2 | <p>Kullanıcının ödeme isteğini iptal ettiğini belirtir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcıya indirim teklif edebilir veya daha sonra hatırlatabilirsiniz.</p> |
| paymentInvalid | 3 | Ödeme parametrelerinden birinin mağaza tarafından tanınmadığını belirtir. |
| paymentNotAllowed | 4 | <p>Kullanıcının ödeme yapmasına izin verilmediğini belirtir. Olası nedenler:</p><p></p><p>- Kullanıcının bulunduğu ülkede ödemeler desteklenmiyor.</p><p>- Kullanıcı reşit değil.</p> |
| storeProductNotAvailable | 5 | İstenen ürünün App Store'da mevcut olmadığını belirtir. Ürünün kullanılan ülke için geçerli olduğundan emin olun. |
| cloudServicePermissionDenied | 6 | Kullanıcının Cloud servisi bilgilerine erişime izin vermediğini belirtir. |
| cloudServiceNetworkConnectionFailed | 7 | Cihazın ağa bağlanamadığını belirtir. |
| cloudServiceRevoked | 8 | Kullanıcının bu cloud servisini kullanma iznini iptal ettiğini belirtir. |
| privacyAcknowledgementRequired | 9 | Kullanıcının mağaza gizlilik politikasını henüz onaylamadığını belirtir. |
| unauthorizedRequestData | 10 | İsteğin hatalı oluşturulduğunu belirtir. |
| invalidOfferIdentifier | 11 | <p>Teklif tanımlayıcısı geçerli değil. Olası nedenler:</p><p></p><p>- App Store'da bu tanımlayıcıyla bir teklif oluşturmadınız.</p><p>- Teklifi iptal ettiniz.</p><p>- Teklif ID'sini yanlış girdiniz.</p> |
| invalidSignature | 12 | Ödeme indirimindeki imzanın geçerli olmadığını belirtir. **In-app purchase Key ID** alanını doldurduğunuzdan ve **In-App Purchase Private Key** dosyasını yüklediğinizden emin olun. Ayrıntılar için [App Store entegrasyonunu yapılandırma](app-store-connection-configuration) konusuna bakın. |
| missingOfferParams | 13 | <p>Bu hata, Adapty entegrasyonuyla veya tekliflerle ilgili sorunlara işaret eder.</p><p>Nasıl yapılandırılacağı hakkında ayrıntılar için [App Store entegrasyonunu yapılandırma](app-store-connection-configuration) ve [Teklifler](offers) konularına bakın.</p> |
| invalidOfferPrice | 14 | Mağazada belirlediğiniz fiyatın artık geçerli olmadığını belirtir. Teklifler her zaman indirimli bir fiyatı temsil etmelidir. |

## Özel Android Kodları \{#custom-android-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| adaptyNotInitialized | 20 | Adapty SDK'yı `Adapty.activate` metoduyla düzgün şekilde yapılandırmanız gerekiyor. [React Native için](sdk-installation-reactnative) nasıl yapılacağını öğrenin. |
| productNotFound | 22 | Satın alınmak istenen ürünün mağazada mevcut olmadığını belirtir. |
| invalidJson | 23 | Paywall JSON'ı geçerli değil. Adapty Kontrol Paneli'nde düzeltin. Nasıl düzeltileceği hakkında ayrıntılar için [Paywall'u remote config ile özelleştirme](customize-paywall-with-remote-config) konusuna bakın. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | Yenilenmesi gereken orijinal abonelik geçmişte bulunamadı. |
| pendingPurchase | 25 | Satın alma durumunun tamamlanmış değil, beklemede olduğunu belirtir. Ayrıntılar için Android Developer belgelerindeki [Bekleyen işlemleri yönetme](https://developer.android.com/google/play/billing/integrate#pending) sayfasına bakın. |
| billingServiceTimeout | 97 | Google Play'in yanıt veremeden önce isteğin maksimum zaman aşımına ulaştığını belirtir. Bu durum, örneğin Play Billing Library çağrısının istenen işlemi yürütmesinde gecikme yaşanmasından kaynaklanabilir. |
| featureNotSupported | 98 | İstenen özellik, mevcut cihazda Play Store tarafından desteklenmiyor. |
| billingServiceDisconnected | 99 | Bu kritik hata, istemci uygulamanın `BillingClient` aracılığıyla Google Play Store servisine olan bağlantısının kesildiğini belirtir. |
| billingServiceUnavailable | 102 | Bu geçici hata, Google Play Billing servisinin şu anda kullanılamadığını belirtir. Çoğu durumda bu, istemci cihaz ile Google Play Billing servisleri arasında herhangi bir noktada ağ bağlantısı sorunu olduğu anlamına gelir. |
| billingUnavailable | 103 | <p>Satın alma işlemi sırasında kullanıcı kaynaklı bir faturalama hatası oluştuğunu belirtir. Bu hatanın oluşabileceği durumlar şunlardır:</p><p></p><p>1\. Kullanıcının cihazındaki Play Store uygulaması güncel değil.</p><p>2. Kullanıcı desteklenmeyen bir ülkede.</p><p>3. Kullanıcı bir kurumsal hesap kullanıyor ve kurumsal yönetici satın alma işlemlerini devre dışı bırakmış.</p><p>4. Google Play, kullanıcının ödeme yöntemini tahsil edemiyor. Örneğin, kullanıcının kredi kartı süresi dolmuş olabilir.</p><p>5. Kullanıcı Play Store uygulamasında oturum açmamış.</p> |
| developerError | 105 | Bu kritik hata, bir API'nin yanlış kullanıldığını belirtir. |
| billingError | 106 | Bu kritik hata, Google Play'in kendi içinde bir sorun olduğunu belirtir. |
| itemAlreadyOwned | 107 | Consumable ürün zaten satın alınmış. |
| itemNotOwned | 108 | İstenen işlemin öğe üzerinde başarısız olduğunu belirtir. |


## Özel StoreKit Kodları \{#custom-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>Paywall'daki ürünlerin hiçbirinin mağazada mevcut olmadığını belirtir.</p><p>Bu hatayla karşılaşıyorsanız çözmek için aşağıdaki adımları izleyin:</p><p></p><p>1. Tüm ürünlerin Adapty Kontrol Paneli'ne eklenip eklenmediğini kontrol edin.</p><p>2. Uygulamanızın Bundle ID'sinin Apple Connect'tekiyle eşleştiğinden emin olun.</p><p>3. Uygulama mağazalarındaki ürün tanımlayıcılarının Kontrol Paneli'ne eklediğinizle eşleştiğini doğrulayın. Tanımlayıcıların, mağazada zaten dahil değilse Bundle ID içermemesi gerektiğine dikkat edin.</p><p>4. Apple vergi ayarlarında uygulamanın ücretli durumunun aktif olduğunu onaylayın. Vergi bilgilerinizin güncel ve sertifikalarınızın geçerli olduğundan emin olun.</p><p>5. Uygulamanın monetizasyona uygun olabilmesi için bir banka hesabının bağlı olup olmadığını kontrol edin.</p><p>6. Ürünlerin tüm bölgelerde kullanılabilir olup olmadığını kontrol edin. Ayrıca ürünlerinizin **"Ready to Submit"** durumunda olduğundan emin olun.</p> |
| productRequestFailed | 1002 | <p>Şu anda mevcut ürünler alınamıyor. Olası neden:</p><p></p><p>- Henüz önbellek oluşturulmamış ve aynı zamanda internet bağlantısı yok.</p> |
| cantMakePayments | 1003 | Bu cihazda Uygulama İçi Satın Almalara izin verilmiyor. |
| noPurchasesToRestore | 1004 | Google Play'in geri yüklenecek satın alma bulamadığını belirtir. |
| cantReadReceipt | 1005 | <p>Cihazda geçerli bir makbuz yok. Bu durum sandbox testleri sırasında sorun oluşturabilir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcıya indirim teklif edebilir veya daha sonra hatırlatabilirsiniz.</p> |
| productPurchaseFailed | 1006 | Ürün satın alımı başarısız oldu. Bu hata, altta yatan bir StoreKit hatasını sarmalamaktadır — gerçek nedeni öğrenmek için sarmalanan hatayı okuyun (veya konsolda görmek için ayrıntılı logları etkinleştirin). Sarmalanan hata genellikle yukarıdaki tablodaki 0–14 arasındaki StoreKit kodlarından biridir; en yaygın olanları `paymentCancelled`, `paymentInvalid`, `paymentNotAllowed` veya `invalidOfferPrice`'tır. Belirli bir neden tespit edemiyorsanız yeni bir [sandbox profili](test-purchases-in-sandbox) deneyin; sorun devam ederse Apple desteğiyle iletişime geçin. |
| refreshReceiptFailed | 1010 | Makbuzun alınamadığını belirtir. Yalnızca StoreKit 1 için geçerlidir. |
| receiveRestoredTransactionsFailed | 1011 | Satın alma geri yükleme başarısız oldu. |


## Özel Ağ Kodları \{#custom-network-codes\}

| Hata | Kod | Açıklama |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated | 2002 | Adapty SDK'yı `Adapty.activate` metoduyla düzgün şekilde yapılandırmanız gerekiyor. [React Native için](sdk-installation-reactnative) nasıl yapılacağını öğrenin. |
| badRequest | 2003 | Hatalı istek. |
| serverError | 2004 | Sunucu hatası. |
| networkFailed | 2005 | Ağ isteği başarısız oldu. |
| decodingFailed | 2006 | Yanıt kod çözme işleminin başarısız olduğunu belirtir. |
| encodingFailed | 2009 | İstek kodlama işleminin başarısız olduğunu belirtir. |
| analyticsDisabled | 3000 | Analytics olaylarını işleyemiyoruz çünkü bu özelliği devre dışı bıraktınız. Ayrıntılar için [Analytics entegrasyonu](analytics-integration) konusuna bakın. |
| wrongParam | 3001 | Bazı parametrelerinizin hatalı olduğunu belirtir: boş bırakılamayacak alanlar boş bırakılmış ya da yanlış türde değer girilmiş olabilir. |
| activateOnceError | 3005 | `.activate` metodu birden fazla kez çağrılamaz. |
| profileWasChanged | 3006 | İşlem sırasında kullanıcı profili değiştirildi. |
| fetchTimeoutError | 3101 | Paywall'un belirlenen süre içinde alınamadığını belirtir. Bu durumu önlemek için [yerel yedekler ayarlayın](fetch-paywalls-and-products). |
| operationInterrupted | 9000 | Bu işlem sistem tarafından kesildi. |