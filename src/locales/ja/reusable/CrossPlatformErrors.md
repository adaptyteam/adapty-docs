
## システム StoreKit コード \{#system-storekit-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| unknown | 0 | 不明または予期しないエラーが発生したことを示します。 |
| clientInvalid | 1 | クライアントが試みた操作を実行する権限がないことを示します。 |
| paymentCancelled | 2 | <p>ユーザーが支払いリクエストをキャンセルしたことを示します。</p><p>対応は不要ですが、ビジネスロジックの観点から、割引を提供したり後でリマインダーを送ったりすることができます。</p> |
| paymentInvalid | 3 | 支払いパラメーターの一つがストアに認識されなかったことを示します。 |
| paymentNotAllowed | 4 | <p>ユーザーが支払いの承認を許可されていないことを示します。考えられる理由：</p><p></p><p>- ユーザーの国では支払いがサポートされていない。</p><p>- ユーザーが未成年である。</p> |
| storeProductNotAvailable | 5 | リクエストされたプロダクトが App Store に存在しないことを示します。該当国でプロダクトが利用可能かどうか確認してください。 |
| cloudServicePermissionDenied | 6 | ユーザーがクラウドサービス情報へのアクセスを許可していないことを示します。 |
| cloudServiceNetworkConnectionFailed | 7 | デバイスがネットワークに接続できなかったことを示します。 |
| cloudServiceRevoked | 8 | ユーザーがこのクラウドサービスの使用許可を取り消したことを示します。 |
| privacyAcknowledgementRequired | 9 | ユーザーがストアのプライバシーポリシーにまだ同意していないことを示します。 |
| unauthorizedRequestData | 10 | リクエストの構築が正しくないことを示します。 |
| invalidOfferIdentifier | 11 | <p>オファー識別子が無効です。考えられる理由：</p><p></p><p>- その識別子のオファーが App Store に設定されていない。</p><p>- オファーが取り消されている。</p><p>- オファー ID の入力ミスがある。</p> |
| invalidSignature | 12 | 支払い割引の署名が無効であることを示します。**Subscription key ID** フィールドに入力し、**App Store promotional offers** セクションで **Subscription key (.p8 file)** をアップロードしたことを確認してください。詳細は [Add the In-App Purchase key to Adapty](generate-in-app-purchase-key#add-the-key-to-adapty) を参照してください。 |
| missingOfferParams | 13 | <p>Adapty の連携またはオファーに問題があることを示します。</p><p>設定方法については [Configure App Store integration](app-store-connection-configuration) および [Offers](offers) を参照してください。</p> |
| invalidOfferPrice | 14 | ストアで指定した価格が無効になったことを示します。オファーは常に割引価格である必要があります。 |

## Android カスタムコード \{#custom-android-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| adaptyNotInitialized | 20 | `activate` メソッドで Adapty SDK を正しく設定する必要があります。設定方法は [Install & configure Adapty SDK](sdk-installation-capacitor) を参照してください。 |
| productNotFound | 22 | 購入リクエストされたプロダクトがストアで利用できないことを示します。 |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | 更新が必要な元のサブスクリプションが見つかりません。 |
| billingServiceTimeout | 97 | Google Play が応答する前にリクエストが最大タイムアウトに達したことを示します。これは、Play Billing Library の呼び出しで要求されたアクションの実行が遅延した場合などに発生することがあります。 |
| featureNotSupported | 98 | リクエストされた機能が現在のデバイスの Play Store でサポートされていません。 |
| billingServiceDisconnected | 99 | クライアントアプリと Google Play ストアサービス間の `BillingClient` を介した接続が切断されたことを示す致命的なエラーです。 |
| billingServiceUnavailable | 102 | Google Play Billing サービスが現在利用できないことを示す一時的なエラーです。ほとんどの場合、クライアントデバイスと Google Play Billing サービス間のどこかでネットワーク接続の問題が発生しています。 |
| billingUnavailable | 103 | <p>購入プロセス中にユーザーの課金エラーが発生したことを示します。発生する可能性のある例：</p><p></p><p>1\. ユーザーのデバイスの Play Store アプリが古い。</p><p>2. ユーザーがサポートされていない国にいる。</p><p>3. ユーザーがエンタープライズユーザーで、エンタープライズ管理者が購入を無効にしている。</p><p>4. Google Play がユーザーの支払い方法に課金できない（例：クレジットカードの有効期限切れ）。</p><p>5. ユーザーが Play Store アプリにログインしていない。</p> |
| developerError | 105 | API の不正な使用を示す致命的なエラーです。 |
| billingError | 106 | Google Play 自体の内部問題を示す致命的なエラーです。 |
| itemAlreadyOwned | 107 | 消耗型アイテムがすでに購入済みです。 |
| itemNotOwned | 108 | リクエストされたアイテムへの操作が失敗したことを示します。 |
| billingNetworkError | 112 | デバイスと Play システム間のネットワーク接続に問題があったことを示します。 |


## StoreKit カスタムコード \{#custom-storekit-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>ペイウォール内のどのプロダクトもストアで利用できないことを示します。</p><p>このエラーが発生している場合は、以下の手順で解決してください：</p><p></p><p>1. すべてのプロダクトが Adapty ダッシュボードに追加されているか確認する。</p><p>2. アプリの Bundle ID が Apple Connect のものと一致していることを確認する。</p><p>3. アプリストアのプロダクト識別子がダッシュボードに追加したものと一致していることを確認する。識別子にはストアにすでに含まれている場合を除き、Bundle ID を含めないこと。</p><p>4. Apple の税務設定でアプリの有料ステータスがアクティブであることを確認する。税務情報が最新で、証明書が有効であることを確認する。</p><p>5. 収益化の対象となるよう、アプリに銀行口座が紐付けられているか確認する。</p><p>6. プロダクトがすべての地域で利用可能かどうか確認する。また、プロダクトが **"Ready to Submit"** 状態であることを確認する。</p> |
| productRequestFailed | 1002 | <p>現在、利用可能なプロダクトを取得できません。考えられる理由：</p><p></p><p>- キャッシュがまだ作成されておらず、同時にインターネット接続もない。</p> |
| cantMakePayments | 1003 | このデバイスではアプリ内課金が許可されていません。 |
| noPurchasesToRestore | 1004 | Google Play が復元する購入を見つけられなかったことを示します。 |
| cantReadReceipt | 1005 | <p>デバイスに有効なレシートがありません。サンドボックステスト中に発生することがあります。</p><p>対応は不要ですが、ビジネスロジックの観点から、割引を提供したり後でリマインダーを送ったりすることができます。</p> |
| productPurchaseFailed | 1006 | プロダクトの購入に失敗しました。これは基になる StoreKit エラーをラップしたものです。実際の原因はラップされたエラーを参照するか、詳細ログを有効にしてコンソールで確認してください。ラップされたエラーは通常、上記テーブルの StoreKit コード 0〜14 のいずれかで、`paymentCancelled`、`paymentInvalid`、`paymentNotAllowed`、`invalidOfferPrice` が最も一般的です。特定の原因が特定できない場合は、新しい[サンドボックスプロファイル](test-purchases-in-sandbox)で試してください。それでも失敗する場合は Apple サポートに連絡してください。 |
| refreshReceiptFailed | 1010 | レシートが受信されなかったことを示します。StoreKit 1 にのみ適用されます。 |
| receiveRestoredTransactionsFailed | 1011 | 購入の復元に失敗しました。 |


## ネットワークカスタムコード \{#custom-network-codes\}

| エラー | コード | 説明 |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | `activate` メソッドで Adapty SDK を正しく設定する必要があります。設定方法は [Install & configure Adapty SDK](sdk-installation-capacitor) を参照してください。 |
| badRequest           | 2003 | リクエストが不正です。                                                 |
| serverError          | 2004 | サーバーエラーです。                                                |
| networkFailed        | 2005 | ネットワークリクエストが失敗しました。                                  |
| decodingFailed       | 2006 | レスポンスのデコードに失敗したことを示します。          |
| encodingFailed       | 2009 | リクエストのエンコードに失敗したことを示します。           |
| analyticsDisabled    | 3000 | アナリティクスをオプトアウトしたため、アナリティクスイベントを処理できません。詳細は [Analytics integration](analytics-integration) を参照してください。 |
| wrongParam           | 3001 | パラメーターの一部が正しくないことを示します（空白にできない場所が空白になっている、型が間違っているなど）。 |
| activateOnceError    | 3005 | `.activate` メソッドを複数回呼び出すことはできません。 |
| profileWasChanged    | 3006 | 操作中にユーザープロファイルが変更されました。           |
| unsupportedData      | 3007 | データ形式が SDK でサポートされていないことを示します。 |
| persistingDataError  | 3100 | データの保存中にエラーが発生しました。                           |
| fetchTimeoutError    | 3101 | 設定された制限時間内にペイウォールを取得できなかったことを示します。この状況を避けるには、[ローカルフォールバックを設定してください](fetch-paywalls-and-products)。 |
| operationInterrupted | 9000 | この操作はシステムによって中断されました。                |