
请求失败的原因是 `offer_category` 参数的值不是 `introductory` 或 `offer_type`，但请求中未包含 `offer_id`。此时，请提供 `offer_id`，或从请求中移除 `offer_category` 或 `offer_type`。

另一种可能的原因是 `offer_id` 参数已添加但值为 `null`，而该参数不允许为 null。如果是这种情况，请为 `offer_id` 赋值，或完全移除该参数。

#### Body

| 参数        | 类型    | 描述                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| errors      | Object  | <ul><li> **source**: (string) 固定值 `offer.category`</li><li> **errors**: 错误描述。 </li></ul> |
| error_code  | String  | 错误简称。可能的值：`missing_offer_id`。                     |
| status_code | Integer | HTTP 状态码。固定值 `400`。                                  |

#### 响应示例

未找到用户画像

```json showLineNumbers
{
  "errors": [
    {
      "source": "offer_category",
      "errors": [
        "offer_id must be specified for all offer types except 'introductory'."
      ]
    }
  ],
  "error_code": "missing_offer_id",
  "status_code": 400
}
```

 





