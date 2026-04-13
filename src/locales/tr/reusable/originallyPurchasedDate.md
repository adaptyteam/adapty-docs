Uzun süreli abonelikler için bir işlem zinciri oluşturulur. Orijinal işlem bu zincirdeki ilk işlemdir ve sonraki tüm işlemleri birbirine bağlar. Her yenileme, bu orijinal işlemin bir uzantısıdır. İşlem ilk satın alma ise, kendi orijinal işlemi olarak kabul edilir.

`originally_purchased_at` zaman damgası orijinal satın alma zamanını, `purchased_at` ise mevcut işlemin zamanını gösterir. Bu nedenle `purchased_at`, `originally_purchased_at` değerinden daha erken bir tarih olamaz; en fazla, ilk işlemde bu iki değer aynı olabilir.

İstek başarısız oldu çünkü `originally_purchased_at`, `purchased_at` değerinden daha sonraki bir tarihe ayarlanmış. Bu değerin `purchased_at` ile eşit ya da ondan daha erken olduğundan emin olun.

#### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `originally_purchased_at`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `originally_purchased_date_error`.  |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "originally_purchased_at",
      "errors": [
        "originally_purchased_at must be earlier than or equal to purchased_at."
      ]
    }
  ],
  "error_code": "originally_purchased_date_error",
  "status_code": 400
}
```