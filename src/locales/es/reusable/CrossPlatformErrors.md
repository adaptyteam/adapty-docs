## Códigos de sistema de StoreKit \{#system-storekit-codes\}

| Error | Código | Descripción |
|-----|----|-----------|
| unknown | 0 | Este error indica que ocurrió un error desconocido o inesperado. |
| clientInvalid | 1 | Este código de error indica que el cliente no tiene permiso para realizar la acción solicitada. |
| paymentCancelled | 2 | <p>Este código de error indica que el usuario canceló una solicitud de pago.</p><p>No es necesaria ninguna acción, pero desde el punto de vista de la lógica de negocio, puedes ofrecer un descuento al usuario o recordárselo más adelante.</p> |
| paymentInvalid | 3 | Este error indica que el store no reconoció uno de los parámetros de pago. |
| paymentNotAllowed | 4 | <p>Este código de error indica que el usuario no tiene permiso para autorizar pagos. Posibles razones:</p><p></p><p>- Los pagos no están disponibles en el país del usuario.</p><p>- El usuario es menor de edad.</p> |
| storeProductNotAvailable | 5 | Este código de error indica que el producto solicitado no está disponible en el App Store. Asegúrate de que el producto esté disponible para el país utilizado. |
| cloudServicePermissionDenied | 6 | Este código de error indica que el usuario no ha permitido el acceso a la información del servicio en la nube. |
| cloudServiceNetworkConnectionFailed | 7 | Este código de error indica que el dispositivo no pudo conectarse a la red. |
| cloudServiceRevoked | 8 | Este código de error indica que el usuario ha revocado el permiso para usar este servicio en la nube. |
| privacyAcknowledgementRequired | 9 | Este código de error indica que el usuario aún no ha aceptado la política de privacidad del store. |
| unauthorizedRequestData | 10 | Este código de error indica que la solicitud está construida de forma incorrecta. |
| invalidOfferIdentifier | 11 | <p>El identificador de la oferta no es válido. Posibles razones:</p><p></p><p>- No has configurado una oferta con ese identificador en el App Store.</p><p>- Has revocado la oferta.</p><p>- El ID de la oferta tiene un error tipográfico.</p> |
| invalidSignature | 12 | Este código de error indica que la firma en un descuento de pago no es válida. Asegúrate de haber rellenado el campo **In-app purchase Key ID** y de haber subido el archivo **In-App Purchase Private Key**. Consulta el tema [Configurar la integración con App Store](app-store-connection-configuration) para más detalles. |
| missingOfferParams | 13 | <p>Este error indica problemas con la integración de Adapty o con las ofertas.</p><p>Consulta [Configurar la integración con App Store](app-store-connection-configuration) y [Ofertas](offers) para obtener detalles sobre cómo configurarlas.</p> |
| invalidOfferPrice | 14 | Este código de error indica que el precio que especificaste en el store ya no es válido. Las ofertas siempre deben representar un precio con descuento. |

## Códigos personalizados de Android \{#custom-android-codes\}

