| 名前             | 必須 | 説明                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| store            | true     | アプリストア                                                |
| locale           | False    | ペイウォールのロケール識別子。このパラメーターは、"-" 文字で区切られた1つ以上のサブタグで構成される言語コードである必要があります。最初のサブタグは言語、2番目は地域を表します（地域のサポートは後日追加予定）。例: `en` は英語、`en-US` はアメリカ英語を表します。パラメーターを省略した場合、ペイウォールはデフォルトのロケールで作成されます。 |
| placement_id     | true     | [プレースメント](placements)の識別子。Adapty ダッシュボードでプレースメントを作成する際に指定した値です。 |
| customer_user_id | true*    | あなたのシステムにおけるユーザーの識別子。`customer_user_id` または `profile_id` のどちらかが必須です。 |
| profile_id       | true*    | Adapty におけるユーザーの識別子。`customer_user_id` または `profile_id` のどちらかが必須です。 |

**例**

```
{
  "store": "adapty",
  "locale": "string",
  "placement_id": "string",
  "customer_user_id": "string"
}
```