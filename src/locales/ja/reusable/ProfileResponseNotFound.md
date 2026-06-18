<p> </p>
指定されたプロファイルが見つからなかったため、リクエストが失敗しました。`customer_user_id` または `profile_id` にタイポがないか確認してください。

##### Body

| パラメーター | タイプ  | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `null`。</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名前。常に `profile_does_not_exist`。            |
| status_code  | Integer | HTTP ステータス。常に `404`。                                |

##### レスポンス例

```json showLineNumbers
{
    "errors": [
        {
            "source": null,
            "errors": [
                "Profile not found"
            ]
        }
    ],
    "error_code": "profile_does_not_exist",
    "status_code": 404
}
```

 