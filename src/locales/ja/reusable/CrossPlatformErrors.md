
## システム StoreKit コード \{#system-storekit-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| unknown | 0 | 不明または予期しないエラーが発生したことを示します。 |
| clientInvalid | 1 | クライアントが試みた操作を実行する権限がないことを示します。 |
| paymentCancelled | 2 | <p>ユーザーが支払いリクエストをキャンセルしたことを示します。</p><p>対応は不要ですが、ビジネスロジックの観点から、割引を提供したり後でリマインドしたりすることができます。</p> |
| paymentInvalid | 3 | 支払いパラメーターのいずれかがストアで認識されなかったことを示します。 |
| paymentNotAllowed | 4 | <p>ユーザーが支払いを承認する権限を持っていないことを示します。考えられる原因：</p><p></p><p>- ユーザーの国では支払いがサポートされていない。</p><p>- ユーザーが未成年である。</p> |
| storeProductNotAvailable | 5 | リクエストされたプロダクトが App Store に存在しないことを示します。該当の国でプロダクトが利用可能かどうかを確認してください。 |
| cloudServicePermissionDenied | 6 | ユーザーがクラウドサービス情報へのアクセスを許可していないことを示します。 |
| cloudServiceNetworkConnectionFailed | 7 | デバイスがネットワークに接続できなかったことを示します。 |
| cloudServiceRevoked | 8 | ユーザーがこのクラウドサービスの使用許可を取り消したことを示します。 |
| privacyAcknowledgementRequired | 9 | ユーザーがストアのプライバシーポリシーにまだ同意していないことを示します。 |
| unauthorizedRequestData | 10 | リクエストが正しく構築されていないことを示します。 |
| invalidOfferIdentifier | 11 | <p>オファー識別子が無効です。考えられる原因：</p><p></p><p>- その識別子のオファーが App Store に設定されていない。</p><p>- オファーが取り消されている。</p><p>- オファー ID の入力ミスがある。</p> |
| invalidSignature | 12 | 支払い割引のシグネチャが無効であることを示します。**In-app purchase Key ID** フィールドへの入力と **In-App Purchase Private Key** ファイルのアップロードが完了しているか確認してください。詳細は [App Store インテグレーションの設定](app-store-connection-configuration) をご覧ください。 |
| missingOfferParams | 13 | <p>Adapty インテグレーションまたはオファーに問題があることを示します。</p><p>設定方法については [App Store インテグレーションの設定](app-store-connection-configuration) および [オファー](offers) をご覧ください。</p> |
| invalidOfferPrice | 14 | ストアで指定した価格が無効になったことを示します。オファーは常に割引価格を設定する必要があります。 |

## カスタム Android コード \{#custom-android-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| adaptyNotInitialized | 20 | `activate` メソッドを使用して Adapty SDK を正しく設定する必要があります。設定方法は [Adapty SDK のインストールと設定](sdk-installation-capacitor) をご覧ください。 |
| productNotFound | 22 | 購入対象のプロダクトがストアで利用できないことを示します。 |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | 更新対象の元のサブスクリプションが見つかりません。 |
| billingServiceTimeout | 97 | Google Play が応答する前にリクエストが最大タイムアウトに達したことを示します。Play Billing Library の呼び出しによってリクエストされた操作の実行に遅延が発生した場合などに起こります。 |
| featureNotSupported | 98 | リクエストされた機能が現在のデバイスの Play Store でサポートされていません。 |
| billingServiceDisconnected | 99 | クライアントアプリと Google Play Store サービス間の `BillingClient` 経由の接続が切断されたことを示す致命的なエラーです。 |
| billingServiceUnavailable | 102 | Google Play Billing サービスが現在利用できないことを示す一時的なエラーです。ほとんどの場合、クライアントデバイスと Google Play Billing サービス間のどこかでネットワーク接続の問題が発生しています。 |
| billingUnavailable | 103 | <p>購入プロセス中にユーザーの請求エラーが発生したことを示します。発生する例：</p><p></p><p>1\. ユーザーのデバイス上の Play Store アプリが古い。</p><p>2. ユーザーがサポートされていない国にいる。</p><p>3. ユーザーが企業ユーザーであり、企業の管理者がユーザーの購入を無効にしている。</p><p>4. Google Play がユーザーの支払い方法に請求できない（例：クレジットカードの有効期限切れ）。</p><p>5. ユーザーが Play Store アプリにログインしていない。</p> |
| developerError | 105 | API の不正な使用を示す致命的なエラーです。 |
| billingError | 106 | Google Play 自体の内部問題を示す致命的なエラーです。 |
| itemAlreadyOwned | 107 | 消耗型アイテムがすでに購入済みです。 |
| itemNotOwned | 108 | アイテムに対するリクエストされた操作が失敗したことを示します。 |
| billingNetworkError | 112 | デバイスと Play システム間のネットワーク接続に問題が発生したことを示します。 |


