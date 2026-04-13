## 系统 StoreKit 错误代码 \{#system-storekit-codes\}

| 错误 | 代码 | 描述 |
|-----|----|-----------|
| unknown | 0 | 此错误表示发生了未知或意外的错误。 |
| clientInvalid | 1 | 此错误代码表示客户端不被允许执行所尝试的操作。 |
| paymentCancelled | 2 | <p>此错误代码表示用户取消了付款请求。</p><p>无需采取任何操作，但从业务逻辑角度，您可以向用户提供折扣或稍后提醒他们。</p> |
| paymentInvalid | 3 | 此错误表示商店无法识别某个付款参数。 |
| paymentNotAllowed | 4 | <p>此错误代码表示用户不被允许授权付款。可能的原因：</p><p></p><p>- 用户所在国家/地区不支持付款。</p><p>- 用户未成年。</p> |
| storeProductNotAvailable | 5 | 此错误代码表示所请求的产品在 App Store 中不存在。请确保该产品在所使用的国家/地区可用。 |
| cloudServicePermissionDenied | 6 | 此错误代码表示用户尚未允许访问云服务信息。 |
| cloudServiceNetworkConnectionFailed | 7 | 此错误代码表示设备无法连接到网络。 |
| cloudServiceRevoked | 8 | 此错误代码表示用户已撤销使用此云服务的权限。 |
| privacyAcknowledgementRequired | 9 | 此错误代码表示用户尚未确认商店隐私政策。 |
| unauthorizedRequestData | 10 | 此错误代码表示请求构建不正确。 |
| invalidOfferIdentifier | 11 | <p>优惠标识符无效。可能的原因：</p><p></p><p>- 您尚未在 App Store 中设置具有该标识符的优惠。</p><p>- 您已撤销该优惠。</p><p>- 您误输了优惠 ID。</p> |
| invalidSignature | 12 | 此错误代码表示付款折扣中的签名无效。请确保您已填写 **In-app purchase Key ID** 字段并上传了 **In-App Purchase Private Key** 文件。详情请参阅[配置 App Store 集成](app-store-connection-configuration)主题。 |
| missingOfferParams | 13 | <p>此错误表示 Adapty 集成或优惠存在问题。</p><p>有关如何设置的详情，请参阅[配置 App Store 集成](app-store-connection-configuration)和[优惠](offers)。</p> |
| invalidOfferPrice | 14 | 此错误代码表示您在商店中指定的价格已不再有效。优惠必须始终代表折扣价格。 |

## 自定义 Android 错误代码 \{#custom-android-codes\}

