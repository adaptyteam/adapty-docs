İstek başarısız oldu çünkü [App Settings](https://app.adapty.io/settings/paddle) sayfasındaki **Paddle API Key** hatalı. Lütfen doğru olduğundan ve doğru uygulamayla ilişkilendirildiğinden emin olun.

#### Body

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Her zaman `non_field_errors`.</li><li> **errors**: Hatanın açıklaması. </li></ul> |
| error_code  | String  | Kısa hata adı. Olası değer: `paddle_api_key_not_found`. |
| status_code | Integer | HTTP durum kodu. Her zaman `400`.                            |

#### Yanıt örneği

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Paddle API key not found"
      ]
    }
  ],
  "error_code": "paddle_api_key_not_found",
  "status_code": 400
}
```