
## 系统 StoreKit 错误代码 \{#system-storekit-codes\}

| 错误 | 代码 | 描述 |
|-----|----|-----------|
| unknown | 0 | 发生了未知或意外的错误。 |
| clientInvalid | 1 | 客户端无权执行所尝试的操作。 |
| paymentCancelled | 2 | <p>用户取消了支付请求。</p><p>无需采取任何操作，但从业务逻辑角度，您可以向用户提供折扣或稍后提醒他们。</p> |
| paymentInvalid | 3 | 商店无法识别某个支付参数。 |
| paymentNotAllowed | 4 | <p>用户无权授权付款。可能原因：</p><p></p><p>- 该用户所在国家/地区不支持付款。</p><p>- 该用户未成年。</p> |
| storeProductNotAvailable | 5 | 请求的产品在 App Store 中不存在。请确认该产品在所用国家/地区可用。 |
| cloudServicePermissionDenied | 6 | 用户未允许访问云服务信息。 |
| cloudServiceNetworkConnectionFailed | 7 | 设备无法连接网络。 |
| cloudServiceRevoked | 8 | 用户已撤销使用此云服务的权限。 |
| privacyAcknowledgementRequired | 9 | 用户尚未确认商店隐私政策。 |
| unauthorizedRequestData | 10 | 请求构建不正确。 |
| invalidOfferIdentifier | 11 | <p>优惠标识符无效。可能原因：</p><p></p><p>- 您尚未在 App Store 中设置具有该标识符的优惠。</p><p>- 您已撤销该优惠。</p><p>- 优惠 ID 拼写有误。</p> |
| invalidSignature | 12 | 支付折扣中的签名无效。请确认已填写 **Subscription key ID** 字段，并在 **App Store promotional offers** 部分上传了 **Subscription key (.p8 file)**。详情请参阅 [Add the In-App Purchase key to Adapty](generate-in-app-purchase-key#add-the-key-to-adapty)。 |
| missingOfferParams | 13 | <p>Adapty 集成或优惠存在问题。</p><p>详情请参阅 [Configure App Store integration](app-store-connection-configuration) 和 [Offers](offers)。</p> |
| invalidOfferPrice | 14 | 您在商店中指定的价格已不再有效。优惠价格必须始终低于原价。 |

## 自定义 Android 错误代码 \{#custom-android-codes\}

| 错误 | 代码 | 描述 |
|-----|----|-----------|
| adaptyNotInitialized | 20 | 您需要通过 `activate` 方法正确配置 Adapty SDK。请参阅 [Install & configure Adapty SDK](sdk-installation-capacitor)。 |
| productNotFound | 22 | 请求购买的产品在商店中不可用。 |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | 未找到需要续订的原始订阅。 |
| billingServiceTimeout | 97 | 请求在 Google Play 响应之前已达到最大超时时间。这可能是由于 Play Billing Library 调用所请求操作的执行延迟等原因导致的。 |
| featureNotSupported | 98 | 当前设备上的 Play Store 不支持所请求的功能。 |
| billingServiceDisconnected | 99 | 此致命错误表示客户端应用通过 `BillingClient` 与 Google Play Store 服务的连接已断开。 |
| billingServiceUnavailable | 102 | 此瞬时错误表示 Google Play 计费服务当前不可用。大多数情况下，这意味着客户端设备与 Google Play 计费服务之间的网络连接存在问题。 |
| billingUnavailable | 103 | <p>此错误表示购买过程中发生了用户计费错误。可能出现的情况包括：</p><p></p><p>1\. 用户设备上的 Play Store 应用版本过旧。</p><p>2. 用户所在国家/地区不受支持。</p><p>3. 用户是企业用户，其企业管理员已禁止用户进行购买。</p><p>4. Google Play 无法向用户的支付方式收费，例如用户的信用卡已过期。</p><p>5. 用户未登录 Play Store 应用。</p> |
| developerError | 105 | 此致命错误表示 API 使用不当。 |
| billingError | 106 | 此致命错误表示 Google Play 内部出现问题。 |
| itemAlreadyOwned | 107 | 该消耗型商品已被购买。 |
| itemNotOwned | 108 | 对该商品请求的操作失败。 |
| billingNetworkError | 112 | 设备与 Play 系统之间的网络连接存在问题。 |


## 自定义 StoreKit 错误代码 \{#custom-storekit-codes\}

| 错误 | 代码 | 描述 |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>付费墙中没有任何产品在商店中可用。</p><p>如果遇到此错误，请按以下步骤排查：</p><p></p><p>1. 检查所有产品是否已添加到 Adapty 看板。</p><p>2. 确认应用的 Bundle ID 与 Apple Connect 中的一致。</p><p>3. 验证应用商店中的产品标识符与您在看板中添加的标识符是否匹配。请注意，标识符不应包含 Bundle ID，除非商店中本身已包含。</p><p>4. 在 Apple 税务设置中确认应用付费状态为有效，并确保税务信息是最新的且证书有效。</p><p>5. 检查应用是否已绑定银行账户以满足货币化条件。</p><p>6. 检查产品是否在所有地区可用，并确保您的产品处于 **"Ready to Submit"** 状态。</p> |
| productRequestFailed | 1002 | <p>当前无法获取可用产品。可能原因：</p><p></p><p>- 尚未创建缓存，同时也没有网络连接。</p> |
| cantMakePayments | 1003 | 此设备不允许进行应用内购买。 |
| noPurchasesToRestore | 1004 | Google Play 未找到可恢复的购买记录。 |
| cantReadReceipt | 1005 | <p>设备上没有有效的收据。这在沙盒测试期间可能会出现。</p><p>无需采取任何操作，但从业务逻辑角度，您可以向用户提供折扣或稍后提醒他们。</p> |
| productPurchaseFailed | 1006 | 产品购买失败。此错误封装了底层 StoreKit 错误——请读取封装的错误（或启用详细日志在控制台中查看）以获取实际原因。封装的错误通常是上表中代码为 0–14 的 StoreKit 错误——最常见的是 `paymentCancelled`、`paymentInvalid`、`paymentNotAllowed` 或 `invalidOfferPrice`。如果无法确定具体原因，请尝试新建[沙盒账号](test-purchases-in-sandbox)；如果问题仍然存在，请联系 Apple 支持。 |
| refreshReceiptFailed | 1010 | 未收到收据。仅适用于 StoreKit 1。 |
| receiveRestoredTransactionsFailed | 1011 | 购买恢复失败。 |


## 自定义网络错误代码 \{#custom-network-codes\}

| 错误 | 代码 | 描述 |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | 您需要通过 `activate` 方法正确配置 Adapty SDK。请参阅 [Install & configure Adapty SDK](sdk-installation-capacitor)。 |
| badRequest           | 2003 | 请求格式错误。 |
| serverError          | 2004 | 服务器错误。 |
| networkFailed        | 2005 | 网络请求失败。 |
| decodingFailed       | 2006 | 响应解码失败。 |
| encodingFailed       | 2009 | 请求编码失败。 |
| analyticsDisabled    | 3000 | 由于您已选择退出，我们无法处理分析事件。详情请参阅 [Analytics integration](analytics-integration)。 |
| wrongParam           | 3001 | 某些参数不正确：不能为空时为空，或类型错误等。 |
| activateOnceError    | 3005 | `.activate` 方法不能被多次调用。 |
| profileWasChanged    | 3006 | 操作过程中用户画像已被更改。 |
| unsupportedData      | 3007 | SDK 不支持该数据格式。 |
| persistingDataError  | 3100 | 保存数据时出错。 |
| fetchTimeoutError    | 3101 | 付费墙未能在设定的时间限制内获取。为避免此情况，请[设置本地备用内容](fetch-paywalls-and-products)。 |
| operationInterrupted | 9000 | 此操作被系统中断。 |