| 错误 | 代码 | 描述 |
|-----|----|-----------|
| adaptyNotInitialized | 20 | 您需要通过 `Adapty.activate` 方法正确配置 Adapty SDK。了解如何[为 React Native 配置](sdk-installation-reactnative)。 |
| productNotFound | 22 | 此错误表示所请求购买的产品在商店中不可用。 |
| invalidJson | 23 | 付费墙 JSON 无效。请在 Adapty 控制台中修复它。有关如何修复的详情，请参阅[使用远程配置自定义付费墙](customize-paywall-with-remote-config)主题。 |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | 未找到需要续订的原始订阅。 |
| pendingPurchase | 25 | 此错误表示购买状态为待处理而非已购买。详情请参阅 Android 开发者文档中的[处理待处理交易](https://developer.android.com/google/play/billing/integrate#pending)页面。 |
| billingServiceTimeout | 97 | 此错误表示请求在 Google Play 响应之前已达到最大超时时间。例如，这可能是由 Play Billing Library 调用所请求操作的执行延迟引起的。 |
| featureNotSupported | 98 | 当前设备上的 Play Store 不支持所请求的功能。 |
| billingServiceDisconnected | 99 | 此严重错误表示客户端应用通过 `BillingClient` 与 Google Play Store 服务的连接已断开。 |
| billingServiceUnavailable | 102 | 此暂时性错误表示 Google Play Billing 服务当前不可用。在大多数情况下，这意味着客户端设备与 Google Play Billing 服务之间的某处存在网络连接问题。 |
| billingUnavailable | 103 | <p>此错误表示在购买过程中发生了用户计费错误。可能发生此情况的示例包括：</p><p></p><p>1\. 用户设备上的 Play Store 应用已过期。</p><p>2. 用户位于不受支持的国家/地区。</p><p>3. 用户是企业用户，且其企业管理员已禁止用户进行购买。</p><p>4. Google Play 无法向用户的付款方式收费。例如，用户的信用卡可能已过期。</p><p>5. 用户未登录 Play Store 应用。</p> |
| developerError | 105 | 这是一个严重错误，表示您未正确使用某个 API。 |
| billingError | 106 | 这是一个严重错误，表示 Google Play 本身存在内部问题。 |
| itemAlreadyOwned | 107 | 消耗型商品已被购买。 |
| itemNotOwned | 108 | 此错误表示对该商品所请求的操作失败。 |

## 自定义 StoreKit 错误代码 \{#custom-storekit-codes\}

| 错误 | 代码 | 描述 |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>此错误表示付费墙中没有任何产品在商店中可用。</p><p>如果您遇到此错误，请按照以下步骤解决：</p><p></p><p>1. 检查所有产品是否已添加到 Adapty 控制台。</p><p>2. 确保您应用的 Bundle ID 与 Apple Connect 中的 Bundle ID 一致。</p><p>3. 验证应用商店中的产品标识符与您添加到控制台中的标识符一致。请注意，标识符不应包含 Bundle ID，除非商店中已包含它。</p><p>4. 确认您的 Apple 税务设置中应用付费状态为有效。确保您的税务信息是最新的，且证书有效。</p><p>5. 检查是否已关联银行账户，以便应用有资格进行货币化。</p><p>6. 检查产品是否在所有地区可用。同时，确保您的产品处于 **"Ready to Submit"** 状态。</p> |
| productRequestFailed | 1002 | <p>当前无法获取可用产品。可能的原因：</p><p></p><p>- 尚未创建缓存，同时也没有网络连接。</p> |
| cantMakePayments | 1003 | 此设备不允许进行应用内购买。 |
| noPurchasesToRestore | 1004 | 此错误表示 Google Play 未找到可恢复的购买记录。 |
| cantReadReceipt | 1005 | <p>设备上没有有效的收据。这在沙盒测试期间可能是一个问题。</p><p>无需采取任何操作，但从业务逻辑角度，您可以向用户提供折扣或稍后提醒他们。</p> |
| productPurchaseFailed | 1006 | 产品购买失败。 |
| refreshReceiptFailed | 1010 | 此错误表示未收到收据。仅适用于 StoreKit 1。 |
| receiveRestoredTransactionsFailed | 1011 | 购买恢复失败。 |

## 自定义网络错误代码 \{#custom-network-codes\}

| 错误 | 代码 | 描述 |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated | 2002 | 您需要通过 `Adapty.activate` 方法正确配置 Adapty SDK。了解如何[为 React Native 配置](sdk-installation-reactnative)。 |
| badRequest | 2003 | 错误请求。 |
| serverError | 2004 | 服务器错误。 |
| networkFailed | 2005 | 网络请求失败。 |
| decodingFailed | 2006 | 此错误表示响应解码失败。 |
| encodingFailed | 2009 | 此错误表示请求编码失败。 |
| analyticsDisabled | 3000 | 由于您已选择退出，我们无法处理分析事件。详情请参阅[分析集成](analytics-integration)主题。 |
| wrongParam | 3001 | 此错误表示您的某些参数不正确：不能为空时为空，或类型错误等。 |
| activateOnceError | 3005 | 不能多次调用 `.activate` 方法。 |
| profileWasChanged | 3006 | 操作期间用户画像已更改。 |
| fetchTimeoutError | 3101 | 此错误表示付费墙未能在设定的时间限制内获取。为避免此情况，请[设置本地备用方案](fetch-paywalls-and-products)。 |
| operationInterrupted | 9000 | 此操作被系统中断。 |