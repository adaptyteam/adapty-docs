
## システム StoreKit コード \{#system-storekit-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| unknown | 0 | 不明または予期しないエラーが発生しました。 |
| clientInvalid | 1 | クライアントが要求されたアクションを実行できないことを示すエラーコードです。 |
| paymentCancelled | 2 | <p>ユーザーが支払いリクエストをキャンセルしたことを示すエラーコードです。</p><p>対応は不要ですが、ビジネスロジックの観点から、ユーザーに割引を提案したり、後で再通知したりすることができます。</p> |
| paymentInvalid | 3 | 支払いパラメータのいずれかがストアで認識されなかったことを示すエラーです。 |
| paymentNotAllowed | 4 | <p>ユーザーが支払いの承認を許可されていないことを示すエラーコードです。考えられる原因：</p><p></p><p>- ユーザーの国では支払いがサポートされていない。</p><p>- ユーザーが未成年者である。</p> |
| storeProductNotAvailable | 5 | リクエストされたプロダクトが App Store に存在しないことを示すエラーコードです。該当国でプロダクトが利用可能かどうか確認してください。 |
| cloudServicePermissionDenied | 6 | ユーザーがクラウドサービス情報へのアクセスを許可していないことを示すエラーコードです。 |
| cloudServiceNetworkConnectionFailed | 7 | デバイスがネットワークに接続できなかったことを示すエラーコードです。 |
| cloudServiceRevoked | 8 | ユーザーがこのクラウドサービスの使用許可を取り消したことを示すエラーコードです。 |
| privacyAcknowledgementRequired | 9 | ユーザーがストアのプライバシーポリシーにまだ同意していないことを示すエラーコードです。 |
| unauthorizedRequestData | 10 | リクエストの構築が正しくないことを示すエラーコードです。 |
| invalidOfferIdentifier | 11 | <p>オファー識別子が無効です。考えられる原因：</p><p></p><p>- その識別子のオファーが App Store に設定されていない。</p><p>- オファーが取り消されている。</p><p>- オファー ID の入力ミスがある。</p> |
| invalidSignature | 12 | 支払いディスカウントの署名が無効であることを示すエラーコードです。**App Store promotional offers** セクションで **Subscription key ID** フィールドへの入力と **Subscription key (.p8 file)** のアップロードが完了しているか確認してください。詳細は [Add the In-App Purchase key to Adapty](generate-in-app-purchase-key#add-the-key-to-adapty) を参照してください。 |
| missingOfferParams | 13 | <p>Adapty の連携またはオファーに問題があることを示すエラーです。</p><p>設定方法については [Configure App Store integration](app-store-connection-configuration) および [Offers](offers) を参照してください。</p> |
| invalidOfferPrice | 14 | ストアで指定した価格が無効になっていることを示すエラーコードです。オファーは常に割引価格である必要があります。 |

## カスタム Android コード \{#custom-android-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| adaptyNotInitialized | 20 | `activate` メソッドで Adapty SDK を正しく設定する必要があります。設定方法については [Install & configure Adapty SDK](sdk-installation-capacitor) を参照してください。 |
| productNotFound | 22 | 購入リクエストされたプロダクトがストアで利用できないことを示すエラーです。 |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | 更新が必要な元のサブスクリプションが見つかりません。 |
| billingServiceTimeout | 97 | Google Play が応答する前にリクエストが最大タイムアウトに達したことを示すエラーです。Play Billing Library の呼び出しで要求されたアクションの実行が遅延した場合などに発生することがあります。 |
| featureNotSupported | 98 | リクエストされた機能が、現在のデバイスの Play Store でサポートされていません。 |
| billingServiceDisconnected | 99 | `BillingClient` を介したクライアントアプリと Google Play ストアサービス間の接続が切断されたことを示す致命的なエラーです。 |
| billingServiceUnavailable | 102 | Google Play Billing サービスが現在利用できないことを示す一時的なエラーです。ほとんどの場合、クライアントデバイスと Google Play Billing サービス間のどこかでネットワーク接続の問題が発生しています。 |
| billingUnavailable | 103 | <p>購入プロセス中にユーザーの請求エラーが発生したことを示すエラーです。発生する可能性がある例：</p><p></p><p>1\. ユーザーのデバイスの Play Store アプリが古い。</p><p>2. ユーザーがサポートされていない国にいる。</p><p>3. ユーザーがエンタープライズユーザーで、エンタープライズ管理者が購入を無効にしている。</p><p>4. Google Play がユーザーの支払い方法に課金できない（例：クレジットカードの有効期限切れ）。</p><p>5. ユーザーが Play Store アプリにログインしていない。</p> |
| developerError | 105 | API の不正な使用を示す致命的なエラーです。 |
| billingError | 106 | Google Play 自体の内部問題を示す致命的なエラーです。 |
| itemAlreadyOwned | 107 | 消耗型アイテムがすでに購入済みです。 |
| itemNotOwned | 108 | リクエストされたアイテムへの操作が失敗したことを示すエラーです。 |
| billingNetworkError | 112 | デバイスと Play システム間のネットワーク接続に問題があったことを示すエラーです。 |


## カスタム StoreKit コード \{#custom-storekit-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>ペイウォール内のプロダクトがいずれもストアで利用できないことを示すエラーです。</p><p>このエラーが発生している場合は、以下の手順で解決してください：</p><p></p><p>1. すべてのプロダクトが Adapty ダッシュボードに追加されているか確認する。</p><p>2. アプリの Bundle ID が Apple Connect のものと一致していることを確認する。</p><p>3. アプリストアのプロダクト識別子がダッシュボードに追加したものと一致していることを確認する。なお、Bundle ID がストアにすでに含まれている場合を除き、識別子に Bundle ID を含めないこと。</p><p>4. Apple の税務設定でアプリの支払いステータスがアクティブであることを確認する。税務情報が最新で証明書が有効であることを確認する。</p><p>5. 収益化の対象となるよう、アプリに銀行口座が紐付けられているか確認する。</p><p>6. プロダクトがすべての地域で利用可能かどうか確認する。また、プロダクトが **"Ready to Submit"** の状態であることを確認する。</p> |
| productRequestFailed | 1002 | <p>現時点で利用可能なプロダクトを取得できません。考えられる原因：</p><p></p><p>- キャッシュがまだ作成されておらず、同時にインターネット接続もない。</p> |
| cantMakePayments | 1003 | このデバイスではアプリ内課金が許可されていません。 |
| noPurchasesToRestore | 1004 | Google Play が復元する購入を見つけられなかったことを示すエラーです。 |
| cantReadReceipt | 1005 | <p>デバイスに有効なレシートがありません。サンドボックステスト中に発生することがあります。</p><p>対応は不要ですが、ビジネスロジックの観点から、ユーザーに割引を提案したり、後で再通知したりすることができます。</p> |
| productPurchaseFailed | 1006 | プロダクトの購入に失敗しました。これは基になる StoreKit エラーをラップしています。実際の原因を確認するには、ラップされたエラーを読む（または詳細ログを有効にしてコンソールで確認する）ことをお勧めします。ラップされたエラーは通常、上記の表の StoreKit コード 0〜14 のいずれかで、最も多いのは `paymentCancelled`、`paymentInvalid`、`paymentNotAllowed`、または `invalidOfferPrice` です。特定の原因が特定できない場合は、新しい[サンドボックスプロファイル](test-purchases-in-sandbox)で試してみてください。それでも失敗する場合は Apple サポートにお問い合わせください。 |
| refreshReceiptFailed | 1010 | レシートが受信されなかったことを示すエラーです。StoreKit 1 にのみ適用されます。 |
| receiveRestoredTransactionsFailed | 1011 | 購入の復元に失敗しました。 |
| billingPlanUnavailable | 1060 | iOS のみ、SDK 4.3.0 以降。このデバイスまたはストアフロントでは、プロダクトがリクエストされた請求プランを提供していません。[12 か月コミットメント](app-store-12-month-commitment)プランには iOS 26.4 以降と Xcode 26.5 以降でビルドされたアプリが必要です。 |


## カスタムネットワークコード \{#custom-network-codes\}

| エラー | コード | 説明 |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated | 2002 | `activate` メソッドで Adapty SDK を正しく設定する必要があります。設定方法については [Install & configure Adapty SDK](sdk-installation-capacitor) を参照してください。 |
| badRequest | 2003 | 不正なリクエストです。 |
| serverError | 2004 | サーバーエラーです。 |
| networkFailed | 2005 | ネットワークリクエストに失敗しました。 |
| decodingFailed | 2006 | レスポンスのデコードに失敗したことを示すエラーです。 |
| encodingFailed | 2009 | リクエストのエンコードに失敗したことを示すエラーです。 |
| analyticsDisabled | 3000 | アナリティクスをオプトアウトしているため、アナリティクスイベントを処理できません。詳細は [Analytics integration](analytics-integration) を参照してください。 |
| wrongParam | 3001 | 一部のパラメータが正しくないことを示すエラーです（空白にできない箇所が空白、型の誤りなど）。 |
| activateOnceError | 3005 | `.activate` メソッドを複数回呼び出すことはできません。 |
| profileWasChanged | 3006 | 操作中にユーザープロファイルが変更されました。 |
| unsupportedData | 3007 | データ形式が SDK でサポートされていないことを示すエラーです。 |
| persistingDataError | 3100 | データの保存中にエラーが発生しました。 |
| fetchTimeoutError | 3101 | 設定した制限時間内にペイウォールを取得できなかったことを示すエラーです。この状況を避けるために、[ローカルフォールバックを設定](fetch-paywalls-and-products)してください。 |
| operationInProgress | 3201 | iOS のみ、SDK 4.3.0 以降。前の呼び出しがまだ[ストアメッセージ](capacitor-store-messages)を表示中のときに `showStoreMessages` が返します。完了するまで待ってから再試行してください。 |
| resolverFailure | 3202 | iOS のみ、SDK 4.3.0 以降。フォアグラウンドでアクティブなウィンドウシーンが存在しないときに `showStoreMessages` が返します。アプリがフォアグラウンドにある状態でメソッドを再度呼び出してください。 |
| operationInterrupted | 9000 | この操作はシステムによって中断されました。 |