---
no_index: true
---

**Habilitado (predeterminado)**

Los usuarios identificados (aquellos con un [Customer User ID](identifying-users#set-customer-user-id-on-configuration)) pueden compartir el mismo [nivel de acceso](access-level) proporcionado por Adapty si su dispositivo está vinculado al mismo Apple/Google ID. Esto es útil cuando un usuario reinstala la app e inicia sesión con un correo diferente: seguirá teniendo acceso a su compra anterior. Con esta opción, varios usuarios identificados pueden compartir el mismo nivel de acceso.

Aunque el nivel de acceso se comparte, todas las transacciones pasadas y futuras se registran como eventos en el Customer User ID original para mantener análisis coherentes y conservar un historial completo de transacciones, incluyendo períodos de prueba, compras de suscripción, renovaciones y más, vinculados al mismo perfil.

**Transferir acceso al nuevo usuario**

Los usuarios identificados pueden seguir accediendo al [nivel de acceso](access-level) proporcionado por Adapty, incluso si inician sesión con un [Customer User ID](identifying-users#set-customer-user-id-on-configuration) diferente o reinstalan la app, siempre que el dispositivo esté vinculado al mismo Apple/Google ID.

A diferencia de la opción anterior, Adapty transfiere la compra entre usuarios identificados. Esto garantiza que el contenido adquirido esté disponible, pero solo un usuario puede tener acceso a la vez. Por ejemplo, si UserA compra una suscripción y UserB inicia sesión en el mismo dispositivo y restaura las transacciones, UserB obtendrá acceso a la suscripción y se le revocará a UserA.

Si uno de los usuarios (ya sea el nuevo o el anterior) no está identificado, el nivel de acceso seguirá compartiéndose entre esos perfiles en Adapty.

Aunque el nivel de acceso se transfiere, todas las transacciones pasadas y futuras se registran como eventos en el Customer User ID original para mantener análisis coherentes y conservar un historial completo de transacciones, incluyendo períodos de prueba, compras de suscripción, renovaciones y más, vinculados al mismo perfil.

Después de cambiar a **Transferir acceso al nuevo usuario**, los niveles de acceso no se transferirán entre perfiles de inmediato. El proceso de transferencia para cada nivel de acceso específico se activa solo cuando Adapty recibe un evento del store, como la renovación de una suscripción, una restauración o al validar una transacción.

**Deshabilitado**

El primer perfil de usuario identificado que obtenga un nivel de acceso lo conservará para siempre. Esta es la mejor opción si la lógica de negocio de tu app requiere que las compras estén vinculadas a un único Customer User ID.

Ten en cuenta que los niveles de acceso siguen compartiéndose entre usuarios anónimos.

Puedes "desvincular" una compra [eliminando el perfil del usuario propietario](ss-delete-profile). Tras la eliminación, el nivel de acceso queda disponible para el primer perfil de usuario que lo reclame, ya sea anónimo o identificado.

Deshabilitar el uso compartido solo afecta a los nuevos usuarios. Las suscripciones que ya se comparten entre usuarios seguirán compartiéndose incluso después de deshabilitar esta opción.

:::warning

Apple y Google exigen que las compras in-app se compartan o transfieran entre usuarios porque se basan en el Apple/Google ID para asociar la compra. Sin el uso compartido, restaurar compras podría no funcionar tras reinstalaciones posteriores.

Deshabilitar el uso compartido puede impedir que los usuarios recuperen el acceso al iniciar sesión.

Recomendamos deshabilitar el uso compartido solo si tus usuarios **deben iniciar sesión** antes de realizar una compra. De lo contrario, un usuario identificado podría comprar una suscripción, iniciar sesión en otra cuenta y perder el acceso de forma permanente.
:::

### ¿Qué opción debo elegir? \{#which-setting-should-i-choose\}

| Mi app...                                                    | Opción a elegir                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| No tiene sistema de inicio de sesión y solo usa los IDs de perfil anónimos de Adapty. | Usa la opción predeterminada, ya que los niveles de acceso siempre se comparten entre IDs de perfil anónimos en las tres opciones. |
| Tiene un sistema de inicio de sesión opcional y permite a los clientes realizar compras antes de crear una cuenta. | Elige **Transferir acceso al nuevo usuario** para garantizar que los clientes que compren sin una cuenta puedan restaurar sus transacciones más adelante. |
| Requiere que los clientes creen una cuenta antes de comprar, pero permite que las compras estén vinculadas a varios Customer User IDs. | Elige **Transferir acceso al nuevo usuario** para garantizar que solo un Customer User ID tenga acceso a la vez, permitiendo a los usuarios iniciar sesión con un Customer User ID diferente sin perder su acceso de pago. |
| Requiere que los clientes creen una cuenta antes de comprar, con reglas estrictas que vinculan las compras a un único Customer User ID. | Elige **Deshabilitado** para garantizar que las transacciones nunca se transfieran entre cuentas. |