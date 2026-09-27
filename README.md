# 三寿オンラインショップ（sanju-shop）
小さなアトリエ「アトリエライブ」のブランドサイト兼ショップです。  
見た目は GitHub Pages、決済と注文管理は Shopify が担当します。
---
## 役割分担（とても大切）
| 役割 | 担当 | できること |
|---|---|---|
| ブランドサイト・商品紹介・カート画面 | GitHub Pages（このフォルダのHTML/CSS/JS） | 世界観、商品一覧、詳細、カートの見た目 |
| 注文・在庫・配送・クレジットカード決済 | Shopify | 実際の購入、Shopify Payments、注文メール |
GitHub Pages だけでは、カード番号を安全に扱う決済は完結できません。  
カード情報はこのサイトに保存しません。購入ボタンで Shopify の決済ページへ移動します。
```
商品を見る（GitHub Pages）
  → カートに入れる（ブラウザ内）
  → ご購入手続きへ（Shopifyの安全な決済）
  → 注文完了（Shopifyの完了画面。必要なら order-complete.html も利用）
```
---
## フォルダの見方
```
sanju-shop/
  index.html            トップ
  about.html            三寿について
  shop.html             SHOP（ALL / SOAP / TEA / ART）
  soap.html  tea.html  art.html
  product.html          商品詳細（?id=商品ID）
  cart.html             カート
  order-complete.html   注文完了メッセージ
  contact.html          お問い合わせ
  access.html           店舗情報
  legal.html            特定商取引法に基づく表記
  privacy.html          プライバシーポリシー
  terms.html            利用規約
  css/styles.css
  js/config.js          キャッチコピー、Shopify URL、SNS
  js/products.js        商品名・価格・画像・在庫（ここが商品台帳）
  js/cart.js            カートとShopifyへの橋渡し
  js/site.js            共通の見た目とページ表示
  images/               写真を置く場所
```
ロゴは、いまは文字の「三寿」です。画像ロゴを使うときは `js/config.js` の `logoImage` に `images/logo.png` などを入れてください。
---
## 初心者向け 作業手順
### STEP 1　このフォルダを開く
Cursor で `C:\Users\YuYu\sanju-shop` を開きます（いまこのプロジェクトです）。
### STEP 2　フォルダ構成を理解する
上の一覧を見ながら、`index.html` をブラウザで開いて表示を確認します。
### STEP 3　画像を `images` フォルダに入れる
写真がなくてもサイトは壊れません。用意できたら、同じ名前で上書きしてください。
- `images/hero.jpg`
- `images/soap-01.jpg` `images/soap-02.jpg`
- `images/tea-jin.jpg` `images/tea-kan.jpg` `images/tea-hi.jpg`
- `images/art-01.jpg` など
### STEP 4　文章と商品情報を入力する
1. キャッチコピー → `js/config.js` の `hero.catchphrase`  
   （例: 「身体と心に、丁寧なものを。」）
2. 価格・原材料・内容量 → `js/products.js`  
   - 価格は `price: null` のままにせず、決まったら数字だけ入れます（例: `price: 1800`）
   - 勝手に金額は入れていません
3. 特商法・利用規約の「要入力」→ `legal.html` `terms.html` `privacy.html`
4. アート作品を出すとき → `js/products.js` 末尾の例をコピーして `published: true`
価格や Shopify ID が空のあいだは、カートボタンは「準備中」になり、決済には進めません。
### STEP 5　GitHub へアップロード（GitHub Pages）
このPCには、いま Git が入っていない可能性があります。先に [Git](https://git-scm.com/) をインストールしてください。
1. GitHub で新しいリポジトリ `sanju-shop` を作る（Public）
2. このフォルダをアップロードする
3. Settings → Pages → Source を `main` ブランチの `/ (root)` にする
4. 公開URLの例: `https://（ユーザー名）.github.io/sanju-shop/`
5. 決まったら `js/config.js` の `seo.siteUrl` にそのURLを入れる
### STEP 6　Shopify を設定する（コードだけでは完了しません）
必要なアカウント：
- Shopify ストア
- Shopify Payments（日本で使える条件を満たすこと。審査・本人確認あり）
- 銀行口座（入金用）
- 事業としての届出（食品・石鹸の取扱いは法令面が **要確認**）
Shopify管理画面で必ず行うこと：
1. 商品を登録（石鹸1点、茶3点、アートは都度）
2. 価格・在庫・送料・税金
3. Shopify Payments（Visa / Mastercard / JCB / American Express は、審査後に使えるブランドが管理画面に表示されます）
4. 配送設定
5. 特定商取引法・利用規約・プライバシー（Shopify側のポリシーページにも同じ内容）
6. テスト注文（Bogus gateway またはテストカード）
各商品の **バリエーションID** を `js/products.js` の `shopifyVariantId` に数字で入れます。  
IDの場所の目安: 商品管理 → 商品 → バリエーション。URLや「バリエーション情報を見る」に長い数字があります。
### STEP 7　決済をサイトとつなぐ
`js/config.js` を次のようにします。
```javascript
shopify: {
  enabled: true,
  storeUrl: "https://（あなたのストア）.myshopify.com"
}
```
カートの「ご購入手続きへ」で、ShopifyのカートURL（`/cart/バリエーションID:数量`）に移動します。
パスワード保護中のストアでは、お客さまが入れないことがあります。本番公開時にストアを公開してください。
### STEP 8　テスト注文
1. 価格が入っている商品をカートへ
2. ご購入手続きへ
3. Shopifyで決済（最初はテストモード）
4. 注文メールと管理画面の注文番号を確認
5. 本番に切り替える前に、特商法の「要入力」をすべて埋める
注文完了の正式画面は Shopify 側です。サイトの `order-complete.html` はお礼メッセージ用です。Shopifyの追加スクリプトからこのページへ戻す設定は任意です。
---
## あなたが後から入力する情報（いま空／要入力のもの）
- すべての商品価格
- 内容量、サイズ、原材料、使い方／飲み方、保存、注意、在庫数
- アート作品の作品名、作家名、サイズ、素材、制作年、写真
- 運営責任者名
- 送料、発送時期、返品・キャンセル条件、税表示
- Shopify のストアURLと各 `shopifyVariantId`
- Instagram などのSNS URL（決まるまで空。架空URLは入れない）
- 公開サイトURL
- お問い合わせフォームをサイトから直接送る場合の Formspree 等のURL
- 営業時間・定休日
法令の表示（化粧品か雑貨か、食品表示の書き方など）は、このサイトでは判断せず **要確認** としてあります。専門家または所管への確認をおすすめします。
---
## デザインのメモ
参考にしたのは構成と導線だけです（ブランドの伝え方、カテゴリー、作品の見せ方）。見た目そのものはコピーしていません。  
生成りと墨色を基調にした、現代的な日本のクラフトブランドを目指しています。
---
## よくあること
**カートに入らない**  
価格が `null` のままです。`products.js` に数字を入れてください。
**決済に進まない**  
`shopify.enabled` が false、または `storeUrl` / `shopifyVariantId` が空です。
**写真が四角いプレースホルダー**  
`images` に jpg を置くか、ファイル名を `products.js` と揃えてください。
