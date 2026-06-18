`is_family_shared` パラメータが `true` に設定されているため、リクエストが失敗しました。これはアクセスレベルがファミリーメンバーと無料で共有されることを意味します。しかし、[Price](server-side-api-objects#price) オブジェクトの `value` パラメータがゼロに設定されていません。

`is_family_shared` を `true` にする場合は、[Price](server-side-api-objects#price) オブジェクトの `value` パラメータを `0` に設定してください。

#### Body

| Parameter   | Type    | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 常に `is_family_shared`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code  | String  | エラーの短い名前。常に `family_share_price_error`。        |
| status_code | Integer | HTTP ステータス。常に `400`。                                   |

#### レスポンス例

プロファイルが見つかりません

```json showLineNumbers
{
  "errors": [
    {
      "source": "is_family_shared",
      "errors": [
        "If is_family_shared is true, price.value must be 0."
      ]
    }
  ],
  "error_code": "family_share_price_error",
  "status_code": 400
}
```