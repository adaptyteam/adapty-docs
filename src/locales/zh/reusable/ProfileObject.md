
| 参数 | 类型 | 可为空 | 描述 |
| ----------------- | ---------- | ------------------ | ------------------------------------------------------------ |
| app_id | String | :heavy_minus_sign: | 您应用的内部 ID。可在 Adapty 看板中查看：[App Settings -> General tab](https://app.adapty.io/settings/general)。 |
| profile_id | UUID | :heavy_minus_sign: | Adapty 用户画像 ID。可在 Adapty 看板 -> [Profiles](https://app.adapty.io/profiles/users) -> 具体用户画像页面的 **Adapty ID** 字段中查看。 |
| customer_user_id | String | :heavy_plus_sign: | 您的用户在您系统中的 ID。可在 Adapty 看板 -> [Profiles](https://app.adapty.io/profiles/users) -> 具体用户画像页面的 **Customer user ID** 字段中查看。仅当您通过 Adapty SDK 在移动应用代码中[识别用户](identifying-users)时才会生效。 |
| total_revenue_usd | Float | :heavy_minus_sign: | 浮点数，表示该用户画像累计获得的 USD 总收入。 |
| segment_hash | String | :heavy_minus_sign: | 内部参数。 |
| timestamp | Integer | :heavy_minus_sign: | 响应时间（毫秒），用于解决竞态条件。 |
| custom_attributes | Array | :heavy_minus_sign: | <p>每个用户画像最多可设置 30 个自定义属性。如果提供 `custom_attributes` 数组，则必须至少包含一个属性键。</p><p>**Key：** 键必须为字符串，且不超过 30 个字符。只允许使用字母、数字、短横线、点和下划线。</p><p>**Value：** 属性值不超过 30 个字符。只允许使用字符串和浮点数作为值，布尔值将被转换为浮点数。发送空值或 null 可删除该属性。</p> |
| access_levels | Array | :heavy_plus_sign: | [访问等级](server-side-api-objects#access-level)对象数组。如果用户没有访问等级，可为 null。 |
| subscriptions | Array | :heavy_plus_sign: | [订阅](server-side-api-objects#subscription)对象数组。如果用户没有订阅，可为 null。 |
| non_subscriptions | Array | :heavy_plus_sign: | [非订阅](server-side-api-objects#non-subscription)对象数组。如果用户没有购买记录，可为 null。 |