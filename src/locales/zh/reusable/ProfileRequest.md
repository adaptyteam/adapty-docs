
| 参数               | 类型          | 必填 | 可为空 | 描述                                                         |
| :----------------- | :------------ | ---- | ------ | :----------------------------------------------------------- |
| first_name         | String        | No   | Yes    | 终端用户的名字。                                             |
| last_name          | String        | No   | Yes    | 终端用户的姓氏。                                             |
| gender             | String        | No   | Yes    | 终端用户的性别。                                             |
| email              | String        | No   | Yes    | 终端用户的邮箱。                                             |
| phone_number       | String        | No   | Yes    | 终端用户的电话号码。                                         |
| birthday           | ISO 8601 date | No   | No     | 终端用户的生日。                                             |
| ip_country         | String        | No   | No     | 终端用户所在国家，格式为 ISO 3166-2。若请求从服务端发起而非客户端，需传入此参数以设置当前国家，否则将根据请求的 IP 地址自动判断国家。 |
| store_country      | String        | No   | Yes    | 终端用户应用商店所在国家。                                   |
| store              | String        | No   | Yes    | 用户在应用内进行购买所使用的平台。可选值：`app_store`、`play_store` 或 `stripe`。 |
| analytics_disabled | Boolean       | No   | No     | <p>用于退出外部分析的选项。当分析功能关闭时，事件将不会发送至集成，且 `idfa`、`idfv` 和 `advertising_id` 字段将变为可为空。</p><p>开启：该用户已退出外部分析。</p><p>关闭：默认情况下分析功能处于活动状态。</p> |
| custom_attributes  | Array         | No   | No     | <p>允许为用户画像设置最多 30 个自定义属性。若使用 `custom_attributes` 数组，则至少需要提供一对键值对。</p><p>**键：** 必须为字符串，长度不超过 30 个字符，仅支持字母、数字、连字符、句点和下划线。</p><p>**值：** 必须为字符串或浮点数，长度不超过 30 个字符。布尔值和整数将被转换为浮点数。如需删除某个属性，请传入空值或 `null`。</p> |
| installation_meta  | Object        | No   | No     | 包含特定设备上特定应用的相关信息，结构为 [Installation Meta](server-side-api-objects#installation-meta) 对象。 |