## カスタム StoreKit コード \{#custom-storekit-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>ペイウォール内のどのプロダクトもストアで利用できないことを示します。</p><p>このエラーが発生した場合は、以下の手順で解決してください：</p><p></p><p>1. すべてのプロダクトが Adapty ダッシュボードに追加されているか確認する。</p><p>2. アプリの Bundle ID が Apple Connect のものと一致しているか確認する。</p><p>3. アプリストアのプロダクト識別子がダッシュボードに追加した識別子と一致しているか確認する。なお、Bundle ID がすでにストアに含まれている場合を除き、識別子に Bundle ID を含めないでください。</p><p>4. Apple の税務設定でアプリの有料ステータスがアクティブになっているか確認する。税務情報が最新で証明書が有効であることを確認する。</p><p>5. アプリに銀行口座が紐付けられており、収益化が可能な状態かどうかを確認する。</p><p>6. プロダクトがすべての地域で利用可能かどうかを確認する。また、プロダクトが **"Ready to Submit"** の状態になっているか確認する。</p> |
| productRequestFailed | 1002 | <p>現時点で利用可能なプロダクトを取得できません。考えられる原因：</p><p></p><p>- キャッシュがまだ作成されておらず、かつインターネット接続もない。</p> |
| cantMakePayments | 1003 | このデバイスではアプリ内課金が許可されていません。 |
| noPurchasesToRestore | 1004 | Google Play が復元対象の購入を見つけられなかったことを示します。 |
| cantReadReceipt | 1005 | <p>デバイスに有効なレシートがありません。サンドボックステスト中に発生することがあります。</p><p>対応は不要ですが、ビジネスロジックの観点から、割引を提供したり後でリマインドしたりすることができます。</p> |
| productPurchaseFailed | 1006 | プロダクトの購入に失敗しました。これは基礎となる StoreKit エラーをラップしています。実際の原因を確認するには、ラップされたエラーを参照するか、詳細ログを有効にしてコンソールで確認してください。ラップされたエラーは通常、上記の表にある StoreKit コード 0〜14 のいずれかで、最も多いのは `paymentCancelled`、`paymentInvalid`、`paymentNotAllowed`、または `invalidOfferPrice` です。特定の原因が特定できない場合は、新しい[サンドボックスプロファイル](test-purchases-in-sandbox)で試してみてください。それでも失敗する場合は Apple サポートにお問い合わせください。 |
| refreshReceiptFailed | 1010 | レシートを受信できなかったことを示します。StoreKit 1 にのみ適用されます。 |
| receiveRestoredTransactionsFailed | 1011 | 購入の復元に失敗しました。 |


## カスタムネットワークコード \{#custom-network-codes\}

| エラー | コード | 説明 |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated         | 2002 | `activate` メソッドを使用して Adapty SDK を正しく設定する必要があります。設定方法は [Adapty SDK のインストールと設定](sdk-installation-capacitor) をご覧ください。 |
| badRequest           | 2003 | 不正なリクエストです。 |
| serverError          | 2004 | サーバーエラーです。 |
| networkFailed        | 2005 | ネットワークリクエストが失敗しました。 |
| decodingFailed       | 2006 | レスポンスのデコードに失敗したことを示します。 |
| encodingFailed       | 2009 | リクエストのエンコードに失敗したことを示します。 |
| analyticsDisabled    | 3000 | アナリティクスをオプトアウトしているため、アナリティクスイベントを処理できません。詳細は [アナリティクスインテグレーション](analytics-integration) をご覧ください。 |
| wrongParam           | 3001 | パラメーターの一部が正しくないことを示します（空白にできない箇所が空白になっている、型が間違っているなど）。 |
| activateOnceError    | 3005 | `.activate` メソッドを複数回呼び出すことはできません。 |
| profileWasChanged    | 3006 | 操作中にユーザープロファイルが変更されました。 |
| unsupportedData      | 3007 | データ形式が SDK でサポートされていないことを示します。 |
| persistingDataError  | 3100 | データの保存中にエラーが発生しました。 |
| fetchTimeoutError    | 3101 | 設定された制限時間内にペイウォールを取得できなかったことを示します。この状況を避けるには、[ローカルフォールバックを設定](fetch-paywalls-and-products) してください。 |
| operationInterrupted | 9000 | この操作はシステムによって中断されました。 |