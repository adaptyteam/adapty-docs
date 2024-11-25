

| Event Name                         | Default event ID                   | Description                                                  |
| ---------------------------------- | :--------------------------------- | :----------------------------------------------------------- |
| Subscription started               | subscription_started               | A user has activated a paid subscription without a trial period i.e. he was billed instantly. |
| Subscription renewed               | subscription_renewed               | A subscription was renewed and the user was charged. For both trial and non-trial subscriptions, this event is sent starting from the second billing. |
| Subscription renewal cancelled     | subscription_renewal_cancelled     | A user turned off subscription auto-renewal. A user still has access to the premium features of your app until the end of the paid subscription period. |
| Subscription renewal reactivated   | subscription_renewal_reactivated   | A user turned on subscription auto-renewal.                  |
| Subscription expired (churned)     | subscription_expired               | A user has canceled a subscription and it is completely finished. For example, if a user has a subscription till the 31st of December a cancells the subscription on 12th of December, the event will be created on the 31st of December when the subscription expires. |
| Subscription paused (Android only) | subscription_paused                | User activated [subscription pause](https://developer.android.com/google/play/billing/subs#pause) (Android only). |
| Non-subscription purchase          | non_subscription_purchase          | Any non-subscription purchase e.g. lifetime access or consumable product such as coins in a game. |
| Trial started                      | trial_started                      | A user has activated a trial subscription.                   |
| Trial converted                    | trial_converted                    | A trial period has ended and the user was billed, i.e. first purchase was made. Fro example, if a user has a 2-week trial subscription till the 14th of January and buys a paid subscription on the 7th of January, the event will be created when the user is billed - on the 7th of January. |
| Trial renewal cancelled            | trial_renewal_cancelled            | A user turned off subscription auto-renewal during the trial. A user still has access to the premium features of your app until the end of the trial period. But the subscription will not start and the user will not be billed. |
| Trial renewal reactivated          | trial_renewal_reactivated          | A user turned on subscription auto-renewal during the trial period. |
| Trial expired                      | trial_expired                      | A trial has expired without converting to a subscription.    |
| Entered grace period               | entered_grace_period               | The payment was not successful and the user entered into a grace period if you have it. The user still has access to the premium features of your app until the grace period is finished. |
| Billing issue detected             | billing_issue_detected             | An attempt to charge the user was made, but a billing issue happened. Usually, it means the user doesn't have enough card balance. |
| Subscription refunded              | subscription_refunded              | A subscription was refunded \(e.g. by Apple support\).       |
| Non-subscription purchase refunded | non_subscription_purchase_refunded | Non-subscription purchase was refunded.                      |
| Access level updated               | access_level_updated               | User's access level updated.                                 |