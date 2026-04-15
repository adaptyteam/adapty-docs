| Ad | Zorunlu | Açıklama |
| ---------------- | -------- | ------------------------------------------------------------ |
| store | evet | Uygulama mağazası |
| locale | Hayır | Paywall yerel ayar tanımlayıcısı. Bu parametre, "-" karakteriyle ayrılmış bir veya daha fazla alt etiketten oluşan bir dil kodu olarak beklenir. İlk alt etiket dili, ikincisi bölgeyi belirtir (Bölge desteği daha sonra eklenecektir). Örnek: `en` İngilizce anlamına gelir, `en-US` ABD İngilizcesini temsil eder. Parametre belirtilmezse paywall varsayılan yerel ayarda oluşturulur. |
| placement_id | evet | [Placement](placements) tanımlayıcısı. Adapty Kontrol Paneli'nde placement oluştururken belirttiğiniz değerdir. |
| customer_user_id | evet* | Sisteminizdeki kullanıcı tanımlayıcısı. `customer_user_id` veya `profile_id` alanlarından biri zorunludur. |
| profile_id | evet* | Adapty'deki kullanıcı tanımlayıcısı. `customer_user_id` veya `profile_id` alanlarından biri zorunludur. |

**Örnek**

```
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}
```