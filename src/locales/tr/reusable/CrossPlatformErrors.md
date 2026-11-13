
##  Sistem StoreKit Kodları \{#system-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| unknown | 0 | Bu hata, bilinmeyen veya beklenmedik bir hatanın oluştuğunu gösterir. |
| clientInvalid | 1 | Bu hata kodu, istemcinin gerçekleştirmeye çalıştığı işlemi yapmasına izin verilmediğini gösterir. |
| paymentCancelled | 2 | <p>Bu hata kodu, kullanıcının ödeme isteğini iptal ettiğini gösterir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcınıza indirim teklif edebilir veya daha sonra hatırlatabilirsiniz.</p> |
| paymentInvalid | 3 | Bu hata, ödeme parametrelerinden birinin mağaza tarafından tanınmadığını gösterir. |
| paymentNotAllowed | 4 | <p>Bu hata kodu, kullanıcının ödemeleri yetkilendirmesine izin verilmediğini gösterir. Olası nedenler:</p><p></p><p>- Ödemeler kullanıcının ülkesinde desteklenmiyor.</p><p>- Kullanıcı reşit değil.</p> |
| storeProductNotAvailable | 5 | Bu hata kodu, istenen ürünün App Store'da mevcut olmadığını gösterir. Ürünün kullanılan ülkede satışa sunulduğundan emin olun. |
| cloudServicePermissionDenied | 6 | Bu hata kodu, kullanıcının Cloud servis bilgilerine erişime izin vermediğini gösterir. |
| cloudServiceNetworkConnectionFailed | 7 | Bu hata kodu, cihazın ağa bağlanamadığını gösterir. |
| cloudServiceRevoked | 8 | Bu hata kodu, kullanıcının bu cloud servisini kullanma iznini iptal ettiğini gösterir. |
| privacyAcknowledgementRequired | 9 | Bu hata kodu, kullanıcının henüz mağaza gizlilik politikasını onaylamadığını gösterir. |
| unauthorizedRequestData | 10 | Bu hata kodu, isteğin hatalı oluşturulduğunu gösterir. |
| invalidOfferIdentifier | 11 | <p>Teklif tanımlayıcısı geçerli değil. Olası nedenler:</p><p></p><p>- App Store'da bu tanımlayıcıyla bir teklif oluşturmadınız.</p><p>- Teklifi iptal ettiniz.</p><p>- Teklif ID'sini yanlış yazdınız.</p> |
| invalidSignature | 12 | Bu hata kodu, ödeme indirimindeki imzanın geçerli olmadığını gösterir. **Subscription key ID** alanını doldurduğunuzdan ve **App Store promotional offers** bölümüne **Subscription key (.p8 file)** yüklediğinizden emin olun. Ayrıntılar için [Adapty'ye Uygulama İçi Satın Alma anahtarı ekleyin](generate-in-app-purchase-key#add-the-key-to-adapty) sayfasına bakın. |
| missingOfferParams | 13 | <p>Bu hata, Adapty entegrasyonunda veya tekliflerde sorunlar olduğunu gösterir.</p><p>Nasıl yapılandırılacağına ilişkin ayrıntılar için [App Store entegrasyonunu yapılandırın](app-store-connection-configuration) ve [Teklifler](offers) sayfalarına bakın.</p> |
| invalidOfferPrice | 14 | Bu hata kodu, mağazada belirttiğiniz fiyatın artık geçerli olmadığını gösterir. Teklifler her zaman indirimli bir fiyatı temsil etmelidir. |

## Özel Android Kodları \{#custom-android-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| adaptyNotInitialized | 20 | Adapty SDK'yı `activate` metoduyla düzgün şekilde yapılandırmanız gerekiyor. Nasıl yapılacağını öğrenmek için [Adapty SDK'yı yükleyin ve yapılandırın](sdk-installation-capacitor) sayfasına bakın. |
| productNotFound | 22 | Bu hata, satın alma için istenen ürünün mağazada mevcut olmadığını gösterir. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | Yenilenmesi gereken orijinal abonelik geçmişte bulunamadı. |
| billingServiceTimeout | 97 | Bu hata, Google Play yanıt vermeden önce isteğin maksimum zaman aşımına ulaştığını gösterir. Bu durum, örneğin Play Billing Library çağrısının istediği işlemin yürütülmesindeki bir gecikme nedeniyle oluşabilir. |
| featureNotSupported | 98 | İstenen özellik, mevcut cihazda Play Store tarafından desteklenmiyor. |
| billingServiceDisconnected | 99 | Bu kritik hata, istemci uygulamasının `BillingClient` aracılığıyla Google Play Store hizmetiyle olan bağlantısının kesildiğini gösterir. |
| billingServiceUnavailable | 102 | Bu geçici hata, Google Play Billing hizmetinin şu anda kullanılamadığını gösterir. Çoğu durumda bu, istemci cihaz ile Google Play Billing hizmetleri arasında bir ağ bağlantısı sorunu olduğu anlamına gelir. |
| billingUnavailable | 103 | <p>Bu hata, satın alma işlemi sırasında kullanıcı faturalandırma hatası oluştuğunu gösterir. Bu durumun yaşanabileceği örnekler:</p><p></p><p>1\. Kullanıcının cihazındaki Play Store uygulaması güncel değil.</p><p>2. Kullanıcı desteklenmeyen bir ülkede.</p><p>3. Kullanıcı bir kurumsal kullanıcı ve kurumsal yöneticisi satın alma yapılmasını devre dışı bırakmış.</p><p>4. Google Play, kullanıcının ödeme yönteminden ücret alamıyor. Örneğin kullanıcının kredi kartının süresi dolmuş olabilir.</p><p>5. Kullanıcı Play Store uygulamasında oturum açmamış.</p> |
| developerError | 105 | Bu, bir API'yi hatalı kullandığınızı gösteren kritik bir hatadır. |
| billingError | 106 | Bu, Google Play'in kendisinde dahili bir sorun olduğunu gösteren kritik bir hatadır. |
| itemAlreadyOwned | 107 | Consumable ürün zaten satın alınmış. |
| itemNotOwned | 108 | Bu hata, öğe üzerinde istenen işlemin başarısız olduğunu gösterir. |
| billingNetworkError | 112 | Bu hata, cihaz ile Play sistemleri arasındaki ağ bağlantısında bir sorun oluştuğunu gösterir. |


## Özel StoreKit Kodları \{#custom-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>Bu hata, paywall'daki ürünlerin hiçbirinin mağazada mevcut olmadığını gösterir.</p><p>Bu hatayla karşılaşıyorsanız çözmek için aşağıdaki adımları izleyin:</p><p></p><p>1. Tüm ürünlerin Adapty Kontrol Paneli'ne eklendiğini kontrol edin.</p><p>2. Uygulamanızın Bundle ID'sinin Apple Connect'tekiyle eşleştiğinden emin olun.</p><p>3. Uygulama mağazalarındaki ürün tanımlayıcılarının Kontrol Paneli'ne eklediğinizlerle eşleştiğini doğrulayın. Tanımlayıcıların, mağazada zaten dahil değilse Bundle ID içermemesi gerektiğini unutmayın.</p><p>4. Apple vergi ayarlarınızda uygulamanın ücretli durumunun aktif olduğunu onaylayın. Vergi bilgilerinizin güncel ve sertifikalarınızın geçerli olduğundan emin olun.</p><p>5. Uygulamaya bir banka hesabı bağlı olup olmadığını kontrol edin; bu, uygulamanın para kazanmaya uygun olması için gereklidir.</p><p>6. Ürünlerin tüm bölgelerde mevcut olup olmadığını kontrol edin. Ayrıca ürünlerinizin **"Ready to Submit"** durumunda olduğundan emin olun.</p> |
| productRequestFailed | 1002 | <p>Şu anda mevcut ürünler alınamıyor. Olası neden:</p><p></p><p>- Henüz önbellek oluşturulmamış ve aynı anda internet bağlantısı yok.</p> |
| cantMakePayments | 1003 | Bu cihazda Uygulama İçi Satın Almalara izin verilmiyor. |
| noPurchasesToRestore | 1004 | Bu hata, Google Play'in geri yüklenecek satın almayı bulamadığını gösterir. |
| cantReadReceipt | 1005 | <p>Cihazda geçerli bir makbuz bulunmuyor. Bu durum sandbox testleri sırasında sorun yaratabilir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcınıza indirim teklif edebilir veya daha sonra hatırlatabilirsiniz.</p> |
| productPurchaseFailed | 1006 | Ürün satın alımı başarısız oldu. Bu hata, temel bir StoreKit hatasını sarmalamaktadır — gerçek nedeni görmek için sarmalanmış hatayı okuyun (veya konsolda görmek için ayrıntılı logları etkinleştirin). Sarmalanmış hata genellikle yukarıdaki tablodaki 0–14 arasındaki StoreKit kodlarından biridir; en sık görülenler `paymentCancelled`, `paymentInvalid`, `paymentNotAllowed` veya `invalidOfferPrice`'tır. Belirli bir neden tespit edemiyorsanız yeni bir [sandbox profili](test-purchases-in-sandbox) deneyin; sorun devam ederse Apple desteğiyle iletişime geçin. |
| refreshReceiptFailed | 1010 | Bu hata, makbuzun alınamadığını gösterir. Yalnızca StoreKit 1 için geçerlidir. |
| receiveRestoredTransactionsFailed | 1011 | Satın alma geri yükleme başarısız oldu. |


## Özel Ağ Kodları \{#custom-network-codes\}

| Hata                | Kod | Açıklama                                                  |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | Adapty SDK'yı `activate` metoduyla düzgün şekilde yapılandırmanız gerekiyor. Nasıl yapılacağını öğrenmek için [Adapty SDK'yı yükleyin ve yapılandırın](sdk-installation-capacitor) sayfasına bakın. |
| badRequest           | 2003 | Hatalı istek.                                                 |
| serverError          | 2004 | Sunucu hatası.                                                |
| networkFailed        | 2005 | Ağ isteği başarısız oldu.                                  |
| decodingFailed       | 2006 | Bu hata, yanıt kod çözmenin başarısız olduğunu gösterir.          |
| encodingFailed       | 2009 | Bu hata, istek kodlamanın başarısız olduğunu gösterir.           |
| analyticsDisabled    | 3000 | Analytics olaylarını işleyemiyoruz; çünkü bu özelliği devre dışı bıraktınız. Ayrıntılar için [Analytics entegrasyonu](analytics-integration) konusuna bakın. |
| wrongParam           | 3001 | Bu hata, bazı parametrelerinizin doğru olmadığını gösterir: boş bırakılmaması gereken yerler boş veya yanlış tür gibi durumlar. |
| activateOnceError    | 3005 | `.activate` metodunu birden fazla kez çağırmak mümkün değil. |
| profileWasChanged    | 3006 | İşlem sırasında kullanıcı profili değiştirildi.           |
| unsupportedData      | 3007 | Bu hata, veri formatının SDK tarafından desteklenmediğini gösterir. |
| persistingDataError  | 3100 | Veri kaydedilirken bir hata oluştu.                           |
| fetchTimeoutError    | 3101 | Bu hata, paywall'ın belirlenen süre içinde alınamadığı anlamına gelir. Bu durumdan kaçınmak için [yerel yedekler ayarlayın](fetch-paywalls-and-products). |
| operationInterrupted | 9000 | Bu işlem sistem tarafından kesintiye uğratıldı.                |