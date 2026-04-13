---
no_index: true
---

**Etkin (varsayılan)**

Tanımlı kullanıcılar (bir [Müşteri Kullanıcı Kimliği](identifying-users#set-customer-user-id-on-configuration) ile tanımlanmış olanlar), cihazları aynı Apple/Google ID ile oturum açmışsa Adapty tarafından sağlanan aynı [access level](access-level)'ı paylaşabilir. Bu, kullanıcının uygulamayı yeniden yükleyip farklı bir e-postayla giriş yapması durumunda bile önceki satın alımına erişimini koruması açısından kullanışlıdır. Bu seçenekle birden fazla tanımlı kullanıcı aynı access level'ı paylaşabilir.

Access level paylaşılsa da tutarlı analizleri korumak ve deneme süreleri, abonelik satın alımları, yenilemeler ve daha fazlası dahil olmak üzere eksiksiz bir işlem geçmişini aynı profile bağlı tutmak amacıyla tüm geçmiş ve gelecek işlemler, orijinal Müşteri Kullanıcı Kimliğinde etkinlik olarak kaydedilir.

**Erişimi yeni kullanıcıya aktar**

Tanımlı kullanıcılar, cihazları aynı Apple/Google ID ile oturum açtığı sürece farklı bir [Müşteri Kullanıcı Kimliği](identifying-users#set-customer-user-id-on-configuration) ile giriş yapsalar veya uygulamayı yeniden yükleseler bile Adapty tarafından sağlanan [access level](access-level)'a erişmeye devam edebilir.

Önceki seçenekten farklı olarak Adapty, satın alımı tanımlı kullanıcılar arasında aktarır. Bu sayede satın alınan içeriğe erişim sağlanır; ancak aynı anda yalnızca bir kullanıcı erişime sahip olabilir. Örneğin, KullanıcıA bir abonelik satın alırsa ve KullanıcıB aynı cihazda oturum açarak işlemleri geri yüklerse, KullanıcıB aboneliğe erişim kazanır ve KullanıcıA'nın erişimi iptal edilir.

Kullanıcılardan biri (yeni ya da eski) tanımlı değilse, access level Adapty'deki bu profiller arasında yine de paylaşılır.

Access level aktarılsa da tutarlı analizleri korumak ve deneme süreleri, abonelik satın alımları, yenilemeler ve daha fazlası dahil olmak üzere eksiksiz bir işlem geçmişini aynı profile bağlı tutmak amacıyla tüm geçmiş ve gelecek işlemler, orijinal Müşteri Kullanıcı Kimliğinde etkinlik olarak kaydedilir.

**Erişimi yeni kullanıcıya aktar** seçeneğine geçtikten sonra access level'lar profiller arasında hemen aktarılmaz. Belirli bir access level için aktarım süreci, yalnızca Adapty mağazadan abonelik yenileme, geri yükleme veya işlem doğrulama gibi bir etkinlik aldığında tetiklenir.

**Devre dışı**

Bir access level'a ilk ulaşan tanımlı kullanıcı profili, bu erişimi sonsuza kadar korur. İş mantığınız satın alımların tek bir Müşteri Kullanıcı Kimliğine bağlı olmasını gerektiriyorsa bu en uygun seçenektir.

Anonim kullanıcılar arasında access level'ların paylaşılmaya devam ettiğini unutmayın.

[Sahip kullanıcı profilini silerek](ss-delete-profile) bir satın alımı "bağlantısından koparabilirsiniz". Silme işleminin ardından access level, ister anonim ister tanımlı olsun, onu talep eden ilk kullanıcı profiline açık hale gelir.

Paylaşımı devre dışı bırakmak yalnızca yeni kullanıcıları etkiler. Kullanıcılar arasında zaten paylaşılmış olan abonelikler, bu seçenek devre dışı bırakıldıktan sonra da paylaşılmaya devam eder.

:::warning

Apple ve Google, uygulama içi satın alımların satın alımı Apple/Google ID ile ilişkilendirdiğinden kullanıcılar arasında paylaşılmasını veya aktarılmasını zorunlu kılar. Paylaşım olmadan, sonraki yeniden yüklemelerde satın alımları geri yüklemek çalışmayabilir.

Paylaşımı devre dışı bırakmak, kullanıcıların giriş yaptıktan sonra erişimlerini yeniden kazanamamasına yol açabilir.

Paylaşımı yalnızca kullanıcılarınızın satın alım yapmadan önce **giriş yapmak zorunda olduğu** durumlarda devre dışı bırakmanızı öneririz. Aksi takdirde tanımlı bir kullanıcı abonelik satın alıp başka bir hesaba giriş yapabilir ve erişimini kalıcı olarak kaybedebilir.
:::

### Hangi ayarı seçmeliyim? \{#which-setting-should-i-choose\}

| Uygulamam...                                                    | Seçilecek seçenek                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Giriş sistemi yok ve yalnızca Adapty'nin anonim profil ID'lerini kullanıyor. | Varsayılan seçeneği kullanın; zira her üç seçenekte de access level'lar anonim profil ID'leri arasında her zaman paylaşılır. |
| İsteğe bağlı bir giriş sistemi var ve müşterilerin hesap oluşturmadan önce satın alım yapmasına izin veriyor. | Hesap oluşturmadan satın alım yapan müşterilerin işlemlerini daha sonra geri yükleyebilmesini sağlamak için **Erişimi yeni kullanıcıya aktar** seçeneğini tercih edin. |
| Satın alım yapmadan önce hesap oluşturmayı zorunlu kılıyor ancak satın alımların birden fazla Müşteri Kullanıcı Kimliğine bağlanmasına izin veriyor. | Aynı anda yalnızca bir Müşteri Kullanıcı Kimliğinin erişime sahip olmasını sağlarken kullanıcıların ücretli erişimlerini kaybetmeden farklı bir Müşteri Kullanıcı Kimliğiyle giriş yapabilmesine olanak tanımak için **Erişimi yeni kullanıcıya aktar** seçeneğini tercih edin. |
| Satın alım yapmadan önce hesap oluşturmayı zorunlu kılıyor ve satın alımları tek bir Müşteri Kullanıcı Kimliğine bağlayan katı kurallara sahip. | İşlemlerin hesaplar arasında hiçbir zaman aktarılmamasını sağlamak için **Devre dışı** seçeneğini tercih edin. |