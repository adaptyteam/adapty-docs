
## Mã StoreKit hệ thống \{#system-storekit-codes\}

| Lỗi | Mã | Mô tả |
|-----|----|-----------|
| unknown | 0 | Lỗi này cho biết đã xảy ra lỗi không xác định hoặc không mong đợi. |
| clientInvalid | 1 | Mã lỗi này cho biết client không được phép thực hiện hành động đã thử. |
| paymentCancelled | 2 | <p>Mã lỗi này cho biết người dùng đã hủy yêu cầu thanh toán.</p><p>Không cần thực hiện hành động nào, nhưng về mặt logic kinh doanh, bạn có thể đề nghị giảm giá cho người dùng hoặc nhắc nhở họ sau.</p> |
| paymentInvalid | 3 | Lỗi này cho biết một trong các tham số thanh toán không được cửa hàng nhận dạng. |
| paymentNotAllowed | 4 | <p>Mã lỗi này cho biết người dùng không được phép ủy quyền thanh toán. Các lý do có thể:</p><p></p><p>- Thanh toán không được hỗ trợ ở quốc gia của người dùng.</p><p>- Người dùng là trẻ vị thành niên.</p> |
| storeProductNotAvailable | 5 | Mã lỗi này cho biết sản phẩm được yêu cầu không có trên App Store. Hãy đảm bảo sản phẩm khả dụng ở quốc gia đang sử dụng. |
| cloudServicePermissionDenied | 6 | Mã lỗi này cho biết người dùng chưa cho phép truy cập thông tin dịch vụ Cloud. |
| cloudServiceNetworkConnectionFailed | 7 | Mã lỗi này cho biết thiết bị không thể kết nối với mạng. |
| cloudServiceRevoked | 8 | Mã lỗi này cho biết người dùng đã thu hồi quyền sử dụng dịch vụ cloud này. |
| privacyAcknowledgementRequired | 9 | Mã lỗi này cho biết người dùng chưa xác nhận chính sách quyền riêng tư của cửa hàng. |
| unauthorizedRequestData | 10 | Mã lỗi này cho biết yêu cầu được xây dựng không đúng. |
| invalidOfferIdentifier | 11 | <p>Mã định danh ưu đãi không hợp lệ. Các lý do có thể:</p><p></p><p>- Bạn chưa thiết lập ưu đãi với mã định danh đó trong App Store.</p><p>- Bạn đã thu hồi ưu đãi.</p><p>- Bạn nhập sai ID ưu đãi.</p> |
| invalidSignature | 12 | Mã lỗi này cho biết chữ ký trong payment discount không hợp lệ. Hãy đảm bảo bạn đã điền trường **Subscription key ID** và tải lên **Subscription key (.p8 file)** trong phần **App Store promotional offers**. Tham khảo [Add the In-App Purchase key to Adapty](generate-in-app-purchase-key#add-the-key-to-adapty) để biết chi tiết. |
| missingOfferParams | 13 | <p>Lỗi này cho biết có vấn đề với tích hợp Adapty hoặc với các ưu đãi.</p><p>Tham khảo [Configure App Store integration](app-store-connection-configuration) và [Offers](offers) để biết cách thiết lập.</p> |
| invalidOfferPrice | 14 | Mã lỗi này cho biết giá bạn đã chỉ định trong cửa hàng không còn hợp lệ. Các ưu đãi luôn phải thể hiện mức giá được giảm. |

## Mã Android tùy chỉnh \{#custom-android-codes\}

| Lỗi | Mã | Mô tả |
|-----|----|-----------|
| adaptyNotInitialized | 20 | Bạn cần cấu hình đúng Adapty SDK bằng phương thức `activate`. Tìm hiểu cách thực hiện tại [Install & configure Adapty SDK](sdk-installation-capacitor). |
| productNotFound | 22 | Lỗi này cho biết sản phẩm được yêu cầu mua không có trong cửa hàng. |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | Không tìm thấy gói đăng ký gốc cần được gia hạn. |
| billingServiceTimeout | 97 | Lỗi này cho biết yêu cầu đã đạt đến thời gian chờ tối đa trước khi Google Play có thể phản hồi. Điều này có thể do chẳng hạn như sự chậm trễ trong việc thực thi hành động được yêu cầu bởi lệnh gọi Play Billing Library. |
| featureNotSupported | 98 | Tính năng được yêu cầu không được hỗ trợ bởi Play Store trên thiết bị hiện tại. |
| billingServiceDisconnected | 99 | Lỗi nghiêm trọng này cho biết kết nối của ứng dụng client đến dịch vụ Google Play Store thông qua `BillingClient` đã bị ngắt. |
| billingServiceUnavailable | 102 | Lỗi tạm thời này cho biết dịch vụ Google Play Billing hiện không khả dụng. Trong hầu hết các trường hợp, điều này có nghĩa là có sự cố kết nối mạng ở đâu đó giữa thiết bị client và các dịch vụ Google Play Billing. |
| billingUnavailable | 103 | <p>Lỗi này cho biết đã xảy ra lỗi thanh toán của người dùng trong quá trình mua hàng. Các ví dụ về khi điều này có thể xảy ra bao gồm:</p><p></p><p>1\. Ứng dụng Play Store trên thiết bị của người dùng đã lỗi thời.</p><p>2. Người dùng ở quốc gia không được hỗ trợ.</p><p>3. Người dùng là người dùng doanh nghiệp và quản trị viên doanh nghiệp của họ đã vô hiệu hóa việc mua hàng của người dùng.</p><p>4. Google Play không thể tính phí phương thức thanh toán của người dùng. Ví dụ: thẻ tín dụng của người dùng có thể đã hết hạn.</p><p>5. Người dùng chưa đăng nhập vào ứng dụng Play Store.</p> |
| developerError | 105 | Đây là lỗi nghiêm trọng cho biết bạn đang sử dụng API không đúng cách. |
| billingError | 106 | Đây là lỗi nghiêm trọng cho biết có vấn đề nội bộ với chính Google Play. |
| itemAlreadyOwned | 107 | Sản phẩm consumable đã được mua trước đó. |
| itemNotOwned | 108 | Lỗi này cho biết hành động được yêu cầu trên mục đã thất bại sin |
| billingNetworkError | 112 | Lỗi này cho biết đã có vấn đề với kết nối mạng giữa thiết bị và hệ thống Play. |


## Mã StoreKit tùy chỉnh \{#custom-storekit-codes\}

| Lỗi | Mã | Mô tả |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>Lỗi này cho biết không có sản phẩm nào trong paywall có sẵn trong cửa hàng.</p><p>Nếu bạn gặp lỗi này, hãy làm theo các bước dưới đây để khắc phục:</p><p></p><p>1. Kiểm tra xem tất cả các sản phẩm đã được thêm vào Adapty Dashboard chưa.</p><p>2. Đảm bảo rằng Bundle ID của ứng dụng khớp với Bundle ID từ Apple Connect.</p><p>3. Xác minh rằng các mã định danh sản phẩm từ cửa hàng ứng dụng khớp với các mã bạn đã thêm vào Dashboard. Lưu ý rằng các mã định danh không được chứa Bundle ID, trừ khi nó đã được bao gồm trong cửa hàng.</p><p>4. Xác nhận rằng trạng thái thanh toán của ứng dụng đang hoạt động trong cài đặt thuế Apple của bạn. Đảm bảo rằng thông tin thuế của bạn được cập nhật và các chứng chỉ của bạn còn hiệu lực.</p><p>5. Kiểm tra xem có tài khoản ngân hàng được liên kết với ứng dụng hay không để đủ điều kiện kiếm tiền.</p><p>6. Kiểm tra xem các sản phẩm có khả dụng ở tất cả các khu vực không. Ngoài ra, đảm bảo rằng các sản phẩm của bạn ở trạng thái **"Ready to Submit"**.</p> |
| productRequestFailed | 1002 | <p>Không thể tải các sản phẩm khả dụng vào lúc này. Lý do có thể:</p><p></p><p>- Chưa có cache nào được tạo và đồng thời không có kết nối internet.</p> |
| cantMakePayments | 1003 | In-App purchase không được phép trên thiết bị này. |
| noPurchasesToRestore | 1004 | Lỗi này cho biết Google Play không tìm thấy giao dịch mua để khôi phục. |
| cantReadReceipt | 1005 | <p>Không có biên lai hợp lệ trên thiết bị. Đây có thể là sự cố trong quá trình kiểm tra sandbox.</p><p>Không cần thực hiện hành động nào, nhưng về mặt logic kinh doanh, bạn có thể đề nghị giảm giá cho người dùng hoặc nhắc nhở họ sau.</p> |
| productPurchaseFailed | 1006 | Mua sản phẩm thất bại. Lỗi này bao gồm một lỗi StoreKit bên dưới — đọc lỗi được bao gồm (hoặc bật verbose logs để xem trong console) để biết lý do thực sự. Lỗi được bao gồm thường là một trong các mã StoreKit 0–14 trong bảng trên — phổ biến nhất là `paymentCancelled`, `paymentInvalid`, `paymentNotAllowed`, hoặc `invalidOfferPrice`. Nếu bạn không thể xác định lý do cụ thể, hãy thử [sandbox profile](test-purchases-in-sandbox) mới; nếu vẫn thất bại, hãy liên hệ hỗ trợ Apple. |
| refreshReceiptFailed | 1010 | Lỗi này cho biết biên lai không được nhận. Chỉ áp dụng cho StoreKit 1. |
| receiveRestoredTransactionsFailed | 1011 | Khôi phục giao dịch mua thất bại. |


## Mã mạng tùy chỉnh \{#custom-network-codes\}

| Lỗi                | Mã | Mô tả                                                  |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | Bạn cần cấu hình đúng Adapty SDK bằng phương thức `activate`. Tìm hiểu cách thực hiện tại [Install & configure Adapty SDK](sdk-installation-capacitor). |
| badRequest           | 2003 | Yêu cầu không hợp lệ.                                                 |
| serverError          | 2004 | Lỗi máy chủ.                                                |
| networkFailed        | 2005 | Yêu cầu mạng thất bại.                                  |
| decodingFailed       | 2006 | Lỗi này cho biết giải mã phản hồi thất bại.          |
| encodingFailed       | 2009 | Lỗi này cho biết mã hóa yêu cầu thất bại.           |
| analyticsDisabled    | 3000 | Chúng tôi không thể xử lý các sự kiện analytics vì bạn đã tắt tính năng này. Tham khảo chủ đề [Analytics integration](analytics-integration) để biết chi tiết. |
| wrongParam           | 3001 | Lỗi này cho biết một số tham số của bạn không đúng: để trống khi không được phép để trống hoặc sai kiểu dữ liệu, v.v. |
| activateOnceError    | 3005 | Không thể gọi phương thức `.activate` nhiều hơn một lần. |
| profileWasChanged    | 3006 | Hồ sơ người dùng đã thay đổi trong quá trình thực hiện thao tác.           |
| unsupportedData      | 3007 | Lỗi này cho biết định dạng dữ liệu không được SDK hỗ trợ. |
| persistingDataError  | 3100 | Đã xảy ra lỗi khi lưu dữ liệu.                           |
| fetchTimeoutError    | 3101 | Lỗi này có nghĩa là paywall không thể được tải trong giới hạn thời gian đã đặt. Để tránh tình huống này, [thiết lập fallback cục bộ](fetch-paywalls-and-products). |
| operationInterrupted | 9000 | Thao tác này đã bị hệ thống gián đoạn.                |