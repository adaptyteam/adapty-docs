## Sistem StoreKit Kodları \{#system-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| unknown | 0 | Bilinmeyen veya beklenmedik bir hata oluştuğunu belirtir. |
| clientInvalid | 1 | İstemcinin denediği işlemi gerçekleştirmesine izin verilmediğini belirtir. |
| paymentCancelled | 2 | <p>Kullanıcının ödeme isteğini iptal ettiğini belirtir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcıya indirim teklif edebilir ya da daha sonra hatırlatabilirsiniz.</p> |
| paymentInvalid | 3 | Ödeme parametrelerinden birinin mağaza tarafından tanınmadığını belirtir. |
| paymentNotAllowed | 4 | <p>Kullanıcının ödeme yapmaya yetkili olmadığını belirtir. Olası nedenler:</p><p></p><p>- Ödemeler, kullanıcının ülkesinde desteklenmiyordur.</p><p>- Kullanıcı reşit değildir.</p> |
| storeProductNotAvailable | 5 | İstenen ürünün App Store'da bulunmadığını belirtir. Ürünün ilgili ülkede kullanılabilir olduğundan emin olun. |
| cloudServicePermissionDenied | 6 | Kullanıcının Cloud hizmeti bilgilerine erişime izin vermediğini belirtir. |
| cloudServiceNetworkConnectionFailed | 7 | Cihazın ağa bağlanamadığını belirtir. |
| cloudServiceRevoked | 8 | Kullanıcının bu bulut hizmetini kullanma iznini iptal ettiğini belirtir. |
| privacyAcknowledgementRequired | 9 | Kullanıcının mağaza gizlilik politikasını henüz onaylamadığını belirtir. |
| unauthorizedRequestData | 10 | İsteğin hatalı oluşturulduğunu belirtir. |
| invalidOfferIdentifier | 11 | <p>Teklif tanımlayıcısı geçerli değil. Olası nedenler:</p><p></p><p>- App Store'da bu tanımlayıcıyla bir teklif oluşturmamışsınızdır.</p><p>- Teklifi iptal etmişsinizdir.</p><p>- Teklif kimliğini yanlış yazmışsınızdır.</p> |
| invalidSignature | 12 | Ödeme indirimindeki imzanın geçersiz olduğunu belirtir. **In-app purchase Key ID** alanını doldurduğunuzdan ve **In-App Purchase Private Key** dosyasını yüklediğinizden emin olun. Ayrıntılar için [App Store entegrasyonunu yapılandırma](app-store-connection-configuration) konusuna bakın. |
| missingOfferParams | 13 | <p>Bu hata, Adapty entegrasyonunda veya tekliflerde sorun olduğunu gösterir.</p><p>Kurulum hakkında ayrıntılı bilgi için [App Store entegrasyonunu yapılandırma](app-store-connection-configuration) ve [Teklifler](offers) konularına bakın.</p> |
| invalidOfferPrice | 14 | Mağazada belirttiğiniz fiyatın artık geçerli olmadığını belirtir. Teklifler her zaman indirimli bir fiyatı yansıtmalıdır. |

