## システム StoreKit コード \{#system-storekit-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| unknown | 0 | 不明または予期しないエラーが発生したことを示します。 |
| clientInvalid | 1 | クライアントが実行しようとした操作を許可されていないことを示します。 |
| paymentCancelled | 2 | <p>ユーザーが支払いリクエストをキャンセルしたことを示します。</p><p>特に対応は不要ですが、ビジネスロジックの観点から、ユーザーに割引を提示したり、後でリマインドしたりすることができます。</p> |
| paymentInvalid | 3 | 支払いパラメーターのいずれかがストアに認識されなかったことを示します。 |
| paymentNotAllowed | 4 | <p>ユーザーが支払いを承認する権限を持っていないことを示します。考えられる原因：</p><p></p><p>- ユーザーの国では支払いがサポートされていない。</p><p>- ユーザーが未成年である。</p> |
| storeProductNotAvailable | 5 | リクエストされたプロダクトが App Store に存在しないことを示します。対象国でプロダクトが利用可能になっているか確認してください。 |
| cloudServicePermissionDenied | 6 | ユーザーがクラウドサービス情報へのアクセスを許可していないことを示します。 |
| cloudServiceNetworkConnectionFailed | 7 | デバイスがネットワークに接続できなかったことを示します。 |
| cloudServiceRevoked | 8 | ユーザーがクラウドサービスの使用許可を取り消したことを示します。 |
| privacyAcknowledgementRequired | 9 | ユーザーがストアのプライバシーポリシーにまだ同意していないことを示します。 |
| unauthorizedRequestData | 10 | リクエストが正しく構築されていないことを示します。 |
| invalidOfferIdentifier | 11 | <p>オファー識別子が無効です。考えられる原因：</p><p></p><p>- App Store でその識別子のオファーをまだ設定していない。</p><p>- オファーを取り消している。</p><p>- オファー ID を誤って入力している。</p> |
| invalidSignature | 12 | 支払いディスカウントの署名が無効であることを示します。**In-app purchase Key ID** フィールドに入力し、**In-App Purchase Private Key** ファイルをアップロードしているか確認してください。詳細は [App Store インテグレーションの設定](app-store-connection-configuration) を参照してください。 |
| missingOfferParams | 13 | <p>Adapty インテグレーションまたはオファーに問題があることを示します。</p><p>設定方法の詳細は [App Store インテグレーションの設定](app-store-connection-configuration) および [オファー](offers) を参照してください。</p> |
| invalidOfferPrice | 14 | ストアで指定した価格が無効になったことを示します。オファーは常に割引価格である必要があります。 |

