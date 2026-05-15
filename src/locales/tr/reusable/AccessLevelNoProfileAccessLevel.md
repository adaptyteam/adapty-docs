İstekteki profil, belirtilen access level ile eşleşmediğinden istek başarısız oldu. Profil ID'sinin başlıkta ve access level ID'sinin gövdede doğru olduğundan emin olun; yazım hatası olmadığını kontrol edin.

#### Gövde

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `non_field_errors`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `profile_paid_access_level_does_not_exist`. |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Yanıt örneği

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile `478b2e7f-d557-4b8b-9c5f-cbd46fc2dee2` has no `premium` access level"
      ]
    }
  ],
  "error_code": "profile_paid_access_level_does_not_exist",
  "status_code": 400
}
```