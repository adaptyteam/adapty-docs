

| Event Name                         | Default event ID                   | Description                                                  |
| ---------------------------------- | :--------------------------------- | :----------------------------------------------------------- |
| Subscription started               | subscription_started               | A user activated a paid subscription without a trial period, meaning they were billed immediately. |
| Subscription renewed               | subscription_renewed               | A subscription was renewed and the user was charged. For both trial and non-trial subscriptions, this event is sent starting from the second billing. |
| Subscription renewal cancelled     | subscription_renewal_cancelled     | A user turned off subscription auto-renewal. A user still has access to the premium features of your app until the end of the paid subscription period. |
| Subscription renewal reactivated   | subscription_renewal_reactivated   | A user turned on subscription auto-renewal.                  |
| Subscription expired (churned)     | subscription_expired               | A user has canceled a subscription and it is completely finished. Corrected grammatical errors ("till" -> "until," "cancells" -> "cancels") and improved clarity by restructuring the sentence. |
| Subscription paused (Android only) | subscription_paused                | User activated [subscription pause](https://developer.android.com/google/play/billing/subs#pause) (Android only). |
| Non-subscription purchase          | non_subscription_purchase          | Any non-subscription purchase e.g. lifetime access or consumable product such as coins in a game. |
| Trial started                      | trial_started                      | A user has activated a trial subscription.                   |
| Trial converted                    | trial_converted                    | A trial period has ended and the user was billed, i.e. first purchase was made. For example, if a user has a 2-week trial subscription until January 14th and buys a paid subscription on January 7th, the event will be created when the user is billed—on January 7th. |
| Trial renewal cancelled            | trial_renewal_cancelled            | A user turned off subscription auto-renewal during the trial. A user still has access to the premium features of your app until the end of the trial period. But the subscription will not start and the user will not be billed. |
| Trial renewal reactivated          | trial_renewal_reactivated          | A user turned on subscription auto-renewal during the trial period. |
| Trial expired                      | trial_expired                      | A trial has expired without converting to a subscription.    |
| Entered grace period               | entered_grace_period               | The payment was unsuccessful, and the user entered a grace period, if available. The user still has access to the premium features of your app until the grace period is finished. |
| Billing issue detected             | billing_issue_detected             | An attempt to charge the user failed due to a billing issue, typically caused by insufficient card balance. |
| Subscription refunded              | subscription_refunded              | A subscription was refunded \(e.g. by Apple support\).       |
| Non-subscription purchase refunded | non_subscription_purchase_refunded | Non-subscription purchase was refunded.                      |
| Access level updated               | access_level_updated               | User's access level updated.                                 |