## カスタム Android コード \{#custom-android-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| adaptyNotInitialized | 20 | `Adapty.activate` メソッドで Adapty SDK を正しく設定する必要があります。設定方法は [React Native 向けのガイド](sdk-installation-reactnative) を参照してください。 |
| productNotFound | 22 | 購入リクエストされたプロダクトがストアで利用できないことを示します。 |
| invalidJson | 23 | ペイウォールの JSON が無効です。Adapty ダッシュボードで修正してください。修正方法の詳細は [リモートコンフィグでペイウォールをカスタマイズする](customize-paywall-with-remote-config) を参照してください。 |
| currentSubscriptionToUpdateNotFoundInHistory | 24 | 更新が必要な元のサブスクリプションが見つかりません。 |
| pendingPurchase | 25 | 購入状態が「購入済み」ではなく「保留中」であることを示します。詳細は Android デベロッパー ドキュメントの [保留中のトランザクションの処理](https://developer.android.com/google/play/billing/integrate#pending) を参照してください。 |
| billingServiceTimeout | 97 | Google Play が応答する前にリクエストが最大タイムアウトに達したことを示します。Play Billing Library の呼び出しで要求されたアクションの実行が遅延した場合などに発生します。 |
| featureNotSupported | 98 | リクエストされた機能が現在のデバイスの Play Store でサポートされていません。 |
| billingServiceDisconnected | 99 | `BillingClient` 経由でのクライアントアプリと Google Play Store サービスの接続が切断されたことを示す致命的なエラーです。 |
| billingServiceUnavailable | 102 | Google Play Billing サービスが現在利用できないことを示す一時的なエラーです。ほとんどの場合、クライアントデバイスと Google Play Billing サービス間のどこかでネットワーク接続に問題があることを意味します。 |
| billingUnavailable | 103 | <p>購入プロセス中にユーザーの課金エラーが発生したことを示します。発生する状況の例：</p><p></p><p>1. ユーザーのデバイスの Play Store アプリが古い。</p><p>2. ユーザーがサポート対象外の国にいる。</p><p>3. ユーザーがエンタープライズユーザーであり、エンタープライズ管理者が購入を無効にしている。</p><p>4. Google Play がユーザーの支払い方法に課金できない（クレジットカードの有効期限切れなど）。</p><p>5. ユーザーが Play Store アプリにログインしていない。</p> |
| developerError | 105 | API の使い方が正しくないことを示す致命的なエラーです。 |
| billingError | 106 | Google Play 内部の問題を示す致命的なエラーです。 |
| itemAlreadyOwned | 107 | 消耗型アイテムがすでに購入済みです。 |
| itemNotOwned | 108 | アイテムに対してリクエストされたアクションが失敗したことを示します。 |


## カスタム StoreKit コード \{#custom-storekit-codes\}

| エラー | コード | 説明 |
|-----|----|-----------|
| noProductIDsFound | 1000 | <p>ペイウォール内のプロダクトがいずれもストアで利用できないことを示します。</p><p>このエラーが発生した場合は、以下の手順で解決してください：</p><p></p><p>1. すべてのプロダクトが Adapty ダッシュボードに追加されているか確認する。</p><p>2. アプリの Bundle ID が Apple Connect のものと一致しているか確認する。</p><p>3. アプリストアのプロダクト識別子がダッシュボードに追加したものと一致しているか確認する。識別子にはストアにすでに含まれている場合を除き、Bundle ID を含めないこと。</p><p>4. Apple の税務設定でアプリの有料ステータスがアクティブになっているか確認する。税務情報が最新であり、証明書が有効であることを確認する。</p><p>5. アプリに銀行口座が紐付けられており、収益化の対象になっているか確認する。</p><p>6. プロダクトがすべての地域で利用可能になっているか確認する。また、プロダクトのステータスが **"Ready to Submit"** になっていることを確認する。</p> |
| productRequestFailed | 1002 | <p>現時点で利用可能なプロダクトを取得できません。考えられる原因：</p><p></p><p>- キャッシュがまだ作成されておらず、同時にインターネット接続もない。</p> |
| cantMakePayments | 1003 | このデバイスではアプリ内課金が許可されていません。 |
| noPurchasesToRestore | 1004 | Google Play が復元対象の購入を見つけられなかったことを示します。 |
| cantReadReceipt | 1005 | <p>デバイス上に有効なレシートがありません。サンドボックステスト中に発生することがあります。</p><p>特に対応は不要ですが、ビジネスロジックの観点から、ユーザーに割引を提示したり、後でリマインドしたりすることができます。</p> |
| productPurchaseFailed | 1006 | プロダクトの購入に失敗しました。このエラーは内部の StoreKit エラーをラップしています。実際の原因を確認するには、ラップされたエラーを読み取るか（または詳細ログを有効にしてコンソールで確認）してください。ラップされたエラーは通常、上記の StoreKit コード 0〜14 のいずれかで、最も多いのは `paymentCancelled`、`paymentInvalid`、`paymentNotAllowed`、`invalidOfferPrice` です。原因が特定できない場合は、新しい[サンドボックスプロファイル](test-purchases-in-sandbox)でお試しください。それでも解決しない場合は Apple サポートにお問い合わせください。 |
| refreshReceiptFailed | 1010 | レシートが受信されなかったことを示します。StoreKit 1 のみ対象です。 |
| receiveRestoredTransactionsFailed | 1011 | 購入の復元に失敗しました。 |


## カスタムネットワークコード \{#custom-network-codes\}

| エラー | コード | 説明 |
| :------------------- | :--- | :----------------------------------------------------------- |
| notActivated | 2002 | `Adapty.activate` メソッドで Adapty SDK を正しく設定する必要があります。設定方法は [React Native 向けのガイド](sdk-installation-reactnative) を参照してください。 |
| badRequest | 2003 | リクエストが不正です。 |
| serverError | 2004 | サーバーエラーです。 |
| networkFailed | 2005 | ネットワークリクエストに失敗しました。 |
| decodingFailed | 2006 | レスポンスのデコードに失敗したことを示します。 |
| encodingFailed | 2009 | リクエストのエンコードに失敗したことを示します。 |
| analyticsDisabled | 3000 | アナリティクスをオプトアウトしているため、アナリティクスイベントを処理できません。詳細は [アナリティクスインテグレーション](analytics-integration) を参照してください。 |
| wrongParam | 3001 | パラメーターの一部が正しくないことを示します（空白にできない箇所が空白になっている、型が違うなど）。 |
| activateOnceError | 3005 | `.activate` メソッドを複数回呼び出すことはできません。 |
| profileWasChanged | 3006 | 操作中にユーザープロファイルが変更されました。 |
| fetchTimeoutError | 3101 | 設定された制限時間内にペイウォールを取得できなかったことを示します。この状況を回避するには、[ローカルフォールバックを設定](fetch-paywalls-and-products)してください。 |
| operationInterrupted | 9000 | この操作はシステムによって中断されました。 |