| Error | Código | Descripción |
|-----|----|-----------|
| adaptyNotInitialized | 20 | Debes configurar correctamente el SDK de Adapty mediante el método `Adapty.activate`. Aprende cómo hacerlo [para React Native](sdk-installation-reactnative). |
| productNotFound | 22 | Este error indica que el producto solicitado para la compra no está disponible en el store. |
| invalidJson | 23 | El JSON del paywall no es válido. Corrígelo en el Adapty Dashboard. Consulta el tema [Personalizar el paywall con Remote Config](customize-paywall-with-remote-config) para más detalles sobre cómo corregirlo. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | No se encontró la suscripción original que debe renovarse. |
| pendingPurchase | 25 | Este error indica que el estado de la compra es pendiente en lugar de completado. Consulta la página [Gestión de transacciones pendientes](https://developer.android.com/google/play/billing/integrate#pending) en la documentación de Android Developer para más detalles. |
| billingServiceTimeout | 97 | Este error indica que la solicitud alcanzó el tiempo de espera máximo antes de que Google Play pudiera responder. Esto puede deberse, por ejemplo, a un retraso en la ejecución de la acción solicitada por la llamada a la Play Billing Library. |
| featureNotSupported | 98 | La función solicitada no es compatible con el Play Store en el dispositivo actual. |
| billingServiceDisconnected | 99 | Este error fatal indica que la conexión de la app cliente con el servicio de Google Play Store a través del `BillingClient` se ha interrumpido. |
| billingServiceUnavailable | 102 | Este error transitorio indica que el servicio de Google Play Billing no está disponible en este momento. En la mayoría de los casos, significa que hay un problema de conexión de red entre el dispositivo cliente y los servicios de Google Play Billing. |
| billingUnavailable | 103 | <p>Este error indica que ocurrió un error de facturación del usuario durante el proceso de compra. Algunos ejemplos de cuándo puede ocurrir:</p><p></p><p>1\. La app Play Store del dispositivo del usuario está desactualizada.</p><p>2. El usuario se encuentra en un país no compatible.</p><p>3. El usuario es un empleado de una empresa cuyo administrador ha deshabilitado las compras.</p><p>4. Google Play no puede cargar el método de pago del usuario. Por ejemplo, la tarjeta de crédito del usuario puede haber expirado.</p><p>5. El usuario no ha iniciado sesión en la app Play Store.</p> |
| developerError | 105 | Este es un error fatal que indica que estás usando una API de forma incorrecta. |
| billingError | 106 | Este es un error fatal que indica un problema interno con el propio Google Play. |
| itemAlreadyOwned | 107 | El producto consumible ya ha sido adquirido. |
| itemNotOwned | 108 | Este error indica que la acción solicitada sobre el artículo falló. |


## Códigos personalizados de StoreKit \{#custom-storekit-codes\}

| Error | Código | Descripción |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>Este error indica que ninguno de los productos del paywall está disponible en el store.</p><p>Si encuentras este error, sigue los pasos a continuación para resolverlo:</p><p></p><p>1. Comprueba que todos los productos se han añadido al Adapty Dashboard.</p><p>2. Asegúrate de que el Bundle ID de tu app coincide con el de Apple Connect.</p><p>3. Verifica que los identificadores de producto de los stores coincidan con los que has añadido al Dashboard. Ten en cuenta que los identificadores no deben incluir el Bundle ID, salvo que ya esté incluido en el store.</p><p>4. Confirma que el estado de pago de la app está activo en tu configuración fiscal de Apple. Asegúrate de que tu información fiscal está actualizada y que tus certificados son válidos.</p><p>5. Comprueba que hay una cuenta bancaria vinculada a la app para que sea elegible para la monetización.</p><p>6. Verifica que los productos estén disponibles en todas las regiones. Además, asegúrate de que tus productos estén en estado **"Ready to Submit"**.</p> |
| productRequestFailed | 1002 | <p>No es posible obtener los productos disponibles en este momento. Posible razón:</p><p></p><p>- Aún no se ha creado ninguna caché y tampoco hay conexión a internet.</p> |
| cantMakePayments | 1003 | Las compras in-app no están permitidas en este dispositivo. |
| noPurchasesToRestore | 1004 | Este error indica que Google Play no encontró ninguna compra que restaurar. |
| cantReadReceipt | 1005 | <p>No hay ningún recibo válido disponible en el dispositivo. Esto puede ser un problema durante las pruebas en sandbox.</p><p>No es necesaria ninguna acción, pero desde el punto de vista de la lógica de negocio, puedes ofrecer un descuento al usuario o recordárselo más adelante.</p> |
| productPurchaseFailed | 1006 | La compra del producto falló. |
| refreshReceiptFailed | 1010 | Este error indica que no se recibió el recibo. Solo aplica a StoreKit 1. |
| receiveRestoredTransactionsFailed | 1011 | La restauración de compras falló. |


## Códigos personalizados de red \{#custom-network-codes\}

| Error                | Código | Descripción                                                  |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | Debes configurar correctamente el SDK de Adapty mediante el método `Adapty.activate`. Aprende cómo hacerlo [para React Native](sdk-installation-reactnative). |
| badRequest           | 2003 | Solicitud incorrecta.                                                 |
| serverError          | 2004 | Error del servidor.                                                |
| networkFailed        | 2005 | La solicitud de red falló.                                  |
| decodingFailed       | 2006 | Este error indica que la decodificación de la respuesta falló.          |
| encodingFailed       | 2009 | Este error indica que la codificación de la solicitud falló.           |
| analyticsDisabled    | 3000 | No podemos procesar eventos de analítica porque los has desactivado. Consulta el tema [Integración de analítica](analytics-integration) para más detalles. |
| wrongParam           | 3001 | Este error indica que alguno de tus parámetros no es correcto: está en blanco cuando no puede estarlo, tiene un tipo incorrecto, etc. |
| activateOnceError    | 3005 | No es posible llamar al método `.activate` más de una vez. |
| profileWasChanged    | 3006 | El perfil del usuario cambió durante la operación.           |
| fetchTimeoutError    | 3101 | Este error significa que el paywall no pudo obtenerse dentro del límite establecido. Para evitar esta situación, [configura respaldos locales](fetch-paywalls-and-products). |
| operationInterrupted | 9000 | Esta operación fue interrumpida por el sistema.                |