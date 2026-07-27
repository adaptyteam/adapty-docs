| 名称                     | 类型                         | 是否必填           | 描述                                                  |
| ------------------------ | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| date                     | array of String values(data) | :heavy_plus_sign:  | 输入您想获取数据图表数据的日期或时间段。 |
| compare_date             | array of String values(data) | :heavy_minus_sign: | 如需对比两个日期或时间段，请在此处输入较早的日期，在 `date` 参数中输入较晚的日期。 |
| store                    | array of String values       | :heavy_minus_sign: | 按购买所在的应用商店进行筛选。可选值包括 **app_store**、**play_store**、**stripe** 以及任意自定义商店 ID。如使用自定义商店，请输入在 Adapty 看板中设置的 ID。 |
| country                  | array of String values       | :heavy_minus_sign: | 按购买发生地的两字母国家代码进行筛选，使用 ISO 3166-1 标准代码。 |
| store_product_id         | array of String values       | :heavy_minus_sign: | 应用商店中产品的唯一标识符。您可以在 Adapty 看板的 [**Products**](https://app.adapty.io/products) 部分查看此 ID。 |
| duration                 | array of String              | :heavy_minus_sign: | 指定订阅时长。可选值为：<ul><li>Weekly</li><li>Monthly</li><li>2 months</li><li>3 months</li><li>6 months</li><li>Annual</li><li>Lifetime</li><li>Uncategorized</li></ul> |
| attribution_source       | array of String values       | :heavy_minus_sign: | 归因的来源集成。可选项：<ul><li>adjust</li><li>airbridge</li><li>apple_search_ads</li><li>appsflyer</li><li>branch</li><li>custom</li></ul> |
| attribution_status       | array of String values       | :heavy_minus_sign: | 表示归因是自然流量还是非自然流量。可选值为：<ul><li>organic</li><li>non-organic</li><li>unknown</li></ul> |
| attribution_channel      | array of String values       | :heavy_minus_sign: | 带来该交易的营销渠道。               |
| attribution_campaign     | array of String values       | :heavy_minus_sign: | 带来该交易的营销活动。             |
| attribution_adgroup      | array of String values       | :heavy_minus_sign: | 带来该交易的归因广告组。           |
| attribution_adset        | array of String values       | :heavy_minus_sign: | 带来该交易的归因广告集。              |
| attribution_creative     | array of String values       | :heavy_minus_sign: | 广告或营销活动中用于衡量效果的特定视觉或文字元素（例如点击量、转化量）。 |
| offer_category       | array of String values       | :heavy_minus_sign: | 指定您想获取数据的优惠类别。可选值为：<ul><li>introductory</li><li>promotional</li><li>winback</li></ul> |
| offer_type           | array of String values       | :heavy_minus_sign: | 指定您想获取数据的优惠类型。可选值为：<ul><li>free_trial</li><li>pay_as_you_go</li><li>pay_up_front</li></ul> |
| offer_id             | array of String values       | :heavy_minus_sign: | 指定您想获取数据的具体优惠。   |
