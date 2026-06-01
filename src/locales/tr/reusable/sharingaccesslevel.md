**Etkin (varsayılan)**

Kimliği belirlenmiş kullanıcılar ([Müşteri Kullanıcı Kimliği](identifying-users#set-customer-user-id-on-configuration) atanmış olanlar), cihazları aynı Apple/Google ID ile oturum açmışsa Adapty tarafından sağlanan aynı [access level](access-level)'ı paylaşabilir. Bu, kullanıcının uygulamayı yeniden yükleyip farklı bir e-posta ile giriş yapması durumunda bile önceki satın alımına erişimini korumasını sağlar. Bu seçenekte birden fazla kimliği belirlenmiş kullanıcı aynı access level'ı paylaşabilir.

Access level paylaşılıyor olsa da tüm geçmiş ve gelecekteki işlemler; deneme süreleri, abonelik satın alımları, yenilemeler ve daha fazlası dahil olmak üzere tutarlı bir analitik ve eksiksiz bir işlem geçmişi sağlamak amacıyla orijinal Müşteri Kullanıcı Kimliği'nde olay olarak kaydedilir ve aynı profile bağlı kalır.

**Erişimi yeni kullanıcıya aktar**

Kimliği belirlenmiş kullanıcılar, farklı bir [Müşteri Kullanıcı Kimliği](identifying-users#set-customer-user-id-on-configuration) ile giriş yapsalar veya uygulamayı yeniden yükleseler bile, cihazları aynı Apple/Google ID ile oturum açık olduğu sürece Adapty tarafından sağlanan [access level](access-level)'a erişmeye devam edebilir.

Önceki seçenekten farklı olarak Adapty, satın alımı kimliği belirlenmiş kullanıcılar arasında aktarır. Bu sayede satın alınan içeriğe erişim sağlanır; ancak aynı anda yalnızca bir kullanıcı erişime sahip olabilir. Örneğin, KullanıcıA bir abonelik satın alır ve KullanıcıB aynı cihazda oturum açarak işlemleri geri yüklerse KullanıcıB aboneliğe erişim kazanırken KullanıcıA'nın erişimi iptal edilir.

Kullanıcılardan biri (yeni veya eski) kimliği belirlenmemişse, access level yine de Adapty'deki bu profiller arasında paylaşılmaya devam eder.

Access level aktarılıyor olsa da tüm geçmiş ve gelecekteki işlemler; deneme süreleri, abonelik satın alımları, yenilemeler ve daha fazlası dahil olmak üzere tutarlı bir analitik ve eksiksiz bir işlem geçmişi sağlamak amacıyla orijinal Müşteri Kullanıcı Kimliği'nde olay olarak kaydedilir ve aynı profile bağlı kalır.

**Erişimi yeni kullanıcıya aktar** seçeneğine geçtikten sonra, access level'lar profiller arasında hemen aktarılmaz. Belirli bir access level için aktarım süreci; abonelik yenilemesi, geri yükleme veya işlem doğrulama gibi mağazadan bir olay alındığında tetiklenir.

**Devre Dışı**

Bir access level alan ilk kimliği belirlenmiş kullanıcı profili, bu erişimi kalıcı olarak elinde tutar. İş mantığınızın satın alımların tek bir Müşteri Kullanıcı Kimliği'ne bağlı olmasını gerektirdiği durumlarda en uygun seçenektir.

Anonim kullanıcılar arasında access level paylaşımının devam ettiğini unutmayın.

Bir satın alımı "ayırmak" için [kullanıcının profilini silebilirsiniz](https://adapty.io/docs/tr/api-adapty/operations/deleteProfile). Silme işleminin ardından access level, ister anonim ister kimliği belirlenmiş olsun, ilk talep eden kullanıcı profiline açık hale gelir.

Paylaşımı devre dışı bırakmak yalnızca yeni kullanıcıları etkiler. Kullanıcılar arasında zaten paylaşılmakta olan abonelikler, bu seçenek devre dışı bırakıldıktan sonra da paylaşılmaya devam eder.

:::warning

Apple ve Google, uygulama içi satın alımların kullanıcılar arasında paylaşılmasını veya aktarılmasını zorunlu kılar; çünkü satın alımı belirli bir kullanıcıyla ilişkilendirmek için Apple/Google ID'ye güvenirler. Paylaşım olmadan, sonraki yeniden yüklemelerde satın alımların geri yüklenmesi çalışmayabilir.

Paylaşımı devre dışı bırakmak, kullanıcıların giriş yaptıktan sonra erişimi yeniden kazanamamasına neden olabilir.

Paylaşımı yalnızca kullanıcılarınızın satın alma yapmadan önce **giriş yapmasının zorunlu olduğu** durumlarda devre dışı bırakmanızı öneririz. Aksi takdirde, kimliği belirlenmiş bir kullanıcı abonelik satın alıp başka bir hesaba giriş yaparak erişimini kalıcı olarak kaybedebilir.
:::

### Hangi ayarı seçmeliyim? \{#which-setting-should-i-choose\}

| Uygulamam...                                                 | Seçilecek seçenek                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Giriş sistemi yok ve yalnızca Adapty'nin anonim profil ID'lerini kullanıyor. | Access level'lar her üç seçenekte de anonim profil ID'leri arasında her zaman paylaşıldığından varsayılan seçeneği kullanın. |
| İsteğe bağlı giriş sistemine sahip ve müşterilerin hesap oluşturmadan önce satın alım yapmasına izin veriyor. | Hesapsız satın alım yapan müşterilerin işlemlerini daha sonra geri yükleyebilmesini sağlamak için **Erişimi yeni kullanıcıya aktar** seçeneğini belirleyin. |
| Satın alım öncesinde hesap oluşturmayı zorunlu kılıyor ancak satın alımların birden fazla Müşteri Kullanıcı Kimliği'ne bağlanmasına izin veriyor. | Aynı anda yalnızca bir Müşteri Kullanıcı Kimliği'nin erişime sahip olmasını sağlarken kullanıcıların ücretli erişimlerini kaybetmeden farklı bir Müşteri Kullanıcı Kimliği ile giriş yapabilmesine olanak tanımak için **Erişimi yeni kullanıcıya aktar** seçeneğini belirleyin. |
| Satın alım öncesinde hesap oluşturmayı zorunlu kılıyor ve satın alımları tek bir Müşteri Kullanıcı Kimliği'ne bağlayan katı kurallara sahip. | İşlemlerin hesaplar arasında hiçbir zaman aktarılmamasını sağlamak için **Devre Dışı** seçeneğini belirleyin. |