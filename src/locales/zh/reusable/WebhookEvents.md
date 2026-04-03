| 事件名称 | 描述 |
|:-----------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| subscription_started | 当用户激活不含试用期的付费订阅时触发，即立即计费。 |
| subscription_renewed | 当订阅续期并向用户收费时发生。此事件从第二次计费开始触发，无论是试用订阅还是非试用订阅。 |
| subscription_renewal_cancelled | 用户已关闭订阅自动续期。用户在付费订阅期结束前仍可访问高级功能。 |
| subscription_renewal_reactivated | 当用户重新激活订阅自动续期时触发。 |
| subscription_expired | 当订阅取消后完全结束时触发。例如，若用户在 12 月 12 日取消订阅，但订阅在 12 月 31 日前仍处于活跃状态，则该事件在 12 月 31 日订阅到期时记录。 |
| subscription_paused | 当用户激活[订阅暂停](https://developer.android.com/google/play/billing/lifecycle/subscriptions#pause)时发生（仅限 Android）。 |
| subscription_deferred | 当订阅购买被[延迟](https://adapty.io/glossary/subscription-purchase-deferral/)时触发，允许用户在延迟付款的同时继续访问高级功能。此功能通过 Google Play Developer API 提供，可用于免费试用或为面临经济困难的用户提供便利。 |
| non_subscription_purchase | 任何非订阅购买，例如永久授权或消耗型商品（如游戏内金币）。 |
| trial_started | 当用户激活试用订阅时触发。 |
| trial_converted | 当试用期结束并向用户收费（首次购买）时发生。例如，若用户的试用期至 1 月 14 日，但在 1 月 7 日被收费，则该事件在 1 月 7 日记录。 |
| trial_renewal_cancelled | 用户在试用期间关闭了订阅自动续期。用户在试用期结束前仍可访问高级功能，但不会被收费或开始订阅。 |
| trial_renewal_reactivated | 当用户在试用期间重新激活订阅自动续期时发生。 |
| trial_expired | 当试用期结束且未转化为订阅时触发。 |
| entered_grace_period | 当付款尝试失败且用户进入宽限期（如已启用）时发生。用户在此期间仍保留高级访问权限。 |
| billing_issue_detected | 当计费尝试过程中发生计费问题时触发（例如，银行卡余额不足）。 |
| subscription_refunded | 当订阅被退款时触发（例如，由 Apple Support 处理）。 |
| non_subscription_purchase_refunded | 当非订阅购买被退款时触发。 |
| access_level_updated | 当用户的访问等级更新时发生。 |