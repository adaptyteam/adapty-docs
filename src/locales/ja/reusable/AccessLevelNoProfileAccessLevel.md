リクエスト内のプロファイルが、指定されたアクセスレベルと一致しないため、リクエストが失敗しました。ヘッダーのプロファイルIDとボディのアクセスレベルIDが正しいか、タイプミスがないかを確認してください。

#### ボディ

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `non_field_errors`</li><li> **errors**: エラーの説明。</li></ul> |
| error_code   | String  | エラーの短縮名。常に `profile_paid_access_level_does_not_exist`。 |
| status_code  | Integer | HTTPステータス。常に `400`。                                 |

#### レスポンス例

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "Profile `478b2e7f-d557-4b8b-9c5f-cbd46fc2dee2` has no `premium` access level"
      ]
    }
  ],
  "error_code": "profile_paid_access_level_does_not_exist",
  "status_code": 400
}
```