リクエストされたペイウォールの `variation_ID` が見つからなかったため、リクエストが失敗しました。リクエストしている `placement_id` がアプリ内に存在するか、リクエストのスペルミスがないか確認してください。

#### Body

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `bull`。</li><li> **errors**: エラーの説明。 </li></ul> |
| error_code   | String  | エラーの短い名前。可能な値: `VARIATION_DOES_NOT_EXIST_ERROR`。 |
| status_code  | Integer | HTTP ステータス。常に `404`。                                |

#### レスポンスの例

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Variation for example_onboarding does not exist."
            ]
        }
    ],
    "error_code": "VARIATION_DOES_NOT_EXIST_ERROR",
    "status_code": 404
}
```