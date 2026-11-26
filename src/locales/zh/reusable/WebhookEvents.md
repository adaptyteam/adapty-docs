
| 事件名称 | 描述 |
|:-----------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| subscription_started | 当用户激活不含试用期的付费订阅时触发，即立即扣费。 |
| subscription_active | 在 `subscription_started` 事件触发后，确认订阅仍处于有效状态。您需要设置从订阅开始到此次检查之间的天数。若订阅仍然有效（包括用户已进入宽限期的情况），则会收到该事件。若订阅已到期或用户已关闭自动续订，则不会收到任何事件，Adapty 也不会再次检查。此事件仅跟随非试用订阅。试用期转化后会发送 `trial_converted`，该事件不会启动此检查。 |
| subscription_renewed | 订阅续订且用户被扣费时触发。无论是试用订阅还是非试用订阅，此事件从第二次计费周期开始触发。 |
| subscription_renewal_cancelled | 用户已关闭订阅自动续订。用户在当前付费周期结束前仍可访问高级功能。 |
| subscription_renewal_reactivated | 当用户重新开启订阅自动续订时触发。 |
| subscription_expired | 订阅取消后完全到期时触发。例如，用户在 12 月 12 日取消订阅，但订阅在 12 月 31 日到期，则该事件在 12 月 31 日记录。 |
| subscription_paused | 当用户启用[订阅暂停](https://developer.android.com/google/play/billing/lifecycle/subscriptions#pause)时触发（仅限 Android）。 |
| subscription_deferred | 当您免费延长用户订阅时触发：通过 Google Play Developer API 进行[延期](https://adapty.io/glossary/subscription-purchase-deferral/)，或通过 App Store Server API 进行[续订日期延期](https://developer.apple.com/documentation/appstoreserverapi/extend-a-subscription-renewal-date)。用户在延长后的续订日期前仍可访问高级功能。 |
| non_subscription_purchase | 任何非订阅类购买，例如永久授权或消耗型商品（如游戏内虚拟货币）。 |
| trial_started | 当用户激活试用订阅时触发。 |
| trial_active | 在 `trial_started` 事件触发后，确认试用仍处于有效状态。您需要设置从试用开始到此次检查之间的天数。若试用仍在进行中，则会收到该事件。若试用已结束、已转化，或用户已关闭自动续订，则不会收到任何事件，Adapty 也不会再次检查。 |
| trial_converted | 试用结束且用户被首次扣费时触发。例如，用户的试用期到 1 月 14 日，但在 1 月 7 日被扣费，则该事件在 1 月 7 日记录。 |
| trial_renewal_cancelled | 用户在试用期间关闭了订阅自动续订。用户在试用结束前仍可访问高级功能，但不会被扣费，也不会开始订阅。 |
| trial_renewal_reactivated | 当用户在试用期间重新开启订阅自动续订时触发。 |
| trial_expired | 试用期结束且未转化为订阅时触发。 |
| entered_grace_period | 付款尝试失败，且用户进入宽限期（如已启用）时触发。用户在此期间仍可访问高级功能。 |
| billing_issue_detected | 扣费尝试期间发生账单问题时触发（例如，银行卡余额不足）。 |
| subscription_refunded | 订阅被退款时触发（例如，由 Apple 客服处理的退款）。 |
| non_subscription_purchase_refunded | 非订阅购买被退款时触发。 |
| access_level_updated | 用户的访问等级更新时触发。 |
