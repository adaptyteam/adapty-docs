
## 系统 StoreKit 错误码 \{#system-storekit-codes\}

| 错误 | 错误码 | 描述 |
|-----|----|-----------|
| unknown | 0 | 发生了未知或意外的错误。 |
| clientInvalid | 1 | 客户端不被允许执行此操作。 |
| paymentCancelled | 2 | <p>用户取消了支付请求。</p><p>无需特别处理，但从业务逻辑角度，你可以向用户提供折扣或稍后再次提醒。</p> |
| paymentInvalid | 3 | 支付参数中有一项未被商店识别。 |
| paymentNotAllowed | 4 | <p>用户无权授权支付。可能的原因：</p><p></p><p>- 该用户所在国家/地区不支持支付。</p><p>- 用户是未成年人。</p> |
| storeProductNotAvailable | 5 | 所请求的产品在 App Store 中不存在。请确认该产品在对应国家/地区可用。 |
| cloudServicePermissionDenied | 6 | 用户未允许访问云服务信息。 |
| cloudServiceNetworkConnectionFailed | 7 | 设备无法连接网络。 |
| cloudServiceRevoked | 8 | 用户已撤销使用此云服务的权限。 |
| privacyAcknowledgementRequired | 9 | 用户尚未确认商店隐私政策。 |
| unauthorizedRequestData | 10 | 请求构建不正确。 |
| invalidOfferIdentifier | 11 | <p>优惠标识符无效。可能的原因：</p><p></p><p>- 你尚未在 App Store 中设置该标识符对应的优惠。</p><p>- 该优惠已被撤销。</p><p>- 优惠 ID 填写有误。</p> |
| invalidSignature | 12 | 支付折扣中的签名无效。请确认已填写 **In-app purchase Key ID** 字段并上传了 **In-App Purchase Private Key** 文件。详情请参阅[配置 App Store 集成](app-store-connection-configuration)。 |
| missingOfferParams | 13 | <p>Adapty 集成或优惠配置存在问题。</p><p>请参阅[配置 App Store 集成](app-store-connection-configuration)和[优惠](offers)了解设置方法。</p> |
| invalidOfferPrice | 14 | 你在商店中设置的价格已失效。优惠价格必须始终低于原价。 |

## 自定义 Android 错误码 \{#custom-android-codes\}

| 错误 | 错误码 | 描述 |
|-----|----|-----------|
| adaptyNotInitialized | 20 | 需要通过 `activate` 方法正确配置 Adapty SDK。具体操作请参阅[安装与配置 Adapty SDK](sdk-installation-capacitor)。 |
| productNotFound | 22 | 所请求购买的产品在商店中不可用。 |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | 未找到需要续订的原始订阅。 |
| billingServiceTimeout | 97 | 请求在 Google Play 响应前已超时。例如，Play Billing Library 调用所请求的操作执行延迟可能导致此问题。 |
| featureNotSupported | 98 | 当前设备的 Play Store 不支持所请求的功能。 |
| billingServiceDisconnected | 99 | 客户端应用通过 `BillingClient` 与 Google Play Store 服务的连接已断开，这是一个致命错误。 |
| billingServiceUnavailable | 102 | Google Play 计费服务当前不可用（暂时性错误）。大多数情况下，这意味着客户端设备与 Google Play 计费服务之间存在网络连接问题。 |
| billingUnavailable | 103 | <p>购买过程中发生用户计费错误。可能出现的情况包括：</p><p></p><p>1\. 用户设备上的 Play Store 应用版本过旧。</p><p>2. 用户所在国家/地区不受支持。</p><p>3. 用户是企业用户，且企业管理员已禁止用户进行购买。</p><p>4. Google Play 无法向用户的付款方式收费，例如用户的信用卡已过期。</p><p>5. 用户未登录 Play Store 应用。</p> |
| developerError | 105 | 致命错误，表示 API 使用方式不正确。 |
| billingError | 106 | 致命错误，表示 Google Play 内部出现问题。 |
| itemAlreadyOwned | 107 | 该消耗型商品已被购买。 |
| itemNotOwned | 108 | 对该商品执行的操作失败。 |
| billingNetworkError | 112 | 设备与 Play 系统之间的网络连接出现问题。 |


