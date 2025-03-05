

| Event name                         | Description                                                  |
| :--------------------------------- | :----------------------------------------------------------- |
| subscription_started               | Triggered when a user activates a paid subscription without a trial period, meaning they are billed instantly. |
| subscription_renewed               | Occurs when a subscription is renewed and the user is charged. This event starts from the second billing, whether it's a trial or non-trial subscription. |
| subscription_renewal_cancelled     | A user has turned off subscription auto-renewal. The user retains access to premium features until the end of the paid subscription period. |
| subscription_renewal_reactivated   | Triggered when a user reactivates subscription auto-renewal. |
| subscription_expired               | Triggered when a subscription fully ends after being canceled. For instance, if a user cancels a subscription on December 12th but it remains active until December 31st, the event is recorded on December 31st when the subscription expires. |
| subscription_paused                | Occurs when a user activates [subscription pause](https://developer.android.com/google/play/billing/subs#pause) (Android only). |
| non_subscription_purchase          | Any non-subscription purchase, such as lifetime access or consumable products like in-game coins. |
| trial_started                      | Triggered when a user activates a trial subscription.        |
| trial_converted                    | Occurs when a trial ends and the user is billed (first purchase). For example, if a user has a trial until January 14th but is billed on January 7th, this event is recorded on January 7th. |
| trial_renewal_cancelled            | A user turned off subscription auto-renewal during the trial period. The user retains access to premium features until the trial ends but will not be billed or start a subscription. |
| trial_renewal_reactivated          | Occurs when a user reactivates subscription auto-renewal during the trial period. |
| trial_expired                      | Triggered when a trial ends without converting to a subscription. |
| entered_grace_period               | Occurs when a payment attempt fails, and the user enters a grace period (if enabled). The user retains premium access during this time. |
| billing_issue_detected             | Triggered when a billing issue occurs during a charge attempt (e.g., insufficient card balance). |
| subscription_refunded              | Triggered when a subscription is refunded (e.g., by Apple Support). |
| non_subscription_purchase_refunded | Triggered when a non-subscription purchase is refunded.      |
| access_level_updated               | Occurs when a user's access level is updated.                |