## Özel Android Kodları \{#custom-android-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| adaptyNotInitialized | 20 | Adapty SDK'yı `Adapty.activate` metoduyla doğru şekilde yapılandırmanız gerekiyor. [React Native için](sdk-installation-reactnative) nasıl yapılacağını öğrenin. |
| productNotFound | 22 | Satın alınmak istenen ürünün mağazada mevcut olmadığını belirtir. |
| invalidJson | 23 | Paywall JSON'ı geçerli değil. Adapty Kontrol Paneli'nde düzeltin. Nasıl düzelteceğiniz hakkında ayrıntılı bilgi için [Paywall'u remote config ile özelleştirme](customize-paywall-with-remote-config) konusuna bakın. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | Yenilenmesi gereken orijinal abonelik bulunamadı. |
| pendingPurchase | 25 | Satın alma durumunun tamamlanmış değil, beklemede olduğunu belirtir. Ayrıntılar için Android Developer belgelerindeki [Beklemedeki işlemleri yönetme](https://developer.android.com/google/play/billing/integrate#pending) sayfasına bakın. |
| billingServiceTimeout | 97 | İstek, Google Play yanıt veremeden önce maksimum zaman aşımına ulaştığında bu hata oluşur. Örneğin Play Billing Library çağrısının talep ettiği işlemin yürütülmesindeki bir gecikme bu duruma yol açabilir. |
| featureNotSupported | 98 | İstenen özellik, geçerli cihazda Play Store tarafından desteklenmiyor. |
| billingServiceDisconnected | 99 | İstemci uygulamasının `BillingClient` üzerinden Google Play Store hizmetiyle kurduğu bağlantının kesildiğini belirten önemli bir hatadır. |
| billingServiceUnavailable | 102 | Google Play Billing hizmetinin şu anda kullanılamadığını belirten geçici bir hatadır. Çoğu durumda, istemci cihaz ile Google Play Billing hizmetleri arasında bir ağ bağlantısı sorunu vardır. |
| billingUnavailable | 103 | <p>Satın alma sürecinde kullanıcı kaynaklı bir faturalama hatası oluştuğunu belirtir. Bu hatanın oluşabileceği durumlar:</p><p></p><p>1\. Kullanıcının cihazındaki Play Store uygulaması güncel değildir.</p><p>2. Kullanıcı desteklenmeyen bir ülkededir.</p><p>3. Kullanıcı kurumsal bir kullanıcıdır ve kurumsal yöneticisi satın almaları devre dışı bırakmıştır.</p><p>4. Google Play, kullanıcının ödeme yöntemini tahsil edememektedir. Örneğin, kullanıcının kredi kartının süresi dolmuş olabilir.</p><p>5. Kullanıcı Play Store uygulamasında oturum açmamıştır.</p> |
| developerError | 105 | Bir API'nin yanlış kullanıldığını gösteren önemli bir hatadır. |
| billingError | 106 | Google Play'in kendi içinde bir sorun olduğunu gösteren önemli bir hatadır. |
| itemAlreadyOwned | 107 | Consumable ürün zaten satın alınmış. |
| itemNotOwned | 108 | İstenen öğe üzerindeki işlemin başarısız olduğunu belirtir. |


## Özel StoreKit Kodları \{#custom-storekit-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>Paywall'daki ürünlerin hiçbirinin mağazada mevcut olmadığını belirtir.</p><p>Bu hatayla karşılaşıyorsanız çözmek için aşağıdaki adımları izleyin:</p><p></p><p>1. Tüm ürünlerin Adapty Kontrol Paneli'ne eklendiğini kontrol edin.</p><p>2. Uygulamanızın Bundle ID'sinin Apple Connect'tekiyle eşleştiğinden emin olun.</p><p>3. Uygulama mağazalarındaki ürün tanımlayıcılarının Kontrol Paneli'ne eklediğinizle eşleştiğini doğrulayın. Tanımlayıcıların, mağazada zaten dahil değilse Bundle ID içermemesi gerektiğini unutmayın.</p><p>4. Apple vergi ayarlarında uygulama ücretli durumunun etkin olduğunu onaylayın. Vergi bilgilerinizin güncel ve sertifikalarınızın geçerli olduğundan emin olun.</p><p>5. Uygulamanın gelir elde etmeye uygun olması için bir banka hesabının eklendiğini kontrol edin.</p><p>6. Ürünlerin tüm bölgelerde mevcut olduğunu kontrol edin. Ayrıca ürünlerinizin **"Ready to Submit"** durumunda olduğundan emin olun.</p> |
| productRequestFailed | 1002 | <p>Şu anda mevcut ürünler alınamıyor. Olası neden:</p><p></p><p>- Henüz önbellek oluşturulmamış ve aynı anda internet bağlantısı yok.</p> |
| cantMakePayments | 1003 | Bu cihazda uygulama içi satın almalara izin verilmiyor. |
| noPurchasesToRestore | 1004 | Google Play'in geri yüklenecek satın alma bulamadığını belirtir. |
| cantReadReceipt | 1005 | <p>Cihazda geçerli bir makbuz yok. Bu durum sandbox testleri sırasında sorun çıkarabilir.</p><p>Herhangi bir işlem yapmanız gerekmez; ancak iş mantığı açısından kullanıcıya indirim teklif edebilir ya da daha sonra hatırlatabilirsiniz.</p> |
| productPurchaseFailed | 1006 | Ürün satın alma başarısız oldu. |
| refreshReceiptFailed | 1010 | Makbuzun alınamadığını belirtir. Yalnızca StoreKit 1 için geçerlidir. |
| receiveRestoredTransactionsFailed | 1011 | Satın alma geri yükleme başarısız oldu. |


## Özel Ağ Kodları \{#custom-network-codes\}

| Hata | Kod | Açıklama |
|-----|----|-----------|
| notActivated | 2002 | Adapty SDK'yı `Adapty.activate` metoduyla doğru şekilde yapılandırmanız gerekiyor. [React Native için](sdk-installation-reactnative) nasıl yapılacağını öğrenin. |
| badRequest | 2003 | Hatalı istek. |
| serverError | 2004 | Sunucu hatası. |
| networkFailed | 2005 | Ağ isteği başarısız oldu. |
| decodingFailed | 2006 | Yanıt çözümlemesinin başarısız olduğunu belirtir. |
| encodingFailed | 2009 | İstek kodlamasının başarısız olduğunu belirtir. |
| analyticsDisabled | 3000 | Analytics olaylarını devre dışı bıraktığınız için işleyemiyoruz. Ayrıntılar için [Analytics entegrasyonu](analytics-integration) konusuna bakın. |
| wrongParam | 3001 | Parametrelerinizden bazılarının hatalı olduğunu belirtir: boş bırakılamayacak alanlar boş bırakılmış ya da yanlış tür kullanılmıştır vb. |
| activateOnceError | 3005 | `.activate` metodu birden fazla kez çağrılamaz. |
| profileWasChanged | 3006 | İşlem sırasında kullanıcı profili değişti. |
| fetchTimeoutError | 3101 | Paywall belirlenen süre içinde alınamadı. Bu durumu önlemek için [yerel yedekler ayarlayın](fetch-paywalls-and-products). |
| operationInterrupted | 9000 | Bu işlem sistem tarafından kesintiye uğratıldı. |