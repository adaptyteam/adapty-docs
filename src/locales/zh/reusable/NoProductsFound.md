请求失败，因为未找到与所提供令牌关联的产品。请确保所有必要的产品已添加到 Adapty 中正确的应用程序，并且其 **Paddle Product ID** 和 **Paddle Price ID** 已正确填写。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**：（string）固定值为 `non_field_errors`。</li><li> **errors**：错误描述。</li></ul> |
| error_code  | String  | 错误简称。可能的值：`no_products_found`。                    |
| status_code | Integer | HTTP 状态码。固定值为 `400`。                                |

#### 响应示例 \{#response-example\}

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