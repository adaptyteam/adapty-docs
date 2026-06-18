<p> </p>

リクエストは、認証情報が未指定または誤っているために失敗しました。[認証](ss-authorization)ページで **Authorization header** を確認してください。

また、指定されたプロファイルが見つからなかったためにリクエストが失敗しました。

#### ボディ \{#body\}

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `non_field_errors`。</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短い名称。常に `not_authenticated`。                 |
| status_code  | Integer | HTTP ステータス。常に `401`。                                |

#### レスポンス例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Authentication credentials were not provided."
      ]
    }
  ],
  "error_code": "not_authenticated",
  "status_code": 401
}
```

 