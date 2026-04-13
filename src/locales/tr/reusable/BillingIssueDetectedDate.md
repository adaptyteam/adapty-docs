Bir faturalama sorunu, abonelik yenileme girişimi sırasında bir sorun oluştuğunda meydana gelir; bu nedenle her zaman işlem tarihinden (`purchased_at`) sonra gerçekleşir.

Bunu çözmek için faturalama sorunu tarihinin (`billing_issue_detected_at`) işlem tarihinden (`purchased_at`) sonra olduğundan emin olun.

#### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `billing_issue_detected_at`</li><li> **errors**: Hatanın açıklaması.</li></ul> |
| error_code  | String  | Kısa hata adı. Her zaman `billing_issue_detected_at_date_comparison_error`. |
| status_code | Integer | HTTP durumu. Her zaman `400`.                                |

#### Örnek yanıt \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "billing_issue_detected_at",
      "errors": [
        "billing_issue_detected_at must be later than purchased_at."
      ]
    }
  ],
  "error_code": "billing_issue_detected_at_date_comparison_error",
  "status_code": 400
}
```