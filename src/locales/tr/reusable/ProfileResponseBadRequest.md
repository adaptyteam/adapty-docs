İstek, bir alandaki hata nedeniyle başarısız oldu.

###### Gövde \{#body\}

| Parametre   | Tür     | Açıklama                                                     |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) Hataya neden olan alan</li><li> **errors**: (list) listelenen hatalar.</li></ul> |
| error_code  | String  | Kısa hata adı.                                               |
| status_code | Integer | HTTP durumu, her zaman `400`.                                |

###### Yanıt örneği \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "string",
      "errors": [
        "string"
      ]
    }
  ],
  "error_code": "string",
  "status_code": 0
}
```