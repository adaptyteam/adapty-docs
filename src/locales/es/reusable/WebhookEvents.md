| Nombre del evento | Descripción |
|:-----------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| subscription_started | Se activa cuando un usuario activa una suscripción de pago sin período de prueba, es decir, se le cobra de inmediato. |
| subscription_renewed | Ocurre cuando se renueva una suscripción y se cobra al usuario. Este evento comienza a partir de la segunda facturación, tanto en suscripciones con prueba como sin ella. |
| subscription_renewal_cancelled | El usuario ha desactivado la renovación automática de la suscripción. El usuario conserva el acceso a las funciones premium hasta el final del período de suscripción pagado. |
| subscription_renewal_reactivated | Se activa cuando un usuario reactiva la renovación automática de la suscripción. |
| subscription_expired | Se activa cuando una suscripción finaliza por completo tras ser cancelada. Por ejemplo, si un usuario cancela una suscripción el 12 de diciembre pero esta permanece activa hasta el 31 de diciembre, el evento se registra el 31 de diciembre cuando la suscripción expira. |
| subscription_paused | Ocurre cuando un usuario activa la [pausa de suscripción](https://developer.android.com/google/play/billing/lifecycle/subscriptions#pause) (solo Android). |
| subscription_deferred | Se activa cuando una compra de suscripción se [aplaza](https://adapty.io/glossary/subscription-purchase-deferral/), lo que permite a los usuarios retrasar el pago manteniendo el acceso a las funciones premium. Esta función está disponible a través de la Google Play Developer API y puede usarse para pruebas gratuitas o para ayudar a usuarios con dificultades económicas. |
| non_subscription_purchase | Cualquier compra que no sea una suscripción, como el acceso de por vida o productos consumibles como monedas del juego. |
| trial_started | Se activa cuando un usuario activa una suscripción de prueba. |
| trial_converted | Ocurre cuando finaliza una prueba y se cobra al usuario (primera compra). Por ejemplo, si un usuario tiene una prueba hasta el 14 de enero pero se le cobra el 7 de enero, este evento se registra el 7 de enero. |
| trial_renewal_cancelled | El usuario desactivó la renovación automática de la suscripción durante el período de prueba. El usuario conserva el acceso a las funciones premium hasta que finalice la prueba, pero no se le cobrará ni comenzará una suscripción. |
| trial_renewal_reactivated | Ocurre cuando un usuario reactiva la renovación automática de la suscripción durante el período de prueba. |
| trial_expired | Se activa cuando finaliza una prueba sin convertirse en suscripción. |
| entered_grace_period | Ocurre cuando falla un intento de pago y el usuario entra en un período de gracia (si está habilitado). El usuario conserva el acceso premium durante este tiempo. |
| billing_issue_detected | Se activa cuando ocurre un problema de facturación durante un intento de cobro (p. ej., saldo insuficiente en la tarjeta). |
| subscription_refunded | Se activa cuando se reembolsa una suscripción (p. ej., por parte del soporte de Apple). |
| non_subscription_purchase_refunded | Se activa cuando se reembolsa una compra que no es una suscripción. |
| access_level_updated | Ocurre cuando se actualiza el nivel de acceso de un usuario. |