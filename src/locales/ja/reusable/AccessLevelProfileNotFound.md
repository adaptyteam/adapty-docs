<p> </p>

リクエストヘッダーのプロファイルが見つからなかったためリクエストが失敗しました。リクエストヘッダーに入力した `profile_id` または `customer_user_id` にタイポがないか確認し、正しいアプリ用のものかどうかをチェックしてください。

#### ボディ \{#body\}

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `non_field_errors`</li><li> **errors**: エラーの説明。 </li></ul> |
| error_code   | String  | エラーの短い名前。使用可能な値: `profile_does_not_exist`。   |
| status_code  | Integer | HTTPステータス。常に `400`。                                 |

#### レスポンス例 \{#response-example\}

プロファイルが見つかりません

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile not found"
      ]
    }
  ],
  "error_code": "profile_does_not_exist",
  "status_code": 400
}
```

 