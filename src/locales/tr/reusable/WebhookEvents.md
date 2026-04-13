| Event name | Description |
|:-----------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| subscription_started | Kullanıcı deneme süresi olmaksızın ücretli bir abonelik etkinleştirdiğinde, yani anında ücretlendirildiğinde tetiklenir. |
| subscription_renewed | Abonelik yenilendiğinde ve kullanıcı ücretlendirildiğinde gerçekleşir. Bu olay, deneme süreli veya deneme süresiz aboneliklerde ikinci ödemeden itibaren başlar. |
| subscription_renewal_cancelled | Kullanıcı abonelik otomatik yenilemesini kapattığında tetiklenir. Kullanıcı, ücretli abonelik süresi sonuna kadar premium özelliklere erişmeye devam eder. |
| subscription_renewal_reactivated | Kullanıcı abonelik otomatik yenilemesini yeniden etkinleştirdiğinde tetiklenir. |
| subscription_expired | İptal edilen bir abonelik tamamen sona erdiğinde tetiklenir. Örneğin, kullanıcı aboneliğini 12 Aralık'ta iptal etmiş ancak abonelik 31 Aralık'a kadar aktif kalmaya devam ediyorsa, olay aboneliğin sona erdiği 31 Aralık'ta kaydedilir. |
| subscription_paused | Kullanıcı [abonelik duraklatma](https://developer.android.com/google/play/billing/lifecycle/subscriptions#pause) özelliğini etkinleştirdiğinde gerçekleşir (yalnızca Android). |
| subscription_deferred | Abonelik satın alımı [ertelendiğinde](https://adapty.io/glossary/subscription-purchase-deferral/) tetiklenir; kullanıcılar premium özelliklere erişimlerini sürdürürken ödemeyi geciktirebilir. Bu özellik Google Play Developer API aracılığıyla kullanılabilir ve ücretsiz denemeler için ya da mali güçlük yaşayan kullanıcılara destek sağlamak amacıyla kullanılabilir. |
| non_subscription_purchase | Süresiz erişim veya oyun içi coin gibi consumable ürünler dahil, abonelik dışındaki tüm satın almalar. |
| trial_started | Kullanıcı deneme aboneliği etkinleştirdiğinde tetiklenir. |
| trial_converted | Deneme süresi sona erdiğinde ve kullanıcı ücretlendirildiğinde (ilk satın alma) gerçekleşir. Örneğin, kullanıcının denemesi 14 Ocak'a kadar sürüyor ancak 7 Ocak'ta ücretlendiriliyorsa, bu olay 7 Ocak'ta kaydedilir. |
| trial_renewal_cancelled | Kullanıcı deneme süresi boyunca abonelik otomatik yenilemesini kapattığında tetiklenir. Kullanıcı deneme süresi sonuna kadar premium özelliklere erişmeye devam eder; ancak ücretlendirilmez ve abonelik başlatılmaz. |
| trial_renewal_reactivated | Kullanıcı deneme süresi boyunca abonelik otomatik yenilemesini yeniden etkinleştirdiğinde gerçekleşir. |
| trial_expired | Deneme süresi aboneliğe dönüşmeden sona erdiğinde tetiklenir. |
| entered_grace_period | Ödeme girişimi başarısız olduğunda ve kullanıcı ek süreye girdiğinde gerçekleşir (etkinleştirilmişse). Kullanıcı bu süre boyunca premium erişimini korur. |
| billing_issue_detected | Ücretlendirme girişimi sırasında bir ödeme sorunu oluştuğunda (örn. yetersiz kart bakiyesi) tetiklenir. |
| subscription_refunded | Bir abonelik iade edildiğinde (örn. Apple Support tarafından) tetiklenir. |
| non_subscription_purchase_refunded | Abonelik dışı bir satın alma iade edildiğinde tetiklenir. |
| access_level_updated | Kullanıcının access level'ı güncellendiğinde gerçekleşir. |