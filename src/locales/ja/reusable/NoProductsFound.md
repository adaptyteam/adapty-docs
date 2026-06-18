提供されたトークンに紐づくプロダクトが見つからなかったため、リクエストが失敗しました。必要なプロダクトがすべて Adapty の正しいアプリに追加されており、**Paddle Product ID** と **Paddle Price ID** が正しく入力されていることを確認してください。

#### ボディ \{#body\}

| パラメーター | 型      | 説明                                                         |
| ------------ | ------- | ------------------------------------------------------------ |
| errors       | Object  | <ul><li> **source**: (string) 常に `non_field_errors`。</li><li> **errors**: エラーの説明。 </li></ul> |
| error_code   | String  | エラーの短縮名。使用可能な値: `no_products_found`。          |
| status_code  | Integer | HTTP ステータス。常に `400`。                                |

#### レスポンスの例 \{#response-example\}

```json showLineNumbers
{
  "errors": [
    {
      "source": "non_field_errors",
      "errors": [
        "No products found for purchase"
      ]
    }
  ],
  "error_code": "no_products_found",
  "status_code": 400
}
```