## 自定义 StoreKit 错误码 \{#custom-storekit-codes\}

| 错误 | 错误码 | 描述 |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>付费墙中的所有产品在商店中均不可用。</p><p>如果遇到此错误，请按以下步骤排查：</p><p></p><p>1. 检查所有产品是否已添加到 Adapty 看板。</p><p>2. 确认应用的 Bundle ID 与 Apple Connect 中的一致。</p><p>3. 核实应用商店中的产品标识符与看板中添加的标识符一致。注意：标识符不应包含 Bundle ID，除非商店本身已包含。</p><p>4. 确认 Apple 税务设置中应用的付费状态为有效，税务信息是最新的，且证书有效。</p><p>5. 检查应用是否已绑定银行账户，以便符合变现资格。</p><p>6. 检查产品是否在所有地区可用，并确保产品状态为 **"Ready to Submit"**。</p> |
| productRequestFailed | 1002 | <p>当前无法获取可用产品。可能的原因：</p><p></p><p>- 尚未创建缓存，同时也无网络连接。</p> |
| cantMakePayments | 1003 | 此设备不允许进行应用内购买。 |
| noPurchasesToRestore | 1004 | Google Play 未找到可恢复的购买记录。 |
| cantReadReceipt | 1005 | <p>设备上没有有效的收据。这在沙盒测试期间可能会出现。</p><p>无需特别处理，但从业务逻辑角度，你可以向用户提供折扣或稍后再次提醒。</p> |
| productPurchaseFailed | 1006 | 产品购买失败。此错误封装了底层 StoreKit 错误——请读取封装的错误（或开启详细日志在控制台查看）以获取实际原因。封装的错误通常是上表中 StoreKit 错误码 0–14 之一，最常见的是 `paymentCancelled`、`paymentInvalid`、`paymentNotAllowed` 或 `invalidOfferPrice`。如果无法确定具体原因，请尝试新建一个[沙盒用户画像](test-purchases-in-sandbox)；若问题依然存在，请联系 Apple 客服。 |
| refreshReceiptFailed | 1010 | 未收到收据。仅适用于 StoreKit 1。 |
| receiveRestoredTransactionsFailed | 1011 | 购买恢复失败。 |


## 自定义网络错误码 \{#custom-network-codes\}

| 错误 | 错误码 | 描述 |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | 需要通过 `activate` 方法正确配置 Adapty SDK。具体操作请参阅[安装与配置 Adapty SDK](sdk-installation-capacitor)。 |
| badRequest           | 2003 | 错误请求。 |
| serverError          | 2004 | 服务器错误。 |
| networkFailed        | 2005 | 网络请求失败。 |
| decodingFailed       | 2006 | 响应解码失败。 |
| encodingFailed       | 2009 | 请求编码失败。 |
| analyticsDisabled    | 3000 | 由于你已选择退出，无法处理分析事件。详情请参阅[分析集成](analytics-integration)。 |
| wrongParam           | 3001 | 部分参数不正确：不允许为空时为空，或类型错误等。 |
| activateOnceError    | 3005 | `.activate` 方法只能调用一次。 |
| profileWasChanged    | 3006 | 操作期间用户画像已发生变更。 |
| unsupportedData      | 3007 | SDK 不支持该数据格式。 |
| persistingDataError  | 3100 | 数据保存时出错。 |
| fetchTimeoutError    | 3101 | 付费墙未能在规定时限内获取。为避免此情况，请[设置本地备用方案](fetch-paywalls-and-products)。 |
| operationInterrupted | 9000 | 此操作被系统中断。 |