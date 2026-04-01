请求失败，因为找不到所请求付费墙的 `variation_ID`。请检查您请求中的 `placement_id` 是否存在于应用中，以及请求中是否存在拼写错误。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 始终为 `bull`。</li><li> **errors**: 错误描述。 </li></ul> |
| error_code  | String  | 简短的错误名称。可能的值：`VARIATION_DOES_NOT_EXIST_ERROR`。 |
| status_code | Integer | HTTP 状态码。始终为 `404`。                                  |

#### 响应示例

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