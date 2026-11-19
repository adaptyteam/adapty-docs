
## Sistem StoreKit Kodları \{#system-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| unknown | 0 | Bu hata, bilinmeyen veya beklenmedik bir hata oluştuğunu gösterir. |
| clientInvalid | 1 | Bu hata kodu, istemcinin gerçekleştirmeye çalıştığı işleme izin verilmediğini gösterir. |
| paymentCancelled | 2 | <p>Bu hata kodu, kullanıcının ödeme isteğini iptal ettiğini gösterir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcınıza bir indirim teklif edebilir veya daha sonra hatırlatabilirsiniz.</p> |
| paymentInvalid | 3 | Bu hata, ödeme parametrelerinden birinin mağaza tarafından tanınmadığını gösterir. |
| paymentNotAllowed | 4 | <p>Bu hata kodu, kullanıcının ödeme yapmasına izin verilmediğini gösterir. Olası nedenler:</p><p></p><p>- Ödemeler, kullanıcının ülkesinde desteklenmiyor.</p><p>- Kullanıcı reşit değil.</p> |
| storeProductNotAvailable | 5 | Bu hata kodu, istenen ürünün App Store'da mevcut olmadığını gösterir. Ürünün kullanılan ülke için erişilebilir olduğundan emin olun. |
| cloudServicePermissionDenied | 6 | Bu hata kodu, kullanıcının Cloud servis bilgilerine erişime izin vermediğini gösterir. |
| cloudServiceNetworkConnectionFailed | 7 | Bu hata kodu, cihazın ağa bağlanamadığını gösterir. |
| cloudServiceRevoked | 8 | Bu hata kodu, kullanıcının bu cloud servisini kullanma iznini iptal ettiğini gösterir. |
| privacyAcknowledgementRequired | 9 | Bu hata kodu, kullanıcının mağaza gizlilik politikasını henüz onaylamadığını gösterir. |
| unauthorizedRequestData | 10 | Bu hata kodu, isteğin hatalı oluşturulduğunu gösterir. |
| invalidOfferIdentifier | 11 | <p>Teklif tanımlayıcısı geçerli değil. Olası nedenler:</p><p></p><p>- App Store'da bu tanımlayıcıyla bir teklif oluşturmadınız.</p><p>- Teklifi iptal ettiniz.</p><p>- Teklif ID'sini yanlış yazdınız.</p> |
| invalidSignature | 12 | Bu hata kodu, ödeme indirimindeki imzanın geçerli olmadığını gösterir. **Subscription key ID** alanını doldurduğunuzdan ve **App Store promotional offers** bölümüne **Subscription key (.p8 file)** yüklediğinizden emin olun. Ayrıntılar için [Adapty'ye Uygulama İçi Satın Alma anahtarı ekleme](generate-in-app-purchase-key#add-the-key-to-adapty) sayfasına bakın. |
| missingOfferParams | 13 | <p>Bu hata, Adapty entegrasyonunda veya tekliflerde sorun olduğunu gösterir.</p><p>Nasıl yapılandırılacağına dair ayrıntılar için [App Store entegrasyonunu yapılandırma](app-store-connection-configuration) ve [Teklifler](offers) sayfalarına bakın.</p> |
| invalidOfferPrice | 14 | Bu hata kodu, mağazada belirttiğiniz fiyatın artık geçerli olmadığını gösterir. Teklifler her zaman indirimli bir fiyatı temsil etmelidir. |

## Özel Android Kodları \{#custom-android-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| adaptyNotInitialized | 20 | Adapty SDK'yı `activate` metoduyla düzgün şekilde yapılandırmanız gerekir. Nasıl yapılacağını öğrenmek için [Adapty SDK'yı yükle ve yapılandır](sdk-installation-capacitor) sayfasına bakın. |
| productNotFound | 22 | Bu hata, satın alma için istenen ürünün mağazada mevcut olmadığını gösterir. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | Yenilenmesi gereken orijinal abonelik geçmişte bulunamadı. |
| billingServiceTimeout | 97 | Bu hata, Google Play yanıt vermeden önce isteğin maksimum zaman aşımına ulaştığını gösterir. Bu durum, örneğin Play Billing Library çağrısının istediği işlemin gecikmesiyle oluşabilir. |
| featureNotSupported | 98 | İstenen özellik, mevcut cihazda Play Store tarafından desteklenmiyor. |
| billingServiceDisconnected | 99 | Bu kritik hata, istemci uygulamasının `BillingClient` aracılığıyla Google Play Store hizmetine olan bağlantısının kesildiğini gösterir. |
| billingServiceUnavailable | 102 | Bu geçici hata, Google Play Billing hizmetinin şu anda kullanılamadığını gösterir. Çoğu durumda, istemci cihaz ile Google Play Billing hizmetleri arasında bir ağ bağlantısı sorunu olduğu anlamına gelir. |
| billingUnavailable | 103 | <p>Bu hata, satın alma işlemi sırasında kullanıcıyla ilgili bir faturalandırma hatası oluştuğunu gösterir. Örnekler:</p><p></p><p>1\. Kullanıcının cihazındaki Play Store uygulaması güncel değil.</p><p>2. Kullanıcı desteklenmeyen bir ülkede.</p><p>3. Kullanıcı bir kurumsal kullanıcı ve kurumsal yöneticisi satın alma işlemlerini devre dışı bırakmış.</p><p>4. Google Play, kullanıcının ödeme yönteminden ücret alamıyor. Örneğin, kullanıcının kredi kartının süresi dolmuş olabilir.</p><p>5. Kullanıcı Play Store uygulamasında oturum açmamış.</p> |
| developerError | 105 | Bu, bir API'yi hatalı kullandığınızı gösteren kritik bir hatadır. |
| billingError | 106 | Bu, Google Play'in kendisinde dahili bir sorun olduğunu gösteren kritik bir hatadır. |
| itemAlreadyOwned | 107 | Consumable ürün zaten satın alınmış. |
| itemNotOwned | 108 | Bu hata, öğe üzerinde istenen işlemin başarısız olduğunu gösterir. |
| billingNetworkError | 112 | Bu hata, cihaz ile Play sistemleri arasındaki ağ bağlantısında bir sorun olduğunu gösterir. |


## Özel StoreKit Kodları \{#custom-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>Bu hata, paywall'daki ürünlerin hiçbirinin mağazada mevcut olmadığını gösterir.</p><p>Bu hatayla karşılaşıyorsanız çözmek için aşağıdaki adımları izleyin:</p><p></p><p>1. Tüm ürünlerin Adapty Kontrol Paneli'ne eklenip eklenmediğini kontrol edin.</p><p>2. Uygulamanızın Bundle ID'sinin Apple Connect'tekiyle eşleştiğinden emin olun.</p><p>3. Uygulama mağazalarındaki ürün tanımlayıcılarının Kontrol Paneli'ne eklediğinizlerle eşleştiğini doğrulayın. Tanımlayıcıların mağazada zaten dahil değilse Bundle ID içermemesi gerektiğini unutmayın.</p><p>4. Apple vergi ayarlarında uygulama ücretli durumunun aktif olduğunu onaylayın. Vergi bilgilerinizin güncel olduğundan ve sertifikalarınızın geçerli olduğundan emin olun.</p><p>5. Uygulamaya bir banka hesabının bağlı olup olmadığını kontrol edin; bu, uygulamanın para kazanmaya uygun olması için gereklidir.</p><p>6. Ürünlerin tüm bölgelerde mevcut olup olmadığını kontrol edin. Ayrıca ürünlerinizin **"Ready to Submit"** durumunda olduğundan emin olun.</p> |
| productRequestFailed | 1002 | <p>Şu anda mevcut ürünler alınamıyor. Olası neden:</p><p></p><p>- Henüz önbellek oluşturulmamış ve aynı anda internet bağlantısı yok.</p> |
| cantMakePayments | 1003 | Bu cihazda Uygulama İçi Satın Alma işlemlerine izin verilmiyor. |
| noPurchasesToRestore | 1004 | Bu hata, Google Play'in geri yüklenecek satın alma işlemi bulamadığını gösterir. |
| cantReadReceipt | 1005 | <p>Cihazda geçerli bir makbuz mevcut değil. Bu durum sandbox testleri sırasında bir sorun olabilir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcınıza bir indirim teklif edebilir veya daha sonra hatırlatabilirsiniz.</p> |
| productPurchaseFailed | 1006 | Ürün satın alma başarısız oldu. Bu hata, altta yatan bir StoreKit hatasını kapsar — gerçek nedeni görmek için sarılmış hatayı okuyun (veya konsolda görmek için ayrıntılı logları etkinleştirin). Sarılmış hata genellikle yukarıdaki tablodaki 0–14 arası StoreKit kodlarından biridir; en yaygın olanlar `paymentCancelled`, `paymentInvalid`, `paymentNotAllowed` veya `invalidOfferPrice`'dır. Belirli bir neden tespit edemiyorsanız yeni bir [sandbox profili](test-purchases-in-sandbox) deneyin; sorun devam ederse Apple desteğine başvurun. |
| refreshReceiptFailed | 1010 | Bu hata, makbuzun alınamadığını gösterir. Yalnızca StoreKit 1 için geçerlidir. |
| receiveRestoredTransactionsFailed | 1011 | Satın alma geri yükleme başarısız oldu. |
| billingPlanUnavailable | 1060 | Yalnızca iOS, SDK 4.3.0+. Ürün, bu cihazda veya bu mağazada istenen faturalandırma planını sunmuyor. [12 aylık taahhüt](app-store-12-month-commitment) planı, iOS 26.4 veya üstünü ve Xcode 26.5 veya üstüyle oluşturulmuş bir uygulama gerektirir. |


## Özel Ağ Kodları \{#custom-network-codes\}

| Hata                | Kod | Açıklama                                                  |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | Adapty SDK'yı `activate` metoduyla düzgün şekilde yapılandırmanız gerekir. Nasıl yapılacağını öğrenmek için [Adapty SDK'yı yükle ve yapılandır](sdk-installation-capacitor) sayfasına bakın. |
| badRequest           | 2003 | Hatalı istek.                                                 |
| serverError          | 2004 | Sunucu hatası.                                                |
| networkFailed        | 2005 | Ağ isteği başarısız oldu.                                  |
| decodingFailed       | 2006 | Bu hata, yanıt kod çözümünün başarısız olduğunu gösterir.          |
| encodingFailed       | 2009 | Bu hata, istek kodlamasının başarısız olduğunu gösterir.           |
| analyticsDisabled    | 3000 | Analytics olaylarını işleyemiyoruz; çünkü bunu devre dışı bıraktınız. Ayrıntılar için [Analytics entegrasyonu](analytics-integration) konusuna bakın. |
| wrongParam           | 3001 | Bu hata, bazı parametrelerinizin doğru olmadığını gösterir: boş bırakılamayacak bir alan boş veya yanlış tür gibi. |
| activateOnceError    | 3005 | `.activate` metodunu birden fazla kez çağırmak mümkün değildir. |
| profileWasChanged    | 3006 | İşlem sırasında kullanıcı profili değiştirildi.           |
| unsupportedData      | 3007 | Bu hata, veri biçiminin SDK tarafından desteklenmediğini gösterir. |
| persistingDataError  | 3100 | Veri kaydedilirken bir hata oluştu.                           |
| fetchTimeoutError    | 3101 | Bu hata, paywall'ın belirlenen süre içinde alınamadığı anlamına gelir. Bu durumdan kaçınmak için [yerel yedekler ayarlayın](fetch-paywalls-and-products). |
| operationInProgress  | 3201 | Yalnızca iOS, SDK 4.3.0+. Önceki bir çağrı hâlâ [mağaza mesajlarını](capacitor-store-messages) gösterirken `showStoreMessages` tarafından döndürülür. Tamamlanmasını bekleyin, ardından tekrar deneyin. |
| resolverFailure      | 3202 | Yalnızca iOS, SDK 4.3.0+. Ön planda aktif pencere sahnesi yokken `showStoreMessages` tarafından döndürülür. Uygulama ön plandayken metodu tekrar çağırın. |
| operationInterrupted | 9000 | Bu işlem sistem tarafından kesintiye uğratıldı.                |